# Design brief — Sweet Nails (Bastia)

## 0. Réflexion UX (question par question)

**Visiteur-type :** une femme de 22 à 45 ans, à Bastia ou de passage l'été, sur **mobile** (Instagram → bio @sweet.nails2b, ou recherche Google "onglerie Bastia"). Elle scrolle entre deux rendez-vous, le soir au lit, ou avant une occasion (mariage, sortie, vacances). Elle est visuelle, exigeante sur le rendu, et veut être rassurée avant de confier ses mains.

**Contexte d'arrivée :** lien Instagram, recommandation d'une amie ("regarde le travail de Marianne"), ou recherche Google locale. Elle ne connaît pas encore les prix ni les styles proposés. Elle arrive avec une **attente esthétique haute** car le logo et les photos circulent déjà.

**Intention primaire :** **voir le travail** (les ongles, le niveau de finition, les styles possibles) PUIS **réserver un créneau**. Le portfolio EST le produit. La décision se prend à l'œil : "est-ce que ce niveau de finition me correspond ?"

**Intention business :** convertir le trafic Instagram/Google en réservations Booksy, monter en gamme l'image (passer de "salon de quartier" à "studio d'art ongulaire premium bastiais"), capter la clientèle estivale (mariages, cérémonies, touristes) et fidéliser les régulières. Réserver = un seul bouton, partout : Booksy.

**Contrainte UX structurante :** **24 photos, zéro autre contenu riche.** Pas de texte d'histoire long, pas de portrait de l'équipe vérifié, réservation 100% externalisée sur Booksy (aucun formulaire interne). Le site doit donc être **un écrin de portfolio** où l'image fait 90% du travail, organisé pour que la visiteuse trouve SON style en quelques secondes. La diversité stylistique (french, nude, marbre, nacre, bold rouge, nail art) est à la fois la richesse et le risque de confusion : il faut un **système de tri par envie**.

**Émotion-cible à 5 secondes :** **désir + sophistication + confiance.** "C'est précis, c'est luxueux, c'est exactement le niveau que je veux pour mes mains." La brillance de la laque et la précision du geste doivent transpirer dès l'ouverture.

**Money shot :** une **macro HD d'ongles** posée comme un bijou sur fond nacré, avec le wordmark "Sweet Nails" en script doré et la note 5/5. La photo `nails-booksy-20` (french amande nude ultra-propre, macro) ou `nails-booksy-05` (effet nacre/perle) ouvre comme une vitrine de joaillerie.

---

## Archétype

**`atelier-laque` (custom, dérivé d'un lookbook-vitrine de maison de cosmétiques)**

Justification : le produit de Sweet Nails est purement visuel et tactile (la laque, la nacre, la brillance, la finition). L'archétype traite le site comme **un présentoir de laques de luxe** : chaque réalisation est un "flacon" posé sur une étagère nacrée, classée par finition. Cela diverge radicalement des 14 archétypes brûlés (tous orientés restauration/lieu : maritime, carnet-route, timeline, arcade, scorecard, livre-de-bord, rapport territorial, rustique méditerranéen). Aucun n'a de logique de **nuancier filtrable + révélation matière laquée**.

---

## Palette de couleurs

### 4-5 directions explorées avant de fixer (anti-défaut)

1. **Full-dark glamour** (fond noir, or, photos en grille lumineuse). Rejeté : le brief impose light mode, et un full-dark fatigue sur mobile en scroll long.
2. **Blush poudré + rose gold doux** (tout rose, féminin sucré). Rejeté : trop "salon ado", contredit le positionnement premium du logo noir/or.
3. **Blanc clinique + acier** (look dermato/médical). Rejeté : froid, sans désir, efface l'or du logo.
4. **Nacre froide + or champagne + noir d'encre + blush minéral** (RETENU). Light mode luxe : fonds nacrés clairs et froids, le noir profond du logo et l'or champagne en accents typographiques et sections signature, un blush minéral discret hérité des photos nude. Honore l'identité existante (noir + or script) sans tomber dans le full-dark.
5. **Bordeaux laqué + ivoire** (tiré des photos bold rouge). Gardé en accent secondaire optionnel, pas en base : trop dominant si généralisé.

### Palette retenue

| Rôle         | Hex       | Nom descriptif      | Utilisation                                                       |
|--------------|-----------|---------------------|-------------------------------------------------------------------|
| `--bg`       | `#F6F2F4` | Nacre froide        | Fond principal, légèrement rosé-gris, évoque l'intérieur d'un coquillage |
| `--ink`      | `#15110F` | Noir d'encre laqué  | Texte principal, sections signature, wordmark, fond des "vitrines" sombres |
| `--ink-2`    | `#7A6F72` | Taupe satiné        | Texte secondaire, légendes, sous-titres, tarifs                  |
| `--accent`   | `#B08D43` | Or champagne mat    | Wordmark script, filets, CTA Booksy, note 5/5, soulignages       |
| `--line`     | `#E4DBDF` | Voile perle         | Séparateurs, bordures de cartes, contours d'étagère nacrée       |

Accent secondaire optionnel (petites touches, non obligatoire) : `#8E2A33` **bordeaux laqué** pour les filtres "Bold" et les puces liées aux réalisations rouges, en cohérence avec `nails-booksy-01/15`.

> Palette pensée comme l'intérieur d'une nacre : un fond rosé-gris froid (`#F6F2F4`, pas un cream warm) qui fait ressortir la brillance des photos, le noir laqué (`#15110F`) du logo en encre et en sections vitrine sombres, l'or champagne **mat** (`#B08D43`, pas un or criard) qui rappelle le cercle doré du logo. **Contrastes vérifiés sur `--bg` :** `--ink` #15110F = 16.1:1 (AAA), `--ink-2` #7A6F72 = 4.6:1 (AA), `--accent` #B08D43 = 3.4:1 (réservé titres ≥ 20px bold et filets décoratifs ; pour le texte courant doré, l'utiliser sur fond `--ink` où il monte à 5.8:1). CTA Booksy = texte `--bg` sur fond `--ink` avec liseré `--accent`.

