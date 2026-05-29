from __future__ import annotations
import secrets
from datetime import datetime, timezone, timedelta
from .pdf_label import generate_label_pdf


def _tracking_number() -> str:
    year = datetime.now().year
    return f"MR-{year}-{secrets.token_hex(3).upper()}"


def generate_label(order) -> dict:
    tn = _tracking_number()
    addr = order.shipping_address or {}
    pdf = generate_label_pdf(
        tracking_number=tn,
        recipient={
            "first_name": order.customer_first_name,
            "last_name": order.customer_last_name,
            "email": order.customer_email,
            "address": addr,
        },
        point_id=order.mondial_relay_point_id,
    )
    return {"tracking_number": tn, "point_id": order.mondial_relay_point_id, "pdf_bytes": pdf}


def track(tracking_number: str, created_at: datetime | None = None) -> dict:
    """Mock progress based on hours since creation."""
    created_at = created_at or datetime.now(timezone.utc)
    hours = (datetime.now(timezone.utc) - created_at).total_seconds() / 3600
    history = [{"ts": created_at.isoformat(), "status": "label_generated", "label": "Etiquette generee"}]
    if hours >= 2:
        history.append({"ts": (created_at + timedelta(hours=2)).isoformat(), "status": "picked_up", "label": "Pris en charge"})
    if hours >= 24:
        history.append({"ts": (created_at + timedelta(hours=24)).isoformat(), "status": "in_transit", "label": "En transit"})
    if hours >= 48:
        history.append({"ts": (created_at + timedelta(hours=48)).isoformat(), "status": "at_relay", "label": "Disponible en point relais"})
    if hours >= 96:
        history.append({"ts": (created_at + timedelta(hours=96)).isoformat(), "status": "delivered", "label": "Livre"})
    last = history[-1]
    return {"tracking_number": tracking_number, "status": last["status"], "last_update": last["ts"], "history": history}
