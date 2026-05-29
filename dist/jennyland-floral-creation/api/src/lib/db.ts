import type { D1Database } from "@cloudflare/workers-types";

export type DbCategory = {
  id: number;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  emoji: string | null;
  sort: number;
};

export type DbProduct = {
  id: number;
  category_id: number;
  slug: string;
  name: string;
  short_description: string | null;
  description: string | null;
  story: string | null;
  price_cents: number;
  compare_at_cents: number | null;
  stock: number;
  is_unique: number;
  is_made_to_order: number;
  prep_days_min: number;
  prep_days_max: number;
  dimensions: string | null;
  materials: string | null;
  care_instructions: string | null;
  primary_color: string | null;
  badge: string | null;
  status: string;
  featured: number;
  sort: number;
  created_at: number;
  updated_at: number;
};

export type DbProductImage = {
  id: number;
  product_id: number;
  url: string;
  alt: string | null;
  sort: number;
};

export type DbUnitItem = {
  id: number;
  slug: string;
  name: string;
  kind: string;
  color: string;
  hex: string | null;
  description: string | null;
  price_cents: number;
  svg_id: string;
  sort: number;
  status: string;
};

export type DbOrder = {
  id: number;
  reference: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string;
  shipping_postal: string;
  shipping_city: string;
  shipping_country: string;
  shipping_method: string;
  shipping_cents: number;
  subtotal_cents: number;
  total_cents: number;
  notes: string | null;
  status: string;
  paypal_order_id: string | null;
  paypal_capture_id: string | null;
  paid_at: number | null;
  shipped_at: number | null;
  tracking_number: string | null;
  created_at: number;
  updated_at: number;
};

export type DbOrderItem = {
  id: number;
  order_id: number;
  kind: string;
  ref_id: number | null;
  ref_slug: string | null;
  name: string;
  description: string | null;
  qty: number;
  unit_price_cents: number;
  total_cents: number;
  custom_payload: string | null;
};

export type DbContentBlock = {
  key: string;
  value: string;
  updated_at: number;
};

export type DbSetting = {
  key: string;
  value: string;
  updated_at: number;
};

export type DbAdminUser = {
  id: number;
  email: string;
  password_hash: string;
  password_salt: string;
  role: string;
  display_name: string | null;
  created_at: number;
  last_login_at: number | null;
};

export async function getAllCategories(db: D1Database): Promise<DbCategory[]> {
  const { results } = await db
    .prepare(`SELECT id, slug, name, tagline, description, emoji, sort FROM categories ORDER BY sort ASC`)
    .all<DbCategory>();
  return results || [];
}

export async function getCategoryBySlug(db: D1Database, slug: string): Promise<DbCategory | null> {
  return await db
    .prepare(`SELECT id, slug, name, tagline, description, emoji, sort FROM categories WHERE slug = ?`)
    .bind(slug)
    .first<DbCategory>();
}

export async function getProducts(
  db: D1Database,
  opts: { categoryId?: number; featured?: boolean; status?: string; limit?: number } = {}
): Promise<(DbProduct & { category_slug: string; image_url: string | null })[]> {
  const where: string[] = [];
  const binds: (string | number)[] = [];
  if (opts.categoryId !== undefined) {
    where.push(`p.category_id = ?`);
    binds.push(opts.categoryId);
  }
  if (opts.status) {
    where.push(`p.status = ?`);
    binds.push(opts.status);
  } else {
    where.push(`p.status = 'active'`);
  }
  if (opts.featured) {
    where.push(`p.featured = 1`);
  }
  const sql = `
    SELECT p.*, c.slug AS category_slug,
      (SELECT url FROM product_images WHERE product_id = p.id ORDER BY sort ASC LIMIT 1) AS image_url
    FROM products p
    JOIN categories c ON c.id = p.category_id
    ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
    ORDER BY p.sort ASC, p.id ASC
    ${opts.limit ? `LIMIT ${Number(opts.limit)}` : ""}
  `;
  const { results } = await db.prepare(sql).bind(...binds).all();
  return (results || []) as any;
}

export async function getProductBySlug(
  db: D1Database,
  slug: string
): Promise<(DbProduct & { category_slug: string; category_name: string; images: DbProductImage[] }) | null> {
  const product = await db
    .prepare(`
      SELECT p.*, c.slug AS category_slug, c.name AS category_name
      FROM products p JOIN categories c ON c.id = p.category_id
      WHERE p.slug = ? AND p.status = 'active'
    `)
    .bind(slug)
    .first<DbProduct & { category_slug: string; category_name: string }>();
  if (!product) return null;
  const { results: images } = await db
    .prepare(`SELECT id, product_id, url, alt, sort FROM product_images WHERE product_id = ? ORDER BY sort ASC`)
    .bind(product.id)
    .all<DbProductImage>();
  return { ...product, images: images || [] };
}

export async function getProductById(
  db: D1Database,
  id: number
): Promise<(DbProduct & { images: DbProductImage[] }) | null> {
  const product = await db
    .prepare(`SELECT * FROM products WHERE id = ?`)
    .bind(id)
    .first<DbProduct>();
  if (!product) return null;
  const { results: images } = await db
    .prepare(`SELECT id, product_id, url, alt, sort FROM product_images WHERE product_id = ? ORDER BY sort ASC`)
    .bind(id)
    .all<DbProductImage>();
  return { ...product, images: images || [] };
}

export async function getAllUnitItems(db: D1Database): Promise<DbUnitItem[]> {
  const { results } = await db
    .prepare(`SELECT * FROM unit_items WHERE status = 'active' ORDER BY sort ASC`)
    .all<DbUnitItem>();
  return results || [];
}

export async function getUnitItemPalette(db: D1Database): Promise<{ color: string; hex: string }[]> {
  const { results } = await db
    .prepare(`SELECT color, hex FROM unit_item_palette ORDER BY sort ASC`)
    .all<{ color: string; hex: string }>();
  return results || [];
}

export async function getContentBlocks(db: D1Database): Promise<Record<string, string>> {
  const { results } = await db.prepare(`SELECT key, value FROM content_blocks`).all<DbContentBlock>();
  const out: Record<string, string> = {};
  for (const r of results || []) out[r.key] = r.value;
  return out;
}

export async function getSettings(db: D1Database): Promise<Record<string, string>> {
  const { results } = await db.prepare(`SELECT key, value FROM settings`).all<DbSetting>();
  const out: Record<string, string> = {};
  for (const r of results || []) out[r.key] = r.value;
  return out;
}

export async function getOrderByReference(db: D1Database, reference: string): Promise<(DbOrder & { items: DbOrderItem[] }) | null> {
  const order = await db.prepare(`SELECT * FROM orders WHERE reference = ?`).bind(reference).first<DbOrder>();
  if (!order) return null;
  const { results: items } = await db
    .prepare(`SELECT * FROM order_items WHERE order_id = ?`)
    .bind(order.id)
    .all<DbOrderItem>();
  return { ...order, items: items || [] };
}
