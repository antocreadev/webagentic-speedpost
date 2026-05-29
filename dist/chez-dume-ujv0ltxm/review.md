# Revue qualité — Chez Dumé (Calvi)

## Verdict : PASS

## Détails

- **research.md** : PASS — Synthèse business complète, 6 sources web citées avec URL, 10 assets visuels documentés, aucun signal négatif, archétype `ardoise-village` suggéré en fin de rapport.
- **design.md** : PASS — Archétype custom `ardoise-village` unique et justifié (non présent dans la blacklist), 5 couleurs hex avec rôles (--bg, --ink, --ink-2, --accent, --line), 3 polices Google Fonts (Caveat, Fraunces, DM Sans), 10 sections ordonnées, motion language complet (durées, easings, stagger, tracé craie SVG), 10 images réelles assignées, 0 placeholder.
- **site/index.html** : PASS — Tailwind pré-compilé via `tailwind.css` (15 KB, aucune référence cdn.tailwindcss.com). Reveals robustes : `.js-ready [data-reveal]{opacity:0;...}` + `@keyframes autoreveal` présents dans le `<style>` inline (lignes 21-22), `classList.add('js-ready')` présent (ligne 362). Google Fonts (Caveat + Fraunces + DM Sans) chargées. Google Maps iframe (lat 42.5664556 / lng 8.7578472). Galerie 8 polaroids. 0 hotlink externe, toutes les images locales présentes dans `site/assets/images/`. 0 em-dash. 0 source.unsplash.com. Layout `ardoise-village` radicalement singulier : ardoise noir-mat full-width, tracé craie SVG progressif, polaroids à rotation figée + ruban kraft CSS, marquee crieur de plats, tabs carte, chip ouvert temps-réel. HTML syntaxiquement valide.
- **email.txt + email.html** : PASS — Sujet 53 caractères. 4+ faits client spécifiques (olivier centenaire, Lydia, moules du cap, pieuvre grillée, sanglier au miel, place de l'église). Offre reproduite mot-pour-mot : 1500€ (1740€ barré), 20€/mois année 2, option premium +10€/mois avec les 5 items (WhatsApp IA, modifs temps réel, sauvegardes, versionning, assistance 24/7). Signature complète (Anto / Menghi Computer Science / menghicomputerscience@gmail.com / 06 43 87 91 14). 0 em-dash dans email.txt et email.html. email.html existe avec max-width 640px.

## Remédiations

Aucune. Tous les points critiques passent.
