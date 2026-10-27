/**
 * Demo persistence layer (front-end only). Every function here maps 1:1 to a future API call.
 * Rules (status transitions, scope, validation) are re-checked here exactly as the server will.
 */
import { submissionSchema, draftSchema } from "@/domain/census-validation";
import { useSyncExternalStore } from "react";
import { isValidResidence } from "@/data/territory-utils";
import { cryptoRng, generateId, generateReference } from "@/domain/ids";
import { canDecideDossier } from "@/domain/permissions";
import { canTransition } from "@/domain/status";
import type {
  ActivityData,
  AuditAction,
  CorrectableField,
  DataRequestType,
  Dossier,
  DossierStatus,
  MemberAccount,
  NoticeRecord,
  ParticipationData,
  ProfileData,
  ResidenceData,
  Session,
  StaffUser,
} from "@/domain/types";
import { buildSeed, STATE_VERSION, type AppState } from "./seed";

const KEY_STATE = "haoussa.state";
const KEY_SESSION = "haoussa.session";
const KEY_ACTING = "haoussa.acting";
const draftKey = (uid: string) => `haoussa.draft.${uid}`;

type Snapshot = { app: AppState; session: Session; actingStaffId: string };

let serverSnapshot: Snapshot | null = null;
let clientSnapshot: Snapshot | null = null;
const listeners = new Set<() => void>();

function getServerSnapshot(): Snapshot {
  if (!serverSnapshot)
    serverSnapshot = { app: buildSeed(), session: null, actingStaffId: "staff-1" };
  return serverSnapshot;
}

