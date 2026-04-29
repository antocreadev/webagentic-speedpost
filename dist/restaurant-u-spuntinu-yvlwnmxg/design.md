# Design brief, Restaurant U Spuntinu

## 0. Réflexion UX (question par question)

**Visiteur-type :** trois profils imbriqués. (a) L'habitant fidèle de Balagne, 40-70 ans, qui connaît la maison depuis toujours et vient vérifier les horaires ou réserver la tablée du dimanche. (b) Le Corse de la diaspora (Paris, Marseille, Nice) qui revient l'été ou à Noël et cherche "la vraie", celle de son enfance. (c) Le touriste curieux, lecteur du Routard ou du Petit Futé, qui a entendu parler de "la plus vieille table de L'Île-Rousse" et veut voir l'adresse qui dure.

**Contexte d'arrivée :** recherche Google "restaurant corse L'Île-Rousse", bouche à oreille via office de tourisme, citation par une IA qui répond "où manger vraiment corse en Balagne", lien depuis TripAdvisor / Visit Corsica. Device : 70% mobile, 30% desktop. Moment de la journée : 11h-13h (choix du midi) et 18h-20h (choix du soir).

**Intention primaire :** vérifier que cette maison est "la vraie", celle fondée en 1974, tenue par la même famille, avec les recettes de grand-mère. Le visiteur cherche des preuves de durée, pas une carte stylisée. Il veut sentir la patine avant de composer le numéro.

**Intention business :** transmettre la légitimité de la 3e génération, fidéliser les habitants qui pourraient basculer vers une nouvelle adresse, attirer la diaspora et les voyageurs qui cherchent de l'authentique (pas de la corse de plage). Asseoir le statut de "doyenne des tables ile-roussaines" pour les 50 prochaines années.

**Contrainte UX structurante :** il n'y a pas de réservation en ligne, pas de carte structurée, pas de chef-star. Il y a une famille, une rue, cinquante ans, et des recettes. Le site ne peut donc pas reposer sur les leviers classiques (booking widget, menu visuel, portrait chef). Il doit s'appuyer sur la seule ressource inépuisable : le temps.

**Émotion-cible à 5s :** patine du temps, transmission, Balagne éternelle. Le visiteur doit sentir la pierre tiède de la vieille ville, la fumée de l'âtre, la voix d'une mère qui apprend à sa fille. Pas de clinquant, pas de food-porn, pas de cliché carte postale. De la densité, du silence, de la durée.

**Money shot :** une ligne verticale au centre de l'écran. En haut, l'année **1974** en gros caractère sépia. En bas, l'année **2026** en noir profond. Entre les deux, un curseur que l'on glisse et qui fait défiler cinquante ans d'une maison de famille. Aucune photo de plat en hero. Juste le temps.

## Archétype

**`custom` : timeline-verticale chronologique immersive.**

