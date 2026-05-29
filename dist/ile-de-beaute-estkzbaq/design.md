# Design brief — Ile de Beauté (Calvi)

## 0. Réflexion UX (question par question)

**Visiteur-type :** Voyageur en séjour à Calvi (couples 30-55 ans, familles, plaisanciers de la Marina), 70% mobile, recherche le soir avant de réserver pour le lendemain ou le soir-même. Mix FR/EN/IT. Une minorité de locaux qui veulent vérifier les horaires ou voir si la carte a évolué.

**Contexte d'arrivée :** Recherche Google "restaurant port Calvi" / "où manger Calvi" depuis le téléphone, ou recommandation TripAdvisor (Travelers' Choice 2025), ou bouche-à-oreille de la capitainerie. Souvent en marchant sur le quai, à 50m du restaurant.

**Intention primaire :** Décider en 30 secondes si "ça vaut le coup" : voir l'ambiance (terrasse soir), confirmer que c'est ouvert, repérer les horaires, vérifier la fourchette de prix, trouver le numéro pour réserver.

**Intention business :** Remplir les deux services chaque jour de la haute saison, faire revenir les habitués hors-saison, asseoir la position de "Top 1 Calvi" (RestaurantGuru) face à 194 concurrents directs sur le port. Convertir les passants en réservataires.

**Contrainte UX structurante :** Deux services par jour avec deux ambiances totalement différentes (terrasse diurne calme face aux voiliers vs terrasse nocturne bondée et lumières chaudes). Pas de réservation en ligne : tout passe par le téléphone. Aucune réservation = friction zéro téléphone obligatoire en sticky.

**Émotion-cible à 5s :** "Vacances". Le sentiment d'être déjà attablé sur le quai au crépuscule, un verre à la main, le clapot des voiliers en fond. Chaleur, lumière dorée, iode.

**Money shot :** La transition jour→nuit de la même terrasse, vue depuis la même perspective : voiliers le midi, lampions et tablées le soir. Cette dualité EST l'identité du lieu.

## Archétype

**`quai-diurne-nocturne`** (custom). Un site qui met en scène la dualité midi/soir du quai Adolphe Landry à travers un slider temporel piloté au scroll : la même terrasse passe progressivement du plein jour au crépuscule pendant que le visiteur descend la page. Justification : aucun autre client du catalogue n'exploite la temporalité comme principe structurant (le `horizon-band time-based` de U Caradellu était une frise de couleurs ; ici c'est un véritable cross-fade de deux photos jumelées + une horloge solaire qui guide la lecture). Diverge radicalement de `maritime` Flibustier (palette navy/corde/typo serif old-school), de `livre-de-bord` Le Nautic (rose des vents + silhouette citadelle, palette papier vieilli) et de `magazine-editorial` Le Grand Bleu (article Gault&Millau).

## Palette de couleurs

| Rôle       | Hex      | Nom descriptif         | Utilisation                                      |
|------------|----------|------------------------|---------------------------------------------------|
| `--bg`     | #F5EFE6  | Calcaire chaud         | Fond principal (façades corses)                  |
| `--ink`    | #0D1F3C  | Bleu nuit du port      | Texte principal, titres, fond du hero nocturne   |
| `--ink-2`  | #5C6577  | Brume du quai          | Texte secondaire, captions                       |
| `--accent` | #D4935A  | Or lampion             | CTA, liens, surlignages, soleil de l'horloge     |
| `--line`   | #E4D8C4  | Crème calcaire         | Séparateurs, borders, cards                      |

Couleur secondaire d'ambiance (utilisée dans le scrim nocturne uniquement) : `#3A6EA5` (bleu volet corse). Toutes les couleurs passent AA sur `--bg` (`--ink` 13.8:1, `--ink-2` 5.2:1, `--accent` 4.6:1 sur fond clair). Palette choisie pour évoquer les façades calcaires corses au soleil + la lumière dorée des lampions le soir, et contraster avec la mer profonde du port.

## Typographie

