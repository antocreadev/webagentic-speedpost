# Brief — Étape 5 : Email de conversion (post-publish)

**Agent :** `menghi-emailer` (nom interne — produit livré = SpeedPost.fr)
**Livrables :** `dist/<slug>/email.txt` + `dist/<slug>/email.html`
**Pré-requis :** lire `workflows/rules.md` (section **SpeedPost.fr** + **Offre commerciale**), lire `dist/<slug>/research.md`, lire `dist/<slug>/design.md`, **disposer de l'URL GitHub Pages** publiée à l'étape `06_publish` (champ `pages_url` dans `dist/_progress.json`).

## Objectif

Email **clair, chaleureux, professionnel** qui **explique bien ce qu'on propose** :

1. **Accroche** sur 1-2 faits précis du commerce (preuve qu'on a regardé)
2. **Cadre la maquette** : pour le moment c'est un aperçu offert, fait pour donner le goût du rendu et montrer qu'on s'est intéressé à eux. Pas une facture. URL GitHub Pages en clair.
3. **Rassure sur la personnalisation** : le site final est 100% modifiable.
4. **Explicite les services** livrés avec le site : rapport mensuel des visites, stratégie SEO, agent IA pour modifier le site, garantie première page Google (recherches locales naturelles + IA).
5. **Propose 2 formules** simples au choix (HT).
6. **Rassure sur la flexibilité humaine** : prix discutable, paiement échelonnable, on s'adapte.
7. **Signe** avec les crédentiels Mindlet pour la crédibilité.

Pas de présentation longue d'agence. Email explicatif mais aéré : le gérant doit comprendre que c'est une maquette, ce que contient l'offre, et qu'on est humains et flexibles.

## Structure type (180-280 mots de corps)

```
Sujet : <accroche tendue, ≤ 55 chars, spécifique au client>

Bonjour <prénom si exploitable, sinon ->,

<ACCROCHE — 2 phrases max. 2-3 faits précis du commerce (spécialité, vue, note Google, détail d'un avis récurrent, emplacement). Pas de "Je me permets de...".>

Pour vous montrer concrètement (et parce que votre <établissement> m'a donné envie de m'y pencher), je vous ai préparé une première maquette de votre site, codée à la main :
https://antocreadev.github.io/speedpost-<slug>/

C'est une maquette de présentation, juste pour vous donner le goût du rendu : le site final est 100% personnalisable (textes, photos, couleurs, sections, tout se modifie).

Ce qu'on propose avec le site :
- un rapport mensuel des visites de votre site
- une stratégie de référencement (SEO) suivie
- un agent IA pour ajouter ou modifier votre site facilement, en langage naturel
- l'engagement de vous positionner en première page Google sur de vraies recherches locales naturelles, en SEO local et sur les IA (ChatGPT, Gemini, Perplexity)

Deux formules au choix (tarifs HT) :
- 1500€ une fois + 20€/mois, sans engagement
- 89€/mois engagé 12 mois
Inclus dans les deux : hébergement et nom de domaine.

Et surtout : le prix reste discutable, on peut échelonner le paiement en plusieurs fois, on s'adapte. On est une petite équipe humaine et joignable.

Si ça vous plaît, je le mets en ligne sur votre nom de domaine cette semaine. Sinon, dites-moi simplement ce qu'on ajuste.

Anto
SpeedPost.fr (WebAgentic Builder)
Un service de SAS Mindlet, Corte (Corse)
Lauréat PEPITE France & Corse, Start'in Corsica, Tecnulugia, Fundtruck Régional
contact@speedpost.fr  |  webagentic.speedpost.fr
```

## Règles

- **Longueur** : 180–280 mots corps **offre + services inclus**. Explicatif mais lisible et aéré.
- **Ton** : pro, chaleureux, humain, confiant. Pas marketing-agressif ni pressant. Pas de superlatifs.
- **Cadrage maquette obligatoire** : il doit être explicite que le lien est une maquette/aperçu offert (donner le goût, montrer l'intérêt), pas un produit facturé.
- **Services obligatoires à expliciter** : rapport mensuel des visites, stratégie SEO, agent IA de modification, garantie première page Google (recherches locales naturelles + IA).
- **Flexibilité obligatoire à expliciter** : prix discutable, paiement en plusieurs fois, on s'adapte, équipe humaine.
- **Garantie Google crédible** : « on s'engage à vous positionner en première page sur des recherches locales pertinentes », jamais une promesse absolue invérifiable (« 1er partout »).
- **Personnalisation obligatoire** : ≥ 2 faits factuels du research cités.
- **URL GitHub Pages en clair** dans le corps (pas de "cliquez ici" masqué).
- **Toujours préciser « HT »** sur les prix.
- **Jargon OK** : SEO, IA, ChatGPT, Gemini, Perplexity, agent IA.
- **Jargon interdit** : Core Web Vitals, JSON-LD, structured data, GEO, Lighthouse, Lenis, etc.
- **Interdit** : Menghi / Menghi Computer Science / menghicomputerscience@gmail.com / 06 43 87 91 14 (anciens contacts), superlatifs creux ("révolutionnaire"), clichés ("à l'ère du digital"), menaces ("sans site vous perdez des clients"), emojis, **em-dash `—` (U+2014)** : remplacer par `:`, `,`, `.` ou `()`.

## Version HTML

`email.html` = rendu soigné, collable dans Gmail :

- `max-width: 640px`, marges auto
- `font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif`
- `line-height: 1.6`, `color: #111`
- Lien GitHub Pages : `<a href="https://antocreadev.github.io/speedpost-<slug>/">…</a>` en clair
- Lien `mailto:contact@speedpost.fr` + lien `https://webagentic.speedpost.fr` dans la signature
- **Aucune image distante** (risque spam/Gmail)

## Sortie (retour à l'orchestrateur)

- sujet retenu (≤ 55 chars)
- 2-3 faits factuels cités (preuve de personnalisation)
- nombre de mots du corps (doit être dans [180, 280])
- URL GitHub Pages utilisée
- chemins `email.txt`, `email.html`
