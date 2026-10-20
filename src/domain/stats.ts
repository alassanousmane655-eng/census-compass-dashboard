import { FRESHNESS_MONTHS, SUPPRESSION_THRESHOLD } from "./reference";
import type { Dossier, DossierStatus } from "./types";

/** Statistical disclosure control (CdCF F-OBS-005): small cells are masked, never shown. */
export function suppress(count: number, threshold = SUPPRESSION_THRESHOLD): number | null {
  if (count === 0) return 0;
  return count < threshold ? null : count;
}

export function formatCell(v: number | null): string {
  return v === null ? `< ${SUPPRESSION_THRESHOLD}` : v.toLocaleString("fr-FR");
}

export function isFresh(d: Pick<Dossier, "lastConfirmedAt">, now: Date): boolean {
  if (!d.lastConfirmedAt) return false;
  const limit = new Date(now);
  limit.setMonth(limit.getMonth() - FRESHNESS_MONTHS);
  return new Date(d.lastConfirmedAt) >= limit;
}

export const PENDING: DossierStatus[] = ["soumis", "en_verification", "action_requise"];

export function countBy<T>(items: T[], key: (t: T) => string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const it of items) {
    const k = key(it);
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}

export function median(nums: number[]): number | null {
  if (!nums.length) return null;
  const s = [...nums].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** Processing time in days between submission and decision, for decided dossiers. */
export function processingDays(d: Dossier): number | null {
  if (!d.submittedAt || !d.decidedAt) return null;
  return Math.round((+new Date(d.decidedAt) - +new Date(d.submittedAt)) / 86_400_000);
}

export interface Indicator {
  id: string;
  label: string;
  formula: string;
  period: string;
  limits: string;
}

export const INDICATORS: Record<string, Indicator> = {
  soumis: {
    id: "soumis",
    label: "Dossiers soumis",
    formula: "Nombre de dossiers ayant atteint au moins une fois l'état « Soumis ».",
    period: "Depuis l'ouverture du recensement",
    limits: "Compte des dossiers, pas des personnes de la communauté. Non exhaustif.",
  },
  valides: {
    id: "valides",
    label: "Dossiers validés",
    formula: "Dossiers dont l'état courant est « Validé ».",
    period: "État à la date de mise à jour",
    limits: "Un dossier validé ne constitue pas une preuve d'identité.",
  },
  attente: {
    id: "attente",
    label: "Dossiers en attente",
    formula: "Soumis + En vérification + Action requise.",
    period: "État à la date de mise à jour",
    limits: "Inclut les dossiers en attente de correction par le membre.",
  },
  delai: {
    id: "delai",
    label: "Délai médian de traitement",
    formula: "Médiane (date de décision − date de soumission) en jours.",
    period: "Dossiers décidés sur la période",
    limits: "Exclut les dossiers non encore décidés.",
  },
  ajour: {
    id: "ajour",
    label: "Profils à jour",
    formula: `Dossiers validés confirmés par la personne au cours des ${FRESHNESS_MONTHS} derniers mois.`,
    period: `${FRESHNESS_MONTHS} mois glissants`,
    limits: "Définition provisoire, à valider par le Centre (DEC-05).",
  },
};
