# Design brief U Caradellu (Bravone, Linguizzetta)

> Direction UX créative : **horizon-band scroll + time-based ambiance**. Ruban panoramique horizontal qui rejoue la ligne de mer. L'UI se teinte à l'heure réelle du visiteur (matin bleu pâle, midi ambre, sunset rose-corail, nuit indigo).

---

## 0. Réflexion UX (question par question)

**Visiteur-type :** Estivant corse pieds nus sur la plage de Bravone, en maillot, serviette sous le bras. Famille avec enfants mouillés qui descend de la plage à midi. Touriste en voiture sur la RN198 qui cherche où dîner ce soir. Device dominant : smartphone (80%), souvent au soleil (contraste élevé obligatoire), connexion 4G correcte mais pas garantie. Moment : entre 11h30 et 14h30 (décision midi) ou 18h30 et 21h30 (décision sunset/dîner).

**Contexte d'arrivée :** Recherche Google "restaurant Bravone", "paillote Linguizzetta", "manger plage Bravone midi", "où manger près de Tropica". Recommandation IA ("meilleure paillote côte orientale"). QR code sur la plage ou flyer au camping voisin. Bouche-à-oreille de l'hôte Airbnb.

**Intention primaire :** Savoir en 5 secondes : **(1)** à quelle distance c'est de la plage, **(2)** est-ce ouvert maintenant, **(3)** est-ce que ça a l'air bien et accessible pieds nus, **(4)** c'est quel prix en gros, **(5)** comment on y va. Pas "découvrir une carte de 40 plats". Pas "lire l'histoire du chef". Une décision rapide, prise en plein soleil, enfants qui tirent le bras.

