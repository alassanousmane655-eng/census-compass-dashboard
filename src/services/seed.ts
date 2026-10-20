import { REGIONS } from "@/data/territories";
import { generateId, generateReference, mulberry32, type Rng } from "@/domain/ids";
import { AGE_BANDS, CORRECTION_REASONS, INTERESTS, NOTICE_VERSION, REFUSAL_REASONS, SECTORS, SITUATIONS } from "@/domain/reference";
import type {
  AuditEvent,
  Campaign,
  ContentItem,
  DataRequest,
  Dossier,
  DossierStatus,
  StaffUser,
  StatusEvent,
} from "@/domain/types";

/** Fictitious demo data — never real people (CdCF §4.2). Deterministic so SSR and client match. */
export const DEMO_NOW = new Date("2026-10-20T09:00:00Z");

const FIRST = ["Aminatou", "Hadiza", "Zainab", "Fatimatou", "Hauwa", "Aïssatou", "Maryam", "Rakiya", "Bilkisu", "Halima", "Abdoulaye", "Moussa", "Ibrahim", "Sani", "Usman", "Aliyu", "Bello", "Haruna", "Yakubu", "Mahamadou", "Garba", "Idrissa", "Salisu", "Nafisa", "Saratou"];
const LAST = ["Bello", "Garba", "Abubakar", "Danjuma", "Maïgari", "Haman", "Sani", "Yaya", "Oumarou", "Adamou", "Moussa", "Hamadou", "Inoussa", "Mal Bakari", "Dan Azumi", "Kano", "Issa", "Saidou", "Lawan", "Tukur"];

// Weighting of demo volumes by region (fiction, roughly plausible distribution)
const WEIGHTS: Record<string, number> = { AD: 16, CE: 12, ES: 6, EN: 20, LT: 10, NO: 22, NW: 2, OU: 4, SU: 3, SW: 5 };

const pick = <T,>(rng: Rng, arr: readonly T[]) => arr[Math.floor(rng() * arr.length)];
const iso = (d: Date) => d.toISOString();
const addDays = (d: Date, n: number) => new Date(+d + n * 86_400_000);

function weightedRegion(rng: Rng) {
  const total = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
  let x = rng() * total;
  for (const r of REGIONS) {
    x -= WEIGHTS[r.code] ?? 1;
    if (x <= 0) return r;
  }
  return REGIONS[0];
}

