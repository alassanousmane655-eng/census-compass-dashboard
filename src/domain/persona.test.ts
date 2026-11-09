import { describe, it, expect } from "vitest";
import { buildPersona } from "./persona";
import type { Dossier } from "./types";

const mk = (i: number, over: Partial<Dossier> = {}): Dossier =>
  ({
    id: `d${i}`,
    reference: `R${i}`,
    status: "valide",
    createdAt: "2026-01-01",
    submittedAt: "2026-01-01T00:00:00Z",
    decidedAt: "2026-01-11T00:00:00Z",
    updatedAt: "2026-01-11",
    lastConfirmedAt: "2026-10-01",
    profile: { firstName: "A", lastName: "B", ageBand: "25-34", contactType: "email", contact: "a@b.c" },
    residence: { regionCode: "EN", departmentCode: "EN-DIA", arrondissementCode: "x" },
    activity: { situation: "independant", sectorCode: "AGR" },
    participation: { interested: i % 2 === 0, interests: [] },
    notice: { version: "v", acknowledgedAt: "", acceptsCentreContact: false },
    history: [],
    ...over,
  }) as Dossier;

const now = new Date("2026-11-01");

describe("buildPersona", () => {
  it("returns null below the suppression threshold of 10 dossiers", () => {
    const rows = Array.from({ length: 9 }, (_, i) => mk(i));
    expect(buildPersona(rows, "EN", now)).toBeNull();
  });

  it("builds a persona from 10 dossiers with aggregate values", () => {
    const rows = Array.from({ length: 10 }, (_, i) => mk(i));
    const p = buildPersona(rows, "EN", now)!;
    expect(p.sample).toBe(10);
    expect(p.sectorCode).toBe("AGR");
    expect(p.stats.find((s) => s.key === "VAL")!.value).toBe(99);
    expect(p.stats.find((s) => s.key === "PAR")!.value).toBe(50); // 5/10
    expect(p.stats.find((s) => s.key === "DEL")!.value).toBe(79); // median 10 days
  });

  it("ignores other regions and unsubmitted drafts", () => {
    const rows = [
      ...Array.from({ length: 10 }, (_, i) => mk(i, { residence: { regionCode: "NO", departmentCode: "", arrondissementCode: "" } })),
      ...Array.from({ length: 5 }, (_, i) => mk(100 + i, { submittedAt: undefined })),
    ];
    expect(buildPersona(rows, "EN", now)).toBeNull();
  });
});
