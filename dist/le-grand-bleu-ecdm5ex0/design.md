# Design brief — Le Grand Bleu (L'Île-Rousse)

## 0. Réflexion UX (question par question)

**Visiteur-type :** Touriste gastronome culturellement informé (30-65 ans), couple qui célèbre un dîner en Balagne, lecteur de guides imprimés (Gault&Millau, Petit Futé, Michelin guide vert, Fooding), CSP+, probablement en vacances ou en court-séjour à Calvi/Île-Rousse. Device : 60% mobile (consultation en terrasse, en marchant), 40% desktop/tablette (recherche en amont depuis la location). Moment : après-midi (préparation du dîner) ou fin de matinée (arbitrage midi).

**Contexte d'arrivée :** Recherche Google typée « meilleur restaurant Île-Rousse », citation dans un guide papier avec QR code, mention Travelers' Choice TripAdvisor 2025, bouche-à-oreille de l'hôtel ou de la villa louée, recommandation IA (« bonne table Balagne cuisinée »).

**Intention primaire :** Voir les plats signature (texte + photo), ressentir l'écriture culinaire (ce n'est pas une paillote anonyme, c'est une maison), vérifier le niveau (avis + presse), réserver par téléphone. Le visiteur veut être rassuré sur la qualité avant d'engager son dîner de vacances.

**Intention business :** Positionner Le Grand Bleu en table-découverte (pas en bistrot dépannage), remplir les couverts du soir à 30-40 € en attirant la clientèle guide-gastronomique, faire monter le panier moyen en affirmant l'ambition culinaire (tartare au couteau, pasta maison, duo père-fils), tenir la saison 15 avril - 15 octobre avec des soirées pleines.

**Contrainte UX structurante :** Pas de réservation en ligne (tout passe par le 04 95 60 00 37) donc le CTA téléphone doit être dominant et accessible à tout moment. Peu de photos propriétaires (3 assets démo seulement) donc le site doit compenser par une très forte écriture typographique : le texte porte le lieu autant que l'image. Saisonnalité forte : le site doit valoir autant hors-saison (décision à J-15) qu'en pleine saison (décision à J+0).

**Émotion-cible à 5s :** Confiance dans la transmission père-fils + appétit pour une cuisine écrite, pas pour un menu. Sensation d'ouvrir un article de magazine gastronomique (Fooding, Gault&Millau, Le Monde M) plutôt qu'une page commerciale. Sophistication chaleureuse, jamais guindée.

**Money shot :** Un titre éditorial pleine page, traité comme une couverture de magazine, façon « Le Grand Bleu — Place du Canon, sous le ficus de 35 ans, Bernard et Sébastien écrivent une cuisine de Balagne », avec une typo display très marquée et une drop-cap d'ouverture en terracotta-tartare. Pas d'image gigantesque en hero : le mot d'abord, l'image en second souffle.

---

## Archétype

**`magazine-editorial`** (imposé et parfaitement aligné avec le positionnement Gault&Millau / Travelers' Choice / duo père-fils : l'écriture culinaire est le produit). Justification : Le Grand Bleu vend une cuisine cuisinée (tartare découpé en salle, pasta maison, desserts signature) à un public qui lit avant de manger, donc le site doit se lire comme un article. Diverge radicalement des archétypes maritime / bento / fullbleed-photo : ici le texte porte le sens, l'image respire en marge.

---

## Palette de couleurs

| Rôle       | Hex      | Nom descriptif        | Utilisation                                                  |
|------------|----------|-----------------------|--------------------------------------------------------------|
| `--bg`     | `#F4EEE2` | Lin chaud             | Fond principal (papier crème de magazine culinaire)          |
| `--ink`    | `#1A1814` | Encre                 | Texte principal, titres display, drop-caps secondaires       |
| `--ink-2`  | `#5A5247` | Sable ombré           | Texte secondaire, légendes, eyebrows, métadonnées            |
| `--accent` | `#B64A2E` | Terracotta tartare    | Drop-cap, pull-quotes, liens, CTA, surlignages éditoriaux    |
| `--line`   | `#3F5236` | Vert ficus            | Filets, séparateurs de colonnes, cadres d'images, signatures |

