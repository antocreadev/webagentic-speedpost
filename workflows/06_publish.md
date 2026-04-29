# Brief — Étape 4 bis : Publication GitHub Pages

**Exécuté par :** orchestrateur (action mécanique, pas de sous-agent)
**Livrables :** repo GitHub `antocreadev/menghicomputerscience-<slug>` public + GitHub Pages activée + URL retournée
**Pré-requis :** `dist/<slug>/site/index.html` + assets locaux présents (étape 3 validée, aucun hotlink résiduel)

## Objectif

Publier le dossier `site/` du client sur un repo GitHub public dédié, activer GitHub Pages, et rendre l'URL publique utilisable dans l'email (étape 5).

## Place dans le pipeline

Exécuter **avant** l'étape email (ex-étape 4) : l'email doit pointer vers l'URL GitHub Pages, pas un chemin local.

Ordre final :
```
01_research → 02_design → 03_build → 06_publish → 04_email → 05_review
```

## Action

```python
import sys; sys.path.insert(0, '.')
from tools.publish import publish
from tools.progress import mark
from tools.csv_update import set_site

slug = "<slug>"
place_id = "<place_id>"
url = publish(slug, commit_message="Site premium, <Nom>", repo_description="Site demo <Nom>, Mindlet")
print(url)

# Mémoriser l'URL pour l'email + progress
mark(place_id, step="publish", pages_url=url, repo=f"antocreadev/menghicomputerscience-{slug}")

# Persister l'URL dans la colonne `site` de clients.csv (source de vérité finale)
set_site(place_id, url)
```

Le tool fait :
1. `git init -b main` dans `dist/<slug>/site/` si besoin + ajoute `.gitignore`
2. `git add -A && git commit -m "..."` si des changements sont détectés
3. `gh repo create antocreadev/menghicomputerscience-<slug> --public --source . --push` (ou push sur remote existant)
4. `gh api POST /repos/.../pages source[branch]=main source[path]=/`
5. renvoie `https://antocreadev.github.io/menghicomputerscience-<slug>/`

Puis `tools.csv_update.set_site(place_id, url)` écrit l'URL dans la colonne `site` de `clients.csv` (rewrite atomique tmp + `os.replace`, source unique de vérité).

Idempotent : les appels répétés ne cassent pas l'existant. Les commits vides sont skippés. `set_site` ne réécrit la ligne que si la valeur change.

## Propagation temps de déploiement

GitHub Pages met **1 à 3 minutes** pour servir la première version après création du repo. L'orchestrateur peut enchaîner sur l'étape email sans attendre (l'URL est prédictible, elle sera live quand le prospect clique).

## Règles

- **Toujours exécuter après le build** et **avant l'email**.
- **Jamais** en parallèle avec d'autres clients dans la même session interactive (rate-limit GitHub). Pour un batch, espacer `sleep 3` entre deux clients.
- **Nom du repo** figé : `menghicomputerscience-<slug>`. Ne pas dévier.
- **Pas de rewrite de l'historique** : chaque modification d'un site déjà publié crée un nouveau commit, pas un `push --force`.
- **En cas d'erreur gh** : ne pas essayer de « fixer » le remote en supprimant le repo — stop et signaler à l'utilisateur.

## Sortie

- URL Pages écrite dans `dist/_progress.json` (champ `pages_url`)
- Orchestrateur récupère l'URL pour le brief email (étape 5)
