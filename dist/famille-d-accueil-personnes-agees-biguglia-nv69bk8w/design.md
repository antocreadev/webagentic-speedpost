# Design brief — Famille d'accueil personnes âgées · Biguglia

## 0. Réflexion UX (question par question)

**Visiteur-type :** Une femme de 48 à 62 ans (la fille, parfois le fils), active, qui cherche un lieu pour son père ou sa mère devenu(e) dépendant(e). Elle navigue le soir, fatiguée, souvent sur mobile, après une journée chargée et une discussion familiale tendue. Secondairement : le senior lui-même (autonome, 70-85 ans) qui regarde par-dessus l'épaule de son enfant, ou un travailleur social / médecin de famille qui oriente.

**Contexte d'arrivée :** Recherche Google « accueil familial personne âgée Biguglia / Bastia », « alternative EHPAD Haute-Corse », ou recommandation d'un proche / d'une assistante sociale. Elle arrive chargée d'émotion : culpabilité, inquiétude, besoin urgent d'être rassurée. Elle ne cherche pas une « offre commerciale », elle cherche à respirer et à se dire « ici, il/elle sera bien ».

**Intention primaire :** Se rassurer profondément en moins d'une minute, puis trouver le numéro pour appeler et parler à un humain. Le geste final attendu est un appel téléphonique, pas un formulaire. La décision est affective avant d'être rationnelle.

**Intention business :** Remplir les 3 places d'accueil (capacité très limitée, ce n'est pas un EHPAD), inspirer confiance, et se positionner comme l'alternative humaine et digne aux établissements collectifs. Faire venir des appels qualifiés de familles vraiment décidées.

**Contrainte UX structurante :** Aucune réservation en ligne (on confie un être cher, ça ne se « réserve » pas, ça se parle). Capacité minuscule (max 3 résidents). Public senior + proches fatigués : lisibilité maximale obligatoire, gros corps de texte, fort contraste, zéro jargon médical froid. La conversion = un appel humain, donc le téléphone doit être omniprésent mais jamais agressif. Pas de vraie photo du lieu exploitable : on s'appuie sur l'atmosphère (étang, lumière, mains, jardin, intérieur) plutôt que sur un reportage du bâtiment.

**Émotion-cible à 5s :** Apaisement. Le relâchement des épaules. « C'est calme ici. C'est doux. On respire. On dirait une vraie maison, pas une institution. » Sérénité insulaire, lumière du matin, chaleur d'un foyer corse au bord de l'eau.

**Money shot :** Le lever de jour sur l'étang de Biguglia, traité comme une grande respiration en pleine page, avec une phrase posée doucement : « Ici, on prend le temps. » Pas de bandeau urgent, pas de prix, pas de chiffre. Juste de la lumière et du calme. Le money shot n'est pas une photo de bâtiment mais une promesse d'atmosphère.

---

## Archétype

**`custom` — `maison-qui-respire` (rythme respiratoire / heures douces du foyer).**

Justification : le site est construit comme une journée paisible dans la maison, scandée par la lumière (l'aube sur l'étang, la chaleur du midi, le repos du soir). On refuse tout vocabulaire de catalogue, de dashboard ou de grille produit. La page « respire » : grandes zones de calme, rythme lent assumé, transitions longues et douces (à l'inverse de la règle habituelle 0.4-0.6s : ici on assume 0.8-1.0s parce que la lenteur EST le message). Cela diverge radicalement des 14 archétypes déjà livrés (aucun n'est centré sur la respiration / le temps long / le soin), et des 3 derniers clients (tous fonds sable + encre marine + accent corail/terracotta, dynamiques port/arcade/bowling).

---

## Palette de couleurs

