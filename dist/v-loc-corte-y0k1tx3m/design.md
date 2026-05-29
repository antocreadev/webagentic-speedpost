# Design brief — V'Loc Corte

## 0. Réflexion UX (question par question)

**Visiteur-type :** Trois profils, un dominant. (1) Randonneur/cyclotouriste 28-55 ans en séjour à Corte ou de passage sur la GT20/GR20, qui prépare sa journée la veille au soir ou le matin même, smartphone en main, signal 4G moyen. (2) Famille en vacances cherchant une activité nature accessible. (3) Étudiant de l'Università ou local cherchant location voiture / réparation. Le profil (1) commande le design : il a le goût de l'effort, lit des topoguides, regarde des profils de dénivelé, sait ce qu'est un D+ et une catégorie HC.

**Contexte d'arrivée :** Recherche Google "location vélo électrique Corte", "VTT Restonica", "louer vélo gorges Corse", ou recommandation IA ("comment visiter la Restonica sans voiture"), ou QR code sur un flyer à l'office de tourisme / camping. Mobile à 80%.

**Intention primaire :** "Est-ce que je peux louer un vélo fiable ici, pour faire quoi, à quel prix, et comment je réserve/contacte ?" Sous-intention massive et différenciante : "Je veux monter dans les gorges de la Restonica et le vélo passe là où la voiture est interdite." C'est l'argument qui transforme une location banale en évidence.

**Intention business :** Capter le flux touristique printemps-automne (saison forte), affirmer la position de SEUL loueur de VAE à Corte, valoriser le service humain d'Augustin (conseil + vérif vélo + livraison partout en Corse), et faire vivre l'atelier réparation hors saison. Convertir "je passe" en "j'appelle / je réserve".

**Contrainte UX structurante :** (a) Pas de réservation en ligne : le CTA final est l'appel téléphone à Augustin (06 84 67 92 63), donc le numéro doit être omniprésent et la confiance humaine doit être construite. (b) Une seule vraie photo du commerce existante et expirée : zéro photo authentique du lieu disponible, on s'appuie sur des visuels montagne/VTT thématiques cohérents + un système graphique fort (trace, profil de dénivelé, data outdoor) qui porte l'identité SANS dépendre de photos. (c) Horaires en coupure (08h30-13h / 15h-17h30, fermé dimanche) à communiquer clairement car un cyclotouriste part tôt.

**Émotion-cible à 5s :** L'appel de la montée. Air froid des gorges, effort qui devient panorama, liberté de rouler là où les autres ne peuvent pas. Pas de luxe, pas de cosy : de l'altitude, du granite, de l'oxygène. Confiance dans le matériel et dans l'homme.

**Money shot :** Pas une photo : un **profil de dénivelé géant Corte → Lac de Melo (410 m → 1711 m)** tracé en SVG plein écran, qui se dessine au scroll, avec un compteur altimétrique odomètre qui grimpe. C'est l'identité visuelle ET l'argument de vente (la montée est faisable en VAE) réunis en un seul geste. Le visiteur "voit" le dénivelé que le vélo électrique va lui faire avaler.

---

## Archétype

**`custom` — `altimetric-roadbook`** (roadbook cyclo / profil de dénivelé scrubbable comme colonne vertébrale du site).

Justification : l'argument de vente n°1 de V'Loc (le VAE rend la montée des gorges accessible, là où la voiture est interdite) est intrinsèquement *altimétrique*. On bâtit donc tout le site autour d'un profil de dénivelé qui se parcourt verticalement, chaque section étant une "borne kilométrique" du roadbook. Cela diverge radicalement des 14 archétypes blacklistés et des 3 derniers clients (Le Nautic livre-de-bord marine, Le Bowling scorecard, La Voûte arcade) : ici, ni parchemin, ni arches, ni frames, ni rose des vents : un système de data outdoor (altitude, D+, distance, % batterie) traité comme un instrument de mesure montagne.

## Palette de couleurs

Light mode, registre froid haute-montagne corse (granite + torrent + neige), accent HiViz trail. Aucun token commun avec les 3 derniers clients (qui sont tous en parchemin chaud `#F4EFE3` / `#FAF4E6` / `#F4EDE0` + ink marine + terracotta/corail). Ici le fond est un blanc bleuté glaciaire, pas un cream warm.