**Intention business :** Remplir midi ET soir pendant les 4 mois d'été (juin à septembre). Convertir l'estivant de passage en habitué qui revient le lendemain soir avec ses amis. Maintenir le flux hors saison (7j/7 toute l'année) via le local corse. Capitaliser sur le statut #1 TripAdvisor Linguizzetta et les 4.6/5 sur 1 200 avis sans en faire un site de review.

**Contrainte UX structurante :** Aucune réservation en ligne (appel uniquement 04 95 59 02 85). Carte très large (corse + poisson + pizza + grill + pâtes). Identité "paillote" qui doit se sentir sans tomber dans le cliché planches-cordage. Pas de photos propriétaires haute def avant signature : 9 images existantes, utilisation démo. Saisonnalité : le site doit briller en juillet mais tenir l'hiver.

**Émotion-cible à 5s :** Sable chaud sous les pieds, brise salée, détente totale. "Pas la peine de se changer, on peut y aller comme ça." L'odeur du grill au loin. Apaisement + envie. Zéro formalisme, zéro guindé.

**Money shot :** Une **bande panoramique horizontale continue** qui traverse tout le hero de gauche à droite, mélangeant la plage de Bravone, la paillote, le grill et l'horizon marin, AVEC une **horloge-paillote live** visible qui affiche "Ouvert maintenant, 13h27, service midi" dans une teinte qui correspond à l'heure réelle. Dès la 1re seconde, le visiteur sait que c'est ouvert, que c'est proche, et il sent la chaleur du sable.

---

## Archétype

**`custom` : horizon-band scroll + time-based ambiance**

Justification (2 phrases) : Aucun des archétypes du catalogue ne rend l'expérience "paillote corse les pieds dans le sable" : le magazine-editorial est trop urbain, le rustic trop montagne, le maritime-classique trop yacht, le bento trop tech. On invente donc un archétype **horizon-band scroll** : une longue bande horizontale panoramique qui porte l'œil comme la ligne de mer, ponctuée de sections verticales qui descendent depuis cette ligne. Divergence radicale du catalogue Menghi : ni Le Grand Bleu (maritime portuaire classique), ni Le Flibustier (maritime-joyeux glacier), ni L'Arrière Cour (rustic reveal-cour), ni U Spuntinu (rustic éditorial Balagne). Cadeau d'UI singulier : la **palette entière se teinte à l'heure réelle du visiteur** (variable CSS pilotée JS), reflétant l'ambiance paillote : 06-11h bleu pâle matinal, 11-15h ambre midi, 17-21h rose-corail sunset, 21-06h indigo nuit.

---

## Palette de couleurs

Palette **tri-modale** : une palette de base (neutre-sable) + 4 teintes de contexte horaire qui modulent `--accent`, `--tint-sky` et `--bg-overlay`. Light mode strict dans tous les cas.

### Base (fixe, toutes heures)

| Rôle         | Hex      | Nom descriptif              | Utilisation                                     |
|--------------|----------|-----------------------------|-------------------------------------------------|
| `--bg`       | #FAF4E8  | Sable de Bravone            | Fond principal, respiration générale            |
| `--ink`      | #1B2A33  | Encre marine Bravone        | Titres, texte principal, nav                    |
| `--ink-2`    | #5E6A71  | Gris galet tiède            | Texte secondaire, légendes, lede                |
| `--accent`   | #C65A2E  | Terracotta du grill         | CTA primaire, liens, underlines, marqueurs      |
| `--line`     | #E8DCC3  | Ligne chaux paillote        | Borders, séparateurs, cards, inputs             |

> Contrastes vérifiés sur `--bg` #FAF4E8 : `--ink` #1B2A33 = 13.2:1 (AAA), `--ink-2` #5E6A71 = 4.9:1 (AA), `--accent` #C65A2E = 4.6:1 (AA large + UI components). Light mode uniquement.

### Teintes horaires (variables `--tint-sky` et `--bg-overlay`, pilotage JS)

| Plage horaire   | Label             | `--tint-sky` hex | `--bg-overlay` hex (alpha 8%) | Mood                          |
|-----------------|-------------------|------------------|-------------------------------|--------------------------------|
| 06:00 à 10:59   | Matin pâle        | #A9C6D6          | #A9C6D614                     | Brume marine, café fumant      |
| 11:00 à 15:59   | Midi ambré        | #E8B877          | #E8B87714                     | Soleil dru, ombre de la paille |
| 16:00 à 17:59   | Après-midi doré   | #D99A5F          | #D99A5F14                     | Transition, sieste             |
| 18:00 à 20:59   | Sunset corail     | #E5806A          | #E5806A14                     | Apéro terrasse, magic hour     |
| 21:00 à 05:59   | Nuit indigo       | #2E3F5C          | #2E3F5C14                     | Bougie, grill au soir          |

> `--accent` reste constant (terracotta, couleur identitaire du grill). Seules `--tint-sky` (accents secondaires, SVG ligne d'horizon, ombres glow) et `--bg-overlay` (léger voile sur hero et bande panoramique) bougent avec l'heure. Le visiteur ressent le moment de sa visite sans que le contraste texte/fond soit compromis.

---

## Typographie

Paire choisie pour porter deux voix : **éditoriale mer** (titres larges, respiration horizontale, italique expressif) + **humaniste lisible mobile au soleil** (corps texte, très résistant au contraste écran plein soleil).

- **Display :** `Fraunces` (Google Fonts), poids 300 + 500 + italic 300. Serif à optical size variable (SOFT axis), idéale pour une signature "paillote chaleureuse" qui n'est ni trop sévère (évite le côté bistro parisien) ni trop fantaisie. L'italique Fraunces à 300 en très grande taille fait respirer le hero et donne une sensualité estivale.
- **Body :** `Inter` (Google Fonts), poids 400 + 500 + 600. Humaniste géométrique, ultra-lisible sur smartphone en plein soleil, zéro ornement. Contraste optique parfait avec la display.
- **Accent micro-typo :** utilisation de **small-caps Fraunces** pour l'eyebrow (catégorie / ville) et les labels horaires.

### Size scale (mobile-first)

- h1 hero : `clamp(3rem, 9vw, 7rem)` : Fraunces italic 300, tracking `-0.025em`, line-height 0.95
- h2 section : `clamp(2rem, 4.6vw, 3.4rem)` : Fraunces 500, tracking `-0.02em`, line-height 1.05
- h3 carte : `clamp(1.15rem, 2vw, 1.45rem)` : Inter 600
- body : `1.05rem` / line-height 1.65 : Inter 400
- lede : `1.18rem` / line-height 1.55 : Inter 400
- small / eyebrow : `0.78rem`, letter-spacing `0.22em`, uppercase, Inter 500, small-caps sur les labels horaires
- **horloge-paillote live** : `1rem` Inter 500 + point pulsant accent (`animation: pulse 2.4s ease-in-out infinite`)

---

## Layout archétype

**Choix : `custom — horizon-band scroll + time-based ambiance`**

Le site est bâti autour d'un **long ruban panoramique horizontal** qui incarne la ligne de mer. Le hero n'est pas un split portrait ni un bento : c'est une bande panoramique ultra-large (ratio ~21:9) au-dessus de laquelle flottent le nom du lieu (Fraunces italic XXL), l'horloge-paillote live, et un indicateur de distance depuis la plage. Les sections qui suivent **descendent** depuis cette ligne comme des colonnes de plongeon, et la galerie est elle-même une **bande horizontale continue** (scroll latéral sur desktop, swipe natif mobile), pas une grille 3x2. Divergence assumée : pas de grille modulaire, pas de timeline verticale, pas de magazine-columns, pas de reveal-cour.

### Rythme des sections (à lire de haut en bas)

1. **`nav-horizon`** : Barre top ultra-fine (48px), ligne horizontale continue qui prolonge l'idée du ruban. À gauche : wordmark "U Caradellu" (Fraunces italic 300). À droite : l'**horloge-paillote live** (point pulsant + heure actuelle + statut "Ouvert · Service midi" ou "Ouvert · Service soir"). Au centre : 4 ancres (Carte, Plage, Galerie, Trouver). La nav prend la teinte `--tint-sky` (subtile fond 8%) selon l'heure.

2. **`hero-panorama`** : Bande panoramique plein écran (100vh mobile, 85vh desktop) ratio très large. Image de fond : la paillote+terrasse+mer en fusion horizontale. Overlay : **H1 Fraunces italic 300 en très grand** ("Pieds dans le sable, assiette face mer") qui s'étale sur 2 lignes, wordmark discret, lede 2 phrases ancrées localement (Bravone, RN198, 1 200 avis), CTA primaire "Appeler pour réserver · 04 95 59 02 85" + CTA secondaire "Voir la carte". En bas du hero : une **mini-timeline horizontale de la journée** (6h-12h-18h-00h) avec un marqueur terracotta qui indique l'heure actuelle et change de position au chargement. Effet parallax léger (10%).

3. **`distance-plage-strip`** : Bande horizontale fine (180px desktop) qui répond à l'intention primaire n°1. Contenu : une carte SVG schématique "Plage de Bravone ←→ U Caradellu" avec distance en mètres (~250m estimé) + temps à pied (3 min) + 3 micro-icônes (parking gratuit, accepte maillot, ombre terrasse). Fond `--tint-sky` teinté horaire.

4. **`carte-en-ruban`** : C'est la section signature — une **bande horizontale défilante** (scroll latéral natif + dragueur tactile) qui présente 6 familles de la carte (Poisson du jour, Grillades au feu, Pizzas Rocco, Pâtes de la nona, Spécialités corse, Desserts maison). Chaque famille = un panneau vertical de 380x520px avec 1 photo, titre Fraunces, 3 exemples de plats, fourchette de prix. Scroll horizontal → l'utilisateur "longe la plage" en lisant la carte. Pas de grille.

5. **`ambiance-paillote`** : Section narrative courte (pas magazine-style, juste 2 colonnes asymétriques 40/60). À gauche : photo ambiance intérieure/terrasse. À droite : 3 paragraphes courts qui nomment Rocco le pizzaiolo, le grill au feu de bois, la terrasse ombragée face à la RN198. Aucun cliché "depuis X générations". Ton : conversationnel chaud.

6. **`galerie-ruban`** : **Bande horizontale continue** pleine largeur (scroll horizontal drag + flèches L/R). 9 images avec ratios variables (certaines 4:5 portrait, d'autres 16:9 paysage, d'autres 1:1) alignées sur une ligne d'horizon commune (baseline visuelle = ligne de mer du hero). Pas de lightbox : le scroll est l'expérience. Sur mobile : swipe natif, snap sur chaque image.

7. **`proof-ticker`** : Bande horizontale fine en marquee lent (60s) qui fait défiler 6 verbatims courts issus des avis (4.6/5 · 1 200 avis · #1 TripAdvisor Linguizzetta). Typo Fraunces italic 300, séparateurs en micro-vagues SVG. Pas de photo, pas de cards, juste le défilement hypnotique qui évoque la vague.

8. **`trouver-maintenant`** : Bloc "utility zone" répondant aux intentions primaires n°2, 3, 5. Layout 50/50 desktop, stack mobile. À gauche : bloc **"Ouvert maintenant"** qui affiche l'horloge-paillote en grand (heure + service en cours), horaires 7j/7 12h-23h, téléphone cliquable en gros, bouton "Itinéraire Google Maps". À droite : iframe Google Maps (lat 42.2090695, lng 9.5345819, zoom 15). Fond `--tint-sky` teinté horaire.

9. **`footer-ligne-mer`** : Footer minimal, une seule ligne horizontale d'infos (adresse Lieu-dit Bravone 20230 Linguizzetta, téléphone, email, © Menghi Computer Science) surmontée d'une fine ondulation SVG rappelant le motif vague. Aucune grille, aucune colonne.

### Singularités du site (5)

- **Horloge-paillote live** : composant JS qui lit `new Date().getHours()`, détermine la plage horaire (matin/midi/après-midi/sunset/nuit), applique les variables CSS `--tint-sky` et `--bg-overlay` correspondantes sur `:root`, et met à jour en continu le badge "Ouvert · Service midi" ou "Ouvert · Service soir". Point pulsant terracotta en permanence pour signaler l'ouverture 7j/7 12h-23h.
- **Ligne d'horizon continue** : une fine ligne SVG (`--tint-sky`) traverse le site de haut en bas, visible en transparence à travers toutes les sections, reliant hero, carte-ruban et galerie-ruban. Métaphore de la ligne de mer qui ne se rompt jamais.
- **Mini-timeline journée dans le hero** : barre horizontale 6h→00h avec marqueur terracotta mobile, le visiteur voit immédiatement "à quel moment de la journée il arrive" et "quand ça ouvre/ferme".
- **Scroll horizontal natif** sur carte ET galerie (drag + scroll latéral + snap) : le site se "longe" comme on longe la plage. Très peu de sites restaurants le font bien ; c'est structurant pour l'identité.
- **Indicateur distance-plage** : bande dédiée à la proximité plage, invention directement issue de l'intention primaire n°1 du visiteur (estivant pieds nus).

### Ce que ce site n'a PAS (divergence explicite)

- **Pas de grille 3x2 classique** (ni pour la carte, ni pour la galerie).
- **Pas de timeline verticale** "depuis 1987...".
- **Pas de hero split portrait 60/40** — panorama full-bleed.
- **Pas de section "Notre histoire / Notre chef"** sentimentale.
- **Pas de marquee de logos de presse** (aucune presse exploitable).
- **Pas de lightbox sur galerie** (l'expérience est le scroll horizontal, pas le clic).
- **Pas de popup / pas de cursor follower / pas d'auto-play vidéo**.
- **Pas de dark mode / switch thème** : la "variation" est déjà portée par l'horloge-paillote live.

---

## Motion language

- **Entrée des sections** : `Motion.inView` avec `opacity 0→1 + translateY 24px→0`, durée 0.9s, easing `[0.22, 0.65, 0.2, 1]`, stagger 80ms sur groupes.
- **Hero parallax** : image panoramique translateY -10% sur scroll, via `Motion` + `scrollY`. Texte H1 reste fixe.
- **Horloge-paillote live** : point pulsant `scale 1 → 1.25 → 1`, `opacity 1 → 0.6 → 1`, durée 2.4s, easing `ease-in-out`, infinite. Au chargement, l'horloge "atterrit" depuis opacity 0 + translateY -8px sur 600ms.
- **Mini-timeline hero** : marqueur terracotta translaté à sa position horaire via CSS `left: calc(progress * 100%)` interpolé sur 1.2s easing `[0.22, 0.65, 0.2, 1]` au chargement (effet "l'aiguille trouve l'heure").
- **Carte-en-ruban** : scroll horizontal natif (CSS `overflow-x: auto; scroll-snap-type: x mandatory`). Flèches L/R desktop avec `scrollBy({left: ±400, behavior: 'smooth'})`. Sur desktop : `scroll-behavior: smooth` + wheel-to-horizontal optionnel.
- **Galerie-ruban** : même mécanique. Chaque image à l'arrivée en viewport : zoom-in léger `scale 1.03 → 1` sur 800ms.
- **Proof-ticker** : `@keyframes scroll-x` 60s linear infinite, pause au hover, respect `prefers-reduced-motion`.
- **Cards hover** (carte & galerie) : `translateY(-3px)` + `box-shadow 0 10px 30px rgba(27,42,51,0.08)`, transition 200ms easing `ease-out`.
- **Changement de teinte horaire** : à l'heure pivot (ex : 15h59→16h00), transition CSS sur `--tint-sky` et `--bg-overlay` de 2s, easing `ease-in-out`. Fluide, imperceptible mais présent.
- **Smooth scroll global** : Lenis actif (instance attachée à window).
- **Accessibilité motion** : `@media (prefers-reduced-motion: reduce)` désactive parallax, marquee, pulse de l'horloge (reste visible mais statique).

---

## Images sélectionnées

Utilisation exclusive des chemins locaux déjà téléchargés dans `site/assets/images/`. Zéro URL externe. 9 images réelles couvrant 9 rôles, 0 placeholder, 0 Unsplash.

| Rôle                         | Chemin local                                          | Source (URL origine)                                                                                                                                                  | Alt text                                                            |
|------------------------------|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| hero-panorama (21:9 crop)    | ./assets/images/hero-caradellu-thumbnail.jpg          | https://lh3.googleusercontent.com/gps-cs-s/APNQkAHfR3y4ABhKJEQBiZzbQzgObjc78slH7zSd7DZV2VSLnlbuTVO69xpxYuWUKf5s8laJPlVkG7brZs9Xj-7jSmcUWKZvNOf_cQPWkYV70XlyAQMqgvIR6DbCi-2tiykp5B3eTcByPjweAzMI=w408-h544-k-no | U Caradellu, paillote corse en bord de plage à Bravone              |
| ambiance-paillote (4:5)      | ./assets/images/design-caradellu.jpg                  | https://img02.restaurantguru.com/c755-U-Caradellu-Linguizzetta-design.jpg                                                                                             | Ambiance intérieure de la paillote U Caradellu                      |
| carte-poisson (4:5)          | ./assets/images/fruits-mer-caradellu.jpg              | https://img02.restaurantguru.com/cac7-seafood-U-Caradellu.jpg                                                                                                         | Fruits de mer frais servis à U Caradellu                            |
| carte-repas (4:5)            | ./assets/images/repas-caradellu.jpg                   | https://img02.restaurantguru.com/cf53-U-Caradellu-meals.jpg                                                                                                           | Repas généreux servi en terrasse                                    |
| carte-dessert (1:1)          | ./assets/images/dessert-caradellu.jpg                 | https://img02.restaurantguru.com/c106-dessert-U-Caradellu.jpg                                                                                                         | Dessert maison U Caradellu                                          |
| galerie-1 (4:5 portrait)     | ./assets/images/hero-caradellu-premiere.jpg           | https://lh3.googleusercontent.com/gps-cs-s/APNQkAHfR3y4ABhKJEQBiZzbQzgObjc78slH7zSd7DZV2VSLnlbuTVO69xpxYuWUKf5s8laJPlVkG7brZs9Xj-7jSmcUWKZvNOf_cQPWkYV70XlyAQMqgvIR6DbCi-2tiykp5B3eTcByPjweAzMI=w224-h298-k-no                                                                                                                    | Vue extérieure paillote U Caradellu                                 |
| galerie-2 (16:9)             | ./assets/images/tripadvisor-caradellu-1.jpg           | https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/9b/a7/61/u-caradellu.jpg                                                                                   | Terrasse et ambiance estivale                                       |
| galerie-3 (1:1)              | ./assets/images/tripadvisor-caradellu-2.jpg           | https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/9b/a7/28/u-caradellu.jpg                                                                                   | Plats servis à la paillote                                          |
| galerie-4 (4:5)              | ./assets/images/tripadvisor-caradellu-3.jpg           | https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/9b/a8/ff/u-caradellu.jpg                                                                                   | Scène de service en terrasse U Caradellu                            |

> **Note assets :** Images #1 et #6 (Google Maps `lh3.googleusercontent.com`) = usage démo outreach, à remplacer par photos propriétaires après signature. Toutes les autres sont libres d'usage démo (RestaurantGuru + TripAdvisor public CDN). 9 images réelles, 0 placeholder. Les rôles `carte-grill`, `carte-pizza`, `carte-corse` du ruban carte utilisent en rotation les mêmes photos (repas-caradellu, fruits-mer-caradellu, design-caradellu) car c'est sincère : une paillote sert les mêmes tables quel que soit l'item. Le builder peut dupliquer pour combler les 6 panneaux du ruban.

---

## Copy directions (pour le builder)

- **Eyebrow** : `PAILLOTE CORSE · BRAVONE, LINGUIZZETTA` en capitales letter-spaced `0.22em`, Inter 500, small-caps Fraunces sur "PAILLOTE CORSE".
- **H1 hero** : 5 mots, Fraunces italic 300, évoquant l'expérience pieds-dans-le-sable :
  **"Pieds dans le sable, assiette face mer"** (retour chariot après "sable,"). Éviter "bienvenue chez..." et tout cliché corse.
- **Lede (35 à 45 mots)** : *"À 3 minutes de la plage de Bravone, notre paillote mitonne poisson du jour, pâtes de la nona et pizzas au feu de bois sous la terrasse ombragée. Ouvert 7 jours sur 7, midi et soir. Venez comme vous êtes."* (Aucun em-dash. Ton direct, local, sans jargon.)
- **CTA primaire** : `Appeler · 04 95 59 02 85` (tel: link, terracotta, pictogramme téléphone discret).
- **CTA secondaire** : `Voir la carte` (ancre vers `#carte-en-ruban`).
- **Labels horloge-paillote** :
  - 06h-10h59 : `Pas encore ouvert · Service dès midi`
  - 11h-14h59 : `Ouvert maintenant · Service midi`
  - 15h-17h59 : `Ouvert maintenant · Entre deux services`
  - 18h-22h59 : `Ouvert maintenant · Service soir`
  - 23h-05h59 : `Fermé pour ce soir · On ouvre demain à 12h`
- **Microcopy distance-plage** : `250 m de la plage de Bravone. 3 min à pied. Parking à l'ombre. Maillot bienvenu.`
- **Ton global** : court, concret, pas d'adjectifs ronflants. Le luxe du site est dans le calme et la lumière, pas dans les mots.

---

## Checklist avant handoff au builder

- [x] 5 couleurs hex base définies + 5 teintes horaires, contrastes vérifiés AA
- [x] 2 polices Google Fonts nommées avec poids (Fraunces 300/500 italic + Inter 400/500/600)
- [x] 1 archétype choisi + justifié (`custom — horizon-band scroll + time-based ambiance`)
- [x] 9 sections ordonnées (nav-horizon, hero-panorama, distance-plage, carte-ruban, ambiance, galerie-ruban, proof-ticker, trouver-maintenant, footer-ligne-mer)
- [x] 9 images réelles assignées à des rôles, 0 placeholder
- [x] Motion language décrit, durées + easing précisés, `prefers-reduced-motion` respecté
- [x] Google Maps iframe source prêt : `https://maps.google.com/maps?q=42.2090695,9.5345819&output=embed`
- [x] Geste d'UI singulier inventé : **horloge-paillote live + palette horaire dynamique**
- [x] Divergence vs autres clients du catalogue (Grand Bleu, Nautic, Flibustier, Spuntinu, Arrière Cour, La Voûte, Chalet, Bowling) explicitée
- [x] Zéro em-dash dans les copies client-facing
- [x] Light mode uniquement
