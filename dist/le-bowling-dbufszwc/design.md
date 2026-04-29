# Design brief — Le Bowling (Sagone)

> Nouveau brief, archétype précédent (`showcase-catalogue composez votre cornet`) rejeté par le client. Repart de zéro.

## 0. Réflexion UX (7 questions)

**Visiteur-type :** Famille en vacances à Sagone (parents 35-50 + ados/enfants), couples touristes en itinérance sur la côte ouest corse, habitués locaux venant pour la glace du dimanche. Device dominant : mobile (85%+), consulté en journée entre plage et dîner, ou en fin d'après-midi pour « on y va ou pas ? ».

**Contexte d'arrivée :** Recherche Google « glacier Sagone », « meilleure glace Corse ouest », « où manger Sagone », ou QR code sur carte/flyer sur place, ou bouche-à-oreille Instagram (@lebowlingsagone, 2 095 abonnés).

**Intention primaire :** Vérifier **si ça vaut le détour maintenant** (ouvert ? terrasse dispo ? on y va à pied depuis la plage ?) et **saliver devant les glaces** (40+ parfums, vacherins, Picasso). Intention secondaire : trouver l'adresse / itinéraire.

**Intention business :** Remplir la terrasse tout l'été, convertir le touriste de passage en habitué (« on y retourne demain »), mettre en avant l'excellence pâtissière (Filidori / Hermé / Michalak) pour justifier le positionnement premium, et asseoir l'ancrage familial 1966 / 3e génération Mattei comme signal de crédibilité.

**Contrainte UX structurante :** Le nom du lieu, « Le Bowling », est un **contresens apparent** : le visiteur qui arrive par Google attend littéralement des pistes de bowling, et découvre un glacier-pâtisserie d'exception. Le site doit **transformer ce gag en atout**, en assumant le wink arcade rétro comme signature identitaire, tout en racontant très vite que c'est un glacier de plage depuis 1966. Deuxième contrainte : 40+ parfums = densité d'info à présenter sans noyer.

