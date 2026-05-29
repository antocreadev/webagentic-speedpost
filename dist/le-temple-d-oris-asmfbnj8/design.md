# Design brief — Le temple d'Oris

Institut de massages, hammam, spa et salon de thé. 1 Rue Napoléon, 20214 Calenzana (Balagne, Haute-Corse). 5★ sur 17 avis. Village porte du GR20, au pied du Monte Grosso.

---

## 0. Réflexion UX (question par question)

**Visiteur-type :** deux profils, un seul écran. (1) Le randonneur GR20 / touriste Balagne, en fin d'étape ou en vacances, jambes lourdes, smartphone à la main, le soir ou en début de matinée, qui cherche à réparer son corps. (2) La résidente de la Balagne (Calvi, Ile-Rousse) qui s'offre un soin rituel et veut un lieu intime, sérieux, sans clinquant. Device dominant : mobile portrait, connexion variable en zone village.

**Contexte d'arrivée :** recherche Google "massage Calenzana / spa Balagne / hammam GR20", recommandation d'un gîte ou d'une agence de randonnée, lien Instagram @letempledoris, ou QR code en boutique. Le domaine letempledoris.com existe mais est inaccessible : le visiteur arrive souvent sans aucune image préalable du lieu.

**Intention primaire :** prendre rendez-vous (renvoi Planity) ou appeler maintenant. Tout le reste (découvrir les soins, vérifier les horaires) est subordonné à ce geste.

**Intention business :** convertir le flux saisonnier GR20 en réservations à valeur élevée (massage thaï, hammam, duo), monter en gamme face aux spas d'hôtel de Calvi (75€/h), et fidéliser la clientèle locale toute l'année. Affirmer un positionnement premium-intimiste qui justifie le prix.

**Contrainte UX structurante :** zéro photo réelle disponible (CSV vide, site officiel HS, réseaux sous authentification) ET zéro tarif public. Le site ne peut pas reposer sur le "money shot photographique de cabine" ni sur une grille de prix. Il doit créer le désir par l'ATMOSPHÈRE et la MATIÈRE, pas par la preuve documentaire. C'est ce qui dicte l'archétype : un sanctuaire graphique, pas un catalogue. Deuxième contrainte : horaires atypiques avec coupure méridienne et 2 jours de fermeture (mer/dim) à rendre lisibles d'un coup d'oeil.

**Émotion-cible à 5 secondes :** apaisement. Le pouls qui ralentit. Une sensation de seuil franchi, de chaleur dorée, de silence. Le visiteur doit sentir l'air tiède du hammam et la lumière de bougie avant même de lire un mot.

**Money shot :** non pas une photo mais un GESTE : le seuil du temple qui s'ouvre. Un voile de vapeur doré qui se dissipe lentement pour révéler le nom "Oris" en lettres calligraphiées, sur fond de lumière chaude. L'image (pierres chaudes / vapeur) est second plan ; la première impression est cette dissipation lente et la respiration de la page.

---

## Archétype

**`custom` : `ritual-sanctuary` (le seuil et les cinq chambres du rituel).**

Justification : faute de photos et de tarifs, le site doit vendre une EXPÉRIENCE sensorielle, pas un produit documenté. Un parcours en chambres-rituel (Seuil, Préparation, Soin, Réveil, Départ) traduit littéralement le déroulé d'une séance de spa et transforme la contrainte (peu de contenu factuel) en force narrative. Cet archétype diverge radicalement des 3 derniers livrés (livre-de-bord carte marine du Nautic, scorecard-arcade du Bowling, arcade-keystone pierre de la Voûte) : aucun ne repose sur un parcours rituel intérieur, une vapeur réactive, ni une palette dorée-aubergine.

---

## Palette de couleurs

Avant de fixer, 4 directions opposées ont été explorées :
1. **Noir laqué + or** (temple dramatique, luxe asiatique sombre) : rejeté car la consigne impose le light mode et le double public (randonneurs) appelle de la douceur, pas du théâtral nocturne.
2. **Tout blanc clinique + un seul accent eucalyptus** (spa nordique épuré) : rejeté car trop froid, efface la dimension "Oris / or / sacré méditerranéen".
3. **Terracotta + sable + bois** (rustique méditerranéen) : rejeté car c'est exactement la famille chromatique des 3 derniers clients (warm paper + terre cuite) : redondance interdite.
4. **Ivoire rosé lumineux + or safran + aubergine profond + sauge** (sanctuaire doré-oriental adouci) : RETENU. Cool-warm équilibré, premium, sensoriel, totalement hors du trio précédent.

