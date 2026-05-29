# Brief — Étape 5 : Email de conversion (post-publish)

**Agent :** `menghi-emailer` (nom interne — produit livré = SpeedPost.fr)
**Livrables :** `dist/<slug>/email.txt` + `dist/<slug>/email.html`
**Pré-requis :** lire `workflows/rules.md` (section **SpeedPost.fr** + **Offre commerciale**), lire `dist/<slug>/research.md`, lire `dist/<slug>/design.md`, **disposer de l'URL GitHub Pages** publiée à l'étape `06_publish` (champ `pages_url` dans `dist/_progress.json`).

## Objectif

Email **court, simple, professionnel** qui :

1. **Accroche** sur 1-2 faits précis du commerce (preuve qu'on a regardé)
2. **Donne la démo** (URL GitHub Pages en clair)
3. **Propose 2 formules** simples au choix
4. **Signe** avec les crédentiels Mindlet pour la crédibilité

Pas de présentation longue d'agence. Pas de tableau de bénéfices. Pas de bloc « Année 2 ». La démo parle d'elle-même.

## Structure type (120-180 mots de corps)

```
Sujet : <accroche tendue, ≤ 55 chars, spécifique au client>

Bonjour <prénom si exploitable, sinon ->,

<ACCROCHE — 2 phrases max. 2-3 faits précis du commerce (spécialité, vue, note Google, détail d'un avis récurrent, emplacement). Pas de "Je me permets de...".>

J'ai préparé une démo gratuite de votre site, codée à la main, 100% personnalisable :
https://antocreadev.github.io/speedpost-<slug>/

<UNE phrase sur ce qu'on a mis en avant pour eux (ancrée dans le research).>

Deux formules au choix (tarifs HT) :
- 1500€ une fois + 20€/mois (maintenance, agent IA pour modifier le site, rapport SEO mensuel), sans engagement
- 89€/mois engagé 12 mois, mêmes services

Inclus dans les deux : hébergement, nom de domaine, SEO, indexation IA (ChatGPT, Gemini, Perplexity), support.

Si la démo vous plaît, je la mets en ligne sur votre nom de domaine cette semaine. Sinon, dites-moi ce qu'on ajuste.

Anto
SpeedPost.fr (WebAgentic Builder)
Un service de SAS Mindlet, Corte (Corse)
Lauréat PEPITE France & Corse, Start'in Corsica, Tecnulugia, Fundtruck Régional
contact@speedpost.fr  |  webagentic.speedpost.fr
```

## Règles

- **Longueur** : 120–180 mots corps **offre incluse** (court, vendeur, pas didactique).
- **Ton** : pro, direct, confiant. Pas marketing-agressif. Pas de superlatifs.
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
- nombre de mots du corps (doit être dans [120, 180])
- URL GitHub Pages utilisée
- chemins `email.txt`, `email.html`