| Rôle         | Hex      | Nom descriptif         | Utilisation                                                        |
|--------------|----------|------------------------|-------------------------------------------------------------------|
| `--bg`       | #EEF2F1  | Brume glaciaire        | Fond principal, blanc bleuté froid d'altitude (zéro chaleur cream) |
| `--ink`      | #16201F  | Sapin granite          | Texte principal, profil de dénivelé, titres, traits d'instrument   |
| `--ink-2`    | #5C6B68  | Lichen pierre          | Texte secondaire, légendes mono, cotes altimétriques               |
| `--accent`   | #FF5A1F  | Orange HiViz trail     | CTA, trace GPS, point mobile sur le profil, % batterie, balises     |
| `--line`     | #C9D4D0  | Givre / arête          | Séparateurs, quadrillage du graphe, borders cartes, contour SVG    |

Accent secondaire optionnel (touches < 5%) : `#1F7A6B` vert torrent-châtaigneraie pour les badges "ouvert" / pastilles écologie/silence du VAE. 

> Palette choisie pour évoquer l'altitude froide des gorges de la Restonica (brume glaciaire en fond, sapin-granite en encre, givre en lignes) tranchée par l'orange HiViz du trailrunning/cyclo qui signe l'énergie et le balisage. Le froid du fond crée la sensation d'air pur et fait exploser l'orange du CTA. Contrastes sur `--bg` #EEF2F1 : `--ink` #16201F = 14.6:1 (AAA) ; `--ink-2` #5C6B68 = 4.8:1 (AA) ; `--accent` #FF5A1F = 3.4:1 (réservé non-texte / texte ≥ 19px bold, ou sur fond `--ink` foncé où il passe largement). Pour le texte courant sur accent, poser l'orange sur `--ink` (orange sur sapin = 4.3:1) ou utiliser `--ink` sur orange en gros bold.

## Typographie

- **Display :** `Barlow Condensed` (Google Fonts) — poids 600 + 700 (+ 500 pour sous-titres). Condensé sportif/outdoor, lettres serrées qui évoquent les dossards de course, les panneaux de cols et les topoguides. Sert tous les titres et les grands chiffres d'altitude.
- **Body :** `Inter` (Google Fonts) — 400 + 500 + 600. Neutre, ultra-lisible en plein soleil sur mobile, parfait pour les blocs d'infos pratiques et tarifs.
- **Mono (instrument) :** `JetBrains Mono` (Google Fonts) — 400 + 500. Pour les cotes altimétriques, coordonnées GPS, distances, "D+", "%", légendes du graphe : donne le ton "compteur / GPS / instrument de mesure". Usage chirurgical, jamais en bloc de prose.
- **Size scale (mobile-first) :** h1 `clamp(2.8rem, 9vw, 6rem)` (Barlow Condensed 700, tracking -0.01em, line-height .92) / h2 `clamp(1.9rem, 5vw, 3.2rem)` / h3 `clamp(1.3rem, 3vw, 1.7rem)` / body `1.06rem` line-height 1.65 / mono-label `0.8rem` letter-spacing 0.12em uppercase / chiffre-altitude odomètre `clamp(3rem, 12vw, 8rem)`.
- **Tracking :** display Barlow `-0.01em`, mono labels `+0.12em` uppercase, body `0`.

## Layout archétype — DIVERGENCE OBLIGATOIRE

**Choix : `altimetric-roadbook` (custom).** Le site est un roadbook cyclo vertical : une fine **ligne de profil de dénivelé** court le long du bord gauche (desktop) / en bandeau de progression haut (mobile), et le scroll fait grimper un point orange HiViz le long de cette trace pendant qu'un compteur d'altitude défile. Chaque section est une "borne". Aucune ressemblance structurelle avec parchemin marine, scorecard ou arcades.

### Rythme des sections (à lire de haut en bas)

