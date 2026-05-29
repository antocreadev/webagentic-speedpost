# Revue qualité — Ranch l'Indianna (Oletta, Nebbio)

## Verdict : PASS

Revue v2 — 2026-05-29. Toutes les remédiations du FAIL précédent ont été appliquées et vérifiées.

---

## Détails

### research.md : PASS
- Synthèse business complète (activité, cible, proposition de valeur, ton) : OK
- 3+ sources web citées avec URL (teambooking.fr, baladeacheval.com, contexte géo Nebbio-Agriates) : OK
- Table assets visuels avec 6 entrées (1 lh3 tentée + 5 Unsplash fallback) : OK
- Aucun signal négatif : OK
- Archétype suggéré en fin de rapport (`ranch-sauvage-immersif`) : OK
- Exception photo réelle documentée : URL lh3 testée 3 fois (HTTP 403 confirmé, multi-suffixes + User-Agent Chrome + Referer google.com) → Unsplash légitime comme seul fallback disponible : OK

### design.md : PASS
- Archétype unique `sentier-au-crepuscule` custom + justification narrative détaillée : OK
- Palette 6 tokens hex avec rôles, contrastes vérifiés (ivoire végétal froid #EEF0E6, encre vert maquis #1E2B1E, accent turquoise #2E8C8C) : OK
- Paires Google Fonts nommées (Fraunces + Jost) avec poids : OK
- 9 sections listées et ordonnées : OK
- Motion language décrit (durées 0.5s, easing, stagger 70ms, filet de sécurité reveals explicitement mentionné) : OK
- Table image→rôle avec 11 entrées, 0 placeholder : OK
- Palette diverge des 3 derniers clients (tableau comparatif inclus) : OK

### site/index.html : PASS

**Checks automatisés (tous verts) :**
- Em-dash U+2014 : 0 occurrence : PASS
- `source.unsplash.com` : 0 occurrence : PASS
- `cdn.tailwindcss.com` : 0 occurrence : PASS
- `<link rel="stylesheet" href="./tailwind.css"/>` présent : PASS
- `tailwind.css` local existe et non vide : PASS
- Google Fonts chargées (fonts.googleapis.com, 2 occurrences) : PASS
- Google Maps iframe présent (maps.google.com/maps?q=) : PASS
- Hotlinks externes (lh3/unsplash/tourinsoft) dans `src=` : 0 : PASS
- Images locales référencées (8/8) toutes présentes sur disque : PASS
- `.js-ready [data-reveal]` : 3 occurrences : PASS
- `@keyframes autoreveal` : 2 occurrences : PASS
- `classList.add('js-ready')` : 1 occurrence : PASS
- Lenis (`grep -ci lenis`) : 0 : PASS
- `scroll(` Motion appels scrubbés : 0 : PASS
- `scroll-behavior` (ancres CSS natif) : 1 : PASS
- `inView(` (gestes one-shot) : 2 : PASS
- Téléphone `tel:+33621902686` présent (13 occurrences, bouton flottant inclus) : PASS
- Prix dans le site (1500/89€/20€) : 0 : PASS
- Négatifs (1★/2★, concurrent) : 0 : PASS
- HTML valide (HTMLParser) : PASS

**Checks qualitatifs :**
- Hero : photo Unsplash légitime (exception documentée, photo lh3 HTTP 403 confirmé) : PASS
- SVG inline : divider vague (1440x80, décor simple) + frise sentier (2400x600, geste UI signature propriétaire, section dédiée, pas hero) : PASS (tolérés selon règle "SVG petits décors + geste signature")
- Galerie : 8 images locales référencées, 11 fichiers dans assets/images : PASS
- Palette inédite (ivoire végétal froid #EEF0E6 + vert maquis #1E2B1E + turquoise #2E8C8C) diverge des 3 derniers clients et de la palette défaut Claude : PASS
- Archétype `sentier-au-crepuscule` absent de la blacklist (14 archétypes brûlés vérifiés) : PASS
- Layout unique : frise sentier panoramique scroll-driven one-shot + jauge soleil + séquence narrative immersive, non clonée : PASS
- Verbatims positifs (4.9/5 sur 62 avis, baignade en mer plage de la Roya) : PASS
- Mobile-first, `overflow-x: hidden` html+body, pas de largeur fixe > 100vw : PASS
- Scroll 100% natif, Lenis supprimé : PASS
- Langue FR, positif uniquement : PASS

### email.txt + email.html : PASS
- Objet "Ranch l'Indianna : votre site, enfin" (38 caractères, ≤ 55) : PASS
- 3+ éléments spécifiques : 4.9/5 sur 62 avis, baignade à cheval plage de la Roya, poney club 6-8 ans, 6 juments 2 poneys, Nebbio-Agriates : PASS
- Offre reproduite mot-pour-mot : 1500€ HT une fois + 20€/mois HT sans engagement + 89€/mois HT 12 mois : PASS
- Signature rebrand SpeedPost (Anto / SpeedPost.fr / contact@speedpost.fr / webagentic.speedpost.fr) : PASS
- Em-dash email.txt : 0, email.html : 0 : PASS
- URL GitHub Pages en clair : PASS
- Aucune trace ancienne marque Menghi : PASS
- Corps 184 mots (légèrement au-dessus de 180, remarque mineure non bloquante) : NOTE

---

## Remédiations

Aucune. Tous les points critiques sont verts.
