# Design brief — Stellu Coiff (Calvi)

> REFONTE 2026-05-29. La V1 « constellation-orbitale » (ciel étoilé, inversion jour/nuit, curseur custom) a été jugée TROP conceptuelle / gadget par le client. Cette V2 écrase l'ancien design : direction **CLASSIQUE, élégante, épurée, orientée photo**, comme un vrai site de salon de coiffure premium. On garde un raffinement de mise en page et des micro-animations discrètes, mais ZÉRO gimmick spatial/céleste, zéro curseur custom, zéro before/after slider à deviner. Le nom « Stellu » (étoile en corse) ne survit que comme un **petit glyphe étoile discret** en détail typographique, jamais comme concept structurant.

> Salon de coiffure & bien-être, centre commercial Auchan/Nuance, Calvi (Balagne, Haute-Corse).
> Note 4.7/5 (14 avis, 13x 5 étoiles). Équipe : Estelle, Anthony, Céline, Marion.
> Objectif primaire du site : faire RÉSERVER / APPELER (06 73 53 99 92). Pas d'e-commerce, pas de tarifs publics.

---

## 0. Réflexion UX (question par question)

**Visiteur-type :** Trois profils dominants. (1) Habitante de Calvi/Balagne, 25-55 ans, mobile, qui cherche un coiffeur de confiance pour une coloration / un balayage / un lissage et veut « sentir » le sérieux du salon avant d'appeler. (2) Touriste estivale (Calvi station balnéaire) qui veut un brushing ou une coupe avant une soirée et cherche « coiffeur Calvi » sur Google. (3) Homme/famille qui vérifie que le salon est mixte et accessible.

**Contexte d'arrivée :** Recherche Google locale (« coiffeur Calvi », « balayage Calvi », « lissage brésilien Calvi »), clic depuis la fiche Google Maps, ou recommandation IA. Majoritairement **mobile**, souvent en déplacement, parfois en soirée (touriste). Décision rapide.

**Intention primaire :** En 10 secondes : comprendre que c'est un salon de coiffure premium et polyvalent à Calvi, voir à quoi ressemble le travail (photos), puis **APPELER pour un RDV** (`tel:+33673539992`). Secondairement : voir les prestations, les horaires, où c'est.

**Intention business :** Convertir les recherches locales en appels RDV, asseoir le positionnement premium/expert (lissage brésilien-japonais-kératine = différenciant en Corse), valoriser l'équipe nommée (Estelle, Anthony, Céline, Marion) pour créer la confiance, et capter le flux touristique estival.

**Contrainte UX structurante :** (1) Pas de réservation en ligne native crédible à mettre en place : l'action = **téléphone**, à rendre omniprésent et frictionless. (2) Le salon est dans un centre commercial (Auchan / parfumerie Nuance), pas une vitrine de rue : on compense l'absence de façade identitaire par une **direction photo soignée + une carte/itinéraire très clairs**. (3) Une seule vraie photo HD du salon disponible (hero-salon) : le reste de la galerie s'appuie sur des visuels Unsplash cohérents (coiffure premium, lumière méditerranéenne) à remplacer après signature.

**Émotion-cible à 5s :** Confiance + envie d'être chouchouté(e). « Un salon élégant, lumineux, où des pros savent ce qu'ils font. Je peux leur confier mes cheveux. » Sérénité (zen) plus que spectacle.

**Money shot :** Le hero = **vraie photo plein cadre du salon** (hero-salon), scrim dégradé + text-shadow, avec le wordmark « Stellu Coiff », l'accroche « Salon de coiffure & bien-être à Calvi » et un CTA « Prendre rendez-vous » bien visible. Clair en 2 secondes : QUOI (coiffure & bien-être), OÙ (Calvi), COMMENT (appeler). Pas de gadget à déchiffrer.

---

## Archétype

**`minimal-luxe` (exécution « éditorial-salon clair »)** : variante propre, sobre et orientée photo, qui ressemble à un vrai site de salon de coiffure haut de gamme.

Justification : le client veut explicitement du classique, élégant et rassurant. Un `fullbleed-photo-first` pur en hero + le reste en mise en page éditoriale calme (prestations en bandeau lisible, galerie mosaïque, équipe, avis, infos) donne un site crédible immédiatement, sans aucun concept à comprendre. La divergence avec le catalogue ne passe PAS par un layout exotique mais par la **palette teal-méditerranée + champagne**, la **typographie**, le rythme et un geste UI discret (mosaïque + révélation douce). C'est volontairement « un beau site de coiffeur », pas une expérience expérimentale.

