# Design brief — Ranch l'Indianna (Oletta, Nebbio)

## 0. Réflexion UX (question par question)

**Visiteur-type :** Trois profils, par ordre de volume estival.
1. Couple ou groupe d'amis 25-45 ans en vacances à Saint-Florent / Patrimonio / camping du Nebbio, qui cherche "une activité qui sort de l'ordinaire" pour une fin d'après-midi. Mobile, le soir, après la plage, en quête d'une expérience à raconter.
2. Parent avec enfant 6-10 ans qui veut faire vivre un premier contact poney, sécurisant et doux.
3. Organisateur de séminaire / team building (B2B, minoritaire mais haute valeur), sur desktop, en journée.

**Contexte d'arrivée :** Recherche Google "balade cheval Saint-Florent" / "baignade à cheval Corse" / "que faire Nebbio", recommandation IA ("activité originale près de Saint-Florent"), bouche-à-oreille appuyé par la note 4.9/5, ou lien Facebook. Le visiteur arrive déjà séduit par l'idée du cheval dans la mer : le site doit confirmer, pas convaincre de zéro.

**Intention primaire :** Comprendre en 5 secondes que la baignade à cheval en mer au coucher du soleil existe ici, que c'est accessible (débutants bienvenus), puis trouver immédiatement comment réserver (téléphone, car aucune résa en ligne). L'intention n'est PAS de comparer des prix : c'est de ressentir l'envie et d'appeler.

