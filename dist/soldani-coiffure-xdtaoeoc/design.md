# Design brief — Soldani Coiffure (REFONTE 2026-05-29)

> Refonte totale. Le 1er design (`balayage-gradient`) a été rejeté par le client : « horrible, le hero horrible tout est moche ». Cause : hero rempli d'un grand dégradé capillaire marron plat (châtain→cuivre→blond) sans photo, plus un gros slider gadget « tirez la mèche ». Aplat boueux + gimmick lourd = perçu amateur.
>
> **Interdits formels repris de ce rejet (jamais reproduire) :**
> - Aucun fond dégradé capillaire pleine page. Le marron/cuivre/terracotta n'est PLUS une couleur de fond, seulement un accent au trait fin.
> - Aucun hero sans photo. Le hero est une vraie photo plein cadre.
> - Aucun gros slider/gadget en évidence.
>
> Nouvelle direction : **image-first, éditorial beauté premium, épuré, lumineux, beaucoup de blanc et d'espace négatif.** Référence mentale : salon parisien haut de gamme, magazine beauté, galerie d'art. Le produit (la chevelure, la lumière de Balagne, le geste de Kevin) parle, pas la déco.

---

## 0. Réflexion UX (question par question)

**Visiteur-type :** majoritairement une femme 25-55 ans, locale de Balagne (L'Île-Rousse, Belgodère, Calenzana) ou en vacances l'été. Souvent sur mobile, le soir ou pendant une pause, après avoir tapé « coiffeur balayage Île-Rousse » ou « coiffeur Occhiatana » sur Google, ou après une recommandation (« va voir Kevin »). Sensible à l'esthétique : elle veut voir un résultat avant de confier ses cheveux.

**Contexte d'arrivée :** recherche Google locale + bouche-à-oreille fort (5★ unanime, 14 Google + 136 avis clients). Elle arrive avec une intention déjà chaude : elle ne se demande pas « est-ce un bon salon » mais « est-ce LE salon pour moi, et est-ce que je peux prendre RDV maintenant ».

**Intention primaire :** voir des résultats (surtout balayage/couleur) et prendre RDV immédiatement, sans friction, sans appeler pendant les heures de fermeture.

**Intention business :** convertir le trafic Google/IA en RDV pris en ligne 24h/24 ; transformer la clientèle estivale de passage en habituées ; asseoir le positionnement « expert couleur & balayage, soin du cheveu (sans ammoniaque) » plutôt que « coiffeur de village générique ».

**Contrainte UX structurante :** (1) aucune vraie photo du salon disponible, on travaille avec 6 visuels éditoriaux Unsplash HD : le design doit donc être assez fort et cadré pour que ces images respirent et semblent choisies, pas piochées ; (2) le site **remplace** le service de réservation existant : la prise de RDV est native (formulaire de demande + `tel:` + bloc horaires), aucun lien « Réserver sur X » ; (3) horaires atypiques (lundi/dimanche fermé, samedi court) à rendre limpides.

**Émotion-cible à 5 s :** sophistication calme et lumineuse, désir. « C'est beau, c'est propre, c'est expert, j'ai envie d'y aller. » Pas folklore corse, pas rustique. Une élégance discrète qui valorise la cliente.

**Money shot :** une vraie photo plein cadre, lumineuse et aérée, d'une chevelure balayée (`balayage.jpg`), avec un voile blanc qui efface le bas de l'image vers le contenu, un titre serif fin blanc et un seul CTA. Zéro dégradé marron, zéro gadget. L'image fait 90 % du travail.

---

## Archétype

**`editorial-gallery` (image-first, custom premium)**

Justification : le visiteur vient juger un résultat esthétique, l'archétype doit donc être une **galerie éditoriale** où les photos sont les héroïnes, posées dans beaucoup de blanc avec une typo serif fine, comme un portfolio de coloriste / un magazine beauté. Cela diverge radicalement des 3 derniers clients livrés (cartes marines, scorecard de bowling, arches de pierre, tous sur fond crème chaud à accent terracotta en aplat) : ici fond blanc/ivoire glacé froid, le cuivre n'apparaît qu'au trait, et la structure est rythmée par de grandes images plein cadre alternant avec des respirations typographiques. C'est un site « beauty editorial », pas un site « commerce de village ».

---

## Palette de couleurs

### 4 directions claires explorées avant de fixer

1. **Ivoire glacé + encre + cuivre filet** (RETENUE) : blanc cassé très froid, presque papier photo, texte encre profond, cuivre uniquement en trait/lien. Galerie beauté parisienne. Met les photos en valeur sans rivaliser.
2. Blanc pur + noir + un seul rose poudré : très mode/luxe, mais risque froid clinique et collision « salon générique ».
3. Lin chaud + sauge + cuivre : joli mais retombe dans le warm-cream des 3 derniers clients (collision palette) et trop « rustique Balagne », ce qu'on veut éviter.
4. Gris perle + champagne + bronze : élégant mais le gris dominant éteint la luminosité voulue et les photos chaudes jurent.

Direction 1 retenue : c'est la seule qui est à la fois **claire/lumineuse** (briefée), **froide donc anti-collision** avec les fonds crème chauds récents, et **neutre** pour faire respirer 6 photos hétérogènes.

| Rôle       | Hex      | Nom descriptif        | Utilisation                                                        |
|------------|----------|------------------------|--------------------------------------------------------------------|
| `--bg`     | #F6F5F2  | Ivoire glacé           | Fond principal, blanc cassé très légèrement froid, espace négatif  |
| `--ink`    | #1A1A1C  | Encre presque noire    | Texte principal, titres serif, valeur de contraste forte           |
| `--ink-2`  | #6E6A66  | Taupe grège            | Texte secondaire, légendes, labels letter-spacés, méta             |
| `--accent` | #B06A45  | Cuivre balayage        | UNIQUEMENT au trait : liens, filets, soulignages, étoiles, CTA bord |
| `--line`   | #E3E0DA  | Filet pierre claire    | Séparateurs ultra-fins, bordures de cartes, hairlines              |

> Le cuivre `#B06A45` est volontairement désaturé et n'apparaît **jamais en aplat de fond** (cause directe du rejet précédent) : seulement en hairline, soulignage de lien, contour de bouton, glyphe d'étoile. Il évoque le reflet d'un balayage sans saturer la page. Un blanc pur `#FFFFFF` est réservé aux surfaces de cartes posées sur l'ivoire pour créer une légère profondeur. Contrastes sur `--bg` #F6F5F2 : `--ink` #1A1A1C = 15.6:1 (AAA) ; `--ink-2` #6E6A66 = 4.6:1 (AA) ; `--accent` #B06A45 = 4.0:1 (AA pour texte ≥ 18px / gras, sinon réservé au trait et aux gros chiffres). Anti-collision vérifiée : les 3 derniers clients (Le Nautic `--bg #F4EFE3`, La Voûte `--bg #F4EDE0`, Le Bowling `--bg #FAF4E6`) ont tous un fond crème chaud + accent terracotta/corail en aplat ; ici fond ivoire froid `#F6F5F2`, accent cuivre désaturé au trait seul, encre quasi-noire au lieu d'encre marine. Zéro token partagé.

---

## Typographie

- **Display :** `Fraunces` (Google Fonts), poids **300** (titres hero/section, optical large, italique autorisé pour les accents éditoriaux) + **400**. Un serif à fort contraste, fin et chic, qui porte l'esprit magazine beauté sans tomber dans le folklore. (Note : la paire Cormorant + DM Sans suggérée par le researcher est trop « douce/organique » ; Fraunces light est plus tranchant, plus éditorial premium, et n'a pas le tell « Cormorant italic par défaut ».)
- **Body :** `Manrope` (Google Fonts), poids **400** + **500** + **600** (labels). Sans neutre géométrique très lisible sur mobile, lettrage propre, idéal pour méta-infos letter-spacées et corps de texte. Plus caractériel qu'Inter sans être bavard.
- **Size scale (mobile-first) :**
  - h1 hero : `clamp(2.6rem, 8vw, 6rem)`, Fraunces 300, tracking `-0.02em`, line-height 0.98
  - h2 section : `clamp(1.9rem, 4.5vw, 3.4rem)`, Fraunces 300, tracking `-0.015em`
  - h3 : `clamp(1.2rem, 2.5vw, 1.6rem)`, Manrope 600
  - body : `1.05rem` (lede `1.15rem`), Manrope 400, line-height 1.65, `--ink-2`
  - eyebrow/label : `0.75rem`, Manrope 600, `letter-spacing: 0.22em`, uppercase, `--ink-2` ou `--accent`
  - small/méta : `0.85rem`, Manrope 500
