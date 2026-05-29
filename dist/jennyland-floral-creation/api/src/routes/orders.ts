import { Hono, type Context } from "hono";
import type { AppEnv } from "../lib/env";
import { generateReference } from "../lib/crypto";
import { getOrderByReference, getProductById } from "../lib/db";

export const ordersApp = new Hono<AppEnv>();

type CartLine = {
  kind: "product" | "custom_bouquet" | "unit_item";
  ref_id?: number;
  ref_slug?: string;
  name: string;
  description?: string;
  qty: number;
  unit_price_cents: number;
  custom_payload?: unknown;
};

type CreateOrderBody = {
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
  };
  shipping: {
    address: string;
    postal: string;
    city: string;
    country?: string;
    method: "standard" | "tracked";
  };
  notes?: string;
  items: CartLine[];
};

// Re-validate prices server side using DB (don't trust the client).
async function recomputePrices(c: Context<AppEnv>, items: CartLine[]): Promise<{ items: CartLine[]; subtotal: number }> {
  const validated: CartLine[] = [];
  let subtotal = 0;
  for (const item of items) {
    let unit = item.unit_price_cents;
    if (item.kind === "product" && item.ref_id) {
      const p = await getProductById(c.env.DB, item.ref_id);
      if (!p) continue;
      unit = p.price_cents;
    }
    if (item.kind === "unit_item" && item.ref_id) {
      const r = await c.env.DB
        .prepare(`SELECT price_cents FROM unit_items WHERE id = ?`)
        .bind(item.ref_id)
        .first<{ price_cents: number }>();
      if (!r) continue;
      unit = r.price_cents;
    }
    if (item.kind === "custom_bouquet" && item.custom_payload) {
      const payload = item.custom_payload as { items: { ref_id: number; qty?: number }[] };
      let bouquetTotal = 0;
      for (const sub of payload.items || []) {
        const r = await c.env.DB
          .prepare(`SELECT price_cents FROM unit_items WHERE id = ?`)
          .bind(sub.ref_id)
          .first<{ price_cents: number }>();
        if (r) bouquetTotal += r.price_cents * (sub.qty || 1);
      }
      unit = bouquetTotal;
    }
    const qty = Math.max(1, Math.floor(item.qty || 1));
    const total = unit * qty;
    subtotal += total;
    validated.push({ ...item, unit_price_cents: unit, qty });
  }
  return { items: validated, subtotal };
}

ordersApp.post("/", async (c) => {
  const body = await c.req.json<CreateOrderBody>();
  if (!body?.customer?.email || !body.items?.length) {
    return c.json({ error: "Invalid payload" }, 400);
  }

  const { items, subtotal } = await recomputePrices(c, body.items);
  if (!items.length) return c.json({ error: "Cart empty after validation" }, 400);

  const settings = await c.env.DB.prepare(`SELECT key, value FROM settings`).all<{ key: string; value: string }>();
  const settingsMap = Object.fromEntries((settings.results || []).map((s) => [s.key, s.value]));

  const standardCents = Number(settingsMap["shipping.standard_cents"] || 800);
  const trackedCents = Number(settingsMap["shipping.tracked_cents"] || 1200);
  const freeThreshold = Number(settingsMap["shipping.free_threshold_cents"] || 10000);
  let shipping = body.shipping.method === "tracked" ? trackedCents : standardCents;
  if (subtotal >= freeThreshold) shipping = 0;
  const total = subtotal + shipping;

  const reference = generateReference();
  const country = body.shipping.country || "France";

  const ord = await c.env.DB
    .prepare(`
      INSERT INTO orders (
        reference, customer_first_name, customer_last_name, customer_email, customer_phone,
        shipping_address, shipping_postal, shipping_city, shipping_country, shipping_method, shipping_cents,
        subtotal_cents, total_cents, notes, status
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?, 'pending')
    `)
    .bind(
      reference,
      body.customer.first_name,
      body.customer.last_name,
      body.customer.email.toLowerCase(),
      body.customer.phone || null,
      body.shipping.address,
      body.shipping.postal,
      body.shipping.city,
      country,
      body.shipping.method,
      shipping,
      subtotal,
      total,
      body.notes || null
    )
    .run();
  const orderId = Number(ord.meta.last_row_id);

  for (const item of items) {
    await c.env.DB
      .prepare(`
        INSERT INTO order_items (
          order_id, kind, ref_id, ref_slug, name, description, qty, unit_price_cents, total_cents, custom_payload
        ) VALUES (?,?,?,?,?,?,?,?,?,?)
      `)
      .bind(
        orderId,
        item.kind,
        item.ref_id || null,
        item.ref_slug || null,
        item.name,
        item.description || null,
        item.qty,
        item.unit_price_cents,
        item.unit_price_cents * item.qty,
        item.custom_payload ? JSON.stringify(item.custom_payload) : null
      )
      .run();
  }

  return c.json({ reference, total_cents: total, subtotal_cents: subtotal, shipping_cents: shipping });
});

ordersApp.get("/:reference", async (c) => {
  const order = await getOrderByReference(c.env.DB, c.req.param("reference"));
  if (!order) return c.json({ error: "Not found" }, 404);
  // Return only public-safe fields by reference token (rudimentary access-by-knowing-the-ref).
  return c.json({
    reference: order.reference,
    status: order.status,
    customer_first_name: order.customer_first_name,
    subtotal_cents: order.subtotal_cents,
    shipping_cents: order.shipping_cents,
    total_cents: order.total_cents,
    items: order.items,
    created_at: order.created_at,
    paid_at: order.paid_at,
    shipped_at: order.shipped_at,
  });
});
