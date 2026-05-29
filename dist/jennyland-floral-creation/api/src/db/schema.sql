-- Jennyland Floral Création — D1 schema
-- Drops + creates everything fresh. Use seed.sql afterwards.

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS unit_items;
DROP TABLE IF EXISTS unit_item_palette;
DROP TABLE IF EXISTS content_blocks;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS admin_users;
DROP TABLE IF EXISTS admin_sessions;

CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  emoji TEXT,
  sort INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  story TEXT,
  price_cents INTEGER NOT NULL,
  compare_at_cents INTEGER,
  stock INTEGER NOT NULL DEFAULT 1,
  is_unique INTEGER NOT NULL DEFAULT 1,
  is_made_to_order INTEGER NOT NULL DEFAULT 0,
  prep_days_min INTEGER NOT NULL DEFAULT 5,
  prep_days_max INTEGER NOT NULL DEFAULT 7,
  dimensions TEXT,
  materials TEXT,
  care_instructions TEXT,
  primary_color TEXT,
  badge TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  featured INTEGER NOT NULL DEFAULT 0,
  sort INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX idx_products_category ON products(category_id, sort);
CREATE INDEX idx_products_status ON products(status, featured);

CREATE TABLE product_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_product_images_product ON product_images(product_id, sort);

CREATE TABLE unit_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  kind TEXT NOT NULL,
  color TEXT NOT NULL,
  hex TEXT,
  description TEXT,
  price_cents INTEGER NOT NULL,
  svg_id TEXT NOT NULL,
  sort INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX idx_unit_items_kind ON unit_items(kind, sort);
CREATE INDEX idx_unit_items_color ON unit_items(color);

-- One row per unique color string available across the store, for filter chips.
CREATE TABLE unit_item_palette (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  color TEXT NOT NULL UNIQUE,
  hex TEXT NOT NULL,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference TEXT NOT NULL UNIQUE,
  customer_first_name TEXT NOT NULL,
  customer_last_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address TEXT NOT NULL,
  shipping_postal TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_country TEXT NOT NULL DEFAULT 'France',
  shipping_method TEXT NOT NULL DEFAULT 'standard',
  shipping_cents INTEGER NOT NULL DEFAULT 0,
  subtotal_cents INTEGER NOT NULL,
  total_cents INTEGER NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  paypal_order_id TEXT,
  paypal_capture_id TEXT,
  paid_at INTEGER,
  shipped_at INTEGER,
  tracking_number TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX idx_orders_status ON orders(status, created_at DESC);
CREATE INDEX idx_orders_email ON orders(customer_email);

CREATE TABLE order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  ref_id INTEGER,
  ref_slug TEXT,
  name TEXT NOT NULL,
  description TEXT,
  qty INTEGER NOT NULL DEFAULT 1,
  unit_price_cents INTEGER NOT NULL,
  total_cents INTEGER NOT NULL,
  custom_payload TEXT
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- Editable site content blocks (hero, about, etc.)
CREATE TABLE content_blocks (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Generic key/value settings (whatsapp, instagram, paypal handle, etc.)
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  display_name TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  last_login_at INTEGER
);

CREATE TABLE admin_sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX idx_admin_sessions_user ON admin_sessions(user_id);
CREATE INDEX idx_admin_sessions_expires ON admin_sessions(expires_at);
