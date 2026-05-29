from __future__ import annotations
from functools import lru_cache
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    DATABASE_URL: str = "sqlite+aiosqlite:///./contes.db"
    JWT_SECRET: str = "change-me"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_DAYS: int = 7
    SMTP_HOST: str = ""
    SMTP_PORT: int = 0
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM: str = "contact@lescontesinfuses.corsica"
    ADMIN_EMAIL: str = "admin@lescontesinfuses.corsica"
    CORS_ORIGINS: str = "http://localhost:4321,https://lescontesinfuses.corsica"
    APP_ENV: str = "development"
    SHIPPING_MONDIAL_RELAY_PRICE_CENTS: int = 490
    SHIPPING_HOME_PRICE_CENTS: int = 790
    TVA_BOOK: float = 5.5
    TVA_OTHER: float = 20.0

    @property
    def cors_origins_list(self) -> List[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
