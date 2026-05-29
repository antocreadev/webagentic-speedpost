# Design brief — ESPACE JC COIFFURE (Bastia)

> Salon de coiffure mixte tenu par Jean-Michel Pomier, coiffeur **visagiste**, ouvert depuis 2006 (20 ans) au 28 Rue César Campinchi, Bastia. Note Google 4.8/5 (16 avis 5★ sur 17). Sans rendez-vous possible. Aucune vraie photo intérieure : le design ne doit PAS sur-reposer sur la photo, il doit porter le sens par la **typographie, la géométrie du visage et un geste UI signature**.

---

## 0. Réflexion UX (question par question)

**Visiteur-type :** Une Bastiaise de 28-55 ans, active, qui passe rue César Campinchi ou cherche « coiffeur Bastia centre » sur son téléphone à l'heure du déjeuner ou en fin de journée. Secondairement : une future mariée qui prépare son jour J, et un homme/parent du quartier qui veut une coupe rapide sans rendez-vous. Device majoritaire : **mobile, en marchant**.

**Contexte d'arrivée :** Recherche Google locale (« coiffeur visagiste Bastia », « coiffeur sans rdv Bastia centre »), recommandation d'une amie, ou réponse d'une IA à « bon coiffeur à Bastia ». Le visiteur ne connaît souvent PAS encore le nom du salon : il cherche une compétence et une proximité, pas une marque.

**Intention primaire :** Vérifier en 5 secondes que (1) c'est un vrai professionnel de confiance, pas une chaîne anonyme, (2) c'est tout près / accessible maintenant (sans rdv), (3) appeler ou trouver le chemin. L'action n°1 du site est **appeler** ou **voir où c'est**.

**Intention business :** Asseoir l'autorité du visagiste (monter la perception de valeur au-delà de la « coupe à 15€ »), convertir le flux piéton du centre-ville et les recherches Google en appels, et capter les contrats premium « coiffure de mariage ». Transformer 20 ans de bouche-à-oreille invisible en preuve numérique visible.

**Contrainte UX structurante :** **Zéro vraie photo intérieure exploitable.** Les seules images sont des Unsplash génériques de salon moderne + une façade Street View basse résolution. Le design ne peut donc PAS être photo-driven. Il doit tenir debout sur la **typographie expressive, la composition et le geste UI**. Deuxième contrainte : pas de réservation en ligne (sans rdv + téléphone uniquement) : le CTA est le téléphone, pas un formulaire.

**Émotion-cible à 5s :** **Précision habitée par la chaleur.** Le sentiment d'entrer dans l'atelier d'un artisan qui sait lire un visage : sophistiqué mais pas froid, expert mais accueillant. Ni salon de franchise clinquant, ni barbershop hipster. Un atelier de visagiste de quartier, niveau couture.

**Money shot :** Pas une photo. Un **portrait géométrique vectoriel d'un visage** parcouru de **lignes de coupe / lignes de construction du visagiste** (axes de symétrie, tiers du visage, ligne de mâchoire), accompagné du wordmark et de la phrase manifeste « On ne coupe pas des cheveux, on dessine un visage. ». La géométrie du visagiste EST l'identité visuelle.

---

## Archétype

**`atelier-visagiste` (custom)** — un croisement assumé entre la planche d'étude morphologique (les lignes de construction d'un visage tracées au crayon par un portraitiste) et la fiche d'atelier de couture. La page se lit comme **l'étude d'un visage par un visagiste** : chaque section ajoute un trait de construction.

Justification : (1) le métier réel de JC n'est pas « coiffeur » mais **visagiste**, soit quelqu'un qui analyse la morphologie avant de couper : la géométrie du visage est donc le matériau littéral du design. (2) Faute de photos, c'est cette grammaire graphique (lignes de construction, axes, repères) qui porte le luxe et la singularité. (3) Aucun des 14 archétypes brûlés (maritime, carnet-route, arcade-keystone, scorecard, livre-de-bord, magazine-Gault&Millau, timeline-50-ans, etc.) n'utilise de portrait vectoriel ni de lignes morphologiques : divergence totale.

