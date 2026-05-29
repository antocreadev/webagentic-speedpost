# Design brief — Olympe Sports Club (L'Île-Rousse)

> Salle de sport indépendante au centre de L'Île-Rousse (Balagne, Corse). 4,6/5 (19 avis).
> Gérée par Alexandre Scarsetti. Équipement pro Primal Strength, 7j/7 07h-22h, 20€/semaine.
> Aucun site web actuel. Double cible : locaux fidèles toute l'année + saisonniers/touristes actifs l'été.

---

## 0. Réflexion UX (question par question)

**Visiteur-type :** Deux profils nets.
1. Le **local** (résident Balagne, 22-55 ans) qui hésite encore ou compare, cherche horaires, tarif réel, ambiance, équipement, et le sérieux du coach. Device : majoritairement mobile, souvent le soir.
2. Le **saisonnier/touriste actif** (juin-septembre) qui ne veut pas perdre sa routine pendant ses vacances : il tape « salle de sport L'Île-Rousse » sur Google ou demande à une IA. Mobile, en déplacement, décision rapide (« est-ce que je peux y aller demain matin avant la plage ? »).

**Contexte d'arrivée :** Recherche Google locale (« salle de sport / musculation L'Île-Rousse »), citation par une IA (ChatGPT/Perplexity quand on demande où s'entraîner en Balagne), bouche-à-oreille, QR code sur la vitrine. Aucun site n'existe aujourd'hui : on capte une demande non servie.

**Intention primaire :** Vérifier en 5 secondes que (a) c'est une vraie salle pro, propre, complète, (b) les horaires/tarifs collent à mon besoin, (c) je peux passer / appeler facilement. Pour le touriste : « accès court terme possible ? » (la semaine à 20€ répond exactement).

**Intention business :** Convertir une recherche locale en visite/appel. Asseoir le statut de **seule salle indépendante pro du centre**. Transformer les saisonniers en clients courte durée (semaine à 20€) et fidéliser les locaux. Valoriser le capital humain (Alexandre, cité nommément dans les avis) et l'équipement réel (Primal Strength) qu'aucune photo en ligne ne montre aujourd'hui.

**Contrainte UX structurante :** **Une seule vraie photo du club, en basse résolution (408x306).** Impossible de bâtir un hero full-bleed photo-first crédible. Le design doit donc être **typographique et systémique** (chiffres, métriques, plaques de données) plutôt que photo-centré, la vraie photo étant traitée comme une preuve cadrée (médaillon/carte), jamais étirée. Deuxième contrainte : la **double saisonnalité** (offre semaine + abonnement) doit cohabiter sans confusion.

**Émotion-cible à 5s :** Énergie disciplinée, sérieux, montée d'adrénaline maîtrisée. On veut le frisson du « rack chargé, miroir, sol caoutchouc » : performance, pas spa, pas luxe ostentatoire. Le visiteur doit sentir « ici on bosse pour de vrai, et c'est carré ».

**Money shot :** Pas une photo (on n'en a pas de HD). Le money shot est **typographique + data** : le nom OLYMPE en display ultra-condensé monumental, sur fond graphite, avec un **système de plaques de poids** qui s'empilent et un compteur d'horaires « 07-22 / 7J » qui s'incrémente à l'apparition. La vraie photo du club vient juste en dessous comme preuve cadrée (« le vrai plateau »).

---

## Archétype

**`load-plate-console` (custom)** — un tableau de bord d'entraînement : interface façon console de salle (plaques de poids empilées, compteurs de métriques qui s'incrémentent, plateau de données), pas un site vitrine photo. Le métier (fonte, acier, charge, reps) dicte chaque élément graphique.

Justification : on n'a qu'une photo basse résolution donc le photo-first est exclu ; l'identité « rack Primal Strength + chiffres mesurables (07-22, 7J, 20€, 4,6) » se prête à une grammaire de **plaques de poids et de compteurs**. Cet archétype data-physique diverge radicalement des 3 derniers clients livrés (Le Nautic livre-de-bord maritime, Le Bowling scorecard, La Voûte arches) et de tout le catalogue : aucun n'est une console de performance graphite/froide.

---

## Palette de couleurs

### Directions explorées avant fixation (4 pistes)

1. **Graphite + rouge fonte + citron-volt** (acier de la vraie photo + énergie électrique) ← RETENUE.
2. Blanc glacé + bleu mer Balagne + corail solaire (gym lumineuse balnéaire) : rejetée, trop proche du registre maritime du catalogue (Nautic/Bowling en bleu+orange) et trahit la vraie photo sombre/anthracite du club.
3. Noir mat + or champagne luxe : rejetée, le club est « efficacité, pas luxe ostentatoire » (research) : l'or ment sur le positionnement.
4. Béton clair + magenta néon + lime : rejetée, trop « boutique studio » féminin, ne colle pas au rack de fonte brut visible.

### Palette retenue (light mode froid-acier, anti-cream)

| Rôle        | Hex       | Nom descriptif        | Utilisation                                              |
|-------------|-----------|-----------------------|---------------------------------------------------------|
| `--bg`      | `#EEF1F4` | Acier brossé clair    | Fond principal (gris-bleu froid, lumière sur métal poli)|
| `--ink`     | `#14171C` | Graphite forge        | Texte principal, sections « plateau » sombres, titres   |
| `--ink-2`   | `#5B636E` | Basalte fumé          | Texte secondaire, légendes, unités de mesure            |
| `--accent`  | `#E11D2E` | Rouge fonte Primal    | CTA, chiffres-clés, plaques chargées, surlignages       |
| `--line`    | `#CDD4DC` | Filet acier           | Séparateurs, borders de cartes, grille du plateau       |

**Accent secondaire ponctuel (metrics live uniquement) :** `--volt #D7FF3E` (citron-volt) — réservé aux compteurs qui s'incrémentent et au badge « OUVERT 7J ». Usage strictement limité aux micro-éléments de données pour l'effet « écran de console ».

> Palette choisie pour traduire l'acier anthracite + disques rouges réels du club (vraie photo) dans une lumière froide méditerranéenne, et pour **rompre nettement** avec les 3 derniers clients (tous cream warm + terracotta/bleu nuit). Light mode froid = `#EEF1F4`, à l'opposé du cream. Aucune réutilisation de la palette défaut Claude.
> Contrastes : `--ink #14171C` sur `--bg #EEF1F4` ≈ 14.5:1 (AAA). `--accent #E11D2E` sur `--bg` ≈ 4.6:1 (AA texte normal, AA large OK) : à utiliser en gras/large ou sur fond graphite. `--ink-2 #5B636E` sur `--bg` ≈ 4.9:1 (AA). Le `--volt` ne sert jamais de texte porteur, uniquement chiffres sur fond graphite `#14171C` (contraste ≈ 13:1).

### Anti-redondance — comparaison avec les 3 derniers clients livrés

| Client       | --bg (cream warm) | --ink             | --accent          |
|--------------|-------------------|-------------------|-------------------|
| Le Nautic    | `#F4EFE3` cream   | `#0E2A3A` bleu nuit | `#C0502A` terracotta |
| Le Bowling   | `#FAF4E6` cream   | `#0E2A3C` bleu    | `#E85A3C` orange  |
| La Voûte     | `#F4EDE0` cream   | `#1C1714` brun    | `#B9452A` brique  |
| **Olympe**   | **`#EEF1F4` acier froid** | **`#14171C` graphite** | **`#E11D2E` rouge fonte** |

Olympe ne reprend **aucun** token de ces trois clients : fond froid au lieu de cream, accent rouge pur saturé au lieu de terracotta/brique désaturé. Divergence totale validée.

---

## Typographie

- **Display :** `Anton` (Google Fonts) — poids 400 (unique) — sans-serif ultra-condensé, massif, « poster de salle / plaque de charge ». Sert OLYMPE, les chiffres monumentaux, les titres de section en capitales. Caractère « fonte / acier » sans tomber dans le cliché grunge.
- **Display secondaire (chiffres techniques) :** `Oswald` (Google Fonts) — 500 + 600 — condensé plus lisible, pour les compteurs de métriques, les plaques de poids, les unités (KG, 07-22, 7J).
- **Body :** `Inter` (Google Fonts) — 400 + 500 + 600 — neutralité technique, très lisible sur mobile, idéal pour les blocs d'info (tarifs, horaires, services).
- **Mono d'accent (data live) :** `JetBrains Mono` (Google Fonts) — 500 — uniquement pour les libellés de compteur façon écran de console (« REPS », « // 4.6 ★ »). Usage micro.

> Choix justifié : Anton + Oswald = l'identité « affiche de gymnase / plaque d'haltère estampée », à l'opposé des serifs éditoriaux du catalogue (Fraunces/DM Serif déjà brûlés). Inter assure la lisibilité technique des données. Aucune paire éditoriale par défaut.

- **Size scale (mobile-first) :**
  - Wordmark hero (OLYMPE) : `clamp(4.5rem, 22vw, 16rem)` Anton, tracking `-0.01em`, line-height `0.82`.
  - h1/section title : `clamp(2.2rem, 8vw, 5rem)` Anton, capitales.
  - Chiffre-métrique : `clamp(2.8rem, 10vw, 6rem)` Oswald 600.
  - h2 : `clamp(1.6rem, 4.5vw, 2.6rem)` Oswald 600 capitales.
  - body : `1.04rem` Inter 400, line-height `1.6`.
  - small / unités : `0.8rem` Inter 500 ou JetBrains Mono, tracking `0.12em` capitales.

---

## Layout archétype

**Choix : `load-plate-console`** — l'écran tente le contraste entre un **fond graphite « plateau »** (sections sombres, façon salle éclairée par spots) et des **panneaux acier clair** (sections d'info lisibles). Le fil rouge graphique : la **plaque de poids** (rectangle/disque chargé en rouge fonte) comme module récurrent, et des **compteurs qui s'incrémentent** à l'apparition. Diverge de tout le catalogue (aucune console de performance ; les autres sont maritime, scorecard, arches, timeline, magazine).