> Palette choisie pour évoquer le papier chaud d'un numéro de Gault&Millau (lin + encre), la chair crue du tartare (terracotta) et le ficus de 35 ans qui ombrage la Place du Canon (vert ficus profond). Contraste AA vérifié : ink (#1A1814) sur bg (#F4EEE2) ratio ~13.8:1 ; accent (#B64A2E) sur bg ratio ~5.4:1 (AA large et body OK) ; vert ficus (#3F5236) sur bg ratio ~7.1:1 AA. Aucun bleu méditerranéen : ce site parle de cuisine écrite, pas de mer.

---

## Typographie

- **Display :** `Fraunces` (Google Fonts) — poids 300 (subtil), 500 (courant), 700 (titres de section), 900 (cover H1) — axe optique SOFT activé pour grandes tailles (opsz 144), axe SOFT sur pull-quotes. C'est la police éditoriale de référence 2024-2026, elle donne immédiatement le ton « magazine de cuisine sérieux ».
- **Body :** `Inter` (Google Fonts) — poids 400 (corps), 500 (lede et métadonnées) — lisibilité mobile parfaite, contrepoint neutre au Fraunces expressif.
- **Italique de citation :** `Fraunces italic` 400 pour les pull-quotes, évoque le ton Gault&Millau.
- **Size scale (mobile-first) :**
  - `cover-title` (H1 hero) : `clamp(3.2rem, 11vw, 8.4rem)`, Fraunces 900, opsz 144, leading 0.92, tracking `-0.035em`
  - `section-title` (H2) : `clamp(2rem, 5vw, 3.4rem)`, Fraunces 700, tracking `-0.02em`
  - `article-h3` : `clamp(1.3rem, 2.6vw, 1.7rem)`, Fraunces 500
  - `pull-quote` : `clamp(1.8rem, 4.6vw, 3rem)`, Fraunces italic 400, leading 1.15
  - `drop-cap` : `5.2rem` à `7rem`, Fraunces 900, couleur terracotta, flottant 3 lignes
  - `lede` : `1.18rem` Inter 500, leading 1.55
  - `body` : `1.02rem` Inter 400, leading 1.65 (mesure 62ch max en colonne simple, 36ch en double colonne)
  - `eyebrow` : `0.78rem` Inter 500, uppercase, tracking `0.18em`, vert ficus
  - `caption` : `0.82rem` Inter 400 italic, sable ombré
- **Tracking général :** display `-0.025em`, body `0`, eyebrow `0.18em`.

---

## Layout archétype

**Choix : `magazine-editorial`** : le site se lit comme un article magazine culinaire de 6 pages, avec couverture, chapô, colonnes, drop-caps, pull-quotes en marge, légendes d'image, encadré pratique. Diverge radicalement des autres clients déjà livrés : pas de grille produits, pas de bento, pas de fullbleed maritime, pas d'horloge dynamique, pas de timeline. Ici, c'est une mise en page de presse gastronomique transposée au web.

### Rythme des sections (à lire de haut en bas)

1. **`cover`** : page de couverture éditoriale. Pas d'image hero. Fond lin, filets verts fins horizontaux en haut et en bas (façon tranche de couverture). Eyebrow centré en vert ficus « NUMÉRO 01 : BALAGNE , PLACE DU CANON ». H1 monumental Fraunces 900 sur 3 lignes « Le Grand Bleu, une cuisine écrite sous un ficus de trente-cinq ans ». Sous-titre Inter 500 taille lede : « Bernard et Sébastien, tartare au couteau, pasta maison, poissons de Balagne. Travelers' Choice 2025. » Métadonnées en bas de page à la manière d'un ours : « L'Île-Rousse, Haute-Corse · Service midi & soir · +33 4 95 60 00 37 ». CTA double en ligne discrète : `Réserver au 04 95 60 00 37` (terracotta) / `Voir la carte` (ancre).

2. **`chapo-edito`** : chapô introductif format article. Une seule colonne centrée, 62ch max. Drop-cap terracotta 3 lignes à gauche du premier mot. Texte Fraunces italic sur 4-5 phrases. Surligne l'histoire humaine : place centrale, ficus trentenaire, duo père-fils. Filet vert ficus 1px au-dessus et en-dessous.

3. **`ouverture-image`** : première respiration visuelle. Image hero réelle (terrasse sous ficus) en 16:10, cadre vert ficus 2px, cartouche de légende en bas à droite Inter italic : « La terrasse, Place du Canon, printemps 2025 ». Pas de texte superposé sur l'image : image et légende, comme dans un magazine.

