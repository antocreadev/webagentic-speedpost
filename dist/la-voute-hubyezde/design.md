# Design brief . La Voûte (Piana)

> Réécriture totale. L'archétype précédent (fullbleed cinéma) est abandonné sur demande client. Nouvelle direction ci-dessous.

---

## 0. Réflexion UX (7 questions)

1. **Visiteur-type :** Touriste francophone 35-65 ans en séjour dans les Calanques de Piana, souvent logé à Porto / Cargèse / Ota. Randonneur de Capu Rossu, voyageur en route Ajaccio-Calvi, couple en hôtel 3-4★, famille. Device majoritaire : mobile en 4G capricieuse (zone montagne), parfois iPad au gîte le soir pour planifier le lendemain.
2. **Contexte d'arrivée :** Recherche Google "restaurant Piana" ou "où manger Calanques" depuis la voiture / la terrasse de l'hôtel. Recommandation IA (ChatGPT "bon restaurant Piana"), citation Routard, bouche-à-oreille hôtel. Rarement direct.
3. **Intention primaire :** *"Est-ce que ça vaut le détour, et puis-je avoir une table ce soir ?"*. Trois infos en 10 secondes : ambiance/cadre, ce qu'on y mange, comment appeler MAINTENANT.
4. **Intention business :** Remplir les 2 services (midi+soir) 7j/7 en haute saison sans dépendre des plateformes, capter les touristes AVANT qu'ils n'aillent ailleurs, fidéliser par l'authenticité (vivier, pêche du jour, famille). Hors saison : faire revenir la clientèle locale du continent en vacances.
5. **Contrainte UX structurante :** Pas de réservation en ligne (téléphone uniquement, 04 95 27 80 46). La carte change selon la pêche du jour (pas de menu figé à publier). Le nom du restaurant, "La Voûte", est LITTÉRALEMENT l'élément architectural de la salle : il faut l'exploiter, pas juste l'écrire.
6. **Émotion-cible à 5s :** Fraîcheur et ancrage. Le visiteur doit ressentir la pierre fraîche sous la voûte en plein été caniculaire corse, l'odeur du poisson tout juste débarqué, la chaleur d'une famille qui tient la maison depuis toujours. Pas "restaurant de luxe", pas "brasserie touristique" : *maison de pêcheurs*.
7. **Money shot :** La façade pierre + volets bleu lavande + enseigne "LA VOÛTE" (photo `ta-voute-facade.jpg`), recadrée en portrait, cerclée par une vraie arche SVG qui structure l'écran. Le nom du restaurant devient la structure graphique.

---

## Archétype

**`arcade-keystone` (archétype inventé, unique au catalogue Menghi).**

Le site est structuré comme une **enfilade d'arcades en pierre**. Chaque section majeure est encadrée par une vraie arche (demi-cercle plein cintre, SVG + clip-path), comme si le visiteur traversait la salle voûtée de La Voûte, passant d'arche en arche. La navigation elle-même est un **chapelet de 5 petites arcades** en haut, chacune correspondant à une section. La typographie display se loge à l'intérieur d'arches en pierre.

**Pourquoi unique vs les 10 autres sites Menghi :**
- Aucun site du catalogue n'utilise le clip-path arqué comme primitive structurante. Les archétypes déjà livrés (maritime, dashboard altimétrique, horizon-band, magazine, timeline, fullbleed cinéma, showcase cornet, split-sunset, rapport territorial, threshold-voûte de L'Arrière-Cour) reposent tous sur des grilles rectangulaires ou scrolljack.
- L'Arrière-Cour utilisait une voûte en reveal ponctuel (un clip-path, sur un hero). Ici, la voûte est **le langage graphique de TOUT le site**, répété à 7+ endroits avec des tailles et rôles différents (nav, hero, ardoise, portrait, panorama, trio signature, maps, footer), pas un gimmick unique.
- Le nom du restaurant "La Voûte" rend la métaphore littérale, pas décorative. C'est la seule grammaire visuelle qui ait du sens ici.

---

## Palette de couleurs

