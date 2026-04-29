"""Slug helper — ASCII-fold a business name and suffix with a place_id fragment.

Collisions on `nom` exist in the CSV, so we always append a short place_id tail
to guarantee uniqueness per client directory.
"""
from __future__ import annotations

import re
import unicodedata


_NON_ALNUM = re.compile(r"[^a-z0-9]+")


def _ascii_fold(text: str) -> str:
    normalized = unicodedata.normalize("NFKD", text)
    return "".join(c for c in normalized if not unicodedata.combining(c))


def slugify(name: str, place_id: str | None = None, max_len: int = 60) -> str:
    base = _NON_ALNUM.sub("-", _ascii_fold(name or "").lower()).strip("-")
    if not base:
        base = "client"
    base = base[:max_len].rstrip("-")
    if place_id:
        tail = _NON_ALNUM.sub("", place_id.lower())[-8:]
        if tail:
            return f"{base}-{tail}"
    return base
