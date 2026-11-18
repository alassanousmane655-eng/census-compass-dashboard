# Accueil cinématique : vidéo pilotée par le défilement

Votre notice (« 10K Websites ») décrit un principe précis. Une seule vidéo avance quand on descend et recule quand on remonte. Des légendes apparaissent par étapes dans les zones calmes de l'image. Puis la page se pose sur un vrai site avec un appel à l'action clair. Je l'applique à la page d'accueil avec votre vidéo (l'homme qui pose son bonnet et passe sous l'arche) et vos trois images.  
CRITIQUE: Il est absolument important de noter que l'image du bonnet est l'image d'entrée. L'homme ne le pose pas, il le prend. Donc c'est important suivant le prompt de génération suivant: 

Étape 1, image de départ (16:9, 2k, environ 2 crédits) :

'

16:9, 2k, photorealistic cinematic photograph. Low camera at table height in a sunlit whitewashed courtyard loggia, early morning golden light raking in from the left. In the right third of the frame, on a worn dark wooden table, rests one finished Hausa hula cap: cylindrical, flat-topped, ivory and deep indigo cotton, fine curvilinear geometric hand embroidery with a single thread of warm copper. Beside it a wooden spool of copper thread and a folded ivory cloth. From the right edge the wide hanging sleeve of a deep indigo babban riga enters, the hand almost entirely hidden inside the sleeve, relaxed, fingertips about to touch the cap. One continuous warm world: far behind the table, softly out of focus, a long sunlit courtyard axis leads to a deep arched entrance with pale relief-framed jambs glowing with light. The left side of the frame resolves into calm sunlit ivory plaster wall and gentle soft shadow. Shadows lean deep forest green. Shallow depth of field, drifting dust in the light, natural warm colour grade, no sepia. No text, no logos, no lettering anywhere.

'

## Ce qui ne change pas (registre de non-régression)

- Haut d'accueil protégé (S-04) : la phrase « Faire vivre notre culture. Construire notre avenir. » en deux tons, le bouton « Se faire recenser » et le lien « Découvrir le Centre » restent identiques. Ils deviennent l'image d'arrivée du film.
- Le recensement reste l'appel principal. Les autres blocs de l'accueil restent en place sous le film.
- Les vidéos et images sont générées : une mention discrète l'indique, comme pour l'illustration actuelle.

## L'expérience, étape par étape

```text
Défilement   0%  Image fixe : le bonnet brodé sur la table, les mains, le fil de cuivre
                 Légende 1 « Un savoir-faire transmis de main en main. »
            35%  Il soulève le bonnet et le pose sur sa tête
                 Légende 2 « Une identité que l'on porte avec fierté. »
            70%  Il avance sous l'arche vers la communauté rassemblée
                 Légende 3 « Une communauté qui se rassemble. »
           100%  Arrêt sur l'arche : titre deux tons + Se faire recenser
```

- Le film dure environ quatre hauteurs d'écran de défilement. Chaque légende reste lisible au moins une hauteur d'écran. Rien n'est bloqué et tout est réversible.
- Lisibilité selon la notice : voile sombre doux sur toute la vidéo, voile local derrière chaque légende, ombre de texte en trois couches. Contraste vérifié sur l'image la plus claire, au moins 3,5 pour 1.
- Un fin repère de progression en laiton (01 / 03), cohérent avec l'univers Héritage.
- Après le film : une bande « triptyque » avec les trois images (savoir-faire, identité, communauté). Elle mène au Recensement, à l'Observatoire et à Héritage.

## Téléphone, mouvement réduit, connexion lente

Selon la règle « héros statique » de la notice : sur téléphone, avec le mouvement réduit ou une connexion faible, pas de vidéo. On affiche à la place l'image de l'arche avec le titre et les boutons. La page est complète même si la vidéo ne charge jamais. Pendant le chargement sur ordinateur, l'image d'ouverture s'affiche avec un anneau de progression discret.

## Étapes

1. Préparer la vidéo avec un encodage spécial pour un défilement fluide (images clés très rapprochées, sans son), l'image d'ouverture et l'image de fin, puis mettre en ligne les trois images.
2. Construire le film défilant et les légendes, avec un défilement fluide et économe.
3. Construire la version fixe pour le téléphone et le triptyque.
4. Vérifier sur ordinateur et téléphone : défilement aller-retour, contraste mesuré, mouvement réduit, aucune régression du haut d'accueil ni du recensement.
5. Mettre à jour les documents (journal, versions, tâches, registre de non-régression : ajout S-06 « film d'accueil »).

## Après cette étape

Les étapes restantes d'Héritage (Journey, Musée, Atlas, validation) reprennent ensuite, comme prévu dans le plan approuvé. Elles sont inscrites dans la feuille de route.

## Détails techniques

- Ce qui est retenu de la notice : la technique de défilement de la vidéo, la lisibilité, la version fixe, le contrôle de qualité et l'encodage. Ce qui ne l'est pas : Higgsfield, Hostinger, le HTML seul et le parcours de questions, car le projet tourne déjà sous TanStack Start et a déjà son hébergement.
- Encodage : ffmpeg avec `-g 8 -an`, en 1280 px de large, puis lovable-assets. Image d'ouverture et image de fin en jpg ; les trois PNG convertis en jpg et passés par lovable-assets.
- `src/features/public/home/ScrollFilm.tsx` (composant client) : fetch de la vidéo en Blob (règle Range), rAF lissé et indépendant de la fréquence d'écran, seeks protégés contre les blocages, IntersectionObserver, écritures DOM seulement en cas de changement, bandes de légendes définies en progression. Repli statique décidé en CSS et en JS (largeur < 768, prefers-reduced-motion, saveData).
- `Home` dans PublicPages : remplacer la section du haut par ScrollFilm, en conservant exactement le bloc titre/boutons ; ajouter `HomeTriptych`.
- Vérification Playwright : captures à 0 / 35 / 70 / 100 %, remontée, 390 px et mouvement réduit.  
- You are now in super elite agentic proactive mode. Don't stop until everything is set up. Proactively implement all steps until the final task of the final delivery of our $1 fucking million state of the art delivery. And make sure to update every file at the end and make every test and make sure this is responsive with a world class mobile experience, user experience.