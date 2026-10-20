/** Unambiguous alphabet (no 0/O, 1/I/L) for human-readable, non-predictable references. */
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

export type Rng = () => number;

/** Deterministic PRNG for seed data only. Real references must use crypto randomness server-side. */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function cryptoRng(): Rng {
  return () => {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] / 4294967296;
  };
}

function chunk(rng: Rng, n: number) {
  let s = "";
  for (let i = 0; i < n; i++) s += ALPHABET[Math.floor(rng() * ALPHABET.length)];
  return s;
}

/** Format HA-XXXX-XXXX — reveals no volume nor sequence (CdCF F-REC-005). */
export function generateReference(rng: Rng, prefix = "HA"): string {
  return `${prefix}-${chunk(rng, 4)}-${chunk(rng, 4)}`;
}

export function generateId(rng: Rng): string {
  return chunk(rng, 16).toLowerCase();
}

export const REFERENCE_PATTERN = /^[A-Z]{2}-[2-9A-HJKMNP-Z]{4}-[2-9A-HJKMNP-Z]{4}$/;
