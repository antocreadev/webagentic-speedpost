"""Initialize the Codex mirror from the existing Claude Code setup.

This project was originally authored for Claude Code. We keep `.claude/` as the
source of truth and materialize a `.Codex/` mirror so Codex can continue the
same client-production pipeline without disturbing the Claude workflow.
"""
from __future__ import annotations

from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
CLAUDE_DIR = ROOT / ".claude"
CLAUDE_AGENTS_DIR = CLAUDE_DIR / "agents"
CODEX_DIR = ROOT / ".Codex"
CODEX_AGENTS_DIR = CODEX_DIR / "agents"
CLAUDE_SETTINGS_PATH = CLAUDE_DIR / "settings.local.json"
CODEX_SETTINGS_PATH = CODEX_DIR / "settings.local.json"
CODEX_README_PATH = CODEX_DIR / "README.md"

CODEX_README = """# Codex bootstrap

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
"""


def _write_if_changed(path: Path, content: str) -> bool:
    if path.exists() and path.read_text(encoding="utf-8") == content:
        return False
    path.write_text(content, encoding="utf-8")
    return True


def main() -> int:
    if not CLAUDE_DIR.is_dir():
        raise SystemExit("Missing .claude/ directory: cannot initialize Codex mirror.")
    if not CLAUDE_AGENTS_DIR.is_dir():
        raise SystemExit("Missing .claude/agents/: cannot initialize Codex mirror.")

    CODEX_AGENTS_DIR.mkdir(parents=True, exist_ok=True)

    updated = 0
    mirrored = []

    for src in sorted(CLAUDE_AGENTS_DIR.glob("*.md")):
        dst = CODEX_AGENTS_DIR / src.name
        if _write_if_changed(dst, src.read_text(encoding="utf-8")):
            updated += 1
        mirrored.append(dst.relative_to(ROOT).as_posix())

    if CLAUDE_SETTINGS_PATH.exists():
        if _write_if_changed(
            CODEX_SETTINGS_PATH,
            CLAUDE_SETTINGS_PATH.read_text(encoding="utf-8"),
        ):
            updated += 1

    if _write_if_changed(CODEX_README_PATH, CODEX_README):
        updated += 1

    print("Codex mirror initialized.")
    print(f"Mirrored agents: {len(mirrored)}")
    for rel in mirrored:
        print(f"- {rel}")
    print(f"Files written or refreshed: {updated}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
