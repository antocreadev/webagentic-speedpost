from __future__ import annotations
import secrets
import random
from typing import Optional


def create_payment_intent(amount_cents: int, currency: str = "eur", metadata: Optional[dict] = None) -> dict:
    pid = "pi_mock_" + secrets.token_hex(8)
    secret = pid + "_secret_" + secrets.token_hex(8)
    return {
        "id": pid,
        "client_secret": secret,
        "status": "requires_confirmation",
        "amount": amount_cents,
        "currency": currency,
        "metadata": metadata or {},
    }


def confirm_payment_intent(intent_id: str) -> dict:
    # 95% succeed
    status = "succeeded" if random.random() < 0.95 else "failed"
    return {"id": intent_id, "status": status}
