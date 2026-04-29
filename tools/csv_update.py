"""Atomic in-place update of `clients.csv` (stdlib only).

Rewrites the whole CSV to a tmp file then `os.replace`, so a crash mid-write
can't corrupt the 5.8 MB source. Safe to call once per client at the end of
the pipeline.
"""
from __future__ import annotations

import csv
import os
import tempfile

from .paths import CSV_PATH


def set_field(place_id: str, field: str, value: str) -> bool:
    """Set `row[field] = value` for the row matching `place_id`.
    Returns True if the file was actually rewritten (field changed).
    """
    if not place_id:
        raise ValueError("place_id required")

    fd, tmp_path = tempfile.mkstemp(prefix=".clients.", suffix=".csv",
                                    dir=str(CSV_PATH.parent))
    updated = False
    try:
        with CSV_PATH.open("r", encoding="utf-8", newline="") as fin:
            reader = csv.DictReader(fin)
            fieldnames = reader.fieldnames or []
            if field not in fieldnames:
                raise KeyError(f"column {field!r} not in clients.csv")
            with os.fdopen(fd, "w", encoding="utf-8", newline="") as fout:
                writer = csv.DictWriter(fout, fieldnames=fieldnames, quoting=csv.QUOTE_MINIMAL)
                writer.writeheader()
                for row in reader:
                    if row.get("place_id", "").strip() == place_id:
                        if row.get(field, "") != value:
                            row[field] = value
                            updated = True
                    writer.writerow(row)
        if updated:
            os.replace(tmp_path, CSV_PATH)
        else:
            os.unlink(tmp_path)
    except Exception:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)
        raise
    return updated


def set_site(place_id: str, url: str) -> bool:
    """Shortcut: persist the published URL in the `site` column."""
    return set_field(place_id, "site", url)
