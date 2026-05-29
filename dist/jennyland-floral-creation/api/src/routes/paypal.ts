import { Hono } from "hono";
import type { AppEnv } from "../lib/env";
import { capturePayPalOrder, createPayPalOrder } from "../lib/paypal";

export const paypalApp = new Hono<AppEnv>();

// Step 1 — frontend asks API for a PayPal order id given an internal reference.
paypalApp.post("/create-order", async (c) => {
  const { reference, return_url, cancel_url } = await c.req.json<{
    reference: string;
    return_url?: string;
    cancel_url?: string;
  }>();
  if (!reference) return c.json({ error: "Missing reference" }, 400);

  const ord = await c.env.DB.prepare(`SELECT * FROM orders WHERE reference = ?`).bind(reference).first<any>();
  if (!ord) return c.json({ error: "Order not found" }, 404);
  if (ord.status === "paid") return c.json({ error: "Already paid" }, 400);

  const ppRes = await createPayPalOrder(c.env, {
    reference,
    total_cents: ord.total_cents,
    description: `Jennyland — commande ${reference}`,
    return_url,
    cancel_url,
  });
  // Store the PayPal id for later capture.
  await c.env.DB
    .prepare(`UPDATE orders SET paypal_order_id = ?, updated_at = unixepoch() WHERE id = ?`)
    .bind(ppRes.id, ord.id)
    .run();
  return c.json({ paypal_order_id: ppRes.id });
});

// Step 2 — frontend approval done, ask API to capture (server-to-server).
paypalApp.post("/capture-order", async (c) => {
  const { paypal_order_id } = await c.req.json<{ paypal_order_id: string }>();
  if (!paypal_order_id) return c.json({ error: "Missing paypal_order_id" }, 400);

  const ord = await c.env.DB
    .prepare(`SELECT * FROM orders WHERE paypal_order_id = ?`)
    .bind(paypal_order_id)
    .first<any>();
  if (!ord) return c.json({ error: "Order not found" }, 404);

  const captureRes = await capturePayPalOrder(c.env, paypal_order_id);
  const captureId = captureRes.purchase_units?.[0]?.payments?.captures?.[0]?.id ?? null;
  const captureStatus = captureRes.status;

  if (captureStatus === "COMPLETED") {
    await c.env.DB
      .prepare(`
        UPDATE orders
        SET status = 'paid', paypal_capture_id = ?, paid_at = unixepoch(), updated_at = unixepoch()
        WHERE id = ?
      `)
      .bind(captureId, ord.id)
      .run();
  }

  return c.json({
    reference: ord.reference,
    status: captureStatus === "COMPLETED" ? "paid" : ord.status,
    paypal_status: captureStatus,
  });
});