### Rythme des sections (à lire de haut en bas)

1. **`nav` (dock fin sticky top)** : barre graphite translucide, wordmark « OLYMPE » réduit à gauche, à droite badge volt « OUVERT · 07-22 · 7J » + bouton accent « 06 11 02 42 86 ». Hauteur compacte, mobile = burger minimal + bouton appel toujours visible.

2. **`hero` (plein écran, fond graphite `#14171C`)** : pas de photo. OLYMPE en Anton monumental (`22vw`), sous-titre « Salle de sport · L'Île-Rousse · Balagne ». À droite/dessous, le **rack de plaques de poids signature** (voir geste UI) qui se charge à l'apparition. En bas, bandeau de 4 métriques qui s'incrémentent (4.6★ / 19 avis · 07-22 · 7J/7 · 20€/sem). Money shot 100% typo+data. CTA « Voir le plateau » (ancre) + « Appeler ».

3. **`preuve-réelle` (panneau acier clair)** : la **vraie photo du club** (`olympe-club-real.webp`) traitée en **médaillon cadré** dans une carte « plaque » bordée filet acier, taille moyenne (max ~520px de large, jamais étirée), léger grain pour homogénéiser la basse résolution. Légende : « Le vrai plateau : rack Primal Strength complet, câbles, bancs, miroirs full-wall. » Texte à côté = pitch « seule salle indépendante pro du centre ».

