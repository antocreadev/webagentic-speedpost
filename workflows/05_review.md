# Brief — Étape 5 : Revue qualité (QA gate)

**Agent :** `menghi-reviewer`
**Livrable :** `dist/<slug>/review.md` (PASS ou FAIL avec remédiations)
**Pré-requis :** lire `workflows/rules.md`, lire tous les livrables du client

## Objectif

Valider ou rejeter la sortie d'un client avant de le marquer `done`. Refuser sans pitié ce qui n'atteint pas le bar premium 2025-2026.

## Checklist stricte

### `research.md`
- [ ] Synthèse business complète (activité, cible, proposition de valeur, ton)
- [ ] Au moins 3 sources web citées avec URL
- [ ] Table d'assets visuels avec ≥ 4 entrées
- [ ] Aucun signal négatif (note basse, avis 1-2★, critique)
- [ ] Archétype suggéré en fin de rapport

### `design.md`
- [ ] Archétype unique + justification
- [ ] Palette ≥ 5 couleurs hex avec rôles
- [ ] Paire de polices Google Fonts nommée (display + body)
- [ ] 9 sections listées et ordonnées
- [ ] Language motion décrit (durée, easing, effets par section)
- [ ] Table image→rôle avec ≥ 6 entrées (idéalement 0 placeholder)

### `site/index.html`
- [ ] **Layout unique par client** : la structure (archétype, ordre des sections, traitement du hero, nav, rythme visuel) diverge clairement des autres sites du catalogue. FAIL si le site ressemble à un template 9-sections générique identique à d'autres clients.
- [ ] Un seul fichier, se charge en double-clic
- [ ] **Tailwind PRÉ-COMPILÉ** présent : `<link rel="stylesheet" href="./tailwind.css"/>` ET fichier `site/tailwind.css` existe (>5KB) ET aucune référence à `cdn.tailwindcss.com` dans index.html. FAIL si le CDN play est utilisé.
- [ ] **Reveals robustes** : `[data-reveal]` initial state conditionné par `.js-ready` + `@keyframes autoreveal` fallback présents. FAIL si `[data-reveal]{opacity:0}` est inconditionnel (risque de page vide si JS échoue).
- [ ] Google Fonts + Motion + Lenis intégrés (ESM imports)
- [ ] Palette CSS variables injectée
- [ ] Typographie display appliquée au h1 et aux titres de section
- [ ] Hero avec image réelle priorité 1 (vérifier le `src`)
- [ ] Marquee fonctionnel
- [ ] Galerie ≥ 6 images
- [ ] Google Maps iframe présent (`lat,lng` cohérents)
- [ ] Horaires structurés, CTA principal ancré
- [ ] Mobile-first (vérifier qu'aucune largeur fixe > 100vw)
- [ ] `alt` présent sur toutes les `<img>`
- [ ] **Aucune URL `source.unsplash.com/...`**
- [ ] **Aucun négatif** dans le contenu
- [ ] **Toutes les images sont locales** : chaque `<img src>` pointe sur `./assets/images/...` (ou `placehold.co` placeholder). Zéro hotlink `lh3.googleusercontent.com`, `images.unsplash.com`, `tourinsoft.eu`, etc. dans le HTML livré.
- [ ] `dist/<slug>/site/assets/images/` existe et contient effectivement les fichiers référencés par `index.html`.
- [ ] **Zéro caractère `—` (tiret cadratin U+2014)** dans le texte du site : `grep -c $'\u2014' dist/<slug>/site/index.html` doit retourner 0.

### `email.txt` + `email.html`
- [ ] Sujet ≤ 55 caractères, spécifique
- [ ] Au moins 2 éléments spécifiques au client cités dans les bénéfices
- [ ] Offre reproduite **mot pour mot** (prix 1500€ barré 1740€, année 2 20€/mois, option premium +10€/mois avec les 5 items)
- [ ] Signature Mindlet présente
- [ ] HTML version sans image distante, ≤ 640px max-width
- [ ] **Zéro caractère `—` (tiret cadratin U+2014)** dans `email.txt` et `email.html` : `grep -c $'\u2014' dist/<slug>/email.txt dist/<slug>/email.html` doit retourner 0 pour les deux fichiers.

## Verdict

Écrire `dist/<slug>/review.md` ainsi :

```markdown
# Revue qualité — <Nom>

## Verdict : PASS | FAIL

## Détails
- research.md : <PASS|FAIL> — <commentaire>
- design.md : <PASS|FAIL> — <commentaire>
- site/index.html : <PASS|FAIL> — <commentaire>
- email : <PASS|FAIL> — <commentaire>

## Remédiations (si FAIL)
1. <action concrète, ciblée, re-déléguable>
2. ...
```

## Règles

- **FAIL** si un seul point critique échoue (images réelles absentes, offre mal rendue, template basique, source.unsplash.com présent, négatif détecté).
- **PASS** uniquement si tous les points essentiels passent. Les remarques mineures (typo, micro-spacing) peuvent être listées mais ne provoquent pas de FAIL.
- Proposer des remédiations **actionnables par un sous-agent** (indiquer lequel ciblé).

## Sortie

Retourner à l'orchestrateur :
- verdict PASS / FAIL
- 1-3 remédiations clés si FAIL
- chemin `review.md`
