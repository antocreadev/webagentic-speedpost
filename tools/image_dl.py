"""Download an image URL to a local file (stdlib only).

Convention: images live inside `dist/<slug>/site/assets/images/` so the `site/`
folder is self-contained (portable, zippable, hostable anywhere).
HTML references them via relative path `./assets/images/<filename>`.

Idempotent: if the target file already exists and is non-empty, it's reused.
"""
from __future__ import annotations

import hashlib
import mimetypes
import re
import urllib.parse
import urllib.request
from pathlib import Path

_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)
_EXT_FROM_CT = {
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/pjpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/avif": ".avif",
    "image/svg+xml": ".svg",
}
_SAFE = re.compile(r"[^a-z0-9._-]+")


def _slug_name(hint: str, max_len: int = 50) -> str:
    s = _SAFE.sub("-", hint.strip().lower()).strip("-.")
    return s[:max_len] or "image"


def _pick_extension(resp, url: str) -> str:
    ct = (resp.headers.get("Content-Type") or "").split(";")[0].strip().lower()
    if ct in _EXT_FROM_CT:
        return _EXT_FROM_CT[ct]
    guess = mimetypes.guess_extension(ct) if ct else None
    if guess:
        return guess
    path = urllib.parse.urlparse(url).path
    for known in (".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg"):
        if path.lower().endswith(known):
            return ".jpeg" if known == ".jpeg" else known
    return ".jpg"


def download(
    url: str,
    out_dir: Path | str,
    name_hint: str = "",
    *,
    timeout: float = 20.0,
    max_bytes: int = 12_000_000,
) -> Path:
    """Download `url` into `out_dir`. Returns the local path.

    - `name_hint` seeds the filename. If empty, uses an MD5 of the URL.
    - Extension is inferred from Content-Type, falling back to URL path, then `.jpg`.
    - Refuses to write files larger than `max_bytes` (safeguard).
    """
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    base = _slug_name(name_hint) if name_hint else hashlib.md5(url.encode("utf-8")).hexdigest()[:12]

    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": _UA,
            "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
            "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
            "Referer": "https://www.google.com/",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        ext = _pick_extension(resp, url)
        dest = out_dir / f"{base}{ext}"
        if dest.exists() and dest.stat().st_size > 0:
            return dest
        written = 0
        with dest.open("wb") as fh:
            while True:
                chunk = resp.read(65536)
                if not chunk:
                    break
                written += len(chunk)
                if written > max_bytes:
                    fh.close()
                    dest.unlink(missing_ok=True)
                    raise IOError(f"Image too large (>{max_bytes} bytes): {url}")
                fh.write(chunk)
    return dest


def relative_for_html(local_path: Path, site_dir: Path) -> str:
    """Return a POSIX relative path usable inside `site/index.html`."""
    rel = Path(local_path).resolve().relative_to(Path(site_dir).resolve())
    return "./" + rel.as_posix()
