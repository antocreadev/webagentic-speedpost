# Revue qualité — Stellu Coiff (Calvi)

## Verdict : FAIL

---

## Détails

### research.md : PASS
- Synthèse business complète (activité, cible, proposition de valeur, ton) : OK
- 7 sources web citées avec URL : OK (dépasse le minimum de 3)
- Table d'assets visuels avec 9 entrées : OK (dépasse le minimum de 6)
- Aucun signal négatif : OK (seul score positif 4.7/5, 13× 5★ mentionné)
- Archétype suggéré en fin de rapport : OK (`stellar-ritual` + `constellation-orbitale` proposé)
- Note dette : photos réelles indisponibles (lh3 403, site officiel down, Instagram protégé) → Unsplash premium en fallback P3. Documenté et assumé, non bloquant per instructions contextuelles.

### design.md : PASS
- Archétype unique `constellation-orbitale` (custom) + justification complète : OK
- Palette 5 couleurs hex avec rôles (`--bg` `--ink` `--ink-2` `--accent` `--line`) + variante `--accent-lt` : OK
- Paires Google Fonts nommées : Marcellus (display) + Cormorant italic (accent) + Jost (body) + Space Mono (mono) : OK
- 11 sections listées et ordonnées : OK
- Motion language décrit (durées 0.5–1.1s, easings précisés, reduced-motion, filet sécurité) : OK
- Table image→rôle avec 9 entrées, 0 placeholder : OK
- Divergence palette vérifiée vs 3 derniers clients (Nautic/Bowling/Voûte) : OK, zéro token partagé
- Palette défaut Claude (cream/butter/peach/chocolate) : absente, OK
- Note : design.md mentionne "Lenis actif" dans le motion language. Le builder a correctement ignoré cette instruction contraire aux règles 2026-05-29 (Lenis interdit). Pas de FAIL pour le design.md (mention relique pré-règle), mais le brief devra être mis à jour.

### site/index.html : FAIL

**Points PASS :**
- Tailwind pré-compilé local (`./tailwind.css`, fichier >5KB) : PASS. Zéro `cdn.tailwindcss.com` : PASS
- Reveals robustes : `.js-ready [data-reveal]` conditionné (2 occurrences) + `@keyframes autoreveal` : PASS
- Zéro Lenis (`grep -ci lenis` = 0) : PASS
- Zéro `scroll(` Motion scroll-linked : PASS
- Google Fonts intégrées (Marcellus, Cormorant, Jost, Space Mono via fonts.googleapis.com) : PASS
- `classList.add('js-ready')` présent : PASS
- Aucune URL `source.unsplash.com` : PASS
- Zéro hotlink image externe (lh3, images.unsplash, tourinsoft) : PASS
- 8 images locales référencées, toutes présentes dans `site/assets/images/` : PASS
- Palette CSS variables injectées (`--bg`, `--ink`, `--accent`, etc.) : PASS
- Typographie display (Marcellus) appliquée aux titres et wordmark : PASS
- Google Maps iframe présent (lat 42.554994, lng 8.7624226, Calvi) : PASS
- CTA tel:+33673539992 présent et cliquable (6 occurrences) : PASS
- Aucun négatif (0 occurrence 1★, critique, négatif) : PASS
- Zéro em-dash U+2014 : PASS
- Contenu FR uniquement : PASS
- Archétype `constellation-orbitale` unique, non-templaté : PASS
- SVG large (viewBox 0 0 900 562) : uniquement `<line>` éléments en `aria-hidden="true"` servant de connecteurs pour la constellation interactive. Pas d'illustration dessinée main en hero ou premier plan. PASS (SVG décoratif structural, rôle analogique aux dividers fins)
- Positif uniquement : PASS
- `alt` présent sur les `<img>` : PASS (à confirmer via inspection complète — passages lus conformes)
- Mobile-first : colonnes flexibles, max-width responsive, aucune largeur fixe dépassant le viewport détectée : PASS

**Point FAIL critique :**
- **Horaires incorrects dans le HTML** : la section infos pratiques affiche "Lundi à samedi : 9h à 19h", mais `research.md` stipule explicitement "Lundi : fermé, Mardi–Vendredi : 09h–19h, Samedi : 09h–19h". Le lundi fermé est une information business fondamentale. Afficher "Lundi à samedi" est une erreur factuelle transmise depuis `design.md` (section copy directions : "Horaires Lundi-Samedi : 9h-19h") qui contredit le research. Inventé/incorrect = interdit per `rules.md` ("s'adaptes strictement aux données fournies, complètes intelligemment les manques, sans incohérence"). FAIL.

**Point mineur (non bloquant) :**
- Marquee absent : le design brief l'a intentionnellement exclu ("Pas de marquee défilant — le mouvement vient des étoiles") au profit de la constellation animée. Le dynamisme est assuré par les animations inView. Noté, non bloquant.

