import ky, { HTTPError, type KyInstance, type Options } from "ky";
import { authStore } from "./auth";

const API_URL =
  (import.meta as ImportMeta & { env: Record<string, string> }).env?.PUBLIC_API_URL ||
  "http://localhost:8000/api";

export type ApiError = {
  status: number;
  code: string;
  message: string;
  details?: unknown;
};

export async function apiError(error: unknown): Promise<ApiError> {
  if (error instanceof HTTPError) {
    let body: any = null;
    try { body = await error.response.clone().json(); } catch { /* ignore */ }
    return {
      status: error.response.status,
      code: body?.code || String(error.response.status),
      message: body?.detail || body?.message || error.message || "Erreur inconnue",
      details: body,
    };
  }
  const e = error as Error;
  return { status: 0, code: "network_error", message: e?.message || "Erreur reseau" };
}

export const api: KyInstance = ky.create({
  prefix: API_URL,
  timeout: 20000,
  retry: { limit: 1, methods: ["get"] },
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const token = authStore.getToken();
        if (token) request.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
    afterResponse: [
      ({ response }) => {
        if (response.status === 401 && authStore.getToken()) {
          authStore.clearSession();
        }
        return response;
      },
    ],
  },
});

// =====================================================================
// Types (minimaux, alignes sur les schemas Pydantic du backend)
// =====================================================================

export interface Genre {
  id: number; slug: string; label: string; description?: string;
  color?: string; icon_key?: string; sort_order?: number;
}

export interface Book {
  id: number; slug: string; title: string; author: string;
  isbn?: string | null; publisher?: string | null; year_published?: string | null;
  pages?: number | null; summary?: string; genre_slug?: string;
  price_cents: number; stock: number; coup_de_coeur?: boolean;
  cover_gradient?: string[] | null; spine_color?: string | null;
  image_key?: string | null; image_url?: string | null;
}

export interface Event {
  id: number; slug: string; title: string; description?: string;
  starts_at: string; duration_min: number; location: string;
  capacity: number; registered: number; price_cents?: number | null;
  image_key?: string | null; image_url?: string | null;
  status: string; hosted_at: string;
}

export interface Boisson {
  id: number; slug: string; category: string; name: string;
  ingredients: string[]; allergens: string[]; price_cents: number;
  image_key?: string | null; image_url?: string | null;
  hot?: boolean; signature?: boolean;
}

export interface Artisan {
  id: number; slug: string; name: string; city?: string; bio?: string;
  image_url?: string | null;
  products?: Product[];
}

export interface Product {
  id: number; slug: string; name: string; artisan_slug?: string;
  category?: string; price_cents: number; stock: number;
  description?: string; image_key?: string | null; image_url?: string | null;
}

export interface Order {
  id: string; status: string; total_cents: number;
  items: any[]; created_at: string; [k: string]: any;
}

export interface PaginatedList<T> { items: T[]; total: number; limit: number; offset: number; }

// =====================================================================
// Helpers
// =====================================================================

const json = <T,>(opts?: Options) => opts ?? {};
const j = <T,>(p: Promise<Response>): Promise<T> => p.then((r) => r.json() as Promise<T>);

function qs(params?: Record<string, unknown>): Options {
  if (!params) return {};
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    out[k] = v as any;
  }
  return { searchParams: out };
}

// =====================================================================
// Catalog
// =====================================================================

export const listBooks = (params?: {
  genre?: string; q?: string; min_price?: number; max_price?: number;
  sort?: string; limit?: number; offset?: number;
}) => api.get("catalog/books", qs(params)).json<PaginatedList<Book> | Book[]>();

export const getBookBySlug = (slug: string) => api.get(`catalog/books/${slug}`).json<Book>();
export const listGenres = () => api.get("catalog/genres").json<Genre[]>();

// =====================================================================
// Events
// =====================================================================

export const listEvents = (params?: { limit?: number; offset?: number; status?: string }) =>
  api.get("catalog/events", qs(params)).json<PaginatedList<Event> | Event[]>();
export const getEventBySlug = (slug: string) => api.get(`catalog/events/${slug}`).json<Event>();
export const getEventSeats = (slug: string) => api.get(`events/${slug}/seats`).json<{ capacity: number; registered: number; available: number }>();
export const registerEvent = (slug: string, body: Record<string, unknown>) =>
  api.post(`events/${slug}/register`, { json: body }).json<{ id: string; status: string }>();