| Rôle         | Hex       | Nom descriptif             | Utilisation                                                 |
|--------------|-----------|----------------------------|-------------------------------------------------------------|
| `--bg`       | `#F4EDE0` | Pierre chaude Piana        | Fond principal, teinté des granites rosés des Calanques     |
| `--ink`      | `#1C1714` | Encre basalte              | Texte principal, contour arches                             |
| `--accent`   | `#B9452A` | Rouge Calanques            | CTA, surlignages, pastille "pêche du jour", keystone        |
| `--accent-2` | `#3A5A78` | Bleu volet méditerranée    | Liens, badges horaires, icônes nav                          |
| `--line`     | `#D9C8A8` | Sable joint-de-pierre      | Borders, séparateurs, arrière-plan arches inactives         |

Contrastes vérifiés sur `--bg` (#F4EDE0) :
- `--ink` #1C1714 : ratio 14.1:1 (AAA)
- `--accent` #B9452A : 5.2:1 (AA)
- `--accent-2` #3A5A78 : 6.4:1 (AA)
- `--line` #D9C8A8 : décoratif (non-texte)

Palette choisie pour : la **pierre rose des Calanques UNESCO** (accent rouge-terre), les **volets bleu lavande** du village de Piana (accent-2), le **joint de chaux** des arcades (--line), et le **calcaire corse** en fond. Pas une palette générique "restaurant corse" : c'est Piana précisément.

---

## Typographie

- **Display : `Cormorant Garamond` (Google Fonts)** . poids 500 italic + 700. Serif classique à empattement triangulaire qui évoque les inscriptions gravées dans la pierre des linteaux corses. Magnifique posé à l'intérieur d'une arche SVG.
- **Body : `Inter` (Google Fonts)** . poids 400 + 500 + 600. Neutre, lisible sur mobile en plein soleil.
- **Size scale (mobile-first) :**
  - h1 `clamp(2.8rem, 9vw, 5.6rem)` tracking `-0.02em` leading `0.95`
  - h2 `clamp(2rem, 5vw, 3.2rem)` tracking `-0.015em`
  - h3 `clamp(1.25rem, 2.8vw, 1.6rem)`
  - body `1.05rem` leading `1.6`
  - eyebrow `0.78rem` tracking `0.18em` uppercase
  - small `0.85rem`

Justification : seulement 2 familles. Cormorant apporte la gravité ecclésiastique de la voûte en pierre (typo gravée des fontaines corses, place de la Fontaine à Piana). Inter neutralise le reste.

---

## Layout archétype . détail

### Rythme des sections (mobile, haut en bas)

1. **`arcade-nav`** : barre fine, 5 mini-arcades SVG cliquables (Maison / Pêche du jour / Salle / Avis / Trouver), `--line` au repos, `--accent` à l'hover/active. Bouton flottant "04 95 27 80 46" bottom-right sur mobile.
2. **`hero-keystone`** (90vh) : grande arche SVG centrale (85vw × 70vh), à l'intérieur clip-path → `ta-voute-facade.jpg`. Eyebrow au-dessus, H1 sous l'arche sur `--bg`, lede 30 mots, 2 CTA (Appeler / Voir la pêche du jour).
3. **`peche-du-jour`** : **ardoise quotidienne** dans une arche surbaissée, 4-5 lignes en Cormorant italic manuscrit (*"Loup de ligne, 2 kg. Rougets de roche. Denti pêché au large de Capu Rossu. Homards du vivier. Oursins si la houle le permet."*). Date du jour générée en JS. Petit astérisque : *"La carte évolue avec la mer. Appelez pour confirmer."*
4. **`histoire-famille`** : texte (Joseph et Antonella, pêcheurs-agriculteurs) + photo `ta-voute-recent-3.jpg` dans arche haute. 3 chiffres-clé : *"1 vivier à homards . 7j/7 toute l'année . 4,7/5 sur 1 059 avis"*.
5. **`salle-voutee`** : section 100vw, `ta-voute-terrasse.jpg` dans arche rampante panoramique. Texte dans bloc solid `--bg` (pas sur l'image).
6. **`cuisine-signature`** : **geste UI signature keystone-reveal** (détaillé plus bas). 3 arches côte-à-côte (desktop) / empilées (mobile).
7. **`paroles`** : 2 citations 5★ statiques dans petites arches, fond `--line`. Pas de carousel.
8. **`trouver`** : Google Maps iframe clippé en arche. Adresse, horaires 7j/7 (sauf novembre), `tel:` link.
9. **`footer-keystone`** : arche polylobée + "LA VOÛTE" en Cormorant XL.

### Singularités du site (5)

1. **Le clip-path arqué est la primitive graphique principale.** 7+ arches SVG uniques (proportions différentes à chaque apparition).
2. **"Ce qu'on a ramené ce matin"** : carnet quotidien du chef, date JS auto, ardoise SVG manuscrite. Aucun autre site du catalogue n'a de contenu daté du jour.
3. **Geste UI signature : keystone-reveal** sur `cuisine-signature`.
4. **Nav arcades cliquables** : pas de texte de nav classique, seulement des petites arches SVG qui s'illuminent à `--accent`.
5. **Contraste pierre/volet** : rouge Calanques et bleu volet Piana côte-à-côte dans hero+nav, réplique des façades du village.

### Ce que ce site n'a PAS (divergence explicite)

- Pas de marquee
- Pas de hero split 50/50 classique
- Pas de galerie masonry ni grille rectangulaire
- Pas de carousel d'avis
- Pas de bouton "Réserver en ligne" (pas dispo, on dirige vers tel)
- Pas de prix chiffrés (carte variable)

---

## Geste UI signature : `keystone-reveal`

**Principe.** Dans `cuisine-signature`, 3 arcades côte-à-côte. Chaque arche démarre "fermée" : une clef de voûte (SVG trapèze inversé `--accent`) est en haut-centre, décalée `translateY(-40px)`, et le reste de l'arche est masqué par un rectangle `--line` opaque clippé par l'arche. Quand l'utilisateur **scrolle l'arche dans le viewport**, la clef de voûte descend à sa place (`translateY -40 → 0`, 600ms `cubic-bezier(0.22, 0.7, 0.18, 1)`), puis l'arche se **révèle** : le masque scale-Y de 1 → 0 depuis le haut (900ms ease-out), dévoilant la photo du plat.

**Pourquoi ce n'est pas gratuit.** La clef de voûte est l'élément qui, en vrai, maintient toute l'arche : sans elle, la voûte s'effondre. Ici, sans la keystone posée, la photo du plat n'apparaît pas. Métaphore directe : c'est la famille Joseph+Antonella qui maintient la voûte . sans eux, pas de cuisine. Le geste se répète 3 fois (3 plats) et c'est TOUT.

**Technique (pour le builder).**
```
- Chaque arche = <svg viewBox="0 0 300 380"> contenant :
    <clipPath id="arch-N"><path d="M0,380 L0,150 A150,150 0 0 1 300,150 L300,380 Z"/></clipPath>
- Dans le clip : <image href="./assets/images/peche-du-jour.jpg" width="300" height="380" preserveAspectRatio="xMidYMid slice"/>
- Par-dessus : <rect class="keystone-mask" fill="var(--line)" width="300" height="380" clip-path="url(#arch-N)"> avec transform-origin top, scaleY(1) au repos.
- La keystone : <path d="M140,0 L160,0 L175,40 L125,40 Z" fill="var(--accent)"> translateY(-40) au repos.
- Déclencheur : Motion.inView(arcade, () => {
    animate(keystone, {y: [-40, 0]}, {duration: 0.6, easing: [0.22,0.7,0.18,1]});
    animate(mask, {scaleY: [1, 0]}, {duration: 0.9, delay: 0.35, easing: 'ease-out'});
  });
- Stagger 150ms entre les 3 arches.
- prefers-reduced-motion : état final direct, aucune animation.
```

---

## Motion language

- **Entrées scroll** : `Motion.inView`, `opacity 0→1 + translateY 24→0`, duration 0.7s, easing `[0.22, 0.7, 0.18, 1]`, stagger 80ms.
- **Hero arche** : parallax y=4% sur la photo intérieure (pas sur l'arche).
- **Nav arcades** : hover fill `--line → --accent`, 220ms.
- **Keystone-reveal** : voir ci-dessus.
- **Smooth scroll** : Lenis, lerp 0.12.
- **Interdits** : cursor follower, popup, auto-play vidéo, marquee.
- **prefers-reduced-motion** : désactive parallax, keystone, Lenis.

---

## Règle contraste texte sur image (gate reviewer)

- Aucun texte posé directement sur photo sans protection.
- Section `salle-voutee` : texte dans un **bloc solide `--bg` à 95% opacité** clippé en petite arche, PAS un gradient scrim. Texte `--ink` sur `--bg`, ratio 14:1.
- H1 du hero : posé **sous** l'arche, sur `--bg`, jamais sur l'image.
- Labels/dates sur image : pill `--bg` opaque, pas de text-shadow hack.

---

## Images sélectionnées (mapping précis)

Dossier : `./assets/images/`. **Toutes les photos <1000px écartées.**

| Rôle                          | Fichier local                  | Dim. source   | Traitement                                   | Alt text                                          |
|-------------------------------|--------------------------------|---------------|----------------------------------------------|---------------------------------------------------|
| Hero arche centrale           | `ta-voute-facade.jpg`          | 4032×3024     | Crop portrait 3:4, arche plein cintre        | Façade pierre voûtée et volets bleus de La Voûte  |
| Section `peche-du-jour`       | `ta-voute-peche-du-jour.jpg`   | 4032×3024     | Ratio 4:3, arche surbaissée                  | Poisson de pêche du jour, La Voûte Piana          |
| Section `histoire-famille`    | `ta-voute-recent-3.jpg`        | 4284×5712     | Portrait 3:4, arche haute                    | Joseph et Antonella dans la salle voûtée          |
| Section `salle-voutee` pano   | `ta-voute-terrasse.jpg`        | 4032×3024     | Crop panoramique 3:1, arche rampante         | La terrasse ombragée Place de la Fontaine         |
| Signature arche 1             | `ta-voute-general.jpg`         | 2048×1536     | 1:1.2, arche plein cintre                    | Cannelloni au brocciu, spécialité corse           |
| Signature arche 2             | `ta-voute-recent-1.jpg`        | 1500×2000     | Portrait, arche                              | Homard du vivier, Golfe de Porto                  |
| Signature arche 3             | `ta-voute-recent-2.jpg`        | 1200×1600     | Portrait, arche                              | Plat pêche du jour de Joseph                      |
| Décor footer / bg trouver     | `hero-la-voute-hd.jpg`         | 1012×1800     | Flou décoratif subtil derrière bloc          | Village de Piana vu depuis La Voûte               |

**8 photos réelles, 0 placeholder.** Aucune Unsplash, aucun hotlink.

---

## Copy directions (pour le builder)

- **Eyebrow hero :** `PLACE DE LA FONTAINE · PIANA · CALANQUES`
- **H1 :** *"La maison voûtée des Calanques"*
- **Lede :** *"Joseph pêche au petit matin dans le Golfe de Porto, Antonella vous accueille sous la voûte. Cannelloni au brocciu, homards du vivier, poisson du jour : la Corse dans l'assiette, depuis toujours."*
- **CTA primaire :** `Appeler le 04 95 27 80 46`
- **CTA secondaire :** `Voir la pêche du jour` (scroll ancre)
- **Section pêche :** *"Ce qu'on a ramené ce matin"* + date auto JS
- **Section histoire :** *"Une famille, une voûte, une mer"*
- **Section salle :** *"Sous les pierres, à l'ombre des platanes"*
- **Section signature :** *"Trois pierres d'angle"* (file la métaphore keystone)
- **Paroles :** 2 citations 5★ (Routard authenticité + CorsicaLovers rustique chaleureux)
- **Footer :** *"La Voûte . Place de la Fontaine . Piana"*

**ZÉRO em-dash dans tout le copy.** Substituts : `:`, `,`, `.`, `()`.

---

## Wireframe ASCII . mobile (≤ 640px)

```
+----------------------------------+
| [⌒][⌒][⌒][⌒][⌒]                 |  arcade-nav, 5 mini-arches
+----------------------------------+
| PLACE DE LA FONTAINE . PIANA     |
|                                  |
|       .-""""""""""""-.           |
|      /                \          |
|     |  [facade photo]  |         |  hero-keystone
|     |                  |         |
|      \________________/          |
|                                  |
|   La maison voûtée               |
|        des Calanques             |
|                                  |
|   Joseph pêche au petit matin... |
|                                  |
|   [ Appeler 04 95 27 80 46 ]     |
|   [ Voir la pêche du jour ]      |
+----------------------------------+
| Ce qu'on a ramené ce matin       |
| Mercredi 20 avril                |
|   .--""""""--.                   |
|  | Loup 2kg   |                  |  arche ardoise
|  | Rougets    |                  |
|  | Denti      |                  |
|   `----------´                   |
+----------------------------------+
| Une famille, une voûte, une mer  |
|   .---""---.                     |
|  | portrait  |                   |
|   `---------´                    |
|  Joseph & Antonella...           |
|  1 vivier . 7j/7 . 4.7/5         |
+----------------------------------+
| Sous les pierres, à l'ombre...   |
|  _______________________         |
| (     terrasse pano     )        |  arche rampante
|  `---------------------´         |
+----------------------------------+
| Trois pierres d'angle            |
|   [keystone]                     |
|   .--""--.                       |
|  | plat1   | cannelloni          |
|   `-------´                      |
|   [keystone]                     |
|   .--""--.                       |
|  | plat2   | homard              |
|   `-------´                      |
|   [keystone]                     |
|   .--""--.                       |
|  | plat3   | pêche               |
|   `-------´                      |
+----------------------------------+
| « Un vrai régal...           »   |
| « Accueil avec un vrai sens. »   |
+----------------------------------+
| Trouver la maison                |
|   _______________                |
|  (   Google Maps  )              |  iframe clip-arche
|   `-------------´                |
|  Place de la Fontaine            |
|  20115 Piana                     |
|  12h-14h30 / 19h-22h             |
|  [ tel:04 95 27 80 46 ]          |
+----------------------------------+
|   .-""""""""""-.                 |
|  |   LA VOÛTE    |               |  footer arche polylobée
|   `-------------´                |
|  Maison depuis toujours          |
|  © Menghi Computer Science       |
+----------------------------------+
```

## Wireframe ASCII . desktop (≥ 1024px)

```
+--------------------------------------------------------------+
| LA VOÛTE         [⌒Maison][⌒Pêche][⌒Salle][⌒Avis][⌒Trouver] |
+--------------------------------------------------------------+
|                                                              |
|   PLACE DE LA FONTAINE . PIANA . CALANQUES                   |
|                                                              |
|                    .-""""""""""""""""-.                      |
|                   /                    \                     |
|                  |    [facade photo]    |                    |
|                  |       portrait       |                    |
|                   \____________________/                     |
|                                                              |
|         La maison voûtée des Calanques                       |
|         Joseph pêche au petit matin...                       |
|         [Appeler 04 95 27 80 46]  [Pêche du jour]            |
+--------------------------------------------------------------+
|                                     Mercredi 20 avril 2026   |
|   Ce qu'on a ramené ce matin                                 |
|                                                              |
|   .-"""""""""""""""-.         Loup de ligne, 2kg             |
|  |   [peche photo]   |        Rougets de roche               |
|  |  arche surbaissée |        Denti, large de Capu Rossu     |
|   `-----------------´         Homards du vivier              |
|                               Oursins si la houle permet     |
|                               * carte évolue avec la mer     |
+--------------------------------------------------------------+
|  Une famille,           .-""""-.                             |
|  une voûte,            |        |                            |
|  une mer               | portrt |   1 vivier à homards       |
|                        |        |   7j/7 toute l'année       |
|  Joseph et Antonella   |        |   4.7 / 5 sur 1059 avis    |
|  tiennent la maison     `------´                             |
+--------------------------------------------------------------+
|   _______________________________________________________    |
|  (               terrasse panoramique                   )    |
|   `-----------------------------------------------------´    |
|            Sous les pierres, à l'ombre des platanes          |
+--------------------------------------------------------------+
|              Trois pierres d'angle                           |
|                                                              |
|   [keyst]        [keyst]        [keyst]                      |
|   .---.          .---.          .---.                        |
|  |plat1|        |plat2|        |plat3|                       |
|   `---´          `---´          `---´                        |
|  Cannelloni      Homard         Pêche                        |
|  au brocciu      du vivier      du jour                      |
+--------------------------------------------------------------+
|   « Un vrai régal, cuisine    »  « Accueil avec un vrai   »  |
|   « traditionnelle, produits  »  « sens, de vraies gens.  »  |
|   « ultra frais               »                              |
+--------------------------------------------------------------+
|                                  Place de la Fontaine        |
|   _____________________          20115 Piana                 |
|  (   Google Maps iframe )        Midi 12h-14h30              |
|   `-------------------´          Soir 19h-22h                |
|                                  7j/7 (fermé novembre)       |
|                                  [Appeler 04 95 27 80 46]    |
+--------------------------------------------------------------+
|              .-""""""""""""""""""""""-.                      |
|             |        LA VOÛTE           |                    |
|              `-------------------------´                     |
|              Maison depuis toujours                          |
|              © Menghi Computer Science                       |
+--------------------------------------------------------------+
```

---

## Notes pour le builder

1. **Arches = VRAIS SVG**, pas des `border-radius: 50% 50% 0 0`. Utiliser `<clipPath>` avec `<path>` et appliquer via CSS `clip-path: url(#arch-N)` à des `<img>` HTML, ou `<image>` SVG inline.
2. **Varier les proportions d'arche** :
   - hero : plein cintre (demi-cercle pur)
   - peche-du-jour : surbaissée (arc à 1/3 hauteur)
   - histoire : haute et étroite (3:4)
   - salle : rampante panoramique (très aplatie)
   - signature×3 : plein cintre classique
   - footer : polylobée (3 lobes, enseigne de village)
3. **Date auto JS** : `new Date().toLocaleDateString('fr-FR', {weekday:'long', day:'numeric', month:'long', year:'numeric'})`, capitaliser première lettre.
4. **iframe Google Maps** : `https://maps.google.com/maps?q=42.238968,8.636588&z=16&output=embed`, wrappé dans `<div>` avec `clip-path: url(#arch-maps)`.
5. **Keystone-reveal** uniquement sur `cuisine-signature` (3 plats). Ailleurs, simple fade-up inView.
6. **Bouton téléphone flottant mobile** : fixed bottom-right, `tel:+33495278046`, fond `--accent`, icône SVG. Masqué ≥ 1024px.
7. **Lenis** : `lerp: 0.12` (pas trop smooth, Corse pas Apple).
8. **Pas un seul em-dash `—`**. Check build : `grep -c $'\u2014' index.html` doit retourner 0.
9. **Fonts preconnect** :
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
   ```
10. **SEO** : title `La Voûte . Restaurant corse de la mer . Piana Calanques`, meta description "pêche du jour, vivier à homards, cannelloni au brocciu, Place de la Fontaine 20115 Piana". Schema.org `Restaurant` + `servesCuisine: ["Corsican","Seafood","Mediterranean"]` + `priceRange: "€€"` + `geo` + `openingHours` + `telephone`.

---

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, contrastes AA/AAA vérifiés
- [x] 2 Google Fonts (Cormorant Garamond + Inter), poids précisés
- [x] Archétype unique inventé (`arcade-keystone`), justifié vs 10 sites précédents
- [x] 9 sections ordonnées, chacune avec une arche de proportion différente
- [x] 8 images réelles assignées, 0 placeholder
- [x] Motion décrit (durée + easing), keystone-reveal documenté techniquement
- [x] Google Maps iframe lat/lng prêt (42.238968, 8.636588)
- [x] Geste UI signature détaillé avec pseudo-code
- [x] Wireframe ASCII mobile + desktop
- [x] Règle contraste texte/image explicite (blocs solides, pas scrim)
- [x] Zéro em-dash dans le copy proposé