| Rôle       | Hex      | Nom descriptif         | Utilisation                                                        |
|------------|----------|------------------------|--------------------------------------------------------------------|
| `--bg`     | #F6F1EC  | Ivoire de lin          | Fond principal, lumineux et frais, teinte de linge de soin (pas un cream chaud beurré) |
| `--ink`    | #2A1E2B  | Aubergine d'encens     | Texte principal, titres, traits : un brun-violacé profond, oriental, jamais noir pur |
| `--ink-2`  | #6E6258  | Pierre tiède           | Texte secondaire, légendes, horaires, sous-titres                  |
| `--accent` | #B5832E  | Or safran d'Oris       | CTA, le mot "Oris", filets dorés, icônes rituelles, chiffres clés  |
| `--line`   | #BDC7B4  | Sauge de maquis        | Séparateurs, bordures de chambres, voile végétal, jauge de détente |

> Palette construite sur l'enseigne ("Oris" = l'or, la lumière dorée des bougies) et le territoire (sauge / maquis corse, oliviers du Monte Grosso, pierre tiède). L'aubergine `--ink` apporte la profondeur d'un intérieur d'encens et tranche avec l'encre marine bleue des 3 clients précédents. Contrastes vérifiés sur `--bg` #F6F1EC : `--ink` #2A1E2B = 13.4:1 (AAA), `--ink-2` #6E6258 = 4.7:1 (AA), `--accent` #B5832E = 4.5:1 (AA, OK pour CTA et texte 18px+). `--line` sauge = décoratif uniquement (non-texte).

> Anti-redondance vs 3 derniers clients : aucun token repris.
> - le-nautic : bg #F4EFE3 (paper chaud), ink #0E2A3A (marine), accent #C0502A (terre cuite), line #D8CFBA (sable).
> - le-bowling : bg #FAF4E6 (crème), ink #0E2A3C (marine), accent #E85A3C (corail), line #2C9DB8 (azur).
> - la-voute : bg #F4EDE0 (pierre chaude), ink #1C1714 (basalte), accent #B9452A (rouge), line #D9C8A8 (sable).
> Le temple d'Oris : bg ivoire de lin frais (cool), ink AUBERGINE (inédit), accent OR SAFRAN (inédit, ni terre ni corail ni rouge), line SAUGE (inédit, ni sable ni azur). Zéro collision.

---

## Typographie

Le researcher proposait Cormorant Garamond + Jost. Cormorant Garamond italic est devenu un défaut éditorial sur-utilisé : je le remplace par une paire au caractère plus singulier et plus "sanctuaire".

- **Display :** `Marcellus` (Google Fonts) — poids 400 (seul disponible). Romaines à empattements fins, inspirées des capitales lapidaires de temple : élégance sacrée, calme, intemporel. Parfait pour les titres de chambres et le wordmark "LE TEMPLE D'ORIS" en capitales letter-spaced. Évoque la pierre gravée du seuil.
- **Script signature :** `Pinyon Script` (Google Fonts) — poids 400. Réservé exclusivement au mot **"Oris"** dans le hero et le footer, tracé en `--accent` or, comme une signature dorée calligraphiée. Usage rare et précieux (jamais en paragraphe).
- **Body :** `Jost` (Google Fonts) — poids 300 + 400 + 500. Géométrique humaniste, très aéré, respiration ample, excellent en mobile. Le 300 sert les ledes pour un effet de souffle ; le 500 les labels et CTA.

- **Size scale (mobile-first) :**
  - h1 (wordmark) `clamp(2.6rem, 9vw, 5.6rem)` Marcellus, tracking `0.12em`
  - "Oris" script `clamp(3.2rem, 12vw, 7rem)` Pinyon Script
  - h2 (titre de chambre) `clamp(1.7rem, 4.5vw, 2.9rem)` Marcellus tracking `0.04em`
  - eyebrow `0.78rem` Jost 500 tracking `0.32em` uppercase
  - lede `clamp(1.05rem, 2.4vw, 1.3rem)` Jost 300
  - body `1.05rem` Jost 400
  - small / horaires `0.86rem` Jost 400
- **Tracking :** display généreux (`0.04` à `0.12em`, esprit lapidaire), body neutre, eyebrows très espacés.

---

## Direction MATERIAL-DRIVEN (le site doit se RESSENTIR)