Direction retenue parmi 5 explorées :
1. Sauge + olivier + miel (RETENUE) : douceur végétale corse, chaleur sans être sucrée.
2. Lavande pâle + lin + prune douce : trop féminin/spa, perd l'ancrage terroir.
3. Bleu lagune apaisé + ivoire + sable : trop proche du combo « marine + sable » des 3 derniers clients (rejeté pour redondance).
4. Terracotta doux + crème + brun : recoupe l'accent corail/terre de Balagne du Nautic/Bowling/Voûte (rejeté, >1 token commun).
5. Blanc clinique + vert d'eau : tombe dans le « médical froid » explicitement interdit (rejeté).

La direction 1 honore le maquis corse, l'olivier et la lumière, sans jamais virer institutionnel ni sucré. Fond ivoire verdâtre très clair = lumière du matin filtrée par les feuillages, à l'opposé du sable chaud des clients précédents.

| Rôle        | Hex       | Nom descriptif        | Utilisation                                                        |
|-------------|-----------|-----------------------|--------------------------------------------------------------------|
| `--bg`      | `#F3F1E7` | Ivoire d'aube         | Fond principal, lumière du matin filtrée, chaud mais non sucré     |
| `--ink`     | `#27352A` | Vert olivier profond  | Texte principal, titres, fort contraste pour seniors               |
| `--ink-2`   | `#5C6B5A` | Sauge ombrée          | Texte secondaire, légendes, sous-titres (réservé ≥16px)            |
| `--accent`  | `#C98A3C` | Miel de maquis        | CTA appel, surlignages, soleil de l'indicateur d'heure, chiffres   |
| `--line`    | `#D8D6C4` | Lin tressé            | Séparateurs, borders de cartes, traits doux, cadres photos         |

Accent végétal secondaire (touches uniquement, badges « ouvert 24h/24 », feuillages SVG) : `--leaf #7C9B76` sauge claire. Non obligatoire pour le texte.

> Palette choisie pour évoquer une maison corse face au maquis au lever du jour : ivoire chaud, vert olivier dense, miel des fleurs de printemps. Elle contraste frontalement avec le médical froid (aucun bleu clinique, aucun gris) et avec les 3 derniers clients (aucun fond sable, aucune encre marine, aucun accent corail). Contrastes vérifiés sur `--bg` #F3F1E7 :
> - `--ink` #27352A : ratio ~9.8:1 (AAA) — confort de lecture senior garanti
> - `--accent` #C98A3C : ~3.6:1 (OK gros titres/chiffres et éléments non-texte ; pour le texte courant sur accent, utiliser `--ink` ou blanc)
> - `--ink-2` #5C6B5A : ~4.7:1 (AA), réservé ≥16px
> - `--leaf` #7C9B76 : décoratif (non-texte)
> Important contraste senior : aucun gris pâle illisible, corps de texte toujours en `--ink` ou `--ink-2` jamais plus clair.

Token commun avec les 3 derniers clients : zéro (vérifié : ni `--bg`, ni `--ink`, ni `--accent`, ni `--line` ne recoupent Nautic / Bowling / Voûte).

---

## Typographie

- **Display :** `Lora` (Google Fonts) — poids 400 + 500 + 600. Serif humaniste douce, ronde, jamais pompeuse : elle « parle » avec chaleur sans le formalisme d'un Playfair. Parfaite pour des phrases courtes et tendres posées comme à voix basse.
- **Body :** `Nunito Sans` (Google Fonts) — poids 400 + 600 + 700. Sans-serif aux terminaisons légèrement arrondies, excellent rendu écran, très lisible pour un public senior et des proches fatigués. Les formes douces prolongent l'émotion sans nuire à la clarté.
- **Mono / détail (optionnel, ultra-léger) :** `Nunito Sans` 700 en capitales letter-spaced pour les eyebrows. Pas de vraie police mono (le mono ferait « technique », contraire au ton).

- **Size scale (mobile-first, généreuse pour seniors) :**
  - h1 `clamp(2.6rem, 7.5vw, 5rem)` line-height 1.08
  - h2 `clamp(2rem, 4.5vw, 3.2rem)` line-height 1.15
  - h3 `clamp(1.4rem, 3vw, 1.9rem)`
  - lede `clamp(1.15rem, 2.2vw, 1.4rem)` line-height 1.7
  - body `1.125rem` (18px minimum, non négociable senior) line-height 1.8
  - small `0.95rem` (jamais sous 15px)
