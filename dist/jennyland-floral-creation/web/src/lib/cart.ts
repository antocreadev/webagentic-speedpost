// Tiny cart state, persisted in localStorage.
// Lives entirely client-side. Server validates prices on order creation.

export type CartItem =
  | {
      kind: "product";
      ref_id: number;
      ref_slug: string;
      name: string;
      description?: string;
      qty: number;
      unit_price_cents: number;
      image_url?: string | null;
    }
  | {
      kind: "custom_bouquet";
      name: string;
      description?: string;
      qty: number;
      unit_price_cents: number;
      custom_payload: { items: { ref_id: number; slug: string; name: string; svg_id: string; hex?: string }[] };
    }
  | {
      kind: "unit_item";
      ref_id: number;
      ref_slug: string;
      name: string;
      qty: number;
      unit_price_cents: number;
    };

const KEY = "jl_cart_v1";

export function readCart(): CartItem[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? (arr as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function writeCart(cart: CartItem[]): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(cart));
  // Notify other tabs / components.
  window.dispatchEvent(new CustomEvent("cart:changed"));
}

export function addToCart(item: CartItem): CartItem[] {
  const cart = readCart();
  // Merge same product by ref_id.
  if (item.kind === "product" || item.kind === "unit_item") {
    const existing = cart.find(
      (x) => x.kind === item.kind && (x as any).ref_id === item.ref_id
    );
    if (existing) {
      existing.qty += item.qty;
    } else {
      cart.push(item);
    }
  } else {
    cart.push(item);
  }
  writeCart(cart);
  return cart;
}

export function removeFromCart(index: number): CartItem[] {
  const cart = readCart();
  cart.splice(index, 1);
  writeCart(cart);
  return cart;
}

export function setQty(index: number, qty: number): CartItem[] {
  const cart = readCart();
  if (cart[index]) {
    cart[index].qty = Math.max(1, qty);
    writeCart(cart);
  }
  return cart;
}

export function clearCart(): void {
  writeCart([]);
}

export function subtotalCents(cart: CartItem[]): number {
  return cart.reduce((acc, item) => acc + item.unit_price_cents * item.qty, 0);
}

export function itemCount(cart: CartItem[]): number {
  return cart.reduce((acc, item) => acc + item.qty, 0);
}
