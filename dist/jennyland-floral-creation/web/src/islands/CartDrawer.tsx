import { useEffect, useState } from "react";
import {
  type CartItem,
  readCart,
  removeFromCart,
  setQty,
  subtotalCents,
} from "@/lib/cart";
import { formatEur } from "@/lib/format";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const sync = () => setCart(readCart());
    sync();
    const handleOpen = () => {
      setCart(readCart());
      setOpen(true);
    };
    const handleClose = () => setOpen(false);
    window.addEventListener("cart:open", handleOpen);
    window.addEventListener("cart:close", handleClose);
    window.addEventListener("cart:changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cart:open", handleOpen);
      window.removeEventListener("cart:close", handleClose);
      window.removeEventListener("cart:changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function close() {
    setOpen(false);
  }

  const subtotal = subtotalCents(cart);
  const freeShippingThreshold = 10000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <>
      <div className={`cart-overlay ${open ? "open" : ""}`} onClick={close} />
      <aside className={`cart-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <h2 className="font-display text-2xl text-ink">Votre panier</h2>
            <button
              onClick={close}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-2 hover:bg-surface"
              aria-label="Fermer le panier"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m6 6 12 12M6 18 18 6"/></svg>
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
              <div className="cursive text-2xl text-ink-2">Votre panier est encore vide</div>
              <p className="text-sm text-ink-2 leading-relaxed">
                Découvrez la boutique ou composez votre propre bouquet, fleur par fleur.
              </p>
              <div className="mt-2 flex gap-2">
                <a href="/boutique" onClick={close} className="btn-primary">
                  Voir la boutique
                </a>
                <a href="/composer" onClick={close} className="btn-secondary">
                  Composer
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {remainingForFreeShipping > 0 ? (
                  <div className="mb-4 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-xs">
                    <span className="font-medium text-ink">
                      {formatEur(remainingForFreeShipping)} de plus
                    </span>{" "}
                    pour la livraison offerte.
                  </div>
                ) : (
                  <div className="mb-4 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-xs text-ink">
                    🎉 Livraison offerte
                  </div>
                )}

                <ul className="space-y-3">
                  {cart.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 rounded-2xl border border-line bg-white/60 p-3"
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-surface flex items-center justify-center">
                        {item.kind === "product" && item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="cursive text-3xl text-accent">J</span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <h3 className="text-sm font-medium leading-tight text-ink">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => setCart(removeFromCart(i))}
                            className="text-ink-2 hover:text-ink"
                            aria-label="Retirer"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"/></svg>
                          </button>
                        </div>
                        {item.kind === "custom_bouquet" && (
                          <span className="cursive text-xs text-accent mt-0.5">
                            Bouquet composé
                          </span>
                        )}
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="inline-flex items-center gap-1 rounded-full border border-line bg-white">
                            <button
                              onClick={() => setCart(setQty(i, Math.max(1, item.qty - 1)))}
                              className="h-7 w-7 text-ink-2 hover:text-ink"
                            >
                              −
                            </button>
                            <span className="text-sm font-medium px-1">{item.qty}</span>
                            <button
                              onClick={() => setCart(setQty(i, item.qty + 1))}
                              className="h-7 w-7 text-ink-2 hover:text-ink"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-medium text-ink">
                            {formatEur(item.unit_price_cents * item.qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-line px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-ink-2">Sous-total</span>
                  <span className="font-display text-2xl text-ink">
                    {formatEur(subtotal)}
                  </span>
                </div>
                <a
                  href="/checkout"
                  onClick={close}
                  className="btn-primary w-full"
                >
                  Passer au paiement
                </a>
                <a
                  href="/panier"
                  onClick={close}
                  className="btn-ghost mt-2 w-full text-xs"
                >
                  Voir le panier détaillé
                </a>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
