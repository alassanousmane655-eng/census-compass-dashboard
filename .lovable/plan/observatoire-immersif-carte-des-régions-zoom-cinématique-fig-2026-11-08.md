# Observatoire immersif — carte des régions, zoom cinématique, figurine 3D

Le haut de la page d'accueil attend une étape suivante. Rien dans l'existant n'est retiré : l'Observatoire actuel (indicateurs, tableaux, définitions) reste en dessous, intact.

## Ce que le visiteur verra

1. **Carte du Cameroun aux vrais contours** : les 10 régions, toutes de même épaisseur de trait et avec le même niveau de détail. La couleur indique le volume, avec la même règle que les tableaux (effectifs inférieurs à 10 masqués). Survol : la région se soulève et affiche son nom et son chiffre. Navigation au clavier, et un tableau équivalent reste disponible.
2. **Clic sur une région → zoom cinématique** (environ 1,2 s) : la carte plonge vers la région pendant que sa photo de fond apparaît en fondu, avec un lent mouvement de caméra. Bouton « Retour au Cameroun », touche Échap, et flèches pour passer à la région voisine.
3. **Fond photographique réel par région**, sans aucune invention : steppe sahélienne et monts Mandara pour l'Extrême-Nord, Bénoué pour le Nord, plateau de l'Adamaoua, chefferies de l'Ouest, côte et forêt équatoriale au Sud, etc. Chaque photo affiche sa source et son auteur.
4. **Carte « membre représentatif » façon FIFA**, un personnage fictif clairement signalé comme tel :
   - un buste 3D stylisé (pas de visage réaliste), avec la tenue et l'accessoire du métier le plus fréquent dans la région ;
   - une note globale et 6 statistiques animées, toutes tirées des vrais chiffres de la région : part des dossiers validés, profils à jour, diversité des secteurs, délai de traitement, participation, volume ;
   - sa zone de prédilection : département dominant et secteur principal ;
   - **polymorphe** : en changeant de région, le buste se transforme (tenue, couleur, accessoire) et les chiffres défilent jusqu'aux nouvelles valeurs.
   - Si la région compte moins de 10 dossiers, la carte s'affiche « données insuffisantes » et aucun portrait n'est construit.
5. **Les deux niveaux de 3D** : vraie 3D animée sur ordinateur, version à effet de profondeur (inclinaison, reflet) sur téléphone ou si l'appareil est lent. Le mouvement est réduit si le visiteur l'a demandé dans ses réglages.

## Images (recherche, pas d'invention)
- Recherche de photos sous licence libre (Wikimedia Commons en priorité), avec 1 à 2 lieux emblématiques et vérifiables par région.
- Retouche cinématique : étalonnage, profondeur et recadrage large, sans ajouter de monuments ni de paysages qui n'existent pas.
- Limite honnête : l'outil de retouche sort au maximum en 1920 px de large, pas en 4K natif. Le rendu sera net en plein écran sur ordinateur. Pour un vrai 4K, il faudra des photos d'origine en très haute définition, fournies par le Centre.
- La liste des lieux retenus par région vous sera montrée pour validation.

## Inspirations
Cartes de données narratives (Pudding, NYT, Our World in Data), transitions de cartes façon Apple Maps et Google Earth, cartes de joueurs FIFA Ultimate Team pour la hiérarchie note / stats / poste.

## Ordre
1. Contours géographiques des 10 régions (données ouvertes) et carte interactive accessible.
2. Zoom cinématique et navigation (retour, voisines, Échap).
3. Recherche, téléchargement et retouche des photos, avec crédits affichés.
4. Calcul du portrait fictif à partir des chiffres de chaque région (avec tests).
5. Carte FIFA : version effet de profondeur, puis buste en vraie 3D et transformation entre régions.
6. Vérification ordinateur et mobile, fluidité, puis compte rendu des points non vérifiables ici (fluidité sur un vrai processeur graphique).

## Détails techniques
- Contours : GeoJSON des régions administratives (geoBoundaries, ADM1, licence ouverte), simplifiés, convertis en chemins SVG dans `src/data/region-shapes.ts` ; projection d3-geo ; zoom par interpolation du viewBox (d3-interpolate) piloté par framer-motion.
- Nouveaux composants dans `src/features/observatory/immersive/` : `RegionMap`, `RegionStage`, `PersonaCard`, `PersonaBust3D` (chargé en lazy derrière ClientOnly, avec three, @react-three/fiber@9 et drei@10), `PersonaCardTilt` en repli CSS 3D. Choix selon `matchMedia`, la mémoire de l'appareil et prefers-reduced-motion.
- Buste procédural (primitives et matériaux), aucun visage. Métier traduit en accessoires par table de correspondance des secteurs.
- `src/domain/persona.ts` : fonction pure qui transforme les dossiers d'une région en persona (modes, médianes, notes de 0 à 99), en appliquant le masquage avant tout calcul. Tests Vitest sur le seuil et sur les valeurs.
- Photos : passées dans lovable-assets (`.asset.json`), crédits dans `src/data/region-media.ts`.
- `AggregateView` existant conservé tel quel sous la nouvelle section, dans `Observatory.tsx`.