function readJSON<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function getSnapshot(): Snapshot {
  if (typeof window === "undefined") return getServerSnapshot();
  if (!clientSnapshot) {
    const stored = readJSON<AppState>(KEY_STATE);
    clientSnapshot = {
      app: stored && stored.version === STATE_VERSION ? stored : getServerSnapshot().app,
      session: readJSON<Session>(KEY_SESSION),
      actingStaffId: readJSON<string>(KEY_ACTING) ?? "staff-1",
    };
  }
  return clientSnapshot;
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function commit(next: Partial<Snapshot>) {
  const cur = getSnapshot();
  clientSnapshot = { ...cur, ...next };
  try {
    if (next.app) window.localStorage.setItem(KEY_STATE, JSON.stringify(next.app));
    if ("session" in next) window.localStorage.setItem(KEY_SESSION, JSON.stringify(next.session));
    if (next.actingStaffId)
      window.localStorage.setItem(KEY_ACTING, JSON.stringify(next.actingStaffId));
  } catch {
    /* quota: keep in memory */
  }
  listeners.forEach((l) => l());
}

function useSnapshot() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const useApp = () => useSnapshot().app;
export const useSession = () => useSnapshot().session;
export function useActingStaff(): StaffUser {
  const s = useSnapshot();
  return s.app.staff.find((u) => u.id === s.actingStaffId) ?? s.app.staff[0];
}

const now = () => new Date().toISOString();

function audit(
  app: AppState,
  actor: string,
  role: AppState["audit"][number]["role"],
  action: AuditAction,
  target: string,
  scope: string,
): AppState {
  const ev = {
    id: `aud-${generateId(cryptoRng())}`,
    at: now(),
    actor,
    role,
    action,
    target,
    scope,
  };
  return { ...app, audit: [ev, ...app.audit] };
}

function updateDossier(app: AppState, id: string, fn: (d: Dossier) => Dossier): AppState {
  return { ...app, dossiers: app.dossiers.map((d) => (d.id === id ? fn(d) : d)) };
}

/* ───────── Auth (demo) ───────── */

export function signIn(input: {
  email: string;
  displayName?: string;
  provider: MemberAccount["provider"];
}) {
  const userId = `u-${input.email.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  const account: MemberAccount = {
    userId,
    email: input.email,
    displayName: input.displayName || input.email.split("@")[0],
    provider: input.provider,
    preferences: { email: true, sms: false, actualites: false },
  };
  commit({ session: { kind: "member", account } });
  return account;
}

export function signOut() {
  commit({ session: null });
}

export function updatePreferences(prefs: MemberAccount["preferences"]) {
  const s = getSnapshot().session;
  if (!s) return;
  commit({ session: { ...s, account: { ...s.account, preferences: prefs } } });
}

export function setActingStaff(id: string) {
  commit({ actingStaffId: id });
}

/* ───────── Census ───────── */

export interface CensusDraft {
  step: number;
  notice?: NoticeRecord;
  profile?: Partial<ProfileData>;
  residence?: Partial<ResidenceData>;
  activity?: Partial<ActivityData>;
  participation?: ParticipationData;
  savedAt?: string;
}

export function loadDraft(uid: string): CensusDraft | null {
  if (typeof window === "undefined") return null;
  const result = draftSchema.safeParse(readJSON<unknown>(draftKey(uid)));
  return result.success ? (result.data as CensusDraft) : null;
}
export function saveDraft(uid: string, d: CensusDraft) {
  try {
    window.localStorage.setItem(draftKey(uid), JSON.stringify({ ...d, savedAt: now() }));
  } catch {
    /* Storage may be unavailable. Keep the active form in memory. */
  }
}
export function clearDraft(uid: string) {
  try {
    window.localStorage.removeItem(draftKey(uid));
  } catch {
    /* Storage unavailable. */
  }
}

export function findMemberDossier(app: AppState, uid: string | undefined) {
  return uid
    ? app.dossiers.find((d) => d.ownerUserId === uid && d.status !== "archive")
    : undefined;
}

export function submitDossier(
  uid: string,
  data: {
    notice: NoticeRecord;
    profile: ProfileData;
    residence: ResidenceData;
    activity: ActivityData;
    participation: ParticipationData;
  },
): Dossier {
  if (!submissionSchema.safeParse(data).success)
    throw new Error(
      "Informations de recensement invalides. Vérifiez la notice et les étapes du dossier.",
    );
  const app = getSnapshot().app;
  if (findMemberDossier(app, uid)) throw new Error("Un dossier existe déjà pour ce compte.");
  if (
    !isValidResidence(
      data.residence.regionCode,
      data.residence.departmentCode,
      data.residence.arrondissementCode,
    )
  )
    throw new Error("Localisation invalide.");
  const rng = cryptoRng();
  const t = now();
  const d: Dossier = {
    id: generateId(rng),
    reference: generateReference(rng),
    ownerUserId: uid,
    status: "soumis",
    createdAt: data.notice.acknowledgedAt,
    submittedAt: t,
    updatedAt: t,
    ...data,
    history: [{ at: t, from: null, to: "soumis", actorRole: "membre", actorLabel: "Vous" }],
  };
  let next = { ...app, dossiers: [d, ...app.dossiers] };
  next = audit(next, "Membre", "membre", "soumission_dossier", d.reference, d.residence.regionCode);
  commit({ app: next });
  return d;
}

const SENSITIVE: CorrectableField[] = ["identite", "residence"];

export function memberUpdate(
  dossierId: string,
  patch: {
    profile?: ProfileData;
    residence?: ResidenceData;
    activity?: ActivityData;
    participation?: ParticipationData;
  },
  changed: CorrectableField[],
) {
  const app = getSnapshot().app;
  const d = app.dossiers.find((x) => x.id === dossierId);
  if (!d) throw new Error("Dossier introuvable.");
  if (
    patch.residence &&
    !isValidResidence(
      patch.residence.regionCode,
      patch.residence.departmentCode,
      patch.residence.arrondissementCode,
    )
  )
    throw new Error("Localisation invalide.");
  const t = now();
  let to: DossierStatus = d.status;
  if (d.status === "action_requise") to = "soumis";
  else if (d.status === "valide" && changed.some((c) => SENSITIVE.includes(c)))
    to = "en_verification";
  if (to !== d.status && !canTransition(d.status, to, "membre"))
    throw new Error("Transition non autorisée.");
  commit({
    app: updateDossier(app, dossierId, (x) => ({
      ...x,
      ...patch,
      status: to,
      updatedAt: t,
      lastConfirmedAt: t,
      correction: to === "soumis" ? undefined : x.correction,
      history:
        to !== x.status
          ? [...x.history, { at: t, from: x.status, to, actorRole: "membre", actorLabel: "Vous" }]
          : x.history,
    })),
  });
}

export function confirmProfile(dossierId: string) {
  const app = getSnapshot().app;
  commit({
    app: updateDossier(app, dossierId, (x) => ({ ...x, lastConfirmedAt: now(), updatedAt: now() })),
  });
}

export function createDataRequest(
  uid: string,
  dossierId: string | undefined,
  type: DataRequestType,
  message?: string,
) {
  const app = getSnapshot().app;
  const rng = cryptoRng();
  const r = {
    id: generateId(rng),
    reference: generateReference(rng, "DR"),
    ownerUserId: uid,
    dossierId,
    type,
    status: "recue" as const,
    createdAt: now(),
    message,
  };
  commit({ app: { ...app, requests: [r, ...app.requests] } });
  return r;
}

/* ───────── Staff ───────── */

export function decide(
  staff: StaffUser,
  dossierId: string,
  to: DossierStatus,
  opts: { reasonCode?: string; fields?: CorrectableField[] } = {},
) {
  const app = getSnapshot().app;
  const d = app.dossiers.find((x) => x.id === dossierId);
  if (!d) throw new Error("Dossier introuvable.");
  if (!canDecideDossier(staff, d) || !canTransition(d.status, to, staff.role)) {
    commit({
      app: audit(app, staff.name, staff.role, "echec_autorisation", d.reference, staff.scope),
    });
    throw new Error("Action non autorisée pour votre rôle ou votre périmètre.");
  }
  if ((to === "action_requise" || to === "refuse") && !opts.reasonCode)
    throw new Error("Un motif est obligatoire.");
  if (to === "action_requise" && !opts.fields?.length)
    throw new Error("Indiquez au moins un champ à corriger.");
  const t = now();
  const correction =
    to === "action_requise" && opts.fields?.length && opts.reasonCode
      ? { fields: opts.fields, reasonCode: opts.reasonCode, requestedAt: t }
      : undefined;
  let next = updateDossier(app, dossierId, (x) => ({
    ...x,
    status: to,
    updatedAt: t,
    decidedAt: ["valide", "refuse", "action_requise"].includes(to) ? t : x.decidedAt,
    lastConfirmedAt: to === "valide" ? (x.lastConfirmedAt ?? t) : x.lastConfirmedAt,
    correction,
    history: [
      ...x.history,
      {
        at: t,
        from: x.status,
        to,
        actorRole: staff.role,
        actorLabel: staff.name,
        reasonCode: opts.reasonCode,
      },
    ],
  }));
  const action: AuditAction =
    to === "valide"
      ? "decision_validation"
      : to === "action_requise"
        ? "decision_correction"
        : to === "refuse"
          ? "decision_refus"
          : "consultation_dossier";
  next = audit(next, staff.name, staff.role, action, d.reference, d.residence.regionCode);
  commit({ app: next });
}

export function logAudit(staff: StaffUser, action: AuditAction, target: string) {
  commit({ app: audit(getSnapshot().app, staff.name, staff.role, action, target, staff.scope) });
}

export function updateStaff(
  actor: StaffUser,
  id: string,
  patch: Partial<Pick<StaffUser, "role" | "scope" | "status">>,
) {
  if (actor.role !== "admin_national") throw new Error("Réservé à l'administration nationale.");
  let app = getSnapshot().app;
  app = { ...app, staff: app.staff.map((u) => (u.id === id ? { ...u, ...patch } : u)) };
  app = audit(
    app,
    actor.name,
    actor.role,
    patch.status ? "suspension_compte" : "changement_role",
    id,
    "national",
  );
  commit({ app });
}

export function updateRequest(
  actor: StaffUser,
  id: string,
  status: AppState["requests"][number]["status"],
) {
  let app = getSnapshot().app;
  app = { ...app, requests: app.requests.map((r) => (r.id === id ? { ...r, status } : r)) };
  app = audit(app, actor.name, actor.role, "traitement_demande", id, "national");
  commit({ app });
}

export function updateContent(id: string, status: AppState["content"][number]["status"]) {
  const app = getSnapshot().app;
  commit({
    app: {
      ...app,
      content: app.content.map((c) => (c.id === id ? { ...c, status, updatedAt: now() } : c)),
    },
  });
}

export function resetDemo() {
  window.localStorage.removeItem(KEY_STATE);
  clientSnapshot = null;
  serverSnapshot = null;
  listeners.forEach((l) => l());
}