function makeDossier(rng: Rng): Dossier {
  const region = weightedRegion(rng);
  const dept = pick(rng, region.departments);
  const arr = pick(rng, dept.arrondissements);
  const start = new Date("2026-01-05T08:00:00Z");
  const span = (+DEMO_NOW - +start) / 86_400_000;
  // growth curve: more recent registrations
  const created = addDays(start, Math.floor(Math.sqrt(rng()) * span));
  const submitted = addDays(created, Math.floor(rng() * 2));
  const firstName = pick(rng, FIRST);
  const lastName = pick(rng, LAST);
  const phone = rng() > 0.25;
  const ageDays = (+DEMO_NOW - +submitted) / 86_400_000;

  const r = rng();
  let status: DossierStatus;
  if (ageDays < 4) status = r < 0.7 ? "soumis" : "en_verification";
  else if (r < 0.66) status = "valide";
  else if (r < 0.78) status = "en_verification";
  else if (r < 0.86) status = "soumis";
  else if (r < 0.95) status = "action_requise";
  else status = "refuse";

  const history: StatusEvent[] = [
    { at: iso(submitted), from: null, to: "soumis", actorRole: "membre", actorLabel: "Le membre" },
  ];
  let decidedAt: string | undefined;
  if (status !== "soumis") {
    const verifAt = addDays(submitted, 1 + Math.floor(rng() * 3));
    history.push({ at: iso(verifAt), from: "soumis", to: "en_verification", actorRole: "verificateur", actorLabel: `Vérificateur ${region.code}` });
    if (["valide", "action_requise", "refuse"].includes(status)) {
      const dec = addDays(verifAt, 1 + Math.floor(rng() * 9));
      decidedAt = iso(dec > DEMO_NOW ? DEMO_NOW : dec);
      const reasonCode =
        status === "action_requise" ? pick(rng, CORRECTION_REASONS).code : status === "refuse" ? pick(rng, REFUSAL_REASONS).code : undefined;
      history.push({ at: decidedAt, from: "en_verification", to: status, actorRole: "verificateur", actorLabel: `Vérificateur ${region.code}`, reasonCode });
    }
  }

  const situation = pick(rng, SITUATIONS).value;
  return {
    id: generateId(rng),
    reference: generateReference(rng),
    status,
    createdAt: iso(created),
    submittedAt: iso(submitted),
    updatedAt: history[history.length - 1].at,
    decidedAt,
    lastConfirmedAt: status === "valide" ? (rng() > 0.15 ? decidedAt : undefined) : undefined,
    profile: {
      firstName,
      lastName,
      ageBand: pick(rng, AGE_BANDS).value,
      contactType: phone ? "telephone" : "email",
      contact: phone
        ? `+237 6${Math.floor(rng() * 10)}${Math.floor(rng() * 10)} ${String(Math.floor(rng() * 1000)).padStart(3, "0")} ${String(Math.floor(rng() * 1000)).padStart(3, "0")}`
        : `${firstName}.${lastName}`.toLowerCase().normalize("NFD").replace(/[^a-z.]/g, "") + "@exemple.cm",
    },
    residence: { regionCode: region.code, departmentCode: dept.code, arrondissementCode: arr.code },
    activity: {
      situation,
      sectorCode: ["etudiant", "recherche_emploi", "retraite", "non_communique"].includes(situation) ? "AUT" : pick(rng, SECTORS).code,
    },
    participation: { interested: rng() > 0.4, interests: rng() > 0.5 ? [pick(rng, INTERESTS).value] : [] },
    notice: { version: NOTICE_VERSION, acknowledgedAt: iso(created), acceptsCentreContact: rng() > 0.3 },
    history,
    correction:
      status === "action_requise"
        ? { fields: [rng() > 0.5 ? "residence" : "contact"], reasonCode: history.at(-1)!.reasonCode!, requestedAt: decidedAt! }
        : undefined,
    assistedBy: rng() > 0.8 ? `Agent ${region.code}-0${1 + Math.floor(rng() * 4)}` : undefined,
  };
}

function makeStaff(): StaffUser[] {
  const base: Omit<StaffUser, "id" | "lastSeenAt" | "status" | "mfa">[] = [
    { name: "Admin national (démo)", email: "admin@haoussa.demo", role: "admin_national", scope: "national" },
    { name: "Auditrice (démo)", email: "audit@haoussa.demo", role: "auditeur", scope: "national" },
    { name: "Éditeur de contenu (démo)", email: "contenu@haoussa.demo", role: "editeur", scope: "national" },
    { name: "Coordinateur Nord (démo)", email: "coord.no@haoussa.demo", role: "coordinateur", scope: "NO" },
    { name: "Coordinatrice Extrême-Nord (démo)", email: "coord.en@haoussa.demo", role: "coordinateur", scope: "EN" },
    { name: "Vérificateur Nord (démo)", email: "verif.no@haoussa.demo", role: "verificateur", scope: "NO" },
    { name: "Vérificatrice Adamaoua (démo)", email: "verif.ad@haoussa.demo", role: "verificateur", scope: "AD" },
    { name: "Vérificateur Centre (démo)", email: "verif.ce@haoussa.demo", role: "verificateur", scope: "CE" },
    { name: "Agent Littoral 01 (démo)", email: "agent.lt01@haoussa.demo", role: "agent", scope: "LT" },
    { name: "Agent Nord 02 (démo)", email: "agent.no02@haoussa.demo", role: "agent", scope: "NO" },
  ];
  return base.map((u, i) => ({
    ...u,
    id: `staff-${i + 1}`,
    status: i === 9 ? "suspendu" : "actif",
    mfa: u.role !== "agent",
    lastSeenAt: iso(addDays(DEMO_NOW, -i)),
  }));
}