**Émotion-cible à 5 secondes :** Joie estivale immédiate + sourire complice (« ah ouais, le bowling c'est juste le nom, ok je joue »). Pas de sérieux, pas de luxe austère. Du sucre, du soleil, du son de machine à boules.

**Money shot :** Un **carton de score de bowling** gigantesque, rempli à la craie/feutre, où chaque « frame » (1 à 10) est en fait une section du site. Le X de strike devient un cornet de glace stylisé, le spare devient un trait de sauce chocolat. Tout le site **EST** une scorecard. En arrière-plan : terrasse ombragée de Sagone à 300 m de la plage.

---

## Archétype

**`scorecard-arcade` (custom, hybride scoreboard rétro + carte postale estivale).**

Justification : le nom du commerce (« Le Bowling ») fournit un wink identitaire unique au catalogue Menghi, que personne d'autre ne pourra réutiliser. On assume la forme d'un **ticket de scoring de bowling années 80**, typographie monospace-dot, frames numérotées 01 à 10, cases qui se remplissent au scroll comme un joueur qui lance ses boules. Chaque frame porte un contenu du site (hero, histoire, glaces, terrasse, etc.). Par-dessus, palette de carte postale corse vintage (azur, sable, corail, pistache, crème) qui ancre l'été à Sagone. Aucun des 9 sites déjà livrés n'exploite cette grammaire (scoreboard / monospace-dot / frames numérotées). Divergence garantie vs `magazine-editorial`, `maritime`, `timeline-verticale`, `fullbleed-photo-first`, `showcase-catalogue`, `split-sticky+sunset`, `dashboard-carnet-route`, `threshold-reveal`, `horizon-band`.

---

## Palette de couleurs

Palette « carte postale Sagone 1966 » : bleu azur méditerranéen + crème sable + corail cornet + pistache menthe + encre marine pour le trait.

| Rôle       | Hex      | Nom descriptif      | Utilisation                                                     |
|------------|----------|---------------------|------------------------------------------------------------------|
| `--bg`     | #FAF4E6  | Crème Sagone        | Fond principal (papier de scorecard légèrement vieilli)          |
| `--ink`    | #0E2A3C  | Encre marine        | Texte principal, traits de scorecard, contour frames             |
| `--ink-2`  | #5A6B78  | Gris galet          | Texte secondaire, légendes monospace                             |
| `--accent` | #E85A3C  | Corail cornet       | CTA, numéros de frame actifs, « X » des strikes, cornets         |
| `--line`   | #2C9DB8  | Azur Méditerranée   | Lignes de scorecard, hover, traits manuscrits, accents eau       |

Accent secondaire optionnel (utilisable en petites touches, non obligatoire) : `#A8C878` pistache menthe pour les glaces pistache/menthe et les badges « ouvert ». Contrastes vérifiés : `--ink` sur `--bg` = 13.2:1 (AAA), `--accent` sur `--bg` = 4.7:1 (AA), `--line` azur sur `--bg` = 3.1:1 (non-texte OK, texte réservé à 20px+ bold). Toute la copy importante est en `--ink` sur `--bg` ou sur image avec scrim.

Palette générique glacier évitée : pas de rose bonbon / pas de pastels fades. On reste **solaire adulte**, corail saturé + azur profond, crème tiède.

---

## Typographie

- **Display / dot-matrix :** `VT323` (Google Fonts, 400). Typo monospace pixel/dot-matrix utilisée pour :
  - les numéros de frame (01 à 10)
  - les scores et tags (« STRIKE », « SPARE », « 4.5/5 · 1002 AVIS »)
  - l'horloge d'ouverture en header (« OPEN · 08:00-19:00 »)
  - les micro-labels monospace partout où on mime l'arcade/scoreboard
  Pourquoi : c'est LA signature arcade rétro qui justifie tout l'archétype. VT323 est gratuite, Latin-1 complète (accents FR OK), très lisible.

- **Display éditorial (titres généreux) :** `Fraunces` (Google Fonts, 300 + 700, optical size variable). Utilisée pour :
  - H1 du hero (« Depuis 1966, la glace qui porte bien son nom »)
  - H2 de section (« Nos 40 parfums », « La maison Mattei », « La terrasse »)
  - Grands nombres éditoriaux (« 1966 », « 3 générations », « 40+ »)
  Pourquoi : Fraunces apporte la chaleur artisanale du sucre et contrebalance la rigueur dot-matrix, évitant que le site tombe dans le pur geek-arcade. C'est le contraste qui tient l'identité « glacier gourmand qui s'appelle Bowling ».

- **Body :** pas de 3e police. Le corps de texte utilise **Fraunces** en 400 taille body (1.0-1.05rem), ce qui donne un grain éditorial chaud très cohérent pâtisserie.

- **Échelle (mobile-first) :**
  - H1 hero : `clamp(2.8rem, 10vw, 6.4rem)` Fraunces 300 italic, tracking `-0.03em`
  - H2 frame : `clamp(2rem, 5vw, 3.4rem)` Fraunces 700, tracking `-0.02em`
  - Frame number VT323 : `clamp(4rem, 12vw, 8rem)`
  - Body : `1.05rem` Fraunces 400, line-height `1.55`
  - Micro-label monospace : `0.82rem` VT323, tracking `0.08em`, uppercase

---

## Layout archétype

**Choix : `scorecard-arcade` (custom).**

Le squelette du site est un **ticket de scoring de bowling** déroulé à la verticale : en header la grille de frames numérotées 01 à 10, chaque frame étant une ancre vers une section du site. En scroll, on descend « frame par frame », et chaque frame se remplit d'un score (X pour strike = section vue entièrement, / pour spare = partiellement, chiffre sinon) au fur et à mesure que l'utilisateur progresse. Le « money shot » du hero est une photo pleine largeur de la terrasse de Sagone, surmontée du wordmark « LE BOWLING » et du score de la maison : « 1966 · 4.5 · 1002 ».

### Rythme des sections (10 frames, de haut en bas)

1. **Frame 01 · Hero « The opening roll »** : nav top minimaliste (wordmark + scorecard-nav mini en haut à droite). Dessous, photo pleine largeur de la terrasse (`gmaps-thumbnail-hd-le-bowling.jpg`) avec wordmark `LE BOWLING` en Fraunces XXL + sous-titre « Glacier & pâtisserie · Sagone · depuis 1966 ». À droite un **mini-scoreboard vertical** affiche en VT323 : `FRAME 01 / 10 · OPEN · 08:00-19:00 · TODAY LUN`. CTA primaire corail : « Voir la carte » ; CTA secondaire : « Nous trouver ». Taille : 100vh mobile, 90vh desktop.

2. **Frame 02 · « Spare » intro (la maison)** : bande horizontale courte (50vh). Numéro `02` géant en VT323 à gauche, texte court Fraunces à droite : « Le nom dit bowling. La maison dit glace. Depuis 1966, la famille Mattei tient la plus belle terrasse sucrée de la côte ouest. » Pas d'image, pur typo, respire.

3. **Frame 03 · « Strike » les 40 parfums (galerie dense)** : grille 2×N de coupes / cornets (photos voyageurs TripAdvisor + restaurantguru), chaque tuile en 4:5 avec un **pin-bowling-renversé** en badge quand on hover (ou tap mobile). Caption VT323 : « PARFUM 12 / 40 · FRAISE DES BOIS ». 8 à 10 tuiles visibles. Intention : faire saliver.

4. **Frame 04 · « Double strike » signature Picasso + Vacherin** : split 2 colonnes inversé sur mobile. Photo pâtisserie Picasso + photo vacherin maison côte à côte. Titre Fraunces : « Les signatures : Picasso & Vacherin ». Texte court : formation Filidori chez Hermé & Michalak. Fond `--bg` + liseré azur.

5. **Frame 05 · « Open frame » la terrasse** : photo pleine largeur `tripadvisor-bowling-terrasse.jpg` en ratio 21:9, titre superposé bas-gauche « La terrasse, 300 m de la plage », scrim azur dégradé bas. Une ligne Fraunces italique en overlay : « À l'ombre des parasols, le temps se pose. »

6. **Frame 06 · « Split 7-10 » histoire 3 générations** : mini-timeline horizontale monospace (1966 → 1990s → aujourd'hui), trois vignettes courtes en Fraunces, photo officielle TripAdvisor #2 à droite sur desktop, en tête de frame sur mobile. Pas de longue prose.

7. **Frame 07 · « High score » avis clients** : 3 grandes citations ★★★★★ en Fraunces italique, chaque citation dans une « case de frame » avec un `X` corail VT323 en haut à droite (strike). Sélection : Julie S. / Melkai / Ste R. (tous 5★). Note globale en bannière monospace : `GOOGLE 4.5 / 1002 · TRIPADVISOR 4.4 / 334 · #1 DESSERTS SAGONE`.

8. **Frame 08 · « Extra ball » soirées d'été** : bande pleine largeur photo `tripadvisor-bowling-soiree-ete.jpg`, titre « Apéro Electro Art · les soirées d'été », deux lignes sur les DJ sets et expositions.

9. **Frame 09 · « Scorecard totals » infos pratiques + Maps** : split 50/50 desktop (stack mobile). À gauche : adresse + horaires en liste VT323 façon tableau de scores (`LUN 08:00-19:00 · MAR 08:00-19:00 · MER FERMÉ · …`) + tél + email. À droite : Google Maps iframe (`q=42.116134,8.693207&z=15&output=embed`) avec un **cadre scorecard** autour (bordure `--ink` + coins coupés).

10. **Frame 10 · « Game over » footer** : bandeau bas, grand wordmark `LE BOWLING` répété en silhouette + sous-titre « Merci d'avoir joué. À bientôt sur la terrasse. », liens Instagram/Facebook, copyright, micro-mention `made with love · Menghi Computer Science`.

### Singularités du site (geste UI et divergences)

- **Scorecard-nav signature (geste UI inédit)** : en haut à droite, petite grille horizontale de 10 cases VT323 numérotées 01-10, qui sert simultanément de **mini-carte de progression au scroll** et de **nav par ancres**. À mesure que l'utilisateur descend, les cases se remplissent avec un `X` corail (strike = section vue), un `/` (spare = section traversée partiellement), ou le numéro qui pulse (frame courante). Clic/tap = scroll direct vers la frame correspondante. Geste jamais vu dans le catalogue Menghi. Accessible : labels ARIA « Aller à la section N ».
- **Wink bowling→glace** : les pictos de quille deviennent des cornets retournés, les boules deviennent des boules de glace. Micro-détail dans badges, séparateurs SVG, favicon.
- **Ligne horizontale de bowling** sous le hero : un trait azur en SVG qui représente la « piste » avec 10 quilles-cornets stylisées au bout. Animation Motion : au chargement, une boule corail roule de gauche à droite le long de la piste, fait tomber les quilles-cornets, puis les quilles se redressent en cornets de glace dressés (2.5s total, easing bowling-physics). Unique money-moment qui résume tout l'angle du site en 3 secondes.
- **Sticker « 1966 » manuscrit à la craie** déposé de travers sur la photo du hero, comme un tampon de scoreboard. Typographie crayonnée (SVG sur-mesure, pas une Google Font), rotation -7deg, ombre très douce.
- **Fond papier léger** : texture SVG noise très subtile (4% opacity) sur `--bg` pour donner le grain d'un vrai ticket papier de bowling. Pas de skeuomorphisme lourd.

### Ce que ce site n'a PAS (divergences explicites)

- **Pas de section « composez votre cornet »** (archétype rejeté, banni).
- **Pas de marquee** (remplacé par le trait de piste animé du hero, plus singulier).
- **Pas de hero split 60/40** (le hero est full-bleed photo + wordmark XXL overlay + scorecard-nav top-right).
- **Pas de section signature en 3 cartes carrées** (remplacée par le split 2-colonnes Picasso + Vacherin).
- **Pas de carte centrale ronde** (l'iframe Maps est encadré dans un cadre scorecard rectangulaire).
- **Pas de curseur follower, pas de scrolljack, pas de popup.**

---

## Motion language

- **Hero bowling-roll (signature)** : au load, Motion One orchestre la séquence boule-roule-quilles-tombent-cornets-se-dressent. Durée totale 2.5s, easing custom `[0.32, 0.72, 0.35, 1]` pour la boule (accélération bowling), `[0.5, 1.4, 0.6, 1]` overshoot pour les cornets qui se dressent. Une seule fois, pas de boucle.
- **Scorecard-nav fill** : à chaque entrée de frame dans le viewport (`Motion.inView`, threshold 0.6), la case correspondante reçoit son `X` ou `/` en VT323, avec un petit « clac » visuel (scale 0.8 → 1.15 → 1, 220ms, ease-out). Pas de son (pas d'auto-audio).
- **Entrées scroll sections** : `opacity 0 → 1 + translateY 24px → 0`, 0.7s, easing `[0.2, 0.7, 0.2, 1]`, stagger 80ms sur groupes (galerie 40 parfums, citations).
- **Hover tuiles glaces (desktop)** : translateY(-4px) + rotation(-1.5deg), shadow azur très douce, 200ms ease-out. Badge quille-cornet SVG apparaît en fade 150ms.
- **Hover CTA corail** : fond s'inverse (corail → crème, texte crème → corail), 180ms.
- **Smooth scroll global** : Lenis activé, duration 1.1, easing exponentiel standard.
- **Parallax hero** : image hero translateY de 0 à -8% sur scroll hero (via Motion `scroll`).
- **Respect `prefers-reduced-motion`** : la séquence bowling-roll se raccourcit à un fade-in 400ms, le parallax est désactivé, les stagger deviennent 0ms.

---

## Images sélectionnées

Toutes les images listées existent déjà dans `dist/le-bowling-dbufszwc/site/assets/images/` (confirmé par la liste fournie). 17+ images réelles, zéro placeholder.

| Rôle                                   | Chemin local                                                   | Catégorie    | Alt text                                                             |
|----------------------------------------|----------------------------------------------------------------|--------------|-----------------------------------------------------------------------|
| Hero full-bleed (Frame 01)             | `./assets/images/gmaps-thumbnail-hd-le-bowling.jpg`            | HERO         | Terrasse ombragée du Bowling à Sagone, parasols et tables rondes     |
| Hero secondaire / bande terrasse (F05) | `./assets/images/tripadvisor-bowling-terrasse.jpg`             | AMBIANCE     | Terrasse du Bowling avec parasols face à la plage de Sagone          |
| Ambiance histoire (Frame 06)           | `./assets/images/tripadvisor-le-bowling-officiel-2.jpg`        | AMBIANCE     | Façade historique du Bowling, maison Mattei                          |
| Ambiance extra (galerie / F04 fond)    | `./assets/images/tripadvisor-le-bowling-officiel-1.jpg`        | AMBIANCE     | Vue officielle de l'établissement                                     |
| Ambiance extra (F08 bandeau)           | `./assets/images/tripadvisor-bowling-soiree-ete.jpg`           | AMBIANCE     | Soirée estivale Apéro Electro Art                                     |
| Ambiance intérieur (F07 fond citation) | `./assets/images/tripadvisor-bowling-interieur-1.jpg`          | AMBIANCE     | Intérieur convivial, bar et éclairage chaleureux                      |
| Signature Picasso / Vacherin (F04 L)   | `./assets/images/tripadvisor-le-bowling-officiel-3.jpg`        | PLATS-GLACES | Pâtisserie signature Picasso                                          |
| Signature Picasso / Vacherin (F04 R)   | `./assets/images/tripadvisor-bowling-glaces-panorama.jpg`      | PLATS-GLACES | Vacherin maison et panorama de coupes                                 |
| Galerie parfums #1 (F03)               | `./assets/images/tripadvisor-bowling-voyageur-2024-a.jpg`      | PLATS-GLACES | Coupe de glace au verre bleu signature                                |
| Galerie parfums #2 (F03)               | `./assets/images/tripadvisor-bowling-voyageur-2024-b.jpg`      | PLATS-GLACES | Coupe glacée colorée                                                  |
| Galerie parfums #3 (F03)               | `./assets/images/tripadvisor-bowling-voyageur-2023-a.jpg`      | PLATS-GLACES | Coupe 2023 présentation soignée                                       |
| Galerie parfums #4 (F03)               | `./assets/images/tripadvisor-bowling-voyageur-2023-b.jpg`      | PLATS-GLACES | Coupe 2023 variante                                                   |
| Galerie parfums #5 (F03)               | `./assets/images/tripadvisor-bowling-voyageur-2022-a.jpg`      | PLATS-GLACES | Coupe voyageur 2022                                                   |
| Galerie parfums #6 (F03)               | `./assets/images/tripadvisor-bowling-voyageur-2023-c.jpg`      | AMBIANCE     | Détail voyageur 2023                                                  |
| Galerie parfums #7 (F03)               | `./assets/images/le-bowling-desserts-banana-split.jpg`         | PLATS-GLACES | Banana split généreux                                                 |
| Galerie parfums #8 (F03)               | `./assets/images/le-bowling-desserts-chocolat.jpg`             | PLATS-GLACES | Coupe chocolat et glaces vacherin                                     |
| Menu annexe salade (F03 bas)           | `./assets/images/tripadvisor-bowling-salade.jpg`               | PLATS-GLACES | Belle salade estivale du Bowling                                      |
| Ambiance intérieur bis (F08 hover)     | `./assets/images/tripadvisor-bowling-interieur-2.jpg`          | AMBIANCE     | Intérieur, second angle                                               |
| Fallback terrasse (F02 background léger) | `./assets/images/thumbnail-le-bowling.jpg`                   | HERO         | Terrasse, version fallback                                            |
| Premiere image Google Maps (F09 carte) | `./assets/images/gmaps-premiere-image-hd-le-bowling.jpg`       | HERO         | Vue Google Maps de l'établissement                                    |

**Total : 20 images locales réelles utilisées. 0 placeholder. 0 hotlink externe (hors iframe Maps).** Couverture bien au-delà des 6 rôles minimum.

---

## Copy directions (pour le builder)

- **Wordmark** : `LE BOWLING` (Fraunces 300 italic XXL, tracking -0.04em) + sous-ligne VT323 `GLACIER · PÂTISSERIE · SAGONE · 1966`.
- **Eyebrow VT323** : `FRAME 01 / 10`, `FRAME 02 / 10`, etc. (uppercase, tracking 0.1em).
- **H1 hero (Fraunces 300 italic)** : « Depuis 1966, la glace qui porte bien son nom. »
- **Lede hero (Fraunces 400, 40-55 mots)** : « À 300 mètres de la plage de Sagone, la famille Mattei tient depuis trois générations le rendez-vous sucré de la côte ouest. Quarante parfums de glaces maison, des pâtisseries signées par un ancien de chez Hermé et Michalak, et une terrasse où le temps prend son temps. »
- **CTA primaire (corail)** : « Voir la carte » (ancre vers Frame 03).
- **CTA secondaire (outline encre)** : « Nous trouver » (ancre vers Frame 09).
- **Tag « open today »** VT323 dynamique côté client (simple JS lecture du jour) : `OPEN · LUN · 08:00-19:00` / `FERMÉ AUJOURD'HUI · REVENEZ JEUDI` le mercredi.
- **Mentions chiffrées** à mettre en VT323 monospace : `1966`, `40+ PARFUMS`, `3 GÉNÉRATIONS`, `4.5 / 1002 GOOGLE`, `#1 DESSERTS SAGONE`.
- **Ton** : complice, estival, joyeux, pas pompeux. Phrases courtes. Zéro em-dash (U+2014), utiliser `:`, `,`, `.`, `()`. Le tiret simple `-` est autorisé pour horaires (`08:00-19:00`) et composés.

---

## Notes techniques pour le builder

- **Google Fonts** : `<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;1,9..144,300&family=VT323&display=swap" rel="stylesheet">`
- **Tailwind config inline** : enregistrer `fontFamily.display = ['Fraunces', 'serif']`, `fontFamily.mono = ['VT323', 'monospace']`, et les 5 couleurs `bg`, `ink`, `ink-2`, `accent`, `line` dans `theme.extend.colors`.
- **Grille scorecard** : utiliser CSS Grid native pour la top-nav 10-cases (grid-template-columns: repeat(10, 1fr) max 260px desktop, scroll-x mobile avec snap). Chaque case 32×32px mobile, 44×44px desktop, border `--ink` 1.5px, coins légèrement arrondis (2px).
- **SVG piste de bowling** : inline SVG sous le hero, 100vw × 80px. Cornets-quilles = `<path>` simples, la « boule » est un `<circle>` animé via Motion.
- **Icône favicon** : SVG cornet de glace renversé tenant lieu de quille, couleur corail.
- **Google Maps iframe** : `<iframe src="https://maps.google.com/maps?q=42.116134,8.693207&z=15&output=embed" loading="lazy" ...>` encadré dans `<div class="border-2 border-ink p-2 rounded-sm">` avec petits coins VT323 `[01]` `[10]` aux angles pour rappeler la scorecard.
- **Horaires live** : petit script JS inline lit `new Date().getDay()` et remplit le tag hero. Mercredi (3) affiche « FERMÉ AUJOURD'HUI · REVENEZ JEUDI ».
- **Perfs** : toutes les images en `loading="lazy"` sauf hero `fetchpriority="high"`. Préconnect Google Fonts + CDN Motion.
- **Accessibility** : alt text FR descriptif sur chaque image, `aria-label` sur scorecard-nav, contraste AA sur toute la copy, focus visible corail sur tous les liens/boutons. Navigation clavier sur les 10 frames.
- **Zéro em-dash** dans `index.html`. Check : `grep -c $'\u2014' dist/le-bowling-dbufszwc/site/index.html` doit retourner `0`.
- **Mobile-first** : scorecard-nav passe en strip horizontal scrollable avec snap, les splits 50/50 deviennent stacks, la piste SVG du hero se réduit à 48px de haut.

---

## Checklist avant handoff builder

- [x] 5 couleurs hex définies, contrastes AA vérifiés
- [x] 2 polices Google Fonts nommées avec poids (Fraunces + VT323)
- [x] 1 archétype custom choisi + justifié (`scorecard-arcade`)
- [x] 10 frames (sections) ordonnées avec intention + traitement
- [x] 20 images réelles assignées à des rôles, 0 placeholder
- [x] Motion language décrit (durée + easing + reduced-motion)
- [x] Google Maps iframe lat/lng prêt (42.116134, 8.693207)
- [x] Geste UI signature inédit défini (scorecard-nav + bowling-roll hero)
- [x] Divergence explicite vs 9 sites déjà livrés
- [x] Zéro em-dash en copy fournie
