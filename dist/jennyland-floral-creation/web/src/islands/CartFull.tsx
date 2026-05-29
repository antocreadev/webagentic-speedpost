import { useEffect, useState } from "react";
import { type CartItem, readCart, removeFromCart, setQty, subtotalCents } from "@/lib/cart";
import { formatEur } from "@/lib/format";

export default function CartFull() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(readCart());
    const sync = () => setCart(readCart());
    window.addEventListener("cart:changed", sync);
    return () => window.removeEventListener("cart:changed", sync);
  }, []);

  const subtotal = subtotalCents(cart);
  const freeThreshold = 10000;
  const remaining = Math.max(0, freeThreshold - subtotal);
  const shipping = subtotal >= freeThreshold ? 0 : 800;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="rounded-3xl border border-line bg-white/60 px-8 py-16 text-center">
        <div className="cursive text-3xl text-ink-2">Votre panier est encore vide.</div>
        <p className="mt-3 text-sm text-ink-2">Découvrez la boutique ou composez votre bouquet.</p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="/boutique" className="btn-primary">Voir la boutique</a>
          <a href="/composer" className="btn-secondary">Composer un bouquet</a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8 space-y-3">
        {cart.map((item, i) => (
          <article key={i} className="rounded-2xl border border-line bg-white/60 p-4 flex gap-4">
            <div className="flex-shrink-0 h-28 w-28 overflow-hidden rounded-xl bg-surface flex items-center justify-center">
              {item.kind === "product" && item.image_url ? (
                <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <span className="cursive text-5xl text-accent">J</span>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl text-ink leading-tight">{item.name}</h3>
                  {item.kind === "custom_bouquet" && (
                    <p className="cursive text-sm text-accent mt-0.5">Bouquet composé sur le configurateur</p>
                  )}
                  {item.kind === "product" && item.description && (
                    <p className="text-xs text-ink-2 mt-0.5 line-clamp-2">{item.description}</p>
                  )}
                </div>
                <button onClick={() => setCart(removeFromCart(i))} className="text-ink-2 hover:text-ink" aria-label="Retirer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"/></svg>
                </button>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="inline-flex items-center gap-1 rounded-full border border-line bg-white">
                  <button onClick={() => setCart(setQty(i, Math.max(1, item.qty - 1)))} className="h-9 w-9 text-ink-2 hover:text-ink">−</button>
                  <span className="px-3 text-sm font-medium">{item.qty}</span>
                  <button onClick={() => setCart(setQty(i, item.qty + 1))} className="h-9 w-9 text-ink-2 hover:text-ink">+</button>
                </div>
                <div className="text-right">
                  <div className="text-xs text-ink-2">{formatEur(item.unit_price_cents)} × {item.qty}</div>
                  <div className="font-display text-2xl text-ink">{formatEur(item.unit_price_cents * item.qty)}</div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="lg:col-span-4">
        <div className="rounded-3xl border border-line bg-white/60 p-6 lg:sticky lg:top-24">
          <h3 className="font-display text-2xl text-ink mb-6">Récapitulatif</h3>
          {remaining > 0 ? (
            <div className="mb-5 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-xs">
              <span className="font-medium text-ink">{formatEur(remaining)}</span> de plus pour la livraison offerte.
            </div>
          ) : (
            <div className="mb-5 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-xs text-ink">
              🎉 Livraison offerte
            </div>
          )}
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-2">Sous-total</dt>
              <dd className="text-ink">{formatEur(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-2">Livraison estimée</dt>
              <dd className="text-ink">{shipping === 0 ? "Offerte" : formatEur(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3">
              <dt className="font-medium text-ink">Total</dt>
              <dd className="font-display text-2xl text-ink">{formatEur(total)}</dd>
            </div>
          </dl>
          <a href="/checkout" className="btn-primary w-full mt-6">
            Passer au paiement
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
          <p className="mt-3 text-xs text-ink-2 text-center">
            Paiement sécurisé PayPal. SSL chiffré. Données jamais partagées.
          </p>
        </div>
      </aside>
    </div>
  );
}