Matière du métier en 1 mot : **la vapeur tiède** (hammam) doublée de **l'huile dorée** (massage) et de **la pierre chaude**.

Attributs sensoriels exploités : volutes lentes, opacité qui se dissipe, chaleur dorée, lenteur, lueur de bougie, lissé de la pierre polie, fil de sauge, silence.

1. **Texture de fond :** grain de lin très subtil sur `--bg` (SVG `feTurbulence` baseFrequency 0.9, opacity 3-4%) pour la sensation de linge de soin, JAMAIS un fond plat clinique. Par-dessus, une **lueur radiale dorée** fixe et douce, ancrée en haut de chaque chambre (`radial-gradient(120% 80% at 50% 0%, rgba(181,131,46,.10), transparent 60%)`) qui imite la lumière de bougie diffuse.

2. **Voile de vapeur réactif (signature matière) :** des volutes SVG (paths courbes flous, `filter: blur(14px)`, fill `--bg` à 70%) qui dérivent lentement en haut du hero et au passage entre chaque chambre. Au scroll, elles se dissipent (opacity + translateY) pour "ouvrir" la chambre suivante. C'est le geste qui donne envie de respirer.

3. **Bordures et dividers propres au métier :** pas de `rounded-3xl` génériques. Chaque chambre est délimitée par un **filet de sauge double trait** (`--line`, 1px + 1px espacés de 4px) terminé par un petit **diamant doré** centré (losange SVG `--accent`, 8px) : motif de seuil. Les cartes de soin ont des coins en **arche surbaissée** (border-radius asymétrique haut arrondi / bas droit), évoquant la niche d'un temple, pas un rectangle.

4. **Effet typographique signature :** le mot "Oris" en Pinyon Script reçoit un **dégradé d'or balayé** (`background: linear-gradient(110deg, #9A6E22, #D9A94A, #B5832E); -webkit-background-clip: text`) + un très léger `text-shadow: 0 1px 12px rgba(181,131,46,.25)` qui fait "luire" la lettre comme une dorure de bougie. Les titres de chambre Marcellus reçoivent à l'apparition un balayage de lumière (pseudo-élément gradient qui glisse une fois).

5. **Motif signature récurrent (du début à la fin) :** le **diamant-seuil** (losange doré fin) ponctue chaque transition de chambre, chaque puce de liste de soin, et le centre de la rosace de navigation. Discret mais omniprésent, il signe le temple.

6. **Hover / reveals matière :** sur les cartes de soin, le hover fait monter une **fine volute de vapeur** depuis le bas de la carte (opacity 0→.6, translateY 18px→0, 600ms) et réchauffe la bordure de `--line` vers `--accent`. Sur le CTA principal, un **halo doré** pulse très lentement (4s ease-in-out) comme une flamme.

7. **Test final :** masqué du texte, ce visuel (vapeur dorée, diamant-seuil, niches en arche, lin, sauge) ne pourrait illustrer ni un restaurant, ni un bowling, ni un port. Il dit "spa / temple / soin". Test passé.

---

## Layout archétype

**Choix : `ritual-sanctuary`** : un long-scroll vertical structuré en CINQ chambres-rituel, chacune une "pièce" qu'on traverse, séparées par des seuils de vapeur. La navigation n'est pas une barre mais une **rosace flottante** marquant la progression dans le rituel. Aucun autre client du catalogue n'a de parcours intérieur séquencé ni de navigation radiale rituelle.

### Geste d'UI singulier inédit : la "Jauge de détente" + la rosace des chambres

Une **rosace de navigation flottante** (fixed, bas-droite desktop / centrée bas mobile, ~84px) en SVG : un cercle fin `--line` avec 5 pétales-points correspondant aux 5 chambres. Le pétale de la chambre active s'allume en `--accent` doré ; un **arc de progression doré** se remplit autour du cercle à mesure qu'on descend (mapping `scrollY/scrollHeight`). Au centre, le diamant-seuil. Cliquer un pétale = scroll fluide vers la chambre. C'est à la fois un fil d'Ariane du rituel ET une métaphore du "pouls qui s'apaise" : plus on avance, plus l'or se remplit, comme une respiration menée à son terme. Inédit dans le catalogue (≠ rose des vents pivotante du Nautic : ici c'est une jauge de remplissage rituelle, pas une boussole).

### Rythme des sections (à lire de haut en bas)

