# Design brief — Évasion D'aurora

> Institut de spa et bien-être : esthéticienne, salon de massage, onglerie de luxe.
> 28 A paisulo di l'umbrina, 20290 Lucciana (Haute-Corse, plaine orientale, à 10 min de Bastia).
> 5,0 / 5 sur 15 avis (100 % cinq étoiles, aucun avis négatif).
> Lun-Ven 09:00-19:00, Sam 09:00-13:00, Dim fermé.
> Tél +33 6 16 60 38 29. Lat/Lng : 42.5591126, 9.5270138.
> Source : `research.md` (lu et intégré).

---

## 0. Réflexion UX (question par question)

**Visiteur-type :** Femme active 25-55 ans de la plaine orientale (Lucciana, Biguglia, Furiani, Borgo, hinterland de Bastia), stressée, qui cherche une parenthèse de soin pour elle. Mobile à ~80 %, recherche le soir ou en pause déjeuner ("spa Lucciana", "onglerie Lucciana", "massage Bastia"). Deuxièmes profils : un proche en quête d'idée cadeau (carte cadeau), et la cliente touristique estivale.

**Contexte d'arrivée :** Recherche Google locale ou recommandation IA ("bon institut bien-être à Lucciana"), bouche-à-oreille (réputation 5,0 exceptionnelle), parfois lien depuis la fiche Google Maps. L'institut n'a aucun site propre ni réservation en ligne (absent de Planity) : ce site est sa première vitrine numérique.

**Intention primaire :** Prendre rendez-vous (appeler) et, avant cela, se rassurer sur l'ambiance ("est-ce que je vais me sentir bien, accueillie, en sécurité ?"). Tout converge vers le téléphone +33 6 16 60 38 29 et la prise de contact.

**Intention business :** Convertir une réputation parfaite mais invisible (15/15 avis 5 étoiles, zéro site) en flux de RDV qualifiés ; fidéliser la clientèle locale toute l'année ; capter la saisonnalité estivale ; assumer un positionnement haut de gamme ("onglerie de luxe") qui justifie le ticket.

**Contrainte UX structurante :** Pas de réservation en ligne (CTA = appeler/contacter, pas "réserver maintenant" qui mènerait dans le vide). Tarifs non publics (le soin se devise, cohérent premium). **Photos réelles du lieu inexistantes** : les 5 fichiers présents sont des stocks spa génériques (inspection faite, voir section Images). Le design doit donc porter l'émotion par la lumière, le rythme et les dégradés, pas par la preuve photo.

**Émotion-cible à 5s :** Apaisement et lumière douce qui monte. La sensation d'une aube : le calme avant que le monde s'agite, respiration qui ralentit, lâcher-prise. Le contraire d'un site clinique, saturé ou tape-à-l'œil.

