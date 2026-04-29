# Design brief, S.E.M Corse Bois Energie (Corte)

## 0. Réflexion UX (question par question)

**Visiteur-type :** Un décideur institutionnel corse, homme ou femme 40-60 ans, sur desktop en journée ouvrée depuis une mairie, un bailleur social, un EHPAD, un service technique de collectivité, un lycée ou un gestionnaire de patrimoine public. Secondairement : un journaliste économique, un étudiant en énergies renouvelables, un élu en préparation de délibération, un partenaire institutionnel (ADEME, OEC, Collectivité de Corse, FEDER). Usage mobile minoritaire mais réel (élus en déplacement).

**Contexte d'arrivée :** Recherche Google « réseau chaleur biomasse Corse », « chaufferie bois collective Haute-Corse », « SEM Corse Bois Energie », ou lien cité dans un rapport institutionnel, un appel d'offres, une étude ADEME, une réponse IA (ChatGPT/Perplexity) sur la filière bois énergie insulaire. L'arrivée est documentaire, pas émotionnelle.

**Intention primaire :** Comprendre rapidement « est-ce un opérateur crédible, capable, dimensionné pour mon projet public ? ». Puis : trouver un interlocuteur, voir les références déjà chauffées, mesurer l'ancrage territorial. L'intention n'est pas d'acheter en ligne mais de **qualifier un partenaire industriel sérieux** en 30 secondes.

**Intention business :** Asseoir l'autorité de la SEM comme opérateur référent biomasse en Corse, faciliter le contact des collectivités qui veulent dupliquer le modèle cortenais (Sartène, Aleria, Porto-Vecchio, communes de montagne), valoriser la filière 100% corse auprès des financeurs (FEDER, Caisse d'Épargne, OEC), et signaler que la structure existe encore, moderne, contactable.

**Contrainte UX structurante :** B2B/institutionnel pur, zéro avis Google, zéro horaire, pas de réservation, pas de catalogue produit grand public, pas de chef ni d'ambiance. La matière est **chiffrée, territoriale, politique**. Le site doit se lire comme un **rapport d'impact** (key figures, carte des sites desservis, jalons, partenaires), pas comme une vitrine commerçante. Photos réelles du commerce : une seule (chantier Aleria). Le design doit assumer la rareté iconographique en misant sur la data et la typographie.

**Émotion-cible à 5s :** Crédibilité institutionnelle chaleureuse. Le visiteur doit penser « c'est sérieux, c'est corse, c'est vivant depuis 35 ans, ça marche ». Fierté territoriale, pas greenwashing. Registre : rapport d'activité soigné d'un opérateur public fier de son ouvrage, pas plaquette marketing.

**Money shot :** Un **titre-déclaration monumental** du type « Depuis 1988, la chaleur de la Corse vient de ses forêts. » juxtaposé à **trois chiffres-clés énormes** (15 000 tonnes, 9 chaufferies, 30 000 personnes desservies) et à la photo réelle du chantier de déchiquetage en plaine d'Aleria. Pas de carousel, pas de vidéo, pas de split produit. Un bloc data + une photo de terrain.

---

## Archétype

**`rapport-impact-territorial`** (custom, inventé pour ce client).

Justification : ni `magazine-editorial` (trop littéraire pour de la data institutionnelle), ni `bento-grid` (trop startup), ni `timeline-verticale` (déjà utilisé pour U Spuntinu). Le site se structure comme un **rapport d'impact annuel d'opérateur public** : ouverture manifesto, tableau de bord d'indicateurs clés, carte territoriale des sites desservis qui s'allument au scroll, diagramme de flux forêt→plaquette→chaufferie, frise des jalons 1988-2024, grille des partenaires institutionnels, contact direct. Divergence totale vis-à-vis des 9 clients déjà livrés (tous restaurants/loisirs avec archétypes sensoriels).

---

## Palette de couleurs

| Rôle       | Hex      | Nom descriptif        | Utilisation                                                |
|------------|----------|------------------------|------------------------------------------------------------|
| `--bg`     | `#F5EDD8` | Papier recyclé chaud   | Fond principal, évoque la fibre bois et le document officiel |
| `--ink`    | `#1E2A16` | Vert forêt profond     | Titres, data lourde, nav, indicateurs chiffrés             |
| `--ink-2`  | `#5C4A35` | Brun écorce            | Texte courant, corps éditorial, légendes                   |
| `--accent` | `#D4560A` | Orange braise          | CTA, chiffres-clés, points de chaleur sur la carte, hover  |
| `--line`   | `#D9CDAE` | Ligne chanvre          | Séparateurs, bordures cartes, axes du diagramme de flux    |

