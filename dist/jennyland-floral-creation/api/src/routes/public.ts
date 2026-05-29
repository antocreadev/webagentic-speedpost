import { Hono } from "hono";
import type { AppEnv } from "../lib/env";
import {
  getAllCategories,
  getCategoryBySlug,
  getProducts,
  getProductBySlug,
  getAllUnitItems,
  getUnitItemPalette,
  getContentBlocks,
  getSettings,
} from "../lib/db";

export const publicApp = new Hono<AppEnv>();

// All categories
publicApp.get("/categories", async (c) => {
  const cats = await getAllCategories(c.env.DB);
  return c.json({ categories: cats });
});

// Single category by slug
publicApp.get("/categories/:slug", async (c) => {
  const cat = await getCategoryBySlug(c.env.DB, c.req.param("slug"));
  if (!cat) return c.json({ error: "Not found" }, 404);
  const products = await getProducts(c.env.DB, { categoryId: cat.id });
  return c.json({ category: cat, products });
});

// Products list (filterable)
publicApp.get("/products", async (c) => {
  const featured = c.req.query("featured") === "1";
  const limit = c.req.query("limit") ? Number(c.req.query("limit")) : undefined;
  const products = await getProducts(c.env.DB, { featured, limit });
  return c.json({ products });
});

// Single product by slug
publicApp.get("/products/:slug", async (c) => {
  const product = await getProductBySlug(c.env.DB, c.req.param("slug"));
  if (!product) return c.json({ error: "Not found" }, 404);
  return c.json({ product });
});

// Configurator unit items
publicApp.get("/unit-items", async (c) => {
  const items = await getAllUnitItems(c.env.DB);
  const palette = await getUnitItemPalette(c.env.DB);
  return c.json({ items, palette });
});

// Public site content + key settings
publicApp.get("/content", async (c) => {
  const content = await getContentBlocks(c.env.DB);
  const allSettings = await getSettings(c.env.DB);
  // Whitelist public-safe settings only.
  const settings: Record<string, string> = {};
  const publicKeys = [
    "brand.name",
    "brand.tagline",
    "artisan.first_name",
    "artisan.city",
    "artisan.country",
    "contact.email",
    "contact.whatsapp",
    "contact.instagram",
    "shipping.standard_cents",
    "shipping.tracked_cents",
    "shipping.free_threshold_cents",
  ];
  for (const k of publicKeys) {
    if (k in allSettings) settings[k] = allSettings[k]!;
  }
  return c.json({ content, settings });
});