// =====================================================================
// Cafe
// =====================================================================

export const listCafe = (category?: string) => api.get("catalog/cafe", qs({ category })).json<Boisson[]>();
export const getBoissonBySlug = (slug: string) => api.get(`catalog/cafe/${slug}`).json<Boisson>();

// =====================================================================
// Artisans
// =====================================================================

export const listArtisans = () => api.get("catalog/artisans").json<Artisan[]>();
export const getArtisanBySlug = (slug: string) => api.get(`catalog/artisans/${slug}`).json<Artisan>();
export const getProductBySlug = (slug: string) => api.get(`catalog/products/${slug}`).json<Product>();

// =====================================================================
// Search
// =====================================================================

export const search = (q: string, types?: string[]) =>
  api.get("search", qs({ q, types: types?.join(",") })).json<{ results: any[] }>();

// =====================================================================
// Orders (guest)
// =====================================================================

export const createOrder = (body: Record<string, unknown>) =>
  api.post("orders", { json: body }).json<{ id: string; token: string; total_cents: number; status: string }>();
export const confirmPayment = (orderId: string, body: Record<string, unknown>) =>
  api.post(`orders/${orderId}/confirm-payment`, { json: body }).json<Order>();
export const getOrder = (orderId: string, token: string) =>
  api.get(`orders/${orderId}`, qs({ token })).json<Order>();
export const getOrderTracking = (orderId: string, token: string) =>
  api.get(`orders/${orderId}/tracking`, qs({ token })).json<{ status: string; events: any[] }>();
export const lookupOrder = (emailOrPhone: string) =>
  api.post("orders/lookup", { json: { contact: emailOrPhone } }).json<{ otp_id: string }>();
export const verifyLookupOtp = (otpId: string, code: string) =>
  api.post("orders/lookup/verify", { json: { otp_id: otpId, code } }).json<{ orders: Order[] }>();

// =====================================================================
// Cafe orders
// =====================================================================

export const createCafeOrder = (body: Record<string, unknown>) =>
  api.post("cafe/orders", { json: body }).json<{ id: string; token: string }>();
export const getCafeOrder = (id: string, token: string) =>
  api.get(`cafe/orders/${id}`, qs({ token })).json<Order>();

// =====================================================================
// Newsletter
// =====================================================================

export const subscribeNewsletter = (body: { email: string; consent?: boolean }) =>
  api.post("newsletter/subscribe", { json: body }).json<{ status: string }>();
export const confirmNewsletter = (token: string) =>
  api.get(`newsletter/confirm`, qs({ token })).json<{ status: string }>();
export const unsubscribeNewsletter = (body: { email: string }) =>
  api.post("newsletter/unsubscribe", { json: body }).json<{ status: string }>();

// =====================================================================
// Contact
// =====================================================================

export const submitContact = (body: Record<string, unknown>) =>
  api.post("contact", { json: body }).json<{ status: string }>();

// =====================================================================
// Gift cards
// =====================================================================

export const createGiftCard = (body: { amount_cents: number; recipient_email?: string; sender_name?: string; message?: string }) =>
  api.post("giftcards", { json: body }).json<{ code: string; amount_cents: number }>();
export const applyGiftCard = (code: string, orderId: string, token: string) =>
  api.post(`giftcards/${code}/apply`, { json: { order_id: orderId, token } }).json<{ remaining_cents: number }>();
export const getGiftCardBalance = (code: string, email: string) =>
  api.get(`giftcards/${code}/balance`, qs({ email })).json<{ balance_cents: number }>();

// =====================================================================
// Auth
// =====================================================================

export interface TokenResponse {
  token: string;
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  user?: AuthUserResponse;
}

function normalizeToken(r: any): TokenResponse {
  return {
    token: r.token || r.access_token,
    access_token: r.access_token,
    token_type: r.token_type,
    expires_in: r.expires_in,
    user: r.user,
  };
}

export const register = async (body: { email: string; password: string; first_name?: string; last_name?: string }): Promise<TokenResponse> =>
  normalizeToken(await api.post("auth/register", { json: body }).json());
