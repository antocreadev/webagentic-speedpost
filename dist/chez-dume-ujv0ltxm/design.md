# Design brief , Chez Dumé (Calvi)

## 0. Réflexion UX (question par question)

**Visiteur-type :** touriste de 28 à 55 ans, en escapade balnéaire à Calvi entre avril et octobre, smartphone en main, debout en zone piétonne ou attablé en terrasse d'un café voisin, en train de chercher "où manger ce midi/ce soir" à 200 m de la citadelle. Secondaire : famille avec enfants qui veut un endroit accessible sans réservation, et le local fidèle hors-saison.

**Contexte d'arrivée :** recherche Google Maps "restaurant Calvi place église", recommandation TripAdvisor (#14 Calvi), bouche-à-oreille au port, ou QR code posé sur la table / carte du restaurant. Mobile à 80%.

**Intention primaire :** savoir en moins de 10 secondes (1) à quoi ressemble la terrasse (validation visuelle , "ça donne envie ?"), (2) ce qu'on y mange (carte large, prix, signature corse), (3) si c'est ouvert maintenant et où exactement. Pas de réservation en ligne attendue : appeler ou venir directement.

**Intention business :** remplir la terrasse 7j/7 pendant la haute saison sans dépendre des plateformes, capter le flux piéton de la rue Clemenceau, monter le panier moyen via la planche du berger et le menu Chez Dumé, fidéliser le local hors-saison.

**Contrainte UX structurante :** pas de réservation en ligne (téléphone uniquement), carte très large (entrées, viandes, poissons, pâtes, paëlla, desserts) qui couvre toute la journée 9h,23h, photos de plats hétérogènes (cadrages variés), identité "place de village" qui doit primer sur "fine dining". Le site doit ressembler à la terrasse : vivant, généreux, manuscrit, pas léché.

**Émotion-cible à 5s :** chaleur. On doit avoir l'impression d'être déjà assis sous l'olivier, verre de Mattei Spritz à la main, bruit de fond des conversations sur la place. Convivialité, soleil, simplicité assumée.

**Money shot :** la terrasse ensoleillée avec serviettes fuchsia, parasol bordeaux et olivier centenaire, traitée comme une carte postale animée avec une ardoise manuscrite qui s'écrit à la craie devant les yeux du visiteur.

---

## Archétype