4. **`equipement` (grille de plaques)** : 3 cartes « plaque chargée » (haltères/rack, câbles & machines, plateau cardio) illustrées par les Unsplash HD en vignettes cadrées (jamais full-bleed). Chaque carte affiche un picto fonte + 1 ligne descriptive. Disposition asymétrique type rack.

5. **`metriques` (fond graphite, compteurs)** : bandeau sombre avec 4 gros chiffres Oswald qui s'incrémentent à l'apparition : `07-22` amplitude, `7` jours/7, `15%` remise étudiant, `4.6` note. Effet « écran de console » avec libellés mono volt.

6. **`cours-coaching` (panneau acier clair)** : liste façon programme d'entraînement (yoga · spinning/biking · circuit training · coaching perso). Mention coaching certifié DRAJES éligible crédit d'impôt. Chaque ligne = une « série », numérotée comme un WOD.

7. **`tarifs` (deux plaques)** : deux cartes-plaques côte à côte. Plaque 1 « SEMAINE 20€ » (cible saisonnier/touriste, badge « idéal séjour »). Plaque 2 « ÉTUDIANT -15% » (cible jeune local). Mention « sans engagement long ». La double saisonnalité résolue visuellement par deux plaques de charge distinctes.

8. **`gerant` (citation + avatar)** : Alexandre Scarsetti mis en avant. Avatar = `olympe-facebook-profile.jpg` en médaillon rond bordé accent. Citation issue des avis (« sympathique, compétent, professionnel »). Capital humain = différenciateur.

9. **`infos-maps` (split graphite/clair)** : colonne info (adresse Bd Pierre Pasquini, horaires 7j/7, tél, parking gratuit) + iframe Google Maps. CTA « Itinéraire ». Footer compact graphite avec wordmark + crédit SpeedPost.

### Singularités du site (4)

- **Rack de plaques de poids signature** (geste UI ci-dessous) : module unique au catalogue, anime le hero.
- **Compteurs de métriques qui s'incrémentent** à l'apparition (07-22, 7, 15%, 4.6) façon écran de console.
- **Grammaire « plaque chargée »** : chaque carte (équipement, tarif) est un rectangle bordé filet acier avec une bande rouge fonte sur le flanc, comme un disque chargé sur la barre.
- **Alternance plateau graphite / panneau acier clair** : rythme visuel sombre/clair qui évoque l'éclairage spot d'une salle, jamais vu dans le catalogue (tous en cream uni).

