/** Caption bands paced in scroll progress (0..1). Each plateau ≈ 1 viewport on a 420vh hero. */
export interface FilmBand { id: string; range: [number, number]; n?: string; kicker?: string; title?: string; text?: string; align?: "left" | "right"; final?: boolean }

export const BANDS: FilmBand[] = [
  { id: "savoir", range: [-0.1, 0.27], n: "01", kicker: "Savoir-faire", title: "Un savoir-faire transmis de main en main.", text: "Le bonnet brodé attend, fil de cuivre et étoffe à portée de main.", align: "left" },
  { id: "identite", range: [0.3, 0.56], n: "02", kicker: "Identité", title: "Une identité que l’on porte avec fierté.", text: "Il prend le bonnet et le pose sur sa tête.", align: "left" },
  { id: "communaute", range: [0.58, 0.8], n: "03", kicker: "Communauté", title: "Une communauté qui se rassemble.", text: "Sous l’arche, chacun rejoint les siens.", align: "left" },
  { id: "final", range: [0.84, 1.2], final: true },
];

/** Eased in/out plateau. Returns 0..1, fully visible inside the band minus short ramps. */
export function bandOpacity(p: number, [a, b]: [number, number]) {
  const f = Math.min(0.05, (b - a) / 4);
  if (p <= a || p >= b) return 0;
  const x = p < a + f ? (p - a) / f : p > b - f ? (b - p) / f : 1;
  return x * x * (3 - 2 * x);
}