---

## Palette de couleurs

### Directions explorées avant de fixer (4 directions opposées)

1. **Noir profond + or champagne** (beauté parisienne dramatique) : risque cliché « salon de luxe » + lourd en light mode.
2. **Cottagecore rosé poudré + sauge** : trop doux, contredit la précision du geste visagiste.
3. **Blanc glacé froid + ardoise + accent argent métal froid** ← directionnel retenu, ajusté.
4. **Brutalist mono noir/blanc + un seul accent rouge sang** : trop agressif pour une clientèle de quartier fidèle.

### Palette retenue : blanc glacé froid + ardoise + accent terracotta-rosé chaud

| Rôle       | Hex       | Nom descriptif        | Utilisation                                                     |
|------------|-----------|-----------------------|----------------------------------------------------------------|
| `--bg`     | `#F2F1EE` | Blanc gypse           | Fond principal, blanc cassé froid légèrement gris (≠ cream warm) |
| `--ink`    | `#16181C` | Ardoise encre         | Texte, lignes de construction du visage, wordmark              |
| `--ink-2`  | `#6B6F76` | Gris graphite         | Texte secondaire, légendes, repères morphologiques            |
| `--accent` | `#B66E5A` | Terre de sienne rosée | CTA, traits de coupe, soulignages, point d'or du compteur      |
| `--line`   | `#D7D4CD` | Trait crayon estompé  | Séparateurs, axes de construction au repos, borders cards     |

