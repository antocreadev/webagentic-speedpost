import pytest


@pytest.mark.asyncio
async def test_list_books(client):
    r = await client.get("/api/catalog/books?limit=5")
    assert r.status_code == 200
    data = r.json()
    assert data["total"] >= 20
    assert len(data["items"]) == 5


@pytest.mark.asyncio
async def test_get_book(client):
    r = await client.get("/api/catalog/books/murtoriu")
    assert r.status_code == 200
    assert r.json()["title"] == "Murtoriu"


@pytest.mark.asyncio
async def test_genres(client):
    r = await client.get("/api/catalog/genres")
    assert r.status_code == 200
    assert len(r.json()) >= 10


@pytest.mark.asyncio
async def test_cafe(client):
    r = await client.get("/api/catalog/cafe")
    assert r.status_code == 200
    assert len(r.json()) >= 20
