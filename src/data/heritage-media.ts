import chj01 from "@/assets/heritage/chj-01.jpg.asset.json";
import chj02 from "@/assets/heritage/chj-02.jpg.asset.json";
import chj03 from "@/assets/heritage/chj-03.jpg.asset.json";
import chj04 from "@/assets/heritage/chj-04.jpg.asset.json";
import chj05 from "@/assets/heritage/chj-05.jpg.asset.json";
import chj06 from "@/assets/heritage/chj-06.jpg.asset.json";
import chj07 from "@/assets/heritage/chj-07.jpg.asset.json";

/**
 * Only the 7 CHJ images are app media. DHM/LHA images are moodboard references (V1) and must never be imported here.
 * Rights are unverified unless stated; owner chose to display them with a visible "rights to verify" notice.
 */
export type RightsStatus = "a_verifier" | "a_clarifier" | "open_access_signale";
export interface HeritageAsset { id: string; url: string; width: number; height: number; source?: string; author?: string; rights: RightsStatus; note?: string }

export const HERITAGE_ASSETS = {
  "CHJ-01": { id: "CHJ-01", url: chj01.url, width: 836, height: 573, rights: "a_verifier" },
  "CHJ-02": { id: "CHJ-02", url: chj02.url, width: 980, height: 500, rights: "a_verifier" },
  "CHJ-03": { id: "CHJ-03", url: chj03.url, width: 800, height: 522, source: "Harn Museum of Art, 2009.9.4 (correspondance signalée)", rights: "a_clarifier" },
  "CHJ-04": { id: "CHJ-04", url: chj04.url, width: 1520, height: 836, rights: "a_verifier" },
  "CHJ-05": { id: "CHJ-05", url: chj05.url, width: 1200, height: 878, rights: "a_verifier", note: "Filigrane présent · lieu non attribué" },
  "CHJ-06": { id: "CHJ-06", url: chj06.url, width: 1670, height: 1920, rights: "a_verifier" },
  "CHJ-07": { id: "CHJ-07", url: chj07.url, width: 471, height: 600, source: "Cleveland Museum of Art, 2024.73 (correspondance signalée)", rights: "open_access_signale" },
} satisfies Record<string, HeritageAsset>;
export type HeritageAssetId = keyof typeof HERITAGE_ASSETS;

export const RIGHTS_LABEL: Record<RightsStatus, { fr: string; en: string }> = {
  a_verifier: { fr: "Droits à vérifier", en: "Rights to be verified" },
  a_clarifier: { fr: "Droits à clarifier", en: "Rights to be clarified" },
  open_access_signale: { fr: "Open Access signalé · à confirmer", en: "Open Access reported · to confirm" },
};

export function creditLine(a: HeritageAsset, lang: "fr" | "en") {
  const unk = lang === "fr" ? "à documenter" : "to be documented";
  const s = lang === "fr" ? "Source" : "Source";
  const au = lang === "fr" ? "Auteur" : "Author";
  return `${a.id} · ${s} : ${a.source ?? unk} · ${au} : ${a.author ?? unk} · ${RIGHTS_LABEL[a.rights][lang]}${a.note ? ` · ${a.note}` : ""}`;
}