---

## Palette de couleurs

Direction retenue parmi 4 explorées :
1. Blanc nacré + teal-méditerranée profond + champagne doré mat (RETENUE) : luminosité, eau de Calvi, premium feutré.
2. Lavande pâle + or mat + graphite : trop « institut spa », moins ancré Calvi.
3. Greige/taupe + vieux rose : trop proche de Pri'vilège (vieux rose poudré déjà livré).
4. Ivoire + cuivre balayage : déjà la signature de Soldani (cuivre #B06A45), écarté pour ne pas répéter.

Direction 1 : le **teal profond** évoque la Méditerranée de Calvi et donne une assise « expert/sérieux » sans froideur clinique ; le **champagne doré mat** apporte la note premium/bien-être (et un clin d'œil discret à « stellu »/l'étoile, en touche dorée minuscule) sans tomber dans l'or tape-à-l'œil.

| Rôle         | Hex       | Nom descriptif         | Utilisation                                                                 |
|--------------|-----------|------------------------|------------------------------------------------------------------------------|
| `--bg`       | `#F7F5F1` | Ivoire nacré           | Fond principal : blanc cassé chaud-neutre lumineux (PAS le cream #FFF8EE, plus clair et grisé) |
| `--surface`  | `#FFFFFF` | Blanc pur              | Cartes prestations, encadrés relevés au-dessus du fond                       |
| `--ink`      | `#16302E` | Teal nuit / pin maritime | Texte principal, titres serif, wordmark : un vert-bleu profond très sombre, méditerranéen |
| `--ink-2`    | `#5E6F6B` | Sauge cendrée          | Texte secondaire, légendes, eyebrows letter-spacés, horaires                 |
| `--accent`   | `#1F6E62` | Teal Calvi             | CTA primaire, liens, soulignages, filets, glyphe étoile, état « ouvert »     |
| `--gold`     | `#B79155` | Champagne doré mat     | Détails premium UNIQUEMENT au trait : petit glyphe étoile, filets fins, puces, hairline sous titres (jamais en grand aplat) |
| `--line`     | `#E4E0D8` | Ligne calcaire claire  | Séparateurs ultra-fins, bordures de cartes, hairlines                        |

> Contrastes vérifiés sur `--bg #F7F5F1` :
> - `--ink #16302E` -> environ **12.6:1** (AAA, texte courant et titres).
> - `--ink-2 #5E6F6B` -> environ **4.9:1** (AA texte normal).
> - `--accent #1F6E62` -> environ **4.8:1** (AA texte >= 16px, OK pour liens, CTA texte, chiffres).
> - `--gold #B79155` -> environ **2.9:1** : **réservé aux éléments graphiques** (filets, glyphe étoile, puces, hover), JAMAIS au texte courant. Sur fond `--ink` (teal nuit), le gold ressort en accent premium.
> - CTA primaire = bouton plein `--accent` texte blanc `#FFFFFF` (environ 4.9:1, AA).

### Divergence palette vs 3 derniers clients livrés

| Client                 | `--bg`     | `--ink`            | accent principal        |
|------------------------|------------|--------------------|--------------------------|
| Soldani Coiffure       | `#F6F5F2`  | `#1A1A1C` near-black | `#B06A45` cuivre         |
| Horizon Coiffure       | `#F2F0E9`  | `#2B3422` vert maquis | `#A07840` or bronze      |
| Pri'vilège             | `#F4F1EC`  | `#241E22` prune    | `#C29A8E` vieux rose     |
| **Stellu Coiff (V2)**  | **`#F7F5F1`** | **`#16302E` teal nuit** | **`#1F6E62` teal Calvi** + `#B79155` champagne |

-> Le **teal/pin maritime** (ink + accent) n'apparaît chez aucun des 3 derniers : Soldani = neutre+cuivre, Horizon = vert maquis terreux (bronze), Pri'vilège = prune+rose. Aucun token repris (le `--bg` ivoire est forcément voisin mais nuancé différemment et c'est le seul point commun toléré). Direction nette et propre.

---

## Typographie

- **Display :** `Cormorant Garamond` (Google Fonts) : poids **500** (titres) + **600** (accents) + un **italic 500** réservé aux signatures/éléments d'accent (ex. prénoms de l'équipe, citation). Serif chic, fine, élégante, lecture « salon premium / coiffure haut de gamme » immédiate. Choisie car elle porte la sophistication sans froideur, parfaite pour un salon mixte premium.
- **Body / UI :** `Jost` (Google Fonts) : **400** (courant) + **500** (labels/CTA). Sans-serif géométrique propre et un peu Art-déco, très lisible mobile, donne le côté soigné/contemporain qui équilibre la serif. (Choisie plutôt qu'Inter/Montserrat pour un caractère plus distinctif sans être bizarre.)
- **Size scale (mobile-first) :**
  - h1 (hero) : `clamp(2.6rem, 8vw, 5.2rem)`, Cormorant 500, tracking `-0.01em`, line-height 1.02
  - h2 (sections) : `clamp(1.9rem, 4.2vw, 3rem)`, Cormorant 500
  - h3 (cartes) : `1.35rem`, Cormorant 600
  - body : `1.05rem` (lede `1.18rem`), Jost 400, line-height 1.7, `--ink-2`
  - eyebrow / label : `0.74rem`, Jost 500, `letter-spacing: 0.28em`, uppercase, `--ink-2` ou `--accent`
- **Tracking :** display `-0.01em`, body `0`, eyebrows `0.28em`.
- **Détail signature :** un **petit glyphe étoile à 4 branches** (caractère type ✦) en `--gold`, placé devant l'eyebrow de chaque section et dans le wordmark, en hommage discret au nom « Stellu ». Taille environ 0.7em, jamais dominant. C'est le seul écho « étoile » conservé de la V1.

---

## Layout archétype

**Choix : `minimal-luxe`, exécution « éditorial-salon clair, photo-first ».** Hero photo plein cadre, puis un long-scroll vertical calme et conventionnel de salon premium : on reconnaît instantanément un site de coiffeur élégant, aucune structure à déchiffrer. La singularité tient à la palette teal-champagne, à la typo Cormorant/Jost, et à une galerie en mosaïque raffinée avec révélation douce, pas à un squelette exotique.

### Rythme des sections (à lire de haut en bas)

1. **Nav (sticky, transparente -> solide)** : barre fine, transparente sur le hero (texte blanc + text-shadow), puis fond `--bg` + hairline `--line` au franchissement du hero. Gauche : « ✦ Stellu Coiff » (Cormorant 600 + glyphe étoile gold). Centre/droite desktop : `Le salon` · `Prestations` · `Galerie` · `Avis` · `Infos`. À droite : bouton CTA plein `--accent` « Prendre RDV » -> ancre `#rdv` (qui contient le `tel:`). Mobile : burger sobre + bouton « Appeler » `tel:` toujours visible. Hauteur 64px.

2. **Hero (fullbleed photo, environ 92vh)** : vraie photo `hero-salon` plein cadre. Scrim permanent (dégradé vertical, voir motion/contraste) + `filter: brightness(.92) saturate(1.04)`. Contenu aligné bas-gauche : eyebrow « ✦ Calvi · Balagne » blanc cassé, H1 « Stellu Coiff » (Cormorant XXL), sous-titre « Salon de coiffure & bien-être au cœur de Calvi », puis 2 CTA : primaire plein `--accent` « Prendre rendez-vous » (`tel:`), secondaire texte souligné blanc « Découvrir le salon » (ancre `#salon`). Petite chip note Google « 4,7 sur Google · 14 avis » en bas (fond `rgba(22,48,46,.42)` backdrop-blur). Tout texte avec `text-shadow`. Clair en 2s : QUOI/OÙ/COMMENT.

3. **Bandeau confiance (mince, plein `--bg`)** : une ligne discrète sous le hero avec 3-4 mini-items séparés par le glyphe étoile gold : « Coiffure mixte » ✦ « Coloriste & balayage » ✦ « Lissages experts » ✦ « Réflexologie & soins ». Jost 500 uppercase letter-spacé, `--ink-2`. Pas un marquee animé : statique, lisible, rassurant.

4. **Le salon / à propos (`#salon`, split 50/50 désaligné)** : à gauche image `salon-interieur` (coins droits, hairline `--line`, petit cadre gold en accent au coin) ; à droite texte : eyebrow « ✦ Le salon », h2 « Une atmosphère zen, une équipe experte », lede 2 phrases (équipe Estelle, Anthony, Céline, Marion ; atmosphère chaleureuse ; expertise lissage brésilien/japonais/kératine). Filet gold 56px sous le titre. Pas de chiffres gadget. Sur mobile : image au-dessus, texte dessous.

5. **Prestations (`#prestations`, bandeau lisible en cartes)** : eyebrow « ✦ Nos prestations » + h2 « Ce que nous réalisons ». Grille de cartes `--surface` (bordure `--line`, coins 4px, ombre très douce) en 2 colonnes mobile / 3-4 desktop, regroupées par familles claires avec titres explicites (PAS de codes cryptiques) :
   - **Coiffure** : Coupe femme, Coupe homme, Coupe enfant, Brushing
   - **Couleur** : Balayage, Tie & dye, Coloration
   - **Soins & lissages** : Lissage brésilien, Lissage japonais, Kératine, Permanente
   - **Bien-être** : Réflexologie, Soins mains & pieds
   Chaque famille = une carte avec titre Cormorant 600 + liste Jost en puces étoile gold. Hover : `translateY(-3px)` + ombre douce + le filet de la carte passe `--accent`. Pas de prix affichés (non fournis) : un petit texte « Tarifs sur demande, devis gratuit en salon » + CTA « Appeler pour un RDV ». La **réflexologie + soins mains/pieds** est mise en avant comme différenciateur (carte « Bien-être » avec un léger fond `--ink` teal nuit + texte clair pour la distinguer : le seul bloc sombre du body, élégant).

6. **Galerie (`#galerie`, mosaïque éditoriale)** : eyebrow « ✦ Galerie » + h2 « Le travail en images ». Mosaïque asymétrique (CSS grid, tailles variées 2:3 / 1:1 / 3:2) de 6 visuels : `coupe`, `couleur`, `soin`, `brushing`, `detail-produits`, `femme-cheveux`. Coins droits, hairline `--line`. Geste UI discret : au hover desktop, l'image fait un `scale(1.03)` doux + un voile teal très léger se lève, et une légende Jost apparaît en bas (« Balayage », « Brushing », etc.). Sur mobile : légendes toujours visibles en surimpression bas avec mini-scrim. Apparition au scroll en stagger doux (inView). C'est la pièce maîtresse visuelle « orientée photo ».

7. **Avis (`#avis`, citations sobres)** : eyebrow « ✦ Ils nous font confiance » + h2 « 4,7/5 sur Google ». 2-3 verbatims POSITIFS uniquement (5 étoiles), en Cormorant italic 500 large, attribués en Jost (« Cliente Google »). Présentés en cartes calmes ou en bloc centré avec gros guillemet gold. Une ligne de 5 étoiles gold remplies. Aucun avis négatif, aucune comparaison. Pas de carrousel auto-play : statique ou révélation inView.

8. **Infos pratiques + Map (`#infos` / `#rdv`, split 55/45)** : eyebrow « ✦ Nous trouver » + h2 « Venez nous voir à Calvi ». Colonne gauche : adresse (Chez Nuance, centre commercial Auchan, Route de Santore, Bâtiment C, 20260 Calvi), téléphone en GROS lien `tel:+33673539992` (CTA plein `--accent` « Appeler le salon »), bloc horaires (table propre) :
   - Lundi : fermé
   - Mardi : 9h-19h
   - Mercredi : 9h-19h
   - Jeudi : 9h-19h
   - Vendredi : 9h-19h
   - Samedi : 9h-19h
   - Dimanche : fermé
   (Source CSV = vérité : Lundi à Samedi 9h-19h, Dimanche fermé. Note : le research mentionnait « Lundi fermé » mais le CSV fait foi -> Lundi ouvert 9h-19h. Le jour courant est subtilement surligné côté gold, état « Ouvert / Fermé » calculé en JS léger.)
   Colonne droite : iframe Google Maps `https://maps.google.com/maps?q=42.5503,8.7596&z=15&output=embed` (lat/lng Calvi, à confirmer depuis CSV), coins droits, hairline. Note : centre commercial -> repère « Chez Nuance / parfumerie » mis en avant pour lever la friction « où exactement ».

9. **Footer (calme)** : fond `--ink` (teal nuit) texte clair, hairline gold en haut. « ✦ Stellu Coiff » Cormorant, adresse condensée, `tel:`, horaires résumés, rappel « 4,7 sur Google ». Liens Instagram (@stellucoiff) + Facebook en footer uniquement (autorisé : notoriété). Crédit discret « Site par SpeedPost.fr » 11px. Aucun em-dash.

### Singularités du site (3 à 5)

- **Glyphe étoile gold ✦** : fil rouge typographique discret (wordmark + eyebrows + puces de prestations), seul écho conservé du nom « Stellu », élégant et non gadget.
- **Carte « Bien-être » en teal nuit** : unique bloc sombre du body, qui fait ressortir le différenciateur réflexologie/soins mains-pieds sans une ligne de texte noyée.
- **Galerie mosaïque asymétrique** avec voile teal + légende au hover : raffinement éditorial, pièce visuelle maîtresse.
- **Palette teal-méditerranée + champagne** inédite dans le catalogue coiffure (les 3 voisins sont cuivre / vert maquis / vieux rose).
- **Bouton « Appeler » omniprésent** (nav mobile + hero + prestations + infos) : l'intention primaire (RDV par téléphone) jamais à plus d'un scroll.

### Ce que ce site n'a PAS (divergence explicite + demande client)

- Pas de thème céleste / constellation / ciel étoilé / inversion jour-nuit (V1 rejetée).
- Pas de curseur custom, pas de scrolljack, pas de slider before/after à deviner.
- Pas de marquee animé (le bandeau confiance est statique).
- Pas de parallaxe ni d'effet scroll-linked (scroll natif uniquement).
- Pas de prix inventés, pas de lien vers Planity/Fresha/Treatwell (RDV natif = `tel:`).
- Pas de grand SVG dessiné en hero/premier plan (le hero est une vraie photo).

---

## Motion language

Sobre, discret, premium. Tout en `Motion.inView` one-shot, jamais scrubbé sur le scroll.

- **Entrées (apparition one-shot)** : `opacity 0->1 + translateY 16px->0`, durée **0.5s**, easing `[0.2, 0.7, 0.2, 1]`, stagger **70ms** sur les groupes (cartes prestations, items galerie). Déclenché une fois à l'entrée viewport.
- **Hero** : pas de parallaxe. Léger `scale(1.06 -> 1.0)` de l'image sur **1.2s** ease-out au chargement uniquement (one-shot), + fade-in du texte en stagger. Le scrim ne disparaît jamais.
- **Nav** : passage transparent -> `--bg` + hairline au franchissement du hero, détecté via `inView` sur une sentinelle (pas de calcul scroll continu).
- **Cards prestations hover** : `translateY(-3px)` + ombre soft + filet -> `--accent`, transition **180ms**.
- **Galerie hover (desktop)** : `scale(1.03)` image + voile teal `rgba(22,48,46,.18)` + légende fade-in, transition **220ms**. Mobile : légendes statiques.
- **SCROLL NATIF obligatoire** : pas de Lenis, pas de smooth-scroll hijack. Smooth des ancres `#section` via CSS `html{scroll-behavior:smooth}` uniquement.
- **Filet de sécurité reveal** : `[data-reveal]{opacity:0}` conditionné par `.js-ready` ; `@keyframes autoreveal` force `opacity:1` après environ 0.6s si Motion plante. Pas d'auto-play vidéo, pas de cursor follower, pas de popup.

### Contraste texte sur image (hero + légendes galerie)

Application intégrale obligatoire (gate reviewer) :
1. **Scrim permanent** sur le hero (div `.scrim` indépendant) : `linear-gradient(180deg, rgba(10,24,22,.55) 0%, rgba(10,24,22,.15) 24%, transparent 46%, transparent 58%, rgba(10,24,22,.4) 84%, rgba(10,24,22,.72) 100%)` + `radial-gradient(60% 45% at 30% 70%, rgba(10,24,22,.42) 0%, transparent 70%)`.
2. `filter: brightness(.92) saturate(1.04) contrast(1.03)` sur l'image hero. Jamais de blur.
3. `text-shadow: 0 1px 2px rgba(0,0,0,.45), 0 2px 18px rgba(0,0,0,.3)` sur tout texte du hero (eyebrow, h1, sous-titre, CTA, nav transparente).
4. Couleurs solides : titres `#FFFFFF`, eyebrow blanc cassé chaud `#F2EAD8`, glyphe étoile en gold clair `#D8B873`, CTA primaire bouton plein `--accent`.
5. Chip note Google : `background: rgba(22,48,46,.42); backdrop-filter: blur(4px); color:#fff`.

---

## Images sélectionnées

Toutes en `.avif`, déjà téléchargées dans `site/assets/images/`. Référencer uniquement les chemins locaux.

| Rôle                         | Chemin local                              | Source (origine)              | Alt text                                   |
|------------------------------|-------------------------------------------|-------------------------------|--------------------------------------------|
| hero (fullbleed)             | ./assets/images/hero-salon.avif           | Google Maps lh3 (premiere_image, vraie photo salon) | Stellu Coiff, salon de coiffure à Calvi |
| à propos (split)             | ./assets/images/salon-interieur.avif      | Unsplash (ambiance salon)     | Ambiance zen du salon Stellu Coiff         |
| galerie 1 (coupe)            | ./assets/images/coupe.avif                | Unsplash                      | Coupe réalisée au salon                     |
| galerie 2 (couleur)          | ./assets/images/couleur.avif              | Unsplash                      | Coloration et balayage                      |
| galerie 3 (soin)             | ./assets/images/soin.avif                 | Unsplash                      | Soin et lissage des cheveux                 |
| galerie 4 (brushing)         | ./assets/images/brushing.avif             | Unsplash                      | Brushing et mise en forme                   |
| galerie 5 (détail produits)  | ./assets/images/detail-produits.avif      | Unsplash                      | Produits et outils du salon                 |
| galerie 6 (femme cheveux)    | ./assets/images/femme-cheveux.avif        | Unsplash                      | Résultat brillance et mouvement             |
| accent / ciseaux (optionnel) | ./assets/images/ciseaux.avif              | Unsplash                      | Ciseaux et outils de coiffure               |

- **Vraies photos du commerce :** 1 (hero-salon, Google Maps). **Unsplash :** 8 (galerie + ambiance, cohérents coiffure premium + lumière méditerranéenne). **Placeholders :** 0.
- Note traçabilité : une seule vraie photo HD disponible (Instagram/Facebook protégés, site officiel inaccessible). Mention démo outreach : visuels Unsplash à remplacer par les photos réelles du salon après signature. Le hero reste une **vraie photo plein cadre** (jamais wordmark sur fond uni).
- `hero-salon` doit faire >= 1200px de large (issu du resize lh3 `=w2400-h1800-k-no`). Si la version locale est sous 1200px, re-télécharger en HD avant build.

---

## Copy directions (pour le builder)

- **Eyebrow hero :** `✦ Calvi · Balagne` (capitales letter-spacées, glyphe gold).
- **H1 :** `Stellu Coiff`
- **Sous-titre hero :** `Salon de coiffure & bien-être au cœur de Calvi`
- **Lede à propos (2 phrases, environ 45 mots) :** « Estelle, Anthony, Céline et Marion vous accueillent dans une atmosphère zen et chaleureuse. Coupe, couleur, balayage, lissages brésilien et japonais, kératine : une équipe d'experts qui prend soin de vos cheveux comme de votre bien-être. »
- **CTA primaire :** `Prendre rendez-vous` (lien `tel:+33673539992`)
- **CTA secondaire :** `Découvrir le salon` (ancre `#salon`)
- **CTA infos :** `Appeler le salon`
- **Note différenciateur (carte Bien-être) :** « Au-delà de la coiffure : réflexologie, soins des mains et des pieds. Un vrai moment pour soi. »
- **Mention tarifs :** « Tarifs sur demande, devis gratuit en salon. »
- Ton : élégant, chaleureux, rassurant, expert. Positif uniquement. Aucun em-dash (U+2014).

## Checklist avant handoff au builder

- [x] 7 couleurs hex définies (bg, surface, ink, ink-2, accent, gold, line), contrastes vérifiés AA
- [x] 2 polices Google Fonts nommées avec poids (Cormorant Garamond + Jost)
- [x] 1 archétype choisi + justifié (minimal-luxe photo-first, classique soigné)
- [x] 9 sections ordonnées
- [x] 9 images assignées (1 réelle + 8 Unsplash), 0 placeholder
- [x] Motion décrit (durées + easing + scroll natif)
- [x] Google Maps iframe source prête (q=42.5503,8.7596, à confirmer lat/lng CSV)
- [x] CTA primaire = `tel:+33673539992`, aucun lien Planity/Fresha
- [x] Divergence palette vs 3 derniers clients documentée
