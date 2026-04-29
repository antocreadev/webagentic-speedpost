# Workflows — briefs agentiques

Les fichiers de ce dossier sont des **briefs markdown**, pas des scripts. Ils sont lus par Claude Code (orchestrateur principal) et par les sous-agents spécialisés (`.claude/agents/`) pour produire un livrable **state-of-the-art 2025–2026** par client.

## Équipe

| Sous-agent           | Étape | Livrable attendu                              |
|----------------------|-------|------------------------------------------------|
| `menghi-researcher`  | 1     | `dist/<slug>/research.md`                     |
| `menghi-designer`    | 2     | `dist/<slug>/design.md`                       |
| `menghi-builder`     | 3     | `dist/<slug>/site/index.html` (bespoke, auto-suffisant) |
| `menghi-emailer`     | 4     | `dist/<slug>/email.md` + `email.html`        |
| `menghi-reviewer`    | 5     | `dist/<slug>/review.md` (PASS ou remédiations) |

L'orchestrateur (Claude Code principal) lit `rules.md`, pioche le prochain client non traité via les helpers Python de `tools/`, délègue dans l'ordre ci-dessus, puis marque le progrès.

## Boucle par client

```
pick next pending client (tools/progress.next_pending_place_id)
  └─ delegate → menghi-researcher    → research.md
  └─ delegate → menghi-designer      → design.md
  └─ delegate → menghi-builder       → site/index.html
  └─ run      → tools/publish.py     → repo GitHub + Pages → pages_url
  └─ run      → tools/csv_update.set_site(place_id, pages_url)  → clients.csv colonne `site`
  └─ delegate → menghi-emailer       → email.md / email.html (utilise pages_url)
  └─ delegate → menghi-reviewer      → review.md (si FAIL → boucle ciblée)
  └─ tools.progress.mark(status="done")
```

## Briefs

- [`rules.md`](rules.md) — contraintes globales non-négociables (à citer par tous les agents)
- [`01_research.md`](01_research.md) — brief du researcher
- [`02_design.md`](02_design.md) — brief du designer
- [`03_build.md`](03_build.md) — brief du builder
- [`04_email.md`](04_email.md) — brief du emailer
- [`05_review.md`](05_review.md) — brief du reviewer

## Helpers Python (dossier `tools/`)

Les tools sont des utilitaires mécaniques — lecture CSV, slug, progrès, embed Maps, recherche web de secours. Ils ne font pas de design ni de rédaction.

Appel type depuis un shell :

```bash
# Prochain place_id à traiter
python3 -c "import sys; sys.path.insert(0,'.'); from tools.progress import next_pending_place_id; print(next_pending_place_id())"

# Marquer un client comme terminé
python3 -c "import sys; sys.path.insert(0,'.'); from tools.progress import mark; mark('ChIJ...', slug='xxx', status='done')"

# Résumé du pipeline
python3 -c "import sys; sys.path.insert(0,'.'); from tools.progress import summary; print(summary())"
```
