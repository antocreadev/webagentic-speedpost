import type { Bindings } from "./env";

type PayPalAccessToken = { access_token: string; expires_in: number };

export type PayPalOrderRequest = {
  reference: string;
  total_cents: number;
  description?: string;
  return_url?: string;
  cancel_url?: string;
};

export type PayPalCreateOrderResponse = {
  id: string;
  status: string;
  links: { href: string; rel: string; method: string }[];
};

export type PayPalCaptureResponse = {
  id: string;
  status: string;
  purchase_units?: {
    payments?: {
      captures?: { id: string; status: string; amount: { value: string; currency_code: string } }[];
    };
  }[];
};

async function getAccessToken(env: Bindings): Promise<string> {
  const credentials = btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`);
  const r = await fetch(`${env.PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`PayPal token error ${r.status}: ${text}`);
  }
  const data = (await r.json()) as PayPalAccessToken;
  return data.access_token;
}

export async function createPayPalOrder(env: Bindings, req: PayPalOrderRequest): Promise<PayPalCreateOrderResponse> {
  const token = await getAccessToken(env);
  const value = (req.total_cents / 100).toFixed(2);
  const r = await fetch(`${env.PAYPAL_API}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: req.reference,
          description: req.description?.slice(0, 127) ?? "Jennyland Floral Création",
          amount: { currency_code: "EUR", value },
        },
      ],
      application_context: {
        brand_name: "Jennyland Floral Création",
        locale: "fr-FR",
        landing_page: "NO_PREFERENCE",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        return_url: req.return_url ?? "https://example.com/confirmation",
        cancel_url: req.cancel_url ?? "https://example.com/panier",
      },
    }),
  });
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`PayPal create order ${r.status}: ${text}`);
  }
  return (await r.json()) as PayPalCreateOrderResponse;
}

export async function capturePayPalOrder(env: Bindings, paypalOrderId: string): Promise<PayPalCaptureResponse> {
  const token = await getAccessToken(env);
  const r = await fetch(`${env.PAYPAL_API}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`PayPal capture ${r.status}: ${text}`);
  }
  return (await r.json()) as PayPalCaptureResponse;
}
