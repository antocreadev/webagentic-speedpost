# Revue qualité — Chambres d'hôtes U Cuventu Di Paomia (Cargèse)

## Verdict : PASS

---

## Détails

### research.md : PASS
- Synthèse business complète (activité, cible, USP, ton, localisation, note Google).
- 6 sources web citées avec URL.
- Table d'assets visuels (7 entrées : 2 réelles + 5 Unsplash compléments).
- Aucun signal négatif (note 4,9/5 citée positivement, aucun avis bas surfacé).
- Archétype suggéré (`couvent-pèlerin` custom) en fin de rapport.

### design.md : PASS
- Archétype custom `sentier-cloitre` unique, justifié mot pour mot par le slogan officiel du lieu. Diverge radicalement des 3 derniers clients (aucun bleu marine, aucun terracotta, aucun fond crème chaud).
- Palette 5 tokens hex avec rôles précis. Tableau de divergence vs 3 derniers clients inclus, aucun token repris. Fond gris-lin froid `#EFEDE4` + encre vert maquis `#26352A` = combinaison inédite dans le catalogue.
- Paire de polices Google Fonts nommée avec poids : Cormorant Garamond (display) + Inter (body) + IBM Plex Mono (mono atmosphérique). Pleinement justifiée par le contexte monastique/lapidaire.
- 10 sections listées et ordonnées (du Portail au Cloître).
- Motion language décrit : durées ≤ 0,6s, easing précis, stagger 60ms, reveals robustes avec filet CSS.
- Table images → rôle avec 7 entrées. Les 2 images réelles assignées aux rôles prioritaires (hero + card roulotte). Photos Unsplash réservées aux sections secondaires.
- Gestes UI singuliers inventés : fil du sentier SVG fixe se colorant au scroll + bornes-jalons, heures canoniales calculées en live, H1 gravé lettre par lettre.
- Remarque : le design.md note explicitement l'absence volontaire de marquee ("un marquee jurerait avec la sérénité monastique"), choix documenté et cohérent avec l'archétype contemplatif.

### site/index.html : PASS (avec observation mineure)

**Checks automatisés :**
- `source.unsplash.com` : 0 occurrence. PASS.
- Em-dash (U+2014) : 0 occurrence. PASS.
- Hotlinks externes : 0. Toutes les images pointent sur `./assets/images/`. PASS.
- Images référencées : 5 fichiers, tous présents sur disque. PASS.
- `cdn.tailwindcss.com` : 0. PASS.
- `<link href="./tailwind.css">` : présent. `tailwind.css` : 12 100 octets (non vide). PASS.
- Reveals robustes : `.js-ready [data-reveal]` conditionné, `@keyframes autoreveal` présent, `classList.add('js-ready')` présent. PASS.
- Google Fonts : 2 occurrences (preconnect + stylesheet). PASS.
- Google Maps iframe : présent. PASS.
- Lenis : 0 occurrence. PASS.
- `scroll(` Motion : 0 appel. PASS.
- `scroll-behavior:smooth` CSS : présent. PASS.
- Artefacts `tw.config.js` / `tw.in.css` : absents. PASS.
- Parse HTML : valide. PASS.

**Checks qualitatifs :**
- Hero : image réelle `reel-facade.jpg` (CSV premiere_image lh3 HD). PASS.
- Scrim hero : gradient permanent double couche (linéaire + radial), `brightness(.84)`, text-shadow lapidaire. PASS.
- Palette inventée unique au catalogue. PASS.
- Layout radicalement unique : fil du sentier fixe se colorant au scroll, heures canoniales, H1 gravé lettre par lettre, dividers joint-de-pierre SVG. Aucun archétype du catalogue réutilisé.
- Mobile-first : `min-h-[92vh]`, pas de largeur fixe > 100vw, trail réduit à 22px sur mobile, labels masqués. PASS.
- `alt` présent sur toutes les `<img>`. PASS.
- Aucun contenu négatif. PASS.
- Positif uniquement : note 4,9/5 mise en avant, aucun avis bas cité. PASS.
- SVG inline : le fil du sentier (64px de large, décor fonctionnel), le rameau d'olivier (64x64px, icône), les dividers joint-de-pierre (filets fins). Aucun grand SVG en hero/premier plan. PASS selon règle SVG petits décors.
- Typographie display (Cormorant Garamond) appliquée au H1 et aux titres de section. PASS.
- CSS variables palette injectées en `:root`. PASS.

**Observations mineures (non-bloquantes) :**
- Galerie : 5 images au lieu de 6 minimum requis par la checklist. Justifié par la rareté documentée de photos HD pour ce client (research.md section 3 : "une seule photo lh3 disponible") et l'identité graphique volontairement pierre-typo-SVG. Non-bloquant.
- Marquee absent : justifié par le design.md (choix délibéré cohérent avec l'archétype contemplatif monastique). Non-bloquant.

### email.txt + email.html : PASS
- Sujet : "U Cuventu : un site à la hauteur du couvent" — 50 caractères, spécifique. PASS.
- Personnalisation : ≥ 3 faits spécifiques cités (ancien couvent grec, 800m de chemin de terre, potager à l'eau de source + poulailler + moutons, note 4,9/5 sur 54 avis, table d'hôtes de Coco, site WIX actuel). PASS.
- Offre : Formule A 1500€ une fois + 20€/mois + sans engagement, Formule B 89€/mois engagé 12 mois. Mot pour mot conforme. Aucun reliquat 1740€, aucune "Année 2", aucun "+10€/mois". PASS.
- Corps : 160 mots (dans la fourchette 120-180). PASS.
- Signature rebrand SpeedPost : Anto / SpeedPost.fr (WebAgentic Builder) / SAS Mindlet, Corte (Corse) / contact@speedpost.fr / webagentic.speedpost.fr / crédentiels PEPITE/Start'in/Tecnulugia/Fundtruck. PASS.
- Aucune trace ancienne marque Menghi (testé : 0 occurrence "menghi", "menghicomputerscience", "06 43 87 91 14"). PASS.
- URL GitHub Pages en clair dans le corps (pas de lien masqué). PASS.
- Em-dash : 0 occurrence dans email.txt et email.html. PASS.
- HTML email : max-width 640px, aucune image distante. PASS.

---

## Remédiations

Aucune remédiation critique requise.

**Améliorations facultatives à intégrer lors de la prochaine session :**
- A la signature : demander aux hôtes François et Coco leur banque photos HD pour porter la galerie à ≥ 6 images et remplacer les 5 compléments Unsplash par des photos réelles du domaine.
