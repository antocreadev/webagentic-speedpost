import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, BookOpen } from "lucide-react";
import { cart, type CartItem } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

const SHIPPING_THRESHOLD = 49;

export default function CartView() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = cart.subscribe((next) => setItems(next));
    setHydrated(true);
    return unsub;
  }, []);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const remainingForFreeShip = Math.max(0, SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100);

  if (!hydrated) {
    return <div className="min-h-[400px]" />;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-cream-100 border border-line mb-6">
          <ShoppingBag size={36} strokeWidth={1.4} className="text-cocoa-400" />
        </div>
        <p className="eyebrow"><span className="filet"></span><span className="mx-3">Votre panier</span><span className="filet"></span></p>
        <h1 className="font-display italic text-4xl md:text-5xl text-cocoa-600 mt-3">Encore vide, mais plein de promesses</h1>
        <p className="font-body text-cocoa-400 mt-4">Glissez ici un roman corse, un thé chaud, une bougie d'artisan. Le panier patiente, comme un libraire bienveillant.</p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="/livres" className="btn-terracotta"><BookOpen size={16} /> Parcourir les livres</a>
          <a href="/cafe" className="btn-ghost">Voir la carte café</a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
      <section>
        <div className="flex items-end justify-between mb-6 pb-4 border-b border-line">
          <div>
            <p className="eyebrow">Panier</p>
            <h1 className="font-display italic text-3xl md:text-4xl text-cocoa-600 mt-1">{items.length} article{items.length > 1 ? "s" : ""}</h1>
          </div>
          <button
            onClick={() => { if (confirm("Vider le panier ?")) cart.clear(); }}
            className="text-xs font-sans text-cocoa-400 hover:text-terracotta-400 transition-colors flex items-center gap-1"
          >
            <Trash2 size={12} /> Tout retirer
          </button>
        </div>

        <ul className="divide-y divide-line">
          {items.map((it) => {
            const [g1, g2] = colorsFor(it);
            return (
              <li key={`${it.type}-${it.id}`} className="py-5 flex gap-4 sm:gap-6">
                <div
                  className="shrink-0 w-20 sm:w-24 aspect-[2/3] rounded-sm shadow-book overflow-hidden flex items-end p-2"
                  style={{ background: `linear-gradient(155deg, ${g1} 0%, ${g2} 100%)` }}
                >
                  <span className="text-cream-50/90 font-display italic text-xs leading-tight line-clamp-3">{it.title}</span>
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] eyebrow">{labelFor(it.type)}</p>
                      <p className="font-display italic text-lg text-cocoa-700 leading-tight">{it.title}</p>
                      <p className="text-xs text-cocoa-400 mt-1">Prix unitaire : {formatPrice(it.price)}</p>
                    </div>
                    <p className="price-tab text-lg whitespace-nowrap">{formatPrice(it.price * it.qty)}</p>
                  </div>
                  <div className="mt-auto pt-3 flex items-center gap-3">
                    <div className="inline-flex items-center border border-line rounded-full bg-cream-50">
                      <button
                        onClick={() => cart.updateQty(it.id, it.type, Math.max(0, it.qty - 1))}
                        aria-label="Diminuer la quantité"
                        className="p-1.5 hover:text-terracotta-400 transition-colors"
                      ><Minus size={14} /></button>
                      <span className="w-8 text-center font-sans text-sm tabular-nums">{it.qty}</span>
                      <button
                        onClick={() => cart.updateQty(it.id, it.type, it.qty + 1)}
                        aria-label="Augmenter la quantité"
                        className="p-1.5 hover:text-terracotta-400 transition-colors"
                      ><Plus size={14} /></button>
                    </div>
                    <button
                      onClick={() => cart.remove(it.id, it.type)}
                      className="text-xs text-cocoa-400 hover:text-terracotta-400 transition-colors flex items-center gap-1"
                    ><Trash2 size={12} /> Retirer</button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <a href="/livres" className="mt-8 inline-flex items-center gap-2 text-sm text-cocoa-400 hover:text-terracotta-400 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Continuer mes lectures
        </a>
      </section>

      <aside className="bg-cream-100/60 border border-line rounded-2xl p-6 lg:sticky lg:top-28">
        <p className="eyebrow">Récapitulatif</p>
        <h2 className="font-display italic text-2xl text-cocoa-700 mt-1 mb-5">Votre commande</h2>

        <dl className="space-y-2 font-sans text-sm">
          <div className="flex justify-between"><dt className="text-cocoa-400">Sous-total</dt><dd className="tabular-nums text-cocoa-700">{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-cocoa-400">Livraison estimée</dt><dd className="tabular-nums text-cocoa-700">à choisir</dd></div>
        </dl>

        {remainingForFreeShip > 0 ? (
          <div className="mt-5 p-3 rounded-lg bg-paper border border-line">
            <p className="text-xs text-cocoa-400">Plus que <span className="text-terracotta-400 font-medium">{formatPrice(remainingForFreeShip)}</span> pour la livraison Mondial Relay offerte.</p>
            <div className="mt-2 h-1.5 bg-cream-200 rounded-full overflow-hidden">
              <div className="h-full bg-terracotta-400 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <p className="mt-5 text-xs text-sage-600 font-sans">Livraison Mondial Relay offerte, vous y êtes.</p>
        )}

        <div className="mt-6 pt-6 border-t border-line flex justify-between items-baseline">
          <span className="font-smallcap tracking-widest uppercase text-sm text-cocoa-700">Total</span>
          <span className="font-display italic text-3xl text-terracotta-400 tabular-nums">{formatPrice(subtotal)}</span>
        </div>

        <a href="/checkout" className="btn-terracotta w-full justify-center mt-6">
          Passer commande <ArrowRight size={14} />
        </a>
        <p className="text-[11px] text-cocoa-400 text-center mt-3 font-sans">Paiement sécurisé, CB ou PayPal.</p>
      </aside>
    </div>
  );
}

function labelFor(t: CartItem["type"]) {
  if (t === "book") return "Livre";
  if (t === "boisson") return "Boisson";
  return "Artisanat";
}

function colorsFor(it: CartItem): [string, string] {
  if (it.type === "book") return ["#5C3820", "#3A2014"];
  if (it.type === "boisson") return ["#C77A4F", "#9A4F2A"];
  return ["#8A9876", "#5A6647"];
}
