# Codex bootstrap

Ce dossier permet d'utiliser ce projet dans Codex sans casser le setup Claude Code existant.

## Principe

- `.claude/agents/` reste la source de vérité des prompts sous-agents.
- `.Codex/agents/` est un miroir pour Codex, régénéré par `python3 tools/init_codex.py`.
- Ne pas éditer manuellement les fichiers miroir si le changement doit aussi vivre côté Claude : modifier `.claude/agents/*`, puis relancer le script.

## Démarrage Codex

1. Lire `AGENTS.md`
2. Relire `workflows/rules.md`
3. Vérifier l'état du pipeline :

```bash
python3 -c "import sys; sys.path.insert(0,'.'); from tools.progress import summary, next_pending_place_id; print(summary()); print('next:', next_pending_place_id())"
```

4. Travailler client par client selon l'ordre :
   - `menghi-researcher`
   - `menghi-designer`
   - `menghi-builder`
   - `06_publish`
   - `menghi-emailer`
   - `menghi-reviewer`

## Si Codex n'a pas les sous-agents repo-spécifiques chargés

Utiliser les prompts dans `.Codex/agents/*.md` comme références opérationnelles et suivre les briefs de `workflows/`.
