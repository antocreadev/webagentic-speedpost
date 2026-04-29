# Brief — Étape 1 : Recherche & collecte enrichie

**Agent :** `menghi-researcher`
**Livrable :** `dist/<slug>/research.md`
**Pré-requis :** lire `workflows/rules.md`

## Objectif

Construire une base fiable de contenu et d'assets pour un client donné, en partant de sa ligne dans `clients.csv` et d'une recherche web ciblée.

## Inputs (fournis par l'orchestrateur)

- Le `place_id` du client
- Le slug calculé (`tools/slugify.py`)
- La ligne CSV sous forme de dict (toutes les 44 colonnes)

## Démarche attendue

1. **Exploiter le CSV d'abord**
   - Noter `premiere_image` et `thumbnail` → priorité 1 des assets visuels (vraies photos Google Maps).
   - Extraire catégories, horaires, note, nombre d'avis, adresse, lat/lng, téléphone, emails.
   - Lire `mots_cles_recherche` pour affiner l'identité.

2. **Recherche web (≥ 4 requêtes)**
   Utiliser `WebSearch` avec au minimum :
   - `"<nom> <ville>"`
   - `"<nom> <ville> avis"`
   - `"<nom> <ville> menu"` ou `"<nom> <ville> carte"`
   - `"<categorie_principale> <ville>"` (pour le contexte concurrentiel)

3. **Extraction des pages pertinentes**
   Avec `WebFetch`, récupérer 2-4 URLs parmi les résultats (ex. restaurantguru, tripadvisor, visit-corsica, pagesjaunes, site perso si présent). Extraire :
   - extraits de descriptions/avis **positifs uniquement**
   - `og:image` → candidats visuels priorité 2
   - éléments différenciants mentionnés plusieurs fois

4. **Images Unsplash (fallback thématique)**
   Uniquement si aucune image pertinente n'a été trouvée. Utiliser Unsplash.com avec recherche ciblée : `<categorie> <ville>` + validation visuelle (cohérence activité ET localisation). Jamais `source.unsplash.com`.

5. **Téléchargement local obligatoire**
   Télécharger tous les candidats retenus dans `dist/<slug>/site/assets/images/` via `tools.image_dl.download(url, out_dir, name_hint)`. Cela sert à :
   - valider que l'URL répond (HTTP 200 + type image)
   - rendre la démo auto-suffisante (pas de hotlink)
   - donner au designer/builder des fichiers locaux réutilisables

   Exemple shell :
   ```bash
   python3 -c "import sys; sys.path.insert(0,'.'); from pathlib import Path; from tools.image_dl import download; p = download('https://lh3...', Path('dist/<slug>/site/assets/images'), 'hero-port-taverna'); print(p)"
   ```

   Dans la table des assets visuels de `research.md`, la colonne **URL** indique le **chemin local** (`./assets/images/xxx.jpg`), et la colonne **Source** l'URL d'origine (pour traçabilité).

## Structure du livrable `research.md`

```markdown
# Recherche — <Nom> (<Ville>)

## 1. Synthèse business
- **Activité :** <catégorie principale + sous-catégories>
- **Cible :** <profil client déduit, saisonnalité si pertinent>
- **Proposition de valeur :** <ce qui ressort des avis positifs, 2-3 axes>
- **Ton & image de marque :** <chaleureux / élégant / maritime / montagne / rustic…>
- **Localisation :** <adresse + contexte géographique>
- **Note Google :** <note>/5 sur <N> avis
- **Horaires :** <lisibles, formatés>
- **Contact :** téléphone, email si disponibles
- **Site actuel :** <URL ou "aucun">

## 2. Contenu exploitable
### Résumés / descriptions extraites
<3-6 citations ou paraphrases des pages web, positives uniquement, sourcées>

### Éléments différenciants
- <3-5 points factuels>

## 3. Assets visuels

| # | URL | Description | Source | Pertinence | Recommandation |
|---|-----|-------------|--------|------------|----------------|
| 1 | <url> | Photo de la terrasse côté port | CSV premiere_image | élevée | hero |
| 2 | <url> | Plat signature (poulpe grillé) | og:image restaurantguru | élevée | section carte |
| 3 | <url> | Vue générale du village | og:image visit-corsica | moyenne | section histoire |
| ... |

## 4. Signaux pour le designer
- **Archétype suggéré :** editorial / maritime / rustic / minimal-luxe
- **Palette évoquée :** <couleurs perçues dans les photos, ex. "bleu nuit, sable, terracotta">
- **Ambiance :** <mots-clés pour guider le designer>
```

## Règles strictes

- **Jamais de signaux négatifs** dans `research.md`. Filtrer les avis 1-2★, ne pas citer de critique.
- **Toujours sourcer** les citations (URL ou colonne CSV).
- **Toujours valider** la pertinence d'une image avant de la lister (activité + localisation).
- Si aucune info utile trouvée, marquer la section comme `_à compléter_` plutôt qu'inventer.

## Sortie

Écrire `dist/<slug>/research.md` et retourner à l'orchestrateur un résumé ≤ 10 lignes :
- nombre de sources exploitées
- nombre d'assets visuels classés priorité 1
- archétype suggéré
- champs manquants non résolus (à signaler à l'étape suivante)
