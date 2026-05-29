# Revue qualité — Ile de Beauté (Calvi)

## Verdict : PASS

## Détails

### research.md : PASS
- Synthèse business complète (activité brasserie côtière, cible touristes/locaux, proposition de valeur triple : emplacement port/citadelle, cuisine corse-française, terrasse jour/nuit).
- 6 sources web citées (TripAdvisor, RestaurantGuru, Google Maps, CSV).
- Table d'assets visuels avec 10 entrées, toutes pertinentes et annotées.
- Aucun signal négatif. Notes uniquement 4.4★ et 4.5★ et 5★.
- Archétype suggéré en fin de rapport : `port-brasserie-lumineuse`.

### design.md : PASS
- Archétype custom `quai-diurne-nocturne` justifié et divergent explicitement des 14 archétypes brûlés.
- Réflexion UX 7 questions complète (visiteur-type, contexte d'arrivée, intention primaire, intention business, contrainte UX structurante, émotion-cible, money shot).
- Palette 5 couleurs hex avec rôles + 1 couleur d'ambiance secondaire, contrastes AA vérifiés.
- 3 polices Google Fonts nommées avec poids (Fraunces, Manrope, JetBrains Mono).
- 11 sections ordonnées (nav, hero, marquee, midi, carte, crépuscule, voix du quai, spécialités, infos, footer).
- Motion language décrit précisément (cross-fade scrollY, cadran solaire SVG, entrées inView, parallax, marquee, cards hover, strip snap, chip pulse, Lenis).
- Table images 11 entrées, 0 placeholder, 0 Unsplash.
- 4 singularités UI clairement nommées.

### site/index.html : PASS
- Layout radicalement unique : archétype `quai-diurne-nocturne`, cadran solaire SVG scroll-driven fixé en sidebar, cross-fade jour/nuit sur hero et crépuscule, chip horaire dynamique. Aucun clone des 14 archétypes du catalogue.
- Fichier unique, auto-suffisant, ouvrable en double-clic.
- Tailwind CDN present. Google Fonts (Fraunces + Manrope + JetBrains Mono) via preconnect + link. Motion One ESM + Lenis ESM intégrés.
- CSS variables palette injectées dans `:root`.
- Typographie Fraunces appliquée au h1 et tous les h2/h3 de section.
- Hero avec image réelle priorité 1 (terrasse TripAdvisor HD, façade CSV lh3 HD). Aucune Unsplash, aucun placeholder.
- Marquee fonctionnel (horaires, `@keyframes marquee 50s linear infinite`, hover-pause).
- 14 images au total dans le HTML, dont 4 plats en section carte, 5 dans strip spécialités corses, 2 hero, 2 crépuscule, 1 section midi — galerie suffisante (> 6 images réelles réparties).
- Google Maps iframe présent (coordonnées lat 42.5663/lng 8.7581, coïncidentes avec l'adresse Calvi).
- Horaires structurés (12h-14h, 19h-22h). CTA téléphone `tel:+33495650269` présent dans nav (sticky), hero, section infos, footer.
- Mobile-first : aucune largeur fixe > 100vw. Grille responsive via Tailwind. Sundial repositionné via media query max-width:900px.
- Alt présent sur toutes les `<img>` (vérifié par script).
- Zéro `source.unsplash.com`. Zéro hotlink externe (lh3, Unsplash, tourinsoft). Toutes les images pointent sur `./assets/images/`. Les 14 fichiers existent réellement dans `site/assets/images/`.
- Zéro caractère em-dash U+2014.
- Aucun contenu négatif (notes 1-2★, critiques, comparaisons concurrentielles).
- Light mode uniquement (nocturne local aux 2 sections cross-fade).
- Contraste texte-sur-image : scrim permanent bicouche (linear-gradient + radial-gradient), `filter: brightness(.94)` sur image, `text-shadow` sur `.hero-text *`, chips backdrop-blur.

### email.txt + email.html : PASS
- Sujet "L'Ile de Beauté, le quai en deux services" : 41 caractères, spécifique et personnalisé.
- Minimum 3 éléments spécifiques cités : 991 avis Google 4,5/5, Travelers' Choice 2025, calamars persillade, terrasse midi/soir, quai Adolphe Landry, numéro 04 95 65 02 69.
- Offre reproduite mot pour mot : 1740€ barré + 1500€, année 2 20€/mois, option premium +10€/mois avec les 5 items (WhatsApp IA, modifications temps réel, sauvegardes auto, versionning, assistance 24/7).
- Signature correcte : Anto / Menghi Computer Science / menghicomputerscience@gmail.com / 06 43 87 91 14.
- email.html : max-width 640px, aucune image distante, liens tel: et href sur l'URL GitHub Pages.
- URL GitHub Pages en clair dans le corps (non masquée).
- Zéro em-dash dans email.txt et email.html.

## Remédiations

Aucune. Tous les points critiques et essentiels passent.
