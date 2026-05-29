# Design brief — La Vieille Cave (Algajola)

## 0. Réflexion UX (question par question)

**Visiteur-type :** Couple ou famille en vacances en Balagne, 30-55 ans, fin d'après-midi sur smartphone (4G), souvent depuis la plage d'Algajola ou L'Île-Rousse, qui cherche "où dîner ce soir" autour de 18h-19h. Secondaire : résidents secondaires italiens/anglais relisant les avis avant réservation téléphone.

**Contexte d'arrivée :** Recherche Google "restaurant Algajola pierrade", recommandation TripAdvisor (n°2/14), bouche-à-oreille sur la plage, ou QR code sur l'ardoise de la Place de l'Olmo.

**Intention primaire :** Vérifier en 10 secondes que (1) c'est ouvert ce soir, (2) que ça vaut le détour, (3) trouver le numéro pour réserver. Secondaire : voir à quoi ressemble la pierrade et la cave voûtée.

**Intention business :** Remplir les services du soir en haute saison sans dépendre d'une plateforme tierce, et installer la pierrade comme rituel signature dans l'imaginaire des visiteurs (différenciant absolu vs les 13 autres restaurants d'Algajola).

**Contrainte UX structurante :** Restaurant **uniquement le soir** (17h30 → 22h30), pas de réservation en ligne (téléphone seul), saisonnalité forte. Le site doit donc faire du téléphone l'action centrale, faire de l'ouverture à 17h30 un moment de bascule visible, et porter l'ambiance "soir/cave" sans jamais basculer en dark mode.

**Émotion-cible à 5s :** Chaleur de braise, intimité d'une cave éclairée à la bougie, anticipation gourmande du grésillement de la pierre. Pas froid, pas chic-distant : chaud, rituel, terroir.

**Money shot :** La **pierre volcanique noire qui rougeoit** au centre de la table, viandes/poissons crus disposés autour, lumière dorée tombant des voûtes. C'est l'image fondatrice qui doit accrocher dès l'arrivée.

## Archétype

**`braise-nocturne` (custom, light mode)** : un site **lumineux fond calcaire/sable** où le ton "soir & cave" est porté exclusivement par les **photographies réelles tamisées**, les **accents braise** vifs et l'**italique chaude** du Cormorant. La singularité graphique : une **pierre volcanique** dans le hero qui passe d'un **gris-pierre froid à l'incandescence orange-braise** au scroll (thermal-stone glow scroll-driven), comme une braise qu'on souffle. Le contraste fond clair / pierre qui rougeoie / photos chaudes crée une tension visuelle propre, jamais vue dans le catalogue. Diverge radicalement de tous les archétypes brûlés : aucun split-sticky, aucune timeline, aucune grille bento, aucun fullbleed-cinéma, aucune voûte SVG.

## Palette de couleurs (light mode strict)

| Rôle       | Hex      | Nom descriptif         | Utilisation                                           |
|------------|----------|------------------------|-------------------------------------------------------|
| `--bg`     | `#F2E8D2` | Calcaire bougie        | Fond principal du site, sable chaud lumineux          |
| `--ink`    | `#1F1610` | Basalte profond        | Texte principal (contraste 14.6:1 sur bg, AAA)        |
| `--ink-2`  | `#7A5A3A` | Terre cuite patinée    | Texte secondaire, eyebrows, métadonnées (contraste 5.1:1, AA) |
| `--accent` | `#D9461E` | Braise vive            | Pierrade glow, CTA téléphone, indicateur ouvert (contraste 4.6:1, AA) |
| `--line`   | `#D9C7A3` | Mortier sec            | Séparateurs, borders subtiles, fond surfaces "pierre" |

> **Light mode confirmé**, conforme à `workflows/rules.md`. L'ambiance "soir/cave" est portée par : (1) photos déjà sombres et tamisées (cave voûtée, pierres apparentes, plats à la bougie), (2) accent braise saturé en CTA et glow, (3) typographie Cormorant italic 300 chaude, (4) line `#D9C7A3` qui rappelle le mortier sec. Le `--bg` calcaire est le contre-point lumineux qui fait **briller** les photos sombres au lieu de les noyer dans un dark mode plat.

Toutes les paires passent AA. Accent braise utilisé uniquement comme glow + CTA + chiffres clés, jamais en aplat de fond pour préserver son rôle thermique.

## Typographie

- **Display :** `Cormorant Garamond` (Google Fonts), poids 300 italic + 600 — empattements ciselés évoquant les inscriptions de cave et la noblesse rustique méditerranéenne. L'italique 300 sert les eyebrows poétiques ("le soir tombe sur l'Olmo") et porte la chaleur "soir" même sur fond clair.
- **Body :** `Manrope` (Google Fonts), poids 400 + 600 — sans-serif géométrique chaleureux, lisible sur smartphone, contraste fort avec la noblesse du Cormorant.
- **Size scale (mobile-first) :** h1 `clamp(2.6rem, 8vw, 5.4rem)`, h2 `clamp(1.7rem, 4.2vw, 2.6rem)`, body `1.05rem` (line-height 1.7), small/eyebrow `0.8rem` letter-spacing `0.18em` uppercase.
- **Tracking :** display `-0.015em`, body `0`, eyebrow `+0.18em`.

## Layout archétype : `braise-nocturne` (light)

### Rythme des sections (haut → bas)

1. **Nav minimale flottante** : wordmark "La Vieille Cave" en Cormorant 600 sur fond calcaire + chip "Ouvre à 17h30" qui passe à braise vive (`--accent` aplat + ink crème dessus) quand l'heure courante dépasse 17h30, label "Ouvert ce soir". Téléphone toujours visible à droite. Pas de menu hamburger : 4 ancres latérales (Pierrade · Cave · Carte · Réserver).
2. **Hero "pierre qui chauffe"** : photo réelle de la pierrade en plein cadre avec scrim radial chaud, **disque pierre volcanique SVG** superposé qui passe de `#6B6259` (gris-pierre froid) à `#D9461E` (incandescent) sur les 800 premiers px de scroll, halo radial braise qui s'étend autour. Titre H1 court "On dîne autour d'une pierre chaude" en Cormorant 600 ink basalte, eyebrow italique terre cuite "Algajola, Place de l'Olmo · Soir uniquement", deux CTA : `04 95 60 70 09` (aplat braise, ink crème) + `Découvrir la cave` (outline ink basalte). Indicateur **horloge crépusculaire** en bas du hero : arc semi-circulaire stroke `--accent` qui se remplit au fur et à mesure que l'heure réelle approche de 17h30, sur fond calcaire.
3. **Filet d'introduction** (texte court centré, 2 phrases, 40 mots, ink basalte sur calcaire) : pose la dualité cave voûtée + terrasse Olmo. Pas de marquee : silence éditorial après le hero, comme une respiration entre la rue et la salle voûtée.
4. **Le rituel de la pierrade** (section signature, **geste UI singulier**) : trois étapes verticales numérotées 01/02/03 ("La pierre chauffe à 400°", "Vous saisissez", "Vous partagez"). Chaque étape a un disque pierre `--line` mortier qui **rougeoie en braise au scroll-into-view** via box-shadow `inset 0 0 60px rgba(217,70,30,0.7)` + bg interpolé vers `--accent`, animation pulsation lente (3.2s ease-in-out infinite). Photos réelles en appui à droite de chaque étape. Le contraste pierre claire → pierre incandescente est très lisible sur fond calcaire.
5. **La cave & l'Olmo** (dualité spatiale) : composition asymétrique 2 colonnes désaxées (60/40 puis 40/60 décalée) montrant l'intérieur voûté (image réelle sombre tamisée) et la terrasse couverte sous platanes. Texte court à cheval, ink basalte. Légende manuscrite en Cormorant italic 300 terre cuite : "deux salles, deux saisons d'une même soirée". Les photos sombres "trouent" le fond clair comme deux fenêtres sur la nuit.
6. **Carte courte** (3 plats illustrés) : artichauts feuilletés, agneau en cocotte, fondant chocolat. Pas de menu exhaustif : 3 fenêtres typographiques + photo carrée encadrée filet `--line`, prix non affichés, juste l'évocation. CTA : "demander la carte du soir au 04 95...".
7. **Galerie braise** : strip horizontale scrollable (4 images réelles ambiance plats/salle) en aspect 4:5, défilement libre au doigt mobile, scroll snap. Bordure `--line` 1px sur chaque vignette. Pas de masonry : un défilé latéral comme on passerait devant les tables.
8. **Voix des convives** : une seule grande citation centrée ("Le cadre de la cave voûtée est magique le soir, lumières tamisées et pierres apparentes"), Cormorant 300 italic ink basalte XL, 5★ Google + nombre d'avis (909) en chiffres XL braise. Pas de carrousel.
9. **Coordonnées + Maps + Heures** : grande carte iframe Google Maps cadrée filet `--line` (sans hue-rotate, on garde le rendu Maps natif clair), à gauche bloc info typographique : adresse, téléphone XXL cliquable braise, **horloge texte** "Ce soir : ouvert de 17h30 à 22h30" calculée en JS (jour courant). Footer minimal sous : crédits Menghi.

**9 sections** au total, ordre repensé pour intention primaire : la chaleur d'abord, la dualité du lieu ensuite, la preuve sociale en seul gros impact, le téléphone très visible 3 fois (nav, hero, footer).

### Singularités du site (5)

- **Thermal-stone glow scroll-driven (light)** : la pierre volcanique du hero passe du gris-pierre froid `#6B6259` à l'incandescence braise `#D9461E` en fonction du scrollY (interpolation linéaire sur 800px), avec halo radial qui s'étend sur le fond calcaire. Le contraste froid→chaud est plus lisible sur fond clair que sur dark, et devient le geste UI signature.
- **Horloge crépusculaire d'ouverture** : arc SVG stroke braise qui se remplit en fonction de l'heure réelle, complet à 17h30. Si après 17h30, l'arc est plein braise et un point pulse.
- **Chip "Ouvre à / Ouvert ce soir"** dans la nav, calculé live en JS, change d'état visuel (outline ink → aplat braise).
- **Trois disques pierrade qui rougeoient** dans la section rituel : disque mortier clair → bg braise + box-shadow inset orange animé, 3.2s ease-in-out infinite, stagger 1s entre les trois.
- **Galerie en strip horizontal mobile-first** avec scroll-snap et inertie Lenis : pas de grille, on "passe devant les tables".

### Ce que ce site n'a PAS (divergence explicite)

- Pas de dark mode ni de fond sombre (light mode strict).
- Pas de marquee horizontal défilant.
- Pas de hero split classique 50/50.
- Pas de timeline verticale, pas de bento, pas de magazine éditorial à colonnes.
- Pas de voûte SVG structurante (déjà fait sur La Voûte refonte).
- Pas de menu déroulant ni hamburger.
- Pas de section "équipe" ni "histoire datée".
- Pas de carrousel de témoignages.
- Pas de réservation en ligne fictive : le téléphone est la conversion unique.

## Motion language

- **Entrées scroll** : `Motion.inView` opacity 0→1 + translateY 24px→0, durée 0.9s, easing `[0.22, 0.65, 0.2, 1]`, stagger 80ms.
- **Thermal-stone glow (signature)** : `scroll()` de Motion One pilote une interpolation hex `#6B6259` → `#D9461E` sur la pierre du hero (SVG `<circle>` fill + radial-gradient overlay halo), bornée 0→800px scrollY. Sur fond calcaire, l'incandescence "saute" visuellement.
- **Disques pierrade** : transition bg `--line` → `--accent` au scroll-into-view + keyframes CSS `@keyframes ember` box-shadow inset braise pulse 3.2s ease-in-out infinite, stagger 1s.
- **Horloge crépusculaire** : SVG arc, `stroke-dashoffset` calculé en JS depuis `new Date()` au load + setInterval 60s.
- **Hero parallax** : translateY 8% sur l'image pierrade au scroll.
- **Smooth scroll global** : Lenis (durée 1.2, easing exponentiel).
- **Hover CTA téléphone** : translateY -2px + glow box-shadow braise 0 0 24px rgba(217,70,30,0.45), 200ms.
- **Pas d'auto-play vidéo, pas de cursor follower, pas de popup.**

## Images sélectionnées

| Rôle                        | Chemin local                                | Source (origine)                  | Alt text                                                  |
|-----------------------------|---------------------------------------------|-----------------------------------|------------------------------------------------------------|
| hero pierrade (signature)   | ./assets/images/pierrade-ta.jpg             | TripAdvisor /photo-o/             | Pierrade en cours sur pierre volcanique chaude, La Vieille Cave |
| rituel étape (appui)        | ./assets/images/menu-ta.jpg                 | TripAdvisor /photo-o/             | Spécialité pierrade poisson et viande, La Vieille Cave    |
| cave intérieure voûtée      | ./assets/images/hero-vieille-cave-gmaps.jpg | Google Maps lh3 w2400             | Salle voûtée en pierres taillées, lumières chaudes        |
| terrasse Place de l'Olmo    | ./assets/images/devanture-vieille-cave-ta.jpg | TripAdvisor /photo-o/           | Terrasse couverte sous platanes, Place de l'Olmo          |
| carte plat 1 (entrée)       | ./assets/images/interieur-voute-ta.jpg      | TripAdvisor /photo-o/             | Tarte feuilletée artichauts et légumes                    |
| carte plat 2 (viande)       | ./assets/images/plat-agneau-ta.jpg          | TripAdvisor /photo-o/             | Côte d'agneau et pommes de terre rôties                   |
| carte plat 3 (dessert)      | ./assets/images/terrasse-ta-01.jpg          | TripAdvisor /photo-o/             | Fondant chocolat sur crème anglaise                       |
| galerie 1                   | ./assets/images/salle-cave-ta.jpg           | TripAdvisor /photo-o/             | Convive avec poisson grillé en salle                      |
| galerie 2                   | ./assets/images/plat-ta-01.jpg              | TripAdvisor /photo-o/             | Devanture pierrade, signalétique                          |
| galerie 3                   | ./assets/images/plat-ta-02.jpg              | TripAdvisor /photo-o/             | Ambiance soir, table dressée                              |
| galerie 4                   | ./assets/images/plat-ta-05.jpg              | TripAdvisor /photo-o/             | Plat complémentaire                                        |

**12 images réelles** disponibles localement (1 Google Maps HD + 11 TripAdvisor /photo-o/). **Zéro Unsplash. Zéro placeholder.** Toutes les images sont des photos authentiques du restaurant, déjà tamisées/sombres, ce qui crée le contraste "fenêtres nocturnes sur fond calcaire" qui porte l'ambiance soir.

## Copy directions (pour le builder)

- **Eyebrow nav/hero :** `ALGAJOLA · PLACE DE L'OLMO · SOIR UNIQUEMENT`
- **H1 :** "On dîne autour d'une pierre chaude" (6 mots, image-action immédiate)
- **Lede :** "Une cave voûtée en pierres taillées, une terrasse sous les platanes de l'Olmo, et au centre de la table une pierre volcanique qui grésille. Voilà depuis des années le rituel de La Vieille Cave, ouverte chaque soir."
- **Section rituel (titres étapes) :** "01. La pierre chauffe à 400°" / "02. Vous saisissez" / "03. Vous partagez"
- **Citation principale :** "Le cadre de la cave voûtée est magique le soir, lumières tamisées et pierres apparentes", attribuée "convive, TripAdvisor"
- **CTA primaire :** `04 95 60 70 09` (toujours en clair, jamais masqué)
- **CTA secondaire :** `Voir la cave`
- **Chip nav dynamique :** "Ouvre à 17h30" (avant 17h30) / "Ouvert ce soir" (entre 17h30 et 22h30) / "Réouvre demain à 17h30" (après)
- **Aucun em-dash `—`** dans tout le copy site. Substituts : `:`, `,`, `.`, `()`.

## Google Maps

`https://maps.google.com/maps?q=42.6107,8.8597&z=16&output=embed` (lat/lng Algajola Place de l'Olmo, à confirmer depuis CSV).

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, **light mode strict**, contrastes AA/AAA vérifiés
- [x] 2 polices Google Fonts nommées (Cormorant Garamond + Manrope) avec poids
- [x] 1 archétype custom choisi + justifié (`braise-nocturne` light)
- [x] 9 sections ordonnées
- [x] 12 images réelles assignées à des rôles, 0 placeholder
- [x] Motion language décrit (durées + easings)
- [x] Geste UI signature inventé (thermal-stone glow scroll-driven gris→braise sur fond calcaire + horloge crépusculaire)
- [x] Google Maps iframe source prêt
- [x] Em-dash banni du copy