- **Tracking :** display négatif (`-0.02em`), eyebrows très ouverts (`0.22em`), body neutre.

---

## Layout archétype

**Choix : `editorial-gallery`** (image-first premium). Ce site est un portfolio de coloriste mis en pages comme un magazine beauté : grandes photos plein cadre qui alternent avec de larges respirations de blanc et de typo serif fine. Il diverge des autres clients du catalogue car aucun n'est construit comme une galerie éditoriale photo-first sur fond blanc froid, sans aplat de couleur, sans wordmark XXL ni grille bento.

### Rythme des sections (à lire de haut en bas)

1. **Nav minimale (sticky, transparente→solide)** : barre fine, fond transparent sur le hero puis fond `--bg` + hairline `--line` au scroll. Gauche : « SOLDANI » en Fraunces 400 + petit point cuivre. Centre/droite (desktop) : `Le salon` · `Prestations` · `Avis` · `Trouver`. CTA texte souligné cuivre « Prendre RDV » → ancre `#rdv`. Mobile : burger sobre. Hauteur 64px. Pas de logo gadget.

2. **Hero full-bleed photo (money shot)** : `balayage.jpg` plein cadre, hauteur `100svh` (min 620px). Scrim permanent dégradé (sombre en haut pour la nav blanche, sombre en bas pour le titre) conforme à la recette contraste. Contenu calé en bas-gauche : eyebrow blanc cassé `COIFFURE · OCCHIATANA, BALAGNE`, h1 blanc Fraunces 300 « La couleur, comme une lumière. », lede blanc 1 ligne « Balayage, mèches et soin du cheveu, par Kevin, au cœur de la Balagne. », un seul bouton (contour blanc, hover fond blanc/texte encre) « Prendre rendez-vous » → `#rdv`. En bas-droite, une chip discrète `★ 5,0 · 150 avis`. Aucun dégradé capillaire, aucun slider. L'image respire.

