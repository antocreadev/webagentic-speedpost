import { Hono } from "hono";
import type { AppEnv } from "../lib/env";
import { requireAdmin } from "../lib/auth";
import { getProductById, getOrderByReference } from "../lib/db";

export const adminApp = new Hono<AppEnv>();

adminApp.use("*", requireAdmin);

// ---- Stats ----
adminApp.get("/stats", async (c) => {
  const orderStats = await c.env.DB
    .prepare(`SELECT
      COUNT(*) AS total_orders,
      SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS paid_orders,
      SUM(CASE WHEN status = 'paid' THEN total_cents ELSE 0 END) AS revenue_cents,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_orders
    FROM orders`)
    .first<{ total_orders: number; paid_orders: number; revenue_cents: number; pending_orders: number }>();

  const productStats = await c.env.DB
    .prepare(`SELECT COUNT(*) AS total, SUM(CASE WHEN status='active' THEN 1 ELSE 0 END) AS active FROM products`)
    .first<{ total: number; active: number }>();

  const lowStock = await c.env.DB
    .prepare(`SELECT id, slug, name, stock FROM products WHERE stock <= 1 AND status = 'active' ORDER BY stock ASC LIMIT 10`)
    .all<{ id: number; slug: string; name: string; stock: number }>();

  const recentOrders = await c.env.DB
    .prepare(`SELECT id, reference, customer_first_name, customer_last_name, total_cents, status, created_at
      FROM orders ORDER BY created_at DESC LIMIT 10`)
    .all<any>();

  return c.json({
    orders: orderStats,
    products: productStats,
    low_stock: lowStock.results || [],
    recent_orders: recentOrders.results || [],
  });
});

// ---- Categories CRUD ----
adminApp.get("/categories", async (c) => {
  const { results } = await c.env.DB.prepare(`SELECT * FROM categories ORDER BY sort ASC`).all();
  return c.json({ categories: results || [] });
});

adminApp.post("/categories", async (c) => {
  const b = await c.req.json<any>();
  const r = await c.env.DB
    .prepare(`INSERT INTO categories (slug, name, tagline, description, emoji, sort) VALUES (?,?,?,?,?,?)`)
    .bind(b.slug, b.name, b.tagline || null, b.description || null, b.emoji || null, b.sort || 0)
    .run();
  return c.json({ id: Number(r.meta.last_row_id) });
});

adminApp.put("/categories/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const b = await c.req.json<any>();
  await c.env.DB
    .prepare(`UPDATE categories SET slug=?, name=?, tagline=?, description=?, emoji=?, sort=?, updated_at=unixepoch() WHERE id=?`)
    .bind(b.slug, b.name, b.tagline || null, b.description || null, b.emoji || null, b.sort || 0, id)
    .run();
  return c.json({ ok: true });
});

adminApp.delete("/categories/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await c.env.DB.prepare(`DELETE FROM categories WHERE id = ?`).bind(id).run();
  return c.json({ ok: true });
});

// ---- Products CRUD ----
adminApp.get("/products", async (c) => {
  const { results } = await c.env.DB
    .prepare(`SELECT p.*, c.slug AS category_slug, c.name AS category_name,
      (SELECT url FROM product_images WHERE product_id = p.id ORDER BY sort ASC LIMIT 1) AS image_url
      FROM products p JOIN categories c ON c.id = p.category_id
      ORDER BY p.sort ASC, p.id ASC`)
    .all();
  return c.json({ products: results || [] });
});

adminApp.get("/products/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const product = await getProductById(c.env.DB, id);
  if (!product) return c.json({ error: "Not found" }, 404);
  return c.json({ product });
});

