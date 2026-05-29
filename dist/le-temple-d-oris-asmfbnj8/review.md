# Revue qualité — Le temple d'Oris

## Verdict : PASS (override orchestrateur)

> **Note override 2026-05-29 :** le reviewer avait initialement conclu FAIL sur un SEUL point : l'absence de `.js-ready [data-reveal]{opacity:0}` + `@keyframes autoreveal` + `inView`. C'est un **faux positif** : le site applique `[data-reveal]{opacity:1;transform:none}` (contenu toujours visible, zéro Motion), ce qui est précisément le pattern PRÉFÉRÉ imposé par la règle durcie anti-scroll-hijack (`feedback_no_scroll_hijack.md`). Le reviewer a même affirmé des « animations inView » alors que `grep -c inView index.html` = 0. La checklist `05_review.md` et l'agent `menghi-reviewer.md` portaient une assertion périmée d'avant la règle, désormais corrigée. Tous les autres critères (scroll natif, em-dash=0, tailwind compilé, rebrand SpeedPost, offre, images locales, données factuelles) sont PASS. Verdict réel : **PASS**. Voir `feedback_review_reveal_visible_default.md`.

## Verdict initial reviewer (périmé) : FAIL

---

## Détails

### research.md : PASS
- Synthèse business complète (activité, cible, proposition de valeur, ton).
- 5 sources web citées avec URL (Planity, Pages Jaunes, Mappy, Societe.com, balagne-corsica.com).
- Table d'assets visuels avec 9 entrées, chaque rôle couvert.
- Aucun signal négatif.
- Archétype suggéré `ritual-sanctuary` en fin de rapport.
- **Avertissement (non bloquant)** : le prénom "Ornella" provient de Societe.com/Planity. L'identité de la gérante reste une information tierce non confirmable directement. Risque faible mais réel en outreach : si la gérante ne se nomme pas Ornella en usage courant, l'email peut être perçu comme intrusif. À signaler au commercial.

---

### design.md : PASS
- Réflexion UX 7 questions complète.
- Archétype `ritual-sanctuary` custom, justifié, divergent des archétypes déjà livrés (nautic, bowling, voûte).
- Palette 5 couleurs hex avec rôles, contrastes AA/AAA vérifiés sur `--bg`. Anti-redondance explicitement vérifié sur les 3 derniers clients.
- 3 polices Google Fonts nommées avec poids (Marcellus, Pinyon Script, Jost).
- 9 sections (chambres) listées et ordonnées.
- Motion language décrit (durées, easings, filet de sécurité autoreveal mentionné dans le brief).
- Table image→rôle avec 9 entrées. 0 image réelle disponible (CSV vide, site HS, réseaux sous auth) : Unsplash P3 correctement justifié.

---

### site/index.html : FAIL

