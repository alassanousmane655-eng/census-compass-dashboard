import type { Dossier, Role, Scope, StaffRole } from "./types";

export type Permission =
  | "dossier.lire"
  | "dossier.saisie_assistee"
  | "dossier.decider"
  | "doublons.examiner"
  | "stats.lire"
  | "export.agrege"
  | "territoires.gerer"
  | "secteurs.gerer"
  | "utilisateurs.gerer"
  | "contenu.editer"
  | "demandes.traiter"
  | "audit.lire"
  | "parametres.gerer"
  | "campagnes.gerer";

/** Role × permission matrix (CdCF §9). Scope is enforced separately by `inScope`. */
export const ROLE_PERMISSIONS: Record<StaffRole, Permission[]> = {
  agent: ["dossier.saisie_assistee", "dossier.lire"],
  verificateur: ["dossier.lire", "dossier.decider", "doublons.examiner", "stats.lire"],
  coordinateur: [
    "dossier.lire",
    "dossier.decider",
    "doublons.examiner",
    "stats.lire",
    "export.agrege",
    "campagnes.gerer",
  ],
  admin_national: [
    "dossier.lire",
    "dossier.decider",
    "doublons.examiner",
    "stats.lire",
    "export.agrege",
    "territoires.gerer",
    "secteurs.gerer",
    "utilisateurs.gerer",
    "demandes.traiter",
    "parametres.gerer",
    "campagnes.gerer",
  ],
  editeur: ["contenu.editer"], // never any census data (F-ADM-007)
  auditeur: ["audit.lire", "stats.lire"],
};

export const ROLE_LABELS: Record<Role, string> = {
  membre: "Membre",
  agent: "Agent de recensement",
  verificateur: "Vérificateur régional",
  coordinateur: "Coordinateur régional",
  admin_national: "Administrateur national",
  editeur: "Éditeur de contenu",
  auditeur: "Auditeur / protection des données",
};

export function can(role: StaffRole, p: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(p);
}

export function inScope(scope: Scope, regionCode: string): boolean {
  return scope === "national" || scope === regionCode;
}

/** Combined check applied to every dossier access — must also be enforced server-side. */
export function canReadDossier(user: { role: StaffRole; scope: Scope }, d: Pick<Dossier, "residence">): boolean {
  return can(user.role, "dossier.lire") && inScope(user.scope, d.residence.regionCode);
}

export function canDecideDossier(user: { role: StaffRole; scope: Scope }, d: Pick<Dossier, "residence">): boolean {
  return can(user.role, "dossier.decider") && inScope(user.scope, d.residence.regionCode);
}
