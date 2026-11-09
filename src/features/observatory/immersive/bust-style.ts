/** Per-sector look of the fictional bust: garment tone, headwear and trade accessory. */
export type Accessory = "basket" | "sprout" | "wheel" | "needle" | "book" | "cross" | "seal" | "brick" | "chip" | "coin" | "drum" | "bowl" | "star";
export type Headwear = "kufi" | "turban" | "cap" | "none";

export interface BustStyle {
  /** Canvas colour (three.js needs concrete values; mirrors the brand tokens). */
  garment: string;
  trim: string;
  /** Token class for the CSS fallback. */
  garmentClass: string;
  headwear: Headwear;
  accessory: Accessory;
}

const FOREST = "#1d4a3e", COPPER = "#a84e2b", INDIGO = "#252b4a", SAGE = "#5f9a84", OCHRE = "#c79a4a", GOLD = "#d7b26a";

export const BUST_STYLE: Record<string, BustStyle> = {
  COM: { garment: INDIGO, trim: GOLD, garmentClass: "text-indigo", headwear: "kufi", accessory: "basket" },
  AGR: { garment: OCHRE, trim: FOREST, garmentClass: "text-chart-5", headwear: "turban", accessory: "sprout" },
  TRA: { garment: FOREST, trim: OCHRE, garmentClass: "text-primary", headwear: "cap", accessory: "wheel" },
  ART: { garment: COPPER, trim: GOLD, garmentClass: "text-copper", headwear: "kufi", accessory: "needle" },
  EDU: { garment: INDIGO, trim: SAGE, garmentClass: "text-indigo", headwear: "none", accessory: "book" },
  SAN: { garment: SAGE, trim: GOLD, garmentClass: "text-chart-4", headwear: "none", accessory: "cross" },
  ADM: { garment: FOREST, trim: GOLD, garmentClass: "text-primary", headwear: "kufi", accessory: "seal" },
  BTP: { garment: OCHRE, trim: INDIGO, garmentClass: "text-chart-5", headwear: "cap", accessory: "brick" },
  NUM: { garment: INDIGO, trim: SAGE, garmentClass: "text-indigo", headwear: "none", accessory: "chip" },
  FIN: { garment: FOREST, trim: GOLD, garmentClass: "text-primary", headwear: "none", accessory: "coin" },
  CUL: { garment: COPPER, trim: GOLD, garmentClass: "text-copper", headwear: "turban", accessory: "drum" },
  RES: { garment: SAGE, trim: COPPER, garmentClass: "text-chart-4", headwear: "none", accessory: "bowl" },
  AUT: { garment: FOREST, trim: COPPER, garmentClass: "text-primary", headwear: "none", accessory: "star" },
};

export const styleFor = (sector: string) => BUST_STYLE[sector] ?? BUST_STYLE.AUT;
