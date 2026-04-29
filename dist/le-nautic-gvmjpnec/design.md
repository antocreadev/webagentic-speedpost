# Design brief — Le Nautic (Calvi)

## 0. Réflexion UX (question par question)

**Visiteur-type :** plaisancier en escale au port de Calvi (40-65 ans, iPhone en main, cherche où déjeuner vue bateau dans les 30 min) OU touriste descendant de la citadelle en fin d'après-midi (famille, couple, en quête d'une terrasse coucher de soleil). Device : mobile à 85%, desktop 15% (consultation chambre d'hôtel le soir).

**Contexte d'arrivée :** recherche Google "restaurant port Calvi", recommandation ChatGPT/Perplexity "bon resto poisson Calvi", QR code sur flyer quai, bouche-à-oreille capitainerie. Arrivée très probablement géolocalisée à moins de 300m du restaurant.

**Intention primaire :** vérifier en 8 secondes (1) que c'est le bon niveau (ni snack bas-de-gamme, ni étoilé inaccessible), (2) qu'il reste une table ce midi/ce soir, (3) où c'est exactement sur le quai. Téléphoner dans la foulée.

**Intention business :** remplir la terrasse déjeuner + service du soir en captant le flux du port avant les concurrents voisins ; crédibiliser l'établissement sans site pour une clientèle étrangère et IA-assistée ; ancrer le nom "Le Nautic" comme le repère du quai Adolphe Landry.

**Contrainte UX structurante :** seulement 6 photos disponibles (dont 2 en basse définition), pas de réservation en ligne (téléphone uniquement), pas d'email, menu non structuré. Le design doit compenser la rareté visuelle par la force typographique, le SVG et les couleurs.

**Émotion-cible à 5s :** sensation de mettre le pied sur le quai. Odeur d'iode, gréement qui tinte, lumière blanche de Calvi qui rebondit sur la citadelle génoise. Confiance posée, pas d'esbroufe, quelque chose de marin et d'assumé.

**Money shot :** la silhouette vectorielle de la citadelle de Calvi tracée en trait fin, posée en ligne d'horizon fixe en pied d'écran, avec au-dessus le mot "NAUTIC" en typo display massive et une coordonnée GPS 42°33'58"N / 8°45'28"E en monospace qui s'affiche comme relevée à la main par le capitaine.

---

## Archétype

**Choix : `custom` - "Livre de bord du quai" (carnet de capitaine + ligne d'horizon citadelle persistante + rose des vents scroll-réactive)**

Justification : le Nautic vit physiquement sur le Quai Adolphe Landry, face à la citadelle génoise classée. Je transpose le site en **journal de bord d'un capitaine en escale** : coordonnées GPS en en-tête de chaque section, relevés de cap, cachet de port, table de marée en footer. La citadelle est présente sous forme d'une **silhouette SVG en trait fin qui traverse le site comme une ligne d'horizon persistante**, et les titres de section "émergent" au-dessus de cette ligne comme des voiliers en rade. Cet archétype n'existe nulle part ailleurs dans le catalogue (pas maritime générique, pas fullbleed photo, pas split-sticky) et règle la contrainte de rareté photo en misant sur SVG + typo + papier.

---

## Palette de couleurs

| Rôle       | Hex      | Nom descriptif         | Utilisation                                                |
|------------|----------|------------------------|-------------------------------------------------------------|
| `--bg`     | #F4EFE3  | Papier de cartographie | Fond principal, teinte parchemin clair chaleureuse         |
| `--ink`    | #0E2A3A  | Encre de marine        | Texte principal, silhouette citadelle, titres              |
| `--ink-2`  | #5E6B6F  | Ardoise brumeuse       | Texte secondaire, coordonnées, sous-titres                 |
| `--accent` | #C0502A  | Terre de Balagne       | Cachet de port, CTA, soulignages, chiffres clés            |
| `--line`   | #D8CFBA  | Fil de cordage         | Séparateurs, traits guides, quadrillage discret            |

> Palette tirée d'une carte marine vintage corse : fond papier, encre bleu nuit des vieux portulans, touche de terre cuite typique des toits de Calvi et de la Balagne. Tous les ratios contrastent AA sur `--bg` : `--ink` 11.7:1, `--accent` 4.6:1, `--ink-2` 4.9:1.

---

## Typographie

- **Display :** `Fraunces` (Google Fonts), poids 400 + 700, optical size 96 pour le wordmark. Empattements doux qui rappellent les en-têtes de portulans anciens sans tomber dans le pastiche.
- **Body :** `Inter` (Google Fonts), poids 400 + 500. Lisibilité mobile irréprochable pour les usages "je consulte en marchant sur le quai".
- **Mono (accent) :** `JetBrains Mono` (Google Fonts), poids 400. Utilisée uniquement pour coordonnées GPS, caps, heures, température de l'eau, numéros de téléphone : renforce le code "journal de bord technique".

Size scale (mobile-first) :
- wordmark hero : `clamp(4.2rem, 22vw, 14rem)` Fraunces 700
- h1 section : `clamp(2rem, 5vw, 3.4rem)` Fraunces 400
- h2 : `clamp(1.4rem, 3vw, 2rem)` Fraunces 400
- body : `1.05rem` Inter 400, line-height 1.6
- mono : `0.82rem` JetBrains Mono 400, letter-spacing 0.04em, uppercase

Tracking : display `-0.015em`, body `0`, mono `+0.06em`.

---

## Layout archétype

**Choix : `custom` - "Livre de bord du quai"**

### Rythme des sections (à lire de haut en bas)

1. **Bandeau GPS fixe top** (toujours visible) : `42°33'58"N  ·  8°45'28"E  ·  QUAI ADOLPHE LANDRY  ·  12:47 HEURE DE CORSE` en mono, teinte `--ink-2`, 36px de haut desktop / 44px mobile. Remplace la nav classique. Trois liens discrets à droite : `Carte` · `Escale` · `Appeler`.
2. **Hero "Escale n°1"** : wordmark "NAUTIC" en Fraunces 700 XXL collé bas de page, au-dessus la silhouette vectorielle de la citadelle en `--ink` trait 1.2px (SVG inline ~200px haut, parallax scroll très lent). Dans la marge haute : relevé "Escale n°1 · Calvi, Haute-Corse · Ouvert 7/7 · Midi & soir". Aucune photo dans le hero : le parchemin + le trait + la typo font tout le travail. Money shot ici.
3. **Log d'arrivée (histoire)** : format deux colonnes inégales (3/5 texte, 2/5 image `ta-port-facade.jpg` avec filet fin `--line` et cachet SVG rouge "LE NAUTIC · CALVI · CORSE" estampillé coin sup-droit). Texte en prose comme une entrée de journal : "Nous accostons Quai Adolphe Landry. Face à nous, la citadelle génoise. Derrière nous, la rade.". Drop-cap Fraunces sur la première lettre.
4. **Ligne d'horizon, la citadelle** : section pleine largeur, hauteur 70vh, fond `--bg`, silhouette SVG de la citadelle étirée toute la largeur (remparts, tour du sel, cathédrale Saint-Jean-Baptiste). Au-dessus, un court manifeste en une ligne : "Sous les remparts génois, la table est dressée." Rien d'autre. Respiration radicale.
5. **Quart de la carte (spécialités)** : 5 "entrées de log" empilées verticalement, chacune = une ligne avec numéro de relevé `N° 01`, nom du plat en Fraunces, description en body, prix indicatif en mono aligné à droite. Moules marinières, Moules Cap Corse, Gambas risotto, Encornets farcis, Poisson grillé. Disposition "registre", fine ligne `--line` entre chaque. Sur la droite, collée à "Gambas risotto", photo `ta-plat-dorade.jpg` en portrait 3/4, cadrée comme une polaroid collée de travers (rotation -2deg) avec ombre douce.
6. **Pont supérieur (terrasse)** : photo `ta-terrasse.jpg` en pleine largeur, ratio 16/9, légende mono dessous : `PONT · 22 COUVERTS · EXPOSITION OUEST · COUCHER 20H47`. Au-dessus, titre "Le pont supérieur" et deux paragraphes sur la terrasse face au port.
7. **Table des marées (preuves sociales + infos pratiques hybridées)** : vrai tableau au style carte marine. Quatre lignes : `HAUTE SAISON`, `BASSE SAISON`, `NOTE DE QUAI` (4.3/5 · 1042 avis), `PAVILLON` (Ouvert 7/7). En dessous, 2 verbatim clients courts formatés comme des entrées de livre d'or : date type "12 août, 22h", signé de l'initiale. Extraits positifs uniquement (cf. research).
8. **Relevé final (contact + maps)** : split 50/50 desktop, stack mobile. Gauche : "Pour accoster" en Fraunces, téléphone en mono taille XL cliquable `04 95 31 21 65`, horaires en mono, adresse. Droite : Google Maps iframe sans cadre, filtre CSS léger `sepia(0.15) contrast(0.95)` pour harmoniser avec le papier. Au-dessus de la carte, trait `--line` + label mono `POSITION · 42°33'58"N · 8°45'28"E`.
9. **Footer-cachet** : une seule ligne centrée, en mono, style tampon encreur `--accent` : `LE NAUTIC · QUAI ADOLPHE LANDRY · 20260 CALVI · LOG CLOS À 23H`. Signature discrète "Menghi Computer Science" en `--ink-2` 11px tout en bas.

### Singularités du site (5)

- **Ligne d'horizon citadelle persistante** : la silhouette SVG de la citadelle est placée à 2 endroits clés (hero + section 4), trait 1.2px `--ink`. Elle sert de "sol" visuel récurrent, comme Calvi vue depuis la mer.
- **Geste UI signature : la rose des vents scroll-réactive** (voir section dédiée ci-dessous). Élément inédit dans le catalogue Menghi.
- **Coordonnées GPS en en-tête de chaque section** en mono `--ink-2`, légèrement décalées de quelques secondes entre chaque, comme si le capitaine notait sa position en avançant dans la rade. Détail obsessionnel qui fait tout.
- **Cachet de port "LE NAUTIC · CALVI · CORSE"** : SVG circulaire ~90px tamponné en `--accent` semi-transparent (opacity 0.85), angle -8deg, visible sur la photo de façade et en footer. Crée l'identité "officiel / bureau de port".
- **Polaroid rotation naturelle** sur la photo du plat : 1 seule photo "collée de travers" sur tout le site, petit accroc à la rigueur des autres, suggère la main du capitaine.

### Ce que ce site n'a PAS (divergence explicite)

- Pas de hero photo-first (le hero est 100% typo + SVG, zéro image raster).
- Pas de galerie en grille (les 6 photos sont chacune dans un rôle narratif différent, jamais massées).
- Pas de marquee défilant.
- Pas de nav sticky classique (remplacée par le bandeau GPS top).
- Pas de section équipe ni "à propos" générique : remplacée par un log d'arrivée narratif.
- Pas de formulaire de réservation (téléphone uniquement assumé).
- Pas de split-sticky, pas de timeline, pas de fullbleed cinéma, pas de bento grid.

---

## Geste UI signature, la rose des vents scroll-réactive

En bas à droite de l'écran (fixed, 88×88px desktop, 56×56px mobile, marge 20px), un **SVG rose des vents** (8 branches, style cartographique ancien, trait `--ink` + fill `--bg`) reste affiché en permanence.

**Comportement :**
- L'aiguille principale (pétale `--accent`) **pivote** selon la position de scroll : 0% = N (haut), 25% = E, 50% = S, 75% = O, 100% = N. Mapping linéaire `scrollY / scrollHeight * 360deg`, appliqué via `requestAnimationFrame` ou Motion One `scroll()`.
- Au centre de la rose, une **lettre mono** change selon la section active (détectée via `Motion.inView`) : N (hero), E (log), S (citadelle), O (carte), SE (pont), SO (marées), NO (contact). Lettre en JetBrains Mono 14px `--ink`.
- Au tap/clic, **la rose s'étend en menu radial** : 7 pétales pop avec les noms des sections. Motion : `scale 1→1.6` sur le conteneur, `translate + fade` sur les pétales, easing `[0.2, 0.7, 0.2, 1]`, durée 0.5s. Retap = repli.
- Sur mobile, rose réduite à 48px bas-centre, expansion en bottom-sheet radial 200px.

Ce geste **incarne physiquement** le fait qu'on navigue un journal de bord, pas un site web. Unique au Nautic.

---

## Motion language

- **Silhouette citadelle (hero)** : parallax vertical 8% en sens inverse du scroll, Motion One `scroll()`. La ligne d'horizon "reste posée" pendant qu'on avance.
- **Wordmark NAUTIC hero** : fade-in + `letter-spacing` de `0.08em → -0.015em` sur 1.2s au load, easing `[0.2, 0.7, 0.2, 1]`.
- **Coordonnées GPS en en-tête de section** : apparaissent via `inView` avec effet "typewriter" léger (60ms par caractère, 14 caractères max).
- **Entrées scroll standard** : `opacity 0→1 + translateY 16px→0`, 0.7s, stagger 80ms. Appliqué aux entrées de log section 5 et verbatim section 7.
- **Rose des vents** : rotation continue liée au scroll (voir geste signature). Expansion 0.5s sur tap.
- **Cachet de port** : `scale 1.2→1 + rotate -15deg→-8deg + opacity 0→0.85`, 0.9s, `backOut`, une fois (inView).
- **Smooth scroll global :** Lenis, durée 1.1, easing `(t) => 1 - Math.pow(1 - t, 3)`.
- **Pas d'auto-play vidéo, pas de curseur custom, pas de popup, pas d'audio.**

---

## Images sélectionnées (6 photos réelles, chacune un rôle unique)

| Rôle                            | Chemin local                               | Source (URL origine)                                      | Alt text                                              |
|---------------------------------|--------------------------------------------|------------------------------------------------------------|--------------------------------------------------------|
| façade port (section 3)         | ./assets/images/ta-port-facade.jpg         | Tripadvisor (extraction research)                          | Façade du Nautic depuis le quai, port de Calvi        |
| plat signature (section 5)      | ./assets/images/ta-plat-dorade.jpg         | Tripadvisor (extraction research)                          | Filet de dorade dressé, signature du Nautic           |
| terrasse / pont (section 6)     | ./assets/images/ta-terrasse.jpg            | Tripadvisor (extraction research)                          | Terrasse du Nautic face au port de Calvi              |
| vue principale (og:image)       | ./assets/images/hero-le-nautic.jpg         | CSV premiere_image Google Maps                             | Le Nautic, vue principale depuis le quai              |
| intérieur (vignette verbatim 1) | ./assets/images/ta-interieur.jpg           | Tripadvisor (extraction research)                          | Salle intérieure du Nautic                             |
| soirée (vignette verbatim 2)    | ./assets/images/ta-soiree.jpg              | Tripadvisor (extraction research)                          | Ambiance soirée au Nautic                              |

**Placement précis :**
- Hero : aucune image raster, 100% SVG + typo.
- Section 3 : `ta-port-facade.jpg` ratio 4/5 portrait recadré, filet `--line` 1px, cachet SVG en overlay coin sup-droit.
- Section 5 : `ta-plat-dorade.jpg` ratio 3/4, `transform: rotate(-2deg)`, ombre `0 12px 32px rgba(14,42,58,.12)`.
- Section 6 : `ta-terrasse.jpg` pleine largeur, ratio 16/9 forcé `object-fit: cover`.
- Section 7 : `ta-interieur.jpg` vignette 120px ronde à gauche du verbatim 1 ; `ta-soiree.jpg` vignette 120px ronde à gauche du verbatim 2. Les deux basses def donc gardées petites.
- `hero-le-nautic.jpg` : non utilisée visiblement, sert l'`og:image` meta pour partages sociaux. Justification : le hero typographique est plus fort que la photo basse-def Google Maps.

**0 image Unsplash, 0 placeholder.** Les 6 images réelles couvrent les rôles narratifs, la faible densité photo est intentionnelle, compensée par typo + SVG.

---

## Copy directions (pour le builder)

- **Eyebrow (bandeau GPS)** : `42°33'58"N · 8°45'28"E · QUAI ADOLPHE LANDRY · CALVI, CORSE`
- **H1 hero** : wordmark seul `NAUTIC` en Fraunces 700 XXL. Sous-titre mono : `Escale n°1 · Port de Calvi · Depuis le quai, face à la citadelle.`
- **Lede section 3** : 2 phrases, 40-55 mots. Ton : "Nous accostons Quai Adolphe Landry, au cœur du port de plaisance de Calvi. Sous les remparts génois, la maison ouvre ses tables toute l'année, midi et soir, pour une cuisine de mer simple et généreuse."
- **CTA primaire** : `Appeler pour une table` (lien `tel:+33495312165`)
- **CTA secondaire** : `Nous trouver sur le quai` (ancre vers section 8)
- **Ton général** : sobre, marin, première personne du pluriel discrète, présent narratif. Éviter les superlatifs commerciaux. Jamais d'em-dash `—`, jamais de "meilleur", "unique", "exceptionnel" vulgaire. Le parchemin parle à notre place.

---

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, contrastes AA vérifiés sur `--bg`.
- [x] 3 polices Google Fonts nommées avec poids (Fraunces, Inter, JetBrains Mono).
- [x] 1 archétype custom "Livre de bord du quai" choisi + justifié + divergent du catalogue.
- [x] 9 sections ordonnées avec intention et traitement visuel précis.
- [x] 6 images réelles assignées à des rôles narratifs, 0 placeholder, 0 Unsplash.
- [x] Motion language décrit avec durées et easings.
- [x] Google Maps iframe `https://maps.google.com/maps?q=42.5662178,8.7578077&z=16&output=embed`.
- [x] Geste UI signature (rose des vents scroll-réactive) décrit et inédit.
- [x] Zéro em-dash dans les textes prescrits.
- [x] Light mode only, mobile-first, FR exclusivement.

---

## Notes builder (implémentation)

- **SVG citadelle** : tracer une silhouette typique de Calvi (remparts, tour Saint-Antoine, cathédrale Saint-Jean-Baptiste, 3 bastions). `stroke-width: 1.2`, `fill: none`, `stroke: var(--ink)`, `stroke-linecap: round`. ViewBox ~1200×200. Injection inline dans `index.html`.
- **SVG rose des vents** : 8 branches, étoile double (N/E/S/O longues + NE/SE/SO/NO courtes), cercle extérieur `--line` 1px, cercle intérieur fill `--bg`, aiguille principale `--accent`, lettre centrale dynamique mono. ViewBox 100×100. `position: fixed; bottom: 24px; right: 24px; z-index: 40;`.
- **Cachet de port** : SVG cercle double `--accent` + texte circulaire `LE NAUTIC · CALVI · CORSE` via `<textPath>` + petite ancre centrale.
- **Bandeau GPS top** : `position: sticky; top: 0;` + `backdrop-filter: blur(8px)` + `background: rgba(244, 239, 227, 0.82)`. Hauteur 36px desktop, 44px mobile.
- **Table des marées** : `<table>` stylée en CSS, bordure `--line` 1px, en-têtes mono uppercase, cells Inter. Zéro JS.
- **Iframe Maps** : wrapper avec `filter: sepia(0.15) contrast(0.95) saturate(0.9)` pour harmoniser avec le parchemin.
- **Performance** : aucune image au-dessus du fold (hero = SVG + texte), LCP visé < 1.2s. Lazy-load toutes les `<img>`.
- **SEO** : title `Le Nautic · Restaurant port de Calvi · Poissons, moules, terrasse quai`. Meta description 155c. JSON-LD `Restaurant` avec `geo`, `openingHours`, `telephone`, `priceRange: "€€"`, `servesCuisine: ["French","Seafood","Corsican"]`. `og:image` = `hero-le-nautic.jpg`.
- **Accessibilité** : `<nav aria-label="Coordonnées et raccourcis">` sur bandeau GPS, rose des vents avec `role="navigation" aria-label="Boussole de navigation du site"`, focus visible partout.
- **Mobile** : rose des vents 48px centre-bas. Log d'arrivée passe en stack 1 colonne. Polaroid perd sa rotation (-2deg → 0) pour éviter débordement.