> **Pourquoi cette palette n'est PAS celle des 3 derniers clients.**
>
> | Token | La Voûte (arcade) | Le Bowling (scorecard) | Le Nautic (carte marine) | **JC Coiffure** |
> |-------|-------------------|------------------------|--------------------------|-----------------|
> | `--bg` | `#F4EDE0` pierre chaude | `#FAF4E6` crème vieillie | `#F4EFE3` parchemin | **`#F2F1EE` gypse froid gris** |
> | `--ink` | `#1C1714` basalte | `#0E2A3C` marine | `#0E2A3A` marine | **`#16181C` ardoise neutre** |
> | `--accent` | `#B9452A` rouge brique | `#E85A3C` corail | `#C0502A` terre Balagne | **`#B66E5A` sienne rosée désaturée** |
>
> Les trois précédents sont des fonds **chauds/parchemin** (jaune-beige). JC Coiffure rompt avec un fond **froid légèrement gris-perle** (gypse), une encre **neutre froide** (pas bleu-marine ni basalte brun), et un accent **terracotta-rosé désaturé et clair** (peau/blush plutôt que brique-feu). Zéro token repris. La sienne rosée évoque le teint, la peau, le blush appliqué après la coupe : ancrage métier direct, et non un rouge méditerranéen de restaurant.
>
> Justification token par token :
> - `--bg` gypse froid : la lumière clinique mais douce d'un miroir de salon, un blanc qui n'est ni cream-IA ni blanc clinique pur.
> - `--ink` ardoise : le crayon gras du portraitiste qui trace les lignes de construction du visage.
> - `--accent` sienne rosée : le teint, le blush, la chaleur humaine du geste, contre la froideur du blanc.
> - `--line` crayon estompé : les axes de construction tracés légèrement, comme une esquisse pas encore appuyée.
>
> Contrastes AA sur `--bg` (#F2F1EE) : `--ink` #16181C = 15.1:1 (AAA) ; `--ink-2` #6B6F76 = 4.6:1 (AA) ; `--accent` #B66E5A = 3.6:1 (réservé aux titres ≥ 24px, gros chiffres, soulignages décoratifs ; jamais en petit corps de texte). `--line` décoratif.

---

## Typographie

Paire mode/éditorial expressive, choisie pour évoquer une planche de couture et une signature manuscrite, et pour diverger des paires Fraunces utilisées partout ailleurs dans le catalogue.

- **Display :** `Bodoni Moda` (Google Fonts) — poids 400 + 600 + 700, et **italic** pour les accents. Le Bodoni est la typo de la mode (Vogue, Harper's) : contraste extrême plein/délié, axe vertical, élégance couture. Il porte l'autorité du visagiste sans cliché « luxe doré ». Réservé aux H1/H2 et au wordmark.
- **Body :** `Inter` (Google Fonts) — 400 + 500 — neutre, ultra-lisible sur mobile, laisse toute la place au Bodoni de briller. Tracking légèrement négatif sur les gros titres.
- **Accent manuscrit (ponctuel) :** `Reenie Beanie` ou `Caveat` (Google Fonts) — 400 — pour les **annotations de visagiste** posées sur les axes du portrait (ex. « ligne de mâchoire », « tiers supérieur », « point d'équilibre »), comme des notes au crayon sur une planche d'étude. Usage strictement décoratif, jamais en bloc de texte.

**Size scale (mobile-first) :**
- Wordmark hero : `clamp(3.2rem, 13vw, 8.5rem)` Bodoni 700, tracking `-0.03em`
- h1 manifeste : `clamp(2.2rem, 6vw, 4rem)` Bodoni 600
- h2 sections : `clamp(1.7rem, 4vw, 2.6rem)` Bodoni 600
- Body : `1.05rem` Inter 400, line-height 1.65
- Small / légendes : `0.82rem` Inter 500, letter-spacing `0.08em`, uppercase
- Annotations crayon : `1.1rem` Caveat, `--ink-2`

---

## Layout archétype

**Choix : `atelier-visagiste`** — la page se construit comme l'étude d'un visage. Un **portrait vectoriel central** (SVG) sert de fil conducteur récurrent, et les sections sont des « repères de construction » qui s'ajoutent. Divergence : aucun site du catalogue n'a de hero typographique XXL sans photo couplé à un portrait géométrique ; les autres sont photo-first, arches, scorecards ou cartes marines.

### Rythme des sections (à lire de haut en bas)

1. **`nav-fil`** : barre fine, fond `--bg`, wordmark « JC » à gauche en Bodoni, à droite 3 liens (`Le visagiste` · `Prestations` · `Trouver`) + un bouton accent « 04 95 37 29 40 ». Sur mobile, le bouton téléphone devient un dock flottant bottom fixe (intention primaire = appeler). Une fine ligne `--line` sous la nav comme un axe horizontal de construction.

2. **`hero-portrait`** (≈92vh) : **money shot**. Fond gypse. À droite (desktop) / en filigrane derrière le texte (mobile) : un **portrait de profil vectoriel** trait `--ink` 1.4px (SVG inline ~520px), parcouru des **lignes de construction du visagiste** (axe vertical de symétrie, lignes des tiers, ligne de mâchoire, cercle de l'œil) tracées en `--line`, avec annotations crayon Caveat. À gauche : eyebrow « SALON DE COIFFURE · VISAGISTE · BASTIA DEPUIS 2006 », wordmark « ESPACE JC » en Bodoni XXL, manifeste « On ne coupe pas des cheveux, on dessine un visage. », 2 CTA (`Appeler le salon` accent plein / `Trouver le salon` outline). Pas de photo ici : la géométrie fait tout le travail.

3. **`compteur-construction`** (bandeau) : trois grands chiffres en Bodoni qui se tracent/comptent à l'apparition : **20** ans rue César Campinchi · **4,8/5** sur Google · **17** voix, **16** cinq étoiles. Séparés par des fins traits `--line` verticaux. Preuve sociale chiffrée, positive uniquement.

4. **`le-visagiste`** (histoire) : 2 colonnes inégales (3/5 texte, 2/5 visuel). Texte : qui est Jean-Michel Pomier, 20 ans, le métier de visagiste expliqué simplement (« lire un visage avant de couper »). Visuel : `interieur-fauteuil-miroir.jpg` recadré 4/5 portrait, encadré d'un **filet `--line` 1px** + une **annotation crayon** « le fauteuil, depuis 2006 ». Drop-cap Bodoni sur la première lettre du texte.

5. **`les-tiers`** (signature / prestations) : section structurée par les **trois tiers du visage** (référence directe au canon du visagiste). Trois blocs empilés numérotés en chiffres romains tracés au crayon (I / II / III) :
   - **I. La coupe & le geste** : coupe femme/homme/enfant, style change ou rafraîchissement, brushing, le conseil morphologie.
   - **II. La couleur & la matière** : coloration, balayage, mèches, permanente, lissage.
   - **III. Le jour J** : coiffures de mariage, essais, occasions. Bloc premium, accent plus présent.
   Chaque bloc révèle, à l'apparition, un **trait de construction `--accent`** qui souligne son titre (le geste de coupe). Pas de prix affichés (sans rdv, devis sur place).

6. **`sans-rendez-vous`** (différenciateur) : bandeau pleine largeur fond `--ink` (inversion light→sombre ponctuelle pour respiration), texte `--bg`, une seule phrase Bodoni : « Passez quand vous voulez. Sans rendez-vous, c'est possible. » + rappel des horaires en Inter mono-spaced. Le seul moment sombre de la page, comme une coupure nette.

7. **`paroles`** (proof social) : 2 à 3 citations 5★ statiques (pas de carousel), chacune dans un cartouche `--bg` bordé `--line`, étoiles `--accent`, attribution « Avis Google ». Sélection des verbatims positifs uniquement.

8. **`trouver`** (infos + Maps) : split 50/50 desktop, stack mobile. Gauche : « Au cœur de Bastia » Bodoni, adresse 28 Rue César Campinchi, « à 2 min de la Place Saint-Nicolas », téléphone XL cliquable `04 95 37 29 40`, horaires en liste Inter (Mar–Sam 9h-18h30, Mer 8h30-12h, fermé Lun & Dim). Droite : Google Maps iframe avec filtre CSS léger `grayscale(0.3) contrast(0.98)` pour s'harmoniser au gypse, encadré filet `--line`. La façade Street View basse-déf `facade-rue-campinchi.jpg` n'est PAS utilisée en grand : tolérée seulement en petite vignette ronde « la devanture » à côté de l'adresse, ou pas du tout.

9. **`footer-signature`** : le **portrait vectoriel du hero réapparaît**, réduit et achevé (toutes les lignes de construction tracées), comme l'étude terminée. Wordmark « ESPACE JC COIFFURE », rappel adresse + téléphone, mention « Coiffeur visagiste à Bastia depuis 2006 ». Une ligne fine `--line` ferme la page comme le dernier axe.

### Singularités du site (que personne d'autre n'aura)

- **Le portrait vectoriel à lignes de construction de visagiste** : SVG d'un profil parcouru d'axes morphologiques (symétrie, tiers, mâchoire, point d'équilibre), avec annotations manuscrites Caveat. C'est l'identité entière du site et le money shot, en l'absence de photos.
- **Geste UI signature : le « tracé de coupe »** (détaillé ci-dessous) : un trait `--accent` qui se dessine comme un coup de ciseau au scroll.
- **Sections structurées par les trois tiers du visage** (I/II/III), canon littéral du métier de visagiste, en chiffres romains crayonnés.
- **Compteur de construction 20 / 4,8 / 17** dont les chiffres se « tracent » au Bodoni à l'apparition.
- **Une seule inversion sombre** (section sans-rendez-vous) comme un coup de ciseau net dans une page entièrement claire.

### Ce que ce site n'a PAS (divergence explicite)

- **Pas de hero photo** (contrainte : aucune vraie photo intérieure ; et divergence des sites photo-first du catalogue).
- **Pas de marquee défilant.**
- **Pas de carousel d'avis** (citations statiques).
- **Pas de grille de cartes « 3 services » génériques** : remplacée par les trois tiers du visage empilés.
- **Pas de palette warm/parchemin** comme les 3 derniers clients : fond froid gypse.
- **Pas de prix affichés** (cohérent sans-rdv / devis sur place).

---

## Geste UI signature — « le tracé de coupe »

**Concept :** chaque titre de section principal est souligné non par une bordure statique, mais par un **trait `--accent` qui se dessine de gauche à droite** au moment où la section entre dans le viewport, comme un coup de ciseau / un trait de crayon du visagiste qui valide la ligne. Et le **portrait vectoriel du hero voit ses lignes de construction se tracer une à une** au chargement.

**Implémentation (SVG + Motion One, zéro lib externe) :**

- Chaque souligné = un `<path>` ou `<line>` SVG avec `stroke-dasharray` = longueur totale, `stroke-dashoffset` = longueur (invisible au repos). À l'`inView`, animer `stroke-dashoffset → 0` sur **0.5s**, easing `[0.2, 0.7, 0.2, 1]`. Stroke `--accent`, width 2.5px, `stroke-linecap: round` (pointe de ciseau).
- **Portrait hero** : le profil et chaque ligne de construction sont des `<path>` séparés ; au chargement (après `.js-ready`), ils se tracent en séquence stagger **90ms** : d'abord le profil (0.7s), puis l'axe de symétrie, les tiers, la mâchoire, le cercle de l'œil. Les annotations Caveat font un fade-in `opacity 0→1 + translateY 6px` 0.4s après le trait qu'elles désignent.
- **Filet de sécurité** : `[data-reveal]{opacity:0}` conditionné par `.js-ready` ; `@keyframes autoreveal` force `opacity:1` + `stroke-dashoffset:0` après 0.6s si Motion plante. Le portrait SVG a aussi un état CSS final dashoffset:0 par défaut écrasé par le JS.

**Geste UI secondaire — « repère morphologique au survol »** : au hover sur un des trois tiers (desktop), une fine ligne `--line` horizontale traverse le bloc avec un petit label Caveat (« tiers supérieur » / « tiers médian » / « tiers inférieur »), rappelant la lecture du visage. Transition 200ms. Sur mobile : ces labels sont visibles d'emblée, discrets.

---

## Motion language

- **Entrées scroll** : `Motion.inView`, `opacity 0→1 + translateY 22px→0`, durée **0.5s**, easing `[0.2,0.7,0.2,1]`, stagger **60ms** sur les groupes (les trois tiers, les chiffres du compteur).
- **Tracés de coupe** : `stroke-dashoffset → 0`, 0.5s, à l'`inView` (voir geste signature).
- **Portrait hero** : séquence de tracés au chargement, stagger 90ms (voir geste signature). Pas de parallax photo (pas de photo).
- **Compteur** : les chiffres comptent de 0 à valeur (20, 4.8, 17) sur 0.9s à l'apparition, ease-out, en Bodoni.
- **Cards / cartouches d'avis hover** : `translateY(-3px)` + shadow douce, 180ms.
- **Section sombre** : simple fade du fond `--bg → --ink` au scroll-in, 0.6s, pas d'effet lourd.
- **Smooth scroll global** : Lenis actif, lerp doux.
- **Interdits** : pas d'auto-play vidéo, pas de cursor follower, pas de popup, pas de reveal > 0.6s.

---

## Images sélectionnées

Contrainte forte : **aucune vraie photo du salon**. Le design est conçu pour tenir sans photo (typo + SVG portrait). Les Unsplash servent d'ambiance secondaire uniquement, jamais en hero. À remplacer par de vraies photos après signature.

| Rôle | Chemin local | Source (origine) | Alt text | Note |
|------|--------------|------------------|----------|------|
| histoire (4:5) | `./assets/images/interieur-fauteuil-miroir.jpg` | Unsplash photo-1626379501846 | Le fauteuil du salon, miroir et lumière | Démo, à remplacer |
| ambiance section tiers I (16:9) | `./assets/images/hero-salon-chaises.jpg` | Unsplash photo-1600948836101 | Chaises et miroirs du salon | Démo, usage discret |
| ambiance tiers II (16:9) | `./assets/images/salon-produits-modernes.jpg` | Unsplash photo-1746723378067 | Produits et matières de coloration | Démo |
| ambiance tiers III / mariage (4:5) | `./assets/images/experience-coiffure.jpg` | Unsplash photo-1695527081848 | Coiffage soigné, occasion spéciale | Démo, portrait vertical |
| optionnel section services | `./assets/images/coiffeuse-salon-blanc.jpg` | Unsplash photo-1626383137804 | Espace de coiffage clair | Démo, en réserve |
| vignette devanture (1:1, petite) | `./assets/images/facade-rue-campinchi.jpg` | Street View | Devanture rue César Campinchi | **Basse déf (1024×614) : uniquement en petite vignette ronde ou non utilisée. Jamais en grand.** |

**Le money shot n'est PAS une image fichier mais le SVG portrait inline** (à coder par le builder). Aucun placeholder `placehold.co` requis : le SVG remplace l'absence de photo hero.

Toutes les images Unsplash sont en **traitement neutre** (`grayscale(0.15) contrast(0.97)`) pour s'harmoniser au gypse froid et éviter qu'elles « jurent » avec l'identité graphique trait-noir. Scrim permanent + text-shadow obligatoires si un texte est posé dessus (peu probable ici : on évite le texte sur photo).

---

## Copy directions (pour le builder)

- **Eyebrow :** `SALON DE COIFFURE · VISAGISTE · BASTIA DEPUIS 2006` (uppercase, letter-spaced, `--ink-2`)
- **Wordmark H1 :** `ESPACE JC` (Bodoni XXL) puis sous-ligne `COIFFURE`
- **Manifeste hero :** « On ne coupe pas des cheveux, on dessine un visage. »
- **Lede hero (≈40 mots) :** « Depuis 2006, rue César Campinchi, Jean-Michel Pomier lit chaque visage avant de poser le ciseau. Coupe, couleur, mariage : un geste de visagiste, un accueil de quartier, à deux pas de la Place Saint-Nicolas. »
- **Compteur :** `20 ans rue César Campinchi` · `4,8 / 5 sur Google` · `17 voix, 16 cinq étoiles`
- **Titre histoire :** « Le visagiste »
- **Titres prestations :** « I. La coupe & le geste » / « II. La couleur & la matière » / « III. Le jour J »
- **Bandeau sombre :** « Passez quand vous voulez. Sans rendez-vous, c'est possible. »
- **CTA primaire :** `Appeler le salon` (tel:+33495372940)
- **CTA secondaire :** `Trouver le salon` (ancre vers Maps)
- **Annotations crayon (Caveat) :** « ligne de mâchoire », « axe de symétrie », « tiers supérieur », « le fauteuil, depuis 2006 », « point d'équilibre »
- **Interdits copy :** aucun em-dash `—` (U+2014) ; jamais le 1★ ni de négatif ; pas de prix inventés ; pas de « SpeedPost » dans le contenu visible (c'est le site du salon).

---

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, contrastes AA vérifiés sur `--bg` froid (≠ palette des 3 derniers)
- [x] Paire Google Fonts nommée : Bodoni Moda (display) + Inter (body) + Caveat (annotations), poids précisés
- [x] Archétype custom `atelier-visagiste` choisi + justifié, hors blacklist
- [x] 9 sections ordonnées, hero sans photo (contrainte) avec money shot SVG portrait
- [x] Geste UI signature « tracé de coupe » + secondaire « repère morphologique » détaillés (SVG + Motion, zéro lib)
- [x] Images réelles : 0 vraie photo du salon ; 5 Unsplash démo en ambiance secondaire + 1 Street View en vignette discrète ; money shot = SVG inline
- [x] Motion décrit (durées 0.5-0.9s, easing, stagger)
- [x] Google Maps iframe : `q=42.700,9.450` à confirmer sur la ligne CSV (lat/lng exacts du 28 Rue César Campinchi) ; `&z=16&output=embed`