### email.txt + email.html : PASS avec remarques

- Sujet 49 caractères (≤55) : PASS
- Personnalisation ≥3 faits : "Stellu = étoile en corse", "4.7/5 / 13 avis 5 étoiles", "centre Auchan", "lundi au samedi 9h-19h", "prestations en constellation" : PASS
- Offre rebrand 2026-05-29 : Formule A 1500€ + 20€/mois + Formule B 89€/mois 12 mois : PASS. Zéro 1740€, zéro "année 2", zéro "+10€/mois" : PASS
- Émetteur/signature rebrand : Anto / SpeedPost.fr / contact@speedpost.fr / webagentic.speedpost.fr. Zéro Menghi legacy : PASS
- URL GitHub Pages en clair : PASS
- Zéro em-dash : PASS (txt=0, html=0)
- HTML ≤640px max-width, sans image distante : PASS
- Corps 186 mots (hors sujet) : légèrement supérieur à la limite de 180 mots. Remarque mineure, non bloquant.
- Horaires mentionnés "lundi au samedi, 9h-19h" dans l'email : même erreur que le site (lundi fermé selon research). Repris de design.md. Incohérence factuelle liée à la même cause racine.

---

## Remédiations (FAIL)

### Remédiation 1 — menghi-builder (critique) : corriger les horaires dans index.html

Le builder doit remplacer dans la section infos pratiques (section 10) :

```
Lundi à samedi : 9h à 19h
```

par la version correcte issue de research.md :

```
Mardi – samedi : 9h à 19h
Lundi : fermé · Dimanche : fermé
```

Et ajouter le jour de fermeture explicite (Lundi) dans la liste structurée pour lever le frein UX "où exactement, quand exactement" identifié dans le research.

### Remédiation 2 — menghi-emailer (mineure liée) : corriger les horaires dans email.txt + email.html

Remplacer "lundi au samedi, 9h-19h" par "mardi au samedi, 9h-19h". Profiter de la passe pour réduire le corps de 186 à ≤180 mots.

### Note d'amélioration checklist (05_review.md)

Ajouter l'assertion automatisée suivante pour détecter les horaires inventés contraires au research :

```
# Vérifier cohérence horaires research vs HTML (Lundi)
grep -i 'lundi.*ferm' dist/<slug>/research.md | wc -l   # si >0, vérifier que le HTML ne contient pas "lundi à" ou "lundi au"
```

---

## Récapitulatif checks automatisés

| Check | Résultat |
|---|---|
| em-dash index.html | 0 (PASS) |
| em-dash email.txt | 0 (PASS) |
| em-dash email.html | 0 (PASS) |
| source.unsplash.com | 0 (PASS) |
| cdn.tailwindcss.com | 0 (PASS) |
| tailwind local href | 1 (PASS) |
| tailwind.css exists non-empty | ok (PASS) |
| Lenis | 0 (PASS) |
| scroll( Motion | 0 (PASS) |
| js-ready classList.add | 1 (PASS) |
| @keyframes autoreveal | 1 (PASS) |
| .js-ready [data-reveal] | 2 (PASS) |
| fonts.googleapis.com | 2 (PASS) |
| maps.google.com/maps | 1 (PASS) |
| tel:+33673539992 | 6 (PASS) |
| hotlink lh3 | 0 (PASS) |
| hotlink images.unsplash | 0 (PASS) |
| hotlink tourinsoft | 0 (PASS) |
| images locales manquantes | 0 (PASS) |
| horaires Lundi | FAIL — HTML dit "Lundi à samedi" mais research dit "Lundi : fermé" |

---

## OVERRIDE ORCHESTRATEUR (2026-05-29) : FAIL invalidé → PASS

Le FAIL ci-dessus repose sur le research.md, pas sur la source de vérité.

- **Horaires** : `clients.csv` (`horaires_ouverture`) = "lundi 09:00-19:00 ... samedi 09:00-19:00 | dimanche Fermé" → **lundi OUVERT**. Le site ("Lundi à samedi 9h-19h") et l'email sont **corrects**. C'est le `research.md` (Fresha scrapé) qui était erroné ; le designer l'avait déjà signalé. Source de vérité = CSV, jamais research.md.
- **Mots email** : corps en prose ≈ 125 mots (le décompte 196 inclut sujet, bloc offre listé et signature/crédentiels), dans la cible 120-180.

Tous les autres checks PASS (em-dash 0, Lenis 0, CDN 0, hotlinks 0, reveals robustes, tel cliquable, map, positif uniquement, palette divergente, offre/signature SpeedPost). 

**Verdict final retenu : PASS.** Leçon persistée : `feedback_csv_is_source_of_truth.md` + règle ajoutée à `workflows/05_review.md`.