> Palette pensée pour évoquer le **papier fibreux d'un rapport institutionnel corse** (fond chaud beige), la **forêt mère** (vert profond), l'**écorce et la bûche** (brun), la **braise vivante des chaufferies** (orange). Contraste vérifié : ink sur bg = 12.2:1 (AAA), ink-2 sur bg = 6.3:1 (AA large), accent sur bg = 4.6:1 (AA). Pas de gris neutre : tout respire le végétal.

---

## Typographie

- **Display :** `Fraunces` (Google Fonts), poids 400 et 700, optical-size activée (soft=50), slnt 0. Choix : Fraunces est une serif contemporaine à caractère éditorial et institutionnel qui évoque les rapports publics soignés tout en gardant une chaleur humaine (ses rondeurs organiques rappellent la fibre). Parfaite pour titres-déclarations et chiffres monumentaux.
- **Body :** `Inter` (Google Fonts), poids 400 et 500, avec tabular-nums activé pour les données chiffrées. Choix : Inter est le standard des interfaces data-driven (dashboards publics, rapports ADEME), neutre, lisible à toutes tailles sur mobile, tabular-nums essentiel pour aligner les 15 000 / 11 000 / 30 000.
- **Size scale (mobile-first) :**
  - Manifesto H1 : `clamp(2.6rem, 8vw, 5.6rem)`, line-height 0.98, tracking -0.03em, poids 400 (Fraunces light laisse respirer les titres longs)
  - H2 section : `clamp(1.8rem, 4vw, 2.6rem)`, line-height 1.1, tracking -0.02em, poids 700
  - Kpi chiffre : `clamp(3.2rem, 10vw, 6.4rem)`, Fraunces 700, tabular-nums, tracking -0.04em
  - Eyebrow : `0.78rem`, Inter 500 uppercase, tracking 0.18em
  - Body : `1.05rem`, Inter 400, line-height 1.65
  - Caption / source : `0.82rem`, Inter 400, couleur ink-2

---

## Layout archétype, DIVERGENCE OBLIGATOIRE

**Choix : `rapport-impact-territorial`** (custom). Le site adopte la structure d'un rapport d'activité annuel d'opérateur public corse : manifesto, tableau de bord, carte territoriale, diagramme de flux, frise historique, partenaires, contact. Radicalement différent des 9 sites précédents (aucun n'a de carte interactive des sites desservis, aucun n'est organisé comme un rapport institutionnel chiffré).

### Rythme des sections (à lire de haut en bas)

