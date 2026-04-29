"""Publish a client's site/ directory as a public GitHub repo + enable Pages.

Repo name pattern : `menghicomputerscience-<slug>` under the `antocreadev` account.
Requires `gh` CLI authenticated and `git` available.

Idempotent:
- re-runs just push new commits if the repo exists
- Pages stays enabled if already configured
"""
from __future__ import annotations

import subprocess
from pathlib import Path

from .paths import DIST_DIR

OWNER = "antocreadev"
REPO_PREFIX = "menghicomputerscience-"


def repo_name(slug: str) -> str:
    # GitHub repo names allow [a-zA-Z0-9._-], max 100 chars
    return f"{REPO_PREFIX}{slug}"[:100]


def pages_url(slug: str) -> str:
    return f"https://{OWNER}.github.io/{repo_name(slug)}/"


def _run(cmd: list[str], cwd: Path | None = None, check: bool = True,
         capture: bool = True) -> subprocess.CompletedProcess:
    return subprocess.run(
        cmd, cwd=str(cwd) if cwd else None, check=check, text=True,
        capture_output=capture,
    )


def _repo_exists(full: str) -> bool:
    r = subprocess.run(["gh", "repo", "view", full], capture_output=True, text=True)
    return r.returncode == 0


def _has_origin(site: Path) -> bool:
    r = subprocess.run(["git", "remote"], cwd=str(site), capture_output=True, text=True)
    return "origin" in r.stdout.split()


def publish(slug: str, *, commit_message: str | None = None,
            repo_description: str | None = None) -> str:
    """Publish `dist/<slug>/site/` to GitHub + enable Pages. Returns the Pages URL."""
    site = DIST_DIR / slug / "site"
    if not site.is_dir():
        raise FileNotFoundError(f"no site directory at {site}")
    if not (site / "index.html").is_file():
        raise FileNotFoundError(f"no index.html at {site}")

    full = f"{OWNER}/{repo_name(slug)}"

    # 1. git init (if fresh)
    if not (site / ".git").is_dir():
        _run(["git", "init", "-b", "main"], cwd=site)
        gi = site / ".gitignore"
        if not gi.exists():
            gi.write_text(".DS_Store\nThumbs.db\n", encoding="utf-8")

    # 2. stage + commit new/changed files
    _run(["git", "add", "-A"], cwd=site)
    status = _run(["git", "status", "--porcelain"], cwd=site).stdout
    if status.strip():
        msg = commit_message or f"Site premium — {slug}"
        _run(["git", "commit", "-m", msg], cwd=site)

    # 3. create remote repo if missing, then push
    if not _repo_exists(full):
        args = ["gh", "repo", "create", full, "--public", "--source", str(site), "--push"]
        if repo_description:
            args += ["--description", repo_description]
        _run(args, cwd=site, capture=False)
    else:
        if not _has_origin(site):
            _run(["git", "remote", "add", "origin", f"git@github.com:{full}.git"], cwd=site)
        _run(["git", "push", "-u", "origin", "main"], cwd=site, capture=False)

    # 4. enable GitHub Pages (main, /). Ignore if already enabled.
    pages = subprocess.run(
        ["gh", "api", "-X", "POST", f"/repos/{full}/pages",
         "-F", "source[branch]=main", "-F", "source[path]=/"],
        capture_output=True, text=True,
    )
    if pages.returncode != 0 and "409" not in pages.stderr and "already" not in pages.stderr.lower():
        # Try PUT to update existing config (best effort)
        subprocess.run(
            ["gh", "api", "-X", "PUT", f"/repos/{full}/pages",
             "-F", "source[branch]=main", "-F", "source[path]=/"],
            capture_output=True, text=True,
        )

    return pages_url(slug)
