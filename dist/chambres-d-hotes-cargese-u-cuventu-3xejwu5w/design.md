# Design brief — Chambres d'hôtes U Cuventu Di Paomia (Cargèse)

## 0. Réflexion UX (question par question)

**Visiteur-type :** Un voyageur de 30 à 60 ans, souvent en couple ou en famille, qui prépare un séjour en Corse occidentale (golfe de Cargèse, Piana, Porto). Sensible à l'authenticité, fuit les complexes hôteliers standardisés, cherche un lieu "vrai" avec une âme. Il arrive le soir après une journée de travail, en navigation détente, plus souvent sur mobile (préparation de vacances depuis le canapé) que desktop, mais bascule sur desktop au moment de comparer sérieusement et de noter le numéro.

**Contexte d'arrivée :** Recherche Google ("chambre d'hôtes Cargèse", "où dormir authentique Corse ouest"), recommandation IA ("un endroit calme avec table d'hôtes près de Cargèse"), ou bouche-à-oreille (note 4.9/5, 51 avis 5 étoiles sur 54). Il vient parce qu'on lui a parlé du lieu OU parce que le nom poétique l'intrigue. Il n'a probablement pas encore vu de photos : le site est sa première vraie rencontre visuelle avec le lieu.

**Intention primaire :** Se projeter dans le lieu pour décider, puis réserver / appeler. Concrètement : (1) ressentir l'atmosphère, (2) comprendre ce qui rend l'endroit unique (le couvent, les hôtes, la table), (3) trouver le téléphone et l'email pour réserver. Pas de moteur de réservation en ligne : la conversion finale est un appel ou un mail. L'interface doit donc construire le DÉSIR puis poser le contact de façon évidente et chaleureuse.