1. **`seuil` (hero, 100vh)** : money shot. Fond `--bg` + lueur dorée + voile de vapeur SVG qui se dissipe au chargement (2s) puis se réveille au scroll. Eyebrow "INSTITUT DE BIEN-ÊTRE · CALENZANA, BALAGNE". Wordmark "LE TEMPLE D'" en Marcellus capitales + **"Oris"** en Pinyon Script doré géant juste en dessous. Lede 28 mots : la promesse du seuil. Deux CTA : `Prendre rendez-vous` (or plein, halo pulsé) + `Appeler le 04 95 46 07 81` (contour aubergine). Chip discrète "5★ · 17 avis Google". Aucune photo plein cadre : la vapeur, la lumière et la typo portent tout. Diamant-seuil + flèche "Entrer" en bas.

2. **`preparation` (la philosophie)** : chambre n°1. Deux colonnes inégales (3/5 texte, 2/5 image `spa-soin-dos.jpg` en niche-arche avec filet sauge). Titre Marcellus "Franchir le seuil". Texte: la vision d'un sanctuaire au pied du Monte Grosso, le contraste entre le maquis solaire dehors et le cocon dedans, signé dans l'esprit d'Ornella (sans inventer de citation factuelle). Drop-cap or sur la première lettre.

3. **`les-soins` (la chambre du soin : catalogue rituel)** : chambre n°2, coeur de l'offre. Grille de cartes-niche (coins en arche) pour chaque univers : Massage thaïlandais, Massages & pierres chaudes, Hammam, Soins du visage, Soins du corps, Onglerie, Salon de thé. Chaque carte : icône-ligne dorée dessinée main, nom Marcellus, 1 phrase sensorielle Jost 300, puce diamant. Pas de prix affichés (non publics) : à la place, un libellé honnête "Sur rendez-vous" + CTA carte "Réserver ce soin" → Planity. Hover = volute de vapeur. Money shot secondaire ici via `hammam-tunnel.jpg` en bandeau d'ouverture de la chambre.

4. **`le-rituel-gr20` (chambre dédiée : récupération randonneur)** : chambre n°3, angle business fort et différenciant. Bandeau pleine largeur (70vh) avec `massage-therapie-dos.jpg` en arche panoramique + scrim contraste. Titre "Au retour du GR20". Texte : Calenzana porte du GR20, l'étape la plus exigeante (+1300m), le besoin de récupération musculaire ; proposition d'un parcours hammam + massage des jambes. Une mini "jauge de détente" illustrée (de "jambes lourdes" à "réparé"). CTA "Réserver après l'étape".

5. **`l-atmosphere` (chambre des sens : galerie)** : chambre n°4. Galerie en composition asymétrique douce (pas une grille stricte) : 4 à 5 images (`bougies-zen-ambiance.jpg`, `huiles-essentielles-ambre.jpg`, `pierres-chaudes-dos.jpg`, `produits-spa-etagere.jpg`, `bougies-spa-decoration.jpg`) en niches-arche de tailles variées, parallax très lent, légendes sensorielles en Jost 300 italic. Volutes de vapeur entre les images.

6. **`paroles` (preuve sociale)** : chambre n°5 partie A. Le 5★/17 avis mis en scène : une grande étoile/diamant doré central, "Cinq étoiles. Dix-sept fois." en Marcellus, et 2 à 3 verbatims courts d'avis (formulés positivement, sobres, sans inventer de faux noms : attribués "Avis Google · 5★"). Fond `--line` sauge très pâle. Pas de carousel : statique, contemplatif.

7. **`reveil-infos` (horaires + accès)** : chambre n°5 partie B. Split 50/50 desktop, stack mobile. Gauche : horaires en tableau lisible gérant la coupure méridienne et les 2 jours fermés (mer/dim grisés avec diamant éteint), adresse "1 Rue Napoléon, 20214 Calenzana", téléphone XL cliquable. Droite : Google Maps iframe sans cadre, filtre léger `sepia(.12) saturate(.95)` pour s'harmoniser à l'ivoire, bordé d'un filet doré + diamant-seuil.

8. **`depart` (CTA final)** : la sortie du temple. Fond lueur dorée renforcée, "Oris" script en filigrane, phrase de clôture Marcellus, gros CTA `Prendre rendez-vous` (halo pulsé) + rappel téléphone et horaires. Le pendant du seuil d'entrée : on referme le rituel.

9. **`footer-cachet`** : une ligne centrée Jost letter-spaced en `--ink-2` + "Oris" script doré en signature : `LE TEMPLE D'Oris · 1 RUE NAPOLÉON · 20214 CALENZANA · BALAGNE`. Mentions, lien Instagram @letempledoris, Facebook. Signature discrète "Site SpeedPost.fr" en 11px.