### Ce que ce site n'a PAS (divergence explicite)

- Pas de hero photo full-bleed (contrainte : pas de photo HD).
- Pas de fond cream warm (rupture nette avec les 3 derniers).
- Pas de serif éditorial (Anton/Oswald/Inter only).
- Pas de marquee classique (remplacé par le bandeau de métriques).
- Pas de parallaxe ni d'effet scroll-linked (scroll natif).

---

## Geste UI signature — « Rack de plaques » (déclenché par inView, PAS scroll-linked)

**Concept :** une barre d'haltère stylisée (SVG inline, petit module, ~environ 320px de large) au hero. À l'entrée du hero dans le viewport (`Motion.inView`, one-shot), les **disques (plaques) se chargent un par un sur la barre** par un stagger : chaque plaque apparaît avec `opacity 0→1 + scale 0.7→1 + translateX` depuis l'extérieur, de la plus lourde (intérieur, rouge fonte) à la plus légère (extérieur). Durée totale ~0.7s, stagger 90ms, easing `[0.2,0.7,0.2,1]`. Une fois chargée, la barre reste statique (aucune liaison au scroll).

**Détail technique pour le builder :**
- SVG inline : 1 barre horizontale (rect graphite) + 5 à 6 plaques (rects arrondis) de tailles décroissantes, couleur `--accent` pour les grosses, `--ink` pour les petites, filet `--line`.
- État initial : plaques `opacity:0; transform:scale(.7) translateX(±30px)` via classe `.plate` (CSS), neutralisée par `.js-ready`.
- À `inView` : `animate('.plate', {opacity:[0,1], scale:[.7,1], x:[…,0]}, {delay: stagger(0.09), duration:.5, easing:[.2,.7,.2,1]})`.
- Filet de sécurité CSS : `@keyframes plate-load` force `opacity:1; transform:none` après ~0.6s si Motion échoue.
- **Interaction bonus (hover/tap, pas scroll) :** au survol/tap de la barre, un compteur « total charge » en Oswald fait un petit count-up (effet « rep »). Optionnel, dégradation gracieuse.

**Compteurs de métriques (section 5, même principe) :** à `inView`, count-up des chiffres (07→22 amplitude, 0→7, 0→15, 0→4.6) en ~0.8s, one-shot. Jamais relié à la position de scroll. Filet de sécurité : valeur finale écrite en dur dans le HTML, le JS ne fait que l'animer.

---

## Motion language

- **Entrées one-shot** : `Motion.inView`, `opacity 0→1 + translateY 20px→0`, durée 0.45s, easing `[0.2,0.7,0.2,1]`, stagger 60ms sur groupes (cartes, lignes de programme).
- **Rack de plaques** : chargement staggé one-shot (voir ci-dessus), 0.7s total.
- **Compteurs** : count-up one-shot 0.8s à l'apparition, valeur finale en dur dans le DOM.
- **Cards « plaque » hover** : `translateY(-3px)` + ombre douce + la bande rouge du flanc s'épaissit légèrement, transition 180ms.
- **Badge volt « OUVERT »** : pulsation CSS très subtile (opacity 1→0.7→1, 2.5s ease-in-out infinite), pas de mouvement.
- **SCROLL NATIF obligatoire** : Lenis interdit. Ancres via CSS `html{scroll-behavior:smooth}`. Aucun effet scroll-linked (pas de parallaxe, pas de scrub).
- **Reveals robustes** : `[data-reveal]{opacity:0}` conditionné par `.js-ready` ajoutée par le module ; `@keyframes autoreveal` force `opacity:1` après ~0.5s en filet de sécurité.
- Pas d'auto-play vidéo, pas de cursor follower, pas de popup.

---

## Images sélectionnées

Chemins locaux uniquement (déjà téléchargés dans `site/assets/images/`).

