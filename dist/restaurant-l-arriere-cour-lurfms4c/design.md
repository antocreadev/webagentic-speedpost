# Design brief, Restaurant L'Arrière Cour (Saint-Florent)

## 0. Réflexion UX (question par question)

**Visiteur-type :** Couple 28-55 ans en séjour estival en Corse, logé à Saint-Florent ou de passage depuis Bastia, Calvi, Patrimonio. Secondairement : gastronome local du Nebbiu cherchant une adresse sûre à deux pas du port, et le promeneur du soir qui, entre apéro au port et retour à l'hôtel, a entr'aperçu une ruelle et se demande si ça vaut le détour. Device dominant : **mobile**, 19h-21h, une main libre, verre dans l'autre, WiFi instable.

**Contexte d'arrivée :** Recherche Google type *"restaurant Saint-Florent"*, *"où manger Saint-Florent"*, *"l'arrière cour"*, ou citation par un LLM ("bon restau à Saint-Florent avec terrasse"), ou QR code sur une carte d'hôtel. Rarement bookmark, presque jamais accès direct. Le visiteur a déjà 3 onglets ouverts, il compare en 20 secondes.

**Intention primaire :** **Ressentir** l'intimité de la cour avant même d'y aller. Se demander "est-ce que cet endroit est vraiment ce que les avis décrivent ?", puis décider : on tente ou pas. La réservation est le geste final, pas le geste d'entrée.

