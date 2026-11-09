import { suppress, median, processingDays, isFresh, countBy } from "./stats";
import type { AgeBand, Dossier, Situation } from "./types";

/**
 * Fictional "representative member" of a region, built only from aggregates.
 * Never derived from a single person; null when the region is below the suppression threshold.
 */
export interface PersonaStat {
  key: "VAL" | "AJR" | "DIV" | "DEL" | "PAR" | "VOL";
  label: string;
  value: number; // 0..99
}

export interface Persona {
  regionCode: string;
  sample: number;
  rating: number;
  sectorCode: string;
  situation: Situation;
  ageBand: AgeBand;
  departmentCode: string;
  stats: PersonaStat[];
}

const SECTOR_COUNT = 13;
const clamp99 = (v: number) => Math.max(0, Math.min(99, Math.round(v)));
const mode = (rec: Record<string, number>) =>
  Object.entries(rec).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] ?? "";

export function buildPersona(
  all: Dossier[],
  regionCode: string,
  now: Date,
  maxRegionCount?: number,
): Persona | null {
  const rows = all.filter((d) => d.submittedAt && d.residence.regionCode === regionCode);
  if (suppress(rows.length) === null || rows.length === 0) return null;

  const decided = rows.filter((d) => d.status === "valide" || d.status === "refuse");
  const validated = rows.filter((d) => d.status === "valide");
  const sectors = countBy(rows, (d) => d.activity.sectorCode);
  // Shannon entropy normalised over the sector list
  const ent = Object.values(sectors).reduce((s, c) => {
    const p = c / rows.length;
    return s - p * Math.log(p);
  }, 0);
  const days = rows.map(processingDays).filter((v): v is number => v !== null && v >= 0);
  const med = median(days);
  const maxN = maxRegionCount ?? rows.length;

  const stats: PersonaStat[] = [
    { key: "VAL", label: "Validation", value: clamp99(decided.length ? (validated.length / decided.length) * 99 : 0) },
    { key: "AJR", label: "À jour", value: clamp99(validated.length ? (validated.filter((d) => isFresh(d, now)).length / validated.length) * 99 : 0) },
    { key: "DIV", label: "Diversité", value: clamp99((ent / Math.log(SECTOR_COUNT)) * 99) },
    { key: "DEL", label: "Rapidité", value: med === null ? 0 : clamp99(99 - med * 2) },
    { key: "PAR", label: "Engagement", value: clamp99((rows.filter((d) => d.participation.interested).length / rows.length) * 99) },
    { key: "VOL", label: "Volume", value: clamp99((rows.length / Math.max(1, maxN)) * 99) },
  ];

  return {
    regionCode,
    sample: rows.length,
    rating: clamp99(stats.reduce((s, x) => s + x.value, 0) / stats.length),
    sectorCode: mode(sectors),
    situation: mode(countBy(rows, (d) => d.activity.situation)) as Situation,
    ageBand: mode(countBy(rows, (d) => d.profile.ageBand)) as AgeBand,
    departmentCode: mode(countBy(rows, (d) => d.residence.departmentCode)),
    stats,
  };
}

/** Archetype title shown on the card, per dominant sector. */
export const SECTOR_TITLE: Record<string, string> = {
  COM: "Négociant",
  AGR: "Éleveur · Agriculteur",
  TRA: "Transporteur",
  ART: "Artisan brodeur",
  EDU: "Enseignant",
  SAN: "Soignant",
  ADM: "Agent public",
  BTP: "Bâtisseur",
  NUM: "Technicien numérique",
  FIN: "Financier",
  CUL: "Passeur de culture",
  RES: "Restaurateur",
  AUT: "Polyvalent",
};