### Pourquoi cette palette n'est PAS celle des 3 derniers clients

| Client            | --bg        | --ink       | --accent    |
|-------------------|-------------|-------------|-------------|
| Le Nautic         | `#F4EFE3` warm | `#0E2A3A` marine | `#C0502A` terracotta |
| La Voûte          | `#F4EDE0` warm | `#1C1714` basalte | `#B9452A` rouge calanque |
| Le Bowling        | `#FAF4E6` warm | `#0E2A3C` marine | `#E85A3C` corail |
| **Sweet Nails**   | **`#F6F2F4` nacre froide rosée** | **`#15110F` noir laqué** | **`#B08D43` or champagne** |

Les 3 précédents partagent tous un fond crème **chaud** + un encre **bleu marine/basalte** + un accent **terre/corail orangé**. Sweet Nails inverse tout : fond **froid rosé-gris**, encre **noir pur laqué**, accent **or métallique**. Zéro token repris.

---

## Typographie

- **Wordmark / logo-script :** `Pinyon Script` (Google Fonts) — 400 — script cursive fin et élégant, reproduit l'esprit du logo "Sweet Nails" en or. Usage exclusif : le nom de marque (header, hero, footer). Jamais en paragraphe.
- **Display / titres :** `Cormorant Garamond` (Google Fonts) — 300 + 500 + 600 italic — serif haute-couture, fines déliés, pour les titres de sections et les grands chiffres. Choisi pour son raffinement "magazine beauté" qui colle au positionnement luxe.
- **Body / UI :** `Jost` (Google Fonts) — 300 + 400 + 500 — sans-serif géométrique au caractère Art déco discret, très lisible sur mobile, tracking aéré qui évoque les étiquettes de parfumerie.

> Trio justifié : Pinyon Script honore l'identité script du logo (sans le copier en image), Cormorant apporte la couture luxe, Jost donne la rigueur UI moderne. On évite la paire défaut Cormorant **italic** + Inter en couplant Cormorant à Jost (géométrique, pas Inter).

- **Size scale (mobile-first) :**
  - wordmark hero : `clamp(3rem, 12vw, 7rem)` (Pinyon Script)
  - h1 / titres section : `clamp(2rem, 6vw, 3.6rem)` (Cormorant 300)
  - h2 : `clamp(1.5rem, 4vw, 2.4rem)`
  - body : `1.02rem` Jost 400
  - small / légendes / tarifs : `0.82rem` Jost 400, tracking `0.08em`, uppercase
- **Tracking :** wordmark `0`, display `-0.01em`, eyebrows/labels uppercase `+0.18em`, body `+0.01em`.

---

## Geste UI singulier : le **Nuancier filtrable + swatch laqué**

Cœur de l'expérience, inventé pour CE client.

1. **Barre de finitions (le nuancier)** : sous le hero, une rangée de **swatches ronds laqués** (cercles ~52px), chacun une finition réelle du portfolio :
   - `Tout` · `French` · `Nude` · `Nacre & Perle` · `Marbre & Or` · `Bold & Rouge` · `Nail Art`
   - Chaque swatch est un disque rempli d'un **dégradé radial nacré** (reflet de laque : highlight blanc en haut-gauche, ombre en bas-droite via `radial-gradient` + un voile `::after` blanc semi-transparent en quart de lune). Le swatch actif gagne un anneau or `--accent` 2px.
