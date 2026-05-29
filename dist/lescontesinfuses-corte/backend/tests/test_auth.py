import pytest


@pytest.mark.asyncio
async def test_register_login_me(client):
    r = await client.post("/api/auth/register", json={
        "email": "newbie@example.com",
        "password": "secret123",
        "first_name": "New", "last_name": "Bie",
    })
    assert r.status_code == 200, r.text
    token = r.json()["access_token"]

    r2 = await client.post("/api/auth/login", json={"email": "newbie@example.com", "password": "secret123"})
    assert r2.status_code == 200
    token = r2.json()["access_token"]

    r3 = await client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert r3.status_code == 200
    assert r3.json()["email"] == "newbie@example.com"


@pytest.mark.asyncio
async def test_admin_login(client):
    r = await client.post("/api/auth/login", json={"email": "admin@lescontesinfuses.corsica", "password": "admin123"})
    assert r.status_code == 200
    token = r.json()["access_token"]
    r2 = await client.get("/api/admin/orders", headers={"Authorization": f"Bearer {token}"})
    assert r2.status_code == 200
