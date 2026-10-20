import type { DossierStatus, Role } from "./types";

export type Tone = "neutral" | "info" | "warning" | "success" | "danger";

export const STATUS_META: Record<DossierStatus, { label: string; tone: Tone; memberHint: string }> = {
  brouillon: { label: "Brouillon", tone: "neutral", memberHint: "Votre dossier n'est pas encore envoyé." },
  soumis: { label: "Soumis", tone: "info", memberHint: "Votre dossier a été reçu et attend une vérification." },
  en_verification: { label: "En vérification", tone: "info", memberHint: "Un vérificateur examine votre dossier." },
  action_requise: { label: "Action requise", tone: "warning", memberHint: "Des corrections sont demandées sur votre dossier." },
  valide: { label: "Validé", tone: "success", memberHint: "Votre dossier est validé. Pensez à le confirmer régulièrement." },
  refuse: { label: "Refusé", tone: "danger", memberHint: "Votre dossier n'a pas été retenu. Vous pouvez demander un réexamen." },
  archive: { label: "Archivé", tone: "neutral", memberHint: "Ce dossier est archivé." },
};

/**
 * State machine (CdCF §7.1). Each transition lists the roles allowed to perform it.
 * A member can never move a dossier to "valide".
 */
export const TRANSITIONS: Record<DossierStatus, Partial<Record<DossierStatus, Role[]>>> = {
  brouillon: { soumis: ["membre", "agent"] },
  soumis: {
    en_verification: ["verificateur", "coordinateur", "admin_national"],
    archive: ["admin_national"],
  },
  en_verification: {
    valide: ["verificateur", "coordinateur", "admin_national"],
    action_requise: ["verificateur", "coordinateur", "admin_national"],
    refuse: ["verificateur", "coordinateur", "admin_national"],
  },
  action_requise: { soumis: ["membre", "agent"] },
  valide: {
    en_verification: ["membre"], // sensitive field update triggers re-verification
    archive: ["admin_national"],
  },
  refuse: { en_verification: ["coordinateur", "admin_national"] }, // réexamen
  archive: {},
};

export function canTransition(from: DossierStatus, to: DossierStatus, role: Role): boolean {
  return TRANSITIONS[from]?.[to]?.includes(role) ?? false;
}

export function allowedTargets(from: DossierStatus, role: Role): DossierStatus[] {
  return (Object.entries(TRANSITIONS[from] ?? {}) as [DossierStatus, Role[]][])
    .filter(([, roles]) => roles.includes(role))
    .map(([to]) => to);
}