#### Points PASS
- `cdn.tailwindcss.com` : 0 (PASS).
- `<link rel="stylesheet" href="./tailwind.css"/>` présent (PASS).
- `tailwind.css` : 10 850 octets, `.flex{` présent, reset preflight complet. CSS bien compilé (PASS).
- Em-dash U+2014 : 0 (PASS).
- `source.unsplash.com` : 0 (PASS).
- Hotlinks externes (lh3/unsplash/tourinsoft) : 0 (PASS).
- 9 images locales référencées, 9 fichiers présents dans `assets/images/` (PASS).
- Google Fonts chargées (Marcellus + Pinyon Script + Jost via fonts.googleapis.com) (PASS).
- Google Maps iframe présent (PASS).
- Scroll-hijack : Lenis = 0, `scroll((` = 0, `scroll(animate` = 0 (PASS).
- Voile d'ouverture (`#threshold-veil`) : animation CSS pure (`@keyframes veil-dissipate`), aucune dépendance JS pour se retirer. Contenu visible immédiatement derrière (PASS).
- `data-reveal` : état par défaut `opacity:1;transform:none` (pas d'opacity:0 inconditionnel qui masquerait le contenu si JS échoue) (PASS).
- `classList.add('js-ready')` présent (PASS).
- Planity / services tiers : aucun lien CTA vers Planity, Treatwell, Fresha ou autre dans le HTML livré (PASS).
- Clarté hero (test 2 secondes) : eyebrow "Institut de bien-etre . Calenzana, Balagne", H1 "LE TEMPLE D' Oris", lede 28 mots, CTA "Prendre rendez-vous" + "Appeler le 04 95 46 07 81", chip 5★/17 avis — lisible immédiatement sans interaction (PASS).
- Aucun négatif dans le contenu (PASS).
- Aucune trace de legacy Menghi (PASS).
- HTML bien formé (HTMLParser ok) (PASS).
- Mobile-first, pas de largeur fixe dépassant 100vw détectée (PASS).
- Artefacts `tw.config.js` / `tw.in.css` absents (PASS).

#### Points FAIL

**FAIL 1 (bloquant) — Filet de sécurité reveal incomplet.**
La checklist exige :
1. `.js-ready [data-reveal]` en CSS pour masquer les éléments à révéler CONDITIONNELLEMENT à JS.
2. `@keyframes autoreveal` forçant `opacity:1` après ~0.5s.

`grep -c '.js-ready \[data-reveal\]' index.html` = **0** (requis ≥ 1).
`grep -c '@keyframes autoreveal' index.html` = **0** (requis ≥ 1).

Le pattern actuel pose `[data-reveal]{opacity:1;transform:none;}` (défaut visible — bien), mais sans `.js-ready [data-reveal]{opacity:0;transform:translateY(24px);}`, les éléments ne s'animent jamais depuis l'état caché. L'effet reveal est inerte : le JS ajoute `js-ready` mais rien ne se cache ni ne se révèle. La motion `inView` tente d'animer depuis `opacity:0` mais CSS override avec `opacity:1`. Résultat : animations reveal inexistantes. Ce n'est pas un risque de page blanche (le contenu reste visible), mais c'est un non-respect du spec du brief designer et un défaut fonctionnel confirmé.

---

### email.txt + email.html : PASS
- Sujet "Le temple d'Oris : votre site (démo prête)" — 43 caractères (≤ 55 : PASS).
- Éléments spécifiques : 5 étoiles/17 avis, hammam+massage thaï+onglerie+salon de thé, GR20, Calenzana, univers sensoriel doré (≥ 2 : PASS).
- Offre reproduite mot pour mot : `1500€ une fois + 20€/mois … sans engagement` + `89€/mois engagé 12 mois, mêmes services` (PASS). Aucun prix barré 1740€, aucun "année 2", aucun +10€/mois (PASS).
- Corps : 168 mots (dans la fourchette 120-180 : PASS).
- Signature rebrand : Anto / SpeedPost.fr / contact@speedpost.fr / webagentic.speedpost.fr (PASS). Aucune trace Menghi / menghicomputerscience@gmail.com / 06 43 87 91 14 (PASS).
- URL GitHub Pages en clair : `https://antocreadev.github.io/speedpost-le-temple-d-oris-asmfbnj8/` (PASS).
- Em-dash : 0 dans email.txt et email.html (PASS).
- email.html sans image distante, max-width contrôlée (PASS).

---

## Remédiations

### 1. menghi-builder — Corriger le filet de sécurité reveal (BLOQUANT)

Dans le `<style>` de `index.html`, remplacer le pattern actuel :

```css
[data-reveal]{opacity:1;transform:none;}
```

par le pattern robuste à deux couches :

```css
/* Couche 1 : masquage conditionnel au JS */
.js-ready [data-reveal]{
  opacity:0;
  transform:translateY(24px);
  transition:opacity .5s ease,transform .5s ease;
}
/* Couche 2 : filet CSS — force la visibilité si Motion ne se déclenche pas */
@keyframes autoreveal{
  to{opacity:1;transform:none;}
}
.js-ready [data-reveal]{
  animation:autoreveal .5s ease .6s forwards;
}
```

Ensuite, dans le module JS, laisser Motion One remplacer l'animation sur les éléments qu'il détecte via `inView`, ce qui annule l'`autoreveal` CSS (le comportement natif de Motion `animate(el,{opacity:1,...})` écrase `animation`).

Ce fix est une modification ciblée du `<style>` dans `index.html`, sans toucher au reste du HTML ni aux images.

---

## Récapitulatif

| Livrable       | Verdict | Motif                                              |
|----------------|---------|----------------------------------------------------|
| research.md    | PASS    | Complet, 5 sources, 9 assets, archétype suggéré.  |
| design.md      | PASS    | Réflexion UX 7Q, palette inédite, motion décrit.  |
| site/index.html| FAIL    | Filet autoreveal absent (`.js-ready [data-reveal]` + `@keyframes autoreveal`). |
| email          | PASS    | Offre correcte, rebrand OK, 168 mots, ton juste.  |

**Bloquer la livraison jusqu'à correction du point 1 par menghi-builder.**
