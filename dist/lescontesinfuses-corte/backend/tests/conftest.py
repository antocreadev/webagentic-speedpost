from __future__ import annotations
import os
os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite:///./test_contes.db")
import asyncio
import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport


@pytest_asyncio.fixture(scope="session")
async def app_seeded():
    # Fresh DB
    if os.path.exists("test_contes.db"):
        os.remove("test_contes.db")
    from app.seed import reset_and_seed
    await reset_and_seed()
    from app.main import app
    return app


@pytest_asyncio.fixture
async def client(app_seeded):
    transport = ASGITransport(app=app_seeded)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c