1. `nav-instrument` : barre fine sticky, fond `--bg` translucide blur. Gauche : wordmark "V'LOC" Barlow 700 + petit pictogramme éclair (VAE). Centre/droite (desktop) : `Itinéraires · Vélos · Atelier · Trouver`. Toujours visible à droite : bouton orange `06 84 67 92 63` (tel:). Sous la barre, un mince **liseré de progression altimétrique** (1.5px) qui se remplit en orange au scroll. Remplace la nav classique par un instrument.
2. `hero — la borne de départ` : pas de photo en money shot. Eyebrow mono `CORTE · 410 m · PORTE DES GORGES`. H1 énorme Barlow : "ROULEZ LÀ OÙ LA VOITURE S'ARRÊTE." Lede 2 phrases. Deux CTA : `Réserver un vélo` (orange, tel) + `Voir les itinéraires` (outline, ancre). À droite/dessous, le **compteur altimétrique odomètre** affichant "410 m" au repos + amorce du profil de dénivelé qui démarre ici. Image de fond discrète possible (mtb-trail-01) en bande basse avec scrim froid, mais la typo + l'instrument dominent.
3. `profil-restonica — LE MONEY SHOT` : section pleine hauteur. Le **profil de dénivelé géant Corte → Lac de Melo se dessine au scroll** (SVG path stroke-dashoffset), le point orange grimpe, le compteur passe de 410 m à 1711 m. Bornes annotées le long de la courbe : `Corte 410m`, `Tuani 850m · au-delà = voiture interdite, vélo OK`, `Bergeries 1370m`, `Lac de Melo 1711m`. Chiffres clés en surimpression : `+1300 m D+`, `~15 km`, `60% batterie suffisent` (preuve sociale chiffrée tirée de l'avis client). C'est le cœur identitaire ET argumentaire.
4. `argument-acces — le vélo passe` : bande horizontale forte, fond `--ink` (sapin granite), texte clair + accent orange. Trois colonnes : "Au-delà de Tuani, les voitures sont interdites." / "Le vélo, lui, est autorisé." / "Le VAE efface le dénivelé." Une seule image (river-gorge-01) en filet à droite. Respiration sombre qui tranche avec le fond clair partout ailleurs.
5. `itineraires — 3 sorties balisées` : trois cartes "roadbook" (pas un catalogue dense). Chaque carte = mini-profil de dénivelé SVG + cotes mono (distance / D+ / niveau / durée) + une phrase. Restonica (Lac de Melo), Tavignano (vallée sauvage), Boucle découverte famille. Images : mountain-pano-01, river-gorge-01, mountain-forest-01. Hover : la mini-trace se dessine + carte translateY -3px.
6. `velos — le matériel` : split asymétrique. Gauche texte : "Du matériel premium, vérifié avant chaque départ." (reprend l'avis : 70 km / 1300 m D+ à 60% batterie). Trois specs en blocs mono (autonomie, D+, robustesse). Droite : images ebike-detail-01 + ebike-02 empilées en léger décalage, filet `--line`. Mention VTT + VTTAE + location voiture.
7. `atelier-augustin — l'humain` : section confiance. Portrait du service (pas de vraie photo dispo → bike-workshop-01 pour l'atelier). Texte : Augustin, conseil terrain, humour corse, vérif vélo, **livraison + récupération partout en Corse**, réparation VAE toute l'année. C'est ici qu'on remplace l'absence de réservation en ligne par la confiance humaine.
8. `preuve — la cote` : bandeau sobre avec la note Google 4.2 (formulée positivement) + 2 verbatims POSITIFS uniquement (l'avis 70km/60% batterie + l'avis "arrangeant, vérifie les vélos, conseille"). Jamais les 3 avis 1★. Style "relevé d'instrument" : note en gros chiffre Barlow + étoiles, verbatims en cartes `--line`.
9. `trouver — borne d'arrivée` : split 50/50 desktop, stack mobile. Gauche : "Quartier de la Gare, 20250 Corte", coordonnées mono `42°18'14"N · 9°09'30"E · 410 m`, horaires en grille mono (coupure midi visible, dimanche fermé), gros numéro cliquable, lien Facebook. Droite : Google Maps iframe `q=42.304027,9.158435&z=15&output=embed`, filtre CSS léger pour rester froid (`grayscale(.1) contrast(1.02)`), encadré filet `--line`. Footer compact dessous.

### Singularités du site (3 à 5)

- **Compteur altimétrique odomètre** : chiffres qui défilent verticalement de 410 m à 1711 m, synchronisés au scroll (geste UI signature exigé par le brief).
- **Profil de dénivelé scrubbable** : le tracé SVG du dénivelé Corte → Lac de Melo se dessine au scroll (stroke-dashoffset), point orange mobile + bornes annotées. Réutilisé en miniature dans les cartes d'itinéraires.
- **Liseré de progression altimétrique** sous la nav, qui se remplit en orange (le visiteur "monte" en lisant).
- **Système d'instrument mono** : toutes les data (altitude, D+, km, %, GPS, heure) en JetBrains Mono comme sur un compteur GPS, créant une cohérence "outil de mesure montagne".
- **Bande sombre unique** (section 4) sur fond clair partout : transgression rythmique forte, évoque l'ombre des gorges.

### Ce que ce site n'a PAS (divergence explicite)

- Pas de fond parchemin/cream chaud (les 3 derniers clients) : fond froid glaciaire.
- Pas de hero pleine photo (fullbleed-photo-first blacklisté + pas de vraie photo dispo) : hero typo + instrument.
- Pas de timeline-verticale, pas d'arches, pas de scorecard, pas de rose des vents, pas de marquee défilant.
- Pas de catalogue dense : seulement 3 itinéraires et 3 specs vélo, choisis.
- Pas de réservation en ligne factice : le CTA assumé est l'appel à Augustin.

## Motion language

- **Entrées scroll** : `Motion.inView`, `opacity 0→1 + translateY 22px→0`, durée 0.5s, easing `[0.2, 0.7, 0.2, 1]`, stagger 70ms sur les groupes (cartes itinéraires, specs). `[data-reveal]{opacity:0}` conditionné par `.js-ready` + `@keyframes autoreveal` filet de sécurité à 0.5s.
- **Profil de dénivelé** : `Motion.scroll` sur la section profil → `stroke-dashoffset` du path de plein (longueur) à 0, le point orange suit la courbe via `offsetDistance` (CSS motion path) lié au progress, durée pilotée par le scroll (scrubbable), pas d'autoplay.
- **Compteur odomètre altitude** : valeur interpolée 410→1711 selon progress scroll, rendue en chiffres Barlow ; transition CSS `transform: translateY` sur des colonnes de chiffres (effet odomètre), arrondi à l'entier.
- **Liseré de progression nav** : `scaleX` de 0→1 lié au scroll global (Lenis), couleur `--accent`, transition linéaire.
- **Mini-profils des cartes itinéraires** : `stroke-dashoffset` au `inView` de chaque carte, 0.6s ease-out.
- **Cards hover** : `translateY(-3px)` + shadow soft froide `0 10px 30px rgba(22,32,31,.10)`, transition 180ms ; la mini-trace se redessine en orange.
- **Hero image bande basse** : parallax vertical 8% sur scroll.
- **Smooth scroll global** : Lenis actif (lerp ~0.09).
- **Interdits** : pas d'auto-play vidéo, pas de cursor follower, pas de popup, reveals courts (jamais > 0.6s).

## Images sélectionnées

Aucune vraie photo du commerce disponible (la photo Google Maps a expiré). Toutes les images sont des compléments thématiques montagne/VTT cohérents, déjà téléchargés localement. Le système graphique (profil, instruments, typo) porte l'identité pour ne pas dépendre des photos. Marquer ces visuels comme contexte, jamais légendés comme "le lieu V'Loc".

| Rôle                          | Chemin local                                | Source (URL origine)        | Alt text                                                       |
|-------------------------------|---------------------------------------------|-----------------------------|----------------------------------------------------------------|
| hero (bande basse, scrim)     | ./assets/images/mtb-trail-01.jpg            | thématique montagne/VTT     | VTT sur un sentier de montagne corse                           |
| argument-accès (filet droite) | ./assets/images/river-gorge-01.jpg          | thématique gorges           | Torrent et gorges de la Restonica                              |
| itinéraire Restonica          | ./assets/images/mountain-pano-01.jpg        | thématique panorama         | Panorama de haute montagne au-dessus de Corte                  |
| itinéraire Tavignano          | ./assets/images/mountain-forest-01.jpg      | thématique forêt            | Châtaigneraie et forêt de la vallée du Tavignano               |
| itinéraire famille            | ./assets/images/mountain-road-01.jpg        | thématique route            | Route ouverte au pied des montagnes                            |
| vélos (specs) #1              | ./assets/images/ebike-detail-01.jpg         | thématique VAE              | Détail d'un VTT électrique premium                             |
| vélos (specs) #2              | ./assets/images/ebike-02.jpg                | thématique VAE              | VTT électrique prêt pour le départ                             |
| atelier Augustin              | ./assets/images/bike-workshop-01.jpg        | thématique atelier vélo     | Atelier de réparation et vérification des vélos                |

> Aucun placeholder `placehold.co` requis : 8 visuels locaux couvrent tous les rôles. Aucune image n'est présentée comme une photo authentique du commerce dans la copy (honnêteté) : elles illustrent le terrain corse et le matériel.

## Copy directions (pour le builder)

- **Eyebrow (hero) :** `LOCATION VTT & VAE · CORTE · HAUTE-CORSE`
- **H1 :** "Roulez là où la voiture s'arrête."
- **Lede :** "Seul loueur de vélos électriques de Corte, à la porte des gorges de la Restonica et de la vallée du Tavignano. Du matériel vérifié, des conseils terrain, et de l'altitude au bout du guidon."
- **CTA primaire :** `Réserver un vélo` (tel:0684679263)
- **CTA secondaire :** `Voir les itinéraires` (ancre #itineraires)
- **Micro-copy money shot (profil) :** "De Corte (410 m) au Lac de Melo (1711 m). +1300 m de dénivelé. 60% de batterie suffisent." / borne : "Au-delà de Tuani, les voitures sont interdites. Le vélo passe."
- **Section vélos :** "Du matériel premium, vérifié avant chaque départ." / "70 km, 1300 m de D+, et il restait 40% de batterie."
- **Section atelier :** "Augustin vous livre les vélos et vient les récupérer partout en Corse." / "Réparation de vélos électriques toute l'année."
- **Preuve :** "4,2 / 5 sur Google. Le matériel, le conseil, la disponibilité." (positif uniquement)
- **CTA final :** `Appeler Augustin · 06 84 67 92 63`
- **Em-dash `—` interdit** dans toute la copy site : utiliser `:`, `,`, `.`, `()`.

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, contrastes vérifiés (accent réservé non-texte / gros bold)
- [x] 2 polices Google Fonts (Barlow Condensed + Inter) + 1 mono (JetBrains Mono) nommées avec poids
- [x] 1 archétype custom choisi + justifié (`altimetric-roadbook`)
- [x] 9 sections ordonnées
- [x] 8 images locales assignées à des rôles (0 placeholder, 0 vraie photo commerce)
- [x] Motion décrit (durée + easing), geste UI signature détaillé (odomètre + profil scrubbable)
- [x] Google Maps iframe prêt : `q=42.304027,9.158435&z=15&output=embed`
- [x] Divergence explicite vs 3 derniers clients (fond froid vs parchemin chaud) confirmée

## Pourquoi cette palette n'est PAS celle des autres clients

| Client (récent)     | --bg              | --ink             | --accent           |
|---------------------|-------------------|-------------------|--------------------|
| La Voûte            | #F4EDE0 (cream)   | #1C1714 (basalte) | #B9452A (rouge)    |
| Le Bowling          | #FAF4E6 (cream)   | #0E2A3C (marine)  | #E85A3C (corail)   |
| Le Nautic           | #F4EFE3 (cream)   | #0E2A3A (marine)  | #C0502A (terre)    |
| **V'Loc Corte**     | **#EEF2F1 (froid glaciaire)** | **#16201F (sapin granite)** | **#FF5A1F (HiViz trail)** |

Les 3 derniers partagent tous un fond parchemin/cream chaud + une encre bleu marine + un accent rouge-terre/corail (registre côte/port). V'Loc rompt sur les 3 tokens : fond froid bleuté (montagne, pas mer), encre vert-noir sapin (forêt corse, pas marine), accent orange HiViz pur (trail/cyclo, pas terre cuite). Zéro token repris. La sensation passe de "chaleur de port méditerranéen" à "air froid d'altitude".
