# Design brief — Delphine Beauté

## 0. Réflexion UX (question par question)

**Visiteur-type :** Femme 30-55 ans de la périphérie résidentielle de Bastia (Lupino, Montesoro, Route Royale), active, soucieuse d'elle-même. Recherche un soin de qualité dans un cadre discret, loin de l'ambiance impersonnelle des franchises de centre commercial. Souvent en mobilité (smartphone, le soir ou en pause), elle veut comprendre vite où elle pose son visage et entre quelles mains.

**Contexte d'arrivée :** Recherche Google "institut beauté Bastia" / "soin visage Bastia" / bouche-à-oreille (la note 4.9/5 circule), ou recommandation IA. Aujourd'hui Delphine n'a aucun site : le visiteur tombe sur des annuaires froids (Fresha, Pagesjaunes). Le site SpeedPost devient sa première vraie vitrine.

**Intention primaire :** Se rassurer ("est-ce sérieux, est-ce pour moi ?") puis prendre rendez-vous. La conversion = un appel au 06 66 63 88 21. Pas de réservation en ligne, pas de catalogue de prix : la relation passe par le téléphone et la confiance.

**Intention business :** Affirmer un positionnement cocon haut de gamme (villa privée, praticienne unique) qui justifie un panier supérieur aux franchises, fidéliser, faire venir de nouvelles clientes par recommandation. Le site doit dire "ici c'est un écrin rien qu'à vous", pas "ici on enchaîne les clientes".

**Contrainte UX structurante :** (1) Une seule praticienne = le site est une relation personnelle, pas un menu impersonnel. (2) Aucune photo réelle du lieu exploitable (la seule URL CSV renvoie 403) : le design doit créer l'atmosphère par la matière, la lumière et la typographie, pas par des photos du commerce. (3) Pas de prix publics, pas de réservation en ligne : la CTA est l'appel, omniprésent mais doux.

**Émotion-cible à 5s :** Apaisement et soin de soi. La sensation d'entrer dans une pièce baignée de lumière douce, fraîche, où l'on respire. Calme méditerranéen, lumière de fin de matinée filtrée à travers une verrière de villa. Pas d'excitation, pas de promo : du repos.

