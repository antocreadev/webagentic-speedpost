# Design brief — Horizon Coiffure (Vico, Corse)

## 0. Réflexion UX (question par question)

**Visiteur-type :** Trois profils principaux, hiérarchisés.
1. Habitant de Vico / villages du Liamone (Murzo, Renno, Guagno, Coggia, Sagone), 30-65 ans, déjà client ou en passe de l'être, qui cherche surtout l'horaire et le téléphone depuis son mobile en pleine journée.
2. Future mariée (ou sa famille) de la micro-région, qui prépare une coiffure de mariage des semaines à l'avance et veut être rassurée sur le savoir-faire avant d'appeler.
3. Touriste de passage entre les gorges du Liamone et le golfe de Sagone, en location l'été, qui tape "coiffeur Vico" ou "barbier près de Sagone" et tombe sur le seul salon de la zone.

**Contexte d'arrivée :** Recherche Google locale ("coiffeur Vico", "salon coiffure Liamone", "barbier Sagone") ou recommandation IA quand un visiteur demande "où se faire coiffer dans l'arrière-pays d'Ajaccio". Device dominant : mobile, en extérieur, signal parfois faible (montagne) : le site doit charger vite et donner l'info clé sans scroller longtemps.

**Intention primaire :** Trouver l'horaire d'ouverture du jour et appeler. Secondairement : comprendre que le salon fait TOUT (femme, homme, enfant, barbier, couleur, mariage), ce qui n'est pas évident pour un salon de village.

**Intention business :** (1) Convertir la recherche en appel téléphonique (pas de réservation en ligne disponible) ; (2) faire savoir que l'offre est complète et mixte, donc inutile de descendre à Ajaccio ; (3) capter la clientèle "mariage" à forte valeur qui se planifie longtemps à l'avance ; (4) transformer la réputation 4,8/5 du bouche-à-oreille en preuve visible en ligne.

**Contrainte UX structurante :** Aucune réservation en ligne (le CTA roi est "Appeler", `tel:0495280862`). Aucune vraie photo de l'intérieur du salon : on travaille l'AMBIANCE et le territoire, pas la promesse d'un décor précis. Le nom "Horizon" est le pivot créatif : crêtes du Liamone, ligne d'horizon entre maquis et ciel, geste du ciseau qui dessine une ligne. Horaires atypiques de village (fermé lundi + dimanche, samedi raccourci) à rendre lisibles d'un coup d'œil avec l'état "ouvert/fermé maintenant".

**Émotion-cible à 5s :** Calme d'altitude et confiance artisanale. La lumière dorée du Sorru, le silence du maquis, un salon où l'on prend le temps. Pas l'énergie urbaine d'un barbershop hipster, pas le clinquant d'un salon de ville : la dignité tranquille d'un seul lieu qui sert tout un village.