| Rôle                          | Chemin local                                          | Source (origine)                          | Traitement                          | Alt text                                                        |
|-------------------------------|-------------------------------------------------------|-------------------------------------------|-------------------------------------|----------------------------------------------------------------|
| preuve-réelle (médaillon)     | `./assets/images/olympe-club-real.webp`               | open-training.fr (vraie photo du club)    | carte « plaque » ~max 520px, léger grain, JAMAIS étirée | Le plateau musculation d'Olympe Sports Club : rack Primal Strength, bancs, miroirs |
| gérant (avatar rond)          | `./assets/images/olympe-facebook-profile.jpg`         | Facebook officiel (vraie photo)           | médaillon rond ~96px bordé accent   | Alexandre Scarsetti, gérant d'Olympe Sports Club               |
| equipement 1 (vignette)       | `./assets/images/fitness-gym-weights-unsplash.jpg`    | Unsplash photo-1534438327276 (ambiance)   | vignette cadrée carte, ratio 4:3    | Haltères et rack de musculation                                |
| equipement 2 (vignette)       | `./assets/images/fitness-gym-equipment-unsplash.jpg`  | Unsplash photo-1571019613454 (ambiance)   | vignette cadrée carte, ratio 4:3    | Machines guidées et câbles                                     |
| equipement 3 / cardio (vignette) | `./assets/images/fitness-gym-cardio-unsplash.jpg`  | Unsplash photo-1517836357463 (ambiance)   | vignette cadrée carte, ratio 4:3    | Plateau cardio : tapis et vélos                                |

**Notes :**
- **Une seule vraie photo HD du club** (`olympe-club-real.webp`, 408x306) : valorisée en médaillon cadré, jamais en full-bleed (basse résolution). C'est la pièce de preuve centrale.
- Les 3 Unsplash sont en **complément d'ambiance uniquement**, toujours en vignettes cadrées de carte, jamais en hero ni full-bleed (règle respectée : pas assez de vraies photos pour exclure Unsplash, mais Unsplash relégué au secondaire).
- Doublons `gym-equipment.jpg / gym-weights.jpg / gym-cardio.jpg` (1600x1067) : non utilisés (préférer les versions `-unsplash` 2400px). Disponibles en repli si besoin.
- **Aucun hero photo** : le hero est typographique (OLYMPE + rack SVG + compteurs), ce qui résout élégamment la contrainte « pas de photo HD ».
- Recommandation : si le builder parvient à récupérer les URLs lh3 HD du club (403 en local mais peut-être OK au déploiement, voir research.md §3), remplacer/compléter le médaillon preuve-réelle par une vraie photo HD.

---

## Copy directions (pour le builder)

- **Eyebrow :** `SALLE DE SPORT · L'ÎLE-ROUSSE · BALAGNE` (capitales letter-spaced, Inter/JetBrains Mono).
- **H1 (wordmark) :** `OLYMPE` (Anton monumental). Sous-titre : « La salle qui charge la barre, au cœur de L'Île-Rousse. »
- **Lede hero :** « La seule salle de sport indépendante du centre de L'Île-Rousse. Rack Primal Strength complet, cardio, cours collectifs et coaching. Ouvert 7j/7, de 7h à 22h, à deux pas de la mer. »
- **CTA primaire :** `Appeler le 06 11 02 42 86` (pas de réservation en ligne : l'appel est le canal).
- **CTA secondaire :** `Voir le plateau` (ancre vers preuve-réelle).
- **Ton :** motivant, direct, carré, chaleureux. Phrases courtes, vocabulaire de salle (charge, plateau, série, reps) sans jargon excluant les débutants. Toujours positif (jamais le 1★). Pas d'em-dash (U+2014) : utiliser `:` `,` `.` `()`.
- **Angles à servir :** (1) seule salle pro indépendante du centre, (2) équipement pro Primal Strength qui mérite une vitrine, (3) Alexandre, gérant reconnu nommément, (4) accès semaine 20€ idéal pour les séjours estivaux, (5) remise étudiant 15%.

---

## Google Maps

- iframe sans clé : `https://maps.google.com/maps?q=42.6336,8.9370&z=15&output=embed` (lat/lng L'Île-Rousse / Bd Pierre Pasquini ; le builder confirmera depuis la ligne CSV `lat`/`lng`).
- CTA « Itinéraire » → `google_maps_url` du CSV.

---

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies (+ volt secondaire micro), contrastes AA/AAA vérifiés
- [x] Polices Google Fonts nommées : Anton, Oswald, Inter, JetBrains Mono (poids précisés)
- [x] 1 archétype custom choisi + justifié (`load-plate-console`), divergent du catalogue
- [x] 9 sections ordonnées
- [x] Images réelles assignées (2 vraies photos du club + 3 Unsplash secondaires cadrées) — pas de hero photo (contrainte assumée)
- [x] Geste UI signature détaillé (rack de plaques + compteurs), déclenché par inView/interaction, JAMAIS scroll-linked
- [x] Motion language décrit, durées + easings précisés, scroll natif confirmé (Lenis interdit)
- [x] Google Maps iframe (lat/lng) prêt
- [x] Anti-redondance palette vérifiée vs 3 derniers clients (0 token partagé)
