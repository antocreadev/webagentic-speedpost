import pytest


@pytest.mark.asyncio
async def test_create_order_guest(client):
    # Find a book id
    books = (await client.get("/api/catalog/books?limit=1")).json()["items"]
    slug = books[0]["slug"]
    detail = await client.get(f"/api/admin/products?type=book")
    # bypass: use a known book; we need an id, query directly via search
    # Simpler: create order with kind=book and item_id=1 (seed first book)
    body = {
        "items": [{"kind": "book", "item_id": 1, "qty": 1}],
        "customer": {"first_name": "Pierre", "last_name": "Test", "email": "pierre@example.com", "phone": "0600000000"},
        "shipping": {"method": "mondial_relay", "mondial_relay_point_id": "PT-001"},
        "payment": {"method": "cb"},
        "terms_accepted": True,
    }
    r = await client.post("/api/orders", json=body)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["order_id"]
    assert data["public_token"]

    # Retrieve
    r2 = await client.get(f"/api/orders/{data['order_id']}?token={data['public_token']}")
    assert r2.status_code == 200
    assert r2.json()["status"] == "pending"


@pytest.mark.asyncio
async def test_lookup_otp_flow(client):
    # Seed an order first
    body = {
        "items": [{"kind": "book", "item_id": 1, "qty": 1}],
        "customer": {"first_name": "Alice", "last_name": "Lookup", "email": "alice@example.com"},
        "shipping": {"method": "click_collect"},
        "payment": {"method": "cb"},
        "terms_accepted": True,
    }
    await client.post("/api/orders", json=body)

    r = await client.post("/api/orders/lookup", json={"email": "alice@example.com"})
    assert r.status_code == 200
    otp_id = r.json()["otp_id"]

    # Read OTP from DB to verify (mock email is in outbox; we get code via DB)
    from app.database import AsyncSessionLocal
    from app.models.otp import OneTimeCode
    from sqlalchemy import select
    async with AsyncSessionLocal() as db:
        otp = (await db.execute(select(OneTimeCode).where(OneTimeCode.id == otp_id))).scalar_one()
        code = otp.code

    r2 = await client.post("/api/orders/lookup/verify", json={"otp_id": otp_id, "code": code})
    assert r2.status_code == 200, r2.text
    data = r2.json()
    assert "access_token" in data
    assert len(data["orders"]) >= 1
