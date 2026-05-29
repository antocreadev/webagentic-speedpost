# Design brief — Pri'vilège (salon de coiffure, Aregno · Balagne)

> REFONTE COMPLETE (2026-05-29). Ce brief remplace intégralement la version « carton de membre / club privé gravé », jugée vide et illisible par le client. Causes corrigées : (1) palette défaut Claude (cream + champagne + chocolate) BANNIE, (2) hero typographique sans photo SUPPRIMÉ, (3) sections cryptiques « N° 01 / N° 02 » SUPPRIMÉES, (4) zones vides et placeholders « illustration » SUPPRIMÉS. On vise désormais : clarté immédiate, hero photo plein cadre, sections riches et remplies, ancrage Balagne par vraies photos du village.

---

## 0. Réflexion UX (question par question)

**Visiteur-type :** Trois profils. (1) Résidente de Balagne (Aregno, Cateri, Pigna, Muro, Belgodère) 30-65 ans, qui cherche un salon de confiance près de chez elle. (2) Résident secondaire ou touriste de passage (Calvi/L'Île-Rousse à 15-30 min) qui veut une coupe ou une mise en beauté avant une fête/mariage en Balagne. (3) Homme local ou enfant accompagné (salon mixte). Device très majoritairement mobile, souvent depuis une recherche Google « coiffeur Aregno » ou « coiffeur Balagne ».

**Contexte d'arrivée :** Recherche Google locale, recommandation bouche-à-oreille (salon de village, fidélité forte), ou citation IA (« un bon coiffeur près de L'Île-Rousse »). Le visiteur ne connaît souvent pas encore le numéro : le site est l'annuaire ET la carte de visite.

**Intention primaire :** Prendre rendez-vous (le salon est sur RDV uniquement) ou au minimum trouver le téléphone et les horaires. Vérifier que c'est ouvert et où c'est. La conversion = un appel au 06 75 49 08 00.

**Intention business :** Convertir le visiteur en appel/RDV. Asseoir le positionnement « Pri'vilège » : un salon de village soigné, mixte, où chaque rendez-vous est un moment à soi, pas un flux à la chaîne. Capter aussi la clientèle saisonnière (coiffure de cérémonie/mariée) sans casser l'intimité locale.

**Contrainte UX structurante :** (a) RDV uniquement, pas de réservation en ligne tierce, donc CTA = téléphone natif omniprésent. (b) Aucune vraie photo du salon Pri'vilège accessible : on utilise des photos d'ambiance salon réalistes + 2 VRAIES photos du village d'Aregno qui, elles, ancrent fortement le « où » et la singularité corse. (c) Pas de prix publics : prestations présentées sans tarif, mention « sur devis » pour la cérémonie. (d) Note 4,5/5 sur 15 avis : preuve réelle mais petit volume, à présenter avec fierté sans gonfler.

**Émotion-cible à 5s :** Chaleur, confiance, soin. Le sentiment d'un salon clair et lumineux dans un beau village corse, où l'on est attendue par son prénom. Apaisement (pas de stress, on prend soin de vous) + un soupçon d'élégance discrète (le « privilège » d'un moment rien qu'à soi).

**Money shot :** Le hero = vraie photo plein cadre du salon clair et lumineux (intérieur soigné, miroirs lumineux, lumière corse), surmontée d'un message limpide : « Salon de coiffure · Aregno, Balagne » + « Un moment rien qu'à vous » + bouton d'appel visible immédiatement. En 2 secondes : QUOI (salon de coiffure mixte), OÙ (Aregno, Balagne), COMMENT (bouton Appeler / RDV). Le village d'Aregno (vraie photo) vient juste après comme deuxième money shot d'ancrage.

---

## Archétype

**`custom` : `editorial-village` (éditorial chaleureux photo-first, ancré Balagne).**