**Money shot :** Le hero "lever d'aurore" : un dégradé vivant et très lent (lavande nuit pré-aube vers pêche-corail-doré de l'aurore), wordmark "Évasion D'aurora" en dégradé de texte, halo de lumière qui respire derrière, et le geste signature "Faites lever votre aurore" (slider nuit→jour). L'image mentale qu'on garde : on a soi-même fait lever le soleil.

---

## Archétype

**`custom` — `aurore-gradient-scroll` ("L'Aurore qui se lève au scroll").**

Justification : le nom même "Évasion D'aurora" = aurore = lever de lumière, et le métier = ralentissement / renaissance ; faire littéralement vivre une aurore au scroll (le fond glisse de la lavande nuit vers le pêche-doré du jour levé) est la traduction visuelle la plus fidèle au nom ET à l'émotion-cible. Aucun client du catalogue (maritime, dashboard-carnet-route, threshold-reveal, horizon-band, magazine-editorial, timeline-verticale, fullbleed-photo-first, showcase-catalogue, split-sticky, rapport-impact-territorial, arcade-keystone, scorecard-arcade, livre-de-bord, rustic-mediterraneen) n'exploite ce geste : il est non réutilisable sans s'appeler "aurore".

Concept directeur : **le site entier est un cycle lumineux**. Haut de page = lavande glacée d'avant l'aube. À mesure qu'on descend, la lumière monte : le `--bg` global glisse progressivement de l'indigo-lavande pâle vers le pêche-corail de l'aurore puis le doré chaud, piloté par une variable CSS `--dawn` (0→1) mappée sur la progression de scroll. Light mode strict : la "nuit" est un bleu-lavande très pâle, jamais du sombre. Rythme par **paliers respiratoires** (grands vides = inspiration/expiration), sections séparées par des **ondes-horizon SVG** (courbes douces), jamais de lignes droites ni de grille bento.

---

## Palette de couleurs

### Directions explorées avant de fixer (4-5 opposées)
1. **Rose poudré + or + crème** : REJETÉE, cliché spa par défaut, le piège annoncé.
2. **Sauge + terracotta + lin** : REJETÉE, glisse vers "yoga studio rustique", ne raconte pas l'aurore.
3. **Indigo nuit profond + néon** : REJETÉE, casse le light mode et l'apaisement.
4. **Aurore glacée : lavande pâle glacée + pêche-corail lumineux + doré chaud + indigo doux d'encre** : RETENUE.
5. **Aqua-aube méditerranéenne (lagon + sable + corail)** : bonne mais bascule vers le maritime déjà brûlé ; on emprunte seulement le doré chaud, pas la base.

### Palette retenue (light mode, contraste AA vérifié)

| Rôle | Hex | Nom descriptif | Utilisation |
|------|-----|----------------|-------------|
| `--bg` | `#F4F1FB` | Lavande glacée (nuit pré-aube) | Fond global en haut de page ; lumière bleutée juste avant l'aube sur la plaine de Lucciana. |
| `--bg-dawn` | `#FCEDE4` | Pêche-crème (aurore levée) | Fond cible bas de page vers lequel `--bg` glisse au scroll : la chaleur du soleil levant. |
| `--ink` | `#2B2440` | Indigo nuit doux | Texte principal (pas du noir : l'encre du ciel d'avant-aube). AA largement validé sur `--bg` et `--bg-dawn`. |
| `--ink-2` | `#6E5B7B` | Mauve-prune adouci | Texte secondaire, légendes, chapôs ; ombre douce de l'aube. AA validé pour texte ≥ 16px. |
| `--accent` | `#E8896B` | Corail-aurore | CTA, soulignés, halos, "rayon" signature ; le corail-pêche du premier rayon. Aplat CTA avec texte `#FFFFFF`. |
| `--accent-2` | `#E7B85C` | Doré chaud | Étoiles 5★, fins filets-horizon, glow ; l'or du soleil pleinement levé. |
| `--line` | `#D8CFEA` | Lavande grisée | Bordures, dividers, contours d'ondes ; sépare en douceur sans trancher. |

> Palette choisie pour évoquer le lever de l'aurore sur la plaine orientale corse et contraster avec tous les autres clients (chaud-minéral / pop / maritime). 5 tokens cœur (`--bg`, `--ink`, `--ink-2`, `--accent`, `--line`) + 2 indispensables au cycle (`--bg-dawn`, `--accent-2`). Le builder déclare les 7 dans `tw.config.js theme.extend.colors`.

**Dégradés signature (cœur de l'identité) :**
- Hero dawn-gradient : `linear-gradient(180deg, #E9E4F7 0%, #F6E6E6 45%, #FCEDE4 75%, #FBE3CF 100%)`, luminosité animée par le slider.
- Halo aurore (radial) : `radial-gradient(60% 50% at 50% 38%, rgba(232,137,107,.45) 0%, rgba(231,184,92,.22) 35%, transparent 70%)`.
- Body scroll-shift : `--bg` interpolé `#F4F1FB`(top) → `#FCEDE4`(bottom) via `--dawn`.

### Pourquoi cette palette n'est PAS celle des 3 derniers clients

| Client | bg | ink | accent | famille |
|--------|----|----|--------|---------|
| `la-voute` (arcade-keystone) | pierre/ocre chaud | brun foncé | terracotta arche | minéral chaud terrien |
| `le-bowling` (scorecard-arcade) | crème/graphite | charbon | jaune/rouge arcade | pop ludique saturé |
| `le-nautic` (livre-de-bord) | écru marine | bleu marine encre | bleu/or nautique | maritime froid |
| **`evasion-d-aurora`** | **lavande glacée #F4F1FB → pêche #FCEDE4** | **indigo doux #2B2440** | **corail-aurore #E8896B** | **aurore éthérée pastel-lumineux** |

→ Zéro token partagé. **Palette défaut Claude (cream #FFF8EE / butter #F4C66D / peach #E89B7B / chocolate #2C1F18) : non utilisée.** Vigilance : `--accent #E8896B` est proche du peach défaut `#E89B7B` mais VOLONTAIREMENT décalé d'1 ton plus corail/saturé, jamais posé sur un cream+butter+chocolate. Marge de sécurité builder si besoin : basculer en `#E97B5C`.

---

## Typographie

Direction : display lumineux et un peu sensuel (l'aurore, la féminité douce du cocon) + body calme et respirant. On évite la paire défaut éditoriale (Cormorant Garamond italic + Inter, suggérée par le research mais trop vue).

- **Display / wordmark / H1-H2 :** `Fraunces` (Google Fonts) — poids 300 + 500, `opsz` haute, italique autorisé sur 1 mot accent. Serif soft & warm au caractère solaire, courbes douces : look chaleureux d'aurore. Alternative si jugé trop vu : `Newsreader` light italic.
- **Sous-titres / labels rituels / eyebrows :** `Marcellus` — 400. Capitales fines élégantes d'institut, letter-spacing 0.18-0.22em.
- **Body / paragraphes / UI :** `Mulish` — 300 / 400 / 600. Sans-serif rond et tendre, plus doux qu'Inter, respire aux interlignes larges.

**Size scale (mobile-first) :**
- H1 wordmark hero : `clamp(2.8rem, 9vw, 6.5rem)` / Fraunces 300, line-height 0.98, tracking -0.01em.
- H2 sections : `clamp(2rem, 5vw, 3.4rem)` / Fraunces 400.
- Eyebrow : `0.78rem` / Marcellus, uppercase, tracking 0.22em, couleur `--accent`.
- Lead / chapô : `clamp(1.05rem, 2.2vw, 1.35rem)` / Mulish 300, line-height 1.7, `--ink-2`.
- Body : `1rem` / Mulish 400, line-height 1.8 (interligne large = respiration).
- Micro / légendes : `0.85rem` / Mulish 400, `--ink-2`.

**Effet typographique signature :** wordmark hero en **dégradé de texte aurore** (`background:linear-gradient(100deg,#2B2440 0%,#6E5B7B 40%,#E8896B 80%);-webkit-background-clip:text;color:transparent;`) qui se réchauffe quand on pousse le slider : les lettres passent de l'indigo nuit au corail. Le texte lui-même se lève.

---

## Layout archétype

**Choix : `aurore-gradient-scroll`** (custom). Le scroll fait littéralement se lever l'aurore (fond glissant lavande-nuit → pêche-doré), fidèle au nom du lieu et radicalement distinct des 14 archétypes déjà au catalogue.

### Rythme des sections (de haut en bas)

1. **`nav`** : transparente et légère sur le hero, passe en `backdrop-blur` + fond `--bg/85` au scroll. Wordmark Fraunces à gauche, liens (Philosophie · Soins · Ambiance · Avis · Contact), CTA "Prendre RDV" corail à droite. Mobile : burger doux ouvrant un panneau plein écran dégradé aurore.
2. **`hero` (money shot, plein viewport)** : dawn-gradient animé + halo radial + grain de lumière. Eyebrow "INSTITUT DE BIEN-ÊTRE . LUCCIANA, HAUTE-CORSE", H1 wordmark dégradé-texte, chapô court, **geste UI 1 : slider "Faites lever votre aurore"** (Repos→Respire→Renais), 5,0★ + "15 avis" discrets, 2 CTA ("Prendre rendez-vous" corail plein + "Découvrir nos soins" lien-rayon), scroll-cue pulsant lent. PAS de photo en fond (le dégradé EST le money shot).
3. **`philosophie / évasion`** (aube naissante) : bloc texte centré aéré (promesse : écoute, sur-mesure, lâcher-prise) + `photo-4` (ambiance massage, format portrait) en cadre coins organiques 40px avec halo doré derrière + onde-horizon. Légende d'ambiance honnête (jamais "notre praticienne"). 3 piliers : Écoute · Sur-mesure · Lâcher-prise (icônes line dorées). Ton sobre, aucun fait inventé (pas de "X ans d'expérience" non sourcé).
4. **`soins / rituels`** (lumière qui chauffe) : **geste UI 2 : sélecteur d'humeur** (4 pastilles Épuisée / Tendue / Terne / À fleur de peau) qui met en avant le soin adapté. Cartes prestations (fond `#FFFFFF`/85, ombre douce, coin organique, underline-rayon). Visuels d'appui d'ambiance `photo-2` (pierres chaudes) et `photo-3` (modelage à l'huile, recadré). Catégories : Onglerie (CONFIRMÉ, axe phare "onglerie de luxe"), Massages bien-être (CONFIRMÉ), Soins du visage (CONFIRMÉ), Épilations / Soins du corps / Beauté des pieds / Soins regard (PLAUSIBLE, formuler génériquement). NB : pas de photo réelle d'onglerie : illustrer l'onglerie par une carte typographique/icône, pas par un stock trompeur. Aucun tarif, aucun nom commercial inventé ; CTA "Composer mon rituel : appeler".
5. **`ambiance / galerie`** (jour levé, fond `--bg-dawn`) : `photo-5` (espace détente, recadré serré + overlay aurore) en format cinématique, masonry doux asymétrique, coins arrondis, parallax léger, lightbox au clic. `photo-6` (tulipes) en vignette seulement ou omise. 3 cartes ambiance texte-dégradé (Chaleur tamisée / Senteurs apaisantes / Silence) portent l'essentiel, photos en appoint. Privilégier les dégradés aux stocks.
6. **`avis 5★`** (doré chaud) : titre "Elles ont laissé le jour se lever" + badge 5,0★ (15 avis) étoiles `--accent-2`. Verbatims RÉELS du research : Luna ("Les techniciennes sont super professionnelles et attentionnées. Mes ongles n'ont jamais été aussi beaux !"), Léontine ("Une ambiance trop relaxante et des soins qui te font oublier tous tes soucis."). Cartes format respiration (grande guillemet dorée, texte aéré, prénom). Strictement positif, jamais de comparaison.
7. **`infos pratiques`** : 2 colonnes (empilées mobile). Gauche : horaires (Lun-Ven 09:00-19:00 . Sam 09:00-13:00 . Dim fermé), adresse (28 A paisulo di l'umbrina, 20290 Lucciana), tél +33 6 16 60 38 29, accès ("à 10 min de Bastia, plaine orientale, proche aéroport Bastia-Poretta"), badge "Ouvert / Fermé maintenant" calculé en JS. Droite : iframe Google Maps `https://maps.google.com/maps?q=42.5591126,9.5270138&z=15&output=embed`, cadre arrondi, filtre léger harmonisé.
8. **`CTA final` (#contact)** (plein soleil, `--bg-dawn` + halo le plus chaud) : "Offrez-vous votre aurore.", boutons "Prendre rendez-vous" + "Appeler l'institut" (`tel:+33616603829`), mention carte cadeau (levier cadeau identifié).
9. **`footer`** : wordmark, adresse, horaires condensés, lien Maps, mentions, crédit discret SpeedPost, onde-horizon finale + grain de lumière.

CTA flottant persistant "Prendre rendez-vous" (corail arrondi, bas-droite mobile / haut-droite desktop) sur tout le site → ancre `#contact` / `tel:`.

### Singularités du site (3 à 5)

- **Le scroll lève le soleil** : `--bg` global interpolé nuit→aurore via `--dawn` lié au scroll (personne d'autre au catalogue).
- **Slider "Faites lever votre aurore"** : geste tactile qui réchauffe le hero (dégradé + halo + dégradé-texte du wordmark) et fait défiler le mot Repos→Respire→Renais.
- **Sélecteur de rituel par humeur** : transforme un catalogue de soins en parcours empathique.
- **Halo respirant 7-8s** derrière les titres : invite physiologiquement le visiteur à ralentir sa respiration.
- **Ondes-horizon SVG** comme seuls séparateurs : zéro ligne droite, tout est courbe d'aube.

### Ce que ce site n'a PAS (divergence explicite)

- Pas de hero photo-fullbleed (le money shot est un dégradé généré, pas une image).
- Pas de grille bento, pas de timeline, pas de marquee.
- Pas de bordures droites ni de `rounded-3xl` génériques (coins organiques + ondes).
- Pas de bouton "Réserver en ligne" (aucune résa active : CTA = appeler).
- Pas de tarifs affichés, pas de fond sombre, pas de rose bonbon.

---

## Motion language

Principe : ambiances **lentes, organiques, apaisantes** ; reveals **courts 0.4-0.6s** (règle non négociable). Tout respecte `prefers-reduced-motion`. `[data-reveal]{opacity:0}` conditionné par `.js-ready` + `@keyframes autoreveal` filet de sécurité opacity:1 à ~0.5s.

| Élément | Animation | Durée | Easing | Détail |
|---------|-----------|-------|--------|--------|
| Reveals sections | fade + translateY 16px | 0.5s | `[0.22,0.61,0.36,1]` | stagger 80ms sur groupes |
| Dawn-gradient body | interpolation `--dawn` 0→1 | continue | linéaire | piloté par `scroll()` Lenis ; `--bg` glisse lavande→pêche |
| Slider "Rituel du Lever" | drag → halo + dégradé-texte + mot | temps réel | — | tactile + clavier (flèches), ARIA slider, fallback mi-course |
| Halo respirant | scale 1→1.04 + opacity 0.6→0.8 | 8s | ease-in-out | boucle infinie, OFF en reduced-motion |
| Particules lumière (option) | drift vertical + opacity | 18-24s | linéaire | 6-10 nœuds dorés, OFF en reduced-motion |
| Cartes soins hover | translateY -4px + halo + underline-rayon | 0.35s | ease-out | |
| Sélecteur humeur | carte reco : scale 1→1.02 respire + scroll-into-view | 0.5s + 4s breathe | ease-out / ease-in-out | |
| Wordmark dégradé-texte | warm-shift suit le slider | suit slider | — | indigo→corail |
| Étoiles avis | fill séquentiel à l'apparition | 0.4s, stagger 60ms | ease-out | dorées `--accent-2` |
| Nav | transparent→blur au scroll | 0.3s | ease | |
| Ondes-horizon | légère parallax translateY | continue | scroll-linked | amplitude faible |
| Photos galerie | parallax vertical ~8 % | scroll | — | doux, jamais de blur |

**Libs :** Motion One + Lenis (ESM CDN jsdelivr). SVG inline pour ondes/halo/grain (`feTurbulence` opacity 0.04 en `mix-blend-mode:soft-light`). Pas de lib lourde : la matière "lumière/vapeur/eau" se fait en CSS/SVG natif.

---

## Images sélectionnées

**IMPORTANT (inspection visuelle faite) :** les 5 fichiers présents NE SONT PAS des photos de l'institut Évasion D'aurora. Ce sont des **images de stock spa génériques** (banque/Unsplash). La photo propriétaire Google Maps (lh3 `hero-evasion-aurora` du research) n'a PAS été téléchargée et n'est pas dans le dossier. Conséquence : **aucun alt-text ne doit prétendre montrer l'institut, la praticienne ou un soin réalisé chez Évasion D'aurora** (sinon faux = interdit par les règles). Les images servent d'**ambiance/atmosphère** uniquement, jamais légendées "notre cabine / notre praticienne".

### Contenu réel vérifié de chaque fichier

| Fichier | Contenu réel | Qualité / verdict |
|---------|--------------|-------------------|
| `photo-2.jpg` | Massage aux pierres chaudes (dos, fleurs blanches), lumineux, premium, paysage | BON — exploitable en ambiance massage |
| `photo-3.jpg` | Massage à l'huile (huile versée dans la main), tons chauds, 2ᵉ personne floue à l'arrière | MOYEN — recadrer serré sur l'huile/la main |
| `photo-4.jpg` | Massage du dos (mains praticienne), lumière douce, format portrait vertical | BON — format portrait idéal pour la section philosophie |
| `photo-5.jpg` | Espace lounge tropical avec petite piscine + fauteuil rotin | MOYEN — esthétique "resort balinais", peu corse, parcimonie |
| `photo-6.jpg` | Flacon blanc + serviette roulée + tulipes roses sur table | FAIBLE — stock "spa cliché", tulipes roses ; éviter en grand format |

### Mapping rôles (images = ambiance, pas preuve)

| Rôle | Chemin local | Alt text (honnête, sans fausse attribution) |
|------|--------------|----------------------------------------------|
| hero | aucune photo : dégradé aurore généré CSS/SVG | — |
| philosophie | `./assets/images/photo-4.jpg` (portrait) | Massage relaxant du dos, ambiance bien-être |
| soins (massage) | `./assets/images/photo-2.jpg` | Massage aux pierres chaudes, soin du corps |
| soins (modelage) | `./assets/images/photo-3.jpg` (recadré) | Modelage à l'huile, soin détente |
| ambiance (espace) | `./assets/images/photo-5.jpg` (recadré + overlay aurore) | Espace détente baigné de lumière naturelle |
| ambiance (détail) | `./assets/images/photo-6.jpg` (vignette / optionnel) | Détail d'un rituel de soin |

### Recommandations builder (priorité haute)
- **Ne PAS sur-utiliser ces 5 stocks.** L'archétype `aurore-gradient-scroll` repose à ~70 % sur dégradés + SVG ; les photos sont un appoint, pas la colonne vertébrale. Cela protège de l'effet "spa template stock".
- **`photo-6` (tulipes roses) : usage minimal** (vignette ou pas du tout), le plus cliché et tire vers le rose-poudré qu'on veut éviter.
- **`photo-5` (resort tropical) : 1 emplacement max**, recadré serré + léger overlay aurore (`mix-blend` corail très faible) pour l'intégrer à la palette et gommer le côté "Bali".
- **Cohérence palette sur photos** : voile dégradé aurore très subtil (corail→transparent, opacity ≤ 0.12) + `filter: brightness(.98) saturate(1.02)` pour unifier ces stocks hétérogènes. Jamais de blur.
- **Texte sur photo** : protocole contraste complet des règles (scrim permanent + text-shadow + couleurs solides).
- **Idéal post-signature** : remplacer ces stocks par les vraies photos du lieu (à demander à la cliente). Le research note que la photo propriétaire lh3 existe ; l'orchestrateur peut la (re)télécharger via `image_dl.download('<url lh3>=w2400-h1800-k-no', 'dist/evasion-d-aurora-p9dxoxa4/site/assets/images', 'institut-aurora')` puis la valider visuellement avant usage en section philosophie (humanisation réelle).
- Aucun `source.unsplash.com`. Aucun hotlink (tout est local). Aucun placeholder nécessaire.

---

## Copy directions (pour le builder)

- **Eyebrow :** `INSTITUT DE BIEN-ÊTRE . LUCCIANA, HAUTE-CORSE` (capitales letter-spaced).
- **H1 :** wordmark "Évasion D'aurora" (le nom EST l'accroche poétique).
- **Lede :** 2 phrases, positives, ancrées local. Ex : "Une parenthèse de lumière à deux pas de Bastia. Laissez le jour se lever sur votre bien-être." (FR, zéro em-dash, ajuster sans inventer de faits).
- **CTA primaire :** "Prendre rendez-vous" (mène à `#contact` / `tel:`), jamais "Réserver en ligne".
- **CTA secondaire :** "Découvrir nos soins".
- **Accroche preuve :** "15 clientes, 15 étoiles." (exploite le 100 % 5★, exact et vérifiable).
- **Rappels rédactionnels :** em-dash U+2014 interdit (`:`, `,`, `.`, `()`). Positif uniquement. Pas de tarif, pas de nom de gérante non confirmé, pas d'ancienneté inventée. Légendes photos = ambiance, jamais "notre institut".

---

## Checklist avant handoff au builder

- [x] 7 couleurs hex définies (5 cœur + 2 cycle), contrastes AA vérifiés sur `--bg` et `--bg-dawn`
- [x] 3 polices Google Fonts nommées avec poids (Fraunces / Marcellus / Mulish)
- [x] 1 archétype custom choisi + justifié (`aurore-gradient-scroll`)
- [x] 9 sections ordonnées
- [x] 5 images de stock spa assignées en ambiance (PAS de photo réelle de l'institut ; alt-texts honnêtes) ; hero = dégradé généré ; 0 placeholder
- [x] Motion language décrit (durée + easing + reduced-motion + filet reveal)
- [x] Google Maps iframe prêt : `q=42.5591126,9.5270138&z=15&output=embed`
- [x] 2 gestes UI singuliers (slider "Faites lever votre aurore" + sélecteur d'humeur)

---

## Récapitulatif pour l'orchestrateur

- **Archétype :** `aurore-gradient-scroll` (custom) — le scroll lève l'aurore (fond lavande-nuit → pêche-doré), unique au catalogue.
- **Geste UI signature :** slider "Faites lever votre aurore" (Repos→Respire→Renais) + sélecteur de rituel par humeur.
- **Palette (light mode) :** `--bg #F4F1FB` . `--bg-dawn #FCEDE4` . `--ink #2B2440` . `--ink-2 #6E5B7B` . `--accent #E8896B` . `--accent-2 #E7B85C` . `--line #D8CFEA`. Zéro token défaut Claude, zéro token partagé avec les 3 derniers clients.
- **Typo :** Fraunces (display + dégradé-texte aurore) + Marcellus (labels) + Mulish (body).
- **Images :** 5 stocks spa génériques (photo-2 à photo-6), AUCUNE photo réelle de l'institut (alt-texts d'ambiance honnêtes, pas de fausse attribution) ; usage en appoint, design porté par dégradés + SVG ; 0 placeholder ; hero = dégradé généré assumé. Recommandation : récupérer la vraie photo lh3 + demander photos cliente post-signature.
- **Livrable :** `dist/evasion-d-aurora-p9dxoxa4/design.md`.
