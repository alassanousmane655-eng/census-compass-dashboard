# Version 0.4 — Sentinel, Observatoire clarifié, espace « Héritage »

Principe directeur : tout ce qui est validé est protégé. Chaque changement doit être une amélioration démontrable, documentée et vérifiée.

## 0. Garde-fous (avant toute modification)

Fonctionnalités protégées, inscrites dans le registre Sentinel et vérifiées avant/après chaque étape :
- **Carte immersive de l'Observatoire** : vrais contours, trait uniforme, zoom cinématique, photos réelles et crédits, carte FIFA, buste 3D polymorphe, repli mobile, Échap / flèches, masquage sous 10. **Aucun changement visuel ni de comportement.**
- Recensement en 6 étapes, brouillon, confirmation.
- Masquage des petits effectifs sur tout affichage public.
- Haut de la page d'accueil retravaillé (titre en deux tons, boutons).

Contrôle : captures avant/après de la carte sur ordinateur et téléphone, comparées pixel par pixel. Les tests existants (personnage type, navigation) doivent rester verts.

## 1. Dossier documentaire `folder-docs/`

Cinq fichiers, du plus récent au plus ancien :
- `changelog.md` — modifications et décisions d'architecture, datées.
- `tasks.md` — tâches, priorités (P0/P1/P2), statut.
- `prd.md` — vision, publics, quatre espaces, exigences, confidentialité, éléments « à valider ».
- `versioning.md` — v0.1 socle et recensement · v0.2 accueil · v0.3 Observatoire immersif · v0.4 cette version.
- `sentinel.md` — registre des acquis protégés : description, version, critère de contrôle, statut, procédure de dérogation (justification + accord explicite).

Règle de travail permanente ajoutée aux consignes du projet : relire `sentinel.md` avant toute modification, mettre à jour les cinq fichiers à chaque livraison.

## 2. Observatoire — supprimer les répétitions, sans toucher à la carte

Diagnostic : les volumes régionaux apparaissent trois fois (liste dans la carte immersive, cartogramme « Répartition territoriale », tableau par région) ; « Définition & limites » se répète sur chaque indicateur.

Nouvelle organisation, sections numérotées comme dans vos captures :
1. **En-tête** : titre, sous-titre, badge « Démo · Données fictives · Instantané au 27 octobre 2026 ».
2. **Exploration territoriale** : la carte immersive, inchangée, devient l'unique instrument régional.
3. **Les indicateurs essentiels** : 4 chiffres avec hiérarchie renforcée (chiffre dominant, libellé discret), sans répétition des définitions. Ils suivent la région choisie sur la carte (même filtre, sans second sélecteur).
4. **Profil socioéconomique** : secteurs et situations en barres horizontales classées, avec la valeur ; « Autres catégories réunies » pour les effectifs masqués.
5. **Évolution et tendances** : courbe mensuelle des soumissions.
6. **Méthodologie et transparence** : un seul bloc repliable regroupant définitions, formules, limites, seuils de confidentialité et période.

Retirés car redondants : cartogramme « Répartition territoriale » et tableau « Dossiers soumis par région ». Accessibilité conservée : un tableau équivalent par région reste disponible dans un repli « Voir les données en tableau » (lecteurs d'écran, export futur).

Couleurs : palette claire actuelle conservée et affinée (contrastes, espacements, titres). **Pas de bouton global de mode sombre**, conformément à votre décision finale.

## 3. Nouvel onglet « Héritage » — Midnight Heritage

Lien « Héritage » ajouté dans la navigation principale, page `/heritage`, expérience distincte avec son propre univers sombre, sans affecter le reste du site.

Palette réservée à cet espace : Midnight #0D1516 · Deep Forest #172321 · Heritage Ivory #F0E9DA · Antique Brass #B99A67 · Heritage Indigo #405A75 · Terracotta #A75E48. Typographie éditoriale (titres serif, texte sans-serif).

Parcours :
- **Ouverture cinématique** : plein écran, titre qui apparaît progressivement, « Entrer ».
- **Six chapitres** : 1. La terre et les cités · 2. L'art de la parure · 3. Les mains du patrimoine · 4. Le langage de l'art · 5. Les voix de la tradition · 6. Le patrimoine vivant.
- **Clôture** : « Un héritage qui se transmet » et invitation à contribuer.
- Chaque scène : défilement synchronisé image/texte, transitions en fondu et léger mouvement, citation, approfondissement « En savoir plus » (galerie documentaire, objets, sources).
- **Navigation** : sommaire latéral des chapitres, progression, sortie permanente « Quitter Héritage », pause des animations, son facultatif coupé par défaut, mouvement réduit respecté.
- **Médias** : aucune image générée. Emplacements prêts avec cadre élégant « Image à fournir », à remplacer par vos photos, vidéos et sons. Chaque média aura un champ source, auteur et droits affiché.
- **Textes** : brouillons éditoriaux marqués « à valider par un historien ou le Centre ».
- **Mémoire vivante (préparation)** : structure de contenu prévue pour accueillir archives, témoignages de familles, œuvres d'artistes et contributions d'historiens ; un appel « Proposer un document » sans envoi réel à ce stade.

## Ordre de réalisation
1. Captures de référence de la carte + création de `folder-docs/` et du registre Sentinel.
2. Réorganisation de l'Observatoire (sections 3 à 6, retraits, repli tableau).
3. Espace Héritage : univers graphique, ouverture, six chapitres, navigation, emplacements médias.
4. Vérifications : comparaison de la carte avant/après, tests, ordinateur et téléphone, mouvement réduit.
5. Mise à jour des cinq documents (version 0.4).

## Détails techniques
- `folder-docs/` à la racine ; règle « relire sentinel.md » ajoutée à `AGENTS.md`.
- `ImmersiveObservatory.tsx` et ses composants : non modifiés. Seul ajout possible : remonter la région choisie (callback optionnel `onRegionChange`), sans effet visuel.
- `Observatory.tsx` : `AggregateView` réorganisée ; suppression de `RegionCartogram` dans cette page uniquement ; bloc méthodologie unique à partir de `INDICATORS` ; `suppress` appliqué avant tout rendu.
- Héritage : `src/routes/heritage.tsx` (head dédié), `src/features/heritage/` (`HeritageExperience`, `Chapter`, `ChapterNav`, `MediaSlot`) et `src/data/heritage-chapters.ts` (contenu modulaire typé : titre, texte, médias avec crédits, sources, approfondissements). Thème scopé via une classe `.theme-heritage` dans `styles.css` redéfinissant les tokens. framer-motion `useScroll` pour le scrollytelling.
- Test ajouté : la page Observatoire n'affiche aucune valeur régionale inférieure à 10 ; test de non-régression du rendu de la carte immersive.
