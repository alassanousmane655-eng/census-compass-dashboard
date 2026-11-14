import type { L } from "@/features/heritage/shared/i18n";
import type { HeritageAssetId } from "./heritage-media";

/** V1 collection = the CHJ pieces only. Unknown fields stay undefined and render as "to be documented". */
export interface CollectionObject {
  id: string; asset: HeritageAssetId; title: L; category: L; material?: L; period?: L;
  origin?: L; technique?: L; meaning?: L; collection?: string;
}
const l = (fr: string, en: string): L => ({ fr, en });
const textile = l("Textile", "Textile"), architecture = l("Architecture", "Architecture");

export const COLLECTION: CollectionObject[] = [
  { id: "OBJ-01", asset: "CHJ-01", title: l("Grand boubou teint", "Dyed grand robe"), category: textile, material: l("Coton", "Cotton"), technique: l("Teinture et broderie", "Dyeing and embroidery") },
  { id: "OBJ-02", asset: "CHJ-02", title: l("Étoffe à teinture réserve", "Resist-dyed cloth"), category: textile, material: l("Coton, indigo", "Cotton, indigo"), technique: l("Teinture réserve", "Resist dyeing") },
  { id: "OBJ-03", asset: "CHJ-03", title: l("Robe brodée", "Embroidered robe"), category: textile, technique: l("Broderie", "Embroidery"), collection: "Harn Museum of Art, 2009.9.4 (à confirmer)" },
  { id: "OBJ-04", asset: "CHJ-04", title: l("Robes présentées", "Robes on display"), category: textile, material: l("Coton, indigo", "Cotton, indigo"), period: l("Contemporain", "Contemporary") },
  { id: "OBJ-05", asset: "CHJ-05", title: l("Architecture en terre", "Earthen architecture"), category: architecture, material: l("Terre, chaume", "Earth, thatch") },
  { id: "OBJ-06", asset: "CHJ-06", title: l("Motif spiralé", "Spiral motif"), category: textile, material: l("Coton, indigo", "Cotton, indigo"), technique: l("Broderie", "Embroidery") },
  { id: "OBJ-07", asset: "CHJ-07", title: l("Tenture brodée", "Embroidered hanging"), category: textile, material: l("Coton, indigo", "Cotton, indigo"), technique: l("Broderie", "Embroidery"), collection: "Cleveland Museum of Art, 2024.73 (à confirmer)" },
];