- **Tracking :** display `-0.01em`, eyebrows `+0.22em` uppercase, body `0`.
- **Line-height généreux assumé partout** (1.7-1.8 sur le texte courant) : la respiration typographique prolonge le concept « on prend le temps ».

---

## Layout archétype

**Choix : `maison-qui-respire`** (custom). Le site se lit comme une journée douce dans la maison, du lever du jour sur l'étang jusqu'au repos du soir, ponctuée par un indicateur d'heure vivant. Il diverge des autres clients par son rythme lent, ses grandes zones de calme, l'absence totale de grille produit / dashboard / marquee dynamique, et un fil végétal continu.

### Rythme des sections (à lire de haut en bas)

1. **`nav-douce`** : barre fine et discrète, fond `--bg` à 92% + léger blur, apparaît/disparaît au scroll (cachée quand on descend, réapparaît quand on remonte). À gauche : wordmark « La Maison de Biguglia » en Lora 600. À droite : 3 liens texte (`La maison`, `Le cadre`, `Nous parler`) + un bouton appel discret `--accent` outline. Pas de logo lourd. Hauteur 64px.

2. **`hero-aube`** (money shot, ~92vh) : grande photo de l'étang au lever du jour en plein cadre, scrim doux permanent (voir specs contraste). Eyebrow blanc cassé chaud `ACCUEIL FAMILIAL · BIGUGLIA, HAUTE-CORSE`. H1 en Lora light, posé bas-gauche : « Ici, on prend le temps. » Sous-titre une ligne : « Une maison, une famille, quelques résidents. Au bord de l'étang, près de Bastia. » Deux CTA : `Appeler le 06 80 05 90 20` (plein `--accent`) + `Découvrir la maison` (texte souligné blanc). Aucun chiffre, aucun prix. En bas, indication scroll « ↓ entrer dans la journée ». L'indicateur d'heure (voir geste UI) flotte déjà en coin.

