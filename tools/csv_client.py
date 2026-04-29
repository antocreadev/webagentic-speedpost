"""Typed access to rows in clients.csv.

Expose a `Client` dataclass + iterator. Key each client by `place_id`.
"""
from __future__ import annotations

import csv
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterator

from .paths import CSV_PATH


@dataclass
class Client:
    row_index: int  # 1-based, matches the CSV row (header is row 1)
    raw: dict[str, str] = field(repr=False)

    # Convenience accessors
    @property
    def place_id(self) -> str:
        return self.raw.get("place_id", "").strip()

    @property
    def nom(self) -> str:
        return self.raw.get("nom", "").strip()

    @property
    def categorie_principale(self) -> str:
        return self.raw.get("categorie_principale", "").strip()

    @property
    def ville(self) -> str:
        return self.raw.get("ville", "").strip()

    @property
    def code_postal(self) -> str:
        return self.raw.get("code_postal", "").strip()

    @property
    def adresse_complete(self) -> str:
        return self.raw.get("adresse_complete", "").strip()

    @property
    def telephone(self) -> str:
        return self.raw.get("telephone", "").strip()

    @property
    def emails(self) -> str:
        return self.raw.get("emails", "").strip()

    @property
    def site(self) -> str:
        return self.raw.get("site", "").strip()

    @property
    def latitude(self) -> float | None:
        v = self.raw.get("latitude", "").strip()
        try:
            return float(v) if v else None
        except ValueError:
            return None

    @property
    def longitude(self) -> float | None:
        v = self.raw.get("longitude", "").strip()
        try:
            return float(v) if v else None
        except ValueError:
            return None

    @property
    def note(self) -> str:
        return self.raw.get("note", "").strip()

    @property
    def nombre_avis(self) -> str:
        return self.raw.get("nombre_avis", "").strip()

    @property
    def horaires_ouverture(self) -> str:
        return self.raw.get("horaires_ouverture", "").strip()

    @property
    def mots_cles_recherche(self) -> str:
        return self.raw.get("mots_cles_recherche", "").strip()

    @property
    def thumbnail(self) -> str:
        return self.raw.get("thumbnail", "").strip()

    @property
    def google_maps_url(self) -> str:
        return self.raw.get("google_maps_url", "").strip()


def iter_clients(csv_path: Path = CSV_PATH) -> Iterator[Client]:
    with csv_path.open("r", encoding="utf-8", newline="") as fh:
        reader = csv.DictReader(fh)
        for i, row in enumerate(reader, start=2):  # row 1 is header
            yield Client(row_index=i, raw=row)


def get_client(index: int | None = None, place_id: str | None = None) -> Client | None:
    """Fetch a single client. `index` is 1-based (matches CSV row). `place_id` wins if both provided."""
    for c in iter_clients():
        if place_id and c.place_id == place_id:
            return c
        if index is not None and c.row_index == index:
            return c
    return None


def total_clients() -> int:
    n = 0
    with CSV_PATH.open("r", encoding="utf-8", newline="") as fh:
        reader = csv.reader(fh)
        next(reader, None)
        for _ in reader:
            n += 1
    return n
