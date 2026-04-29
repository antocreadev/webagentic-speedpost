# Brief — Étape 5 : Email de conversion (post-publish)

**Agent :** `menghi-emailer`
**Livrables :** `dist/<slug>/email.txt` + `dist/<slug>/email.html`
**Pré-requis :** lire `workflows/rules.md` (notamment la section **Agence Menghi + Offre commerciale**), lire `dist/<slug>/research.md`, lire `dist/<slug>/design.md`, **disposer de l'URL GitHub Pages** publiée à l'étape `06_publish` (champ `pages_url` dans `dist/_progress.json`).

## Objectif

Rédiger un email **engagé, vendeur, crédible** qui :

1. **Accroche** le gérant sur un détail spécifique de son affaire (preuve qu'on a regardé son cas)
2. **Présente Menghi Computer Science** comme une agence tech + créative complète (web, graphisme, réseaux sociaux, applis/logiciels sur mesure)
3. **Donne le lien public du site démo** en clair (URL GitHub Pages)
4. **Vend le vrai différenciateur** : on code à la main, pas de template, entièrement personnalisable
5. **Détaille le contenu du 1500€** — tout ce qui est inclus (SEO, GEO pour IA, perf, graphisme, hébergement, support…)
6. **Projette les bénéfices concrets** — visibilité, crédibilité, image, trafic, apparition dans ChatGPT/Gemini/Perplexity quand on cherche son métier
7. **Ouvre sur l'action** — mise en ligne rapide + possibilité d'ajuster

## Structure type (à adapter, ne pas recopier aveuglément)

```
Sujet : <accroche tendue, ≤ 55 chars, spécifique au client — pas de "Votre nouveau site">

<Salutation adaptée (ex. "Bonjour Mme Durand" si proprietaire_nom exploitable, sinon "Bonjour").>

<ACCROCHE PERSONNALISÉE — 2-3 phrases. Cite 2 faits précis extraits de research.md (spécialité, vue, note Google, détail d'un avis positif récurrent, emplacement). Montre qu'on a réellement regardé leur affaire. Ne jamais commencer par "Je me permets de vous contacter...".>

<PRÉSENTATION DE MENGHI — 1 paragraphe court. Exemple :>
Chez **Menghi Computer Science**, nous sommes une petite équipe tech et créative basée en France. On fait du développement web sur-mesure, du graphisme (logos, identité visuelle, affiches), du marketing digital & réseaux sociaux, et des applications métier dédiées. Tout sous le même toit, tout codé ou conçu à la main.

<TRANSITION VERS LE LIVRABLE — 1 phrase qui explique la démarche (on vous a fait une démo sans engagement) et donne le lien :>

**Le site que j'ai conçu pour vous :** https://antocreadev.github.io/menghicomputerscience-<slug>/

<CE QUI A ÉTÉ MIS EN AVANT — 3 à 4 puces spécifiques au client, tirées de research/design. Exemples ancrés (pas génériques) :>
- « Vos glaces artisanales Lilou — le différenciateur cité en boucle dans vos avis — ont leur propre section dès l'ouverture. »
- « La vue sur le port de Taverna mise en scène en image d'accueil, parce que c'est ce que vos visiteurs racontent. »

<DIFFÉRENCIATEUR MENGHI — 1 paragraphe court, vendeur mais factuel :>
Ce n'est pas un site template. Chaque ligne de code est écrite à la main pour votre maison — ce qui veut dire qu'on peut changer absolument tout : couleurs, textes, photos, sections, structure, jusqu'au moindre détail. Vous n'êtes pas enfermé dans un thème WordPress.

<CE QUE 1500€ COUVRE — cadre clair, à lister intégralement. Reproduire l'offre mot-pour-mot depuis `rules.md`. Ne pas synthétiser ni reformuler les chiffres. Structure markdown :>

## Ce qui est inclus dans le 1500€

- **Site codé main, sur-mesure** — zéro template, tout est modifiable (textes, photos, couleurs, sections, polices)
- **Identité graphique** cohérente (logo, palette, visuels)
- **Référencement Google (SEO)** — technique + éditorial : balisage, mots-clés, sitemap, structured data
- **Optimisation performance** — chargement rapide, mobile-first
- **Indexation & citations par les IA** — ChatGPT, Gemini, Perplexity, Copilot : vous apparaissez quand un client demande "bon <métier> à <ville>"
- **Hébergement + nom de domaine** gérés par nous
- **Maintenance + support** direct sous 24h pendant toute l'année 1
- **Aucun abonnement la première année** — 0€/mois
- **Prix :** ~~1740€~~ **1500€** — une seule fois, tout compris

## Ensuite

- **Année 2 :** 20€/mois (maintenance + hébergement)
- **Option premium (+10€/mois) :**
  - agent IA sécurisé connecté à WhatsApp (vous demandez une modif en langage naturel, elle est appliquée)
  - modifications du site en temps réel
  - sauvegardes automatiques
  - versionning complet (rollback possible)
  - assistance 24/7

<PROJECTION BÉNÉFICES — 2-3 phrases orientées résultat :>
Concrètement : vous gagnez en **visibilité** (Google + IA), en **crédibilité** (un vrai site change le signal perçu), en **image** (cohérence graphique) et en **trafic qualifié**. Quand un voyageur demandera à ChatGPT « <catégorie> à <ville> », on veut que votre maison ressorte.

<CLÔTURE — 2 phrases. Action + souplesse :>
Si le rendu vous plaît en l'état, je peux mettre le site en ligne sur votre nom de domaine dès cette semaine. Si vous voulez ajuster quelque chose avant (photos, textes, sections, couleurs), dites-moi simplement ce que vous voudriez voir évoluer.

À très vite,

Anto
**Menghi Computer Science**
menghicomputerscience@gmail.com
06 43 87 91 14
```

## Règles

- **Longueur** : 320–450 mots corps (hors offre détaillée). Plus dense qu'avant parce qu'on explique plus.
- **Ton** : confiant, chaleureux, direct. Vendeur-conseil, pas marketing-agressif. "On sait ce qu'on fait" > "Cliquez maintenant !".
- **Personnalisation obligatoire** : ≥ 3 éléments factuels du research cités (différenciateur, avis récurrent, détail géographique, spécialité).
- **Offre** : le bloc 1500€ reproduit **mot-pour-mot** depuis `rules.md`. Les puces sont ordonnées exactement comme dans le brief rules.
- **Jargon** : SEO, IA, Google Maps, ChatGPT, Gemini, Perplexity = OK (mots connus). Core Web Vitals, JSON-LD, structured data, GEO = **interdits** (jargon pro inutile).
- **Interdit** : superlatifs creux ("révolutionnaire", "exceptionnel"), phrases clichés ("à l'ère du digital"), menaces ("sans site vous perdez des clients"), emojis, **caractère `—` (tiret cadratin U+2014)** — remplacer par `:`, `,`, `.` ou `()` selon le contexte.
- **URL GitHub Pages obligatoire** et en clair dans le corps, pas de `[cliquez ici](url)`.

## Version HTML

`email.html` = rendu soigné pour colle-dans-Gmail :

- `max-width: 640px`, marges auto
- `font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif`
- `line-height: 1.6`, `color: #111`
- H1 / H2 uniquement si utiles à la lisibilité (on peut rester en puces)
- Prix : `<s>1740€</s>` + `<strong>1500€</strong>`
- Lien GitHub Pages : `<a href="https://antocreadev.github.io/menghicomputerscience-<slug>/">https://antocreadev.github.io/menghicomputerscience-<slug>/</a>` en clair
- **Pas d'image distante** (risque spam/Gmail)

## Sortie

Retourner à l'orchestrateur :

- sujet retenu (≤ 55 chars)
- 3 éléments factuels personnalisés cités
- nombre de mots du corps
- URL GitHub Pages utilisée