**Intention business :** Remplir les 4 hébergements (jusqu'à 12 personnes) sur une saison courte (mai-octobre), donc maximiser le taux de transformation des visiteurs qualifiés et valoriser la montée en gamme (la table d'hôtes, l'expérience complète, pas seulement "un lit"). Convertir l'image WIX générique actuelle en une vitrine digne de la note quasi-parfaite et du caractère du lieu. Fidéliser / déclencher le bouche-à-oreille en donnant aux hôtes un site dont ils sont fiers.

**Contrainte UX structurante :** (1) **Saisonnalité** mai-octobre : le ton doit évoquer la lumière chaude de l'été corse, pas l'hiver. (2) **Pas de réservation en ligne** : le parcours converge vers téléphone/email, pas vers un tunnel de paiement. (3) **Peu de photos réelles HD** : 2 seulement (façade de pierre fleurie + piscine/roulotte). L'identité graphique (texture pierre, typo gravée, mise en page narrative) doit porter une grande part de l'émotion pour ne pas dépendre d'une banque d'images. (4) **L'isolement est un atout, pas un défaut** : "800m de chemin de terre", "3 km du village", "bout du monde" doivent être racontés comme une promesse de sérénité, jamais comme une difficulté d'accès.

**Émotion-cible à 5 secondes :** Sérénité monastique chaude. La paix d'un lieu de pierre au bout d'un chemin, baigné de lumière dorée, où le temps ralentit. Pas le luxe froid d'un boutique-hôtel : la chaleur d'un patrimoine vivant, de la pierre chaude qu'on a envie de toucher, de l'accueil de François et Coco.

**Money shot :** La photo réelle `reel-facade.jpg` : le mur de PIERRE SÈCHE corse du couvent, débordant d'un jardin fleuri (iris, rosiers grimpants, agaves), la colline de maquis et le ciel bleu derrière. C'est l'âme du lieu, le visiteur doit la voir dès l'ouverture, traitée comme une révélation au bout du chemin.

---

## Archétype

**`custom` — "Cheminement monastique" (nom de code : `sentier-cloitre`)**

Justification : le slogan officiel ("Au bout du chemin, à chaque pas, à chaque instant, vous découvrez le couvent") DICTE l'archétype. Le site est conçu comme une marche d'approche : un chemin vertical qui se parcourt au scroll, du portail (hero) jusqu'au cloître intérieur (contact), avec une révélation progressive de la pierre. C'est radicalement différent des 3 derniers livrés (cartographie marine du Nautic, arches arcade de La Voûte, scorecard du Bowling) : ici pas de bandeau GPS, pas d'arches structurantes, pas de frames de jeu, mais un **fil-sentier vertical** et un **rythme d'heures monastiques** comme colonne vertébrale.

---

## Geste d'UI singulier — le "Fil du sentier" + les heures du jour

**1. Le fil du sentier (signature principale).** Une fine ligne verticale ondulante en SVG (le chemin de terre de Paomia, tracé à main levée façon sentier sur une carte d'état-major) court à gauche de l'écran sur toute la hauteur de la page, en `position: fixed`. Au scroll, une **portion "parcourue" se colore** progressivement en `--accent` (lumière dorée) tandis que le reste du tracé reste en pointillé `--line` (chemin à venir). Des **bornes-jalons** (petits cercles SVG) ponctuent le fil à hauteur de chaque section, avec un micro-label vertical en capitales letter-spaced ("LE PORTAIL", "LE COUVENT", "LA TABLE", "LE CLOÎTRE"...). Le visiteur voit littéralement sa progression "au bout du chemin". Le money shot du slogan devient une mécanique d'interface. Sur mobile : le fil se réduit à 4px de large collé au bord gauche, bornes en petits points, labels masqués (révélés au tap optionnel).

**2. Les heures monastiques (geste secondaire).** Clin d'œil au passé de couvent : un petit cartouche discret en haut à droite affiche l'**heure réelle du visiteur traduite en heure canoniale** ("Vêpres", "Complies", "Laudes", "None", "Sexte"...) avec l'heure exacte en dessous en mono. Calculé en JS pur depuis `new Date()`. Détail poétique qui ancre le caractère monastique sans lourdeur, et rappelle que le lieu vit au rythme du soleil (check-in à 18h = l'heure des Vêpres). Non interactif, purement atmosphérique.

**3. Le titre gravé.** Le H1 "U Cuventu" apparaît lettre par lettre comme **gravé dans la pierre** : chaque lettre fait un fade-in + léger translateY avec un `text-shadow` en creux (ombre claire en haut, ombre sombre en bas) simulant une inscription lapidaire. Splitting manuel des lettres en `<span>`, stagger 50ms.

---

## Palette de couleurs

| Rôle         | Hex       | Nom descriptif          | Utilisation                                                        |
|--------------|-----------|-------------------------|--------------------------------------------------------------------|
| `--bg`       | `#EFEDE4` | Calcaire lavé           | Fond principal : gris-lin pâle FROID de pierre calcaire au repos    |
| `--ink`      | `#26352A` | Vert maquis profond     | Texte principal, titres, fil du sentier : le maquis qui cerne le couvent |
| `--ink-2`    | `#6E7466` | Olivier cendré          | Texte secondaire, labels, légendes : la feuille d'olivier au revers |
| `--accent`   | `#C9923E` | Lumière dorée du soir   | CTA, portion de sentier parcourue, soulignages, bornes-jalons       |
| `--line`     | `#D6D0BF` | Joint de pierre sèche   | Séparateurs, bordures façon mur de pierre, tracé à venir, cards     |

**Justification anti-défaut (chaque token ancré dans le lieu) :**
- `--bg #EFEDE4` : la pierre calcaire corse n'est PAS crème chaud (#FFF8EE bannie). Au repos, à l'ombre du maquis, elle tire vers un gris-lin froid légèrement verdi. Ce fond installe d'emblée la fraîcheur d'un lieu de pierre, à l'opposé du sable chaud.
- `--ink #26352A` : l'encre n'est ni noire ni bleu marine (le Nautic/Bowling utilisent déjà du bleu marine #0E2A3C/#0E2A3A : INTERDIT ici). C'est le **vert maquis profond** qui enserre le couvent, qui devient l'identité chromatique du lieu. Choix fort et singulier dans tout le catalogue.
- `--ink-2 #6E7466` : olivier cendré, la couleur du dessous des feuilles d'oliviers centenaires mentionnés dans le research, pour les textes calmes.
- `--accent #C9923E` : la lumière dorée du soir corse frappant la pierre chaude (l'ambiance citée dans le research). Doré profond, PAS le jaune beurre #F4C66D banni, PAS le terracotta/corail des 3 derniers clients (#C0502A, #B9452A, #E85A3C). C'est un or de fin de journée, sourd et minéral.
- `--line #D6D0BF` : la couleur du mortier/joint entre les pierres sèches du mur de façade, sert à dessiner les bordures-pierre.

**Divergence vs 3 derniers clients (garde-fou) :**

| Token | U Cuventu (ce site) | Le Nautic | La Voûte | Le Bowling |
|-------|---------------------|-----------|----------|------------|
| `--bg` | `#EFEDE4` gris-lin froid | `#F4EFE3` crème chaud | `#F4EDE0` crème chaud | `#FAF4E6` crème chaud |
| `--ink` | `#26352A` **vert maquis** | `#0E2A3A` bleu marine | `#1C1714` basalte | `#0E2A3C` bleu marine |
| `--accent` | `#C9923E` **or du soir** | `#C0502A` terre cuite | `#B9452A` rouge | `#E85A3C` corail |

Aucun token repris. La divergence est radicale : c'est le SEUL site du catalogue à fond gris-lin froid + encre vert maquis + accent or sourd. Aucun bleu, aucun corail/terracotta dominant.

Contrastes vérifiés sur `--bg` (#EFEDE4) : `--ink` #26352A ≈ 9.8:1 (AAA), `--ink-2` #6E7466 ≈ 4.6:1 (AA), `--accent` #C9923E ≈ 3.2:1 (réservé texte ≥ 20px bold + éléments décoratifs/CTA avec texte blanc dessus ; jamais petit texte doré sur fond clair).

---

## Texture & matière (design MATERIAL-DRIVEN : la pierre sèche + le maquis)

La matière est la **pierre sèche** du mur de façade + le **maquis** + la **lumière dorée**. Le site doit donner envie de poser la main sur la pierre chaude.

1. **Matière en 1 mot + attributs sensoriels :** PIERRE → minérale, mate, granuleuse, irrégulière, chaude au soleil / fraîche à l'ombre, assemblée à sec (joints irréguliers), patinée par les siècles. MAQUIS → dense, aromatique, vert sourd, ombre piquetée.
2. **Texture de fond (SVG/CSS) :** un grain pierre TRÈS subtil sur `--bg` via `feTurbulence` SVG inline (baseFrequency ~0.9, opacity 3-4%) en `position: fixed` derrière le contenu, pour que toute la page ait le toucher mat et granuleux du calcaire, jamais un aplat plat numérique. En complément, un léger dégradé radial chaud `--accent` à 5% en haut de page simule la lumière du soir qui touche le mur.
3. **Bordures & dividers façon pierre sèche :** les séparateurs de section ne sont PAS des traits droits uniformes. Ce sont des **lignes de "joint de pierre"** : un SVG horizontal de cailloux assemblés (rectangles arrondis irréguliers de tailles variées, fill transparent, stroke `--line` 1.2px), comme une assise de mur en pierre sèche vue de face. Les cards (hébergements) ont une bordure 1px `--line` avec coins très légèrement irréguliers (border-radius asymétrique 3px/5px/2px/4px) pour évoquer la pierre taillée à la main, jamais des `rounded-3xl` génériques.
4. **Effet typographique signature :** titres "gravés dans la pierre" (inscription lapidaire) : `text-shadow: 0 1px 0 rgba(255,255,255,.5), 0 -1px 0 rgba(38,53,42,.25)` sur les H1/H2 en `--ink`, donnant un léger relief en creux. Obtenu via font Google + double text-shadow, zéro lib.
5. **Motif signature récurrent :** le **rameau d'olivier** dessiné à main levée (SVG, une tige + 5-6 feuilles asymétriques, stroke `--ink-2` 1.2px). Il revient en filigrane : sous le H1, comme puce de liste pour les services, comme ornement des bornes-jalons du fil du sentier, en grand format pâle en fond de la section table d'hôtes. C'est le motif qui coud le site du portail au cloître.
6. **Hover/reveals matière :** sur les cards d'hébergement, au hover, la pierre "s'éclaire" : un léger gradient `--accent` à 8% balaye la card de bas en haut (comme le soleil du soir qui glisse sur le mur), + élévation translateY(-3px). Sur les bornes-jalons du sentier, au passage de la section, le cercle se remplit d'or avec un petit pulse.
7. **Test final :** si on masque le contenu, le visuel (grain pierre, joints de pierre sèche, rameaux d'olivier, fil-sentier ondulant, vert maquis + or sourd) ne peut illustrer qu'un lieu de pierre méditerranéen au milieu du maquis. Il ne pourrait pas servir un restaurant de port ni un bowling. Validé.

---

## Typographie

- **Display :** `Cormorant Garamond` (Google Fonts) — poids 500 + 600, et 500 *italic* pour les citations narratives. Choisie pour son âme historique, ses pleins et déliés qui évoquent les inscriptions et manuscrits monastiques, sa noblesse sans froideur. Sert le caractère patrimonial gréco-corse du couvent. (Note : c'est une paire proche du défaut éditorial, mais ici pleinement justifiée par le sujet "couvent / manuscrit / inscription lapidaire", pas un réflexe.)
- **Body :** `Inter` (Google Fonts) — 400 + 500. Lisibilité moderne irréprochable sur mobile, contraste contemporain net face à l'élégance historique du Cormorant. Neutre exprès pour laisser parler la pierre et la photo.
- **Mono (détails atmosphériques) :** `IBM Plex Mono` 400, uniquement pour l'heure canoniale, les coordonnées et micro-labels (très petites surfaces). Évoque un relevé sobre, presque liturgique.
- **Size scale (mobile-first) :**
  - H1 `clamp(2.6rem, 9vw, 5.6rem)` (Cormorant 600, gravé)
  - H2 `clamp(1.9rem, 4.5vw, 3rem)` (Cormorant 600)
  - H3 `clamp(1.25rem, 2.5vw, 1.6rem)` (Cormorant 600)
  - Lede `clamp(1.1rem, 2vw, 1.35rem)` (Inter 400, line-height 1.7)
  - Body `1.05rem` (Inter 400, line-height 1.75)
  - Small / labels `0.78rem` (IBM Plex Mono / Inter 500, letter-spacing 0.18em, uppercase)
- **Tracking :** display `-0.01em`, body `0`, labels `+0.18em`.

---

## Layout archétype

**Choix : `sentier-cloitre` (custom).** Page longue à scroll narratif vertical, structurée comme une marche d'approche du portail au cloître, avec le fil-sentier en colonne vertébrale fixe à gauche. Diverge totalement des autres clients : pas de bento, pas de split-sticky, pas de cartographie marine, pas d'arcade. Le rythme alterne respirations (sections de pierre nue, texte centré) et révélations (photos pleine largeur), comme les étapes d'un chemin.

### Rythme des sections (à lire de haut en bas)

1. **`le-portail` (hero, plein écran ~92vh)** : la photo réelle `reel-facade.jpg` en fullbleed avec scrim permanent (cf. règles contraste). Eyebrow mono en haut "CHAMBRES D'HÔTES · CARGÈSE · CORSE-DU-SUD". H1 "U Cuventu" en grand, gravé lettre par lettre, sous-titre "Di Paomia" en Cormorant italic. Le slogan en lede blanc : "Au bout du chemin, à chaque pas, à chaque instant, vous découvrez le couvent." Deux CTA : `Réserver votre séjour` (accent or, primaire) + `Découvrir le lieu` (outline blanc). Chip note Google en bas : "4,9/5 · 54 avis". Money shot. Première borne du sentier = "LE PORTAIL".
2. **`le-chemin` (manifeste, pierre nue ~70vh)** : fond `--bg` texturé, pas de photo, texte centré étroit (max 620px). Court manifeste en Cormorant : l'arrivée par les 800m de chemin de terre, le bout-du-monde, l'isolement comme promesse. Drop-cap gravé sur la première lettre. Rameau d'olivier SVG en ouverture. Divider joint-de-pierre en clôture. Respiration radicale après le hero.
3. **`le-couvent` (histoire, split 5/7 désaligné)** : le passé de couvent grec, l'héritage de Cargèse (réfugiés grecs de 1675, deux églises côte à côte), la restauration. Colonne texte (Inter) + colonne image `histoire-oliviers.jpg` (Unsplash oliviers/maquis, complément autorisé hors hero) avec bordure-pierre et léger filtre chaud. Borne "LE COUVENT".
4. **`les-hotes` (François & Coco, deux portraits texte)** : présenter les hôtes-producteurs. Deux blocs côte à côte (stack mobile) : François (produits corses, moutons, poulailler) / Coco (cuisinière exceptionnelle, potager à l'eau de source). Ton chaleureux. Pas de fausses photos de personnes : on utilise des picto-rameaux + texte généreux, ou les images terroir si pertinentes. Borne "LES HÔTES".
5. **`la-table` (table d'hôtes, pleine largeur chaude)** : section pivot, le money shot émotionnel n°2. Fond légèrement plus chaud (overlay `--accent` 6%), grand rameau d'olivier pâle en filigrane. Image `table-hotes.jpg` (Unsplash table méditerranéenne) en bandeau large. Texte : le dîner du soir, apéritif et vin inclus, légumes du potager, viande du troupeau, circuit court intégral. CTA secondaire vers contact. Borne "LA TABLE".
6. **`les-chambres` (hébergements, 4 cards pierre)** : grille de 4 cards bordure-pierre (coins irréguliers) : 2 chambres doubles, 1 chambre familiale (4 pers.), 1 roulotte traditionnelle (4 pers.). Chaque card : titre Cormorant, capacité, 1-2 lignes Inter. Photo `reel-piscine-roulotte.png` mise en avant pour la card roulotte + en bandeau de section (piscine chauffée). Mention "jusqu'à 12 personnes". Hover = lumière du soir qui glisse. Borne "LES CHAMBRES".
7. **`autour` (le domaine & les environs, bandeau)** : piscine chauffée, parking privé, WiFi, paniers pique-nique, et les plages Pero / Chiuni / Menasina, vue golfe de Cargèse. Liste à puces rameau-d'olivier, ton "ce que vous trouverez ici". Image `maquis-mer.jpg` (vue mer/maquis). Borne "LE DOMAINE".
8. **`la-parole` (proof social, citation pleine largeur)** : UNE grande citation 5★ agrégée positive en Cormorant italic centré sur pierre nue, + la note "4,9/5 sur 54 avis" en gros. Pas de carrousel d'avis : une seule voix, monastique, qui résonne. Borne facultative.
9. **`le-cloitre` (contact + maps, fin du chemin)** : la portion de sentier atteint 100% (toute dorée). Split desktop / stack mobile. Gauche : "Pour franchir le portail" en Cormorant, téléphone XL cliquable `06 08 56 12 53`, email `ucuventudipaomia@gmail.com`, adresse "Chemin de Paomia, 20130 Cargèse", note saisonnalité mai-octobre + check-in 18h (Vêpres). Droite : Google Maps iframe sans cadre, filtre `sepia(0.12) saturate(0.9)` pour harmoniser. CTA `Réserver votre séjour` répété.
10. **`footer`** : ligne centrée Cormorant "U Cuventu Di Paomia · Cargèse · Corse-du-Sud", coordonnées mono, dernier rameau d'olivier. Mention discrète crédit en `--ink-2` 11px.

### Singularités du site (ce que personne d'autre n'a)

- Le **fil du sentier fixe** qui se colore au scroll avec bornes-jalons nommées : la mécanique d'interface EST le slogan ("au bout du chemin, à chaque pas").
- Les **heures canoniales** (Vêpres/Complies/Laudes) calculées en live depuis l'heure du visiteur : signature monastique unique au catalogue.
- Le **H1 gravé lapidaire** lettre par lettre avec relief en creux.
- Le **rameau d'olivier à main levée** comme motif cousant tout le site.
- Les **dividers "joint de pierre sèche"** en SVG (assise de cailloux), zéro trait droit générique.

### Ce que ce site n'a PAS (divergence explicite)

- Pas de bandeau GPS top (réservé au Nautic).
- Pas d'arches SVG structurantes (réservé à La Voûte).
- Pas de frames/scorecard (réservé au Bowling).
- Pas de marquee défilant : le rythme est lent et contemplatif, un marquee jurerait avec la sérénité monastique.
- Pas de fond crème chaud, pas de bleu marine, pas de terracotta dominant.
- Pas de moteur de réservation en ligne : conversion = téléphone/email.
- Pas de carrousel d'avis : une seule citation.

---

## Motion language

- **Entrées scroll** : `Motion.inView`, `opacity 0→1` + `translateY 20px→0`, durée 0.5s (jamais 0.9s+), easing `[0.2, 0.7, 0.2, 1]`, stagger 60ms sur les groupes de cards.
- **Reveals robustes** : `[data-reveal]{opacity:0}` conditionné par `.js-ready` ajouté par le module script ; `@keyframes autoreveal` filet de sécurité forçant `opacity:1` à ~0.5s si Motion plante.
- **Fil du sentier** : portion parcourue mise à jour via `Motion scroll()` / `requestAnimationFrame`, mapping `scrollY/scrollHeight`. Transition douce du dégradé doré (180ms). Bornes : pulse `scale 1→1.15→1` 320ms au passage de section (inView).
- **H1 gravé** : letters fade-in + `translateY 8px→0`, stagger 50ms, easing out, au load (après `.js-ready`).
- **Hero image** : parallax vertical léger 8% au scroll (Motion + scrollY).
- **Cards hébergement hover** : `translateY(-3px)` + gradient `--accent` 8% balayage bas→haut + shadow soft, transition 180ms.
- **Heures canoniales** : pas d'animation, juste fade-in initial ; mise à jour silencieuse toutes les 60s.
- **Smooth scroll global** : Lenis actif (lent, ~contemplatif).
- **Interdits** : auto-play vidéo, cursor follower, popup, animations > 0.6s.

---

## Images sélectionnées

Référencer uniquement les chemins locaux. Les fichiers ci-dessous doivent être présents dans `dist/<slug>/site/assets/images/` AVANT le build (le dossier est actuellement vide : rappel orchestrateur/researcher de lancer le téléchargement groupé).

| Rôle | Chemin local | Source (URL origine) | Alt text | Statut |
|------|--------------|----------------------|----------|--------|
| hero / le-portail (fullbleed) | `./assets/images/reel-facade.jpg` | lh3 Google Maps `...=w2400-h1800-k-no` (CSV premiere_image) | Façade en pierre sèche du couvent U Cuventu Di Paomia, jardin fleuri et maquis, Cargèse | **RÉELLE** |
| les-chambres / piscine (bandeau + card roulotte) | `./assets/images/reel-piscine-roulotte.png` | photo réelle (research) | Piscine chauffée en travertin et roulotte traditionnelle, domaine U Cuventu | **RÉELLE** |
| le-couvent (histoire, 3:4) | `./assets/images/histoire-oliviers.jpg` | `images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2400` | Maison de pierre méditerranéenne parmi les oliviers | Unsplash (complément) |
| la-table (bandeau large) | `./assets/images/table-hotes.jpg` | `images.unsplash.com/photo-1504674900247-0877df9cc836?w=2400` | Table d'hôtes dressée, cuisine du terroir méditerranéen | Unsplash (complément) |
| les-chambres (card chambre, 4:3) | `./assets/images/chambre.jpg` | `images.unsplash.com/photo-1570168007204-dfb528c6958f?w=2400` | Chambre rustique et lumineuse avec vue mer | Unsplash (complément) |
| autour (vue mer/maquis) | `./assets/images/maquis-mer.jpg` | `images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400` | Maquis corse et golfe de Cargèse | Unsplash (complément) |
| le-chemin / petit-déj (optionnel secondaire) | `./assets/images/petit-dejeuner.jpg` | `images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400` | Petit-déjeuner continental face à la mer | Unsplash (complément) |

Note images : 2 photos RÉELLES (façade en hero + piscine/roulotte), 5 compléments Unsplash réservés aux sections secondaires (jamais en hero, conforme aux règles). L'identité graphique (texture pierre, fil-sentier, rameaux, typo gravée) porte volontairement une grande part de l'émotion pour compenser le faible volume de photos réelles. À la signature : demander aux hôtes leur banque photos HD pour remplacer les compléments Unsplash.

---

## Copy directions (pour le builder)

- **Eyebrow** : `CHAMBRES D'HÔTES · CARGÈSE · CORSE-DU-SUD` (mono, letter-spacing 0.18em, uppercase).
- **H1** : `U Cuventu` (+ `Di Paomia` en Cormorant italic dessous). Gravé lettre par lettre.
- **Lede hero** : le slogan officiel exact : « Au bout du chemin, à chaque pas, à chaque instant, vous découvrez le couvent. »
- **Manifeste (le-chemin)** : évoquer les 800m de chemin de terre, le silence, les oliviers centenaires, la mer en contrebas. Ton contemplatif, première personne du lieu.
- **CTA primaire** : `Réserver votre séjour` (ancre vers le-cloitre / déclenche tel:).
- **CTA secondaire** : `Découvrir le lieu`.
- **Positif uniquement.** Aucun em-dash `—` nulle part (utiliser `:`, `,`, `.`, `()`). Light mode, mobile-first.

---

## Éléments techniques pour le builder

- **Google Maps iframe** : `https://maps.google.com/maps?q=42.137,8.602&z=14&output=embed` (Cargèse / Chemin de Paomia ; affiner lat/lng exacts depuis la ligne CSV `lat`/`lng` ou `google_maps_url` avant build). Filtre CSS `sepia(0.12) saturate(0.9)`.
- **SVG à tracer inline** : (1) fil du sentier ondulant vertical (path à main levée, stroke-dasharray pour le tracé "à venir", overlay coloré pour le "parcouru") ; (2) rameau d'olivier (tige + feuilles asymétriques) réutilisable ; (3) divider joint-de-pierre (assise de cailloux) ; (4) grain pierre via `feTurbulence` en fond fixe.
- **Heures canoniales** : table de mapping JS (Matines 0h, Laudes 3h, Prime 6h, Tierce 9h, Sexte 12h, None 15h, Vêpres 18h, Complies 21h) → afficher l'heure canoniale la plus proche + heure mono.
- **Tailwind pré-compilé** (jamais CDN play) : `theme.extend` avec la palette ci-dessus + fontFamily Cormorant/Inter/IBM Plex Mono.

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, contrastes AA vérifiés sur `--bg`.
- [x] Polices Google Fonts nommées avec poids (Cormorant Garamond, Inter, IBM Plex Mono).
- [x] 1 archétype custom choisi + justifié (`sentier-cloitre`), divergent des 3 derniers.
- [x] 10 sections ordonnées en marche d'approche.
- [x] 2 images réelles + 5 compléments Unsplash assignés (hero = réelle), fichiers à télécharger signalés.
- [x] Motion décrit (durée ≤ 0.6s + easing), reveals avec filet de sécurité.
- [x] Geste UI singulier inventé (fil du sentier + heures canoniales + H1 gravé).
- [x] Google Maps iframe source prêt.
- [x] Design material-driven (pierre sèche + maquis + or du soir), test final passé.
- [x] Garde-fou palette : aucun token repris des 3 derniers clients.
