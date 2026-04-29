"""Canonical paths for the pipeline."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / "clients.csv"
TOOLS_DIR = ROOT / "tools"
WORKFLOWS_DIR = ROOT / "workflows"
DIST_DIR = ROOT / "dist"
PROGRESS_PATH = DIST_DIR / "_progress.json"


def client_dir(slug: str) -> Path:
    return DIST_DIR / slug


def ensure_dist() -> None:
    DIST_DIR.mkdir(exist_ok=True)
