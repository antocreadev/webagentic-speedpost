from __future__ import annotations


class LibriSoftClient:
    """Placeholder client to sync stock & push orders to LibriSoft.
    Will be implemented when we have credentials. For now stubbed."""

    def __init__(self, api_key: str | None = None, base_url: str | None = None):
        self.api_key = api_key
        self.base_url = base_url

    def sync_stock(self) -> dict:
        return {"status": "not_configured", "synced": 0}

    def push_order(self, order_id: str) -> dict:
        return {"status": "not_configured", "order_id": order_id}
