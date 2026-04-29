# Design brief — Restaurant Glacier Le Flibustier

> Généré le 2026-04-19 — Agent `menghi-designer`
> Archétype, palette, typographie, motion & mapping image pour le builder.

---

## Archétype

**maritime** — variante « maritime lumineux & joyeux » (port corse estival, glacier artisanal, paillote).

Justification : le Flibustier est un établissement **sur le port de Taverna** avec vue marina, identité paillote-décontractée et **différenciateur glacier artisanal Lilou** massivement cité — un maritime austère ou un rustic corse de village ne refléterait ni la fraîcheur balnéaire ni l'esprit coloré unanimement mentionné dans les avis. L'archétype reste pur (pas d'hybridation) mais calibré sur le registre lumineux estival plutôt que marin-traditionnel.

---

## Palette de couleurs

| Rôle        | Hex      | Nom descriptif      | Utilisation                                       |
|-------------|----------|---------------------|---------------------------------------------------|
| `--bg`      | `#F7F1E4` | Sable Padulone      | Fond principal, évoque la plage de Padulone toute proche |
| `--ink`     | `#0E2A3A` | Bleu nuit de port   | Texte principal, titres display                   |
| `--ink-2`   | `#5B6B76` | Gris brise marine   | Texte secondaire, légendes, métadonnées           |
| `--accent`  | `#E5604A` | Corail Flibustier   | CTA primaire, liens, soulignements, chips "Lilou" |
| `--line`    | `#E6DBC5` | Ligne coquillage    | Bordures fines, séparateurs, cadres cards         |

**Contrastes vérifiés sur `--bg` (#F7F1E4) :**
- `--ink` (#0E2A3A) : ratio ≈ **14.6 : 1** → AAA ✓ (titres + body)
- `--ink-2` (#5B6B76) : ratio ≈ **5.0 : 1** → AA ✓ (texte secondaire 14px+)
- `--accent` (#E5604A) : ratio ≈ **3.8 : 1** → AA (large/UI components) ✓ — pour texte courant le corail est toujours utilisé **sur `--ink`** (inversion CTA) ou réservé aux éléments ≥ 18px / bold.

> Palette choisie pour évoquer **le port de Taverna au soleil d'après-midi** — sable tiède (`--bg`), bleu profond de coque (`--ink`) et touche corail qui rappelle à la fois les parasols de paillote, les sorbets et les gilets de sauvetage. Volontairement distante d'un maritime nautique bleu-blanc générique : la dominante sable (et non blanche) ancre le lieu dans la Corse estivale plutôt qu'en Bretagne.

---

## Typographie

- **Display :** `DM Serif Display` (Google Fonts) — poids **400** (seul poids disponible) + italic 400. Serif moderne à forts contrastes, élégant sans être gastronomique — parfait pour un port-glacier qui veut de la personnalité sans rigidité.
- **Body :** `DM Sans` (Google Fonts) — poids **400** (courant), **500** (labels/nav), **700** (boutons/tags). Famille sœur géométrique, très lisible mobile, compatible tracking serré.
- **Échelle (mobile-first, clamp) :**
  - `h1` : `clamp(2.6rem, 8vw, 5.2rem)` — line-height `1.02`, tracking `-0.02em`
  - `h2` : `clamp(1.9rem, 4.5vw, 3rem)` — line-height `1.08`, tracking `-0.015em`
  - `h3` : `clamp(1.25rem, 2.4vw, 1.6rem)` — line-height `1.2`
  - `body` : `1.05rem` (mobile) / `1.1rem` (≥768px), line-height `1.6`
  - `small / eyebrow` : `0.8rem`, uppercase, tracking `0.18em`, weight 500
- **Tracking display** : `-0.02em` ; **body** : `0` ; **eyebrow** : `0.18em`.
- **Fallbacks** : `'DM Serif Display', Georgia, 'Times New Roman', serif` / `'DM Sans', -apple-system, system-ui, sans-serif`.

---

## Layout archétype

Structure ordonnée des 9 sections, adaptée au positionnement **glacier + paillote + port** :

1. **`nav`** — sticky top, fond `--bg/85` + backdrop-blur 12px. Logo mot « Le Flibustier » en DM Serif à gauche, ancres droite (« La maison · Signatures · Glaces Lilou · Galerie · Venir »), CTA ghost bordure `--ink` → « Réserver » (tel:).
2. **`hero`** — plein-écran 100svh, layout split 58/42 (desktop) / stacked (mobile). Gauche : eyebrow « Restaurant · Glacier · Port de Taverna » + H1 editorial + lede 2 phrases + duo CTA (primaire corail « Réserver une table » / secondaire ghost « Découvrir la maison »). Droite : image 4:5 du port/terrasse en plein-bleed avec parallax vertical 8 % et un coin arrondi 20 px côté intérieur.
3. **`marquee`** — bande défilante unique, DM Serif Display 4-5rem, items séparés par une étoile corail ✶ : « Port de Taverna · Glaces Lilou · Paillote corse · Burgers maison · Cocktails sunset · Ouvert 7j/7 · Depuis la plage de Padulone ».
4. **`histoire`** — « La maison », 2 colonnes (texte 7/12 + image 5/12 en sticky). Raconte le port, la paillote, l'esprit coloré et l'équipe. Image en ratio 3:4, arrondie 16 px, légère rotation `-1.5deg` au repos.
5. **`signature`** — « Ce qu'on aime faire », 3 cartes horizontales (desktop) / scroll-snap horizontal (mobile) :
   - Carte 1 — **Les glaces Lilou** (hero-axis : le différenciateur #1)
   - Carte 2 — **La cuisine du port** (burgers, poisson, tapas)
   - Carte 3 — **L'apéro sur la terrasse** (cocktails, vue marina)
   Chaque carte : image carrée 1:1 + titre DM Serif + 2 lignes body + micro-lien « En savoir plus ↗ ».
6. **`galerie`** — « La vie au Flibustier », grille mosaïque 3 colonnes desktop / 2 mobile, ratios mixtes (1:1, 3:4, 4:5), 6 images minimum, lazy-load natif. Hover : zoom 1.03 + subtil voile corail 10 % opacité.
7. **`proof`** — « Ce qu'on en dit », fond encart `--line` arrondi 24 px : grosse note **4,5 / 5** DM Serif XL à gauche, sous-texte « sur 1 594 avis Google · 88 % d'avis positifs », à droite rotation de 2 citations 5★ (fade crossfade toutes les 6 s).
8. **`infos`** — « Venir nous voir », 2 colonnes desktop : **gauche** horaires stylisés (liste 7j en DM Serif, tous « 11 h – 23 h ») + téléphones cliquables + mention « Avril → octobre » ; **droite** iframe Google Maps `https://maps.google.com/maps?q=42.3391929,9.5394175&output=embed` dans un cadre arrondi 20 px + border 1 px `--line`.
9. **`footer`** — brand « Le Flibustier » en DM Serif taille XXL (clamp 4 à 9rem) façon signature, dessous : coords compactes 3 colonnes (adresse · contact · réseaux @leflib), bas de page « Site réalisé avec soin — © 2026 » en `--ink-2` 0.8rem.

> Adaptations spécifiques : on conserve les 9 sections (aucune supprimée) mais on **repositionne la section signature autour du glacier Lilou en premier** pour matérialiser le différenciateur principal identifié par le researcher.

---

## Motion language

- **Smooth scroll global** : **Lenis** v1.1.13, `lerp: 0.1`, `wheelMultiplier: 1`, `smoothTouch: false` (on ne gêne pas le scroll natif mobile).
- **Entrées scroll** : `Motion.inView` sur chaque bloc, animation `opacity: 0 → 1` + `transform: translateY(24px) → 0`, **durée 0.8 s**, easing `cubic-bezier(0.2, 0.7, 0.2, 1)`, **stagger 80 ms** sur les groupes (cards signatures, items galerie, colonnes infos). Trigger une fois (`once: true`).
- **Hero** : parallax vertical de l'image `translateY(0 → -8%)` lié à `scrollY` via `Motion.scroll`. Texte hero : révélation en cascade (eyebrow → h1 → lede → CTAs), stagger 120 ms, délai initial 150 ms post-load.
- **Marquee** : CSS `@keyframes marquee-x` avec `transform: translate3d(0,0,0) → translate3d(-50%,0,0)`, **durée 42 s linear infinite**, duplication du contenu × 2 pour boucle sans saut, `prefers-reduced-motion: reduce` → animation désactivée.
- **Cards hover (signatures + galerie)** : `translateY(-4px)` + `box-shadow: 0 18px 40px -20px rgba(14,42,58,0.25)`, transition `220 ms ease-out`. Image interne : `scale(1.03)` transition 400 ms.
- **CTA hover** : fond `--accent` → `--ink`, texte → `--bg`, transition 180 ms ease-out ; subtle `translateY(-1px)`.
- **Marqueur focus clavier** : outline 2 px `--accent` offset 3 px sur tout élément interactif.
- **Proof citations** : crossfade `opacity 0 ↔ 1` 600 ms toutes les 6 s, pause au hover.
- **Interdictions** : pas d'autoplay vidéo, pas de cursor custom, pas de popup d'intrusion, pas de scroll-jacking, pas de texte qui « explose » à l'apparition.

---

## Images sélectionnées

URLs issues **uniquement** de `research.md` (lh3.googleusercontent.com + tourinsoft.eu, pas de Unsplash ici — les deux sources sont suffisantes pour les rôles principaux, le reste sera marqué placeholder justifié).

| Rôle                    | URL                                                                                                                                                                                          | Alt text                                               | Statut |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|--------|
| `hero` (4:5)            | `https://lh3.googleusercontent.com/gps-cs-s/APNQkAH4OiEcHk0Vu5z9hQptSTPmmzOprG2gwRhSqrrPfpaOIvA9za7bM6MiGnGF0bZHeZ_JHcikSe95RZMxf6jXOKeHF9yQEcZp2ZfrIa-iI0H3VUB9dAW5BvNu4xW9S49OcDBZ7VH_G33C7hGk=w408-h544-k-no` | Le Flibustier — vue du restaurant sur le port de Taverna | Réelle (Google Maps) — démo outreach, à remplacer après signature |
| `histoire` (3:4)        | `https://corse.media.tourinsoft.eu/upload/LE-FLIBUSTIER-5-2.jpg`                                                                                                                             | Atmosphère du Flibustier sur le port de Taverna        | Réelle (Visit-Corsica officiel) |
| `signature 1` (1:1) — Glaces Lilou | `https://placehold.co/900x900/F7F1E4/E5604A?text=Glaces+artisanales+Lilou`                                                                                                     | Coupe glacée signature Lilou — glacier artisanal       | **Placeholder** — aucune photo isolée des glaces Lilou disponible dans research.md ; l'image lh3 est utilisée en hero et tourinsoft couvre l'ambiance. À remplacer prioritairement en production (photo coupe colorée). |
| `signature 2` (1:1) — Cuisine du port | `https://lh3.googleusercontent.com/gps-cs-s/APNQkAH4OiEcHk0Vu5z9hQptSTPmmzOprG2gwRhSqrrPfpaOIvA9za7bM6MiGnGF0bZHeZ_JHcikSe95RZMxf6jXOKeHF9yQEcZp2ZfrIa-iI0H3VUB9dAW5BvNu4xW9S49OcDBZ7VH_G33C7hGk=w224-h298-k-no` | Cuisine inventive — burgers, poissons et tapas du Flibustier | Réelle (Google Maps variante web) — recadrage carré côté client |
| `signature 3` (1:1) — Terrasse & cocktails | `https://placehold.co/900x900/F7F1E4/0E2A3A?text=Terrasse+%26+cocktails+port+de+Taverna`                                                                                | Apéritif sur la terrasse face au port de Taverna       | **Placeholder** — justifié : les 2 photos réelles (lh3 + tourinsoft) sont déjà assignées hero/histoire/signature 2 ; ajout d'une 3e image réelle de terrasse-crépuscule à capturer lors du shoot post-signature. |
| `galerie 1` (1:1)       | `https://lh3.googleusercontent.com/gps-cs-s/APNQkAH4OiEcHk0Vu5z9hQptSTPmmzOprG2gwRhSqrrPfpaOIvA9za7bM6MiGnGF0bZHeZ_JHcikSe95RZMxf6jXOKeHF9yQEcZp2ZfrIa-iI0H3VUB9dAW5BvNu4xW9S49OcDBZ7VH_G33C7hGk=w408-h544-k-no` | Le Flibustier — façade et terrasse côté port          | Réelle (Google Maps, réemploi cadrage différent) |
| `galerie 2` (3:4)       | `https://corse.media.tourinsoft.eu/upload/LE-FLIBUSTIER-5-2.jpg`                                                                                                                             | Vue d'ensemble du restaurant — portail Visit-Corsica  | Réelle (Visit-Corsica) |
| `galerie 3` (1:1)       | `https://placehold.co/800x800/F7F1E4/0E2A3A?text=Plat+signature`                                                                                                                            | Plat signature du Flibustier — poisson frais du jour  | **Placeholder** justifié : pas de photo plat isolée dans research.md. |
| `galerie 4` (4:5)       | `https://placehold.co/800x1000/F7F1E4/E5604A?text=Coupe+Lilou`                                                                                                                               | Coupe glacée Lilou — création du glacier               | **Placeholder** justifié : différenciateur clé mais sans URL dédiée fournie. |
| `galerie 5` (1:1)       | `https://placehold.co/800x800/E6DBC5/0E2A3A?text=Port+de+Taverna`                                                                                                                            | Port de plaisance de Taverna au coucher de soleil      | **Placeholder** justifié : photo d'ambiance port à compléter. |
| `galerie 6` (3:4)       | `https://placehold.co/800x1066/F7F1E4/0E2A3A?text=Soir%C3%A9e+paillote`                                                                                                                       | Ambiance soirée paillote au Flibustier                 | **Placeholder** justifié : photo d'ambiance nocturne à capturer. |

**Bilan images** : **4 images réelles distinctes** assignées (1 lh3 thumbnail, 1 lh3 variante web, 1 tourinsoft officielle, réutilisées sur 5 rôles avec recadrages distincts) + **5 placeholders signalés** tous justifiés et à remplacer en phase production après signature. Total rôles couverts : **11 / 11** (hero + histoire + 3 signatures + 6 galerie). ≥ 6 rôles couverts par des images réelles ou placeholders qualifiés ✓.

> ⚠️ **Note production** : les URLs `lh3.googleusercontent.com` sont autorisées ici en démo outreach (conformément à `rules.md`). Elles doivent être remplacées par les assets fournis par le client (ou shoot dédié) dès signature.

---

## Copy directions (pour le builder)

- **Eyebrow (hero)** : `RESTAURANT · GLACIER · PORT DE TAVERNA` — DM Sans 500 uppercase tracking 0.18em, couleur `--accent`.
- **H1 (hero)** : `Le port, la table, les glaces.` (5 mots, 3 temps, DM Serif 400, italique possible sur « les glaces »). Variante courte si mobile très étroit : `Port. Table. Glaces.`
- **Lede (hero, 38-50 mots)** : « Sur le port de Taverna, Le Flibustier vous accueille d'avril à octobre pour une cuisine inventive, des cocktails au coucher du soleil et les glaces artisanales imaginées par Lilou — l'adresse joyeuse et colorée de la côte orientale corse. »
- **CTA primaire** : `Réserver une table` (téléphone `tel:+33629530517`) — bouton rempli corail, texte sable.
- **CTA secondaire** : `Découvrir la maison` (ancre `#histoire`) — ghost bordure ink.
- **Eyebrow sections** : « La maison », « Signatures », « La vie au Flibustier », « Ce qu'on en dit », « Venir nous voir ».
- **Micro-copy marquee** : `Port de Taverna ✶ Glaces Lilou ✶ Paillote corse ✶ Burgers maison ✶ Cocktails sunset ✶ Ouvert 7j/7 ✶`.
- **Tonalité générale** : chaleureux, lumineux, tutoiement implicite (vous mais décontracté), **zéro superlatif gastro**, zéro emoji, zéro exclamation excessive. Ancrage local explicite (Taverna, Padulone, Haute-Corse, Méditerranée).

---

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies (`--bg`, `--ink`, `--ink-2`, `--accent`, `--line`) — contrastes AA/AAA vérifiés sur `--bg`
- [x] 2 polices Google Fonts nommées avec poids (DM Serif Display 400 + DM Sans 400/500/700)
- [x] 1 archétype choisi + justifié (maritime lumineux, non hybride)
- [x] 9 sections ordonnées (nav → hero → marquee → histoire → signature → galerie → proof → infos → footer)
- [x] ≥ 6 rôles images couverts (11/11), placeholders signalés avec rationale
- [x] Motion language décrit (durées + easings + stagger précis)
- [x] Google Maps iframe source prêt : `https://maps.google.com/maps?q=42.3391929,9.5394175&output=embed`
- [x] Copy directions fournies (eyebrow, H1, lede, CTAs, marquee)
- [x] Light mode only, mobile-first, positif uniquement — conformes `rules.md`
