/**
 * HAOUSSA domain types — framework-agnostic, shared by UI and (future) API.
 * Mirrors the conceptual model of the Blueprint §4 with data minimisation (CdCF §8).
 */

export type DossierStatus =
  | "brouillon"
  | "soumis"
  | "en_verification"
  | "action_requise"
  | "valide"
  | "refuse"
  | "archive";

export type Role =
  | "membre"
  | "agent"
  | "verificateur"
  | "coordinateur"
  | "admin_national"
  | "editeur"
  | "auditeur";

export type StaffRole = Exclude<Role, "membre">;

/** "national" or a region code (AD, CE, …) */
export type Scope = "national" | string;

export type AgeBand = "18-24" | "25-34" | "35-44" | "45-54" | "55-64" | "65+";

export type Situation =
  | "salarie"
  | "independant"
  | "entrepreneur"
  | "etudiant"
  | "recherche_emploi"
  | "retraite"
  | "autre"
  | "non_communique";

export type ContactType = "telephone" | "email";

export interface ProfileData {
  firstName: string;
  lastName: string;
  ageBand: AgeBand;
  contactType: ContactType;
  contact: string;
}

export interface ResidenceData {
  regionCode: string;
  departmentCode: string;
  arrondissementCode: string;
  localite?: string;
}

export interface ActivityData {
  situation: Situation;
  sectorCode: string;
  profession?: string;
}

export interface ParticipationData {
  interested: boolean;
  interests: string[];
}

export interface NoticeRecord {
  version: string;
  acknowledgedAt: string;
  acceptsCentreContact: boolean;
}

export interface StatusEvent {
  at: string;
  from: DossierStatus | null;
  to: DossierStatus;
  actorRole: Role | "systeme";
  actorLabel: string;
  reasonCode?: string;
}

export interface CorrectionRequest {
  fields: CorrectableField[];
  reasonCode: string;
  requestedAt: string;
}

export type CorrectableField =
  | "identite"
  | "age"
  | "contact"
  | "residence"
  | "activite";

export interface Dossier {
  id: string;
  reference: string;
  ownerUserId?: string;
  status: DossierStatus;
  createdAt: string;
  submittedAt?: string;
  updatedAt: string;
  decidedAt?: string;
  lastConfirmedAt?: string;
  profile: ProfileData;
  residence: ResidenceData;
  activity: ActivityData;
  participation: ParticipationData;
  notice: NoticeRecord;
  history: StatusEvent[];
  correction?: CorrectionRequest;
  assistedBy?: string;
  campaignId?: string;
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  scope: Scope;
  status: "actif" | "suspendu";
  mfa: boolean;
  lastSeenAt: string;
}

export interface AuditEvent {
  id: string;
  at: string;
  actor: string;
  role: Role | "systeme";
  action: AuditAction;
  target: string;
  scope: Scope;
}

export type AuditAction =
  | "connexion"
  | "echec_autorisation"
  | "consultation_dossier"
  | "decision_validation"
  | "decision_correction"
  | "decision_refus"
  | "changement_role"
  | "suspension_compte"
  | "export_agrege"
  | "modification_parametre"
  | "traitement_demande"
  | "soumission_dossier"
  | "saisie_assistee";

export type DataRequestType = "acces" | "rectification" | "suppression" | "opposition";

export interface DataRequest {
  id: string;
  reference: string;
  dossierId?: string;
  ownerUserId?: string;
  type: DataRequestType;
  status: "recue" | "en_cours" | "traitee" | "rejetee";
  createdAt: string;
  message?: string;
}

export interface Campaign {
  id: string;
  name: string;
  regionCode: Scope;
  startsAt: string;
  endsAt: string;
  target: number;
  status: "planifiee" | "active" | "terminee";
}

export interface ContentItem {
  id: string;
  kind: "page" | "actualite" | "evenement" | "faq";
  title: string;
  status: "brouillon" | "publie" | "depublie";
  updatedAt: string;
  author: string;
}

export interface MemberAccount {
  userId: string;
  email: string;
  displayName: string;
  provider: "email" | "google" | "telephone";
  preferences: { email: boolean; sms: boolean; actualites: boolean };
}

export type Session =
  | { kind: "member"; account: MemberAccount }
  | null;