export interface AppState {
  version: number;
  dossiers: Dossier[];
  staff: StaffUser[];
  audit: AuditEvent[];
  requests: DataRequest[];
  campaigns: Campaign[];
  content: ContentItem[];
}

export const STATE_VERSION = 3;

export function buildSeed(): AppState {
  const rng = mulberry32(20261020);
  const dossiers = Array.from({ length: 1480 }, () => makeDossier(rng));
  // a few intentional near-duplicates for the review queue
  for (let i = 0; i < 6; i++) {
    const src = dossiers[i * 37];
    const dup = makeDossier(rng);
    dup.profile = { ...src.profile, firstName: src.profile.firstName.toUpperCase() };
    dup.residence = { ...src.residence };
    dup.status = "soumis";
    dup.history = dup.history.slice(0, 1);
    dup.decidedAt = undefined;
    dup.correction = undefined;
    dossiers.push(dup);
  }
  const staff = makeStaff();
  const audit: AuditEvent[] = Array.from({ length: 60 }, (_, i) => {
    const u = staff[i % 8];
    const actions = ["connexion", "consultation_dossier", "decision_validation", "export_agrege", "changement_role", "echec_autorisation"] as const;
    return {
      id: `aud-${i}`,
      at: iso(addDays(DEMO_NOW, -i * 0.37)),
      actor: u.name,
      role: u.role,
      action: actions[i % actions.length],
      target: i % 6 === 4 ? "staff-9" : dossiers[i * 11].reference,
      scope: u.scope,
    };
  });
  const requests: DataRequest[] = [
    { id: "req-1", reference: "DR-7KQ2-M9XD", type: "rectification", status: "recue", createdAt: iso(addDays(DEMO_NOW, -1)), dossierId: dossiers[3].id },
    { id: "req-2", reference: "DR-P4HT-2WNC", type: "acces", status: "en_cours", createdAt: iso(addDays(DEMO_NOW, -4)), dossierId: dossiers[8].id },
    { id: "req-3", reference: "DR-ZX8E-6RBF", type: "suppression", status: "traitee", createdAt: iso(addDays(DEMO_NOW, -12)), dossierId: dossiers[20].id },
  ];
  const campaigns: Campaign[] = [
    { id: "camp-1", name: "Lancement pilote — Nord", regionCode: "NO", startsAt: "2026-01-05", endsAt: "2026-06-30", target: 350, status: "terminee" },
    { id: "camp-2", name: "Extrême-Nord — saison sèche", regionCode: "EN", startsAt: "2026-03-01", endsAt: "2026-12-15", target: 400, status: "active" },
    { id: "camp-3", name: "Douala & Yaoundé — quartiers", regionCode: "national", startsAt: "2026-09-01", endsAt: "2026-12-31", target: 300, status: "active" },
    { id: "camp-4", name: "Est — tournée des marchés", regionCode: "ES", startsAt: "2027-01-10", endsAt: "2027-03-31", target: 120, status: "planifiee" },
  ];
  const content: ContentItem[] = [
    { id: "c1", kind: "page", title: "Le Centre — présentation", status: "publie", updatedAt: iso(addDays(DEMO_NOW, -20)), author: "Éditeur" },
    { id: "c2", kind: "actualite", title: "Ouverture du recensement communautaire", status: "publie", updatedAt: iso(addDays(DEMO_NOW, -60)), author: "Éditeur" },
    { id: "c3", kind: "evenement", title: "Journée de la langue haoussa", status: "brouillon", updatedAt: iso(addDays(DEMO_NOW, -2)), author: "Éditeur" },
    { id: "c4", kind: "faq", title: "Qui peut se faire recenser ?", status: "publie", updatedAt: iso(addDays(DEMO_NOW, -30)), author: "Éditeur" },
    { id: "c5", kind: "actualite", title: "Bilan du pilote régional", status: "depublie", updatedAt: iso(addDays(DEMO_NOW, -90)), author: "Éditeur" },
  ];
  return { version: STATE_VERSION, dossiers, staff, audit, requests, campaigns, content };
}