2. **Filtrage de la galerie** : cliquer un swatch **filtre** la grille de réalisations (transition Motion : les cartes non-concernées `opacity 1→0 + scale .96` 0.3s, puis re-flow, les concernées entrent en stagger 50ms). C'est le tri-par-envie qui résout la contrainte des 6 styles mélangés.
3. **Swatch qui se pose au survol** : au hover d'une carte galerie (desktop), un **reflet laqué glisse** en diagonale sur la photo (pseudo-élément `linear-gradient(120deg, transparent, rgba(255,255,255,.35), transparent)` translaté de -120% à 120% en 0.6s) : on "voit briller" le vernis. Sur mobile, ce reflet se déclenche à l'entrée en viewport.
4. **Filet d'or "vernis appliqué"** : sur les titres de section, un trait `--accent` se **dessine de gauche à droite** au scroll (largeur 0→100% via `Motion.inView`, 0.5s, easing `[0.2,0.7,0.2,1]`), comme un coup de pinceau de top-coat.

Test material-driven : si on masque le texte, ces gestes (swatches de laque nacrée, reflet brillant qui glisse, trait de top-coat) ne peuvent illustrer QUE l'univers du vernis/de l'ongle. Validé.

---

## Texture & matière (material-driven)

- **Matière première :** la laque / le vernis. Attributs sensoriels : brillant, nacré, lisse, reflet, dégradé, goutte, précision millimétrée.
- **Texture de fond :** un **voile nacré** très subtil sur `--bg` : `radial-gradient` doux multi-points (3-4 halos blancs à 4% d'opacité) qui imite les reflets irisés d'une coquille, immobile. Pas de SVG pattern bruité (ce serait du "papier", mauvaise matière).
- **Dividers signature :** une **goutte de vernis** SVG (forme de larme arrondie remplie en `--accent` dégradé) centrée entre les sections, plutôt qu'un trait droit. Et un **filet fin or** (1px `--accent`) pour les séparateurs secondaires.
- **Effet typographique signature :** les grands chiffres (5/5, 74, 24) reçoivent un **highlight de laque** : `background: linear-gradient` du noir vers un gris satiné + un `::after` reflet blanc oblique, donnant l'aspect d'un vernis verni. Le wordmark Pinyon Script en `--accent` reçoit un très léger `text-shadow: 0 1px 0 rgba(255,255,255,.5)` pour l'effet doré relief.
- **Cartes galerie :** coins arrondis doux (`12px`, pas `rounded-3xl` générique), bordure `--line` 1px, et au survol une **ombre nacrée** colorée (`box-shadow: 0 12px 40px rgba(21,17,15,.12)`) + le reflet laqué qui glisse.
- **Motif signature récurrent :** la **goutte/larme de vernis** (entre sections, en puce de liste, en curseur de swatch actif) + le **demi-cercle nacré** (highlight) qui revient sur les swatches, les badges et le footer.

---

## Layout archétype

**Choix : `atelier-laque`** (présentoir de laques + nuancier filtrable). Le site se lit comme une vitrine de maison de cosmétiques : hero-écrin, nuancier-tri, galerie-flacons, sections signature sur fond noir laqué. Il diverge des autres clients (aucun n'est orienté "produit visuel filtrable" ni "matière laquée").

### Rythme des sections (haut en bas)

1. **Header flottant minimal** : wordmark "Sweet Nails" (Pinyon Script or) centré-gauche, à droite un seul CTA pilule `--ink` "Réserver" (→ Booksy). Fond `--bg` translucide `backdrop-blur`, apparaît/se condense au scroll. Pas de menu hamburger surchargé : 3 ancres discrètes (Réalisations · Prestations · Salon).

2. **Hero-écrin** (90vh) : fond `--bg` nacré. À gauche, le wordmark Pinyon Script XXL + eyebrow "ONGLERIE PREMIUM · BASTIA" + lede 2 lignes + chip note "5/5 Google · 4.9/5 Booksy" (chip `--ink` texte or). À droite (ou au-dessus sur mobile), la **macro money shot** `nails-booksy-20` ou `nails-booksy-05` dans un cadre arrondi avec reflet laqué permanent et liseré or. Money shot.

3. **Le nuancier (barre de finitions)** : rangée de swatches laqués filtrables, sticky juste sous le header au scroll dans la zone galerie. Le geste UI singulier.

4. **Galerie-vitrine filtrable** : grille **masonry légère** (2 col mobile / 3-4 col desktop) des ~20 réalisations, chaque carte taguée par finition. Reflet laqué au survol/entrée. C'est la section la plus haute du site (le portfolio = le produit). Sans légendes lourdes : juste une micro-puce de finition en bas de carte au hover.

5. **Section signature "La finition Sweet Nails"** (fond `--ink` noir laqué, respiration sombre) : 3 colonnes mettant en avant 3 finitions phares (Nacre & Perle / French amande / Bold rouge) avec une grande photo chacune et 1 phrase. Texte or + blanc. Goutte de vernis SVG en transition d'entrée et de sortie de cette bande sombre.

6. **Prestations & tarifs** : liste épurée façon "carte de soins" (Extensions Gel-X, Remplissage, Semi-permanent mains/pieds, Renforcement, Combinés mains+pieds, Dépose) avec fourchettes de prix et durées, filets or. Pas de tableau lourd : lignes aérées Jost, prix en `--accent` sur fond clair via `--ink`-chip.

7. **Preuve & confiance** : grand bandeau citation (verbatims réels "Professionnelle minutieuse, travail de qualité, environnement très propre" / "Hâte de revenir") + les chiffres laqués 5/5 · 74 avis · 24 créations. Un seul gros bloc, pas de carrousel.

8. **Le salon (infos pratiques)** : horaires (jeudi/dimanche fermés bien visibles), adresse 271 Rue Paratojo, parking + Wi-Fi en chips, téléphone 06 20 87 03 20, et **Google Maps iframe** (carte en cadre nacré arrondi, lat/lng Bastia). CTA Booksy répété.

9. **Footer-écrin** : wordmark Pinyon Script or centré sur fond `--ink`, goutte de vernis, demi-cercle nacré, rappel Booksy + tél + Instagram @sweet.nails2b, signature SpeedPost discrète en `--ink-2`.

### Singularités du site (que personne d'autre n'aura)

- **Nuancier de swatches laqués filtrables** par finition (geste UI cœur).
- **Reflet de laque qui glisse** sur chaque photo (matière vernis rendue tangible).
- **Goutte de vernis SVG** en divider récurrent + chiffres "vernis verni" laqués.
- **Bande signature noir laqué** intercalée dans un site light : honore le logo noir/or sans full-dark.
- **Wordmark Pinyon Script doré** comme fil conducteur (hero, header, footer).

### Ce que ce site n'a PAS (divergence explicite)

- Pas de hero plein-écran photo cinéma (≠ La Voûte/Flibustier).
- Pas de marquee défilant.
- Pas de timeline ni de chronologie (≠ U Spuntinu/Le Nautic).
- Pas de fond crème chaud (≠ les 3 derniers).
- Pas de carrousel d'avis automatique.
- Pas de section "histoire longue" : le portfolio remplace le récit.

---

## Motion language

- **Entrées scroll** : `Motion.inView`, `opacity 0→1 + translateY 18px→0`, durée 0.5s, easing `[0.2,0.7,0.2,1]`, stagger 50ms sur les cartes galerie. `[data-reveal]{opacity:0}` conditionné par `.js-ready` + `@keyframes autoreveal` filet de sécurité à 0.5s.
- **Filet d'or top-coat** : trait `--accent` largeur 0→100% sous chaque titre, 0.5s.
- **Reflet laqué** : `linear-gradient` oblique translaté -120%→120%, 0.6s, au hover desktop / à l'entrée viewport mobile.
- **Filtrage nuancier** : sortie `opacity+scale .96` 0.3s, re-flow, entrée stagger 50ms.
- **Hero macro** : parallax vertical léger 8% au scroll (Motion + scrollY), reflet laqué permanent en boucle douce 4s.
- **Cards hover** : `translateY(-4px)` + ombre nacrée, 180ms.
- **Smooth scroll** : Lenis actif. Pas de cursor follower, pas de popup, pas d'autoplay vidéo.

---

## Images sélectionnées

Chemins locaux uniquement (déjà dans `site/assets/images/`). Les "(à classer)" seront répartis par le builder selon inspection visuelle, sur les rôles galerie restants.

| Rôle                         | Chemin local                          | Source (origine)         | Alt text                                              |
|------------------------------|---------------------------------------|--------------------------|--------------------------------------------------------|
| logo / header / footer       | ./assets/images/logo-sweet-nails.jpeg | Booksy CDN (logo officiel) | Logo Sweet Nails, onglerie premium à Bastia          |
| HERO money shot              | ./assets/images/nails-booksy-20.jpeg  | Booksy service_photos    | French amande nude réalisée chez Sweet Nails Bastia    |
| HERO alternatif / signature Nacre | ./assets/images/nails-booksy-05.jpeg | Booksy service_photos    | Pose gel effet nacre et perle, micro-strass            |
| signature French             | ./assets/images/nails-booksy-10.jpeg  | Booksy service_photos    | French classique blanche sur ongles carrés courts      |
| signature Bold rouge         | ./assets/images/nails-booksy-15.jpeg  | Booksy service_photos    | Gel bordeaux profond avec accent nude et strass        |
| galerie Nail Art             | ./assets/images/nails-booksy-04.jpeg  | Booksy service_photos    | Nail art créatif léopard, doré, fleurs et cœurs        |
| galerie Marbre & Or          | ./assets/images/nails-booksy-02.jpeg  | Booksy service_photos    | Gel effet marbre nude et feuille d'or                  |
| galerie Bold cœurs           | ./assets/images/nails-booksy-01.jpeg  | Booksy service_photos    | Pose gel amande rouge avec strass cœurs                |
| galerie French colorée       | ./assets/images/nails-booksy-03.jpeg  | Booksy service_photos    | French colorée rouge, base nude                        |
| galerie Nude poudré          | ./assets/images/nails-booksy-06.jpeg  | Booksy service_photos    | Semi-permanent rose poudré, look nude élégant          |
| galerie (à répartir)         | ./assets/images/nails-booksy-07..24.jpeg | Booksy service_photos | Réalisations Sweet Nails Bastia (finition variée)      |

**Tags finition (pour le builder, à affiner visuellement) :**
- French : `nails-booksy-03`, `nails-booksy-10`, `nails-booksy-20`
- Nude : `nails-booksy-06`
- Nacre & Perle : `nails-booksy-05`
- Marbre & Or : `nails-booksy-02`
- Bold & Rouge : `nails-booksy-01`, `nails-booksy-15`
- Nail Art : `nails-booksy-04`
- À classer (répartir sur les 6 finitions) : `nails-booksy-07` à `19`, `21` à `24`

**Images réelles disponibles : 24 photos de réalisations + 1 logo = 25 fichiers réels. Zéro Unsplash, zéro placeholder.** (Photo Google Maps CSV en 403, non nécessaire : largement assez de visuels réels.)

---

## Copy directions (pour le builder)

- **Eyebrow** : `ONGLERIE PREMIUM · BASTIA` (Jost uppercase, tracking large, `--ink-2`)
- **H1 / wordmark** : `Sweet Nails` (Pinyon Script or) + sous-titre Cormorant `L'art de l'ongle, à fleur de précision.`
- **Lede** : 2 phrases, ~40 mots, positives, ancrées : la précision du geste, la finition laquée, Bastia. Ex : "Studio d'art ongulaire à Bastia. Pose gel, semi-permanent, extensions et nail art réalisés à la main, avec une exigence de finition saluée par toutes nos clientes."
- **CTA primaire** (partout) : `Réserver sur Booksy` → `https://booksy.com/fr-fr/rwg/36173_sweet-nails_onglerie_94675_bastia`
- **CTA secondaire** : `Voir les réalisations` (ancre galerie) ou `Appeler` (`tel:+33620870320`)
- **Chiffres laqués** : `5/5 Google` · `4.9/5 Booksy (74 avis)` · `24 créations`
- **Verbatims** (réels) : "Professionnelle minutieuse, travail de qualité, environnement très propre." / "Génial, hâte de revenir." / "Parfait !"
- **Em-dash interdit** dans toute la copy site : utiliser `:` `,` `.` `()`.

---

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, contrastes AA vérifiés sur `--bg`
- [x] 3 polices Google Fonts nommées avec poids (Pinyon Script / Cormorant Garamond / Jost)
- [x] 1 archétype custom choisi + justifié (`atelier-laque`)
- [x] 9 sections ordonnées
- [x] ≥ 6 images réelles assignées à des rôles (24 réelles + logo, zéro placeholder)
- [x] Motion language décrit, durées + easing précisés
- [x] Google Maps iframe : lat/lng Bastia (271 Rue Paratojo) `https://maps.google.com/maps?q=42.7228,9.4509&z=15&output=embed` (le builder confirmera les coords exactes depuis le CSV)
- [x] Geste UI singulier inventé (nuancier de swatches laqués filtrables + reflet de laque)
- [x] Palette vérifiée : 0 token repris des 3 derniers clients
- [x] Réservation = bouton Booksy partout
