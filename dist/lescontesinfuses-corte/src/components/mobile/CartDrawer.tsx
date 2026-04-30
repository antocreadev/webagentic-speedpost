import React, { useEffect, useRef, useState } from "react";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { cart, type CartItem } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const dragY = useRef(0);

  useEffect(() => {
    const unsub = cart.subscribe((next) => setItems(next));
    const onOpen = () => setOpen(true);
    window.addEventListener("lci:open-cart", onOpen);
    return () => {
      unsub();
      window.removeEventListener("lci:open-cart", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  const onPointerDown = (e: React.PointerEvent) => {
    startY.current = e.clientY;
    dragY.current = 0;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (startY.current == null) return;
    const dy = e.clientY - startY.current;
    if (dy > 0 && sheetRef.current) {
      dragY.current = dy;
      sheetRef.current.style.transform = `translateY(${dy}px)`;
    }
  };
  const onPointerUp = () => {
    if (startY.current == null) return;
    if (sheetRef.current) {
      sheetRef.current.style.transition = "transform 250ms cubic-bezier(.2,.7,.2,1)";
      if (dragY.current > 120) {
        setOpen(false);
      } else {
        sheetRef.current.style.transform = "translateY(0)";
      }
      setTimeout(() => {
        if (sheetRef.current) sheetRef.current.style.transition = "";
      }, 260);
    }
    startY.current = null;
    dragY.current = 0;
  };

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-cocoa-900/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mon panier"
        className={`absolute inset-x-0 bottom-0 max-h-[90vh] bg-paper rounded-t-3xl shadow-2xl flex flex-col transition-transform duration-300 ease-out ${open ? "translate-y-0" : "translate-y-full"}`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div
          className="pt-3 pb-2 flex justify-center cursor-grab touch-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <span className="block w-10 h-1.5 rounded-full bg-line" />
        </div>
        <div className="px-5 pb-3 flex items-center justify-between border-b border-line">
          <div>
            <p className="eyebrow">Mon panier</p>
            <p className="font-display italic text-2xl text-cocoa-600 mt-0.5">{count} article{count > 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fermer le panier"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-cocoa-600 hover:text-terracotta-400"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cream-100 border border-line mb-5">
                <ShoppingBag size={30} strokeWidth={1.4} className="text-cocoa-400" />
              </div>
              <p className="font-display italic text-2xl text-cocoa-600">Panier vide</p>
              <p className="font-body text-cocoa-400 text-sm mt-2">Glissez ici un livre ou une boisson.</p>
              <a href="/livres" onClick={() => setOpen(false)} className="btn-terracotta mt-6 inline-flex">Voir les livres</a>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {items.map((it) => (
                <li key={`${it.type}-${it.id}`} className="py-4 flex items-start gap-3">
                  <div className="w-14 h-14 rounded-lg bg-cream-100 border border-line flex items-center justify-center text-cocoa-400 shrink-0">
                    <ShoppingBag size={20} strokeWidth={1.4} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-cocoa-700 text-[15px] leading-tight truncate">{it.title}</p>
                    <p className="text-xs text-cocoa-400 mt-0.5">{formatPrice(it.price)}</p>
                    <div className="mt-2 flex items-center gap-1">
                      <button
                        aria-label="Diminuer"
                        onClick={() => cart.updateQty(it.id, it.type, Math.max(0, it.qty - 1))}
                        className="min-w-[36px] min-h-[36px] flex items-center justify-center border border-line rounded-full text-cocoa-600 hover:border-terracotta-400 hover:text-terracotta-400"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 font-sans tabular-nums text-sm">{it.qty}</span>
                      <button
                        aria-label="Augmenter"
                        onClick={() => cart.updateQty(it.id, it.type, it.qty + 1)}
                        className="min-w-[36px] min-h-[36px] flex items-center justify-center border border-line rounded-full text-cocoa-600 hover:border-terracotta-400 hover:text-terracotta-400"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        aria-label="Retirer"
                        onClick={() => cart.remove(it.id, it.type)}
                        className="ml-auto min-w-[36px] min-h-[36px] flex items-center justify-center text-cocoa-400 hover:text-terracotta-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="price-tab text-base shrink-0">{formatPrice(it.price * it.qty)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line px-5 py-4 bg-cream-50">
            <div className="flex items-baseline justify-between mb-3">
              <span className="eyebrow">Sous-total</span>
              <span className="price-tab text-2xl">{formatPrice(subtotal)}</span>
            </div>
            <a
              href="/checkout"
              onClick={() => setOpen(false)}
              className="btn-terracotta w-full justify-center text-base py-4"
              style={{ minHeight: 52 }}
            >
              Passer commande <ArrowRight size={16} />
            </a>
            <a
              href="/panier"
              onClick={() => setOpen(false)}
              className="block text-center text-xs font-sans text-cocoa-400 hover:text-terracotta-400 mt-3"
            >
              Voir le panier complet
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