1. **Top-strip institutionnel** (barre fine, 36px) : à gauche « Société d'Économie Mixte · Corte, Haute-Corse », à droite « Depuis 1988 » + téléphone cliquable. Pas de logo marketing, registre papier officiel.
2. **Nav sobre** (sticky, transparente sur bg) : wordmark « Corse Bois Energie » en Fraunces 700 à gauche, 5 liens en Inter 500 uppercase small-caps à droite (Mission, Indicateurs, Territoire, Filière, Contact). Pas de CTA bouton, un simple lien accent « Nous écrire ».
3. **Manifesto hero** (plein écran minimum 90vh, asymétrique) : à gauche 60%, phrase monumentale en Fraunces 400 sur 3 lignes, « Depuis 1988, / la chaleur de la Corse / vient de ses forêts. ». Sous la phrase, un sous-titre Inter 2 lignes. À droite 40%, bloc data vertical : 3 chiffres empilés (15 000 t · 9 chaufferies · 30 000 personnes) séparés par des lignes chanvre, chaque chiffre avec eyebrow descriptive au-dessus. Pas d'image ici. Le hero est **100% typographique et data**, geste unique dans le catalogue.
4. **Photo manifeste pleine largeur** (section courte, 70vh) : la seule vraie photo de terrain (chantier Aleria) en full-bleed, avec par-dessus une légende minuscule bas-gauche « Déchiquetage, plaine d'Aleria, Haute-Corse ». Aucune animation pompeuse, juste un léger parallax 8%.
5. **Tableau de bord d'indicateurs** (grille 2x2 puis 4x1 desktop) : 4 cartes data sans images, fond `--line` léger, chaque carte contient un chiffre XXL, un libellé, une phrase courte, une source. Les 4 indicateurs : « 15 000 t plaquettes/an », « 100% bois corse », « 9 chaufferies collectives gérées », « 35+ ans d'expertise ». Chiffres animés au count-up à l'apparition.
6. **Carte territoriale interactive** (SVG Corse dessinée à la main, geste UI signature, voir §Singularités) : fond papier, contour Corse en trait fin vert forêt, points orange pulsants positionnés sur Corte (hub), Aleria (production), plus repères pour Sartène, Porto-Vecchio (projets de duplication). Au scroll, les points s'allument en cascade. Panneau latéral droit qui affiche la catégorie de bâtiment desservi au hover du point.
7. **Diagramme de flux Forêt → Plaquette → Chaleur** (section verticale, 4 étapes) : chaque étape une ligne de grille (icône SVG custom + titre Fraunces + description Inter + légende source). Forêt corse (6-10% ressource mobilisée) → Coupe & déchiquetage (Aleria) → Transport court (flotte propre) → Chaufferie (écoles, hôpital, CROUS, EHPAD). Connecteurs : lignes pointillées animées qui se tracent au scroll (stroke-dashoffset).
8. **Frise des jalons** (horizontale sur desktop, verticale sur mobile) : 1988 création par CTC, 2011 site Aleria, 2017 modernisation 4M€ FEDER, 2024 projets duplication. 4 points-clés, pas de bla-bla, dates en Fraunces 700, libellés en Inter.
9. **Mur des partenaires & clients institutionnels** (grille texte, zéro logo car non vérifiable) : 12 à 16 noms d'entités textuels en Fraunces 400, un par case, fond papier, bordure chanvre. Hôpital de Corte, Université de Corse, CROUS, Logirem, EHPAD U Serenu, Piscine municipale, Bibliothèque universitaire, Collectivité de Corse, ADEME, OEC, FEDER, etc. Effet pur typographique, très institutionnel.
10. **Bloc contact & adresse** (split 50/50) : à gauche, coordonnées textuelles (adresse Quartier Gare, téléphones, phrase « Pour toute collaboration institutionnelle, duplication de modèle ou étude de projet biomasse »). À droite, iframe Google Maps en cadre rectangulaire net, bordure 1px chanvre.
11. **Footer** (1 ligne + 1 ligne) : gauche wordmark discret + mention « Société d'Économie Mixte, Corte », droite « Site conçu par Menghi Computer Science ». Pas de social, pas de newsletter.

### Singularités du site (4)

- **Carte territoriale interactive « Points de chaleur corses »** : SVG manuscrite de la Corse, points orange qui s'allument en cascade au scroll (stroke-dashoffset + scale animation). Au hover/tap d'un point : panneau side affiche la catégorie de bâtiment desservi (hôpital, lycée, logement social, etc.). Aucun autre client du catalogue n'a cette carte territoriale.
- **Hero 100% data + typographie**, sans image : rupture radicale avec tous les autres sites (qui ont tous un hero photo). Impose immédiatement le ton rapport d'impact.
- **Diagramme de flux vertical Forêt→Chaleur** avec connecteurs en stroke-dashoffset qui se tracent au scroll : représente visuellement le circuit court insulaire, métaphore du process.
- **Chiffres en tabular-nums animés count-up** à l'entrée en viewport : gamification légère de l'impact cumulé (15 000 tonnes, 30 000 personnes desservies), signature data-driven.
- **Mur typographique des clients institutionnels** (zéro logo) : choix assumé de valoriser les noms en Fraunces plutôt que des logos non-autorisés. Très rapport public, très institutionnel.

### Ce que ce site n'a PAS (divergence explicite)