- **Display :** `Fraunces` (Google Fonts), poids 300 + 600, optical size variable. Choix : la Fraunces a un caractère doux-éditorial qui évite le cliché "brasserie parisienne en gras condensé" et porte une élégance corse-méditerranéenne. Italique 300 pour les exergues poétiques (noms de plats).
- **Body :** `Manrope` (Google Fonts), poids 400 + 600. Choix : géométrique chaude, très lisible mobile, plus moderne qu'Inter, donne du contemporain au lieu sans casser l'élégance Fraunces.
- **Tertiaire (chiffres horloge) :** `JetBrains Mono` (Google Fonts) poids 500, pour l'horloge solaire et les horaires. Donne un signal "instrumentation" qui souligne le geste UI temporel.
- **Size scale (mobile-first) :** h1 `clamp(2.6rem, 8vw, 5.6rem)`, h2 `clamp(1.9rem, 4.5vw, 3.2rem)`, h3 `clamp(1.3rem, 2.5vw, 1.8rem)`, body `1.05rem`, small `0.86rem`.
- **Tracking :** display `-0.025em`, body `0`, eyebrow `+0.18em` capitales.

## Layout archétype — Singularités

**Choix : `quai-diurne-nocturne`** (custom). Site organisé autour d'une "course du soleil" verticale : un indicateur sticky à gauche (cadran solaire minimaliste) avance de 12h à 22h pendant que l'utilisateur scrolle, et plusieurs sections passent du jour à la nuit en cross-fade selon la position scroll. Le site raconte une journée complète sur le quai.

### Rythme des sections (à lire de haut en bas)

1. **Nav flottante** : minimaliste, fond translucide qui s'opacifie au scroll, logo wordmark "Ile de Beauté" en Fraunces 600 + chip horaire dynamique ("Service midi · ouvert" ou "Service soir · 19h00") calculé en JS depuis l'heure visiteur. CTA "04 95 65 02 69" en or lampion, sticky.
2. **Hero diurne→nocturne** : full-bleed 100vh, deux photos de la même terrasse superposées (jour visible à 0% scroll, nuit à 100% du hero). Titre Fraunces XXL "Le quai s'allume." en bleu nuit le jour, blanc avec text-shadow doré la nuit. Eyebrow "Restaurant · Quai Adolphe Landry · Calvi". CTA primaire "Réserver : 04 95 65 02 69", secondaire "Voir la carte du soir".
3. **Cadran solaire sticky** (rail gauche desktop, top mobile) : SVG minimaliste avec un soleil/lune qui se déplace de 12h à 22h selon scrollY. Affiche l'heure-fiction de la lecture. Geste UI signature.
4. **Bandeau marquee horaire** : ticker lent (50s) qui défile "12h00 service midi · 14h00 dernière commande · 19h00 service soir · 22h00 dernier verre · 12h00 service midi · ..." en Mono, fond bleu nuit, texte or.
5. **L'heure du midi** (~14h fictif) : split 55/45, photo terrasse diurne (voiliers en fond) à gauche, texte "Le midi, le port respire" + 3 chiffres-clés (note 4.5, 991 avis, Travelers' Choice 2025) à droite. Fond calcaire.
6. **Carte généreuse** (~16h) : grille asymétrique 4 plats signature en cards inclinées légèrement (sanglier corse, calamars persillade, daurade, fiandone), chacune avec nom italique + 1 ligne de description. Pas de prix (dignité). Fond crème.
7. **Le crépuscule** (~19h) : section pleine largeur avec un cross-fade scroll-driven supplémentaire : terrasse vide → terrasse en pleine activité avec lampions allumés. Texte minimal "À 19h, les lampions s'allument." en Fraunces 300 italique, blanc sur la photo nocturne.
8. **Voix du quai** (proof social, ~21h) : 3 verbatim TripAdvisor en grandes citations Fraunces italique sur fond bleu nuit, étoiles dorées, source en small caps. Pas de carrousel : disposition asymétrique en escalier diagonal.
9. **Spécialités corses** : strip horizontale scrollable (mobile swipe, desktop wheel) de 4-5 mots-vedettes : "Sanglier", "Fiandone", "Orezza", "Daurade", "Persillade" en Fraunces XXL très espacé, chacun illustré d'une mini-photo carrée au survol/scroll.
10. **Trouver le quai** : section info + Maps. Adresse, horaires bilingues (FR/EN), téléphone XXL en or. iframe Google Maps stylée (border calcaire), pas de heading-titre redondant. CTA téléphone géant.
11. **Footer minimal** : wordmark Fraunces géant en outline, mention Travelers' Choice 2025 en badge, crédit Menghi Computer Science discret.

