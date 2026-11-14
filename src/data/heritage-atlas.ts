import type { L } from "@/features/heritage/shared/i18n";

/** Structure-ready sample data. Every place is PROVISIONAL until the Centre specifies it. Coordinates are approximate. */
export type Certainty = "documente" | "tradition_orale" | "hypothese" | "a_specifier";
export type Theme = "commerce" | "savoir" | "artisanat" | "architecture";
export interface AtlasPlace { id: string; name: string; lon: number; lat: number; kind: L; summary: L; from: number; themes: Theme[]; certainty: Certainty; region: "sahel" | "cameroun" }

const l = (fr: string, en: string): L => ({ fr, en });
const city = l("Cité historique", "Heritage city"), town = l("Ville", "Town");
const tbd = l("Description à spécifier par le Centre.", "Description to be specified by the Centre.");

export const ATLAS_PLACES: AtlasPlace[] = [
  { id: "kano", name: "Kano", lon: 8.52, lat: 12.0, kind: city, summary: l("Centre historique de savoir, de commerce et de culture.", "A historic centre of learning, trade and culture."), from: 1000, themes: ["commerce", "savoir", "artisanat"], certainty: "a_specifier", region: "sahel" },
  { id: "katsina", name: "Katsina", lon: 7.6, lat: 12.99, kind: city, summary: tbd, from: 1100, themes: ["commerce", "savoir"], certainty: "a_specifier", region: "sahel" },
  { id: "zaria", name: "Zaria", lon: 7.71, lat: 11.07, kind: city, summary: tbd, from: 1100, themes: ["architecture"], certainty: "a_specifier", region: "sahel" },
  { id: "daura", name: "Daura", lon: 8.32, lat: 13.03, kind: city, summary: tbd, from: 1000, themes: ["savoir"], certainty: "a_specifier", region: "sahel" },
  { id: "sokoto", name: "Sokoto", lon: 5.24, lat: 13.06, kind: city, summary: tbd, from: 1800, themes: ["savoir"], certainty: "a_specifier", region: "sahel" },
  { id: "zinder", name: "Zinder", lon: 8.99, lat: 13.8, kind: city, summary: tbd, from: 1700, themes: ["commerce", "architecture"], certainty: "a_specifier", region: "sahel" },
  { id: "maradi", name: "Maradi", lon: 7.1, lat: 13.5, kind: town, summary: tbd, from: 1800, themes: ["commerce"], certainty: "a_specifier", region: "sahel" },
  { id: "maroua", name: "Maroua", lon: 14.32, lat: 10.6, kind: town, summary: tbd, from: 1800, themes: ["commerce", "artisanat"], certainty: "a_specifier", region: "cameroun" },
  { id: "garoua", name: "Garoua", lon: 13.4, lat: 9.3, kind: town, summary: tbd, from: 1800, themes: ["commerce"], certainty: "a_specifier", region: "cameroun" },
  { id: "ngaoundere", name: "Ngaoundéré", lon: 13.58, lat: 7.32, kind: town, summary: tbd, from: 1800, themes: ["commerce"], certainty: "a_specifier", region: "cameroun" },
  { id: "yaounde", name: "Yaoundé", lon: 11.52, lat: 3.87, kind: town, summary: tbd, from: 1900, themes: ["commerce"], certainty: "a_specifier", region: "cameroun" },
];

export const CERTAINTY_LABEL: Record<Certainty, L> = {
  documente: l("Fait documenté", "Documented fact"),
  tradition_orale: l("Tradition orale", "Oral tradition"),
  hypothese: l("Hypothèse", "Hypothesis"),
  a_specifier: l("Provisoire · à spécifier", "Provisional · to be specified"),
};
export const THEME_LABEL: Record<Theme, L> = {
  commerce: l("Commerce", "Trade"), savoir: l("Savoir", "Learning"), artisanat: l("Artisanat", "Craft"), architecture: l("Architecture", "Architecture"),
};
export const TIMELINE_MARKS = [1000, 1250, 1500, 1750, 2000];
/** Places visible at a given year (founded/attested on or before it). */
export const placesAt = (year: number, places = ATLAS_PLACES) => places.filter((p) => p.from <= year);