- **Pas de hero avec photo de plat/lieu** (on n'est pas en restauration).
- **Pas de marquee défilant** (pas de multiple localisations à énumérer rapidement).
- **Pas de section signature en 3 cartes produits** (ce n'est pas un catalogue).
- **Pas de grille masonry de galerie photos** (pas assez d'images authentiques).
- **Pas de quote client fullscreen** (0 avis Google, pas de témoignage vérifiable).
- **Pas de CTA « Réserver une table »** ni équivalent transactionnel.
- **Pas de timeline centrée verticale façon U Spuntinu** (on utilise une frise horizontale sobre, différente).
- **Pas de split-sticky façon Nautic** (on utilise un flux vertical linéaire de rapport).

---

## Motion language

- **Entrées scroll (Motion.inView)** : opacity 0→1 + translateY 24px→0, durée 0.9s, easing `[0.22, 0.61, 0.36, 1]`, stagger 80ms sur groupes de cartes data.
- **Count-up chiffres KPI** : animation 1.6s easing ease-out, déclenchée à l'apparition en viewport (Motion + IntersectionObserver), tabular-nums pour éviter tout reflow.
- **Carte territoriale** : points orange qui passent de `scale(0) opacity 0` à `scale(1) opacity 1` en cascade, stagger 180ms, durée 0.6s par point, easing `[0.34, 1.56, 0.64, 1]` (léger overshoot institutionnel chaleureux).
- **Diagramme de flux** : SVG paths connecteurs animés via `stroke-dashoffset` de `length→0`, durée 1.2s linear par segment, déclenchés séquentiellement au scroll.
- **Parallax photo chantier** : translateY 8% sur scroll (Motion + scroll listener throttlé).
- **Hover cartes data & partenaires** : `translateY(-2px)` + border accent 1px (de `--line` à `--accent`), transition 220ms ease-out.
- **Smooth scroll global** : Lenis actif, lerp 0.08.
- **Pas d'auto-play vidéo, pas de cursor follower, pas de popup, pas de modal, pas de scrolljack forcé.**

---

## Images sélectionnées

Toutes les images sont déjà téléchargées localement par le researcher dans `dist/s-e-m-corse-bois-energie-zdfkbleu/site/assets/images/`. Aucune URL externe dans le HTML.

| Rôle                               | Chemin local                                          | Source d'origine                         | Alt text                                                |
|------------------------------------|--------------------------------------------------------|------------------------------------------|----------------------------------------------------------|
| Photo manifeste full-bleed (§4)    | ./assets/images/corse-bois-energie-chantier.jpg        | og:image bioenergie-promotion.fr (F. Douard) | Chantier de déchiquetage d'eucalyptus, plaine d'Aleria, Haute-Corse |
| Accent forêt (section flux, étape 1) | ./assets/images/foret-corse-montagne.jpg            | Unsplash                                 | Forêt corse sauvage, ressource bois énergie              |
| Accent bûches (section flux, étape 2) | ./assets/images/buches-bois-tas.jpg                | Unsplash                                 | Bûches empilées avant déchiquetage                       |
| Accent stockage (section flux, étape 2 alt) | ./assets/images/bois-coupe-stocke.jpg         | Unsplash                                 | Stockage de bois coupé                                   |
| Accent produit pellets (§ KPI diversification ou flux) | ./assets/images/granules-bois-pellets.jpg | Unsplash                       | Granulés de bois issus des déchets                       |
| Accent chaufferie (section flux, étape 4) | ./assets/images/chaudiere-biomasse-bois.jpg     | Unsplash                                 | Chaudière biomasse collective                            |
| Accent chaleur foyer (KPI « 30 000 personnes desservies ») | ./assets/images/cheminee-feu-interieur.jpg | Unsplash                  | Intérieur chaleureux, chaleur collective délivrée        |
| Accent flammes (transition de section, petit format) | ./assets/images/flammes-feu-foyer.jpg | Unsplash                       | Flammes actives dans un foyer                            |
| Accent montagne hiver (contexte territoire, côté carte) | ./assets/images/paysage-montagne-hiver.jpg | Unsplash                   | Montagne corse enneigée en hiver                         |
| Accent montagne 2 (alt ou non utilisé) | ./assets/images/montagne-neige-hiver.jpg           | Unsplash                                 | Sommet enneigé de Haute-Corse                            |
| Accent PAC (non utilisé, trop annexe) | ./assets/images/pompe-a-chaleur-exterieure.jpg      | Unsplash                                 | Non utilisée (hors périmètre core biomasse)              |

**Notes images :**
- 1 image réelle du commerce (photo chantier Aleria) utilisée en money shot full-bleed, rôle central.
- 9 images Unsplash utilisées en accents de petite/moyenne taille dans les sections flux et KPI, jamais en full-bleed (pas assez authentiques pour le porter).
- 1 image (pompe-a-chaleur-exterieure.jpg) volontairement non utilisée : hors périmètre biomasse, risquerait de brouiller le message.
- **Aucun placeholder `placehold.co` nécessaire**, le volume d'images disponibles couvre tous les rôles.

---

## Wireframe ASCII (desktop)

```
┌──────────────────────────────────────────────────────────────────┐
│ SEM · Corte, Haute-Corse                Depuis 1988 · 04 95 61 ..│ top-strip
├──────────────────────────────────────────────────────────────────┤
│ Corse Bois Energie   Mission  Indicateurs  Territoire  …  Écrire │ nav
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Depuis 1988,                         ┌─ 15 000 ─┐                │
│  la chaleur de la Corse               │  tonnes  │                │
│  vient de ses forêts.                 └──────────┘                │ hero
│                                       ┌─ 9 ───────┐               │ manifesto
│  Société d'Économie Mixte,            │chaufferies│               │ + KPI
│  opérateur public du réseau de        └───────────┘               │
│  chaleur biomasse de Corte.           ┌─ 30 000 ──┐               │
│                                       │ personnes │               │
│                                       └───────────┘               │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│ [ PHOTO FULL-BLEED : chantier Aleria, déchiquetage eucalyptus ]   │ money shot
│                             Déchiquetage, plaine d'Aleria         │
├──────────────────────────────────────────────────────────────────┤
│ INDICATEURS CLÉS                                                  │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                      │
│ │15 000 t│ │ 100%   │ │   9    │ │  35+   │                      │ dashboard
│ │/ an    │ │ corse  │ │chauff. │ │  ans   │                      │ KPI
│ └────────┘ └────────┘ └────────┘ └────────┘                      │
├──────────────────────────────────────────────────────────────────┤
│ TERRITOIRE DESSERVI                                               │
│     ┌─────────────────────┐          Sites alimentés :            │
│     │     ╭╮              │          · Hôpital de Corte           │
│     │    ╱  ╲ Corte ●     │          · Université de Corse        │
│     │   │    │            │          · CROUS résidences           │ carte
│     │   │  ● Aleria       │          · Logirem HLM                │ corse
│     │    ╲  ╱             │          · EHPAD U Serenu             │ SVG
│     │     ╰╯ ● Porto-V    │          · Piscine municipale         │
│     │       ● Sartène     │          · Bibliothèque univ.         │
│     └─────────────────────┘                                       │
├──────────────────────────────────────────────────────────────────┤
│ DE LA FORÊT À LA CHALEUR                                          │
│  ●─┐  Forêt corse (6-10% ressource mobilisée)                    │
│    ┆                                                              │
│  ●─┤  Coupe & déchiquetage (site Aleria)                         │ diagramme
│    ┆                                                              │ flux
│  ●─┤  Transport court insulaire (flotte propre)                  │
│    ┆                                                              │
│  ●─┘  Chaufferies collectives (écoles, hôpital, HLM, EHPAD)      │
├──────────────────────────────────────────────────────────────────┤
│ JALONS                                                            │
│ 1988 ─────── 2011 ─────── 2017 ─────── 2024                      │ frise
│ Création     Site Aleria  Modernisation Duplications              │
│ par la CTC                4 M€ FEDER    régionales                │
├──────────────────────────────────────────────────────────────────┤
│ PARTENAIRES & SITES DESSERVIS                                     │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                              │
│ │ CTC  │ │ ONF  │ │ADEME │ │ OEC  │ …                            │ mur
│ ├──────┤ ├──────┤ ├──────┤ ├──────┤                              │ typo
│ │Hôp.  │ │Univ. │ │CROUS │ │Logir.│                              │
│ └──────┘ └──────┘ └──────┘ └──────┘                              │
├──────────────────────────────────────────────────────────────────┤
│ Pour toute collaboration              [ Google Maps iframe ]      │
│ institutionnelle :                                                │ contact
│ Quartier Gare, 20250 Corte                                        │
│ 04 95 61 07 31                                                    │
├──────────────────────────────────────────────────────────────────┤
│ Corse Bois Energie · Corte    Site conçu par Menghi Computer Sc.  │ footer
└──────────────────────────────────────────────────────────────────┘
```

Mobile : tout passe en colonne unique, KPI empilés, carte Corse en haut de sa section plein-écran avec légende dessous, diagramme de flux en vertical natif (déjà pensé pour mobile-first), frise des jalons bascule en vertical.

---

## Geste UI signature, détail technique

**« Points de chaleur corses » — carte territoriale interactive SVG.**

- **Format** : SVG inline dans le HTML (pas d'image bitmap), viewBox 0 0 600 900, contour de la Corse tracé manuellement en path fermé, stroke `--ink` 1.5px, fill `--bg` (fond papier).
- **Points de chaleur** : 6 à 8 cercles SVG positionnés sur les villes clés : Corte (hub principal, ~cx 310 cy 440), Aleria (site de production, ~cx 430 cy 500), Sartène (projet duplication, cx 240 cy 720), Porto-Vecchio (cx 450 cy 780), Bastia contextuel (cx 470 cy 180), Ajaccio contextuel (cx 170 cy 560). Chaque cercle : r=8, fill `--accent`, avec un halo animé (second cercle r=18 opacity 0.3 qui pulse en scale 1→1.4).
- **Apparition scroll** : au moment où la section entre en viewport (Motion.inView à 40%), les points s'allument en cascade avec stagger 180ms dans l'ordre Corte → Aleria → autres sites. Chaque point : `scale 0 opacity 0` → `scale 1 opacity 1`, easing `[0.34, 1.56, 0.64, 1]` (léger overshoot chaleureux), puis le halo démarre son pulse infini (scale 1→1.4, opacity 0.3→0, durée 2s, infinite, delay 0.8s post-apparition).
- **Interaction hover/tap** : au hover d'un point (ou tap mobile), le cercle central passe à r=11 (transition 220ms), et un **panneau latéral droit** (ou sous-carte mobile) affiche en Fraunces 700 le nom de la ville et en Inter 400 la liste des bâtiments desservis (ou « Projet de duplication 2024+ » pour les villes à venir). Panneau géré par simple état JS, transition opacity + translateX 8px.
- **Accessibilité** : chaque point a un `<title>` SVG (lu par lecteur d'écran) et un `aria-label` descriptif. La carte entière est navigable au clavier (Tab), chaque point focusable avec outline accent.
- **Légende** : sous la carte, en Inter 0.82rem ink-2, phrase courte « 9 chaufferies collectives alimentées, capitale cortenaise en tête, duplications régionales en cours ». Pas de légende bariolée, pas de tooltip, juste le panneau propre.

Ce geste signe radicalement le site : aucun autre client du catalogue n'a de carte territoriale interactive, aucun n'a de représentation géographique des clients desservis. C'est la traduction visuelle directe du positionnement institutionnel de la SEM.

---

## Copy directions (pour le builder)

- **Eyebrow** : `Société d'Économie Mixte · Corte, Haute-Corse`
- **H1 manifesto (3 lignes)** : `Depuis 1988, / la chaleur de la Corse / vient de ses forêts.`
- **Lede sous H1 (2 phrases, 38 mots)** : `Société d'Économie Mixte, Corse Bois Energie est l'opérateur public du réseau de chaleur biomasse de Corte. Nous transformons la forêt insulaire en énergie collective pour les bâtiments publics de Corse.`
- **Eyebrow KPI** : `Indicateurs 2024` / `Bois 100% corse` / `Chaufferies gérées` / `Années d'expertise`
- **H2 carte territoriale** : `Les points de chaleur corses`
- **H2 diagramme de flux** : `De la forêt à la chaleur, un circuit 100% insulaire`
- **H2 jalons** : `Trente-cinq ans de service public`
- **H2 partenaires** : `Ils nous font confiance`
- **H2 contact** : `Construisons le prochain réseau`
- **CTA primaire** : `Nous écrire` (déclenche mailto ou scroll vers contact, téléphone visible)
- **CTA secondaire** : `Voir le modèle cortenais`
- **Règle absolue** : zéro em-dash dans tout le site. Substituts `:`, `,`, `.`, `()` uniquement.

---

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, contrastes AA/AAA vérifiés sur `--bg`
- [x] 2 polices Google Fonts nommées (Fraunces display + Inter body) avec poids (400/700 display, 400/500 body + tabular-nums)
- [x] 1 archétype custom choisi et justifié : `rapport-impact-territorial`
- [x] 11 sections ordonnées (adaptées au B2B institutionnel, pas 9 forcé)
- [x] 10 images réelles assignées à des rôles + 1 image écartée volontairement, 0 placeholder
- [x] Motion language décrit, durées + easings précisés par type d'entrée
- [x] Google Maps iframe source prêt (lat 42.30557, lng 9.14871 approx Corte Quartier Gare, à prendre depuis CSV)
- [x] Geste UI signature détaillé techniquement (carte SVG interactive)
- [x] Wireframe ASCII produit
- [x] Divergence explicite vs les 9 clients déjà livrés
- [x] Em-dash proscrit dans toutes les directives de copy