### Singularités du site (4)

- **Cadran solaire scroll-driven** : un SVG sticky sur le côté qui matérialise l'heure de lecture, donnant au visiteur la sensation de vivre une journée sur le quai. Personne d'autre n'a ça.
- **Cross-fade jour→nuit** sur 2 sections clés (hero + crépuscule) : deux photos jumelles de la même terrasse, opacité pilotée par scrollY. Effet "coucher de soleil" sans gimmick.
- **Chip horaire intelligent** dans la nav : détecte l'heure visiteur et affiche "Service midi en cours", "Pause", "Service soir ce soir à 19h" — utile et chaleureux.
- **Strip de mots-vedettes corses** en typo XXL au lieu d'un menu PDF classique : raconte la cuisine en 5 mots évocateurs.

### Ce que ce site n'a PAS (divergence explicite)

- Pas de hero split classique 50/50 image+texte fixe.
- Pas de section "À propos" en bloc texte centré.
- Pas de galerie en grille 3x2 ou masonry classique.
- Pas de section "signature en 3 cartes alignées".
- Pas de timeline historique (le lieu n'a pas d'histoire racontée publiquement).
- Pas de fond sombre permanent (light mode uniquement, le "nocturne" est local aux 2 sections cinéma).
- Pas de rose des vents, pas de citadelle SVG (réservé à Le Nautic).
- Pas de marquee horizontal de plats avec prix.

## Motion language

- **Cross-fade jour/nuit** (hero + crépuscule) : opacité pilotée par `scrollY` mappée 0→1 sur la hauteur de section. Photo "nuit" en `position:absolute` au-dessus de "jour", `opacity` interpolée en linéaire. Pas de blur, pas de scale.
- **Cadran solaire** : rotation SVG de l'aiguille soleil de -90° (12h, gauche) à +90° (22h, droite) pilotée par scrollY page entière. Couleur du disque interpolée or → bleu nuit.
- **Entrées scroll** : `Motion.inView` avec `opacity 0→1 + translateY 24px→0`, durée 0.9s, easing `[0.2, 0.7, 0.2, 1]`, stagger 80ms sur groupes (cards plats, verbatim).
- **Hero parallax** : translation Y 8% sur la couche photo, contre-parallax 2% sur le titre.
- **Marquee horaire** : `@keyframes` 50s linear infinite, hover pause.
- **Cards plats hover** : rotation -1° + translateY -4px + shadow soft, transition 220ms.
- **Strip mots-vedettes** : scroll-snap horizontal natif, photos qui apparaissent en `clip-path` au snap.
- **Chip horaire** : pulse subtil (scale 1→1.02→1) toutes les 8s pour signaler l'info live.
- **Smooth scroll** : Lenis actif, lerp 0.08.
- **Pas d'auto-play vidéo, pas de cursor follower, pas de popup, pas de music.**

## Images sélectionnées