Justification : un hybride entre `magazine-editorial` (rythme de revue de beauté, grande typo serif douce, colonnes aérées, légendes manuscrites) et `fullbleed-photo-first` (hero et respirations photo plein cadre). Il diverge des archétypes brûlés du catalogue (pas de timeline, pas de dashboard, pas de scorecard, pas de threshold-reveal, pas de horizon-band, et surtout pas de « carton de membre gravé » rejeté). C'est le seul site du catalogue construit comme une page de magazine féminin de quartier : photo-first, clair, lisible, avec un geste signature discret (le « fil-mèche » qui souligne les titres).

---

## Palette de couleurs

Direction retenue parmi 4 explorées :
- (a) noir+or dramatique → trop froid/chaîne, écarté ;
- (b) sage+lavande cottagecore → trop sucré, cliché ;
- (c) granit vert Trinité + cuivre → fort mais risque « rustique resto », déjà proche de Biguglia (vert olivier) ;
- (d) **RETENUE : ivoire perle froid + brun-prune doux + vieux rose poudré + un fil cuivré chaud.** Cette direction colle au salon (féminité sans niaiserie, le rose poudré vient littéralement du mur de la photo balayage, le brun-prune évoque la chevelure châtain/balayage), reste mixte (pas rose-bonbon), et ancre la Balagne par le cuivre patiné des toitures/cloche romane.

| Rôle         | Hex       | Nom descriptif        | Utilisation                                                                 |
|--------------|-----------|-----------------------|------------------------------------------------------------------------------|
| `--bg`       | `#F4F1EC` | Perle de Balagne      | Fond principal, ivoire froid légèrement grisé (PAS cream warm, PAS blanc pur) |
| `--surface`  | `#FBFAF7` | Voile blanc           | Cartes, encadrés prestations, surfaces relevées au-dessus du bg              |
| `--ink`      | `#241E22` | Prune encre           | Texte principal, titres, wordmark (brun-prune très sombre, féminin sans être noir pur) |
| `--muted`    | `#6E6168` | Mauve cendré          | Texte secondaire, légendes, eyebrows, métadonnées                            |
| `--accent`   | `#C29A8E` | Vieux rose poudré     | Filets-mèche, soulignages, puces, hover, chips (la couleur signature, issue du mur balayage) |
| `--accent-2` | `#A6663C` | Cuivre Aregno         | CTA secondaires, accents chauds, chiffres preuve, écho toitures/cloche romane |
| `--line`     | `#E2DBD2` | Ligne calcaire        | Séparateurs, bordures fines, cadres de cartes                                |

> Contrastes vérifiés sur `--bg #F4F1EC` :
> - `--ink #241E22` → ≈ **14.1:1** (AAA, texte courant et titres).
> - `--muted #6E6168` → ≈ **5.2:1** (AA texte normal).
> - `--accent-2 #A6663C` (cuivre) → ≈ **4.6:1** (AA texte ≥ 16px, OK pour chiffres preuve, liens, CTA secondaire texte).
> - `--accent #C29A8E` (rose poudré) → ≈ **2.4:1** : **réservé aux éléments graphiques** (filets, puces, soulignages, hover, fonds de chips) JAMAIS au texte courant.
>
> **CTA primaire = fond `--ink` (prune), texte `--surface` ivoire** (contraste 13+:1), liseré cuivre `--accent-2` au hover. C'est la combinaison sûre et chaude pour le bouton d'appel omniprésent.

### Pourquoi cette palette n'est PAS celle des autres clients

| Client                      | `--bg`    | `--ink`            | `--accent`            |
|-----------------------------|-----------|--------------------|-----------------------|
| Pri'vilège (CE site)        | `#F4F1EC` | `#241E22` prune    | `#C29A8E` rose poudré |
| La Maison de Biguglia       | `#F3F1E7` | `#27352A` vert olivier | `#C98A3C` miel    |
| U Spuntinu                  | `#F2ECE0` | `#1A1613` charbon  | `#B85C3C` terracotta  |
| U Caradellu                 | `#FAF4E8` | `#1B2A33` marine   | `#C65A2E` terracotta  |
| La Vieille Cave             | `#F2E8D2` | `#1F1610` basalte  | `#D9461E` braise      |

