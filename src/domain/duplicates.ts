import type { Dossier } from "./types";

/** Normalise names for comparison: lowercase, no accents, collapsed spaces. */
export function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export interface DuplicateSignal {
  a: Dossier;
  b: Dossier;
  score: number;
  reasons: string[];
}

/**
 * Documented, proportionate criteria (CdCF §7.4). Output is a review signal, never a decision:
 * - same normalised full name (+50)
 * - same contact (+40)
 * - same arrondissement (+10) and same age band (+10)
 * Signal emitted when score ≥ 60.
 */
export function findDuplicates(dossiers: Dossier[], threshold = 60): DuplicateSignal[] {
  const out: DuplicateSignal[] = [];
  const byName = new Map<string, Dossier[]>();
  const byContact = new Map<string, Dossier[]>();
  for (const d of dossiers) {
    if (d.status === "archive" || d.status === "brouillon") continue;
    const n = normalize(`${d.profile.firstName} ${d.profile.lastName}`);
    byName.set(n, [...(byName.get(n) ?? []), d]);
    const c = d.profile.contact.replace(/\s/g, "").toLowerCase();
    byContact.set(c, [...(byContact.get(c) ?? []), d]);
  }
  const seen = new Set<string>();
  const consider = (group: Dossier[]) => {
    for (let i = 0; i < group.length; i++)
      for (let j = i + 1; j < group.length; j++) {
        const [a, b] = [group[i], group[j]];
        const key = [a.id, b.id].sort().join(":");
        if (seen.has(key)) continue;
        seen.add(key);
        const reasons: string[] = [];
        let score = 0;
        if (normalize(`${a.profile.firstName} ${a.profile.lastName}`) === normalize(`${b.profile.firstName} ${b.profile.lastName}`)) {
          score += 50;
          reasons.push("Nom identique");
        }
        if (a.profile.contact.replace(/\s/g, "").toLowerCase() === b.profile.contact.replace(/\s/g, "").toLowerCase()) {
          score += 40;
          reasons.push("Contact identique");
        }
        if (a.residence.arrondissementCode === b.residence.arrondissementCode) {
          score += 10;
          reasons.push("Même arrondissement");
        }
        if (a.profile.ageBand === b.profile.ageBand) {
          score += 10;
          reasons.push("Même tranche d'âge");
        }
        if (score >= threshold) out.push({ a, b, score, reasons });
      }
  };
  byName.forEach((g) => g.length > 1 && consider(g));
  byContact.forEach((g) => g.length > 1 && consider(g));
  return out.sort((x, y) => y.score - x.score);
}
