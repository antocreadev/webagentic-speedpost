# Brief — Étape 2 : Direction artistique & design brief

**Agent :** `menghi-designer`
**Livrable :** `dist/<slug>/design.md`
**Pré-requis :** lire `workflows/rules.md`, lire `dist/<slug>/research.md`

## Objectif

Produire un **vrai travail de webdesign réfléchi**, singulier au client, niveau top 1% agence premium. Pas un gabarit qu'on colorie. Chaque site doit avoir :

- une **UX** conçue depuis les usages réels du visiteur (pourquoi vient-il, que cherche-t-il, que doit-il repartir avec)
- une **UI** qui porte le sens du business (microinteractions, rythme, hiérarchie d'information, traitement graphique)
- une **identité graphique** qui traduit la personnalité du lieu (pas juste 5 hex d'une palette générique)
- une **disposition** (IA/IA = information architecture) qui diverge clairement des autres sites du catalogue

> Le design brief doit être le fruit d'une **vraie réflexion** : quels sont les moments forts du parcours ? Quelle est la hiérarchie émotionnelle ? Quel geste d'UI va surprendre positivement ? Quelle contrainte métier structure l'interface (ex : fréquentation saisonnière, menu à 40 parfums, cuisine à emporter, réservation sans laisser de téléphone) ?

## Inputs

- `dist/<slug>/research.md` (sortie du researcher)
- Ligne CSV du client (pour `lat/lng`, `google_maps_url`, horaires)

## Réflexion UX obligatoire (AVANT de choisir un layout)

Avant toute décision visuelle, répondre explicitement dans `design.md` aux questions suivantes :

1. **Qui est le visiteur-type** de ce site ? (profil, contexte, moment de la journée, device probable)
2. **Pourquoi atterrit-il ici** ? (recherche Google, recommandation IA, QR code, bouche-à-oreille)
3. **Quelle est son intention primaire** ? (réserver, vérifier horaires, découvrir la carte, voir si ça vaut le détour, connaître le chemin)
4. **Quelle est l'intention business du commerce** ? (remplir la terrasse midi, attirer des groupes, convertir touristes estivaux en habitués, monter en gamme, etc.)
5. **Quelle est la contrainte UX structurante** ? (saisonnalité, pas de réservation en ligne, menu très dense, pas de photos libres, horaires atypiques)
6. **Quelle est l'émotion-cible** à déclencher en 5 secondes ? (confiance, envie, apaisement, transgression, nostalgie, sophistication, chaleur)
7. **Quel est le "money shot"** : l'image/élément/accroche qui doit saisir le visiteur dès l'ouverture ?

Ces réponses conditionnent **tout le reste** : archétype de layout, hiérarchie de sections, traitement du hero, typographie, palette, motion. Ne pas sauter cette étape.

## Structure du livrable `design.md`

```markdown
# Design brief — <Nom>

## 0. Réflexion UX (question par question)

**Visiteur-type :** <...>
**Contexte d'arrivée :** <...>
**Intention primaire :** <...>
**Intention business :** <...>
**Contrainte UX structurante :** <...>
**Émotion-cible à 5s :** <...>
**Money shot :** <...>

## Archétype
**<editorial | maritime | rustic | minimal-luxe | custom>**
Justification (1-2 phrases) : pourquoi ce choix face à l'identité du client.

## Palette de couleurs

| Rôle       | Hex      | Nom descriptif    | Utilisation                         |
|------------|----------|-------------------|--------------------------------------|
| `--bg`     | #FBF7EF  | Sable clair       | Fond principal                       |
| `--ink`    | #13161A  | Encre             | Texte principal                      |
| `--ink-2`  | #545960  | Gris basalte      | Texte secondaire                     |
| `--accent` | #C8522B  | Terracotta        | CTA primaire, liens, surlignages     |
| `--line`   | #E8DFCF  | Ligne papier      | Séparateurs, borders, cards          |

> Palette choisie pour évoquer <X> et contraster avec <Y>. Toutes les couleurs passent le contraste AA sur `--bg`.

## Typographie

- **Display :** `Fraunces` (Google Fonts) — poids 300 + 600 — optical size variable, pour titres éditoriaux avec caractère.
- **Body :** `Inter` (Google Fonts) — 400 + 500 — très lisible sur mobile.
- **Size scale (mobile-first) :** h1 `clamp(2.4rem, 7vw, 4.8rem)` / h2 `clamp(1.8rem, 4vw, 2.8rem)` / body `1.05rem` / small `0.88rem`.
- **Tracking :** display `-0.02em`, body `0`.

## Layout archétype — DIVERGENCE OBLIGATOIRE

**Chaque client doit avoir un layout RADICALEMENT différent des autres clients.** Deux sites du catalogue ne doivent JAMAIS se ressembler structurellement. Palette + typo différentes ne suffisent pas : la disposition, le nombre de sections, leur ordre, leurs tailles relatives, le traitement du hero, la navigation, le rythme éditorial doivent être uniques par client.

Choisir **un** des archétypes de layout ci-dessous (ou en inventer un) et **l'assumer à fond**. Ne pas hybrider mollement.

| Archétype layout          | Essence                                                                                 |
|---------------------------|------------------------------------------------------------------------------------------|
| `magazine-editorial`      | Grande typo display pleine largeur, colonnes typographiques, drop-caps, style article   |
| `carnet-scrapbook`        | Journal manuscrit, photos bord déchiré, tampons, annotations, sections désalignées       |
| `bento-grid`              | Grille modulaire asymétrique de cartes de tailles variées, pas de "sections" linéaires   |
| `long-scroll-horizontal`  | Panneaux horizontaux qui défilent latéralement, style swipe mobile                       |
| `split-sticky`            | Deux panneaux sticky (texte gauche / image droite qui change), art-house                 |
| `timeline-verticale`      | Chronologie centrée, dates/événements, line art, évoque une histoire                     |
| `fullbleed-photo-first`   | Images plein-écran pleine hauteur, texte superposé, zéro marge, cinéma                   |
| `showcase-catalogue`      | Grille produits dense façon catalogue (lookbook, menu visuel, drop), héritée de la mode  |
| `scrolljack-sequence`     | Sections scroll-driven avec animations séquentielles, pages qui se révèlent              |
| `asymmetric-collage`      | Composition type collage moderne, éléments désalignés intentionnellement, brutalist-chic |
| `wordmark-xxl`            | Le nom du lieu en typo gigantesque occupe 90% du dessus de page, minimaliste radical     |
| `circular-petal`          | Composition radiale autour d'un point central (carte, logo), sections en pétales         |

**Variations structurelles exigées par client :**

- **Hero** : split 60/40 OK mais aussi full-bleed image + texte overlay, typo XXL sans image, carousel de 3 mots, split 40/60 inversé, top-strip texte puis image full, etc.
- **Nombre de sections** : 5 à 12, selon le contenu. Ne pas forcer 9 si ça n'a pas de sens.
- **Ordre** : hero en premier OK mais aussi histoire en premier, signature en premier, quote en premier.
- **Navigation** : sticky top classique OK, mais aussi side-nav verticale, dock flottant, disparition/apparition au scroll, pas de nav du tout si wordmark-xxl.
- **Marquee** : optionnel, pas obligatoire. Si présent, direction/vitesse/contenu à varier.
- **Galerie** : grille classique OK, mais aussi masonry, tiltée, stack vertical, diagonale, strip horizontale.
- **Proof social** : big quote fullscreen, tickertape note, badge flottant, ou absent si peu pertinent.
- **Infos/Maps** : iframe rond OK, mais aussi carte en overlay, map en header, full-bleed image du lieu avec texte overlay, Maps intégré dans la nav.

**Structure du livrable pour la section layout :**

```markdown
## Layout archétype

**Choix : `<archétype-name>`** (justification en 2 phrases, pourquoi ce choix colle à l'identité du client et diverge des autres du catalogue).

### Rythme des sections (à lire de haut en bas)

1. `<nom-section>` : <intention + taille relative + traitement visuel clé>
2. `<nom-section>` : <...>
3. ...

### Singularités du site (3 à 5)

- <Élément signature qui rend CE site unique, que personne d'autre n'aura>
- <Un autre>
- ...

### Ce que ce site n'a PAS (divergence explicite)

- <Ex : pas de marquee, pas de hero split classique, pas de section signature en 3 cartes, etc.>
```

## Motion language

- **Entrées (apparition one-shot)** : `Motion.inView` avec `opacity 0→1 + translateY 20px→0`, durée 0.4-0.6s, easing `[0.2, 0.7, 0.2, 1]`, stagger 60ms sur groupes. Déclenchées UNE fois à l'entrée viewport, jamais scrubbées sur la position de scroll.
- **Hero image** : PAS de parallaxe scroll-linked (interdit). Un léger `scale` statique ou une animation d'entrée one-shot suffit.
- **Marquee** : animation CSS `@keyframes marquee` 30s linear infinite.
- **Cards hover** : `translateY(-3px)` + shadow soft, transition 180ms.
- **SCROLL NATIF obligatoire** : Lenis (et tout smooth-scroll hijack) INTERDIT. Smooth des ancres `#section` uniquement via CSS `html{scroll-behavior:smooth}`. Pas d'effet collé à la position de scroll (`scroll((p)=>...)`). Incident 2026-05-29 Horizon Coiffure.
- **Pas d'auto-play** de vidéo, pas de cursor follower, pas de popup.

## Images sélectionnées

Utiliser **uniquement les chemins locaux** téléchargés à l'étape 1 (dans `site/assets/images/`). Ne jamais référencer une URL externe ici, sauf placeholder `placehold.co`.

| Rôle                    | Chemin local                         | Source (URL origine)                   | Alt text                    |
|-------------------------|--------------------------------------|----------------------------------------|------------------------------|
| hero (4:5)              | ./assets/images/hero-port.jpg        | https://lh3.googleusercontent.com/...  | <nom> — vue du port          |
| histoire (3:4)          | ./assets/images/histoire-salle.jpg   | https://...                            | Ambiance intérieure          |
| signature 1 (1:1)       | ./assets/images/signature-lilou.jpg  | https://...                            | Plat signature <X>           |
| signature 2 (1:1)       | ./assets/images/signature-burger.jpg | https://...                            | <Y>                          |
| signature 3 (1:1)       | ./assets/images/signature-glace.jpg  | https://...                            | <Z>                          |
| galerie (6 images)      | ./assets/images/galerie-*.jpg        | ...                                    | ...                          |

Tout placeholder doit être signalé ici avec `placeholder:true` et justifié (aucune image pertinente trouvée pour ce rôle). Si un fichier manque dans `site/assets/images/`, rappeler au researcher de le télécharger avant que le builder démarre.

## Copy directions (pour le builder)

- **Eyebrow** : `<Catégorie> · <Ville>` en capitales letter-spaced
- **H1** : 3-6 mots, éditorial, évoquant l'expérience plus que le produit
- **Lede** : 2 phrases, 35-55 mots, positives, ancrées localement
- **CTA primaires** : `Réserver une table` (ou `Nous trouver` si pas de réservation)
- **CTA secondaire** : `Découvrir la maison`

## Checklist avant handoff au builder

- [ ] 5 couleurs hex définies, contrastes vérifiés
- [ ] 2 polices Google Fonts nommées avec poids
- [ ] 1 archétype choisi + justifié
- [ ] 9 sections ordonnées
- [ ] ≥ 6 images réelles assignées à des rôles (ou placeholders signalés)
- [ ] Language motion décrit, durée + easing précisés
- [ ] Google Maps iframe source (lat/lng) prêt
```

## Règles strictes

- **Chaque décision doit être justifiée** en une phrase, ancrée dans la réflexion UX de la section 0. Pas de "choix par défaut" sans contexte.
- **Palette cohérente avec l'identité** du client, pas générique. Un restaurant de port n'a pas la même palette qu'une pizzeria de village ou un glacier.
- **Typographies choisies pour leur sens**, pas par défaut. Expliquer pourquoi ces polices servent ce client précis.
- **Archétype unique** (pas d'hybridation floue). Si hybride justifié, le dire explicitement. **Diverger explicitement** des autres clients déjà livrés dans `dist/`.
- **Images réelles > Unsplash > placeholder**, toujours dans cet ordre.
- **Inventer au moins UN geste d'UI singulier** qui reflète la spécificité du client (ex : timeline-année pour une maison historique ; pipette de flavors pour un glacier ; compass pour un restaurant en bord de mer ; cornerstone-animé pour une pierre voûtée). Ce geste doit apparaître dans le brief.
- **Hiérarchie d'information par intention** : la première chose qu'un visiteur voit en arrivant doit matcher son intention primaire (section 0 question 3), pas un hero générique.

## Sortie

Écrire `dist/<slug>/design.md` et retourner à l'orchestrateur :
- archétype retenu
- palette (5 hex)
- typographies retenues
- nombre d'images réelles vs placeholders