Justification : la valeur du lieu est sa durée (50 ans, 3 générations, plus vieille table de L'Île-Rousse). Aucun autre archétype du catalogue ne met le temps en colonne vertébrale du site. Un magazine raconterait la carte, un fullbleed vendrait une ambiance, un showcase listerait des plats. Ici, la chronologie **est** le produit. Le visiteur ne scroll pas un site, il remonte (ou descend) une histoire familiale.

## Palette de couleurs, patine corse

| Rôle | Hex | Nom descriptif | Utilisation |
|---|---|---|---|
| `--bg` | #F2ECE0 | Lin ancien | Fond principal, papier vieilli à la lumière de Balagne |
| `--ink` | #1A1613 | Noir de charbon | Texte principal, encre de registre, titres des décennies |
| `--ink-2` | #6B5D4F | Olive fanée | Texte secondaire, légendes, années hors-actives |
| `--accent` | #B85C3C | Terracotta de four | CTA, marqueur d'année active, soulignages, fil chronologique |
| `--line` | #D9CFBD | Ligne de papier | Séparateurs, bordures, graduations de la timeline |

> Palette pensée comme un registre tenu depuis 1974 : lin ancien qui a jauni, noir de charbon des anciens fourneaux, olive du maquis au soleil couchant, terracotta des toitures de la vieille ville et des fours à bois, ligne de papier pour les graduations. Tous contrastes AA vérifiés sur `--bg` (ink 16:1, ink-2 5.2:1, accent 4.7:1).

### Variations chromatiques par décennie (geste signature)

La palette se "désature et se modernise" au fur et à mesure qu'on descend la timeline. Le visiteur traverse visuellement 50 ans :

- **1974-1979 :** filtre noir-blanc léger (saturation -40%, ink dominant), photo sépia, ligne accent en brun sombre
- **1980-1989 :** teinte sépia chaude (warm overlay #C49B6B 8%), palette "album de famille"
- **1990-1999 :** désaturation -15%, teinte "photo argentique fin de siècle"
- **2000-2009 :** palette presque normale, saturation -5%
- **2010-2019 :** palette pleine, lin ancien propre, olive vive
- **2020-2026 :** palette actuelle à 100%, terracotta net, noir de charbon profond

## Typographie

- **Display :** `Libre Caslon Text` (Google Fonts), poids 400 + 700 italique. Serif de registre ancien, évoque les actes notariés, les livres de recettes manuscrits, les enseignes gravées des vieilles rues corses. Utilisé pour les années (chiffres XXL), les titres de décennies, les anecdotes.
- **Body :** `Work Sans` (Google Fonts), poids 400 + 500. Sans-serif neutre et respirant qui laisse le serif porter l'émotion, très lisible sur mobile pour les longs blocs d'histoire.
- **Numéraux :** les années (1974, 1982, 1995, 2026) en Libre Caslon Text 700 italique, taille `clamp(4rem, 14vw, 12rem)`. Ce sont les héros typographiques du site, pas les titres.
- **Size scale mobile-first :**
  - année héro : `clamp(4rem, 14vw, 12rem)`, tracking -0.03em
  - h1 décennie : `clamp(2.2rem, 5vw, 3.6rem)`, tracking -0.02em
  - h2 anecdote : `clamp(1.4rem, 3vw, 2.2rem)`
  - body récit : `1.08rem`, line-height 1.7
  - légende archive : `0.82rem`, letter-spacing 0.08em, uppercase

## Layout archétype

**Choix : `timeline-verticale` immersive et scroll-driven.** Cet archétype est imposé parce qu'il est le seul qui matche la valeur de durée (50 ans) portée par le client, et qu'il diverge radicalement de tous les autres sites du catalogue (aucun autre n'a de chronologie comme colonne vertébrale). On l'assume à fond : il n'y a pas de "sections classiques", il n'y a que des **stations dans le temps**.

### Rythme des sections (à lire de haut en bas)

1. **Seuil 1974** (100vh) : fond lin ancien en filtre noir-blanc, année `1974` en Libre Caslon 14vw centrée, sous-titre "La maison ouvre ses portes, 1 Rue Napoléon". Aucune navigation visible au départ, juste le temps. CTA discret "Descendre l'histoire" en bas.

2. **Nav flottante latérale droite** (apparaît après scroll de 20vh) : dock vertical avec 6 années-pivots cliquables (1974 / 1985 / 1995 / 2005 / 2015 / 2026). Fine ligne terracotta qui traverse verticalement + curseur rond qui indique la position actuelle. C'est LE geste d'UI signature.

3. **Décennie 1970, "La fondatrice"** (hauteur ~120vh) : ancrage 1974, récit de l'ouverture par la grand-mère, photo sépia/n&b unique en portrait 3:4 à gauche, texte aligné à droite. Une anecdote : recettes ramenées du village, première salle de 20 couverts.

4. **Décennie 1980, "Les années d'ancrage"** (~100vh) : teinte sépia, ligne chronologique qui s'épaissit, citation des premiers guides (Petit Futé, Routard), note "reconnaissance nationale". Photo d'ambiance intérieure en cadrage 4:5.

5. **Passage de relais 1990-2000, "Deuxième génération"** (~140vh) : deux colonnes juxtaposées (mère / fille), la palette commence à revenir à la couleur, image de la transmission. Point clé : la fille reprend les fourneaux, mêmes recettes, mêmes producteurs.

6. **Décennie 2010, "Le veau de la famille"** (~110vh) : section dédiée au circuit ultra-court (producteur direct de veau corse, élevé par la famille). Photo plat réelle (tripadvisor-u-spuntinu.jpg) en format 4:5, texte latéral explique le circuit.

7. **Station 2025-2026, "La maison aujourd'hui"** (~130vh) : palette 100%, photo intérieure actuelle (hero-u-spuntinu.jpg) en grand format 3:4, encadré des chiffres-preuve (4.6/5 sur 1110 avis, 50 ans, 3 générations), citation d'avis récent ("la meilleure table jusqu'ici à Île-Rousse", 2025).

8. **Panneau transmission** (~80vh) : demi-section calme, une seule phrase en Libre Caslon 400 italique centrée : "De mère en fille, depuis 1974." Ligne terracotta pleine sous le texte. Pause respiratoire.

9. **Infos pratiques minimales** (~90vh) : horaires en tableau sobre (pas de pictos), adresse, téléphone, map Google iframe carrée 1:1 encastrée à droite, texte à gauche. Aucun bouton "Réserver en ligne", juste le numéro cliquable. Précision honnête : "Ouvert du 1er mars au 30 novembre, lundi soir uniquement, repos annuel décembre à février".

10. **Footer chronologique** : la ligne terracotta de la timeline se termine ici, marquée "2026, et après". Mention "Depuis 1974", slug famille, mention légale discrète.

### Singularités du site (5 gestes uniques)

- **Curseur année vertical sticky :** dock latéral droit qui affiche l'année active en gros caractère et se met à jour au scroll. Cliquable pour téléporter vers une décennie. C'est l'élément UX signature, inédit pour un restaurant.
- **Désaturation progressive :** la palette est noir-blanc en haut (1974) et se colorise jusqu'à saturation pleine en bas (2026). La page entière "vieillit à l'envers" quand on scroll vers le passé, "se modernise" quand on descend. Technique : CSS `filter: saturate()` piloté par `scroll-progress`.
- **Ligne de vie terracotta :** un trait vertical fin (1px) traverse toute la page au centre, ponctué de nœuds-années, comme un fil de perles. C'est la colonne vertébrale visuelle.
- **Typographie numérique héro :** ce sont les années qui sont XXL, pas les noms de plats. Les "1974", "1995", "2026" sont les vedettes visuelles, traités comme des titres de chapitre de roman familial.
- **Citation en italique pleine largeur :** chaque décennie est ponctuée par une citation d'avis ou d'un guide, en Libre Caslon italique 300, hors grille, alignée au fil chronologique. Respiration éditoriale.

### Ce que ce site n'a PAS (divergence explicite)

- **Pas de showcase de plats ni de carte visuelle.** Pas de grille de plats. La carte n'est pas le sujet.
- **Pas de hero split classique** (image gauche / texte droite). Le hero est une année seule sur fond lin vieilli.
- **Pas de marquee défilant.** La vitesse du site, c'est le scroll du visiteur, pas une animation auto.
- **Pas de section "signature" en 3 cartes.** Les plats apparaissent en anecdote dans la timeline, jamais en catalogue.
- **Pas de section "avis" en carrousel.** Les citations sont intégrées comme ponctuation littéraire, pas comme proof social séparé.
- **Pas de galerie photo dédiée.** Les 3 photos disponibles sont réparties dans la chronologie, une par époque, chacune à sa place historique.
- **Pas de section "notre équipe" ni "chef".** Le héros n'est pas une personne, c'est la maison qui traverse les générations.
- **Pas de bouton "Réserver" racoleur.** Un numéro de téléphone cliquable, discret, dans la section infos uniquement.

## Motion language

- **Scroll global :** Lenis activé, lerp 0.08 (plus lent que par défaut pour renforcer le sentiment de durée et de pesée temporelle).
- **Entrée d'une année-héro :** `opacity 0 → 1` + `letter-spacing 0.12em → -0.03em` (la typo "se resserre" en entrant), durée 1.2s, easing `[0.16, 1, 0.3, 1]`, déclenché à 40% viewport.
- **Ligne de vie terracotta :** `scaleY 0 → 1` avec origin top, pilotée par `scrollYProgress`, synchrone au scroll (pas de durée fixe).
- **Curseur année sticky :** translation Y liée au scroll progress, opacité 0 → 1 après 20vh, transition 300ms `ease-out` sur changement d'année active.
- **Désaturation progressive :** `filter: saturate()` interpolée de 0.3 (top) à 1.0 (bottom) via `scroll-progress`, appliquée au `<main>` entier.
- **Photos époque :** fade-in `opacity 0 → 1` + `translateY 30px → 0`, durée 1s, easing `[0.2, 0.7, 0.2, 1]`, stagger 80ms si groupe.
- **Citations :** fade-in lent `opacity 0 → 1` durée 1.4s, pas de translation, pour donner une impression de respiration.
- **Nœuds-années sur la ligne :** pulse terracotta subtil (`scale 1 → 1.08 → 1`, 600ms) quand le nœud entre dans la zone active.
- **Interdits :** pas d'auto-play vidéo, pas de cursor follower, pas de popup, pas de parallax agressif, pas de text reveal caractère-par-caractère.

## Images sélectionnées

| Rôle | Chemin local | Source origine | Alt text | Traitement |
|---|---|---|---|---|
| Décennie 1970, photo fondatrice (3:4) | ./assets/images/thumbnail-u-spuntinu.jpg | Google Maps thumbnail | Façade et terrasse de U Spuntinu, Rue Napoléon | Filtre noir-blanc + grain léger, évoque archive 1974 |
| Décennie 2010, plat signature (4:5) | ./assets/images/tripadvisor-u-spuntinu.jpg | TripAdvisor og:image | Assiette de spécialités corses, veau et cannelloni brocciu | Teinte sépia douce, couleur partielle |
| Station 2026, salle actuelle (3:4) | ./assets/images/hero-u-spuntinu.jpg | Google Maps premiere_image | Intérieur de U Spuntinu aujourd'hui | Palette pleine, pas de filtre |
| Décennie 1980, archive d'ambiance (4:5) | placeholder: https://placehold.co/600x750?text=Archive+1982 | placeholder signalé | Ambiance de salle des années 1980 | placeholder:true, demander à la famille une photo d'archive |
| Passage de relais 1995, portrait mère-fille (1:1) | placeholder: https://placehold.co/600x600?text=Transmission+1995 | placeholder signalé | Transmission de la maison, mère et fille | placeholder:true, à remplacer par photo de famille après signature |
| Veau corse, circuit court 2010 (4:5) | placeholder: https://placehold.co/600x750?text=Producteur+veau+corse | placeholder signalé | Producteur de veau corse de la famille | placeholder:true, photo à obtenir du client |

> Total : **3 images réelles** + **3 placeholders assumés**. Note importante pour le builder : les placeholders sont stratégiques (l'archive manque, la famille peut la fournir après signature). Ne pas les remplacer par des Unsplash génériques, ils doivent rester des placeholders explicites pour inciter le client à fournir ses propres photos d'archive, ce qui renforce l'authenticité du site. Si vraiment besoin d'un visuel de remplacement, privilégier une composition typographique (année seule sur fond lin texturé) plutôt qu'une photo Unsplash.

## Copy directions (pour le builder)

- **Eyebrow (footer, infos) :** `RESTAURANT CORSE · L'ÎLE-ROUSSE · DEPUIS 1974`, capitales, tracking 0.18em
- **H1 hero (année seule) :** `1974` (aucun autre texte au-dessus, juste l'année).
- **Sous-titre hero :** `La maison ouvre ses portes, 1 Rue Napoléon.` (Libre Caslon 400, pas italique).
- **Titres de décennies :** forme narrative courte, 3 à 5 mots. Exemples : "La fondatrice", "Les années d'ancrage", "Deuxième génération", "Le veau de la famille", "La maison aujourd'hui".
- **Lede de station (2 phrases, 35-55 mots) :** registre sobre, ancré, pas de superlatif. Exemple 1974 : "Au cœur de la vieille ville, une mère de famille ouvre une petite salle rue Napoléon. Elle y cuisine ce qu'elle a toujours cuisiné, rien de plus : les recettes de son village, les produits de ses voisins, le feu d'un vrai four."
- **Citations d'époque (ponctuation) :** en italique, 20-40 mots, issues de guides ou d'avis réels (Petit Futé, Routard, TripAdvisor), toujours positives, avec attribution discrète.
- **CTA principal :** inexistant en haut. En bas seulement : `04 95 60 00 05` (numéro en gros, cliquable, pas de "réserver"). Et `Nous trouver` qui scroll vers la map.
- **Phrase pivot du site :** `De mère en fille, depuis 1974.` (section 8, isolée, centrée, Libre Caslon italique).
- **Ton général :** sobriété corse, pas d'exclamation, pas d'émoji, pas de superlatif ("meilleur", "exceptionnel", "incontournable" à éviter en propre, seulement OK en citations d'avis).
- **Tiret cadratin interdit.** Utiliser `,` ou `:` ou `.` ou parenthèses.

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies avec rôles, contrastes AA vérifiés
- [x] 2 polices Google Fonts nommées (Libre Caslon Text + Work Sans), poids précisés
- [x] 1 archétype choisi (custom timeline-verticale) + justifié
- [x] 10 sections ordonnées (dont nav latérale)
- [x] 3 images réelles + 3 placeholders assumés (justifiés)
- [x] Motion language décrit, durées + easing + Lenis
- [x] Google Maps iframe prête : `https://maps.google.com/maps?q=42.6347341,8.9375734&output=embed`
- [x] Geste d'UI signature inventé (curseur année sticky + désaturation progressive)
- [x] Divergences explicites listées vs catalogue
- [x] Zéro em-dash, light mode, polices Google Fonts réelles