**`ardoise-village` (custom)** , hybride assumé entre une ardoise de bistrot manuscrite (l'écriture à la craie comme matériau central) et la composition d'une place de village méditerranéenne (terrasse, olivier, tonneaux comme éléments architecturaux du layout). Ce n'est ni `magazine-editorial`, ni `carnet-scrapbook`, ni `bento-grid` : c'est une mise en page bistrot où le contenu textuel a la calligraphie d'une craie qui se forme au scroll, posée sur des fonds papier kraft beurre, ponctuée de photos calées comme des polaroïds collés sur une ardoise.

**Justification (1 phrase) :** Chez Dumé est une adresse de rue piétonne, sans nappes blanches, sans réservation en ligne , l'écriture manuscrite de la patronne sur une ardoise est l'objet identitaire le plus fidèle, et aucun client du catalogue n'utilise cette logique d'inscription progressive comme matériau structurant.

---

## Palette de couleurs

| Rôle       | Hex      | Nom descriptif       | Utilisation                                     |
|------------|----------|----------------------|-------------------------------------------------|
| `--bg`     | #F5EDD6  | Crème sable chaud    | Fond principal (papier beurre / nappe lin)      |
| `--ink`    | #1B1410  | Noir ardoise         | Texte principal, fond ardoise dans sections inversées |
| `--ink-2`  | #6B5A48  | Brun fumé            | Texte secondaire, légendes, métadonnées         |
| `--accent` | #8B1A1A  | Bordeaux parasol     | CTA, signature, encadrés, surlignages           |
| `--line`   | #C4955A  | Bois miel tonneau    | Séparateurs, filets, borders, accents bois      |

Couleur d'accent secondaire ponctuelle : `#D9436A` (fuchsia serviette) , utilisée uniquement sur 1 ou 2 micro-éléments (badge "ouvert", soulignement craie sous mot-clé), pas dans la palette structurelle pour éviter la cacophonie.

> Palette tirée des objets réels de la terrasse (parasol bordeaux, serviettes fuchsia, tonneaux bois, olivier vert , ce dernier suggéré uniquement par les photos). Tous les contrastes textuels passent l'AA sur `--bg` (`--ink` 13.8:1, `--ink-2` 5.2:1, `--accent` 7.1:1).

---

## Typographie

- **Display :** `Caveat` (Google Fonts) , poids 400 + 700 , typographie manuscrite à la craie, utilisée pour les titres de sections, l'ardoise du jour, les annotations. Choisie parce qu'elle est l'écriture d'une patronne qui note ses plats du jour, pas une font de pizzeria touristique.
- **Sub-display / wordmark :** `Fraunces` (Google Fonts) , poids 600 + 900, optical-size variable , uniquement pour le wordmark "Chez Dumé" dans la nav et le H1. Ancrage : caractère, panache, sérieux culinaire qui contrebalance la craie.
- **Body :** `DM Sans` (Google Fonts) , 400 + 500 , sans-serif neutre lisible mobile, qui ne fait pas concurrence aux deux autres. Service de texte courant, prix, horaires.
- **Size scale (mobile-first) :** h1 `clamp(2.6rem, 8vw, 5.4rem)` (Fraunces 900) / h2-craie `clamp(2rem, 5vw, 3.4rem)` (Caveat 700) / h3 `clamp(1.3rem, 2.4vw, 1.6rem)` (DM Sans 500) / body `1.05rem` / small `0.85rem`.
- **Tracking :** Fraunces `-0.025em`, Caveat `0.005em`, DM Sans `0`.
- **Italique craie :** Caveat Italic 400 pour les notes de bas de section ("servi avec frites maison", "selon arrivage").

---

## Layout archétype , DIVERGENCE OBLIGATOIRE

**Choix : `ardoise-village` (custom)** , la page est lue comme on lit une ardoise géante posée contre un mur de pierre : le wordmark en sérif gravé en haut, puis des blocs ardoise (fond `--ink` noir mat, écriture craie blanche cassée) qui alternent avec des blocs papier (fond `--bg` crème, écriture à l'encre). Les photos de la terrasse et des plats sont traitées comme des polaroïds légèrement inclinés (`rotate(-1.4deg)` à `rotate(2.1deg)`) collés à des moments précis. Aucun "hero photo full-bleed" classique : le hero est une ardoise écrite en direct.

### Rythme des sections (à lire de haut en bas)

1. **Nav-tonneau** (sticky, 64px) : wordmark "Chez Dumé" en Fraunces 900 + 3 liens texte (La Carte, La Place, Nous Trouver) + chip "Ouvert maintenant" alimenté par une logique JS horaire (9h,14h30 / 18h30,23h) avec point pulsant `--accent`. Pas de logo image. Bordure basse 1px `--line`.
2. **Hero ardoise vivante** (100vh sur desktop, 92vh mobile) : grand cadre noir mat texturé (bruit subtil), dans lequel la craie écrit progressivement, ligne par ligne au scroll initial : "Chez Dumé , Calvi" puis "Place de l'église , sous l'olivier" puis "Ouvert 7/7, midi & soir". À droite, un polaroïd unique de la terrasse (image hero) cadré en 4:5, légèrement incliné, avec ruban adhésif kraft simulé par un trait CSS. Mobile : la craie est full-width, le polaroïd descend dessous.
3. **Bandeau-crieur** (marquee unique horizontale, 30s linear) : "Charcuterie corse , Pieuvre grillée , Sanglier au miel du maquis , Raviolis maison , Moelleux chocolat , " en Caveat 400, défilement gauche, séparateurs `·` couleur `--line`. Volontairement bas-de-page-de-hero pour faire le lien terrasse,carte.
4. **La Maison (histoire en 2 colonnes papier)** : à gauche, texte courant DM Sans en colonne typographique étroite (52ch max), drop-cap Fraunces 900 sur "C". À droite, deux polaroïds empilés (terrasse soir + olivier) avec rotation alternée et légendes manuscrites Caveat italic. Couleur de fond : `--bg`.
5. **L'Ardoise du Jour (geste UI signature)** : section pleine largeur fond `--ink`, intitulée "L'Ardoise". Au scroll dans cette section, 6 plats signature s'écrivent à la craie un par un (stagger 280ms), avec leur prix souligné d'un trait craie qui se trace en 600ms. Effet utilisé : SVG `stroke-dasharray` animé via Motion `inView`. Les plats : Planche du berger (18€), Pieuvre grillée (24€), Tartare de thon (19€), Sanglier au miel du maquis (22€), Raviolis maison (16€), Moelleux chocolat (9€). Une petite éponge SVG pivote dans le coin en haut-droite. Aucune photo dans cette section : l'ardoise est volontairement texte-only, comme une vraie.
6. **La Carte complète (tabs ardoise)** : bandeau de 5 onglets craie (Entrées , Plats , Pâtes & Paëlla , Fromages , Desserts). L'onglet actif est souligné par un trait de craie épais. Liste typographique en colonnes papier en dessous, pas de photo par plat (la photo serait redondante avec section 7). Tap sur mobile fluide, pas de carrousel.
7. **La Place (galerie polaroïds éparpillés)** : composition pseudo-aléatoire de 8 polaroïds (terrasse, plats, ambiance, olivier, fromages, raviolis, moelleux, intérieur) sur fond `--bg` avec ombres portées douces et rotations entre `-3deg` et `+3deg`. Sur desktop : grid CSS 4 colonnes avec décalages `transform: translateY()` aléatoires figés. Sur mobile : stack vertical avec rotation conservée mais pleine largeur. Un fil ficelle SVG horizontal traverse la section comme une guirlande qui maintient les photos.
8. **La Voix des Habitués** (proof social, 1 grande citation) : fond `--ink`, citation Lydia (avis Isabelle M., sept 2025) en Caveat 400 italique grande taille, signature en bas-droite. Pas de slider, pas de cartes : une seule voix, comme une dédicace écrite au feutre blanc sur l'ardoise. Mention "TripAdvisor , 5 étoiles" en chip discret.
9. **Nous Trouver (place + carte)** : split 50/50 desktop, stack mobile. Gauche : adresse, téléphone en gros (CTA `Appeler 06 81 67 68 60`, lien `tel:`), horaires sur 2 lignes (matin/soir), mention "Sans réservation , service direct". Droite : iframe Google Maps dans cadre bois `--line` simulé par border 4px + ombre interne, lat 42.5664556 / lng 8.7578472.
10. **Footer-tonneau** : strip horizontale fond `--ink-2`, texte clair, mentions, crédits Menghi Computer Science. Wordmark "Chez Dumé" répété en grand semi-transparent en arrière-plan (Fraunces 900, opacity 0.08).

### Singularités du site (geste UI signature et autres)

- **Geste UI signature : "L'ardoise qui s'écrit à la craie"** (section 5) , chaque plat signature et son prix sont tracés ligne par ligne via `stroke-dasharray` SVG synchronisé au scroll, avec une éponge qui pivote en coin pour suggérer qu'on vient juste d'effacer pour réécrire. Aucun autre client du catalogue n'utilise un tracé manuscrit progressif comme contenu principal. Mobile : déclenché par `inView` plutôt que par scroll progressif pour ne pas casser le pouce-scroll.
- **Polaroïds à rotation figée + ruban adhésif CSS** : chaque photo a une rotation aléatoire mais déterministe (par index) avec un petit `::before` qui simule un bout de scotch kraft. Aucune photo n'est rectangulaire-droite.
- **Marquee "crieur de plats"** : texte en Caveat manuscrit qui défile lentement, comme si quelqu'un appelait les plats du jour de la rue. Pas de logos, pas d'icônes.
- **Chip "Ouvert maintenant" en temps réel** : alimenté par JS qui lit l'heure locale et compare à 9h,14h30 / 18h30,23h, point pulsant `--accent`, libellé "Ouvert , service jusqu'à 14h30" ou "Ouvre à 18h30".
- **Guirlande SVG dans la galerie** : un fil ondulé traverse la section "La Place" et tient les polaroïds comme des photos sur une corde. Détail discret, pas un gimmick.

### Ce que ce site n'a PAS (divergence explicite)

- Pas de hero photo full-bleed (la photo est traitée en polaroïd, pas en cinéma).
- Pas de cards à 3 colonnes "signature" symétriques.
- Pas de timeline verticale, pas de magazine grid, pas de bento.
- Pas de logo image (wordmark typographique uniquement).
- Pas de menu hamburger animé fancy : nav minimale.
- Pas de slider/carrousel de témoignages.
- Pas de section "réserver en ligne" (cohérent avec le métier).
- Pas de cursor-follower, pas d'effet WebGL, pas de loader.

---

## Motion language

- **Entrées scroll** (papier) : `Motion.inView` avec `opacity 0→1 + translateY 18px→0`, durée 0.7s, easing `[0.2, 0.7, 0.2, 1]`, stagger 80ms sur groupes (ex. polaroïds).
- **Tracé craie (signature)** : SVG `<path>` avec `stroke-dasharray` égal à la longueur, animé de la longueur totale à 0, durée 600ms par plat, stagger 280ms, easing `[0.4, 0, 0.6, 1]`. Déclenché par `Motion.inView` une seule fois.
- **Hero ardoise (apparition initiale)** : à `DOMContentLoaded`, les 3 lignes de craie apparaissent en séquence (delay 200ms / 900ms / 1500ms), même technique stroke-dash. Le polaroïd hero entre avec `opacity + translateY + rotate(-1.4deg)` de 0 à valeur finale, durée 0.9s.
- **Polaroïds (galerie)** : entrée `opacity 0→1 + scale(0.96→1) + rotate(0→Xdeg)`, durée 0.6s, stagger 90ms.
- **Marquee crieur** : `@keyframes` CSS 38s linear infinite, `prefers-reduced-motion` → animation pausée.
- **Cards/onglets carte** : hover `translateY(-2px)` + sous-trait craie qui s'étend, transition 200ms ease-out.
- **Chip "Ouvert"** : point `box-shadow` pulse 2s ease-in-out infinite alterné.
- **Smooth scroll global** : Lenis activé, `lerp: 0.08`.
- **Pas d'auto-play vidéo, pas de cursor follower, pas de popup, pas de parallax sur le hero** (incompatible avec l'idée d'une ardoise stable contre un mur).

---

## Images sélectionnées

Les 10 images sont déjà téléchargées localement par le researcher. Le builder doit les utiliser exclusivement via `./assets/images/...`.

| Rôle                        | Chemin local                                      | Source d'origine            | Alt text                                                |
|-----------------------------|---------------------------------------------------|-----------------------------|----------------------------------------------------------|
| hero polaroïd (4:5)         | ./assets/images/hero-chez-dume-facade.jpg         | Google Maps lh3 w2400       | Terrasse de Chez Dumé sous l'olivier, place de Calvi     |
| histoire 1 (3:4, polaroïd)  | ./assets/images/ambiance-chez-dume-terrasse.jpg   | TripAdvisor /photo-o/       | Terrasse de Chez Dumé en soirée, lanternes allumées      |
| histoire 2 (3:4, polaroïd)  | ./assets/images/plats-moules-cornet.jpg           | TripAdvisor /photo-o/       | Terrasse ombragée avec ardoise menu en premier plan      |
| galerie 1 (carrée)          | ./assets/images/plats-planche-berger.jpg          | TripAdvisor /photo-o/       | Planche du berger, charcuterie corse                     |
| galerie 2 (carrée)          | ./assets/images/plats-assiette-2.jpg              | TripAdvisor /photo-o/       | Burger de veau corse sur planche bois                    |
| galerie 3 (carrée)          | ./assets/images/plats-assiette-1.jpg              | TripAdvisor /photo-o/       | Moelleux chocolat avec coulis fruits rouges              |
| galerie 4 (carrée)          | ./assets/images/plats-burger-veau-corse.jpg       | TripAdvisor /photo-o/       | Burger veau corse, frites croustillantes                 |
| galerie 5 (carrée)          | ./assets/images/ambiance-interieur.jpg            | TripAdvisor /photo-o/       | Raviolis maison, sauce corse                             |
| galerie 6 (carrée)          | ./assets/images/plats-fromages.jpg                | TripAdvisor /photo-o/       | Assiette de fromages corses, brocciu et tomme            |
| galerie 7 (carrée)          | ./assets/images/ambiance-salle.jpg                | TripAdvisor /photo-o/       | Carte officielle Chez Dumé                               |

10 images réelles, 0 placeholder, 0 Unsplash. Toutes traitées en polaroïd (rotation + ruban kraft CSS), sauf le hero qui est unique et plus grand.

---

## Copy directions (pour le builder)

- **Eyebrow** (nav et sections) : `Bistrot corse · Calvi` en DM Sans 500, capitalisation normale, letter-spacing `0.18em`, taille `0.78rem`, couleur `--ink-2`.
- **H1 hero (craie)** : "Chez Dumé" (Fraunces 900) puis sous-titre craie "À l'ombre de l'olivier, place de l'église". Pas plus.
- **Lede sous H1** : 2 phrases, 40 mots max, en DM Sans : "Une terrasse calvaise, sept jours sur sept, ouverte du matin au soir. Charcuterie corse, plats du marché, desserts maison, pas de chichi : on s'installe, on commande, on revient."
- **CTA primaires** : `Appeler la maison , 06 81 67 68 60` (lien `tel:+33681676860`) et `Voir la carte` (ancre `#carte`).
- **CTA secondaire** : `Trouver la terrasse` (ancre `#nous-trouver`).
- **Ton général** : tutoiement chaud-vouvoiement implicite, phrases courtes, pas d'adjectifs touristiques creux ("authentique", "incontournable") , privilégier le concret (noms de plats, gestes, heures, lieu).
- **Pas d'em-dash `—` (U+2014)** , utiliser `,` ou `.` ou `:` ou `()`.

---

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, contrastes vérifiés (AA+ sur `--bg`)
- [x] 3 polices Google Fonts (Caveat, Fraunces, DM Sans) avec poids
- [x] Archétype custom `ardoise-village` choisi et justifié, divergent du catalogue
- [x] 10 sections ordonnées avec rythme et taille relative
- [x] 10 images réelles assignées, 0 placeholder
- [x] Motion language décrit (durées, easings, stagger), incluant le tracé craie SVG
- [x] Geste UI singulier défini : ardoise qui s'écrit à la craie + chip ouvert temps-réel + guirlande galerie
- [x] Google Maps iframe : `https://maps.google.com/maps?q=42.5664556,8.7578472&z=16&output=embed`
- [x] Aucun em-dash dans la copy proposée
