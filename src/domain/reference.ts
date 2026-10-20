import type { AgeBand, CorrectableField, Situation } from "./types";

export const NOTICE_VERSION = "notice-v1.0-provisoire";

export const AGE_BANDS: { value: AgeBand; label: string }[] = [
  { value: "18-24", label: "18 à 24 ans" },
  { value: "25-34", label: "25 à 34 ans" },
  { value: "35-44", label: "35 à 44 ans" },
  { value: "45-54", label: "45 à 54 ans" },
  { value: "55-64", label: "55 à 64 ans" },
  { value: "65+", label: "65 ans et plus" },
];

export const SITUATIONS: { value: Situation; label: string }[] = [
  { value: "salarie", label: "Salarié(e)" },
  { value: "independant", label: "Indépendant(e)" },
  { value: "entrepreneur", label: "Entrepreneur(e)" },
  { value: "etudiant", label: "Étudiant(e)" },
  { value: "recherche_emploi", label: "En recherche d'emploi" },
  { value: "retraite", label: "Retraité(e)" },
  { value: "autre", label: "Autre situation" },
  { value: "non_communique", label: "Je préfère ne pas répondre" },
];

export const SECTORS: { code: string; label: string }[] = [
  { code: "COM", label: "Commerce et négoce" },
  { code: "AGR", label: "Agriculture et élevage" },
  { code: "TRA", label: "Transport et logistique" },
  { code: "ART", label: "Artisanat et textile" },
  { code: "EDU", label: "Éducation et formation" },
  { code: "SAN", label: "Santé et action sociale" },
  { code: "ADM", label: "Administration publique" },
  { code: "BTP", label: "Bâtiment et travaux publics" },
  { code: "NUM", label: "Numérique et télécoms" },
  { code: "FIN", label: "Banque, finance et assurance" },
  { code: "CUL", label: "Culture, médias et religion" },
  { code: "RES", label: "Restauration et hôtellerie" },
  { code: "AUT", label: "Autre secteur" },
];

export const INTERESTS: { value: string; label: string }[] = [
  { value: "langue", label: "Langue et transmission" },
  { value: "evenements", label: "Événements culturels" },
  { value: "benevolat", label: "Bénévolat" },
  { value: "formation", label: "Formation et emploi" },
  { value: "entrepreneuriat", label: "Entrepreneuriat" },
];

export const CORRECTABLE_FIELDS: { value: CorrectableField; label: string }[] = [
  { value: "identite", label: "Nom et prénom(s)" },
  { value: "age", label: "Tranche d'âge" },
  { value: "contact", label: "Moyen de contact" },
  { value: "residence", label: "Lieu de résidence" },
  { value: "activite", label: "Situation professionnelle" },
];

/** Reason codes — short, non-sensitive, member-understandable (CdCF F-ADM-002). */
export const CORRECTION_REASONS: { code: string; label: string }[] = [
  { code: "COR-INCOMPLET", label: "Information incomplète" },
  { code: "COR-INCOHERENT", label: "Informations incohérentes entre elles" },
  { code: "COR-CONTACT", label: "Moyen de contact non joignable" },
  { code: "COR-LOCALISATION", label: "Localisation à préciser" },
];

export const REFUSAL_REASONS: { code: string; label: string }[] = [
  { code: "REF-DOUBLON", label: "Dossier en double confirmé" },
  { code: "REF-ELIGIBILITE", label: "Critères d'éligibilité non remplis (à valider par le Centre)" },
  { code: "REF-NON-JOIGNABLE", label: "Personne non joignable après relances" },
];

export const FRESHNESS_MONTHS = 12; // [À VALIDER] DEC-05
export const SUPPRESSION_THRESHOLD = 10; // [À VALIDER] DEC-09

export const labelOf = <T extends string>(list: { value?: T; code?: string; label: string }[], v: string) =>
  list.find((x) => (x.value ?? x.code) === v)?.label ?? v;