**Intention business :** Remplir les deux services du soir en haute saison (19h-21h30), prolonger le bouche-à-oreille numérique, exister en ligne (aucun site actuel : 1368 avis sans vitrine propre, c'est une asymétrie à corriger), capter le trafic "dernière minute" du soir.

**Contrainte UX structurante :** Pas de réservation en ligne connue, seulement **téléphone** (04 95 35 33 62). Saisonnalité forte (fermé nov-mars). Photos propriétaires limitées (visuels Google Maps + TripAdvisor en démo). Le "produit" n'est pas un plat unique reconnaissable, c'est le **lieu** lui-même : la cour, le platane, les pierres.

**Émotion-cible à 5s :** **Confidentialité, secret partagé, surprise.** Le visiteur doit ressentir qu'il vient d'ouvrir une porte qu'il n'était pas censé trouver. Pas "waouh c'est joli", plutôt "chut, on a trouvé un truc".

**Money shot :** Un **plan fermé sur une voûte de pierres / une ruelle ombragée**, qui s'ouvre au premier scroll par un **clip-path reveal** sur la cour ensoleillée avec le platane centenaire. Deux temps : le seuil, puis la révélation. C'est toute la thèse du site.

---

## Archétype

**`custom` : révélation progressive / seuil (threshold-reveal).**

Justification : les archétypes standards (editorial, bento, fullbleed-photo-first) racontent un produit, pas un lieu secret. Ici le site DOIT reproduire le geste physique de franchir la ruelle et découvrir la cour. L'archétype est construit autour d'un unique **clip-path reveal** qui simule le passage sous la voûte, puis d'un scroll qui se comporte comme une promenade lente d'un coin à l'autre de la cour. Cela diverge radicalement de tout autre client du catalogue (ni grille, ni magazine, ni marquee sportif).

---

## Palette de couleurs

Palette "secret bien gardé dans les vieilles pierres" : ocre chaud de pierre corse au soleil, ombre profonde de voûte, vert sourd du platane, terracotta d'assiette chaude, accent bordeaux pour marquer le pas du seuil.

| Rôle       | Hex      | Nom descriptif       | Utilisation                                          |
|------------|----------|----------------------|------------------------------------------------------|
| `--bg`     | `#F2E9D8` | Pierre au soleil     | Fond principal, ton ocre clair de mur corse chauffé  |
| `--ink`    | `#1E1A14` | Ombre de voûte       | Texte principal, titres, très sombre presque sépia   |
| `--ink-2`  | `#6B5E47` | Taupe tamis          | Texte secondaire, captions, dates, meta              |
| `--accent` | `#8C2A25` | Bordeaux cour        | CTA primaire, surlignages, hairline de seuil         |
| `--line`   | `#D9C8A4` | Ligne feuille sèche  | Séparateurs, borders subtiles, cards                 |

Contraste vérifié : `--ink` (#1E1A14) sur `--bg` (#F2E9D8) ≈ 13.8:1 (AAA). `--ink-2` (#6B5E47) sur `--bg` ≈ 4.9:1 (AA large et normal OK). `--accent` (#8C2A25) sur `--bg` ≈ 6.7:1 (AA pour texte).

> Palette choisie pour évoquer la **pierre chauffée de la vieille ville** et l'**ombre verte du platane**, en contraste avec les palettes de port (bleu marine) ou de trattoria (rouge-blanc-vert). Aucune couleur "par défaut" : chaque teinte est extraite mentalement d'un matériau présent dans la cour.

---

## Typographie

- **Display : `Cormorant Garamond`** (Google Fonts), poids **300** (light italic pour éclats) et **500** (semi-bold pour H1/H2). Garamond cursif fin évoque le **livre secret, la lettre manuscrite**, cohérent avec le thème "trouvaille confidentielle". Pas de Playfair (trop magazine), pas de Fraunces (trop contemporain). Cormorant a le bon degré de fragilité.
- **Body : `Inter`** (Google Fonts), poids **400** et **500**. Choix de sobriété : laisser le display porter l'émotion, garder la lecture mobile totalement transparente. Paire contrastée "lettre ancienne / grammage moderne" qui dit "vieux lieu, service actuel".
- **Size scale (mobile-first) :**
  - `h1` (hero) : `clamp(2.6rem, 9vw, 6.2rem)`, display 500, tracking `-0.02em`, line-height `0.98`
  - `h2` (sections) : `clamp(1.9rem, 5vw, 3.4rem)`, display 500, tracking `-0.01em`
  - `h3` : `clamp(1.25rem, 2.4vw, 1.6rem)`, display 400 italic
  - `eyebrow` : `0.72rem` Inter 500, tracking `0.18em`, uppercase
  - `body` : `1.05rem`, Inter 400, line-height `1.65`
  - `small` : `0.86rem`, Inter 500, tracking `0.04em`
- **Détail singulier :** les italiques de Cormorant sont utilisées pour les mots "cour", "platane", "secret", "seuil" à l'intérieur des titres, comme des mots chuchotés.

---

## Layout archétype

**Choix : `custom, threshold-reveal`** (révélation progressive / seuil). Justification : c'est le seul archétype qui traduit physiquement l'expérience du lieu (on entre par une ruelle, on découvre un jardin). Il diverge nettement des autres sites du catalogue car son signe distinctif n'est pas une grille ni une typo, c'est un **comportement de scroll** : le site se joue comme une porte qui s'ouvre.

### Rythme des sections (à lire de haut en bas)

1. **`seuil` (hero fermé, 100vh)** : photo plein écran traitée en **teinte sombre / vignetage lourd**, centrée sur une voûte de pierres / l'entrée de la ruelle. Au centre, en Cormorant 500 sur trois lignes : *L'Arrière Cour* (en Inter small sous-titre : `Saint-Florent · depuis la ruelle`). Un **hairline bordeaux** de 1px dessine un arc (SVG) au-dessus du titre, évoquant la voûte. Aucun CTA visible, juste un chevron bas discret avec le texte chuchoté *"pousser la porte"*. Pas de nav sticky au départ.

2. **`révélation` (clip-path reveal, 80vh)** : dès le premier scroll, l'image du seuil se **déchire par le centre** via un `clip-path: inset()` animé (expansion verticale puis horizontale, 1.2s), et **laisse apparaître dessous** la cour ensoleillée (`hero-arriere-cour.jpg`). Simultanément, le fond du site passe de `--ink` à `--bg` et la nav descend. **C'est le money shot.** Le visiteur est "passé de l'autre côté".

3. **`première bouffée` (accueil, 60vh)** : un seul paragraphe centré, colonne étroite (max-width 520px), Cormorant italic en grand corps : *"Une jolie cour ombragée, décor atypique plein de charme et d'authenticité."* attribution `Petit Futé` en Inter small. Aucune image ici : on fait respirer. Un **filet bordeaux** de 40px vertical sépare la citation du prochain bloc.

4. **`la maison` (histoire, split 55/45)** : à gauche colonne texte (3 paragraphes courts, 280 mots max) sur l'identité du lieu, la ruelle, la cour, le platane centenaire, la cuisine maison corse. À droite image `interieur-arriere-cour.jpg` format portrait 3:4 avec **léger décalage vertical au scroll** (parallax 8%). Eyebrow : `LA MAISON · DEPUIS LE PLATANE`.

5. **`la table` (signature, 3 médaillons horizontaux)** : non pas une grille, mais **trois cercles** (images en clip-path circle) alignés sur une ligne horizontale, chacun avec un nom de spécialité dessous : *Ravioli au brocciu*, *Fiadone maison*, *Crêpes sarrasin*. Images `plats-arriere-cour-1.jpg`, `repas-arriere-cour.jpg`, `plats-arriere-cour-2.jpg`. Les cercles évoquent les **assiettes** posées sur la table. Au hover, le cercle grandit légèrement (scale 1.04) et une italique apparaît.

6. **`promenade` (galerie, carousel diapositive lente)** : **PAS une grille froide.** Une zone centrée, une image à la fois en 16:10, plein centre, avec un libellé en bas ("coin platane", "table d'angle", "soir à la cour", "pierres du fond", "entrée par la ruelle", "lumière de 20h"). Auto-advance toutes **6 secondes**, easing très doux (fade + subtle scale 1.02 vers 1.00), **controls discrets** (petites puces en bas). L'utilisateur a l'impression de regarder quelqu'un lui montrer la cour coin par coin. Images : `terrasse-cour-tripadvisor.jpg`, `cour-arriere-cour-tripadvisor.jpg`, `premiere-image-arriere-cour.jpg`, `hero-arriere-cour.jpg`, et deux rééchantillonnages avec crop différent.

7. **`bouche-à-oreille` (proof, une seule voix)** : pas de mur de 6 avis, **une grande citation** en Cormorant italic corps 2.4rem, centrée, max-width 640px : *"Atypical restaurant with a magnificent plane tree overhead, a hidden garden in the heart of Saint-Florent."* suivie d'une ligne discrète : `4,4 / 5 · 1 368 avis Google`. Rien d'autre.

8. **`pour venir` (infos + Maps, full-bleed)** : bandeau de **100vw** avec à gauche (40%) les infos pratiques sur fond `--bg` (horaires midi 12h-15h / soir 19h-21h30, saisonnalité avril-octobre, adresse, téléphone cliquable en gros Cormorant 500 bordeaux), à droite (60%) l'**iframe Google Maps** sans coins arrondis, bord net, filet bordeaux 2px à gauche de l'iframe comme un linteau.

9. **`clore` (footer, 40vh)** : image `hero-arriere-cour.jpg` en **background très assombri** (vignetage retour, comme dans le hero initial, boucle narrative), au centre le téléphone en Cormorant 500 **géant**, sous-titre *"pousser la porte commence par un appel"*, mentions discrètes (© 2026, site Menghi Computer Science, retour en haut). Le site se **referme** comme il s'est ouvert.

### Singularités du site (5)

- **Clip-path reveal d'ouverture** au premier scroll (la voûte s'ouvre) : geste signature unique, inventé pour CE client.
- **Hero sombre à vignetage** qui bascule en light mode après la révélation : les autres sites du catalogue sont light dès la première frame.
- **Trois médaillons circulaires** pour les signatures au lieu d'une grille 3-col rectangulaire : évoque les assiettes, cohérent avec "cour ronde sous le platane".
- **Galerie en diapositive lente mono-image**, pas de masonry, pas de grille : on visite la cour coin par coin, pas d'un coup.
- **Arc de voûte SVG** en bordeaux qui réapparaît à 3 endroits (hero, entre sections 4 et 5, footer) comme un motif récurrent : le seuil qu'on repasse.

### Ce que ce site n'a PAS (divergence explicite)

- **Pas de marquee** (pas de texte défilant sportif) : incohérent avec l'émotion "confidentialité".
- **Pas de galerie en grille** masonry ou bento.
- **Pas de hero split 50/50 classique** avec texte à gauche, image à droite.
- **Pas de 3 à 6 avis empilés** : une seule voix, celle de TripAdvisor la plus iconique.
- **Pas de bouton "Réserver en ligne"** (le restaurant ne prend pas de réservations en ligne, ne pas mentir au visiteur) : le CTA primaire est **`Appeler la maison`** (tel:).
- **Pas de menu-carte détaillé** : on n'a pas les prix exacts, on évoque les plats signature sans inventer.
- **Pas de sticky nav persistante au hero** : la nav n'apparaît qu'après la révélation, pour préserver l'effet de seuil.

---

## Motion language

- **Clip-path reveal d'ouverture (geste signature)** : déclenché sur `window.scrollY > 40px` ou `wheel/touch` au hero. Deux phases enchaînées :
  1. `clip-path: inset(48% 45% 48% 45%)` vers `clip-path: inset(10% 0% 10% 0%)` en **700ms** avec easing `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) : la voûte s'écarte verticalement.
  2. Puis `clip-path: inset(0% 0% 0% 0%)` en **550ms** easing `cubic-bezier(0.22, 1, 0.36, 1)` : l'image du seuil disparaît complètement, la cour est entièrement visible.
  3. En parallèle, `background-color` du `body` passe de `--ink` à `--bg` (800ms), le titre "L'Arrière Cour" translate up + fade out (400ms), la nav descend depuis `translateY(-100%)` vers `0` (500ms, delay 600ms).
  Après révélation, l'event est "consommé" (one-shot) et le scroll normal reprend.

- **Entrées scroll (sections 3 à 9)** : `Motion.inView` avec `opacity: 0 vers 1` + `translateY: 24px vers 0`, durée **0.9s**, easing `[0.2, 0.7, 0.2, 1]`, stagger **80ms** sur les enfants directs (titre, lede, image).

- **Parallax image (section 4 et 8)** : décalage vertical **8%** sur scroll, calculé via `scrollY * 0.08`, requestAnimationFrame. Pas plus, pour garder l'impression "image posée contre un mur", pas "image qui vole".

- **Médaillons signature (section 5)** : au hover, `scale: 1 vers 1.04` + `filter: saturate(1.05)` en **220ms** ease-out. Le libellé italic dessous passe de `color: --ink-2` à `--accent` en 180ms.

- **Galerie diapositive (section 6)** : auto-advance 6s. Transition entre images : `opacity 0 vers 1` sur la nouvelle image (700ms, easing `ease-in-out`) + `scale 1.02 vers 1.00` simultané sur l'image entrante. Pas de slide horizontal (ferait "carousel pub"), uniquement fondu + léger zoom out.

- **Arc de voûte SVG** : au chargement, `stroke-dashoffset` animé de `length vers 0` en **1.6s** ease-in-out-sine (l'arc se dessine). Récurrent mais plus rapide (0.8s) aux occurrences suivantes.

- **Cards hover (infos, footer)** : sobre, `translateY(-2px)` + shadow `0 8px 24px rgba(30, 26, 20, 0.08)`, transition **180ms**.

- **Smooth scroll global** : Lenis actif, duration 1.0, easing `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` (ease-out-expo). Le rythme de scroll lui-même doit être "lent et observé", cohérent avec une promenade dans une cour.

- **Interdictions** : pas d'auto-play vidéo, pas de curseur custom, pas de popup de réservation, pas d'animation de texte lettre par lettre (cheap), pas d'effet "liquid" / "WebGL shaders" (hors identité).

---

## Images sélectionnées

Toutes téléchargées dans `dist/restaurant-l-arriere-cour-lurfms4c/site/assets/images/`. Référencées en chemin relatif depuis `site/index.html`.

| Rôle                           | Chemin local                                              | Source (origine)                           | Alt text                                                         |
|--------------------------------|-----------------------------------------------------------|--------------------------------------------|------------------------------------------------------------------|
| hero-seuil (section 1, sombre) | `./assets/images/premiere-image-arriere-cour.jpg`         | CSV `premiere_image` (lh3.googleusercontent) | L'Arrière Cour, Saint-Florent : entrée depuis la ruelle        |
| hero-révélation (section 2)    | `./assets/images/hero-arriere-cour.jpg`                   | CSV `thumbnail` (lh3.googleusercontent)     | La cour ombragée et son platane centenaire                     |
| histoire (section 4, 3:4)      | `./assets/images/interieur-arriere-cour.jpg`              | RestaurantGuru (img02.restaurantguru.com)   | Intérieur et cour couverte du restaurant                       |
| signature 1 (médaillon 1:1)    | `./assets/images/plats-arriere-cour-1.jpg`                | RestaurantGuru                              | Ravioli au brocciu, spécialité maison                          |
| signature 2 (médaillon 1:1)    | `./assets/images/repas-arriere-cour.jpg`                  | RestaurantGuru                              | Plat servi, cuisine corse généreuse                            |
| signature 3 (médaillon 1:1)    | `./assets/images/plats-arriere-cour-2.jpg`                | RestaurantGuru                              | Assiette du soir, terroir corse                                |
| galerie 1 (16:10)              | `./assets/images/terrasse-cour-tripadvisor.jpg`           | og:image TripAdvisor                        | La terrasse de la cour en fin de journée                       |
| galerie 2 (16:10)              | `./assets/images/cour-arriere-cour-tripadvisor.jpg`       | photo TripAdvisor                           | Tables dressées sous le platane                                |
| galerie 3 (16:10)              | `./assets/images/premiere-image-arriere-cour.jpg` (crop)  | CSV `premiere_image`                        | Entrée par la ruelle pavée                                     |
| galerie 4 (16:10)              | `./assets/images/hero-arriere-cour.jpg` (crop)            | CSV `thumbnail`                             | Vue d'ensemble de la cour, pleine lumière                      |
| galerie 5 (16:10)              | `./assets/images/interieur-arriere-cour.jpg` (crop)       | RestaurantGuru                              | Pierres apparentes et mobilier vintage                         |
| galerie 6 (16:10)              | `./assets/images/cour-arriere-cour-tripadvisor.jpg` (crop)| TripAdvisor                                 | Ambiance du soir sous les branches                             |
| footer background              | `./assets/images/hero-arriere-cour.jpg`                   | CSV `thumbnail`                             | Retour à la cour, avant de refermer la porte                   |

**Comptage :** 8 fichiers images locaux uniques, 13 rôles assignés (par réutilisation crop/traitement). **Zéro placeholder.** Tous les rôles critiques (hero-seuil, hero-révélation, histoire, 3× signature, 6× galerie, footer) sont couverts par des images réelles. Aucune `source.unsplash.com`, aucun hotlink externe.

> Note au builder : pour les 6 slides de la galerie, utiliser `object-position` CSS (top, center, bottom) pour produire 6 cadrages distincts à partir des 8 images, et ne jamais afficher deux fois le même cadrage consécutivement.

---

## Copy directions (pour le builder, à écrire en français, sans em-dash)

- **Eyebrow général (nav / sections)** : `RESTAURANT · SAINT-FLORENT · DEPUIS LA RUELLE`, capitales, tracking 0.18em.
- **H1 (seuil)** : `L'Arrière Cour` (deux lignes, italic sur "Arrière"). Sous-titre Inter small : `Saint-Florent, Haute-Corse`.
- **Micro-texte d'invitation (hero)** : `pousser la porte`, lowercase, italic, Cormorant 300, avec un petit chevron SVG dessous.
- **Lede (section 3)** : citation Petit Futé, telle quelle, 18 mots.
- **H2 section 4** : `Un jardin secret, au coeur du village` (italic sur "secret"). Lede : 2 paragraphes courts, 90 mots total, évoquant la ruelle, la cour, le platane, les pierres, la cuisine maison, sans inventer de chef ni de date.
- **H2 section 5** : `La table, trois assiettes qui parlent`.
- **H2 section 6** : `Coin par coin`. Sous-titre : `une promenade dans la cour`.
- **H2 section 8** : `Pour venir`.
- **CTA primaire (apparaît sections 4, 8, 9)** : `Appeler la maison` (href `tel:+33495353362`). Pas de bouton "Réserver".
- **CTA secondaire (section 8 uniquement)** : `Ouvrir dans Google Maps`, href vers le google_maps_url.
- **Footer mention** : `Site par Menghi Computer Science, 2026`.
- **Aucun em-dash** nulle part, remplacer par `,` ou `:` ou `.`. Le tiret simple `-` reste autorisé pour les horaires (12h-15h).

---

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, contraste AA/AAA vérifié sur `--bg` pour `--ink`, `--ink-2`, `--accent`.
- [x] 2 polices Google Fonts : **Cormorant Garamond** (300, 500 + italic) + **Inter** (400, 500).
- [x] 1 archétype choisi et justifié : `custom, threshold-reveal`.
- [x] 9 sections ordonnées avec rôle, taille, traitement.
- [x] 8 images locales réelles, 13 rôles couverts, 0 placeholder.
- [x] Motion language décrit (clip-path reveal signature + entrées scroll + parallax + carousel + Lenis), durées et easings précisés.
- [x] Google Maps iframe : `https://maps.google.com/maps?q=42.6809521,9.3004186&output=embed` prêt à intégrer.
- [x] Geste d'UI singulier inventé : **clip-path reveal d'ouverture** + **arc de voûte SVG récurrent**.
- [x] Divergence catalogue vérifiée : pas de marquee, pas de grille froide, pas de split classique, pas de réservation en ligne.
- [x] Copy sans em-dash, CTA aligné sur la contrainte réelle (téléphone, pas réservation en ligne).
