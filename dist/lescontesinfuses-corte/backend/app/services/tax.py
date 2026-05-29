from __future__ import annotations
from typing import Iterable
from ..config import settings


def tax_rate_for(kind: str) -> float:
    return settings.TVA_BOOK if kind == "book" else settings.TVA_OTHER


def compute_tva_for_line(line_total_cents: int, kind: str) -> int:
    """Return tax amount in cents (TVA included in line_total)."""
    rate = tax_rate_for(kind)
    # Price TTC -> tax = total * (rate / (100 + rate))
    return int(round(line_total_cents * (rate / (100.0 + rate))))


def compute_tva(items: Iterable[dict]) -> dict:
    total_tax = 0
    breakdown = {"5.5": 0, "20.0": 0}
    for it in items:
        rate = tax_rate_for(it["kind"])
        t = compute_tva_for_line(it["line_total_cents"], it["kind"])
        total_tax += t
        breakdown[str(rate)] += t
    return {"total_cents": total_tax, "breakdown": breakdown}
