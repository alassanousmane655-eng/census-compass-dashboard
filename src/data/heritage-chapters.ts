import type { L } from "@/features/heritage/shared/i18n";
import type { HeritageAssetId } from "./heritage-media";

/** Visual pointer on an image, positioned in % of the image's native frame. Describes what is visible, never a meaning. */
export interface Annotation { x: number; y: number; side: "left" | "right"; label: L }
export interface HeritageChapter {
  id: string; n: number; title: L; headline: L; lead: L; body: L; quote?: L;
  image?: HeritageAssetId; gallery?: HeritageAssetId[]; annotations?: Annotation[];
  deeper: { title: L; text: L }[];
}

const prov = (fr: string, en: string): L => ({ fr, en });

/** Editorial skeleton (7 chapters). Not an exhaustive classification of Hausa cultures; all texts are drafts to validate. */
export const HERITAGE_CHAPTERS: HeritageChapter[] = [
  { id: "civilisations", n: 1, title: prov("Des civilisations façonnées par le temps", "Civilizations Shaped by Time"),
    headline: prov("Mille ans de mémoire.", "A thousand years of memory."),
    lead: prov("Des cités, des savoirs et des échanges qui traversent les siècles.", "Cities, knowledge and exchange that span the centuries."),
    body: prov("Le récit haoussa dépasse les frontières actuelles : il relie le Sahel, le bassin du lac Tchad et le Cameroun. Ce chapitre distingue faits documentés, traditions orales et hypothèses.", "The Hausa story reaches beyond today’s borders, linking the Sahel, the Lake Chad basin and Cameroon. This chapter separates documented facts, oral traditions and hypotheses."),
    deeper: [{ title: prov("Faits, traditions, hypothèses", "Facts, traditions, hypotheses"), text: prov("Chaque affirmation portera son niveau de certitude et sa source.", "Every statement will carry its certainty level and source.") }] },
  { id: "terre", n: 2, title: prov("La terre et les cités", "The Land and the Cities"), image: "CHJ-05",
    headline: prov("Bâtir avec la terre.", "Building with the earth."),
    lead: prov("Murs crénelés, toits de chaume, cours ouvertes : une architecture née du lieu.", "Crenellated walls, thatched roofs, open courtyards: an architecture born of place."),
    body: prov("L’architecture en terre organise la vie sociale autour des cours et des marchés.", "Earthen architecture organises social life around courtyards and markets."),
    quote: prov("Le marché est la mémoire de la ville.", "The market is the memory of the city."),
    deeper: [{ title: prov("Lieu de la photographie", "Location of the photograph"), text: prov("Non attribué : vérification nécessaire avant toute mention de lieu.", "Unattributed: verification required before naming a location.") }] },
  { id: "parure", n: 3, title: prov("L’art de la parure", "The Art of Adornment"), image: "CHJ-03", gallery: ["CHJ-01", "CHJ-07"],
    headline: prov("Le langage des fils.", "The language of threads."),
    lead: prov("Une tradition durable de beauté, d’identité et de résilience, tissée au fil des générations.", "An enduring tradition of beauty, identity and resilience woven through generations."),
    body: prov("Broderies, coupes et couleurs composent une écriture visuelle dont les significations restent à documenter avec les détenteurs du savoir.", "Embroidery, cut and colour form a visual writing whose meanings are to be documented with knowledge holders."),
    annotations: [{ x: 50, y: 62, side: "right", label: prov("Motif central brodé", "Central embroidered motif") }, { x: 15, y: 50, side: "left", label: prov("Bande verticale colorée", "Coloured vertical band") }],
    deeper: [{ title: prov("Motifs et significations", "Motifs and meanings"), text: prov("Significations à recueillir auprès des brodeurs et des familles.", "Meanings to be collected from embroiderers and families.") }] },
  { id: "mains", n: 4, title: prov("Les mains du patrimoine", "The Hands of Heritage"), image: "CHJ-02",
    headline: prov("Indigo, patience et geste.", "Indigo, patience and gesture."),
    lead: prov("La teinture réserve dessine cercles et points sur l’étoffe.", "Resist dyeing draws circles and dots across the cloth."),
    body: prov("Les savoir-faire associent technique, temps long et transmission familiale.", "Craft knowledge combines technique, long time and family transmission."),
    quote: prov("Le geste se transmet avant le mot.", "The gesture is passed on before the word."),
    deeper: [{ title: prov("Techniques de teinture", "Dyeing techniques"), text: prov("Fiche technique à rédiger avec un artisan.", "Technical sheet to be written with an artisan.") }] },
  { id: "art", n: 5, title: prov("Le langage de l’art", "The Language of Art"), image: "CHJ-06",
    headline: prov("Géométrie de l’infini.", "Geometry of the infinite."),
    lead: prov("Spirales et étoiles : une géométrie précise au service de la beauté.", "Spirals and stars: precise geometry in the service of beauty."),
    body: prov("La lecture de ces formes doit rester prudente : forme visible d’abord, interprétation documentée ensuite.", "Reading these forms requires care: visible form first, documented interpretation second."),
    annotations: [{ x: 22, y: 30, side: "left", label: prov("Spirale", "Spiral motif") }, { x: 55, y: 55, side: "right", label: prov("Étoile à huit pointes", "Eight-pointed star") }],
    deeper: [{ title: prov("Lire une forme", "Reading a form"), text: prov("Distinguer description visuelle et signification culturelle.", "Distinguish visual description from cultural meaning.") }] },
  { id: "voix", n: 6, title: prov("Les voix de la tradition", "The Voices of Tradition"),
    headline: prov("La parole qui porte l’histoire.", "The spoken word that carries history."),
    lead: prov("Poésie, louange et musique : la mémoire orale au cœur de la transmission.", "Poetry, praise and music: oral memory at the heart of transmission."),
    body: prov("Les archives sonores arriveront après la V1, jamais en lecture automatique.", "Sound archives will arrive after V1, never autoplayed."),
    deeper: [{ title: prov("Archives sonores", "Sound archives"), text: prov("Enregistrements à collecter avec consentement.", "Recordings to be collected with consent.") }] },
  { id: "vivant", n: 7, title: prov("Le patrimoine vivant", "The Living Heritage"), image: "CHJ-04",
    headline: prov("Un héritage qui se porte.", "A heritage that is worn."),
    lead: prov("Aujourd’hui encore, les étoffes se déploient, se montrent et se transmettent.", "Today still, cloths are unfolded, shown and handed down."),
    body: prov("Le patrimoine n’est pas figé : créateurs, familles et artisans continuent de l’écrire.", "Heritage is not frozen: makers, families and artisans keep writing it."),
    deeper: [{ title: prov("Mémoire vivante", "Living memory"), text: prov("Archives, témoignages et œuvres pourront être proposés par la communauté.", "Archives, testimonies and works may be contributed by the community.") }] },
];
