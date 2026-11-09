/** Real, freely licensed photos (Wikimedia Commons) with a deterministic cinematic grade: crop, contrast, vignette. Nothing added. */
import en from "@/assets/regions/region-en.jpg.asset.json";
import no from "@/assets/regions/region-no.jpg.asset.json";
import ad from "@/assets/regions/region-ad.jpg.asset.json";
import ce from "@/assets/regions/region-ce.jpg.asset.json";
import lt from "@/assets/regions/region-lt.jpg.asset.json";
import sw from "@/assets/regions/region-sw.jpg.asset.json";
import nw from "@/assets/regions/region-nw.jpg.asset.json";
import ou from "@/assets/regions/region-ou.jpg.asset.json";
import su from "@/assets/regions/region-su.jpg.asset.json";
import es from "@/assets/regions/region-es.jpg.asset.json";

export interface RegionMedia { src: string; place: string; biome: string; author: string; license: string; sourceUrl: string }

export const REGION_MEDIA: Record<string, RegionMedia> = {
  EN: { src: en.url, place: "Pic de Rhumsiki, monts Mandara", biome: "Steppe sahélienne", author: "krishna naudin", license: "CC BY-SA 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Rhumsiki_peak,_North_Cameroon_(25989204581).jpg" },
  NO: { src: no.url, place: "Le fleuve Bénoué à Garoua", biome: "Savane soudanienne", author: "Awa Bassirou", license: "CC BY 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Le_passage_du_fleuve_benoue_dans_la_ville_de_Garoua_05.jpg" },
  AD: { src: ad.url, place: "Ngaoundéré vue du ciel (1973)", biome: "Plateau d’altitude", author: "Jean-Louis Heckly", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Vue_a%C3%A9rienne_de_Ngaound%C3%A9r%C3%A9_apr%C3%A8s_le_d%C3%A9collage,_en_mars_1973.jpg" },
  CE: { src: ce.url, place: "Collines de Yaoundé", biome: "Forêt et collines", author: "Kateregga1", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Views_of_Yaounde_Cameroon_03.jpg" },
  LT: { src: lt.url, place: "Pont sur le Wouri, Douala", biome: "Estuaire tropical", author: "Steve Mvondo", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Pont_Wouri_1.jpg" },
  SW: { src: sw.url, place: "Mont Cameroun", biome: "Volcan et côte", author: "Adesolive", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Mount_Cameroon_on_a_sunny_day_05.jpg" },
  NW: { src: nw.url, place: "Bamenda depuis la route de montagne", biome: "Hauts plateaux", author: "Auteur non indiqué", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Bamenda_from_mountain_road.jpg" },
  OU: { src: ou.url, place: "Entrée du palais royal de Foumban", biome: "Hauts plateaux", author: "WILLAV-FR", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:CAM-Foumban-Entr%C3%A9e_du_Palais_royal.jpg" },
  SU: { src: su.url, place: "Chutes de la Lobé, Kribi", biome: "Côte équatoriale", author: "Blaizo 237", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Les_chutes_de_la_lob%C3%A9_kribi_Cameroon.jpg" },
  ES: { src: es.url, place: "Réserve de faune du Dja", biome: "Forêt équatoriale", author: "C. Hance", license: "CC BY-SA 3.0 igo", sourceUrl: "https://commons.wikimedia.org/wiki/File:Dja_Faunal_Reserve-109434.jpg" },
};