**Money shot :** Une **ligne d'horizon de crêtes (skyline du Liamone) dessinée en trait fin doré qui se trace au scroll**, traversant tout le site comme le geste continu d'un ciseau, posée au-dessus du wordmark "HORIZON" et de la baseline "Coiffure · Vico, Liamone". L'image hero (homme en chaise de barbier, lumière chaude) vient en contrepoint sous cette ligne, pas en plein écran : c'est le TRAIT qui est la star, pas la photo Unsplash (qu'on ne sur-promet pas).

---

## Archétype

**`custom` — "ligne-d-horizon" (skyline-tracée au scroll)**

Justification : le nom du salon impose une métaphore graphique forte et inexploitée dans le catalogue. On construit le site autour d'**une seule ligne continue** (crêtes du Liamone) qui se dessine progressivement au scroll et sert de fil conducteur structurel : chaque section est une "altitude" différente sur cette ligne. C'est radicalement différent des archétypes brûlés (ni bande temporelle d'U Caradellu, ni rose des vents du Nautic, ni arches de La Voûte, ni grille scorecard du Bowling) : ici l'élément organisateur est un tracé SVG horizontal vivant, pas une grille ni une photo plein cadre.

---

## Palette de couleurs

Avant de fixer, 5 directions opposées envisagées pour ce client :
- **A. Maquis sombre dramatique** (vert bronze profond + or) : noble, mais risque de tirer vers le "barbershop sombre" déjà vu partout.
- **B. Granit clair + lin + or bronze + vert maquis en encre** (RETENUE) : lumière d'altitude, fond clair, vert comme texte, or comme accent rare. Singulier et frais.
- **C. Rose poudré + sauge cottage** : trop "salon de ville féminin", efface le côté mixte/barbier/montagne.
- **D. Blanc glacé minimal + un seul accent vif** : trop urbain, perd l'ancrage corse.
- **E. Terracotta + ocre Sagone** : déjà la signature du Nautic et de La Voûte (terre de Balagne / rouge Calanques), redondant.

Direction B retenue : **fond granit-lumière clair (pas crème chaud), encre vert maquis-bronze, accent or bronze rare**. Light mode plein, mais un clair minéral et frais, pas le parchemin chaud des 3 derniers clients.

| Rôle       | Hex      | Nom descriptif         | Utilisation                                                        |
|------------|----------|------------------------|--------------------------------------------------------------------|
| `--bg`     | #F2F0E9  | Granit lumière         | Fond principal : blanc cassé minéral et froid-neutre, lumière d'altitude du Sorru, pas crème chaud |
| `--ink`    | #2B3422  | Vert maquis bronze     | Texte principal, wordmark, tracé de la ligne d'horizon : la couleur du maquis dense vu de loin |
| `--ink-2`  | #6E7361  | Lichen sec             | Texte secondaire, légendes, horaires : ton végétal grisé du lichen sur granit |
| `--accent` | #A07840  | Or bronze du Liamone   | CTA "Appeler", trait d'horizon doré, soulignages, état "ouvert" : la lumière dorée rasante des crêtes |
| `--line`   | #D8D2C2  | Joint de granit        | Séparateurs fins, borders de cartes, fond des chips inactives : le mortier clair entre les pierres |

> Palette choisie pour évoquer la **lumière minérale d'un village de granit perché dans le maquis** (Vico, contreforts du Monte Rotondo) et contraster franchement avec les trois derniers clients (Bowling crème `#FAF4E6` + corail, Nautic parchemin `#F4EFE3` + bleu marine + terre, Voûte pierre `#F4EDE0` + rouge Calanques). Aucun token repris : fond plus froid et clair, encre VERTE (jamais utilisée), accent OR (jamais utilisé). Contrastes vérifiés sur `--bg` #F2F0E9 : `--ink` #2B3422 ≈ 11.3:1 (AAA), `--ink-2` #6E7361 ≈ 4.6:1 (AA), `--accent` #A07840 ≈ 4.0:1 (AA pour texte ≥ 18px bold et éléments graphiques ; pour petit texte sur or, utiliser `--ink` ou blanc). `--line` décoratif uniquement.

---

## Typographie

Je m'écarte volontairement de la suggestion Cormorant Garamond du research (= paire défaut éditoriale, déjà sur-vue) au profit d'un couple plus minéral et caractérisé.

- **Display :** `Fraunces` (Google Fonts) — poids **300** (titres fins, élégance d'altitude) + **600** (wordmark, accents). Optical-size variable, `opsz` haute sur les très gros titres pour un caractère gravé. Sert le côté artisanal-noble sans rusticité.
- **Body :** `Outfit` (Google Fonts) — poids **400** + **500**. Sans-serif géométrique légèrement humaniste, très lisible sur mobile en plein soleil, modernité propre qui équilibre la serif et évite l'écueil "vieux salon". (Outfit n'a jamais servi dans le catalogue : divergence typographique nette.)
- **Mono accent (optionnel, léger) :** `Space Mono` 400 pour les coordonnées / altitude / horaires en style "relevé topographique" (ex. `42°06'54"N · 8°41'42"E · ALT. 410 m`). Touche cartographique discrète, jamais en gros bloc.

- **Size scale (mobile-first) :**
  - wordmark hero `clamp(3.2rem, 16vw, 9rem)` Fraunces 600, tracking `-0.03em`
  - h1/section `clamp(2rem, 6vw, 3.6rem)` Fraunces 300, tracking `-0.02em`
  - h2 `clamp(1.4rem, 3.5vw, 2rem)` Fraunces 600
  - body `1.05rem` Outfit 400, line-height 1.65
  - small / légendes `0.85rem` Outfit 400, `--ink-2`
  - mono relevé `0.78rem` Space Mono, letter-spacing `0.04em`
- **Tracking :** display `-0.02em` à `-0.03em`, body `0`, mono `+0.04em`, eyebrows capitales `+0.18em`.

---

## Layout archétype

**Choix : `ligne-d-horizon` (custom)** — Le site est organisé autour d'une **ligne SVG de crêtes** unique, continue, qui se trace au scroll et que chaque section traverse à une "altitude" différente. Ce parti diverge de tout le catalogue (pas de grille, pas de timeline verticale, pas de photo plein cadre) et incarne littéralement le nom du salon.

### Rythme des sections (à lire de haut en bas)

1. **`horizon-nav`** (sticky, fine) : barre transparente sur fond `--bg`, à gauche le wordmark mini "Horizon" Fraunces 600, au centre 3 ancres (`Le salon` · `Prestations` · `Trouver`), à droite un **bouton "Appeler" or bronze** toujours visible. Sous la barre, un **filet horizontal doré de 1px** : c'est le premier segment de LA ligne d'horizon, qui se prolonge dans tout le site. Sur mobile : wordmark + bouton Appeler seuls, ancres dans un menu compact.

2. **`hero-crete`** (≈ 92vh) : fond `--bg` clair. En haut, un **relevé topographique mono** : `VICO · LIAMONE · CORSE-DU-SUD · ALT. 410 m`. Au centre-haut, le wordmark **"HORIZON"** XXL Fraunces 600 en `--ink`, et juste dessous, en Fraunces 300, "Coiffure". Traversant l'écran à mi-hauteur : **la skyline du Liamone en trait doré 1.5px (SVG inline) qui se dessine de gauche à droite au chargement** (stroke-dashoffset animé). Sous la ligne, un bandeau d'ambiance : la photo hero (homme en chaise de barbier) en **format panoramique bas (ratio ~21:9), pas plein écran**, avec scrim permanent, posée comme un "sol" sous l'horizon. Eyebrow : "Le seul salon du village, ouvert toute l'année." CTA primaire "Appeler le salon" (or), secondaire "Voir les prestations". Money shot ici.

3. **`bandeau-mixte`** (marquee lent unique) : un ruban horizontal défilant à vitesse douce (40s) listant l'offre complète comme une crête de mots : `FEMME · HOMME · ENFANT · BARBIER · COULEUR · MARIAGE · VISAGISTE · DÉFRISAGE ·` — séparé par de petits glyphes ciseaux SVG. Sert la conviction "ici on fait tout". Direction droite→gauche, `--ink` sur `--bg`, le mot survolé passe en or.

4. **`le-salon`** (à-propos village) : split 5/7 désaligné. Colonne texte (gauche, 5/12) : un court récit ancré — Vico, maisons de granit, couvent Saint-François (1481), entre gorges du Liamone et golfe de Sagone, un salon comme point de convergence du village. Drop-cap Fraunces or sur la première lettre. Colonne image (droite, 7/12) : `salon-interieur-lumiere` avec filet `--line` et un petit cachet SVG "HORIZON · VICO" estampillé en coin. La ligne d'horizon dorée traverse la section derrière le texte, à une altitude plus basse.

5. **`prestations`** (cœur fonctionnel — geste UI signature) : titre "Tout le salon, sous un même horizon." Présentation des 8 prestations en **"sommets" alignés sur la ligne d'horizon** : chaque prestation est un point/pic sur la crête, et au survol (clic sur mobile) le sommet se "lève" pour révéler une carte descriptive + une vignette photo. Ordre et altitudes variés (Femme, Homme, Enfant, Barbier, Couleur, Coiffure de mariage, Visagiste, Défrisage). Le **Mariage** est mis en avant (pic le plus haut, accent or, photo `coupe-femme-miroir`) car c'est la prestation à forte valeur planifiée. Cartes utilisent `coupe-ciseau-homme`, `femme-salon-seche-cheveux`, `chaise-barbier-moderne`.

6. **`ambiance`** (respiration full-width) : section ≈70vh, photo `ambiance-chaise-cuir` en bandeau panoramique avec scrim permanent. Une seule ligne de manifeste posée dessus en blanc Fraunces 300 : "Prendre le temps, là où la montagne touche le ciel." La ligne d'horizon dorée passe ici au-dessus de la photo. Respiration radicale, zéro autre contenu.

7. **`avis`** (preuve sociale, positif only) : la note **4,8/5** affichée en gros Fraunces, "17 avis · 14 fois la note maximale" en mono. 3 verbatims courts présentés comme des **fanions accrochés à la ligne d'horizon** (petits cards reliés à la crête par un trait fin). Étoiles en or bronze. Aucun avis < 4★ affiché.

8. **`trouver`** (infos pratiques + horaires + Maps) : split 50/50 desktop, stack mobile. Gauche : adresse (Lieu-dit Riniccio, 20160 Vico), téléphone XL cliquable `04 95 28 08 62`, et surtout les **horaires en grille "altitude"** avec état dynamique **"Ouvert maintenant / Fermé" calculé en JS** (Europe/Paris). Les jours fermés (lundi, dimanche) en `--ink-2` barré léger, le jour courant surligné or. Droite : Google Maps iframe `q=42.1150476,8.6949741&z=15&output=embed` avec filtre CSS léger pour s'harmoniser au granit, encadré d'un filet `--line`. Relevé mono au-dessus : `42°06'54"N · 8°41'42"E`.

9. **`footer-horizon`** : la ligne d'horizon dorée fait sa **dernière descente et se termine en pointe de ciseau** (petit glyphe SVG). Wordmark "Horizon Coiffure" répété, coordonnées, rappel horaires courts, mention "Site réalisé par SpeedPost.fr". Fond `--bg`, texte `--ink-2`.

### Singularités du site (3 à 5)

- **La ligne d'horizon continue** : un seul tracé SVG de crêtes du Liamone qui traverse les 9 sections à des altitudes variables, se dessine au scroll (stroke-dashoffset lié au scrollProgress), et se termine en pointe de ciseau dans le footer. Personne d'autre dans le catalogue n'a ce fil conducteur graphique unique.
- **Prestations en "sommets" sur la crête** : les 8 services sont des pics sur la ligne, qui se lèvent au survol/clic pour révéler leur carte. Geste UI signature, métier-driven (le geste du ciseau = la ligne ; les sommets = les prestations).
- **Relevés topographiques en mono** (coordonnées, altitude 410 m) qui ancrent le côté montagne corse sans cliché maritime.
- **État "ouvert/fermé maintenant"** calculé live côté JS, jour courant surligné or : répond direct à l'intention primaire (l'horaire du jour).
- **Photos en bandeaux panoramiques (sols sous l'horizon), jamais en plein cadre** : l'ambiance Unsplash sert de contrepoint et n'est jamais sur-promise comme "le vrai salon".

### Ce que ce site n'a PAS (divergence explicite)

- Pas de hero photo plein écran (la ligne dorée + le wordmark portent le hero, la photo est un bandeau bas).
- Pas de grille de cartes classique pour les prestations (elles sont des sommets sur la crête).
- Pas de timeline verticale, pas de rose des vents, pas d'arches, pas de grille scorecard.
- Pas de palette parchemin chaud ni d'encre bleu marine : fond granit froid, encre verte, accent or.
- Pas de réservation en ligne (CTA = appel téléphonique).
- Pas de fausse galerie "notre salon" : on assume l'ambiance thématique.

---

## Motion language

- **Tracé de la ligne d'horizon (signature)** : `stroke-dashoffset` du SVG crête animé du chargement (segment hero, 1.2s, easing `[0.2,0.7,0.2,1]`) puis **lié au scroll progress** via Motion `scroll()` pour les segments des sections suivantes — la ligne se "construit" à mesure qu'on descend. Trait `--accent` or, 1.5px.
- **Entrées scroll** : `Motion.inView` `opacity 0→1 + translateY 18px→0`, durée **0.5s**, easing `[0.2,0.7,0.2,1]`, stagger 60ms sur groupes. (Court, conforme au filet de sécurité CSS `@keyframes autoreveal` à 0.5s.)
- **Sommets-prestations** : au hover/focus, le pic remonte `translateY(-10px)` + sa carte révèle en `opacity/scale 0.96→1`, transition 220ms `[0.2,0.7,0.2,1]`. Sur mobile : tap toggle.
- **Hero bandeau photo** : parallax vertical léger 8% sur scroll.
- **Marquee mixte** : CSS `@keyframes marquee` 40s linear infinite, pause au hover.
- **Cards avis (fanions)** : léger balancement `rotate(-1deg→1deg)` 4s ease-in-out infinite alternate, très subtil, comme des fanions au vent ; `translateY(-3px)` + ombre douce au hover.
- **Bouton Appeler** : pulse d'accent très léger (box-shadow or) au repos sur mobile pour signaler le CTA roi.
- **Smooth scroll global** : Lenis actif.
- **Interdits** : pas d'auto-play vidéo, pas de cursor follower, pas de popup, animations reveal ≤ 0.6s.

---

## Images sélectionnées

Toutes les images sont des Unsplash thématiques (P3) : aucune vraie photo intérieure du salon n'existe en ligne (research §3). À télécharger en local dans `dist/horizon-coiffure-6y9jrcao/site/assets/images/` au format `.avif` (name_hints du research). Le HTML référence uniquement `./assets/images/<fichier>.avif`. **Important : ne jamais légender ces photos comme "notre salon" — toujours en registre ambiance / illustration de prestation.**

| Rôle                         | Chemin local                                      | Source (URL origine)                                                                                          | Alt text                                            |
|------------------------------|---------------------------------------------------|--------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| hero (bandeau ~21:9)         | ./assets/images/hero-barbier-chaise.avif          | https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&q=85&auto=format&fit=crop                | Ambiance barbier, lumière chaude                    |
| ambiance (bandeau ~21:9)     | ./assets/images/ambiance-chaise-cuir.avif         | https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1600&q=85&auto=format&fit=crop                | Chaise de barbier en cuir, atmosphère élégante      |
| à-propos salon (3:4)         | ./assets/images/salon-interieur-lumiere.avif      | https://images.unsplash.com/photo-1536520002442-39764a41e987?w=1600&q=85&auto=format&fit=crop                | Intérieur de salon, luminaires suspendus            |
| prestation Barbier (1:1)     | ./assets/images/chaise-barbier-moderne.avif       | https://images.unsplash.com/photo-1621645582931-d1d3e6564943?w=1600&q=85&auto=format&fit=crop                | Fauteuil de barbier, prestation barbier             |
| prestation Homme (1:1)       | ./assets/images/coupe-ciseau-homme.avif           | https://images.unsplash.com/photo-1647140655214-e4a2d914971f?w=1600&q=85&auto=format&fit=crop                | Coupe aux ciseaux, prestation homme                 |
| prestation Femme (1:1)       | ./assets/images/femme-salon-seche-cheveux.avif    | https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1600&q=85&auto=format&fit=crop                | Coiffage au sèche-cheveux, prestation femme         |
| prestation Mariage (1:1)     | ./assets/images/coupe-femme-miroir.avif           | https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=1600&q=85&auto=format&fit=crop                | Coiffure soignée, coiffure de mariage               |
| détail (chip / petit format) | ./assets/images/brosse-detail-outil.avif          | https://images.unsplash.com/photo-1595475884562-073c30d45670?w=1600&q=85&auto=format&fit=crop                | Brosse à cheveux, détail outil                       |

8 images réelles (Unsplash thématiques) assignées, 0 placeholder. Si un fichier `.avif` manque dans `site/assets/images/` au moment du build, l'orchestrateur doit le télécharger via `tools.image_dl.download(url, "dist/horizon-coiffure-6y9jrcao/site/assets/images", "<name_hint>")` avant de lancer le builder. (Les vues Street View CSV ne sont PAS utilisables, research §3.)

---

## Copy directions (pour le builder)

- **Eyebrow hero :** `VICO · LIAMONE · CORSE-DU-SUD · ALT. 410 m` (mono, capitales letter-spaced).
- **Wordmark :** `HORIZON` (XXL) + `Coiffure` (Fraunces 300 dessous).
- **H1 / accroche hero :** "Le seul salon du village, sous la ligne d'horizon du Liamone." (variante courte : "Là où la montagne touche le ciel.")
- **Lede hero (35-50 mots) :** "À Vico, entre les gorges du Liamone et le golfe de Sagone, Horizon Coiffure habille les têtes de tout le village depuis son point de granit. Femme, homme, enfant, barbier, couleur, mariage : tout se fait ici, sans descendre à Ajaccio."
- **CTA primaire :** `Appeler le salon` → `tel:0495280862` (or bronze, plein).
- **CTA secondaire :** `Voir les prestations` (outline `--ink`).
- **Section salon (titre) :** "Un salon, un village, un horizon."
- **Section prestations (titre) :** "Tout le salon, sous un même horizon."
- **Manifeste ambiance :** "Prendre le temps, là où la montagne touche le ciel."
- **Section avis (titre) :** "Ce que dit le village." (note 4,8/5 · 17 avis · 14 fois la note maximale)
- **Section trouver (titre) :** "Monter jusqu'au salon." + label "Ouvert maintenant / Fermé" dynamique.
- **Règle typo client-facing :** aucun em-dash `—` (U+2014). Utiliser `:`, `,`, `.`, `()`. Le tiret simple `-` reste OK.

---

## Implémentation technique (notes builder)

- **Skyline SVG du Liamone :** dessiner à la main un `path` de crêtes irrégulières (pics + cols), largeur 100%, réutilisé/transformé par section à des altitudes (translateY) différentes. Animer `stroke-dasharray`/`stroke-dashoffset` au chargement (hero) puis sur `scroll()` progress (sections suivantes). Pas de lib externe nécessaire : SVG inline + Motion suffisent.
- **Sommets-prestations :** points positionnés en `position:absolute` le long du path (ou flex-row de "pics" sous la ligne) ; carte révélée en `<details>`-like accessible (aria-expanded), toggle au tap mobile, hover desktop.
- **État ouvert/fermé :** JS lit `new Date()` en Europe/Paris, mappe sur la grille horaires (Mar/Mer/Jeu/Ven 09:00-18:00, Sam 09:00-17:00, Lun+Dim fermé), affiche pastille verte "Ouvert" (texte sur or → utiliser `--ink` ou blanc selon contraste) ou grise "Fermé · réouvre <jour> 09:00".
- **Maps iframe :** `https://maps.google.com/maps?q=42.1150476,8.6949741&z=15&output=embed`, filtre CSS léger `grayscale(0.1) contrast(0.97)` pour harmoniser au granit.
- **Stack :** Tailwind PRÉ-COMPILÉ en `tailwind.css` (jamais le CDN play), Google Fonts (Fraunces + Outfit + Space Mono) en preconnect + display=swap, Motion One + Lenis en ESM. Reveals `[data-reveal]{opacity:0}` conditionnés par `.js-ready` + `@keyframes autoreveal` filet de sécurité à 0.5s.
- **Contraste sur photo :** scrim permanent + `filter: brightness(.92) saturate(1.05) contrast(1.03)` + `text-shadow` sur tout texte posé sur les bandeaux hero/ambiance, conformément aux règles.

---

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, contrastes vérifiés (fond granit froid, encre verte, accent or — divergence totale vs 3 derniers clients)
- [x] 3 polices Google Fonts nommées avec poids (Fraunces 300/600, Outfit 400/500, Space Mono 400)
- [x] 1 archétype custom choisi + justifié (`ligne-d-horizon`)
- [x] 9 sections ordonnées
- [x] 8 images réelles assignées à des rôles, 0 placeholder (Unsplash thématiques, à télécharger en .avif)
- [x] Language motion décrit, durée + easing précisés (reveals ≤ 0.6s)
- [x] Geste UI singulier inventé (ligne d'horizon tracée au scroll + sommets-prestations)
- [x] Google Maps iframe source prête (lat 42.1150476, lng 8.6949741)