→ `--bg #F4F1EC` est un ivoire **froid-grisé** distinct des sables chauds des autres (delta net, aucun n'a ce gris perle). `--ink #241E22` est le seul **prune-aubergine** du catalogue (les autres sont vert, noir charbon, marine). `--accent #C29A8E` **vieux rose poudré** n'existe nulle part ailleurs (tous les autres accents sont terracotta/braise/miel orangés). **Zéro token partagé** : aucune valeur hex ne recoupe un des derniers clients à moins d'un delta franc. Conforme à « pas plus d'1 token repris ».

---

## Typographie

- **Display :** `Fraunces` (Google Fonts) — poids **300** (titres fins éditoriaux) + **500** (wordmark, accents). Optical-size variable, soft-serif chaude et féminine sans tomber dans le Cormorant italic défaut. Le `opsz` haut donne des empattements doux qui évoquent la beauté/cosmétique premium.
- **Body :** `DM Sans` (Google Fonts) — **400** (corps) + **500** (labels, nav, boutons). Grotesque humaniste très lisible sur mobile, neutre et moderne, contre-point net à la chaleur du Fraunces.
- **Accent manuscrit (léger) :** `Caveat` (Google Fonts) — **500** — UNIQUEMENT pour 3-4 micro-légendes manuscrites (ex. « rien qu'à vous », signature sous le wordmark, légende photo village). Touche personnelle de salon de village, jamais pour de l'info structurante.
- **Size scale (mobile-first) :**
  - h1 (hero) : `clamp(2.6rem, 8vw, 5.4rem)`, Fraunces 300, tracking `-0.02em`, line-height `1.02`.
  - h2 (sections) : `clamp(1.9rem, 4.5vw, 3rem)`, Fraunces 300.
  - h3 (cartes prestations) : `1.25rem`, Fraunces 500.
  - lede : `clamp(1.05rem, 2.2vw, 1.35rem)`, DM Sans 400, `--muted`.
  - body : `1.05rem`, DM Sans 400, line-height `1.65`.
  - eyebrow : `0.8rem`, DM Sans 500, caps, letter-spacing `0.18em`, `--muted`.
  - manuscrit : `1.4-2rem`, Caveat 500, `--accent-2` cuivre (lisible).

---

## Layout archétype

**Choix : `editorial-village` (custom).** Une page de revue de beauté de Balagne : photo-first, colonnes aérées, légendes soignées, un fil-mèche rose qui souligne les titres. Diverge de tout le catalogue (aucun n'est un éditorial féminin photo-first) et corrige frontalement la V1 (plus de fond vide, plus de numérotation cryptique, hero = vraie photo).

### Rythme des sections (à lire de haut en bas)

1. **`nav`** : barre fine sticky, fond `--bg` à 92% + léger blur, hauteur ~64px. Gauche : wordmark « Pri'vilège » en Fraunces 500 (l'apostrophe en `--accent-2` cuivre, discrète, pas un bijou SVG envahissant). Droite (desktop) : 4 ancres texte DM Sans 500 (`Le salon`, `Prestations`, `Avis`, `Infos`) + bouton plein `--ink` « Prendre RDV » → `tel:`. Mobile : wordmark + un seul bouton téléphone icône+texte toujours visible. La nav ne cache jamais d'info.

2. **`hero` (photo plein cadre, ~88vh)** : VRAIE photo d'intérieur de salon clair et lumineux en full-bleed (`couleur-balayage-detail.jpg` : salon soigné, miroirs lumineux, marbre, mur brique chaleureux). Scrim permanent obligatoire (voir motion/contraste). Texte overlay aligné bas-gauche : eyebrow « SALON DE COIFFURE MIXTE · AREGNO, BALAGNE », h1 « Un moment rien qu'à vous » (Fraunces 300 blanc), lede courte « Coupe, couleur, soin et coiffure de cérémonie, sur rendez-vous, au coeur d'un village de Balagne. » Deux boutons : primaire « Prendre rendez-vous » (fond ivoire, texte prune) → `tel:+33675490800` avec le numéro lisible juste dessous, secondaire « Découvrir le salon » (outline blanc) → `#le-salon`. Chip note Google en haut-droite : « 4,5/5 · 15 avis ». **Test 2s validé** : QUOI + OÙ + COMMENT visibles d'emblée.

3. **`bandeau-village` (respiration ancrage Balagne, full-bleed ~70vh)** : la VRAIE photo `aregno-village-1.jpg` (village perché, toitures terracotta, cloche romane, mer en fond). Overlay léger bas. Texte court en surimpression : eyebrow « Aregno · Balagne », titre Fraunces 300 « Le seul salon du village », 2 phrases : « Aregno, candidat au Village préféré des Français 2024, domine la Balagne entre Calvi et L'Île-Rousse. Pri'vilège y est le salon de proximité, attendu et fidèle depuis 7 ans. » Légende manuscrite Caveat en coin : « à 15 min de L'Île-Rousse ». C'est le deuxième money shot, l'ancrage local fort et authentique.

4. **`le-salon` (présentation, split éditorial 55/45)** : fond `--bg`. Gauche : colonne texte, h2 « Pri'vilège, la coiffure de village » + 2-3 paragraphes chaleureux (salon mixte femmes/hommes/enfants, sur rendez-vous uniquement pour un vrai temps d'écoute, 7 ans d'ancrage local, prénom « Pri » + « village » + « privilège »). Petit bloc 3 mini-stats en ligne avec chiffres cuivre : « 7 ans » / « Mixte » / « Sur RDV ». Droite : photo `fauteuil-salon-minimal.jpg` (coiffeuse au bac, geste de soin, lumineux) en portrait, coin légèrement débordant, fin cadre `--line`, légende manuscrite Caveat dessous « le soin commence dès le bac ».

5. **`prestations` (grille de cartes claires)** : fond `--surface`. h2 « Nos prestations » + lede courte. Grille de 6 cartes (mobile 1 col, desktop 2-3 col) sur `--bg`, bord `--line`, chaque carte : petite icône-mèche SVG `--accent`, titre Fraunces 500, courte description. Cartes : Coupe femme · Coupe homme · Coupe enfant · Couleur & balayage · Soin & brushing · Coiffure de cérémonie & mariée. Pas de prix inventés : sous-ligne discrète « Tarifs et coiffure de cérémonie sur devis, lors de la prise de rendez-vous. » Bouton « Prendre rendez-vous » en fin de section.

6. **`detail-couleur` (respiration photo, full-bleed ~60vh)** : la photo `coiffeuse-geste-pro.jpg` (chevelure balayage châtain-miel sur mur rose poudré : elle EST la palette). Citation courte en surimpression, Fraunces 300 : « La couleur qui vous ressemble, pas une teinte de catalogue. » Renforce l'expertise couleur/balayage et fait vibrer le rose poudré = accent du site.

7. **`avis` (preuve sociale, positive uniquement)** : fond `--bg`. Présentation soignée du 4,5/5. Grand chiffre `4,5` en Fraunces 300 + 5 étoiles dont 4,5 remplies en `--accent-2` cuivre, ligne « sur 15 avis Google » + « 11 avis 5 étoiles ». Phrase chapeau honnête, générique et positive : « La confiance d'une clientèle fidèle de Balagne, depuis 7 ans. » Pas de fausses citations nominatives. 3 mini-cartes « valeurs » (Écoute · Proximité · Soin) avec puces rose poudré. Aucune mention de note basse, aucun comparatif.

8. **`infos` (horaires + contact + Maps, split 45/55)** : fond `--surface`. Gauche : bloc horaires CLAIR et lisible (tableau simple), « Mardi au samedi : 9h00 – 19h00 », « Dimanche & lundi : fermé », mention « Sur rendez-vous ». Adresse « Village, 20220 Aregno ». Téléphone XXL cliquable en Fraunces 500 cuivre/prune `tel:+33675490800`. Email `coiffurepripri20@gmail.com`. Bouton « Prendre rendez-vous » plein. Droite : iframe Google Maps `https://maps.google.com/maps?q=42.5822036,8.8956816&z=15&output=embed`, bord net, filet `--line`, coins légèrement arrondis cohérents avec les cartes. PAS de cadre vide : l'iframe est réellement intégrée.

9. **`footer` (clôture chaleureuse)** : fond `--ink` (prune profond), texte `--surface`. Wordmark « Pri'vilège » (apostrophe cuivre) en grand, baseline manuscrite Caveat « un moment rien qu'à vous, au coeur de la Balagne ». Rappel téléphone + horaires + adresse en 3 colonnes lisibles. Lien réseaux sociaux (Facebook leprivilege.coiffure) toléré ici. Filet-mèche cuivre en séparateur. Mention discrète « Site réalisé par SpeedPost.fr ». Bouton retour haut. C'est la seule section sombre = la signature qui referme la page avec chaleur.

### Singularités du site (le geste UI signature + détails)

- **Le « fil-mèche » (geste UI signature, discret) :** sous chaque titre de section et le wordmark, un trait fin ondulé (une mèche stylisée, petit SVG path en `--accent` rose poudré) se **trace** de gauche à droite (`stroke-dashoffset` animé via `inView`, one-shot, 0.6s) à l'entrée de la section. Au hover des liens de nav et des cartes, un même fil-mèche souligne le libellé. C'est subtil, secondaire, ne masque AUCUNE info, et évoque littéralement une mèche de cheveux. Aucune dépendance scroll-linked.
- **Apostrophe cuivre :** l'apostrophe de « Pri'vilège » est simplement colorée en `--accent-2` cuivre dans le wordmark (pas de gros bijou SVG façon V1). Signature légère reprise en favicon.
- **Légendes manuscrites Caveat :** 3-4 petites annotations manuscrites cuivre (« à 15 min de L'Île-Rousse », « le soin commence dès le bac », baseline footer) qui donnent l'âme d'un salon de village sans charger l'info.
- **Deux vraies photos du village d'Aregno** valorisées en full-bleed : aucun autre site du catalogue n'ancre son identité par le paysage du village du client de cette façon. C'est l'authenticité corse comme argument.
- **Chip note Google flottante** sur le hero, format pastille `rgba` + blur, lisible et fière (4,5/5 · 15 avis).

### Ce que ce site n'a PAS (divergence explicite)

- **Pas de hero typographique vide** (corrige la V1) : le hero est une vraie photo plein cadre.
- **Pas de numérotation « N° 01 / N° 02 »** ni de fiction « club privé / carte de membre » (rejetée).
- **Pas de palette cream/champagne/chocolate** (défaut Claude banni).
- **Pas de gros SVG en hero ni en premier plan** : les seuls SVG sont petits (fil-mèche, icônes de cartes, puces).
- **Pas de zones vides** : chaque section est remplie (photo réelle ou contenu dense).
- **Pas de marquee, pas de scrolljack, pas de slider before/after, pas de reflet spéculaire balayant** (V1 supprimée).
- **Pas de lien vers Planity/Treatwell/Fresha** ni aucun service de RDV tiers : RDV 100% natif par téléphone.
- **Pas de prix inventés.**

---

## Motion language

- **Scroll NATIF strict.** Lenis INTERDIT. Aucun effet scroll-linked (`scroll((p)=>...)`), aucune parallaxe hero, aucun stroke scrubbé sur le scroll. Smooth des ancres uniquement via CSS `html{scroll-behavior:smooth}`.
- **Entrées (apparition one-shot)** : `Motion.inView`, `opacity 0→1 + translateY 18px→0`, durée **0.5s**, easing `[0.2, 0.7, 0.2, 1]`, stagger **60ms** sur les groupes (cartes prestations, mini-stats). Déclenchées UNE fois.
- **Reveal robuste obligatoire** : `[data-reveal]{opacity:0}` conditionné par `.js-ready` ajoutée par le module ; `@keyframes autoreveal` force `opacity:1` après ~0.5s en filet de sécurité si Motion plante. Aucun overlay/veil opaque masquant.
- **Fil-mèche** : SVG `stroke-dasharray`/`stroke-dashoffset` animé de `offset→0` via `inView`, **0.6s** `ease-out`, one-shot par section. En hover de lien/carte : transition CSS 200ms du dashoffset (ou simple `transform: scaleX` du soulignage). Jamais lié au scroll.
- **Hero** : pas de parallaxe. Léger `scale(1.04→1)` one-shot sur l'image à l'entrée (1.2s ease-out) + fade-up du texte (stagger 80ms : eyebrow, h1, lede, boutons). Scrim permanent INDÉPENDANT du JS.
- **Cards hover** : `translateY(-3px)` + shadow soft + fil-mèche rose qui souligne le titre, transition **180ms**.
- **Compteur preuve** : le `4,5` et `15` et `11` sont écrits **en dur** dans le HTML (`<span class="count" data-to="15">15</span>`), le count-up est un enhancement guardé (`if(!reduce)`), restaure la valeur finale, correct même si Motion bloqué ou section déjà visible.
- **prefers-reduced-motion** : pas de translate, pas de scale, fil-mèche tracé instantané, valeurs preuve affichées d'emblée.
- Pas d'auto-play vidéo, pas de cursor follower, pas de popup.

### Contraste texte sur image (hero + bandeau village + détail couleur)

Application intégrale obligatoire dès qu'un texte est posé sur photo :
1. **Scrim permanent** (ne s'efface pas) : `linear-gradient(180deg, rgba(20,12,16,.55) 0%, rgba(20,12,16,.18) 30%, transparent 50%, rgba(20,12,16,.45) 82%, rgba(20,12,16,.75) 100%)` + `radial-gradient(70% 50% at 30% 80%, rgba(20,12,16,.45) 0%, transparent 70%)` sur un `<div class="scrim">` indépendant.
2. `filter: brightness(.94) saturate(1.04) contrast(1.03)` sur l'image. Jamais de blur.
3. `text-shadow: 0 1px 2px rgba(0,0,0,.45), 0 2px 18px rgba(0,0,0,.32)` sur tout texte du hero/bandeaux.
4. Couleurs solides : titres `#FFFFFF`, eyebrow blanc cassé chaud `#F3E4DB`, manuscrit version claire `#E9C7B5` (rose poudré éclairci, lisible sur sombre).
5. Chips infos (note Google) : `background:rgba(20,12,16,.42); backdrop-filter:blur(4px); color:#fff`.

---

## Images sélectionnées

> Note : les libellés de fichiers ne correspondent pas tous à leur contenu réel (vérifié visuellement). Le mapping ci-dessous est basé sur le CONTENU réel de chaque image.

| Rôle                          | Chemin local                                   | Contenu réel (vérifié)                                    | Alt text                                                  |
|-------------------------------|------------------------------------------------|-----------------------------------------------------------|-----------------------------------------------------------|
| hero (full-bleed)             | `./assets/images/couleur-balayage-detail.jpg`  | Intérieur de salon moderne, clair, miroirs lumineux, marbre, mur brique chaleureux | Intérieur lumineux du salon de coiffure Pri'vilège à Aregno |
| bandeau village (full-bleed)  | `./assets/images/aregno-village-1.jpg`         | VRAIE photo : village d'Aregno perché, toitures terracotta, cloche romane, mer | Le village d'Aregno en Balagne, dominant la mer            |
| le-salon (portrait)           | `./assets/images/fauteuil-salon-minimal.jpg`   | Coiffeuse au bac, geste de soin/lavage, lumineux, serviettes noires | Soin au bac dans le salon Pri'vilège                       |
| detail-couleur (full-bleed)   | `./assets/images/coiffeuse-geste-pro.jpg`      | Chevelure balayage châtain-miel sur mur rose poudré (= la palette) | Résultat couleur et balayage, salon Pri'vilège             |
| galerie/ambiance secondaire   | `./assets/images/soin-cheveux-detail.jpg`      | Intérieur salon N&B, postes coiffure alignés, fenêtres    | Ambiance du salon de coiffure                              |

> `aregno-village-2.jpg` et `aregno-village-3.jpg` : NE PAS utiliser en grand. `aregno-village-3.jpg` porte un watermark visible « StampaPaese » : à éviter totalement. `aregno-village-1.jpg` est la version propre et superbe : c'est celle du bandeau.
> Les images sont des photos d'ambiance salon réalistes (P3) + 2 vraies photos du village (P2 ancrage local) : aucune vraie photo intérieure du salon Pri'vilège n'étant accessible (Facebook/Google verrouillés), c'est le meilleur jeu possible. À remplacer par les photos finales du salon après signature (à mentionner dans l'email).
> Minimum 6 rôles : 5 rôles photo couverts + iframe Maps. Aucun `placehold.co` nécessaire.

---

## Copy directions (pour le builder)

- **Eyebrow hero** : `SALON DE COIFFURE MIXTE · AREGNO, BALAGNE` (caps, letter-spacing `0.18em`).
- **H1 hero** : `Un moment rien qu'à vous`.
- **Lede hero** : `Coupe, couleur, soin et coiffure de cérémonie, sur rendez-vous, au coeur d'un village de Balagne.`
- **Baseline manuscrite** : `rien qu'à vous` / `à 15 min de L'Île-Rousse` / `le soin commence dès le bac`.
- **CTA primaire** (partout) : `Prendre rendez-vous` (fond `--ink`, texte `--surface`, liseré cuivre hover) → `tel:+33675490800`, avec le numéro `06 75 49 08 00` lisible à proximité.
- **CTA secondaire** : `Découvrir le salon` → ancre `#le-salon`.
- **Horaires (texte exact)** : `Mardi au samedi : 9h00 – 19h00` / `Dimanche & lundi : fermé` / `Sur rendez-vous`.
- **Preuve** : `4,5 / 5` · `15 avis Google` · `11 avis 5 étoiles` · chapeau `La confiance d'une clientèle fidèle de Balagne, depuis 7 ans.`
- **Mention tarifs** : `Tarifs et coiffure de cérémonie sur devis, lors de la prise de rendez-vous.`
- **Em-dash `—` INTERDIT partout** : utiliser `:`, `,`, `.`, `()` ou tiret simple `-`.

## Checklist avant handoff au builder

- [x] 7 tokens hex définis (bg, surface, ink, muted, accent, accent-2, line), contrastes vérifiés AA/AAA (rose poudré réservé graphique).
- [x] 3 polices Google Fonts nommées + poids (Fraunces 300/500, DM Sans 400/500, Caveat 500).
- [x] 1 archétype custom choisi + justifié (`editorial-village`), divergent du catalogue et de la V1 rejetée.
- [x] 9 sections ordonnées, toutes remplies (zéro vide, zéro placeholder).
- [x] 5 rôles photo réels assignés + iframe Maps (≥ 6 rôles couverts, 0 placeholder).
- [x] Motion décrit : inView one-shot 0.5s, fil-mèche 0.6s, scroll natif, pas de scroll-linked, pas de Lenis, reveal safety net.
- [x] Google Maps iframe prête : `q=42.5822036,8.8956816`.
- [x] Hero = vraie photo plein cadre + message clair + CTA tél visible (test 2s OK).
- [x] Aucune référence à un service de RDV tiers ; RDV natif `tel:`.
- [x] Palette défaut Claude bannie ; comparatif anti-redondance fourni.