### Singularités du site (5)

- **Voile de vapeur SVG réactif** au chargement et entre chaque chambre : la matière même du hammam devient transition.
- **Rosace-jauge de détente** flottante : navigation radiale qui se remplit d'or comme une respiration aboutie (fil d'Ariane rituel inédit).
- **Parcours en 5 chambres-rituel** (Seuil > Préparation > Soin > Récupération GR20 > Sens > Réveil) calqué sur le déroulé d'une vraie séance de spa.
- **Le mot "Oris" en dorure balayée** (Pinyon Script + gradient or + lueur), motif d'or précieux récurrent du hero au footer.
- **Cartes-niche en arche surbaissée** avec diamant-seuil et révélation de vapeur au hover : pas un seul rectangle arrondi générique.

### Ce que ce site n'a PAS (divergence explicite)

- Pas de barre de navigation horizontale classique (rosace radiale à la place).
- Pas de hero photo plein cadre (typo + vapeur + lumière).
- Pas de grille de prix / menu tarifé (non public : remplacé par "Sur rendez-vous" honnête).
- Pas de carousel d'avis animé (preuve sociale statique et contemplative).
- Pas de marquee, pas de palette warm-paper + terre cuite + encre marine (le trio des 3 derniers clients).

---

## Motion language

Esprit : tout est LENT et fluide, jamais nerveux. La page respire.

- **Seuil (chargement)** : voile de vapeur opacity 1→0 + translateY 0→-30px + scale 1.05→1, durée 2.0s, easing `[0.16, 0.8, 0.24, 1]`. Wordmark + "Oris" en fade+rise 0.7s, stagger 120ms, "Oris" arrive en dernier avec sa lueur.
- **Entrées scroll (chambres)** : `Motion.inView`, opacity 0→1 + translateY 24px→0, durée 0.6s, easing `[0.2, 0.7, 0.2, 1]`, stagger 70ms sur les groupes de cartes. Filet de sécurité CSS `@keyframes autoreveal` forçant opacity:1 après 0.5s.
- **Seuils de vapeur entre chambres** : volutes SVG qui dérivent (translateX lent ±20px en boucle 18s) et se dissipent au passage de la chambre suivante (inView, opacity .6→0, 1.2s).
- **Titre de chambre** : balayage de lumière (pseudo-élément gradient or qui traverse une fois, 0.9s) à l'apparition.
- **Rosace-jauge** : arc doré se remplit en continu via `scroll()` Motion One (`scrollY/scrollHeight`), pétale actif détecté par `inView`, transition fill 250ms.
- **Hero parallax** : lueur dorée et vapeur translateY 8% sur scroll (très subtil).
- **Galerie** : parallax vertical 10% par image, vitesses légèrement différentes.
- **Cards hover** : translateY(-3px) + volute de vapeur montante (opacity 0→.6, 600ms) + bordure `--line`→`--accent`, transition 220ms.
- **CTA primaire** : halo doré pulsé `@keyframes` 4s ease-in-out infinite (box-shadow or qui respire).
- **Smooth scroll global** : Lenis actif (lerp doux ~0.08 pour accentuer la lenteur).
- **Interdits** : pas d'auto-play vidéo, pas de cursor follower, pas de popup, pas d'animation > 1.4s sur le contenu (seul le voile d'ouverture dépasse, justifié comme rituel d'entrée).

---

## Images sélectionnées

> ATTENTION ORCHESTRATEUR / RESEARCHER : le dossier `dist/le-temple-d-oris-asmfbnj8/site/assets/images/` est VIDE à ce stade. Les 9 URLs Unsplash listées dans `research.md` doivent être téléchargées localement AVANT le build, via `tools.image_dl.download(url, "dist/le-temple-d-oris-asmfbnj8/site/assets/images", name_hint)`. Aucune photo réelle du commerce n'existe (CSV vide, site HS, réseaux sous auth) : Unsplash P3 est ici légitime et conforme aux règles (à remplacer par les vraies photos après signature). Toutes les URLs sont `images.unsplash.com/photo-...` (jamais source.unsplash.com).

