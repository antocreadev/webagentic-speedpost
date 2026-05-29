// Light typed API client. Works in both Astro server-render context and browser islands.

const isBrowser = typeof window !== "undefined";

export const API_BASE: string = isBrowser
  ? (import.meta.env.PUBLIC_API_URL as string) || "http://127.0.0.1:8787"
  : (import.meta.env.PUBLIC_API_URL as string) || "http://127.0.0.1:8787";

export type Category = {
  id: number;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  emoji: string | null;
  sort: number;
};

export type Product = {
  id: number;
  category_id: number;
  category_slug: string;
  category_name?: string;
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
  image_url?: string | null;
  images?: { id: number; url: string; alt: string | null; sort: number }[];
};

export type UnitItem = {
  id: number;
  slug: string;
  name: string;
  kind: "flower" | "decoration";
  color: string;
  hex: string | null;
  description: string | null;
  price_cents: number;
  svg_id: string;
  sort: number;
  status: string;
};

export type ContentMap = Record<string, string>;
export type SettingsMap = Record<string, string>;

export type Order = {
  reference: string;
  status: string;
  customer_first_name: string;
  customer_last_name?: string;
  customer_email?: string;
  subtotal_cents: number;
  shipping_cents: number;
  total_cents: number;
  items: {
    kind: string;
    name: string;
    qty: number;
    unit_price_cents: number;
    total_cents: number;
    custom_payload: string | null;
  }[];
  created_at: number;
  paid_at: number | null;
  shipped_at: number | null;
  tracking_number?: string | null;
};

async function jget<T>(path: string, init?: RequestInit): Promise<T> {
  const r = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    credentials: "include",
    ...init,
  });
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`API ${r.status} ${path}: ${text}`);
  }
  return (await r.json()) as T;
}

async function jpost<T>(path: string, body: unknown, init?: RequestInit): Promise<T> {
  return jget<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
    ...init,
  });
}

export const api = {
  // ---- Public ----
  categories: () => jget<{ categories: Category[] }>("/public/categories"),
  category: (slug: string) =>
    jget<{ category: Category; products: Product[] }>(`/public/categories/${slug}`),
  products: (params: { featured?: boolean; limit?: number } = {}) => {
    const q = new URLSearchParams();
    if (params.featured) q.set("featured", "1");
    if (params.limit) q.set("limit", String(params.limit));
    const qs = q.toString();
    return jget<{ products: Product[] }>(`/public/products${qs ? `?${qs}` : ""}`);
  },
  product: (slug: string) => jget<{ product: Product }>(`/public/products/${slug}`),
  unitItems: () =>
    jget<{ items: UnitItem[]; palette: { color: string; hex: string }[] }>("/public/unit-items"),
  content: () => jget<{ content: ContentMap; settings: SettingsMap }>("/public/content"),

  // ---- Orders ----
  createOrder: (body: any) => jpost<{ reference: string; total_cents: number; subtotal_cents: number; shipping_cents: number }>(`/orders`, body),
  order: (reference: string) => jget<Order>(`/orders/${reference}`),

  // ---- PayPal ----
  paypalCreate: (body: { reference: string; return_url?: string; cancel_url?: string }) =>
    jpost<{ paypal_order_id: string }>("/paypal/create-order", body),
  paypalCapture: (body: { paypal_order_id: string }) =>
    jpost<{ reference: string; status: string; paypal_status: string }>("/paypal/capture-order", body),

  // ---- Auth ----
  login: (email: string, password: string) =>
    jpost<{ user: any; token: string }>("/auth/login", { email, password }),
  logout: () => jpost("/auth/logout", {}),
  me: () => jget<{ user: any | null }>("/auth/me"),

  // ---- Admin ----
  admin: {
    stats: () => jget<any>("/admin/stats"),
    products: () => jget<{ products: Product[] }>("/admin/products"),
    product: (id: number) => jget<{ product: Product }>(`/admin/products/${id}`),
    createProduct: (b: any) => jpost<{ id: number }>(`/admin/products`, b),
    updateProduct: (id: number, b: any) =>
      jget<{ ok: true }>(`/admin/products/${id}`, { method: "PUT", body: JSON.stringify(b) }),
    deleteProduct: (id: number) => jget<{ ok: true }>(`/admin/products/${id}`, { method: "DELETE" }),
    addImage: (id: number, b: { url: string; alt?: string; sort?: number }) =>
      jpost<{ id: number }>(`/admin/products/${id}/images`, b),
    deleteImage: (productId: number, imageId: number) =>
      jget<{ ok: true }>(`/admin/products/${productId}/images/${imageId}`, { method: "DELETE" }),
    categories: () => jget<{ categories: Category[] }>("/admin/categories"),
    createCategory: (b: any) => jpost<{ id: number }>(`/admin/categories`, b),
    updateCategory: (id: number, b: any) =>
      jget<{ ok: true }>(`/admin/categories/${id}`, { method: "PUT", body: JSON.stringify(b) }),
    deleteCategory: (id: number) => jget<{ ok: true }>(`/admin/categories/${id}`, { method: "DELETE" }),
    unitItems: () => jget<{ items: UnitItem[] }>("/admin/unit-items"),
    createUnitItem: (b: any) => jpost<{ id: number }>(`/admin/unit-items`, b),
    updateUnitItem: (id: number, b: any) =>
      jget<{ ok: true }>(`/admin/unit-items/${id}`, { method: "PUT", body: JSON.stringify(b) }),
    deleteUnitItem: (id: number) => jget<{ ok: true }>(`/admin/unit-items/${id}`, { method: "DELETE" }),
    orders: (status?: string) => {
      const q = status ? `?status=${encodeURIComponent(status)}` : "";
      return jget<{ orders: any[] }>(`/admin/orders${q}`);
    },
    order: (reference: string) => jget<{ order: any }>(`/admin/orders/${reference}`),
    updateOrder: (reference: string, b: any) =>
      jget<{ ok: true }>(`/admin/orders/${reference}`, { method: "PUT", body: JSON.stringify(b) }),
    content: () => jget<{ content: { key: string; value: string }[] }>(`/admin/content`),
    setContent: (key: string, value: string) =>
      jget<{ ok: true }>(`/admin/content/${encodeURIComponent(key)}`, {
        method: "PUT",
        body: JSON.stringify({ value }),
      }),
    settings: () => jget<{ settings: { key: string; value: string }[] }>(`/admin/settings`),
    setSetting: (key: string, value: string) =>
      jget<{ ok: true }>(`/admin/settings/${encodeURIComponent(key)}`, {
        method: "PUT",
        body: JSON.stringify({ value }),
      }),
    upload: async (file: File) => {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch(`${API_BASE}/admin/upload`, {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      if (!r.ok) throw new Error(await r.text());
      return (await r.json()) as { key: string; url: string };
    },
  },
};

export async function safe<T>(p: Promise<T>, fallback: T): Promise<{ data: T; error: string | null }> {
  try {
    return { data: await p, error: null };
  } catch (e: any) {
    return { data: fallback, error: e?.message || "error" };
  }
}