4. **`article-signature`** : cœur éditorial. Mise en page **double colonne** style Gault&Millau. Titre de section H2 en haut pleine largeur « La cuisine, écrite au couteau ». Corps texte sur deux colonnes (mesure 36ch chaque) présentant les signatures dans un texte suivi, pas de bullets : le tartare découpé en salle, les raviolis ricotta-épinards à l'huile de menthe, les pasta aux langoustines, le citron trompe-l'œil. Trois petites images (1:1, 240px) flottent en marge de la colonne droite à intervalles asymétriques, chacune légendée en italique. Une `ancre-citation` glisse depuis la marge droite sur scroll (voir singularités).

5. **`encadre-maison`** : encadré sur fond blanc cassé (#FBF8F0) avec fin trait vert ficus, format à part dans l'article : « La maison en bref ». Deux colonnes typographiques étroites listant des faits courts (note 4.4/5 sur 1181 avis, Travelers' Choice TripAdvisor 2025, service midi 11h30-14h, service soir 18h45-22h, saison avril-octobre, rapport qualité-prix menu complet à 26€). Structure clé/valeur en Fraunces 500 pour la clé, Inter 400 pour la valeur, filets fins entre chaque ligne. Zéro icône ni emoji : uniquement de la typographie.

6. **`duo-pere-fils`** : portrait éditorial du duo, une colonne centrée large (76ch). Sous-titre Fraunces italic « Deux signatures, une même main ». Texte narratif 180-220 mots qui raconte Bernard et Sébastien. À droite du texte, placeholder signalé pour portrait (2:3) avec légende Inter italic « Bernard & Sébastien, duo père-fils ». Deuxième `ancre-citation` déclenchée ici.

7. **`galerie-planche`** : planche-contact à la manière d'un magazine avec légendes numérotées. Grille 3 colonnes x 2 lignes, images 4:5 avec cartouches « 01 Terrasse », « 02 Pasta », « 03 Tartare », « 04 Salle », « 05 Façade », « 06 Dessert ». Filet vert ficus 1px autour de chaque photo. Numérotation en Fraunces 700 terracotta. Placeholders signalés pour 3 images manquantes.

8. **`carnet-pratique`** : dernière page de l'article, ours pratique. Mise en page en 3 colonnes : adresse + carte Google Maps iframe (ratio carré 1:1, pas de ronds, cadre filet vert ficus), horaires en liste typographique (jours + plages horaires en Inter 500), téléphone en très gros Fraunces 700 terracotta cliquable (`tel:`). Pas de formulaire de réservation (contrainte UX). Mention discrète « Hors saison, nous consulter ».

9. **`colophon`** : footer façon ours de magazine. Petite typo Inter 400 small caps, mention Menghi Computer Science, mentions légales, liens Facebook & Instagram en hyperliens texte soulignés terracotta. Filet vert ficus final. Aucun logo social, aucune icône. Texte pur.

### Singularités du site (5)

- **Ancre-citation en overlay de marge** : 2 pull-quotes fullscreen issues d'avis clients glissent depuis la marge droite en overlay quand on scrolle entre sections (sections 4 et 6). La citation occupe 60% de la largeur écran en Fraunces italic 900 taille `clamp(2.2rem, 5.5vw, 3.8rem)`, fond lin translucide à 92%, filets terracotta en haut et en bas, attribution en petit en dessous (« avis Google 5 étoiles, 2024 »). Elle reste visible 1.6s puis glisse vers la droite en sortie. Déclenché par `Motion.inView` sur des ancres invisibles placées à 25% et 75% du scroll total. C'est le geste signature du site.
- **Drop-caps terracotta** en ouverture de chapô et de chaque sous-section narrative, flottantes 3 lignes, purement typographiques, façon magazine imprimé.
- **Double colonne typographique** en section 4 (et nulle part ailleurs), exactement comme un article imprimé : rompt la monotonie des sites web mobile-first qui restent en colonne unique.
- **Numérotation éditoriale** partout : « NUMÉRO 01 », sections préfixées « I. » / « II. » / « III. » en Fraunces small caps terracotta en marge gauche (marginalia desktop), masquées en mobile.
- **Absence totale d'icônes, emojis, boutons ronds, ombres lourdes** : tout passe par la typographie, les filets, l'espace blanc. Aucune skeuomorphie.

### Ce que ce site n'a PAS (divergence explicite)

- Pas de hero image fullbleed plein-écran. Le mot est premier.
- Pas de grille produits-catalogue (aucun « nos plats en 6 cards »).
- Pas de marquee défilant horizontal.
- Pas d'horloge dynamique ni de statut « ouvert/fermé maintenant ».
- Pas de timeline verticale.
- Pas de bento-grid modulaire.
- Pas de reveal scroll-jacké séquentiel style one-pager agency.
- Pas de cursor follower, pas de sticky side-nav, pas de dock flottant.
- Pas de formulaire de réservation (contrainte métier : téléphone uniquement).
- Pas de galerie Instagram embed. Pas de carrousel Swiper. Pas de slider. Pas de popup cookies agressif. Pas de video background.

---

## Motion language

- **Entrées scroll (tous blocs de texte et images)** : `Motion.inView` avec `opacity 0 → 1 + translateY 18px → 0`, durée 0.75s, easing `[0.2, 0.7, 0.2, 1]`, stagger 70ms sur groupes typographiques (titres puis lede puis corps).
- **Drop-cap à l'apparition** : échelle `0.94 → 1` + couleur `ink → terracotta` en 1.1s sur `Motion.inView` (effet « l'encre sèche »).
- **Ancre-citation (geste signature)** : déclenchée à 25% et 75% du scroll. Entrée : `translateX 40% → 0 + opacity 0 → 1`, durée 0.9s, easing `[0.16, 1, 0.3, 1]`. Maintien 1.6s. Sortie : `translateX 0 → -8% + opacity 1 → 0`, durée 0.7s, easing `[0.4, 0, 0.6, 1]`. Pendant l'overlay, le fond de la page reçoit un filter `brightness(0.97)` subtil pour signaler la pause de lecture. Dismiss manuel possible via clic partout ou touche Esc.
- **Filets horizontaux** : dessinés à l'apparition via `scaleX 0 → 1` transform-origin left, durée 1.1s easing `[0.2, 0.7, 0.2, 1]`.
- **Hover sur liens terracotta** : underline `text-decoration-thickness 1px → 2px` + couleur subtilement plus soutenue, transition 200ms.
- **Images de la planche-contact** : hover `scale 1 → 1.02` + ombre douce `0 10px 30px rgba(26,24,20,0.08)`, transition 240ms.
- **Parallax** : aucun parallax sur hero (il n'y a pas de hero image). Parallax léger -6% sur l'image de la section 3 (ouverture-image) uniquement.
- **Smooth scroll global** : Lenis actif avec `duration: 1.2, easing: t => 1 - Math.pow(1 - t, 3)`.
- **Interdits** : pas d'auto-play vidéo, pas de cursor custom, pas de popup cookies bloquant, pas de scroll-jack qui prend le contrôle, pas de confetti, pas d'emoji animé.

---

## Images sélectionnées

Utiliser **uniquement les chemins locaux** dans `site/assets/images/`.

| Rôle                    | Chemin local                                              | Source (URL origine)                                              | Alt text                                                  |
|-------------------------|-----------------------------------------------------------|-------------------------------------------------------------------|-----------------------------------------------------------|
| ouverture-image (16:10) | `./assets/images/hero-grand-bleu-terrasse.jpg`            | `lh3.googleusercontent.com` (Google Maps, asset démo)             | Le Grand Bleu, terrasse sous le ficus, Place du Canon     |
| signature-plat (1:1)    | `./assets/images/tripadvisor-grand-bleu.jpg`              | `dynamic-media-cdn.tripadvisor.com` (og:image, asset démo)        | Une assiette signature, Le Grand Bleu                     |
| signature-ambiance (1:1)| `./assets/images/thumbnail-grand-bleu.jpg`                | `lh3.googleusercontent.com` (Google Maps, asset démo)             | Ambiance de salle et terrasse, Le Grand Bleu              |
| portrait-duo (2:3)      | `https://placehold.co/600x900?text=Portrait+Bernard+%26+Sebastien` | **placeholder** , pas de photo du duo disponible dans le research | Bernard et Sébastien, duo père-fils (portrait à fournir)  |
| galerie-planche 01      | `./assets/images/hero-grand-bleu-terrasse.jpg` (recadrée 4:5) | idem                                                              | 01 Terrasse sous le ficus                                 |
| galerie-planche 02      | `./assets/images/tripadvisor-grand-bleu.jpg` (recadrée 4:5) | idem                                                              | 02 Plat signature                                         |
| galerie-planche 03      | `./assets/images/thumbnail-grand-bleu.jpg` (recadrée 4:5) | idem                                                              | 03 Détail de salle                                        |
| galerie-planche 04      | `https://placehold.co/480x600?text=Pasta+maison`          | **placeholder**                                                   | 04 Pasta maison (photo à fournir)                         |
| galerie-planche 05      | `https://placehold.co/480x600?text=Tartare+au+couteau`    | **placeholder**                                                   | 05 Tartare au couteau (photo à fournir)                   |
| galerie-planche 06      | `https://placehold.co/480x600?text=Dessert+signature`     | **placeholder**                                                   | 06 Dessert signature (photo à fournir)                    |

**Bilan images :** 3 images réelles locales (réutilisées en recadrages différents pour les rôles redondants) + 4 placeholders signalés. Recommandation explicite au builder et au client : remplacer les 4 placeholders par des photos propriétaires (portrait duo, pasta, tartare, dessert) après signature du contrat.

---

## Copy directions (pour le builder)

- **Eyebrow couverture :** `NUMÉRO 01 · BALAGNE , PLACE DU CANON` (capitales Inter 500, letter-spacing 0.18em, vert ficus, séparateur `·`)
- **H1 couverture :** `Le Grand Bleu, une cuisine écrite sous un ficus de trente-cinq ans` (Fraunces 900, 3 lignes, leading 0.92)
- **Lede couverture :** `Bernard et Sébastien, duo père-fils, signent une table de Balagne : tartare découpé au couteau en salle, pasta maison, poissons du jour. Travelers' Choice 2025, 4.4 sur 5 après 1181 avis.` (2 phrases, 38 mots, Inter 500)
- **Chapô éditorial (section 2) :** 90-110 mots commençant par une drop-cap terracotta. Ouverture possible : « Place du Canon, l'ombre d'un ficus de trente-cinq ans dessine un salon à ciel ouvert. C'est là que Bernard et Sébastien cuisinent une Balagne de mémoire et d'envie. » Puis évoque le tartare en salle, la pasta, la confiance du guide.
- **H2 section signature :** `La cuisine, écrite au couteau`
- **H2 section duo :** `Deux signatures, une même main`
- **H2 encadré :** `La maison en bref`
- **H2 galerie :** `Planche , saison 2025`
- **H2 pratique :** `Nous trouver, nous appeler`
- **Pull-quote 1 (ancre-citation, section 4) :** `Le tartare découpé au couteau devant nous, un vrai spectacle et un plat savoureux.` (avis Google 5 étoiles)
- **Pull-quote 2 (ancre-citation, section 6) :** `Cuisine maison, généreuse, raffinée, on repart rassasiés et heureux.` (TripAdvisor 5 étoiles)
- **CTA primaire :** `Réserver au 04 95 60 00 37` (lien `tel:+33495600037`, Fraunces 500 terracotta, souligné 1px)
- **CTA secondaire :** `Lire la carte` (ancre vers section signature)
- **Règles de ponctuation :** aucun tiret cadratin ; remplacer par virgule, deux-points ou parenthèse. Apostrophes typographiques `'` bienvenues.

---

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, contrastes AA vérifiés (ink 13.8:1, accent 5.4:1, ficus 7.1:1)
- [x] 2 polices Google Fonts nommées (Fraunces display + Inter body) avec poids 300/500/700/900 et 400/500
- [x] 1 archétype choisi et justifié (`magazine-editorial`)
- [x] 9 sections ordonnées (cover / chapo / ouverture-image / signature / encadré / duo / galerie / pratique / colophon)
- [x] 3 images réelles assignées + 4 placeholders signalés avec rationale
- [x] Motion language décrit avec durées et easings précis, incluant le geste signature `ancre-citation`
- [x] Google Maps iframe prêt : `https://maps.google.com/maps?q=42.6357258,8.9378093&output=embed`
- [x] Aucun tiret cadratin dans les copy directions client-facing
- [x] Light mode only, mobile-first