| Rôle                          | Chemin local                                   | Source (URL origine)                                                      | Alt text                                              |
|-------------------------------|------------------------------------------------|--------------------------------------------------------------------------|-------------------------------------------------------|
| chambre 1 / préparation (3:4) | ./assets/images/spa-soin-dos.jpg               | https://images.unsplash.com/photo-1639162906614-0603b0ae95fd?w=2400&q=85 | Soin du corps apaisant au temple d'Oris               |
| chambre 2 / soins, hammam (16:9)| ./assets/images/hammam-tunnel.jpg            | https://images.unsplash.com/photo-1604161926875-bb58f9a0d81b?w=2400&q=85 | Espace hammam, vapeur et chaleur dorée                |
| chambre 3 / GR20 bandeau (panoramique)| ./assets/images/massage-therapie-dos.jpg | https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=2400&q=85 | Massage du dos professionnel, récupération musculaire |
| galerie sens (4:5)            | ./assets/images/bougies-zen-ambiance.jpg       | https://images.unsplash.com/photo-1572540037354-b2be0cc8471f?w=2400&q=85 | Bougies flottantes, ambiance zen et lumière douce     |
| galerie sens (1:1)            | ./assets/images/huiles-essentielles-ambre.jpg  | https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=2400&q=85 | Flacon d'huile essentielle ambrée                     |
| galerie sens (3:4)            | ./assets/images/pierres-chaudes-dos.jpg        | https://images.unsplash.com/photo-1696841212541-449ca29397cc?w=2400&q=85 | Pierres chaudes posées sur le dos, soin signature     |
| galerie sens (1:1)            | ./assets/images/produits-spa-etagere.jpg       | https://images.unsplash.com/photo-1695527081793-91a2d4b5b103?w=2400&q=85 | Produits de soin naturels sur étagère                 |
| galerie sens (4:3)            | ./assets/images/bougies-spa-decoration.jpg     | https://images.unsplash.com/photo-1636714528228-f469eefb3eef?w=2400&q=85 | Décor de spa, bougies aux tons chauds                 |
| réserve / soin alterné (3:4)  | ./assets/images/massage-dos-professionnel.jpg  | https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?w=2400&q=85 | Massothérapeute en soin, cadre lumineux               |

Bilan : 0 image réelle du commerce / 9 images Unsplash réelles (P3 légitime, aucune réelle disponible). Aucun placehold.co requis. Tous les rôles couverts (hero sans photo : porté par typo + vapeur SVG, voulu).

---

## Copy directions (pour le builder)

- **Eyebrow :** `INSTITUT DE BIEN-ÊTRE · CALENZANA, BALAGNE` (Jost 500, tracking 0.32em, uppercase).
- **H1 :** `LE TEMPLE D'` (Marcellus capitales) + `Oris` (Pinyon Script doré).
- **Lede hero (28 mots) :** "Au pied du Monte Grosso, un sanctuaire de chaleur et de silence. Massages, hammam et soins pour réparer le corps et apaiser l'esprit, au coeur de la Balagne."
- **CTA primaire :** `Prendre rendez-vous` (renvoi Planity).
- **CTA secondaire :** `Appeler le 04 95 46 07 81` (`tel:+33495460781`).
- **Titres de chambres :** "Franchir le seuil" / "Les soins" / "Au retour du GR20" / "L'atmosphère" / "Leurs mots" / "Nous rejoindre".
- **Ton :** sobre, sensoriel, lent. Phrases courtes. Aucun superlatif marketing agressif. Positif uniquement.
- **Em-dash `—` INTERDIT** partout (utiliser `:`, `,`, `.`, `()`). Vérifier `grep -c $'—' index.html` = 0.

---

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, contrastes AA/AAA vérifiés sur `--bg`.
- [x] 3 polices Google Fonts nommées avec poids (Marcellus, Pinyon Script, Jost) : toutes réelles et existantes.
- [x] 1 archétype custom choisi + justifié (`ritual-sanctuary`), divergent des 14 archétypes brûlés.
- [x] 9 chambres/sections ordonnées.
- [x] 9 images réelles assignées (Unsplash P3, aucune réelle dispo) : à TÉLÉCHARGER avant build.
- [x] Motion décrit, durées + easings précisés, filet de sécurité reveal prévu.
- [x] Geste d'UI singulier inédit : rosace-jauge de détente + voile de vapeur réactif.
- [x] Design material-driven (vapeur / or / pierre) : texture lin, diamant-seuil, niches-arche, vapeur au hover.
- [x] Google Maps iframe : `https://maps.google.com/maps?q=42.5085,8.8536&z=15&output=embed` (Calenzana ; confirmer lat/lng exacts depuis la ligne CSV / google_maps_url avant build).
- [x] Em-dash banni rappelé au builder.
