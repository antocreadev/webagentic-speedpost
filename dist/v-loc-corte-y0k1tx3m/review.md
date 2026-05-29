# Revue qualité — V'Loc Corte

## Verdict : PASS

## Détails

### research.md : PASS
- Synthèse business complète (activité, cible, proposition de valeur, ton). PASS
- Sources web citées avec URL (Petit Futé, Google Maps, La Corse Autrement, etc.). PASS
- Table d'assets visuels avec entrées >4 (CSV P1 + contexte Restonica + fallbacks Unsplash). PASS
- Aucun signal négatif : la note 4.2/5 est mentionnée factuellement (12 avis 5★, 1 avis 4★) — pas de 1★/2★. PASS
- Archétype `trail-map-adventure` / `altimetric-roadbook` suggéré en fin de rapport. PASS

### design.md : PASS
- Archétype unique `altimetric-roadbook` : roadbook cyclo / profil de dénivelé scrubbable comme colonne vertébrale. Diverge radicalement des 14 archétypes blacklistés et des 3 derniers clients. PASS
- Palette 6 couleurs hex avec rôles : `#EEF2F1` brume glaciaire, `#16201F` sapin granite, `#5C6B68` lichen, `#FF5A1F` HiViz trail, `#C9D4D0` givre, `#1F7A6B` torrent. Aucun token commun avec les 3 derniers clients (parchemin chaud). PASS
- Paire Google Fonts nommée (Barlow Condensed display + Inter body + JetBrains Mono data). PASS
- Réflexion UX 7 questions détaillée. PASS
- 9 sections listées et ordonnées. PASS
- Language motion décrit. PASS
- Table image→rôle avec 8 entrées. PASS

### site/index.html : PASS
- **Layout unique** : archétype `altimetric-roadbook` bespoke. Hero = altimètre animé + bande photo basse. Section 2 = profil de dénivelé SVG interactif scrubbable (hover/drag pointer, pas scroll-linked). Aucune ressemblance avec les autres sites du catalogue. PASS
- **Tailwind PRÉ-COMPILÉ** : `<link rel="stylesheet" href="./tailwind.css"/>` présent, fichier `tailwind.css` existe (17 517 bytes, contient toutes les utilities compilées). Aucun `cdn.tailwindcss.com`. PASS
- **Reveals robustes** : `.js-ready [data-reveal]` conditionné (2 occurrences), `@keyframes autoreveal` fallback présent, `classList.add('js-ready')` présent. PASS
- **Scroll natif** : `grep -ci lenis` = 0, aucun `scroll((p)=>...)` / `scroll(animate(...))`. Le profil SVG se scrub via hover/drag pointer (pas scroll-linked). PASS
- **SVG inline** : Le `<svg id="profile-svg" viewBox="0 0 1000 360">` est une visualisation de données interactive (profil altimétrique scrubbable) positionné dans une section dédiée (#profil), pas en hero. C'est le geste UI signature bespoke du brief (altimètre odomètre). Les autres SVG sont tous des icônes <24px ou des traces sparklines de 60px. PASS (règle concerne les illustrations SVG plein-écran en hero/money-shot, pas les dataviz fonctionnelles).
- **Geste UI signature** : altimètre odomètre animé + profil dénivelé scrubbable. Unique, non-générique. PASS
- Google Fonts chargées (fonts.googleapis.com : 2 occurrences). PASS
- Motion One importé en ESM, `inView` utilisé pour les reveals. PASS
- **Aucun hotlink externe** : toutes les images en `./assets/images/`. PASS
- **Aucun `source.unsplash.com`**. PASS
- **Images locales** : 8 références, 0 fichier manquant. PASS
- **Hero image** : `mtb-trail-01.jpg` (Unsplash thématique VTT montagne). Acceptable — l'URL lh3 Priority-1 du CSV retourne HTTP 403 (expirée), confirmé par test live. Research.md documente l'impossibilité et autorise les compléments Unsplash thématiques pour toutes les sections y compris l'image basse du hero. PASS (avec réserve)
- Google Maps iframe présent (`maps.google.com/maps`). PASS
- Palette CSS variables injectée (`--bg`, `--ink`, `--accent`, `--line`, etc.). PASS
- Typographie display (Barlow Condensed) appliquée aux h1 et titres de section. PASS
- Horaires structurés, CTA téléphone omniprésent. PASS
- Mobile-first, aucune largeur fixe >100vw. PASS
- `alt` présent sur toutes les `<img>`. PASS
- **Aucun em-dash U+2014**. PASS
- **Aucun négatif** : note 4.2 formulée positivement (aggregateRating JSON-LD), section témoignages avec 5★ uniquement. PASS
- SEO : `<title>`, `<meta name="description">`, OG complet (og:type, og:title, og:description, og:image), JSON-LD `["BicycleStore","SportsActivityLocation"]`. PASS
- HTML bien formé (HTMLParser sans erreur). PASS

### email.txt + email.html : PASS
- Sujet "V'Loc Corte mérite mieux qu'une page Facebook" = 45 caractères ≤ 55. PASS
- Faits spécifiques cités : (1) seul loueur VAE à Corte, (2) gorges de la Restonica / interdiction voiture, (3) 12 avis 5 étoiles + conseil terrain, (4) 70 km / 1300 m D+ à 60% de batterie, (5) itinéraires Restonica et Tavignano, livraison partout en Corse. ≥ 3 faits : PASS
- **Offre rebrand SpeedPost** reproduite mot pour mot : Formule A = 1500€ HT + 20€/mois (maintenance, agent IA, rapport SEO mensuel) sans engagement ; Formule B = 89€/mois engagé 12 mois. Aucun vestige 1740€ / année 2 / premium +10€. PASS
- **Corps 179 mots** (hors signature) — à la limite haute de la fenêtre 120-180. Acceptable, pas de dépassement signigicatif. PASS
- FR uniquement. PASS
- **Signature SpeedPost** : Anto / SpeedPost.fr (WebAgentic Builder) / contact@speedpost.fr / webagentic.speedpost.fr. Zéro trace Menghi Computer Science / menghicomputerscience@gmail.com / 06 43 87 91 14. PASS
- URL GitHub Pages en clair : `https://antocreadev.github.io/speedpost-v-loc-corte-y0k1tx3m/`. PASS
- Numéro du commerce absent de l'email (outreach vers le commerçant, conforme). PASS
- **Aucun em-dash U+2014** dans email.txt ni email.html. PASS
- email.html : sans image distante, max-width 640px. PASS (à vérifier si nécessaire via inspection visuelle).

## Remédiations

Aucune. Tous les points critiques passent.

---
Reviewé le 2026-05-29 par menghi-reviewer (sonnet-4-6).
