# HAOUSSA — Front-end complet, centré sur le recensement

## Ce qui sera construit
Le front-end intégral des 4 espaces, en français, avec des données fictives réalistes (aucune donnée réelle). Le back-end viendra plus tard : chaque écran passe par une couche de services remplaçable sans toucher l'interface.

### 1. Recensement (priorité absolue)
- Page « Se faire recenser » + notice d'information obligatoire avant toute saisie.
- Formulaire en 6 étapes, progression visible, brouillon conservé, retour arrière sans perte :
  1. Information et choix  2. Profil minimal (nom, tranche d'âge, contact)  3. Résidence : Région → Département → Arrondissement (listes en cascade, 10 / 58 / 360, sans saisie libre)  4. Situation professionnelle + secteur + profession libre facultative  5. Participation (facultative)  6. Récapitulatif et soumission.
- Confirmation avec référence non prédictible (ex. HA-7KQ2-M9XD).
- Messages d'erreur clairs par champ, utilisable au clavier et sur téléphone.

### 2. Espace membre
Tableau de bord, mon dossier (statut + historique), corrections demandées, modifier mon profil, confirmation « profil à jour », préférences, demandes relatives aux données, aide.

### 3. Administration
Vue d'ensemble, file de dossiers (filtres région/statut), fiche dossier avec décision Valider / Demander correction / Refuser + motif, doublons potentiels (signal, jamais fusion automatique), territoires, secteurs, utilisateurs et rôles (8 rôles, périmètre national/régional), contenu public, exports agrégés, demandes de données, journal d'audit, paramètres. Un sélecteur de rôle de démonstration permet de voir ce que chaque rôle voit (ex. un vérificateur du Nord ne voit que le Nord).

### 4. Observatoire (tableau de bord)
Indicateurs « dossiers soumis / validés / en attente », carte des 10 régions + tableau équivalent, répartition par secteur et situation, évolution mensuelle, délai médian. Chaque indicateur a sa définition et sa date ; les effectifs inférieurs à 10 sont masqués ; jamais le terme « population totale ».

### 5. Site public
Accueil (style éditorial inspiré de la référence : grands espaces, photo documentaire, typographie ample), Le Centre, Culture et communauté (programmes, actualités, agenda, galerie), Recensement (pourquoi, fonctionnement, FAQ, protection des données), Contact, Connexion / Inscription (e-mail, Google ; écran téléphone prévu, marqué « bientôt »). Les contenus non fournis (coordonnées, gouvernance) seront des emplacements clairement signalés, jamais inventés.

## Direction visuelle
« Héritage vivant, confiance contemporaine » : ivoire #F8F5EF, vert forêt #173F35, indigo #252B4A, cuivre #A84E2B en accent, statuts toujours couleur + libellé. Titres Manrope, texte DM Sans. Motif géométrique textile discret. Photos générées dans un style documentaire.

## Ordre de réalisation
1. Fondations : couleurs, typographie, composants, en-têtes des 3 espaces.
2. Référentiel territorial complet (recherche des 58 départements et 360 arrondissements sur sources officielles).
3. Parcours de recensement + confirmation.
4. Espace membre.
5. Administration + rôles + vérification.
6. Observatoire.
7. Site public.
8. Vérification visuelle mobile et ordinateur de chaque parcours.

## Points restant à valider par le Centre (affichés comme tels)
Critères d'éligibilité, champs obligatoires définitifs, définition de « à jour », seuil de masquage statistique, textes juridiques de la notice, coordonnées officielles.

## Détails techniques
- TanStack Start, routes séparées : `/`, `/le-centre`, `/culture/*`, `/recensement/*`, `/contact`, `/connexion`, `/s-inscrire`, `/membre/*`, `/admin/*`, `/observatoire`.
- `src/domain/` : types (Person, Residence, ProfessionalProfile, VerificationCase, RoleAssignment, Territory, Sector, AuditEvent), matrice de transitions de statut, règles de permission par rôle/périmètre, règle de masquage < seuil — testées avec Vitest.
- `src/services/` : interfaces + implémentation fictive (localStorage pour brouillon/session de démo) ; remplaçable par l'API réelle.
- `src/data/territories.ts` : référentiel versionné région → département → arrondissement.
- Formulaires : react-hook-form + zod ; graphiques : recharts ; carte : SVG des 10 régions.
- Textes centralisés dans un fichier français unique pour préparer l'anglais et le haoussa.
- Tokens oklch dans `src/styles.css`, mode sombre prévu dans les tokens mais non activé.
