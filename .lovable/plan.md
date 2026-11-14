# Héritage V1 : hub, Journey, Musée et Atlas

L'objectif est de transformer l'actuelle page unique « Midnight Heritage » en un espace patrimonial complet et prêt à l'emploi. Le mock-up sert de seuil minimum. Tout ce qui est validé reste protégé : la carte de l'Observatoire, le recensement, le masquage sous 10, le haut de l'accueil et le thème sombre limité à Héritage.

## Décisions confirmées
- Trois expériences autonomes, réunies dans un hub : Journey (7 chapitres), Musée et Atlas.
- Les 7 photos du Journey sont affichées partout, avec la mention « droits à vérifier » et les crédits connus (CHJ-03 Harn 2009.9.4, CHJ-07 Cleveland 2024.73). CHJ-05 n'est attribuée à aucun lieu.
- Les images du Musée et de l'Atlas sont un moodboard : elles ne sont jamais publiées ni présentées comme des objets.
- Musée : des fiches construites sur les pièces du Journey. Les champs inconnus portent la mention « à documenter ».
- Atlas : la structure est complète, avec des lieux d'exemple marqués « provisoire · à spécifier ». Aucune recherche de sources à ce stade.
- Bouton FR/EN dans Héritage uniquement, avec une structure prête pour le haoussa. Pas de son, pas d'image générée et pas de vraie 3D.

## Divergence signalée
Le pack de documents hésite entre Vite/React et TanStack Start. Le dépôt réel fonctionne sous TanStack Start avec routage de fichiers. Héritage reste donc intégré à cette base : c'est un constat, pas un nouveau choix.

## V0.5 : documentation (avant le code)
Dans `folder-docs/`, je complète les fichiers existants sans créer de doublons de casse. J'ajoute ensuite : `architecture.md`, `assets_inventory.md` (28 éléments, identifiants CHJ/DHM/LHA, statut des droits), `research_and_ethics.md`, `storyboard.md` (7 chapitres), `decisions.md` (décisions confirmées et ouvertes, matrice de traçabilité), `test.md`, `eval.md`, `loop.md` et `README.md` (index).

## V0.6 : hub et système graphique
- Route `/heritage` : un fond nocturne et trois cadres flottants en 2.5D, avec une profondeur qui suit la souris ou le défilement. Les cadres s'empilent sur téléphone.
- En-tête Héritage : losange laiton, « HAOUSSA HERITAGE », menu, FR/EN et sortie vers HAOUSSA toujours visible.
- Éléments communs : filets laiton avec losange central, frise géométrique et tokens existants affinés.

## V0.7 : Cinematic Heritage Journey (`/heritage/journey`)
- 7 chapitres (Civilizations Shaped by Time → The Living Heritage) pilotés par le défilement. Tout est réversible et le défilement n'est jamais bloqué.
- Une photo en plein cadre domine chaque scène. Les annotations fines (filet + étiquette) n'apparaissent que si l'image le permet.
- Repère « 03 / 07 », sommaire vertical, « Exit to Heritage », niveau « Approfondir » et clavier.
- Chapitre 1, sans photo validée : composition typographique et texturée, pas d'image fictive.

## V0.8 : Digital Heritage Museum (`/heritage/musee`)
- Filtres Galerie / Matériau / Période, recherche et grille d'objets.
- Panneau latéral (en bas sur téléphone) : origine, période, matériaux, technique, signification culturelle, sources, crédits et droits.

## V0.9 : Living Heritage Atlas (`/heritage/atlas`)
- Carte sombre stylisée de l'Afrique de l'Ouest et du Centre, avec des points lumineux et les onglets Régions / Frise / Thèmes.
- Frise 1000–2000, fiche de lieu et niveau de certitude, à partir de données d'exemple faciles à remplacer.

## V1.0 : validation
Contrôles sur ordinateur et téléphone, avec et sans mouvement réduit, au clavier. Comparaison avec le mock-up et non-régression des fonctions protégées. Mise à jour des documents.

## Critères pour passer d'une version à la suivante
Aucune erreur, aucune régression signalée par Sentinel, rendu vérifié par capture sur les deux formats, documents à jour.

## Détails techniques
- Routes : `heritage.tsx` (layout + hub en index), `heritage.index.tsx`, `heritage.journey.tsx`, `heritage.musee.tsx` et `heritage.atlas.tsx`, chacune avec son head.
- `src/features/heritage/` contient `hub/`, `journey/`, `museum/`, `atlas/`, `shared/` (Shell, Exit, BrassRule, i18n).
- Données typées et bilingues : `heritage-chapters.ts` (7 chapitres), `heritage-collection.ts` et `heritage-atlas.ts`, avec un champ `certainty` et des crédits.
- Photos CHJ envoyées via lovable-assets. Scrollytelling avec framer-motion useScroll et des transformations liées à la progression, donc réversibles.
- Tests : réversibilité/progression, fiche de crédits toujours présente, aucune image DHM/LHA utilisée dans l'application.