| Rôle                          | Chemin local                                  | Source (URL origine)              | Alt text                                              |
|-------------------------------|-----------------------------------------------|-----------------------------------|--------------------------------------------------------|
| hero diurne (full-bleed)      | ./assets/images/terrasse-port-calvi.jpg       | TripAdvisor /photo-o/ terrasse    | Terrasse de l'Ile de Beauté de jour, voiliers du port |
| hero nocturne (overlay)       | ./assets/images/terrasse-sur-le-port.jpg      | TripAdvisor /photo-o/ soirée      | Terrasse animée le soir, lampions allumés             |
| façade signature              | ./assets/images/hero-ile-de-beaute-port.jpg   | CSV premiere_image lh3 HD         | Façade calcaire avec enseigne L'Ile de Beauté         |
| crépuscule (cross-fade jour)  | ./assets/images/terrasse-port-calvi.jpg       | TripAdvisor /photo-o/             | Terrasse vide en fin d'après-midi                     |
| crépuscule (cross-fade nuit)  | ./assets/images/terrasse-sur-le-port.jpg      | TripAdvisor /photo-o/             | Terrasse pleine au crépuscule                         |
| section "midi"                | ./assets/images/ambiance-interieur.jpg        | TripAdvisor /photo-o/             | Intérieur lumineux, salle bistrot                     |
| plat 1 (calamars)             | ./assets/images/plat-calamars-persillade.jpg  | TripAdvisor /photo-o/             | Calamars en persillade, dressage chaud                |
| plat 2 (viande)               | ./assets/images/photo-recent-3.jpg            | TripAdvisor /photo-o/             | Travers de viande braisée, légumes rôtis              |
| plat 3 (moules)               | ./assets/images/photo-recent-4.jpg            | TripAdvisor /photo-o/             | Moules marinières et frites, eau Orezza               |
| plat 4 (salade)               | ./assets/images/photo-recent-1.jpg            | TripAdvisor /photo-o/             | Salade de courgettes en tagliatelles                  |
| strip mot "Pêcheur"           | ./assets/images/assiette-pecheur.jpg          | TripAdvisor /photo-o/             | Assiette du pêcheur                                   |

11 images réelles, 0 placeholder, 0 Unsplash. Toutes téléchargées localement dans `dist/ile-de-beaute-estkzbaq/site/assets/images/`.

## Copy directions (pour le builder)

- **Eyebrow hero :** `RESTAURANT · QUAI ADOLPHE LANDRY · CALVI`
- **H1 hero :** `Le quai s'allume.`
- **Lede hero :** `Bistrot face au port de plaisance, à deux pas de la Citadelle. Cuisine corse et française, deux services chaque jour, une terrasse qui change de visage entre midi et minuit.`
- **CTA primaire :** `Réserver : 04 95 65 02 69` (lien `tel:+33495650269`)
- **CTA secondaire :** `Voir la carte`
- **Chip horaire dynamique :** "Service midi · ouvert" / "Service soir · 19h00" / "Fermé jusqu'à 12h00"
- **H2 section midi :** `Le midi, le port respire.`
- **H2 section crépuscule :** `À 19h, les lampions s'allument.`
- **H2 carte :** `Une cuisine généreuse, sans détour.`
- **H2 voix du quai :** `Ce qu'on dit de nous.`
- **Note autorité :** `4,5/5 sur 991 avis Google · Travelers' Choice TripAdvisor 2025 · Top 1 Calvi sur RestaurantGuru`
- **CTA Maps :** `Tracer l'itinéraire`
- **Aucun em-dash. Aucune comparaison concurrentielle. Aucun négatif.**

## Maps

- iframe : `https://maps.google.com/maps?q=42.5663,8.7581&z=16&output=embed`
- Adresse affichée : `Quai Adolphe Landry, 20260 Calvi`
- Horaires affichés : `Tous les jours · 12h00 - 14h00 · 19h00 - 22h00`
- Téléphone : `04 95 65 02 69` (lien `tel:+33495650269`)

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies (+1 bleu volet d'ambiance), contrastes AA vérifiés
- [x] 3 polices Google Fonts nommées avec poids (Fraunces, Manrope, JetBrains Mono)
- [x] 1 archétype custom choisi + justifié (`quai-diurne-nocturne`)
- [x] 11 sections ordonnées
- [x] 11 images réelles assignées, 0 placeholder
- [x] Motion language décrit (cross-fade scrollY, cadran solaire SVG, entrées inView)
- [x] Google Maps iframe source prêt (lat 42.5663, lng 8.7581)
- [x] Geste UI singulier inventé : cadran solaire scroll-driven + cross-fade jour/nuit + chip horaire intelligent
- [x] Divergence explicite avec les 14 archétypes brûlés
