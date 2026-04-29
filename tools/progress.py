"""Resumable progress tracker — one JSON file keyed by place_id.

Writes atomically (tmpfile + rename) so a crash mid-write can't corrupt state.
"""
from __future__ import annotations

import json
import os
import tempfile
from datetime import datetime, timezone
from typing import Any

from .paths import DIST_DIR, PROGRESS_PATH, ensure_dist


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def _load() -> dict[str, Any]:
    if not PROGRESS_PATH.exists():
        return {"clients": {}}
    try:
        return json.loads(PROGRESS_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {"clients": {}}


def _save(data: dict[str, Any]) -> None:
    ensure_dist()
    fd, tmp_path = tempfile.mkstemp(prefix=".progress.", dir=str(DIST_DIR))
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as fh:
            json.dump(data, fh, indent=2, ensure_ascii=False)
        os.replace(tmp_path, PROGRESS_PATH)
    except Exception:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)
        raise


def get_status(place_id: str) -> dict[str, Any]:
    return _load()["clients"].get(place_id, {"status": "pending", "steps_done": []})


def mark(place_id: str, *, slug: str | None = None, step: str | None = None,
         status: str | None = None, **extra: Any) -> None:
    data = _load()
    entry = data["clients"].setdefault(place_id, {"status": "pending", "steps_done": []})
    if slug:
        entry["slug"] = slug
    if step and step not in entry["steps_done"]:
        entry["steps_done"].append(step)
    if status:
        entry["status"] = status
    entry.update(extra)
    entry["updated_at"] = _now_iso()
    _save(data)


def next_pending_place_id() -> str | None:
    data = _load()
    done = {pid for pid, e in data["clients"].items() if e.get("status") == "done"}
    from .csv_client import iter_clients  # local import to avoid cycle
    for c in iter_clients():
        if c.place_id and c.place_id not in done:
            return c.place_id
    return None


def summary() -> dict[str, int]:
    data = _load()
    counts: dict[str, int] = {}
    for entry in data["clients"].values():
        counts[entry.get("status", "pending")] = counts.get(entry.get("status", "pending"), 0) + 1
    return counts
