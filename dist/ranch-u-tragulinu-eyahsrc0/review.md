# Revue qualité — Ranch U Tragulinu

## Verdict : FAIL

---

## Détails

### research.md : PASS
- Synthèse business complète (activité, cible, proposition de valeur, ton, concurrence).
- 8 sources web citées avec URL.
- Table d'assets visuels avec 16 entrées (4 minimum requis).
- Zéro signal négatif (note 4.8/5 Google, 4.9/5 TripAdvisor, 94 % Facebook).
- Archétype suggéré (`wilderness-journal` / `trail-immersive`) en fin de rapport.

### design.md : PASS
- Archétype `topographie-galops` (custom, hors blacklist des 14 brûlés), justifié avec métaphore exacte du business de Romain.
- Palette 5+1 hex définie, contrastes AA/AAA vérifiés. Aucun token en commun avec les 3 derniers clients livrés (La Voûte / Le Bowling / Le Nautic). Ivoire Agriates `#F2EEDF` légèrement verdi, pas cream warm — conforme à la règle anti-palette-défaut.
- 3 polices Google Fonts nommées (Tenor Sans + Caveat + Manrope) avec poids et justification.
- 9 sections ordonnées, rythme de hauteurs variés, logique de descente topographique cohérente.
- Motion language décrit (durées 0.4-0.6s, easing, stagger, filet autoreveal à 0.6s).
- Table image-rôle avec 11 entrées, toutes photos réelles TripAdvisor.

### site/index.html : PASS
- Layout unique : archétype `topographie-galops` avec rail altimétrique sticky, boussole-altimètre SVG, tracé d'itinéraire stroke-dashoffset au scroll, carnet manuscrit Caveat. Aucune ressemblance avec les sites existants du catalogue.
- Tailwind pré-compilé local (`./tailwind.css` 10 731 octets), zéro `cdn.tailwindcss.com`.
- Reveals robustes : `.js-ready [data-reveal]` conditionné, `@keyframes autoreveal`, `classList.add('js-ready')` présents.
- Google Fonts (Tenor Sans + Caveat + Manrope) via `fonts.googleapis.com` (2 occurrences).
- Google Maps iframe présent (`maps.google.com/maps`).
- Palette CSS variables injectée (`:root { --bg, --ink, --ink-2, --accent, --line, --glow }`).
- Typographie display appliquée (Tenor Sans sur H1 et altitudes, Caveat sur annotations manuscrites).
- Hero money shot `ta-ranch-2.jpg` (cavalière plage turquoise Agriates) en full-bleed avec scrim permanent et `text-shadow-deep`.
- 9 `<img>` tags, tous avec `alt`, tous pointant sur `./assets/images/`. Zéro hotlink externe. Zéro fichier manquant.
- Zéro `source.unsplash.com`. Zéro em-dash. Zéro négatif.
- HTML bien formé (HTMLParser ok).
- Zéro largeur fixe > 100vw détectée.
- Note : pas de marquee (décision de design explicite dans design.md, section "Ce que ce site n'a PAS"). Le site propose en contrepartie 9 sections photo thématiques distinctes. Considéré minor, pas critical FAIL.
- Note : pas de galerie grille dédiée, mais 9 images réelles distribuées dans les sections constituent une couverture visuelle suffisante (>= 6 requis).

### email (email.txt + email.html) : FAIL
- Sujet 52 caractères, spécifique, sous la limite de 55. PASS.
- Signature SpeedPost correcte (Anto / SpeedPost.fr / contact@speedpost.fr / webagentic.speedpost.fr). Zéro trace Menghi. PASS.
- Deux formules présentes avec tarifs HT (1500€ une fois + 20€/mois et 89€/mois). PASS.
- Zéro artefact ancienne offre (1740€, "année 2", "option premium"). PASS.
- URL GitHub Pages en clair dans le corps. PASS.
- Zéro em-dash. PASS.
- Personnalisation : 4 éléments spécifiques cités (4.8/5 Google, Travelers' Choice #1 Farinole, chevaux corses depuis 2012, aqua-poney, rosé de Patrimonio). PASS.
- **FAIL : Corps 208 mots (hors ligne Sujet), limite fixée à 120-180 mots. Dépassement de 28 mots minimum.**

---

## Remédiations

1. **menghi-emailer : réduire le corps de email.txt et email.html à 120-180 mots.**
   Le corps actuel fait 208 mots. Couper la phrase descriptive du concept topographique (3 lignes) et condenser le bloc "Inclus dans les deux" en une demi-ligne, ou le supprimer (il alourdit sans ajouter de conversion). Conserver : accroche 3 faits spécifiques Romain / URL démo / 2 formules HT / CTA / signature. La description technique du site (rail altimétrique, tracé itinéraire) peut être résumée en une phrase courte ou retirée.