adminApp.post("/products", async (c) => {
  const b = await c.req.json<any>();
  const r = await c.env.DB
    .prepare(`INSERT INTO products (
      category_id, slug, name, short_description, description, story,
      price_cents, compare_at_cents, stock, is_unique, is_made_to_order,
      prep_days_min, prep_days_max, dimensions, materials, care_instructions,
      primary_color, badge, status, featured, sort
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
    .bind(
      b.category_id, b.slug, b.name, b.short_description || null, b.description || null, b.story || null,
      b.price_cents, b.compare_at_cents || null, b.stock ?? 1, b.is_unique ? 1 : 0, b.is_made_to_order ? 1 : 0,
      b.prep_days_min ?? 5, b.prep_days_max ?? 7, b.dimensions || null, b.materials || null, b.care_instructions || null,
      b.primary_color || null, b.badge || null, b.status || "active", b.featured ? 1 : 0, b.sort ?? 0
    )
    .run();
  return c.json({ id: Number(r.meta.last_row_id) });
});

adminApp.put("/products/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const b = await c.req.json<any>();
  await c.env.DB
    .prepare(`UPDATE products SET
      category_id=?, slug=?, name=?, short_description=?, description=?, story=?,
      price_cents=?, compare_at_cents=?, stock=?, is_unique=?, is_made_to_order=?,
      prep_days_min=?, prep_days_max=?, dimensions=?, materials=?, care_instructions=?,
      primary_color=?, badge=?, status=?, featured=?, sort=?, updated_at=unixepoch()
      WHERE id=?`)
    .bind(
      b.category_id, b.slug, b.name, b.short_description || null, b.description || null, b.story || null,
      b.price_cents, b.compare_at_cents || null, b.stock ?? 1, b.is_unique ? 1 : 0, b.is_made_to_order ? 1 : 0,
      b.prep_days_min ?? 5, b.prep_days_max ?? 7, b.dimensions || null, b.materials || null, b.care_instructions || null,
      b.primary_color || null, b.badge || null, b.status || "active", b.featured ? 1 : 0, b.sort ?? 0, id
    )
    .run();
  return c.json({ ok: true });
});

adminApp.delete("/products/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await c.env.DB.prepare(`DELETE FROM products WHERE id = ?`).bind(id).run();
  return c.json({ ok: true });
});

// Product images
adminApp.post("/products/:id/images", async (c) => {
  const id = Number(c.req.param("id"));
  const b = await c.req.json<{ url: string; alt?: string; sort?: number }>();
  const r = await c.env.DB
    .prepare(`INSERT INTO product_images (product_id, url, alt, sort) VALUES (?,?,?,?)`)
    .bind(id, b.url, b.alt || null, b.sort ?? 0)
    .run();
  return c.json({ id: Number(r.meta.last_row_id) });
});

adminApp.delete("/products/:id/images/:imageId", async (c) => {
  const imageId = Number(c.req.param("imageId"));
  await c.env.DB.prepare(`DELETE FROM product_images WHERE id = ?`).bind(imageId).run();
  return c.json({ ok: true });
});

// ---- Unit items CRUD ----
adminApp.get("/unit-items", async (c) => {
  const { results } = await c.env.DB.prepare(`SELECT * FROM unit_items ORDER BY sort ASC`).all();
  return c.json({ items: results || [] });
});

adminApp.post("/unit-items", async (c) => {
  const b = await c.req.json<any>();
  const r = await c.env.DB
    .prepare(`INSERT INTO unit_items (slug, name, kind, color, hex, description, price_cents, svg_id, sort, status)
      VALUES (?,?,?,?,?,?,?,?,?,?)`)
    .bind(b.slug, b.name, b.kind, b.color, b.hex || null, b.description || null, b.price_cents, b.svg_id, b.sort ?? 0, b.status || "active")
    .run();
  return c.json({ id: Number(r.meta.last_row_id) });
});

adminApp.put("/unit-items/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const b = await c.req.json<any>();
  await c.env.DB
    .prepare(`UPDATE unit_items SET slug=?, name=?, kind=?, color=?, hex=?, description=?, price_cents=?, svg_id=?, sort=?, status=?, updated_at=unixepoch() WHERE id=?`)
    .bind(b.slug, b.name, b.kind, b.color, b.hex || null, b.description || null, b.price_cents, b.svg_id, b.sort ?? 0, b.status || "active", id)
    .run();
  return c.json({ ok: true });
});

adminApp.delete("/unit-items/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await c.env.DB.prepare(`DELETE FROM unit_items WHERE id = ?`).bind(id).run();
  return c.json({ ok: true });
});

// ---- Orders ----
adminApp.get("/orders", async (c) => {
  const status = c.req.query("status");
  const where = status ? `WHERE status = ?` : "";
  const stmt = c.env.DB.prepare(`SELECT * FROM orders ${where} ORDER BY created_at DESC LIMIT 200`);
  const { results } = status ? await stmt.bind(status).all() : await stmt.all();
  return c.json({ orders: results || [] });
});

adminApp.get("/orders/:reference", async (c) => {
  const order = await getOrderByReference(c.env.DB, c.req.param("reference"));
  if (!order) return c.json({ error: "Not found" }, 404);
  return c.json({ order });
});

adminApp.put("/orders/:reference", async (c) => {
  const ref = c.req.param("reference");
  const b = await c.req.json<{ status?: string; tracking_number?: string; notes?: string }>();
  const order = await c.env.DB.prepare(`SELECT id FROM orders WHERE reference = ?`).bind(ref).first<{ id: number }>();
  if (!order) return c.json({ error: "Not found" }, 404);

  const fields: string[] = [];
  const binds: (string | number)[] = [];
  if (b.status) { fields.push(`status = ?`); binds.push(b.status); }
  if (b.tracking_number !== undefined) { fields.push(`tracking_number = ?`); binds.push(b.tracking_number); }
  if (b.notes !== undefined) { fields.push(`notes = ?`); binds.push(b.notes); }
  if (b.status === "shipped") { fields.push(`shipped_at = unixepoch()`); }
  fields.push(`updated_at = unixepoch()`);

  binds.push(order.id);
  await c.env.DB.prepare(`UPDATE orders SET ${fields.join(", ")} WHERE id = ?`).bind(...binds).run();
  return c.json({ ok: true });
});

// ---- Content blocks ----
adminApp.get("/content", async (c) => {
  const { results } = await c.env.DB.prepare(`SELECT key, value FROM content_blocks`).all();
  return c.json({ content: results || [] });
});

adminApp.put("/content/:key", async (c) => {
  const key = c.req.param("key");
  const { value } = await c.req.json<{ value: string }>();
  await c.env.DB
    .prepare(`INSERT INTO content_blocks (key, value) VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = unixepoch()`)
    .bind(key, value)
    .run();
  return c.json({ ok: true });
});

// ---- Settings ----
adminApp.get("/settings", async (c) => {
  const { results } = await c.env.DB.prepare(`SELECT key, value FROM settings`).all();
  return c.json({ settings: results || [] });
});

adminApp.put("/settings/:key", async (c) => {
  const key = c.req.param("key");
  const { value } = await c.req.json<{ value: string }>();
  await c.env.DB
    .prepare(`INSERT INTO settings (key, value) VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = unixepoch()`)
    .bind(key, value)
    .run();
  return c.json({ ok: true });
});

// ---- Image upload to R2 ----
adminApp.post("/upload", async (c) => {
  const form = await c.req.formData();
  const file = form.get("file") as unknown as File | null;
  if (!file || typeof (file as any).arrayBuffer !== "function") {
    return c.json({ error: "No file" }, 400);
  }

  const name = (file as any).name || "upload.bin";
  const type = (file as any).type || "application/octet-stream";
  const ext = name.split(".").pop()?.toLowerCase() || "bin";
  const key = `products/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const body = await (file as any).arrayBuffer();
  await c.env.MEDIA.put(key, body, {
    httpMetadata: { contentType: type },
  });
  return c.json({ key, url: `/media/${key}` });
});