3. **Manifeste (respiration typo, plein blanc)** : section `--bg`, beaucoup d'air, une phrase éditoriale large centrée-gauche en Fraunces 300 « Chez Soldani, on ne change pas une tête, on la révèle. » + 2 lignes de lede `--ink-2`. Filet cuivre fin de 64px sous le titre. Aucune image : la respiration est volontaire, elle valorise les photos qui l'entourent. (Geste UI signature « light sweep » s'applique sur les images adjacentes, pas ici.)

4. **Le salon / Kevin (split éditorial asymétrique)** : grille desktop 5/7. Colonne image (5) : `miroir-salon.jpg` (portrait 2400×3600) en ratio 4:5, filet `--line` 1px, léger décalage vertical vers le bas (`margin-top` négatif sur le texte voisin pour casser l'alignement, esprit magazine). Colonne texte (7) : eyebrow `LE SALON`, h2 « Kevin, coloriste à Occhiatana », 2 paragraphes (passion couleur, accueil chaleureux, village perché de Balagne comme cadre, coloration sans ammoniaque = respect du cheveu). Une petite liste de 3 mots-clés en Manrope 600 séparés par des points cuivre : `Balayage · Sans ammoniaque · Sur-mesure`.

5. **Prestations (liste éditoriale, pas de cartes lourdes)** : fond `--bg`, en-tête `PRESTATIONS` + h2 « Ce que l'on fait ». Présentation en **lignes-tarif type carte de restaurant chic** : chaque prestation = une ligne (nom Fraunces 400 à gauche, ligne de points `--line` qui file, mention « sur devis / en cabine » à droite en `--ink-2`), groupées par familles (Couleur & balayage / Coupe femme-homme-enfant / Soin & lissage / Mariage & événement). Pas de prix inventés : on reste sur « devis en salon » + invitation à réserver. À droite de l'en-tête de section, une seule image carrée `ciseaux.jpg` (gros plan, ratio 1:1) en accent, filet `--line`. Sobre, dense, lisible.

6. **Galerie résultats (le cœur image-first)** : section pleine largeur, en-tête `LE TRAVAIL` + h2 « Quelques têtes ». Grille éditoriale **asymétrique** (pas une grille uniforme) : une grande image dominante `soin-cheveux.jpg` (portrait, occupe 2 lignes à gauche desktop), puis `homme-coupe.jpg` (paysage) et `ciseaux.jpg` (carré) empilées à droite. Chaque image porte le geste UI signature « light sweep » au hover/inView. Légendes fines en `--ink-2` (« Balayage cuivré », « Coupe homme », « Le geste »). Mobile : stack vertical full-width avec léger stagger.

7. **Avis (preuve sociale, sobre et forte)** : fond `--bg`. En-tête `ILS NOUS NOTENT`. Un **compteur d'étoiles animé** : grand `5,0` en Fraunces 300 (taille XXL), 5 glyphes étoile cuivre qui se remplissent en stagger à l'inView, sous-ligne « 14 avis Google · 136 avis clients · 100 % cinq étoiles ». Puis 3 verbatims (extraits research, positifs) en blocs blancs `#FFFFFF` posés sur l'ivoire, bordure `--line`, guillemet Fraunces cuivre en ouverture, signature `cliente, mai 2026`. Citations : « Mon balayage est sublime, merci ! », « Accueil au top, j'ai passé un très bon moment », « Enfin trouvé mon coiffeur, avec le brin de folie qu'on adore ». Aucune note basse, aucun comparatif.

8. **Prise de RDV native + infos pratiques (remplace le service tiers)** : ancre `#rdv`. Bandeau d'introduction fin pleine largeur `village-balagne.jpg` (ratio 21:9, scrim léger, une phrase blanche « Se faire coiffer dans un village de Balagne »). Puis split 50/50 desktop, stack mobile. Gauche : eyebrow `PRENDRE RENDEZ-VOUS`, h2 « On vous attend », un **formulaire natif** (nom, téléphone, prestation souhaitée en select, créneau souhaité, message) avec bouton plein cuivre-bordé « Envoyer ma demande » + une ligne « ou appelez Kevin : » avec `tel:0775834320` en gros chiffres cliquables. Bloc horaires clair en Manrope (lun fermé · mar-ven 9h-18h · sam 9h-14h · dim fermé), le jour courant subtilement surligné cuivre. Droite : Google Maps iframe sans cadre (filtre CSS léger `grayscale(0.15) contrast(0.98)` pour s'harmoniser à l'ivoire), au-dessus l'adresse « 20 U Ghjandaracciu, 20226 Occhiatana » + « à 9 km de L'Île-Rousse ». Aucune mention d'un service de réservation tiers.

9. **Footer (calme)** : fond `--bg`, hairline `--line` en haut. « SOLDANI » Fraunces 400 + point cuivre, adresse, téléphone `tel:`, horaires condensés, rappel `★ 5,0`. Liens réseaux sociaux uniquement s'ils existent (sinon omis). Crédit discret « Site par SpeedPost.fr » en `--ink-2` 11px. Em-dash interdit partout.

### Singularités du site (4)

- **Light sweep** : geste UI signature discret et de bon goût. Au survol (desktop) et à l'apparition (mobile/inView one-shot), un voile de lumière diagonal très doux balaie l'image une fois, de gauche à droite (`linear-gradient` blanc translucide 0→0.18→0, masque qui traverse en 700ms `cubic-bezier(0.2,0.7,0.2,1)`). Évoque le reflet qui glisse sur une chevelure balayée. Une seule fois, jamais en boucle, jamais scrubbé sur le scroll.
- **Compteur 5,0 animé** : à l'inView, le « 5,0 » et les 5 étoiles cuivre se remplissent en stagger 90ms. Preuve sociale élégante, pas de confettis (rejet du gimmick).
- **Lignes-tarif filantes** façon carte de restaurant gastronomique (nom · ligne de points · mention), inédit pour un salon, très lisible, zéro carte lourde.
- **Galerie asymétrique éditoriale** (une dominante + deux satellites) plutôt qu'une grille uniforme : signe le « portfolio de coloriste ».

### Ce que ce site n'a PAS (divergence explicite)

- **Pas de fond dégradé capillaire** ni aucun aplat de couleur chaude dominant (cause du rejet).
- **Pas de hero sans photo**, pas de wordmark XXL, pas de hero split classique 60/40.
- **Pas de gros slider/gadget** (« tirez la mèche » banni).
- **Pas de marquee défilant.**
- **Pas de cartes de prestations en grille bento** ni de prix inventés.
- **Aucun lien/bouton vers un service de réservation tiers** (RDV 100 % natif).
- **Pas de grande illustration/scène SVG** en hero ou premier plan (seuls petits glyphes : étoiles, point de marque, ligne de points).
- **Pas de Lenis, pas de smooth-scroll hijack, pas de parallaxe scrubbée.**

---

## Motion language

> **SCROLL 100 % NATIF (règle 2026-05-29).** Lenis interdit. Aucun effet collé à la position de scroll : pas de parallaxe scrubbée, pas de `scroll((p)=>...)`, pas de `strokeDashoffset` piloté par le scroll. Toutes les animations sont des entrées **one-shot via `Motion.inView`** déclenchées une seule fois à l'entrée dans le viewport. Le smooth des ancres `#section` se fait uniquement via CSS `html{scroll-behavior:smooth}`.

- **Entrées de blocs (inView one-shot)** : `opacity 0→1 + translateY 18px→0`, durée 0.5s, easing `[0.2,0.7,0.2,1]`, stagger 70ms sur les groupes (lignes-tarif, verbatims, étoiles). Filet de sécurité CSS : `[data-reveal]{opacity:0}` conditionné par `.js-ready`, plus `@keyframes autoreveal` qui force `opacity:1` après ~0.5s si Motion ne charge pas.
- **Hero image** : aucune parallaxe. Léger `scale(1.06)→1.0` statique sur 1.2s à l'ouverture (one-shot), puis figé. Le scrim ne s'efface jamais.
- **Light sweep (signature)** : voile diagonal blanc translucide qui traverse l'image une fois, 700ms `cubic-bezier(0.2,0.7,0.2,1)`. Déclenché à l'inView (mobile) et au hover (desktop). Jamais en boucle, jamais scroll-linked.
- **Compteur 5,0 + étoiles** : à l'inView, opacité + scale léger des étoiles en stagger 90ms (one-shot).
- **Cards/verbatims hover** : `translateY(-3px)` + ombre douce, transition 180ms.
- **Nav** : passage transparent→`--bg` + hairline au franchissement du hero, détecté via `inView` sur une sentinelle (pas de calcul scroll continu lourd).
- **Pas d'autoplay vidéo, pas de cursor follower, pas de popup.**

---

## Images sélectionnées

Toutes locales, déjà présentes dans `site/assets/images/`. Les 6 sont utilisées (gate QA ≥ 6 satisfaite). Ce sont des visuels Unsplash éditoriaux HD (pas de photo réelle du salon disponible) : assumés comme direction artistique « beauty editorial », cadrés pour respirer.

| Rôle                                   | Chemin local                          | Source (origine)                  | Alt text                                          |
|----------------------------------------|---------------------------------------|-----------------------------------|---------------------------------------------------|
| Hero full-bleed (money shot)           | ./assets/images/balayage.jpg          | Unsplash (femme balayage)         | Chevelure balayée aux reflets cuivrés, lumière douce |
| Le salon / Kevin (portrait 4:5)        | ./assets/images/miroir-salon.jpg      | Unsplash (miroir de salon)        | Ambiance lumineuse du salon Soldani               |
| Prestations (accent carré 1:1)         | ./assets/images/ciseaux.jpg           | Unsplash (gros plan ciseaux)      | Ciseaux ciselant une mèche, gros plan             |
| Galerie résultats (dominante portrait) | ./assets/images/soin-cheveux.jpg      | Unsplash (soin du cheveu)         | Soin du cheveu, brillance après coloration        |
| Galerie résultats (satellite paysage)  | ./assets/images/homme-coupe.jpg       | Unsplash (coupe homme)            | Coupe homme nette et soignée                      |
| Bandeau infos / contexte Balagne       | ./assets/images/village-balagne.jpg   | Unsplash (village corse doré)     | Village perché de Balagne, lumière dorée          |

Note placement : `ciseaux.jpg` sert à la fois d'accent en section Prestations et de satellite en galerie (réutilisable). Aucun placeholder. Aucun hotlink externe (hors iframe Maps).

---

## Données Maps

- Adresse : 20 U Ghjandaracciu, 20226 Occhiatana (Balagne, Haute-Corse)
- iframe : `https://maps.google.com/maps?q=20+U+Ghjandaracciu+20226+Occhiatana&z=15&output=embed` (sans clé API). Si lat/lng disponibles dans le CSV, préférer `q=LAT,LNG`.

## Copy directions (pour le builder)

- **Eyebrow hero :** `COIFFURE · OCCHIATANA, BALAGNE`
- **H1 :** « La couleur, comme une lumière. » (alt : « Révéler chaque tête. »)
- **Lede :** « Balayage, mèches et soin du cheveu, par Kevin, au cœur de la Balagne. À neuf kilomètres de L'Île-Rousse, un salon où l'on prend le temps. »
- **CTA primaire :** « Prendre rendez-vous » → `#rdv`
- **CTA secondaire :** « Voir le travail » → `#galerie`
- Ton FR : sobre, chaleureux, sûr de lui, jamais racoleur. Aucun em-dash (U+2014). Aucune mention d'un service de réservation tiers.

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, contrastes vérifiés (AAA/AA), anti-collision OK
- [x] 2 polices Google Fonts nommées avec poids (Fraunces 300/400 + Manrope 400/500/600)
- [x] 1 archétype choisi + justifié (`editorial-gallery`, image-first)
- [x] 9 sections ordonnées
- [x] 6 images réelles assignées à des rôles (0 placeholder)
- [x] Motion décrit, durée + easing précisés, scroll natif, 0 Lenis, 0 scroll-linked
- [x] Google Maps iframe source prêt
- [x] RDV natif (formulaire + tel:), zéro lien vers service tiers
- [x] Hero = vraie photo plein cadre (pas de dégradé, pas de slider)