3. **`promesse`** (respiration plein `--bg`, beaucoup d'air) : pas de photo. Un court manifeste centré, Lora 400 grande taille : « Vivre chez nous, pas dans un établissement. Une présence à toute heure, des repas partagés à la même table, le maquis et l'eau pour horizon. » 3 mots-piliers en dessous, espacés, avec petit feuillage SVG `--leaf` : `Présence` · `Dignité` · `Douceur`. Section volontairement courte et aérée = on respire.

4. **`le-lien` (split chaud)** : image des mains (soin / lien humain) à gauche, texte à droite (inverse en mobile : image puis texte). Titre « Un lien, pas un service. » Paragraphe sur l'accompagnement personnalisé, la présence 24h/24 vécue comme une présence familiale et non une garde. Citation intégrée en Lora italique 500 (témoignage accueillante du research, reformulé positivement) : « Ce que j'aime, c'est avoir le temps, être à l'écoute. »

5. **`la-maison` (intérieur)** : photo intérieur chaleureux en grand, légèrement débordante, avec une légende-carte posée par-dessus en coin (cartouche `--bg`/`--line`) listant le quotidien : repas faits maison à heures régulières, chambre personnelle, rythme respecté, max 3 résidents accueillis. Ton concret et rassurant. Pas de liste à puces froide : phrases pleines.

6. **`le-cadre` (l'étang, parcours saisons)** : section dédiée au cadre naturel, photo jardin/terrasse ensoleillée, texte sur la réserve naturelle de l'étang de Biguglia (plus grand lagon de Corse, 250+ espèces d'oiseaux, promenades, air pur, à 4 km de Bastia). Un mini-fil horizontal des 4 saisons de l'étang (printemps flamants / été roseaux / automne reflets / hiver brume) en petites vignettes texte + feuillage SVG, qui change de teinte d'arrière-plan très subtilement. Géolocalise l'apaisement.

7. **`confiance` (preuve sociale douce)** : grande citation pleine page sur fond `--ink` (vert olivier profond, texte ivoire) avec photo senior serein en arrière-plan très assombrie. Une parole de famille (positive, jamais le nombre d'avis brut). Sous la citation, une ligne sobre : « Structure agréée et suivie par la Collectivité de Corse. » = sérieux sans froideur. Petit cœur/feuille `--accent`. La seule section sombre du site = le moment du soir, le recueillement.

8. **`nous-parler` (conversion + infos + maps)** : retour au fond clair. Grand bloc « Parlons de votre proche. » Téléphone en très gros (Lora, cliquable `tel:`), horaires « Présence 24h/24, 7j/7 », adresse Biguglia 20620. À droite, iframe Google Maps aux coins doux encadrée `--line`. Pas de formulaire long : juste l'invitation à appeler + éventuellement un champ « laissez-nous votre numéro, on vous rappelle » minimal (1 champ + bouton, optionnel, non bloquant). Réassurance finale : « Sans engagement, juste une conversation. »

9. **`footer-soir`** : footer doux, fond `--bg` légèrement plus profond ou `--ink` au choix builder (préférence : `--ink` pour clore comme le crépuscule). Wordmark, téléphone, adresse, horaires 24h/24, lien retour haut « ↑ revenir au matin ». Mention discrète « Site réalisé par SpeedPost.fr ». Feuillage SVG en filigrane.

### Singularités du site (4)

- **Indicateur d'heure douce (geste UI signature, détaillé plus bas)** : un petit cadran soleil/lune `--accent` fixe en coin, dont la teinte et l'icône évoluent selon l'heure réelle du visiteur + selon la section atteinte, rappelant « ouvert 24h/24, à toute heure quelqu'un veille ». Personne d'autre dans le catalogue n'a ça.
- **Fil végétal continu** : un brin d'olivier / feuillage SVG `--leaf` dessiné main qui réapparaît en transition entre les sections (séparateurs organiques), du hero au footer. C'est la « matière » du lieu : le maquis corse, le vivant, le doux.
- **Rythme respiratoire assumé** : transitions lentes (0.8-1.0s), grandes zones vides, une seule idée par écran. Le site lui-même « respire » pour transmettre l'apaisement (anti-pattern volontaire vs sites commerciaux nerveux).
- **Parcours « journée » du matin (hero aube) au soir (footer/section confiance sombre)** : la lumière du site se réchauffe puis se tamise au fil du scroll, mimant une journée sereine dans la maison.

### Ce que ce site n'a PAS (divergence explicite)

- Pas de marquee défilant (anti-calme).
- Pas de grille produit / bento / catalogue.
- Pas de dashboard, pas de coordonnées GPS techniques (anti-froid, contraire au Nautic).
- Pas de chiffres mis en avant comme arguments (ni « 13 avis », ni prix en hero).
- Pas de formulaire long ni de réservation en ligne.
- Pas de hero sans photo : ici la photo de l'aube EST le message (à l'inverse du wordmark XXL du Nautic).

---

## Geste d'UI singulier — « L'heure douce » (cadran de veille 24h/24)

Concept : traduire visuellement la promesse « ouvert 24h/24, 7j/7, quelqu'un veille toujours » par un petit cadran vivant, pour rassurer sans l'écrire froidement.

- **Élément :** SVG circulaire ~64px desktop / 48px mobile, `position: fixed; bottom: 22px; right: 22px; z-index: 40`. Cercle fin `--line`, fond `--bg` à 90% + léger blur. Au centre, une icône soleil (rayons `--accent` miel) ou lune (croissant `--ink-2`) selon l'heure RÉELLE du visiteur (`new Date().getHours()`).
- **Logique jour/nuit :** 6h-19h → soleil miel `--accent`, anneau qui se remplit doucement façon arc selon l'heure (matin = arc court, midi = arc plein). 19h-6h → lune sauge ombrée, fond du cadran légèrement plus profond. Sous l'icône, micro-label Nunito 700 letter-spaced : `VEILLE 24H/24`.
- **Lien à la section :** au scroll, l'anneau extérieur du cadran se teinte très subtilement selon la section active (matin clair en haut → soir tamisé en section « confiance » sombre → retour doux au footer), renforçant le parcours « journée ». Détection via `Motion.inView`.
- **Interaction :** au survol/clic, le cadran s'agrandit légèrement (scale 1.06, 240ms) et révèle « À toute heure, appelez le 06 80 05 90 20 » en tooltip doux `--ink` sur `--bg`. Le clic déclenche `tel:0680059020`. Sur mobile, tap direct = appel.
- **Accessibilité :** `aria-label="Présence 24h sur 24, appeler la maison"`, contraste icône suffisant, jamais clignotant. Respecte `prefers-reduced-motion` (anneau statique, pas d'animation continue).
- **Pourquoi singulier :** aucun client du catalogue n'a un indicateur d'heure réel lié au cadre business (la présence permanente). Il fait directement le lien entre l'angoisse de la famille (« et la nuit ? ») et la réassurance (« quelqu'un veille »).

---

## Motion language

Le motion ici est volontairement plus LENT que la valeur par défaut du pipeline, parce que la lenteur porte l'émotion (apaisement). Justifié par l'émotion-cible.

- **Entrées scroll :** `Motion.inView` avec `opacity 0→1 + translateY 24px→0`, durée **0.85s**, easing `[0.22, 0.61, 0.36, 1]` (ease-out doux), stagger 90ms sur groupes. Filet de sécurité CSS `@keyframes autoreveal` force `opacity:1` après ~0.6s si Motion plante. `[data-reveal]{opacity:0}` conditionné par `.js-ready`.
- **Hero image (aube) :** parallax vertical lent ~12% sur scroll (Motion + scrollY) + un très léger « lever de lumière » : `filter: brightness(.9 → .96)` sur les 600 premiers px de scroll, comme le jour qui se lève. Subtil.
- **Fil végétal (séparateurs) :** chaque brin SVG se « dessine » à l'entrée (`stroke-dashoffset` animé, durée 1.1s, ease-out) puis reste statique. Une seule fois par section.
- **Cadran d'heure :** apparition fade+scale à 1s après load (durée 0.5s). Anneau respirant très lent (scale 1.0↔1.015, 4s, ease-in-out infinite) pour évoquer une respiration calme. Coupé si `prefers-reduced-motion`.
- **Cards / cartouches hover :** `translateY(-2px)` + ombre douce diffuse, transition 220ms. Discret.
- **Section confiance (sombre) :** transition de fond `--bg → --ink` accompagnée d'un léger fondu (la photo en arrière-plan se révèle), pour donner la sensation du soir qui tombe.
- **Smooth scroll global :** Lenis actif, `lerp` un peu plus bas que défaut (~0.08) pour un défilement plus doux et posé.
- **Interdits :** pas d'auto-play vidéo, pas de cursor follower, pas de popup, pas de clignotement, pas de carousel auto.

---

## Images sélectionnées

Toutes locales dans `site/assets/images/`. Pas de vraie photo Google Maps exploitable (lh3 protégée) : on s'appuie sur l'atmosphère via 5 images thématiques cohérentes (activité + localisation corse). Aucune n'est trompeuse sur le bâtiment précis ; elles évoquent le cadre, le lien et le foyer, ce qui est honnête pour un accueil familial. Hero sur l'étang = ancrage local fort et vrai (l'étang de Biguglia existe et borde le lieu).

| Rôle                         | Chemin local                                        | Source (origine)        | Alt text                                                        |
|------------------------------|-----------------------------------------------------|-------------------------|----------------------------------------------------------------|
| hero-aube (full ~92vh)       | ./assets/images/etang-biguglia-nature.jpg           | Unsplash thématique     | Lever du jour sur l'étang de Biguglia, en Haute-Corse           |
| le-lien (split, mains)       | ./assets/images/main-personne-agee-soin.jpg         | Unsplash thématique     | Mains qui se tiennent : le lien et l'écoute au quotidien        |
| la-maison (intérieur)        | ./assets/images/interieur-chaleureux-maison.jpg     | Unsplash thématique     | Intérieur chaleureux d'une maison familiale, lumière douce      |
| le-cadre (jardin/terrasse)   | ./assets/images/jardin-seren-maison-familiale.jpg   | Unsplash thématique     | Jardin paisible et terrasse ensoleillée près de l'étang         |
| confiance (fond sombre)      | ./assets/images/senior-serein-exterieur.jpg         | Unsplash thématique     | Personne âgée sereine en extérieur, au cœur de la nature corse  |

5 rôles couverts par 5 images réelles (thématiques), 0 placeholder. La 6e image suggérée par le research (hero Google Maps) n'étant pas exploitable, l'étang assure le hero. Si le builder a besoin d'une 6e zone visuelle (footer filigrane), utiliser un dérivé SVG du fil végétal, pas une nouvelle photo. Note usage démo : images thématiques à remplacer par les vraies photos de la maison après signature client.

> Rappel contraste texte-sur-image (sections hero-aube + confiance) : appliquer intégralement scrim permanent + `filter: brightness(.92) saturate(1.03)` + `text-shadow` sur tout texte + eyebrow blanc cassé chaud `#FBEFD6` + CTA solides. Voir specs builder.

---

## Copy directions (pour le builder)

- **Eyebrow :** `ACCUEIL FAMILIAL · BIGUGLIA · HAUTE-CORSE` (capitales, letter-spaced, blanc cassé chaud sur hero).
- **H1 :** « Ici, on prend le temps. » (alternative : « Comme à la maison, au bord de l'étang. »)
- **Lede hero :** « Une maison, une famille, quelques résidents. Au bord de l'étang de Biguglia, à quelques minutes de Bastia, votre proche est accueilli, écouté, entouré. » (≈ 30 mots, positif, ancré local)
- **CTA primaire :** `Appeler le 06 80 05 90 20` (jamais « réserver »).
- **CTA secondaire :** `Découvrir la maison`.
- **Manifeste (section promesse) :** « Vivre chez nous, pas dans un établissement. »
- **Ton global :** voix basse, chaleureuse, jamais commerciale, jamais médicale. Phrases courtes. Tutoyer le cœur, vouvoyer la personne. Zéro em-dash (`—` interdit) : utiliser `:`, `,`, `.`, `()`.
- **Réassurance conversion :** « Sans engagement, juste une conversation. »
- **Interdits copy :** ne jamais citer « 13 avis » ni le prix « 2000€ » en argument froid ; valoriser la qualité humaine (« des familles nous ont confié leurs parents et nous le redisent leur confiance »).

---

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies (+1 accent végétal optionnel), contrastes AA/AAA vérifiés sur `--bg`, lisibilité senior assurée.
- [x] 2 polices Google Fonts nommées avec poids (Lora display, Nunito Sans body).
- [x] 1 archétype custom choisi + justifié (`maison-qui-respire`), divergent des 14 archétypes et des 3 derniers clients.
- [x] 9 sections ordonnées, du matin (hero aube) au soir (footer).
- [x] 5 images réelles assignées à 5 rôles, 0 placeholder (hero Google Maps non exploitable, remplacé par l'étang).
- [x] Geste d'UI singulier détaillé (« L'heure douce », cadran de veille 24h/24).
- [x] Motion language décrit (durées lentes assumées + easing + reduced-motion + filet sécurité reveal).
- [x] Google Maps iframe : `https://maps.google.com/maps?q=42.6266,9.4242&z=14&output=embed` (Biguglia 20620 ; le builder confirmera lat/lng depuis la ligne CSV si plus précise).
- [x] Téléphone partout, jamais agressif : `tel:0680059020`.
- [x] Zéro em-dash dans toute la copy du site.
