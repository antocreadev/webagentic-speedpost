// Minimal pub/sub store, persisted in localStorage
export type CartItemType = "book" | "product" | "boisson";
export interface CartItem {
  id: string;
  type: CartItemType;
  title: string;
  price: number;
  qty: number;
}

const KEY = "lci-cart-v1";
type Listener = (items: CartItem[]) => void;
const listeners = new Set<Listener>();

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((l) => l(items));
}

export const cart = {
  get(): CartItem[] {
    return read();
  },
  add(item: Omit<CartItem, "qty"> & { qty?: number }) {
    const items = read();
    const existing = items.find((i) => i.id === item.id && i.type === item.type);
    if (existing) {
      existing.qty += item.qty ?? 1;
    } else {
      items.push({ ...item, qty: item.qty ?? 1 });
    }
    write(items);
  },
  remove(id: string, type: CartItemType) {
    write(read().filter((i) => !(i.id === id && i.type === type)));
  },
  updateQty(id: string, type: CartItemType, qty: number) {
    const items = read().map((i) =>
      i.id === id && i.type === type ? { ...i, qty } : i
    );
    write(items.filter((i) => i.qty > 0));
  },
  clear() {
    write([]);
  },
  total(): number {
    return read().reduce((sum, i) => sum + i.price * i.qty, 0);
  },
  count(): number {
    return read().reduce((sum, i) => sum + i.qty, 0);
  },
  subscribe(fn: Listener): () => void {
    listeners.add(fn);
    fn(read());
    return () => listeners.delete(fn);
  },
};
