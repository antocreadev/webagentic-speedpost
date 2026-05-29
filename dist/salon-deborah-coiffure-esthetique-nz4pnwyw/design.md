# Design brief — Salon Déborah Coiffure Esthétique (Marine de Sant'Ambroggio, Lumio)

> Brief ancré sur l'**identité visuelle RÉELLE** photographiée (section 7 du research.md), pas sur la palette imaginée (turquoise/rose poudré) que la section 6 du researcher avait proposée à l'aveugle. Le vrai salon est un **dark-luxe méditerranéen : vert émeraude profond + or laiton + noir chaud + sable/crème + bois miel**, signé par le **miroir soleil doré (sunburst)** présent 3 fois dans le décor. Tout le brief découle de là.

---

## 0. Réflexion UX (question par question)

**Visiteur-type :** deux profils complémentaires. (1) La résidente / habituée de Balagne, 30-60 ans, fidèle, qui veut sa coupe, sa couleur ou son soin et réserver vite sans appeler. (2) La vacancière premium / plaisancière en escale au port l'été (continentale ou étrangère aisée), 25-55 ans, qui découvre le salon en se promenant sous les galeries ou via une recherche « institut beauté Calvi / soin visage Balagne », et qui cherche un lieu à la hauteur d'un cadre de rêve. Device probable : mobile à >70% (recherche en mobilité, sur le port ou en terrasse).

**Contexte d'arrivée :** recherche Google locale (« coiffeur Lumio », « institut beauté Sant'Ambroggio », « soin visage coréen Corse »), QR code / lien Planity partagé, bouche-à-oreille (274 avis 4,9), ou recommandation IA quand un voyageur demande « bon institut de beauté en Balagne ». Souvent en plein jour, en vacances, dans une humeur détente.

**Intention primaire :** vérifier que le lieu est sérieux et beau, comprendre l'offre (coiffure ? soins visage ? massages ? ongles ?), puis **réserver sur Planity sans téléphoner**. Le CTA Planity doit être atteignable à tout moment, depuis n'importe quel univers de prestation.

**Intention business :** monter en gamme et faire connaître l'expertise rare (K-Beauty coréenne, drainage Renata França) au-delà du « coiffeur de village » ; convertir la clientèle estivale de passage en clientèle de soins premium ; capter les mariages. Vendre l'expertise de Déborah (20+ ans) et la prise en charge 360° tête-aux-pieds par une équipe de 4.

**Contrainte UX structurante :** **quatre univers de prestation distincts** (coiffure / soins visage K-Beauty / massages bien-être / ongles) menés par **quatre praticiennes** nommées. Le site doit rendre cette richesse lisible sans noyer le visiteur, et donner à chaque univers sa propre lumière. Réservation 100% Planity (aucun formulaire maison à construire, juste des liens profonds). Saisonnalité forte (pic juin-septembre) mais fidélité hors-saison.

**Émotion-cible à 5 secondes :** **sophistication chaleureuse et apaisante**, le luxe doux d'un institut méditerranéen baigné de soleil, lumière dorée, vert profond reposant. Ni clinique froid, ni rose bonbon générique. On doit sentir « expertise + sérénité + cadre de rêve au bord de l'eau ».