export const login = async (body: { email: string; password: string }): Promise<TokenResponse> =>
  normalizeToken(await api.post("auth/login", { json: body }).json());
export const logout = async (): Promise<void> => {
  try { await api.post("auth/logout").json(); } catch { /* ignore */ }
  authStore.clearSession();
};
export const getMe = () => api.get("auth/me").json<AuthUserResponse>();
export const updateMe = (body: Record<string, unknown>) =>
  api.patch("auth/me", { json: body }).json<AuthUserResponse>();
export const forgotPassword = (email: string) =>
  api.post("auth/forgot", { json: { email } }).json<{ status: string }>();
export const resetPassword = (token: string, newPassword: string) =>
  api.post("auth/reset", { json: { token, new_password: newPassword } }).json<{ status: string }>();

export interface AuthUserResponse {
  email: string; first_name?: string; last_name?: string; scope?: string;
  created_at?: string;
}

// =====================================================================
// Account
// =====================================================================

export const getMyOrders = (params?: { limit?: number; offset?: number }) =>
  api.get("account/orders", qs(params)).json<PaginatedList<Order> | Order[]>();
export const getMyLoyalty = () => api.get("account/loyalty").json<{ points: number; tier: string }>();
export const getMyPreferences = () => api.get("account/preferences").json<Record<string, unknown>>();
export const updateMyPreferences = (body: Record<string, unknown>) =>
  api.patch("account/preferences", { json: body }).json<Record<string, unknown>>();

// =====================================================================
// RGPD
// =====================================================================

export const requestRgpdExport = (email: string) =>
  api.post("rgpd/export", { json: { email } }).json<{ status: string }>();
export const requestAccountDeletion = (body: { email: string; reason?: string }) =>
  api.post("rgpd/delete", { json: body }).json<{ status: string }>();
export const confirmAccountDeletion = (token: string) =>
  api.post("rgpd/delete/confirm", { json: { token } }).json<{ status: string }>();
export const getConsents = (key: string) =>
  api.get(`rgpd/consents`, qs({ key })).json<{ consents: any[] }>();
export const recordConsent = (body: { key: string; granted: boolean }) =>
  api.post("rgpd/consents", { json: body }).json<{ status: string }>();

// =====================================================================
// Admin
// =====================================================================

export const adminListOrders = (params?: { status?: string; limit?: number; offset?: number; q?: string }) =>
  api.get("admin/orders", qs(params)).json<PaginatedList<Order> | Order[]>();
export const adminGetOrder = (id: string) => api.get(`admin/orders/${id}`).json<Order>();
export const adminUpdateOrderStatus = (id: string, body: { status: string; note?: string }) =>
  api.patch(`admin/orders/${id}/status`, { json: body }).json<Order>();
export const adminGenerateLabel = (id: string) =>
  api.post(`admin/orders/${id}/label`).json<{ label_url: string }>();
export const adminGetLabelPdfUrl = (id: string) => `${API_URL}/admin/orders/${id}/label/pdf`;
export const adminListProducts = (params?: { type?: string }) =>
  api.get("admin/products", qs(params)).json<any[]>();
export const adminCreateProduct = (body: Record<string, unknown>) =>
  api.post("admin/products", { json: body }).json<any>();
export const adminUpdateProduct = (id: string | number, body: Record<string, unknown>) =>
  api.patch(`admin/products/${id}`, { json: body }).json<any>();
export const adminListCustomers = (params?: { q?: string; limit?: number; offset?: number }) =>
  api.get("admin/customers", qs(params)).json<PaginatedList<any> | any[]>();
export const adminGetCustomer = (email: string) =>
  api.get(`admin/customers/${encodeURIComponent(email)}`).json<any>();
export const adminListEventRegistrations = (slug: string) =>
  api.get(`admin/events/registrations/${slug}`).json<any[]>();
export const adminGetDashboardStats = () =>
  api.get("admin/dashboard/stats").json<Record<string, unknown>>();
export const adminGetStocks = () => api.get("admin/stocks").json<any[]>();
export const adminSyncLibriSoft = () =>
  api.post("admin/stocks/sync-librisoft").json<{ status: string; synced: number }>();