**Intention business :** Remplir les créneaux de balade-baignade de fin de journée en saison (juin-sept), capter les familles sur le poney club en journée, ouvrir une porte B2B team building, et exister enfin sur le web (zéro site aujourd'hui, seulement Facebook). Convertir l'émotion en appel téléphonique.

**Contrainte UX structurante :** (1) Pas de réservation en ligne, tout passe par le 06 21 90 26 86 → le téléphone doit être omniprésent, jamais à plus d'un geste. (2) Pas de tarifs officiels validés → ne JAMAIS afficher de prix. (3) Saisonnalité forte (Agriates juin-sept) → distinguer ce qui est "toute l'année" de ce qui est "saison". (4) Photos d'illustration cohérentes mais pas la vraie écurie → composer un site qui valorise l'ambiance (lumière, mer, maquis) plutôt que de prétendre documenter chaque cheval nominativement.

**Émotion-cible à 5s :** Le frisson doux du crépuscule. Liberté, eau tiède, sabots dans l'écume, lumière rasante dorée. Un mélange d'aventure accessible et d'apaisement. Pas l'adrénaline sportive : l'émerveillement.

**Money shot :** Les cavaliers / le cheval dans la mer au coucher du soleil (balade-plage-coucher.jpg). C'est l'image qui justifie tout le voyage jusqu'au site. Elle ouvre et elle ferme.

---

## Archétype

**`sentier-au-crepuscule`** (custom, inventé pour ce lieu).

Le site est construit comme **une chevauchée scénarisée du maquis jusqu'à la mer au coucher du soleil** : on part en hauteur dans le vert-maquis (sections sombres, terriennes), on descend le chemin de crête (frise paysage panoramique horizontale qui défile), on arrive à la plage de la Roya, l'eau passe au turquoise, et la lumière vire au doré quand on atteint la baignade signature. La page entière est une **descente altitudinale du vert vers le bleu vers l'or** : le fond et l'ambiance évoluent au fil du scroll, comme la vraie sortie. Justification : aucun autre client du catalogue ne raconte un *trajet géographique vertical* (Le Nautic raconte une escale statique, La Voûte une architecture, Le Bowling une partie). Ici la structure EST l'expérience vendue.

---

## Palette de couleurs

### 4-5 directions explorées avant de fixer

1. **Western / ranchero américain** : cuir tabac, denim délavé, rouge brique poussiéreux, sable. → Rejeté : trop "Arizona", efface la Méditerranée corse, et tombe dans le warm-brown générique proche de mes 3 derniers clients.
2. **Carte postale rétro 70s Corse** : orange sunset saturé, turquoise pop, jaune. → Rejeté : kitsch, daterait le ranch, peu premium.
3. **Minimal-luxe équestre (sellier)** : blanc cassé, noir, un filet de fauve. → Rejeté : froid, élitiste, contredit l'accueil familial chaleureux et l'esprit "accessible débutants".
4. **Terrigène-marine Nebbio (descente maquis → mer → or)** : ivoire végétal froid, vert-maquis profond, turquoise golfe désaturé, ocre cuir de selle, or coucher de soleil. → **RETENU** : c'est littéralement le dégradé que vit le cavalier sur le sentier, ça honore le lieu précis (Nebbio, golfe de Saint-Florent, Agriates) et c'est franchement différent des parchemins chauds des 3 derniers clients.
5. **Aquarelle pastel doux** (familles) : sauge claire, sable rosé, ciel pâle. → Rejeté : trop tendre, perd le frisson aventure et la profondeur du maquis au crépuscule.

### Tokens retenus

| Rôle         | Hex       | Nom descriptif          | Utilisation                                                            |
|--------------|-----------|-------------------------|-----------------------------------------------------------------------|
| `--bg`       | `#EEF0E6` | Ivoire de maquis        | Fond principal clair, froid-végétal (pas cream warm), poussière d'olivier |
| `--ink`      | `#1E2B1E` | Vert maquis profond     | Texte principal, titres, traits (un vert-noir de romarin au crépuscule)  |
| `--ink-2`    | `#5A6B55` | Sauge fanée             | Texte secondaire, légendes, eyebrows                                  |
| `--accent`   | `#2E8C8C` | Turquoise golfe         | CTA principal, baignade, eau, liens, frise mer                        |
| `--accent-2` | `#B5732E` | Ocre cuir de selle      | Numéros, badges, jalons du sentier, accent terre/maquis               |
| `--gold`     | `#E0A23B` | Or de coucher de soleil | Réservé EXCLUSIVEMENT à la section baignade-crépuscule (halo, soleil)  |

> Light mode strict, mais fond végétal froid `#EEF0E6` (pas un cream chaud). La palette EST le trajet : `--ink` vert-maquis (départ en hauteur) → `--accent` turquoise (arrivée mer) → `--gold` (coucher de soleil de la baignade). Le `--gold` est un token rare, sorti une seule fois pour faire éclater le money shot.

### Contrastes (vérifiés sur `--bg` #EEF0E6)

- `--ink` #1E2B1E : ~12.8:1 (AAA)
- `--ink-2` #5A6B55 : ~4.7:1 (AA texte)
- `--accent` #2E8C8C : ~3.6:1 (AA large/UI, OK pour CTA bold 18px+ et titres, pas pour petit texte courant)
- `--accent-2` #B5732E : ~3.4:1 (UI / titres bold, pas petit texte)
- `--gold` #E0A23B : décoratif uniquement (halo, soleil SVG), jamais porteur de texte sur `--bg`

> Sur les sections sombres (départ maquis, fond `--ink`), inverser : texte `--bg`/`#F5F6EF`, accent turquoise clair `#5FB9B9`, gold `#F0C268`. Tout texte sur photo applique le scrim + text-shadow réglementaires (voir Motion / contraste).

### Divergence vs 3 derniers clients (garde-fou anti-redondance)

| Client       | `--bg`        | `--ink`        | `--accent`           |
|--------------|---------------|----------------|----------------------|
| La Voûte     | `#F4EDE0` pierre chaude | `#1C1714` basalte | `#B9452A` rouge Calanques |
| Le Bowling   | `#FAF4E6` crème Sagone | `#0E2A3C` marine | `#E85A3C` corail cornet |
| Le Nautic    | `#F4EFE3` parchemin | `#0E2A3A` marine | `#C0502A` terre Balagne |
| **Ranch (ce site)** | **`#EEF0E6` ivoire végétal FROID** | **`#1E2B1E` vert maquis** | **`#2E8C8C` turquoise golfe** |

Les 3 derniers partagent fond parchemin chaud + encre marine/basalte + accent terracotta/corail. Ranch l'Indianna casse les trois axes : fond vert-froid au lieu de chaud, encre VERTE au lieu de bleu-noir, accent TURQUOISE au lieu de rouge-terre. Zéro token repris. Garde-fou validé.

---

## Typographie

- **Display :** `Fraunces` (Google Fonts), poids **300 italic** (titres lyriques du crépuscule) + **500/600 roman** (jalons, sous-titres). Optical size élevé. L'italic léger donne le mouvement, le galbe "sauvage et chaud" demandé, sans tomber dans le menu gastronomique (on l'allège, on l'incline). Choisi plutôt que Playfair pour son optical-size variable et son grain plus organique.
- **Body :** `Jost` (Google Fonts), poids **400** + **500**. Géométrique aéré, presque "carte de randonnée moderne" : lisible plein soleil sur mobile, neutre face au lyrisme de Fraunces. Tracking légèrement positif pour les eyebrows.
- **Numérique / jalons (optionnel, accent) :** `Jost` 500 en small-caps simulées (uppercase + letter-spacing) pour les altitudes/distances/durées du sentier. Pas de mono ici (le mono appartient au Nautic et au Bowling : on diverge).

### Size scale (mobile-first)

- Wordmark hero `clamp(2.8rem, 11vw, 7rem)` Fraunces 300 italic
- h1 `clamp(2.2rem, 6.5vw, 4.4rem)` Fraunces 300 italic, tracking `-0.015em`
- h2 `clamp(1.6rem, 4vw, 2.6rem)` Fraunces 500
- jalon / eyebrow `0.78rem` Jost 500 uppercase, tracking `0.22em`
- body `1.05rem` Jost 400, line-height 1.65
- small `0.85rem` Jost 400

---

## Layout archétype — DIVERGENCE OBLIGATOIRE

**Choix : `sentier-au-crepuscule`.** La page se lit comme une descente du maquis vers la mer au coucher du soleil : l'ambiance (fond, accents, lumière) glisse du vert profond au turquoise puis à l'or, et un fil vertical "sentier" relie les sections comme les jalons d'un chemin de crête. Diverge frontalement du catalogue : aucun autre site ne fait évoluer son ambiance chromatique le long du scroll pour mimer un trajet géographique réel.

### Rythme des sections (de haut en bas)

1. **`depart-maquis` (hero immersif, 100vh)** — Fond `--ink` vert maquis profond, photo `cheval-tete-nature.jpg` ou `chevaux-troupeau-dore.jpg` en arrière-plan assombri (départ, on est encore en hauteur dans le maquis avant le crépuscule). Eyebrow "Centre équestre · Oletta, Nebbio". Wordmark/H1 Fraunces italic : *"Le maquis vous mène jusqu'à la mer."* Lede 28 mots. CTA primaire turquoise "Réserver une balade" (scroll vers contact + tel), CTA secondaire "Voir la baignade à cheval". Pastille note Google 4.9/5 (62 avis) en chip. Money shot tease : une amorce de la frise sentier en bas. Léger parallax sur la photo.
2. **`le-sentier` (frise paysage horizontale — GESTE UI SIGNATURE)** — Bande pleine largeur ~70vh : une frise SVG panoramique dessinée main (silhouette de collines maquis → chemin de crête → descente → plage → mer) qui défile horizontalement, pilotée par le scroll vertical. Voir specs détaillées plus bas. C'est le pont narratif entre maquis et mer.
3. **`la-baignade` (section signature, MONEY SHOT)** — Plein écran, fond qui vire à l'OR (`--gold` halo + dégradé crépuscule), photo `balade-plage-coucher.jpg` (cavaliers plage coucher) ou `cheval-blanc-plage.jpg`. H2 Fraunces italic : *"Se baigner avec les chevaux, au coucher du soleil."* Texte court : balade 2h30/3h dans le maquis jusqu'à la plage de la Roya, puis baignade en mer. Verbatim avis intégré (voir micro-copy). Jauge de coucher de soleil (geste UI secondaire, voir specs). CTA "Réserver cette sortie". C'est le pic émotionnel, ambiance la plus chaude de la page.
4. **`nos-juments` (les chevaux)** — Retour fond `--bg` ivoire calme. Présentation de l'esprit "6 juments + 2 poneys, sélectionnés pour leur tempérament doux". Galerie portraits en strip : `horse-portrait.jpg`, `cheval-brun-liberte.jpg`, `chevaux-deux.jpg`, `cheval-bord-eau.jpg`. Pas de fiches nominatives inventées (donnée non vérifiée) : on parle du troupeau et du caractère.
5. **`pour-les-enfants` (poney club)** — Bloc lumineux doux, photo `poney-enfant.jpg`. "Premiers pas à poney, 6 à 8 ans, tours en main." Ton rassurant familial. Jalon ocre.
6. **`les-sorties` (les expériences, cartes-jalons)** — 3-4 cartes posées le long du fil sentier : Balade maquis + plage, Baignade à cheval au coucher du soleil, Randonnées des Agriates (badge "Juin → Septembre"), Team building équestre (badge "Sur demande"). Chaque carte = un jalon numéroté ocre, durée indicative, niveau "débutants bienvenus", PAS de prix. CTA "Appeler pour réserver" par carte.
7. **`le-cadre` (paysage Nebbio)** — Bandeau immersif `plage-mediterranee.jpg` ou `cavalier-coucher.jpg`. Texte court sur le cadre : maquis parfumé, vignes de Patrimonio, golfe de Saint-Florent, porte des Agriates. Ancrage géographique, SEO local.
8. **`ce-quon-en-dit` (preuve sociale)** — 2-3 verbatims réels (research.md) dans un fond `--ink` calme, étoiles 4.9, sans carousel (statique). Met en avant "moment magique" / "baignade au coucher du soleil".
9. **`pour-nous-rejoindre` (contact + Maps + footer)** — Split desktop / stack mobile. Gauche : "Sur réservation" en grand, téléphone XL cliquable `06 21 90 26 86`, mention "Réponse rapide, on vous conseille la sortie selon votre niveau", lien Facebook, "Oletta, 10 min de Saint-Florent". Droite : Google Maps iframe (`q=42.6521989,9.2997814&z=14&output=embed`), filtre CSS léger pour harmoniser au vert. Footer signature SpeedPost discret.

### Singularités du site (4)

> OVERRIDE 2026-05-29 (règle no-scroll-hijack, incident Horizon Coiffure) : les gestes signature ci-dessous NE SONT PLUS pilotés par la position de scroll. Scroll 100% natif, aucun Lenis. La frise sentier et la jauge soleil se déclenchent UNE fois à l'apparition de leur section (`inView`, tween rAF one-shot). Les ancres utilisent `scroll-behavior:smooth` CSS. L'effet narratif (déroulé maquis→mer, soleil qui descend) est conservé, mais joué en one-shot au lieu d'être scrubbé.

- **Frise sentier panoramique horizontale scroll-driven** (`le-sentier`) : un chemin de crête dessiné qui mène littéralement du maquis à la plage, qui avance quand on scrolle. Personne d'autre dans le catalogue n'a ça.
- **Ambiance chromatique évolutive vert → turquoise → or** au fil du scroll, qui mime la descente réelle au crépuscule. La page change de température comme la vraie sortie.
- **Jauge de coucher de soleil** dans la section baignade : un petit soleil SVG qui descend vers l'horizon selon la progression de la section (geste UI secondaire).
- **Fil-sentier vertical pointillé reliant les jalons numérotés** (sorties) : continuité visuelle du chemin du début à la fin de page.

### Ce que ce site n'a PAS (divergence explicite)

- Pas de marquee défilant (Le Bowling/autres en ont, on s'en passe : le mouvement est dans la frise).
- Pas de typo mono / coordonnées GPS en header (c'est le territoire du Nautic et du Bowling).
- Pas de fond parchemin chaud, pas d'encre marine, pas d'accent terracotta (les 3 derniers).
- Pas de fiches nominatives de chevaux (donnée non vérifiée), pas de prix affichés (non validés), pas de réservation en ligne (n'existe pas → tout pointe vers le téléphone).
- Pas d'arches SVG (La Voûte), pas de rose des vents (Le Nautic), pas de scorecard (Le Bowling).

---

## Geste UI signature — la frise sentier (`le-sentier`) : specs builder

**Concept :** un panorama SVG horizontal dessiné main représentant le trajet réel : départ maquis en hauteur (collines + silhouettes de chevaux), chemin de crête qui descend, arrivée plage de la Roya, mer turquoise. La frise est plus large que l'écran (viewBox ~2400×600) et se translate horizontalement en fonction du scroll vertical de la section.

**Implémentation :**
- Section `le-sentier` en `position: relative`, hauteur `~180vh` (pour avoir de la course de scroll). À l'intérieur, un conteneur sticky `position: sticky; top: 0; height: 100vh; overflow: hidden`.
- La frise SVG (largeur ~2400px) est posée dans ce sticky. On lit la progression de la section via Motion One `scroll(callback, { target: section, offset: ["start start", "end end"] })`, valeur `progress` ∈ [0,1].
- `translateX` de la frise = `progress * (svgWidth - viewportWidth) * -1`. Donc on "avance" sur le chemin de gauche (maquis) vers la droite (mer) au fil du scroll.
- Le **point de départ** (gauche) est teinté `--ink` vert maquis. La portion **droite** (mer/plage) est teintée `--accent` turquoise + amorce de `--gold`. Un dégradé SVG `linearGradient` (vert → turquoise → or) sous le tracé du sentier matérialise la descente.
- Un **petit marqueur "vous êtes ici"** (silhouette de cheval+cavalier SVG, ~40px) reste fixe au centre de l'écran pendant que le décor défile derrière : sensation d'avancer.
- Légendes-jalons qui apparaissent en fondu au passage : "Le maquis" (à 10%), "Le chemin de crête" (à 45%), "La plage de la Roya" (à 80%), "La mer" (à 100%) — Jost uppercase letter-spaced, fondu via `inView`.
- **Fallback no-JS / reduced-motion :** si JS off ou `prefers-reduced-motion`, la section devient une frise statique non-sticky (hauteur auto), affichée en entier, scrollable horizontalement au doigt sur mobile (`overflow-x:auto; scroll-snap`). Aucune dépendance JS pour voir le panorama.
- **Mobile :** réduire viewBox visible, frise tout de même scroll-driven mais plus courte (hauteur section `~140vh`), marqueur cheval plus petit.

**SVG à dessiner (inline) :** collines superposées (3 plans, parallax léger entre plans pour profondeur), pointillés du chemin, vagues stylisées à droite, 1-2 silhouettes de chevaux. Trait `--ink` 2px côté maquis, `--accent` côté mer, fills aplats doux. Pas de lib externe nécessaire : SVG inline + Motion One suffisent.

## Geste UI secondaire — jauge de coucher de soleil (`la-baignade`)

- Dans la section signature, un disque solaire SVG (`--gold`, halo radial) part haut-gauche et **descend vers une ligne d'horizon** au fil de la progression de la section (même technique `scroll(... target: section)`).
- À mesure que le soleil descend, le fond de section se réchauffe (interpolation de la couleur de fond ou de l'opacité d'un overlay `--gold`), renforçant le crépuscule pile sur le money shot.
- Reduced-motion : soleil posé bas (coucher figé), aucun mouvement.

---

## Motion language

- **Entrées scroll** : `Motion.inView`, `opacity 0→1 + translateY 22px→0`, durée **0.5s**, easing `[0.2, 0.7, 0.2, 1]`, stagger **70ms** sur groupes (cartes sorties, portraits chevaux). Jamais > 0.6s.
- **Filet de sécurité** : `[data-reveal]{opacity:0}` conditionné par `.js-ready` ajouté par le module ; `@keyframes autoreveal` forçant opacity:1 à ~0.5s si Motion plante.
- **Hero parallax** : photo de fond translateY ~8% sur scroll, lent.
- **Frise sentier** : scroll-driven horizontal (specs ci-dessus), pas d'easing artificiel, suit le scroll en direct (`requestAnimationFrame`).
- **Jauge soleil** : scroll-driven, descente linéaire.
- **Cards sorties hover** : `translateY(-3px)` + ombre douce verte `0 8px 24px rgba(30,43,30,.12)`, le jalon numéro passe `--ink-2 → --accent-2`, 180ms.
- **CTA hover** : turquoise `--accent` → légère montée luminosité, soulignage qui se trace.
- **Smooth scroll global** : Lenis actif (cohérent avec la descente du sentier, sensation de glisse).
- **Interdits** : pas d'autoplay vidéo, pas de cursor follower, pas de popup, pas d'animation > 0.6s sur les reveals.

---

## Images sélectionnées (mapping section → fichier)

Toutes déjà présentes dans `site/assets/images/`. Référencer uniquement les chemins locaux.

| Rôle / section                    | Chemin local                                  | Ratio cible | Alt text (FR)                                              |
|-----------------------------------|-----------------------------------------------|-------------|------------------------------------------------------------|
| hero `depart-maquis` (fond)       | ./assets/images/chevaux-troupeau-dore.jpg     | 16:9 cover  | Troupeau de chevaux dans la lumière dorée du maquis        |
| hero alt / portrait nature        | ./assets/images/cheval-tete-nature.jpg        | 4:5         | Tête de cheval dans la nature, Nebbio                      |
| signature `la-baignade` (money)   | ./assets/images/balade-plage-coucher.jpg      | 4:5 / cover | Cavaliers sur la plage au coucher du soleil                |
| signature appui                   | ./assets/images/cheval-blanc-plage.jpg        | 16:9        | Cheval blanc au bord de la mer, plage de la Roya           |
| `nos-juments` portrait 1          | ./assets/images/horse-portrait.jpg            | 3:4         | Portrait d'une jument du ranch                             |
| `nos-juments` portrait 2          | ./assets/images/cheval-brun-liberte.jpg       | 3:4         | Cheval brun en liberté dans le maquis                      |
| `nos-juments` portrait 3          | ./assets/images/chevaux-deux.jpg              | 3:4         | Deux chevaux du ranch                                      |
| `nos-juments` portrait 4          | ./assets/images/cheval-bord-eau.jpg           | 3:4         | Cheval au bord de l'eau, lumière chaude                    |
| `pour-les-enfants` (poney club)   | ./assets/images/poney-enfant.jpg              | 4:3         | Enfant sur un poney, tour en main                          |
| `le-cadre` (paysage)              | ./assets/images/plage-mediterranee.jpg        | 21:9 cover  | Plage et mer turquoise du golfe de Saint-Florent           |
| `le-cadre` alt / golden hour      | ./assets/images/cavalier-coucher.jpg          | 16:9        | Cavalier au coucher du soleil, golfe de Saint-Florent      |

Aucun placeholder requis : 11 images couvrent les 9 sections. Note interne (NE PAS écrire sur le site) : ce sont des photos d'illustration cohérentes activité+lieu, la vraie photo Google Maps ayant expiré. À remplacer par les photos réelles du ranch après signature. Le design valorise l'ambiance (lumière, mer, maquis) plutôt que la documentation littérale, ce qui rend la substitution future indolore.

---

## Copy directions (pour le builder) — FR, zéro em-dash

- **Eyebrow global :** `CENTRE ÉQUESTRE · OLETTA, NEBBIO · HAUTE-CORSE`
- **H1 hero :** *Le maquis vous mène jusqu'à la mer.*
- **Lede hero (≈28 mots) :** "À dix minutes de Saint-Florent, un ranch familial vous emmène à cheval dans le maquis parfumé, jusqu'à la plage. Et là, on entre dans l'eau, ensemble."
- **CTA primaire :** `Réserver une balade` (ancre vers contact + `tel:`)
- **CTA secondaire :** `Voir la baignade à cheval`
- **H2 signature baignade :** *Se baigner avec les chevaux, au coucher du soleil.*
- **Texte baignade :** "Une balade de deux heures et demie dans le maquis, un petit chemin de crête, puis la plage de la Roya. On entre dans la mer avec les chevaux, au moment où le soleil descend sur le golfe. Une expérience rare en Corse."
- **Verbatim signature (réel, research.md, à citer tel quel) :** « Une belle balade sur un petit chemin de crête jusqu'à la plage de la Roya. Puis un moment magique en se baignant avec les chevaux au coucher du soleil. »
- **Verbatim 2 :** « Les balades dans le maquis c'est super et la baignade en mer avec les chevaux c'est magnifique. Le guide était très sympa. »
- **H2 chevaux :** *Six juments, deux poneys, un caractère doux.*
- **Texte chevaux :** "Nos chevaux sont choisis pour leur tempérament calme et leur sociabilité. Débutants comme cavaliers confirmés sont les bienvenus, chacun à son rythme."
- **H2 enfants :** *Les premiers pas à poney.* (sous-texte : "Tours en main pour les enfants de 6 à 8 ans, en toute douceur.")
- **H2 sorties :** *Nos sorties.* Jalons : `01 Balade maquis & plage`, `02 Baignade à cheval au coucher du soleil`, `03 Randonnée des Agriates (Juin à Septembre)`, `04 Team building équestre (Sur demande)`. Mention récurrente : "Débutants bienvenus · Sur réservation".
- **H2 cadre :** *Au cœur du Nebbio.* Texte : "Maquis parfumé, vignes de Patrimonio, golfe de Saint-Florent et porte des Agriates. Le décor fait partie de la balade."
- **H2 preuve :** *Ce qu'on en dit.* (note 4.9/5 sur 62 avis Google)
- **H2 contact :** *Pour nous rejoindre.* / sous-titre "Sur réservation". Téléphone XL : `06 21 90 26 86`. Note : "Appelez-nous, on vous conseille la sortie selon votre niveau et la marée." Lien Facebook.
- **Badges autorisés :** `4,9/5 · 62 avis`, `Débutants bienvenus`, `Sur réservation`, `Juin → Septembre` (Agriates), `Famille`. INTERDIT : tout prix.

---

## Contraste texte sur image (rappel non-négociable)

Sur hero, signature baignade, cadre : appliquer l'intégralité de la recette rules.md.
- Scrim permanent `<div class="scrim">` (gradient sombre haut + bas + radial central), ne s'efface jamais après animation.
- `filter: brightness(.92) saturate(1.05) contrast(1.03)` sur la photo. Jamais de blur.
- `text-shadow: 0 1px 2px rgba(0,0,0,.45), 0 2px 18px rgba(0,0,0,.35)` sur tout texte posé sur photo.
- Texte `#fff`, eyebrow blanc cassé chaud, chiffres d'accent en version claire (turquoise clair `#5FB9B9`, gold clair `#F0C268`).
- Chips note Google / badges : `background:rgba(20,28,18,.45); backdrop-filter:blur(4px); color:#fff`.

---

## Notes techniques builder

- Pas de lib externe nécessaire : frise SVG + jauge soleil = SVG inline + Motion One `scroll()` + Lenis. Tout tient dans le stack imposé (Tailwind pré-compilé, Motion One, Lenis).
- Tailwind : pré-compiler `tailwind.css` (theme.extend palette ci-dessus + fontFamily Fraunces/Jost). Jamais le CDN play.
- Google Fonts : `Fraunces:ital,opsz,wght@1,9..144,300;0,9..144,500;0,9..144,600` + `Jost:wght@400;500`, via preconnect + display=swap.
- Maps iframe : `https://maps.google.com/maps?q=42.6521989,9.2997814&z=14&output=embed`.
- `prefers-reduced-motion` : frise et soleil passent en états statiques (specs ci-dessus).
- Bouton téléphone flottant mobile : fixed bottom-right, `tel:+33621902686`, fond `--accent` turquoise, icône SVG combiné, masqué ≥ 1024px. Le téléphone est l'unique conversion : il ne doit jamais être à plus d'un geste.
- Zéro em-dash `—` dans tout le HTML (check `grep -c $'—'` = 0).

---

## Checklist avant handoff au builder

- [x] 6 couleurs hex définies, contrastes vérifiés sur `--bg`
- [x] 2 polices Google Fonts nommées avec poids (Fraunces 300i/500/600 + Jost 400/500)
- [x] 1 archétype custom choisi + justifié (`sentier-au-crepuscule`)
- [x] 9 sections ordonnées
- [x] 11 images réelles assignées à des rôles, 0 placeholder
- [x] ≥ 1 geste UI signature spécifié avec implémentation (frise sentier scroll-driven + jauge soleil)
- [x] Motion décrit, durées + easing précisés, filet de sécurité reveal
- [x] Google Maps iframe (lat/lng) prêt
- [x] Palette ne reprend aucun token des 3 derniers clients (vérifié en tableau)
- [x] Aucun prix, aucune donnée non vérifiée, téléphone omniprésent