**Money shot :** la photo `salon-02` (port de Sant'Ambroggio vu d'en haut, eau turquoise, voiliers, galeries, logo DÉBORAH et flèche « C'est ici ! ») fusionnée avec le **geste signature : un grand miroir soleil doré (sunburst SVG) dont les rayons s'épanouissent au chargement et rythment ensuite tout le scroll**. La localisation de rêve + le motif laiton authentique = la première impression.

---

## Archétype

**`rayonnement-sunburst` (custom)** — composition pilotée par un **soleil de laiton central** (rosace de rayons dorés en SVG) qui sert à la fois de signature graphique, de système de navigation vers les 4 univers, et de fil conducteur du scroll. Chaque section est « éclairée » par un demi-soleil ou un quart de rayons qui se déploie à l'entrée dans le viewport.

**Justification (2 phrases) :** le miroir soleil doré est l'élément physiquement présent 3 fois dans le vrai salon (laiton en zone bac, rotin en cabine), donc le motif est authentique et vérifiable, pas décoratif gratuit. Aucun client du catalogue n'utilise une mécanique radiale de rayons dorés (les archétypes brûlés sont marine/scorecard/arcade/timeline/editorial/carnet) : `rayonnement-sunburst` diverge radicalement en structure, en motif et en palette.

---

## Palette de couleurs

Light mode, fonds clairs sable/crème/ivoire, accents émeraude et or, texte charbon. Directement extraite des 5 photos réelles.

| Rôle          | Hex       | Nom descriptif        | Utilisation                                                                 |
|---------------|-----------|-----------------------|------------------------------------------------------------------------------|
| `--bg`        | `#F6EFE2` | Sable microciment     | Fond principal (le mur sable de la cabine K-Beauty, photo salon-05)          |
| `--bg-2`      | `#FBF7EE` | Ivoire sel            | Fond de cartes/sections alternées, respirations claires                      |
| `--ink`       | `#1A201C` | Charbon chaud         | Texte principal, fauteuils noirs du salon, fond des blocs « nuit »           |
| `--ink-2`     | `#5C615A` | Olive grisée          | Texte secondaire, légendes, sous-titres                                      |
| `--accent`    | `#1F5C49` | Émeraude profond      | Dominante signature (mur d'accent réel zone bac), titres, blocs immersifs    |
| `--gold`      | `#B98B3E` | Or laiton             | Rayons sunburst, filets, anneaux, CTA secondaire, chiffres clés              |
| `--line`      | `#E2D7C2` | Lin joint             | Séparateurs, borders fines, fonds de rayons inactifs                         |
| `--wood`      | `#C79A63` | Bois miel             | Liant chaud, soulignages, hover doux (sol du salon)                          |

> Palette « dark-luxe méditerranéen » tirée pixel par pixel des photos : sable microciment + ivoire en fonds clairs (light mode respecté), émeraude profond du mur d'accent en couleur signature, or laiton du miroir soleil en métal précieux, charbon chaud des fauteuils en encre. Elle ne reprend **aucun** token des 3 derniers clients livrés (voir section dédiée). Touche turquoise du port (`#2E8C9E`) réservée à l'ancrage local dans le hero/maps uniquement, jamais en surface large.

**Contrastes vérifiés sur `--bg` (#F6EFE2) :**
- `--ink` #1A201C : ~13.8:1 (AAA)
- `--accent` émeraude #1F5C49 : ~6.1:1 (AA large + texte)
- `--ink-2` olive #5C615A : ~5.2:1 (AA)
- `--gold` #B98B3E : ~2.9:1 → **réservé aux éléments non-texte** (filets, rayons, icônes) ou au texte ≥20px bold, ou texte or sur fond émeraude/charbon (là le ratio passe). CTA principal = texte ivoire sur fond émeraude.
- Texte sur émeraude `--accent` : ivoire #FBF7EE = ~5.9:1 (AA), or #B98B3E sur émeraude = ~2.5:1 → décoratif uniquement.

**CTA :** primaire = pavé **émeraude `--accent`** + texte **ivoire**, filet or 1px ; au hover, halo or qui irradie (box-shadow doré diffus). Secondaire = contour or sur fond clair.

---

## Pourquoi cette palette n'est PAS celle des autres clients (garde-fou anti-redondance)

| Client (3 derniers livrés) | `--bg`         | `--ink`        | `--accent`           |
|----------------------------|----------------|----------------|----------------------|
| La Voûte (refonte)         | `#F4EDE0` pierre | `#1C1714` basalte | `#B9452A` rouge Calanques |
| Le Bowling (refonte)       | `#FAF4E6` crème | `#0E2A3C` marine | `#E85A3C` corail cornet |
| Le Nautic (refonte)        | `#F4EFE3` parchemin | `#0E2A3A` marine | `#C0502A` terre Balagne |
| **Salon Déborah (ce site)**| `#F6EFE2` sable microciment | `#1A201C` **charbon chaud** | `#1F5C49` **émeraude profond** |

Les trois précédents partagent tous le triptyque **fond pierre/sable chaud + encre bleu marine + accent rouge/corail terracotta** (palette « côte corse / port »). Salon Déborah rompt sur les deux tokens identitaires : **encre charbon chaud** (pas de bleu marine) et **accent émeraude profond + or laiton** (pas de rouge/corail). Le fond sable est superficiellement proche mais c'est la seule proximité tolérée (1 token max) ; tout le reste diverge. Aucun risque de tell IA répété.

---

## Typographie

Fidèle au logo réel « DÉBORAH » en serif fin chic à capitales espacées.

- **Display :** `Cormorant Garamond` (Google Fonts) — poids **300** (titres XXL aériens) + **500** (sous-titres). Italique 400 pour les mots-accents (« rituel », « éclat »). C'est la serif fine, haute, élégante qui colle au lettrage existant du logo et à l'esprit institut premium.
- **Body / UI :** `Jost` (Google Fonts) — **400** (corps) + **500** (labels, prix, nav) + **300** (légendes). Sans-serif géométrique aérée, lettres rondes, très lisible mobile, modernité K-Beauty sans froideur.
- **Eyebrows / micro-labels :** `Jost` 500 en **CAPITALES**, letter-spacing `0.28em`, taille 0.72-0.8rem, couleur `--gold` ou `--ink-2`. Reprend l'espacement large du logo « COIFFURE ESTHÉTIQUE ».

**Size scale (mobile-first) :**
- h1 (wordmark hero) : `clamp(2.8rem, 11vw, 7rem)` Cormorant 300, tracking `0.02em` (capitales espacées comme le logo)
- h2 (titres section) : `clamp(2rem, 5vw, 3.4rem)` Cormorant 300
- h3 (univers / praticienne) : `clamp(1.4rem, 3vw, 2rem)` Cormorant 500
- body : `1.05rem` Jost 400, line-height 1.7
- prix / durées : `0.95rem` Jost 500
- small / légendes : `0.82rem` Jost 300

**Tracking :** display capitales `+0.04em` à `+0.08em` (l'élégance du logo vient de l'espacement), body `0`.

---

## Layout archétype

**Choix : `rayonnement-sunburst`** (custom). La page est structurée non pas en bandes empilées banales mais en **« lever de soleil » progressif** : un grand sunburst de laiton (SVG) ancré graphiquement traverse le scroll, ses rayons servant de séparateurs, de puces de navigation et d'animation d'entrée. Les 4 univers de prestation sont disposés autour d'un demi-soleil central comme les heures sur un cadran solaire. Cela colle à l'identité (miroir soleil réel) et diverge totalement des layouts marine/scorecard/timeline du catalogue.

### Rythme des sections (de haut en bas)

1. **Nav flottante minimale (dock haut)** : barre transparente devenant `--bg` translucide (backdrop-blur) au scroll. À gauche, wordmark « DÉBORAH » Cormorant 300 capitales espacées avec un **micro-sunburst or** (12 rayons SVG, 22px) en lettrine. À droite : `Univers` · `L'équipe` · `Avis` · bouton **Réserver** (émeraude, halo or au hover) lien Planity. Mobile : wordmark + bouton Réserver collant + menu plein écran émeraude au tap.

2. **Hero « C'est ici »** (full-bleed photo + sunburst signature) : photo `salon-02` (port vu d'en haut, voiliers, galeries). **Scrim permanent obligatoire** (gradient + radial, cf. rules). Par-dessus, centré : eyebrow `INSTITUT DE BEAUTÉ · MARINE DE SANT'AMBROGGIO`, h1 « DÉBORAH » en ivoire (text-shadow), sous-titre Cormorant italique « Coiffure · Soins · Massages · Ongles, entre mer et montagne ». **Geste signature : un grand sunburst or (40+ rayons SVG) dont les rayons se déploient en éventail au chargement, halo doux derrière le wordmark, comme un soleil qui se lève sur le port.** Chips info : note `4,9 ★ · 274 avis` (chip charbon translucide), `Réservation en ligne`. CTA Réserver sur Planity. Money shot.

3. **Manifeste / accroche** (bande émeraude immersive, texte ivoire+or) : section pleine largeur fond `--accent` émeraude, demi-sunburst or en filigrane en arrière-plan (bas opacité). Phrase manifeste Cormorant 300 grande : « La passion au service du bien-être, sous les galeries du port. ». Deux-trois lignes Jost en ivoire sur l'ambiance familiale + cadre unique mer/montagne. Respiration sombre-luxe qui tranche avec les fonds clairs autour.

4. **Les 4 univers — cadran solaire** (LE cœur, geste UI signature) : un **demi-soleil de laiton** dont les 4 grands rayons pointent vers 4 cartes d'univers (Coiffure / Soins visage K-Beauty / Massages / Ongles). Sur desktop, disposition radiale autour du moyeu doré ; sur mobile, fallback en stack vertical avec un petit sunburst en tête de chaque carte. Au survol/au scroll, le rayon de l'univers actif s'illumine en or et la carte révèle 3-4 prestations phares + fourchette de prix + durée + la praticienne. Chaque carte = lien profond Planity vers la catégorie. (Voir détail geste UI ci-dessous.)

5. **Le salon en lumière** (galerie immersive, 2 photos) : `salon-04` (mur émeraude + 2 miroirs soleil dorés + fauteuils moutarde) en grand, légende « Notre espace coiffage, sous les rayons du laiton » ; `salon-03` (poste coiffage, fenêtre cintrée sur montagnes) en regard. Disposition asymétrique (une grande, une décalée), filet or fin, coins légèrement adoucis (pas de rounded-3xl générique : radius 6px + filet or). Sunburst quart-de-cercle en coin comme transition.

6. **Cabine K-Beauty — l'expertise rare** (split émeraude/sable) : photo `salon-05` (cabine sable, miroir rotin soleil, palmier, certificat K-Beauty) à gauche ; à droite, sur fond `--bg`, bloc « Déborah, esthéticienne depuis 20 ans » + explication des soins coréens nouvelle génération (microneedling exosome, carboxythérapie CO2, V-Tox Lift, peeling illuminé) + drainage Renata França. Badge or « Soins dermo-esthétiques coréens » + « Certifiée K-Beauty ». Met en valeur le différenciant rare en Corse. CTA Réserver un soin.

7. **L'équipe** (4 praticiennes, rangée de pétales) : Déborah (esthétique & massages), Laetitia & Céline (coiffure), Marie (ongles). Pas de portraits dispo → **médaillons sunburst** : chaque praticienne dans un disque bordé d'un anneau de rayons or (SVG), initiale en Cormorant au centre, nom + spécialité dessous. Cohérent, élégant, n'invente pas de fausses photos. Texte « Une équipe de 4 professionnelles, une prise en charge complète, de la tête aux pieds. »

8. **Preuve sociale — halo d'avis** : fond `--bg-2` ivoire. Grand `4,9 / 5` en Cormorant émeraude entouré d'un sunburst or rayonnant ; sous-chiffre `274 avis Planity` + sous-notes (Accueil 5,0 · Qualité 5,0 · Cadre 4,9 · Propreté 4,9). 3 verbatims courts authentiques (« Super comme d'habitude », « Coiffeuses professionnelles et agréables », « Ce n'est pas compliqué, j'adore ») en cartes filet-or. Positif uniquement. La vignette `salon-01` (carte de marque noir/or) en petit médaillon « preuve » discret à côté, jamais en grand (texte incrusté).

9. **Infos & accès + footer** (bande charbon `--ink`) : split. Gauche : « Nous trouver » Cormorant ivoire, adresse Marine de Sant'Ambroggio 20260 Lumio, horaires (Mar-Sam 9h-18h, fermé Dim & Lun) en Jost, téléphone `04 95 60 70 79` cliquable, lien Instagram `@deborah_coiffure_esthetique`, gros CTA **Réserver sur Planity**. Droite : Google Maps iframe (lat/lng du port) sans cadre, filtre CSS léger pour harmoniser, filet or. Footer : wordmark DÉBORAH + micro-sunburst, mention SpeedPost discrète, em-dash interdit partout.

### Geste UI signature — le « cadran solaire des univers » + sunburst au scroll

**Le sunburst doré est le système de design, pas un ornement.** Trois manifestations :

1. **Hero sunburst-lever-de-soleil** : au chargement, ~44 rayons or (SVG `<line>`/`<path>` depuis un centre) s'animent en `scaleY` 0→1 avec stagger 18ms en éventail (du centre vers l'extérieur), donnant l'impression d'un soleil qui s'épanouit derrière le wordmark. Durée totale ~0.9s, easing `[0.2,0.7,0.2,1]`. Halo radial or doux qui pulse très lentement (8s) ensuite.

2. **Cadran des 4 univers** : un **demi-disque de laiton** (moyeu central) émet 4 faisceaux de rayons, chacun pointant vers une carte d'univers. Desktop : les 4 cartes sont posées en arc autour du moyeu (positions ~10h, 12h, 2h, 4h). Le rayon de l'univers survolé/actif passe de `--line` lin à `--gold` plein (transition 240ms) et sa carte se soulève de `translateY(-4px)` avec ombre douce + filet or qui s'allume. Mobile : le demi-cadran devient une frise horizontale de 4 puces sunburst en tête de section, et les cartes s'empilent ; tap = expand des prestations. C'est le geste qu'aucun autre client n'a.

3. **Rayons-séparateurs au scroll** : entre les grandes sections, un fin arc de rayons or (quart de sunburst en coin, SVG) se dessine progressivement via `inView` (stroke-dashoffset animé), reliant visuellement chaque univers au soleil central. Sert de transition signature et de fil rouge du début à la fin.

### Singularités du site (qui le rendent unique)

- Le **cadran solaire radial** des 4 univers de prestation, calqué sur les vrais miroirs soleil du salon.
- Le **sunburst-lever-de-soleil** animé au chargement du hero (rayons en éventail).
- Les **médaillons-sunburst de l'équipe** (anneau de rayons + initiale) au lieu de faux portraits.
- Le `4,9` géant entouré d'un **halo de rayons or** comme un soleil de satisfaction.
- Palette **émeraude profond + or laiton + charbon** (dark-luxe méditerranéen) inédite dans le catalogue.

### Ce que ce site n'a PAS (divergence explicite)

- **Pas de palette marine/turquoise pâle ni rose poudré** (la suggestion researcher section 6 est écartée au profit du réel).
- **Pas de bleu marine en encre** (les 3 derniers clients en avaient tous : ici charbon chaud).
- **Pas de marquee défilant**, pas de timeline verticale, pas de grille bento, pas de scorecard, pas d'arches.
- **Pas de hero split 60/40 classique** : hero full-bleed photo + sunburst central.
- **Pas de faux portraits** d'équipe (remplacés par médaillons sunburst).
- **Pas de `rounded-3xl` générique** : radius 4-6px + filets or fins, coins maîtrisés.

---

## Motion language

- **Sunburst hero** : rayons SVG `scaleY/scaleX` 0→1 en éventail, stagger 18ms, durée ~0.9s, easing `[0.2,0.7,0.2,1]` ; halo or pulse `opacity .6↔.9` boucle 8s (très lent, non distrayant).
- **Entrées scroll** : `Motion.inView`, `opacity 0→1 + translateY 18px→0`, durée 0.55s, easing `[0.2,0.7,0.2,1]`, stagger 60ms sur groupes (cartes univers, verbatims).
- **Rayons-séparateurs** : `stroke-dashoffset` animé sur `inView`, durée 0.7s.
- **Cadran univers** : rayon actif `--line`→`--gold` 240ms, carte `translateY(-4px)` + shadow douce 180ms.
- **Hero image** : parallax vertical 8% sur scrollY (Motion).
- **Cards hover** : `translateY(-4px)` + filet or qui s'allume + box-shadow `0 10px 30px rgba(185,139,62,.18)`, transition 180ms.
- **CTA Réserver** : au hover, halo or diffus qui irradie (box-shadow doré croissant), 200ms.
- **Smooth scroll global** : Lenis actif.
- **Reveals robustes** : `[data-reveal]{opacity:0}` conditionné par `.js-ready`, + `@keyframes autoreveal` filet de sécurité forçant `opacity:1` après ~0.5s si Motion plante.
- **Interdits** : pas d'auto-play vidéo, pas de cursor follower, pas de popup, animations courtes (jamais >0.9s sauf pulse décoratif).

---

## Images sélectionnées

Toutes déjà téléchargées dans `site/assets/images/`. Référencer en chemin local uniquement. Scrim permanent obligatoire dès qu'un texte est posé dessus.

| Rôle                         | Chemin local                          | Source (origine)                  | Alt text                                                        |
|------------------------------|---------------------------------------|-----------------------------------|-----------------------------------------------------------------|
| hero (16:10, full-bleed)     | `./assets/images/salon-02.jpg`        | Cloudinary Planity                | Salon Déborah au port de Sant'Ambroggio, vue sur la marine     |
| galerie 1 — coiffage émeraude| `./assets/images/salon-04.webp`       | Cloudinary Planity                | Espace coiffage, mur émeraude et miroirs soleil dorés           |
| galerie 2 — poste fenêtre    | `./assets/images/salon-03.webp`       | Cloudinary Planity                | Poste de coiffage et grande fenêtre cintrée sur les montagnes   |
| split K-Beauty (4:3)         | `./assets/images/salon-05.webp`       | Cloudinary Planity                | Cabine de soins K-Beauty, ambiance sable et rotin               |
| vignette preuve (1:1, petit) | `./assets/images/salon-01.webp`       | Carte de marque salon             | Carte de visite Déborah Coiffure Esthétique, noir et or         |

- **5 images réelles, 0 placeholder, 0 Unsplash.** Le différenciant K-Beauty, l'émeraude+or et la localisation sont tous portés par de vraies photos du salon.
- `salon-01` (carte de marque, texte incrusté) : **uniquement en petite vignette « preuve »** section 8, jamais en grand (le texte gravé deviendrait illisible / redondant).
- L'équipe (section 7) utilise des **médaillons sunburst SVG**, pas de photo (aucun portrait dispo) : assumé et cohérent, pas un placeholder.
- Pas besoin de retélécharger : les 5 fichiers sont présents.

---

## Copy directions (pour le builder)

- **Eyebrow hero :** `INSTITUT DE BEAUTÉ · MARINE DE SANT'AMBROGGIO` (Jost 500 capitales, tracking 0.28em, or).
- **H1 :** `DÉBORAH` (capitales espacées, Cormorant 300, ivoire sur hero).
- **Sous-titre hero :** « Coiffure, soins, massages et ongles, entre mer et montagne. » (Cormorant italique).
- **Lede manifeste :** « La passion au service du bien-être, sous les galeries du port de Sant'Ambroggio. Une équipe de quatre professionnelles vous accueille dans une ambiance chaleureuse et familiale, entre mer turquoise et maquis corse. »
- **CTA primaire :** `Réserver sur Planity` (lien https://www.planity.com/deborah-coiffure-esthetique-20260-lumio).
- **CTA secondaire :** `Découvrir nos univers`.
- **Univers (labels) :** `Coiffure` / `Soins visage K-Beauty` / `Massages bien-être` / `Ongles & beauté des mains`.
- **Différenciant K-Beauty :** « Déborah, esthéticienne depuis plus de 20 ans, vous propose des soins dermo-esthétiques coréens nouvelle génération : microneedling exosome, carboxythérapie CO2, V-Tox Lift, peeling illuminé. Des résultats visibles sur l'éclat, l'hydratation et la fermeté. »
- **Massages :** mentionner la méthode `Renata França` (drainage), californien, ayurvédique.
- **Em-dash `—` interdit** : utiliser `:`, `,`, `.`, `()`. Vérifier grep U+2014 = 0.

---

## Données pratiques (pour le builder)

- **Adresse :** Marine de Sant'Ambroggio, sous les galeries commerçantes, 20260 Lumio (Balagne, Haute-Corse).
- **Téléphone :** `04 95 60 70 79` (lien `tel:+33495607079`).
- **Réservation :** `https://www.planity.com/deborah-coiffure-esthetique-20260-lumio`.
- **Instagram :** `@deborah_coiffure_esthetique`.
- **Horaires :** Mardi à Samedi 9h00-18h00. Fermé Dimanche et Lundi.
- **Note :** 4,9/5 (274 avis Planity) · sous-notes Accueil 5,0 / Qualité 5,0 / Cadre 4,9 / Propreté 4,9.
- **Google Maps iframe :** `https://maps.google.com/maps?q=42.5915,8.7937&z=15&output=embed` (Marine de Sant'Ambroggio ; le builder ajuste si lat/lng exacts diffèrent dans le CSV).
- **Équipe :** Déborah (esthétique & massages), Laetitia & Céline (coiffure), Marie (ongles).
- **Prix repères :** Brushing 24-40€ · Coloration+brushing 78-115€ · Soin Booster Collagène dès 120€ · V-Tox Lift 90€ · Microneedling Exosome 120€ · Massage californien 80-130€ · Drainage Renata França 110€ (cure 5 séances 450€) · Beauté des mains 30€ · Semi-permanent 35€.

---

## Plan d'implémentation pour le builder (ordre conseillé)

1. **Setup Tailwind pré-compilé** : `tw.config.js` avec `theme.extend.colors` = tous les tokens ci-dessus (`bg`, `bg2`, `ink`, `ink2`, `accent` émeraude, `gold`, `line`, `wood`, + `turq` #2E8C9E pour ancrage local) ; `fontFamily` `display: Cormorant Garamond`, `body: Jost`. Compiler vers `tailwind.css` minifié, supprimer les artefacts.
2. **Google Fonts** : preconnect + `Cormorant+Garamond:ital,wght@0,300;0,500;1,400&family=Jost:wght@300;400;500&display=swap`.
3. **Composant SVG sunburst réutilisable** : une fonction JS (ou markup inline paramétré) générant N rayons (`<line>` depuis centre, rotation par `index * (360/N)`), couleur `--gold`. Variantes : plein cercle (hero ~44 rayons), demi (cadran univers), quart (séparateurs en coin), anneau fin (médaillons équipe, puce wordmark). Privilégier SVG inline custom (zéro lib externe nécessaire ici, < 5kb).
4. **Hero** : photo `salon-02` + `<div class="scrim">` permanent (gradient + radial cf. rules) + `filter: brightness(.92) saturate(1.05) contrast(1.03)` sur l'image + `text-shadow` sur tous les enfants texte. Sunburst plein derrière le wordmark, animation éventail au load.
5. **Nav dock** : transparent→`--bg`/blur au scroll (Motion `scroll`), bouton Réserver toujours visible, version mobile plein écran émeraude.
6. **Bande manifeste émeraude** (`--accent`) texte ivoire + or, demi-sunburst filigrane.
7. **Cadran 4 univers** : desktop arc radial autour du moyeu doré + rayons activables ; mobile stack + frise de puces sunburst. Liens Planity. C'est la pièce la plus délicate : prévoir le fallback mobile dès le départ (mobile-first).
8. **Galerie** `salon-04` + `salon-03` asymétrique, filets or, radius 6px.
9. **Split K-Beauty** `salon-05` + bloc expertise, badges or.
10. **Équipe** : 4 médaillons sunburst SVG + initiales Cormorant.
11. **Preuve sociale** : `4,9` géant + halo sunburst + 3 verbatims + vignette `salon-01` petite.
12. **Infos/footer charbon** : adresse, horaires, tel, Instagram, CTA Planity, Maps iframe filtrée, footer wordmark.
13. **Motion** : Motion One + Lenis en ESM, `inView` reveals (0.55s), parallax hero 8%, sunburst load + scroll, `.js-ready` + `@keyframes autoreveal` filet de sécurité.
14. **QA finale** : grep U+2014 = 0 ; contrastes ; zéro hotlink (5 images locales) ; pas de CDN Tailwind play ; mobile-first vérifié sur le cadran ; CTA Planity présents partout.

---

## Checklist avant handoff au builder

- [x] 8 tokens couleur définis (5 cœur + or/wood/turq), contrastes vérifiés, palette émeraude/or/charbon ≠ 3 derniers clients (1 token sable max partagé)
- [x] 2 polices Google Fonts (Cormorant Garamond display + Jost body) avec poids, fidèles au logo réel
- [x] 1 archétype custom nommé + justifié (`rayonnement-sunburst`), non brûlé
- [x] 9 sections ordonnées adaptées aux 4 univers + expertise + preuve
- [x] Geste UI signature détaillé (cadran solaire + sunburst load + rayons-séparateurs), ancré dans le décor réel
- [x] 5 images réelles assignées, 0 placeholder, 0 Unsplash ; scrim permanent prévu
- [x] Motion décrit (durées + easings + stagger), reveals robustes + filet de sécurité
- [x] Google Maps iframe (lat/lng port) prêt ; em-dash interdit rappelé