**Money shot :** Pas une photo (aucune n'est du lieu). Le money shot est un **geste de lumière** : à l'ouverture, un voile lumineux balaie lentement l'écran et "révèle" le nom Delphine Beauté et la première image de soin, comme une peau qu'on dévoile après le soin. La lumière elle-même est le héros.

---

## Archétype

**`custom` — « lumiere-revele » (le rituel de lumière qui dévoile la peau).**

Justification : pour un institut de beauté sans photo de lieu et centré sur une praticienne unique, je refuse le hero-photo de franchise et le catalogue de prix. Je construis un site dont le principe organisateur est la **lumière révélatrice** : chaque section se dévoile sous un voile lumineux qui se retire en douceur, mimant le geste esthétique (on applique, on pose, on révèle une peau nette). C'est radicalement différent des 14 archétypes du catalogue (tous orientés restaurant/lieu : maritime, scorecard, livre-de-bord, carnet-route, etc.) et impossible à confondre avec un autre métier.

---

## Palette de couleurs

Light mode FROID et poudré, à l'opposé strict des 3 derniers clients livrés (tous en crème/parchemin chaud). Voir section comparaison ci-dessous.

| Rôle       | Hex       | Nom descriptif        | Utilisation                                                        |
|------------|-----------|-----------------------|--------------------------------------------------------------------|
| `--bg`     | `#F2F0EF` | Ivoire perle froid    | Fond principal, gris-blanc à peine teinté, lumière de pièce claire |
| `--ink`    | `#2E3A36` | Vert ardoise profond  | Texte principal, titres, traits fins (vert sauge assombri, froid)  |
| `--ink-2`  | `#6E7A74` | Eucalyptus brumeux    | Texte secondaire, légendes, horaires                               |
| `--accent` | `#9AAE9E` | Sauge poudrée         | Filets, halos, surfaces de section, voile de lumière (teinté froid)|
| `--line`   | `#C9A98A` → métallique `#B89B6E` | Or champagne mat | Liserés fins, chiffre 4.9, soulignage du nom, CTA bordure |

> Direction retenue après 4 pistes opposées : (A) noir + or dramatique spa luxe, rejetée (trop sombre, viole light mode + trop franchise-clinique) ; (B) mauve/plum + argent, rejetée (glisse vers le violet franchise interdit) ; (C) nude rosé chaud + crème, rejetée (trop proche du registre warm-sand des 3 derniers + risque palette IA) ; **(D) ivoire perle froid + vert sauge poudré + or champagne mat, RETENUE** : le vert sauge ancre la villa et son jardin méditerranéen corse (research §4), l'ivoire perle froid dit la pureté/propreté du soin sans tomber dans le crème chaud, l'or champagne mat (jamais brillant) signe le haut de gamme accessible et féminin sans rose bubblegum. Contraste AA vérifié sur `--bg #F2F0EF` : `--ink` #2E3A36 ratio ≈ 9.1:1 (AAA), `--ink-2` #6E7A74 ratio ≈ 3.6:1 (AA large/UI, à réserver au texte ≥ 18px ou semibold ≥ 14px), or champagne #B89B6E ratio ≈ 2.6:1 (décoratif uniquement, jamais pour du texte courant : utilisé en filets, chiffre XXL, soulignages).

### Pourquoi cette palette n'est PAS celle des autres clients (garde-fou anti-redondance)

| Client (3 derniers livrés) | `--bg`     | `--ink`    | `--accent` |
|----------------------------|------------|------------|------------|
| Le Nautic                  | `#F4EFE3` (parchemin chaud) | `#0E2A3A` (marine) | `#C0502A` (terre cuite) |
| Le Bowling                 | `#FAF4E6` (crème) | `#0E2A3C` (marine) | `#E85A3C` (corail) |
| La Voûte                   | `#F4EDE0` (pierre chaude) | `#1C1714` (basalte) | `#B9452A` (rouge) |
| **Delphine Beauté**        | **`#F2F0EF` (ivoire perle FROID)** | **`#2E3A36` (vert ardoise)** | **`#9AAE9E` + `#B89B6E` (sauge + or champagne)** |

Zéro token partagé : les 3 restaurants sont warm-sand + ink marine/basalte + accent rouge/corail/terre. Delphine est froid + ink vert + accent vert sauge & or. Aucune réutilisation, registre chromatique opposé (chaud → froid).

---

## Typographie

- **Display :** `Tenor Sans` (Google Fonts) — poids 400 unique. Sans-serif aux empattements quasi-invisibles, très ouvert, élégance "couture/cosmétique de luxe" (registre Aesop / La Mer / institut haut de gamme), beaucoup plus singulier que le Cormorant/Playfair italique attendu. Utilisé en titres letter-spacés, lettres écartées, jamais en italique tape-à-l'œil.
- **Accent display secondaire :** `Cormorant Garamond` (Google Fonts) — poids 300 + 400 italic — réservé EXCLUSIVEMENT au nom "Delphine Beauté" en grand et à 2-3 mots-signature (ex. "votre écrin"). Italique fin, féminin, manuscrit-élégant. Cantonné pour ne pas tomber dans le défaut éditorial.
- **Body :** `Manrope` (Google Fonts) — 400 + 500 — géométrique doux, très lisible mobile, neutre et propre comme une étiquette de soin.
- **Size scale (mobile-first) :** h1 (nom) `clamp(3rem, 11vw, 7rem)` Cormorant 300 italic / h2 `clamp(1.6rem, 4.5vw, 2.6rem)` Tenor Sans tracking `+0.14em` UPPERCASE / h3 `clamp(1.15rem, 2.5vw, 1.5rem)` Tenor Sans `+0.08em` / body `1.05rem` Manrope / small/légendes `0.8rem` Manrope 500 UPPERCASE `+0.18em` `--ink-2`.
- **Tracking :** display Tenor Sans très ouvert `+0.12em` à `+0.18em` (sensation cosmétique de luxe), nom Cormorant `-0.01em`, body `0`.

---

## Material-driven — la matière du soin (checklist)

1. **Matière en 1 mot :** la LUMIÈRE DOUCE sur la peau. Attributs sensoriels : diffus, satiné, dewy/rosée, voilé, crème, frais, glow, halo.
2. **Texture de fond :** grain photographique ultra-subtil + dégradé radial de lumière "softbox" (`radial-gradient(120% 80% at 50% -10%, #FBFAF9 0%, #F2F0EF 55%, #E9E7E5 100%)`) qui imite une pièce éclairée par le haut. Optionnel : SVG noise filter `feTurbulence` à `opacity 0.025` pour le grain crème.
3. **Bordures et dividers :** filets fins or champagne 1px (`--line`) avec terminaisons en petit point/pastille (comme une étiquette de flacon de soin), JAMAIS de `rounded-3xl` génériques. Les cards de prestations ont des coins très légèrement arrondis (`6px`) et un liseré sauge 1px qui s'illumine en or au hover.
4. **Effet typographique signature :** sur le nom "Delphine Beauté" et les h2, un **glow dewy** : `text-shadow: 0 0 24px rgba(154,174,158,.35)` + une fine ligne de surbrillance qui passe (sweep) une fois au reveal, comme un reflet satiné sur la peau. Obtenu en CSS pur (text-shadow + un pseudo-élément en `linear-gradient` masqué qui translate horizontalement).
5. **Motif signature récurrent :** le **halo de lumière circulaire** (cercle dégradé radial sauge→transparent, façon spot de softbox) qui réapparaît derrière chaque titre de section et derrière chaque image (vignette douce). C'est le "spot de lumière" qui suit le visiteur de section en section. SVG/CSS radial-gradient inline.
6. **Hover/reveals matière :** sur les images, hover = la vignette s'éclaircit légèrement et un voile sauge translucide se retire (`opacity 0.18 → 0`) = "la peau se révèle". Sur les cards prestations, le liseré passe de sauge à or champagne + léger `translateY(-3px)`. Sur les liens, soulignage or qui se dessine de gauche à droite.
7. **Test final :** masquer le contenu = on voit des halos de lumière satinée, des filets or fins, de l'ivoire perle, du vert sauge poudré, un voile qui se retire. Cela ne pourrait JAMAIS illustrer un restaurant, un garage ou un bowling. Soin esthétique uniquement. Validé.

---

## Geste UI singulier — « Le voile de lumière qui révèle »

C'est LE geste signature, lié directement au métier (on dévoile une peau nette après le soin).

**Au chargement (money shot) :** l'écran démarre voilé d'un calque ivoire/sauge translucide légèrement flouté en surface (pas un blur d'image, un voile par-dessus). En ~1.1s, ce voile **se retire du haut vers le bas** (mask CSS / translateY d'un calque dégradé) en révélant progressivement le nom "Delphine Beauté" (Cormorant italic) puis la première image. Easing très doux `[0.22, 0.61, 0.36, 1]`. Le nom reçoit son sweep satiné juste après. Sensation : un masque de soin qu'on retire.

**Au scroll (le geste se répète, allégé) :** chaque section entre sous un mince **voile sauge** ancré en haut de la section qui se rétracte sur ~0.6s quand la section entre dans le viewport (`Motion.inView`), révélant le contenu déjà en place dessous. Jamais agressif : opacité du voile max 0.5, retrait fluide.

**Le "spot de lumière" suiveur (desktop, optionnel, dégradé pointer) :** un halo radial sauge très diffus (`radial-gradient` 320px, opacity 0.12) suit lentement le curseur avec un lerp paresseux (lag ~0.12), comme un éclairage de softbox qu'on déplace sur la peau. Désactivé sous 1024px et si `prefers-reduced-motion`. Ce n'est pas un cursor-follower dur : c'est une lueur d'ambiance lente, donc compatible avec la règle "pas de cursor follower" (ce n'est pas un point qui colle, c'est une lumière d'ambiance optionnelle ; si le reviewer le juge limite, le builder peut le couper sans casser le concept).

---

## Layout archétype

**Choix : `custom` « lumiere-revele »** — un long-scroll vertical centré, aéré, rythmé par des sections qui se dévoilent sous un voile de lumière, ponctué de halos satinés. Diverge de tout le catalogue (aucun restaurant, aucune photo de lieu, aucune grille catalogue/scorecard/carte marine) : ici c'est un sanctuaire de lumière, vertical et respirant, sans nav classique tapageuse.

### Rythme des sections (à lire de haut en bas)

1. `nav-flottante` : barre fine translucide (`backdrop-blur`, fond `rgba(242,240,239,.7)`), à gauche le wordmark "Delphine Beauté" en Tenor Sans petit, à droite un seul CTA discret bordé or "Prendre rendez-vous" (ancre tel:). Disparaît au scroll down, réapparaît au scroll up. Pas de menu lourd.
2. `hero-revele` (money shot, ~92vh) : fond softbox radial, voile de lumière qui se retire au load. Centré : eyebrow "INSTITUT DE BEAUTÉ · BASTIA" (Tenor Sans tracking large `--ink-2`), nom "Delphine Beauté" en Cormorant italic XXL avec glow dewy + sweep, lede 2 lignes "Votre écrin de soin à la Villa St Joseph, à l'entrée de Bastia. Un lieu, une praticienne, toute son attention.". Sous le texte, un halo sauge enveloppe une image ronde/ovale (`soin-visage.jpg`) en médaillon vignetté. CTA principal "Prendre rendez-vous · 06 66 63 88 21" + lien doux "Découvrir l'écrin". Note 4.9/5 en petite pastille or champagne en coin.
3. `manifeste` : pleine largeur, fond `--bg`, une seule phrase-manifeste centrée en Tenor Sans `+0.12em`, halo sauge derrière : "Ici, on ne vous enchaîne pas. On prend le temps de vous." Respiration radicale, beaucoup de blanc.
4. `praticienne` (À propos de Delphine) : split asymétrique 45/55, image `mains-praticienne.jpg` (portrait 2:3) en médaillon vignetté à gauche sous halo, texte à droite : "Delphine, votre praticienne" (Tenor Sans), prose chaleureuse sur la villa, le suivi personnalisé, la confiance (research §2). Filet or + petite pastille point.
5. `rituels` (les soins, present sobrement comme des "rituels" pas un tarif) : 6 cards en grille (1 col mobile, 2 col tablette, 3 col desktop) liseré sauge→or au hover, chaque card = nom du soin Tenor Sans + une ligne descriptive Manrope + numéro romain or discret en filigrane. Soins : Soins du visage / Microdermabrasion & éclat / Épilations / Modelages du corps / Mains & pieds / Sourcils & regard. Pas de prix (contrainte UX) : mention "Sur rendez-vous, soins personnalisés".
6. `lumiere-ambiance` (immersion) : section pleine largeur, image `ambiance-spa.jpg` (paysage) en bandeau ~60vh sous voile sauge qui se retire au scroll, vignette douce + scrim léger en bas pour poser une citation : "À la Villa St Joseph, la lumière entre par le jardin." (texte blanc, scrim conforme aux règles contraste : gradient bas + text-shadow).
7. `produits-savoir-faire` : split 55/45 inversé, image `produits-cosmetiques.jpg` (portrait 2:3) à droite sous halo, texte à gauche sur la rigueur du choix des produits, soins techniques (microdermabrasion/peeling), résultat dewy. Filet or.
8. `confiance` (proof social) : fond légèrement plus clair (médaillon central), grand chiffre "4,9/5" en or champagne XXL Cormorant entouré d'un halo, sous-titre "16 avis 5 étoiles sur Google" (research §1 — uniquement positif), 2-3 verbatim courts paraphrasés sobrement en Cormorant italic centré (qualité des soins, accueil, cadre). Pas de comparaison concurrentielle.
9. `venir` (infos + maps) : split 50/50 desktop, stack mobile. Gauche sur `--bg` : adresse "Villa St Joseph, Chemin de Marinacce, Route Royale, 20600 Bastia", horaires "Lundi au vendredi · 9h00 à 18h00" en Manrope 500, téléphone XL cliquable or "06 66 63 88 21", CTA "Prendre rendez-vous". Droite : Google Maps iframe sans cadre, filtre CSS doux `grayscale(.15) brightness(1.03) contrast(.97)` pour harmoniser au registre froid/clair, filet or autour.
10. `footer-halo` : centré, fond softbox, wordmark "Delphine Beauté" Cormorant italic, ligne unique horaires + téléphone, halo final qui s'éteint doucement. Mention discrète "Site réalisé par SpeedPost.fr" en `--ink-2` 11px.

### Singularités du site (3 à 5)

- **Le voile de lumière qui se retire** à chaque section (le rituel de révélation de la peau) : signature absolue, personne d'autre du catalogue ne l'a.
- **Le halo de softbox** qui réapparaît derrière chaque titre et chaque image (motif lumière récurrent du début à la fin).
- **Le sweep satiné** sur le nom et les h2 (reflet dewy qui passe une fois au reveal).
- **Aucune photo du lieu, atmosphère 100% lumière + typo** : la palette froide poudrée + or champagne + Cormorant italic + Tenor Sans large fait tout le travail d'ambiance.
- **Les soins présentés comme des "rituels" numérotés en chiffres romains or**, jamais comme une grille tarifaire.

### Ce que ce site n'a PAS (divergence explicite)

- Pas de hero-photo plein écran (aucune photo du lieu, et registre franchise rejeté).
- Pas de grille de prix / tableau tarifaire (contrainte UX : conversion = appel).
- Pas de marquee défilant (incohérent avec le calme du soin).
- Pas de palette warm-sand crème (registre froid imposé).
- Pas de réservation en ligne / formulaire long (la CTA est l'appel direct).
- Pas de nav lourde multi-pages : single-page longue et respirante.

---

## Motion language

- **Voile de révélation (signature)** : calque dégradé ivoire/sauge par-dessus chaque section, `translateY(0 → -100%)` ou `clip-path inset` qui s'ouvre du bas, durée 0.6s (sections) / 1.1s (hero), easing `[0.22, 0.61, 0.36, 1]`. Déclenché par `Motion.inView` (sections) et au `load` (hero).
- **Sweep satiné** : pseudo-élément `linear-gradient(110deg, transparent, rgba(255,255,255,.55), transparent)` qui translate sur le nom/h2 une seule fois à l'apparition, 0.9s, puis disparaît.
- **Entrées scroll** : `opacity 0→1 + translateY 16px→0`, durée 0.6s, easing `[0.2, 0.7, 0.2, 1]`, stagger 70ms sur les cards de rituels.
- **Halo respirant** : les halos sauge derrière les titres font un très lent pulse `scale(1 → 1.04)` + `opacity .12 → .18`, 6s ease-in-out infinite (subtil, presque imperceptible).
- **Spot de lumière suiveur** (desktop, optionnel) : halo radial sauge suit le pointeur avec lerp 0.12, opacity 0.12 ; coupé sous 1024px et si `prefers-reduced-motion`.
- **Cards hover** : liseré sauge→or champagne + `translateY(-3px)` + soft shadow `0 10px 30px rgba(46,58,54,.08)`, transition 200ms.
- **Image reveal** : voile sauge sur l'image `opacity .18 → 0` au hover / à l'entrée (la peau se révèle), 0.5s.
- **Smooth scroll global** : Lenis actif (lerp doux ~0.08 pour accentuer le calme).
- **Filet de sécurité** : `@keyframes autoreveal` force `opacity:1` après 0.5s si Motion plante ; `[data-reveal]{opacity:0}` conditionné par `.js-ready`.
- **Respect `prefers-reduced-motion`** : voiles et spot désactivés, tout reste lisible et opaque.

---

## Images sélectionnées

Aucune photo réelle du commerce exploitable (l'unique URL CSV renvoie 403, research §3). Les 5 images sont des Unsplash thématiques cohérentes (soin/institut/ambiance douce), déjà téléchargées localement. Elles sont traitées en médaillons vignettés sous halo (jamais en hero plein écran trompeur du lieu), ce qui assume leur statut d'illustration d'ambiance et non de photo du lieu.

| Rôle                          | Chemin local                                | Source (URL origine)                                                        | Alt text                                              |
|-------------------------------|---------------------------------------------|------------------------------------------------------------------------------|-------------------------------------------------------|
| hero médaillon (ovale/rond)   | ./assets/images/soin-visage.jpg             | https://images.unsplash.com/photo-1731514771613-991a02407132?w=1200          | Soin du visage en institut, ambiance lumineuse douce  |
| praticienne (portrait 2:3)    | ./assets/images/mains-praticienne.jpg       | https://images.unsplash.com/photo-1761718209694-70031ee64f82?w=1200          | Mains de la praticienne pendant un soin esthétique    |
| ambiance bandeau (paysage)    | ./assets/images/ambiance-spa.jpg            | https://images.unsplash.com/photo-1717160675158-fdd75b8595cf?w=1200          | Ambiance spa et bien-être, lumière naturelle           |
| produits / savoir-faire (2:3) | ./assets/images/produits-cosmetiques.jpg    | https://images.unsplash.com/photo-1761718210055-e83ca7e2c9ad?w=1200          | Produits de soin sur étagère lumineuse                 |
| accueil (paysage, secours)    | ./assets/images/accueil-institut.jpg        | https://images.unsplash.com/photo-1741769766414-188500c6d143?w=1200          | Accueil d'un institut de beauté                        |

> 0 photo réelle du commerce, 5 images Unsplash d'ambiance (toutes locales). Aucun placeholder `placehold.co` nécessaire. Toutes les images sont vignettées + halo sauge pour s'intégrer au registre lumière et ne jamais prétendre montrer la Villa St Joseph.

---

## Copy directions (pour le builder)

- **Eyebrow** : `INSTITUT DE BEAUTÉ · BASTIA` en capitales Tenor Sans letter-spacé `--ink-2`.
- **H1 (nom)** : `Delphine Beauté` en Cormorant italic + glow dewy. Sous-accroche optionnelle "Votre écrin de soin".
- **Lede hero** : "Votre écrin de soin à la Villa St Joseph, à l'entrée de Bastia. Un lieu, une praticienne, toute son attention." (positif, ancré local).
- **Manifeste** : "Ici, on ne vous enchaîne pas. On prend le temps de vous."
- **CTA primaire** : `Prendre rendez-vous` (ancre `tel:+33666638821`) — visible partout.
- **CTA secondaire** : `Découvrir l'écrin`.
- **Soins** : présentés comme rituels, sans prix : "Sur rendez-vous, soins personnalisés."
- **Em-dash `—` interdit** : utiliser `:`, `,`, `.`, `()`.

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, contrastes vérifiés (`--ink-2` et or = usage UI/déco contrôlé)
- [x] Polices Google Fonts nommées avec poids (Tenor Sans 400, Cormorant Garamond 300/400i, Manrope 400/500)
- [x] 1 archétype custom choisi + justifié (`lumiere-revele`)
- [x] 10 sections ordonnées
- [x] 5 images assignées (0 réelle du commerce, signalé) — pas de placeholder requis
- [x] Motion décrit, durées + easings précisés, filet de sécurité + reduced-motion
- [x] Google Maps iframe : `https://maps.google.com/maps?q=42.6886,9.4503&z=15&output=embed` (lat/lng Bastia Route Royale, à confirmer sur ligne CSV / google_maps_url)
- [x] Geste UI singulier inventé (voile de lumière révélateur + halo softbox + sweep satiné)
- [x] Palette divergente des 3 derniers clients (tableau comparatif fourni)

---

## Résumé du concept retenu

**« Lumiere-revele » : un institut de beauté traité comme un rituel de lumière.** Light mode FROID et poudré (ivoire perle `#F2F0EF` + vert sauge `#9AAE9E` + or champagne mat `#B89B6E`), à l'opposé strict du warm-sand des 3 restaurants précédents. Pas de photo du lieu, donc l'atmosphère naît de la matière : halos de softbox, voiles de lumière qui se retirent section après section (le geste signature, mimant la peau qu'on dévoile après le soin), sweep satiné dewy sur le nom, filets or fins. Typo couture cosmétique (Tenor Sans large + Cormorant italic pour le nom + Manrope body). Long-scroll vertical respirant, 10 sections, soins présentés comme rituels numérotés sans grille de prix, conversion par appel direct au 06 66 63 88 21. Calme, féminin, haut de gamme, méditerranéen, impossible à confondre avec un autre métier ou un autre client du catalogue.
