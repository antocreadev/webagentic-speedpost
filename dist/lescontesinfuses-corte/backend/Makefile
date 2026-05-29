.PHONY: install dev seed test migrate reset fetch-images

fetch-images:
	python -m scripts.fetch_images


install:
	python -m venv .venv && . .venv/bin/activate && pip install -e ".[dev]"

dev:
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

seed:
	python -m app.seed

reset:
	python scripts/reset_db.py

test:
	pytest -v

migrate:
	alembic revision --autogenerate -m "auto"
	alembic upgrade head
