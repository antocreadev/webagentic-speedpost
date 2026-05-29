import React, { useEffect, useState } from "react";
import { Plus, Minus, Trash2, Coffee, Loader2 } from "lucide-react";
import type { CafeItem } from "@/data/cafe";
import { cart, type CartItem } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { createCafeOrder, apiError } from "@/lib/api";
import { toast } from "@/lib/toast";

interface Props {
  items: CafeItem[];
}

const labels: Record<string, string> = {
  cafe: "Cafés",
  the: "Thés",
  boisson: "Boissons",
  kombucha: "Kombuchas",
  "the-glace": "Thés glacés",
  dessert: "Desserts",
};

export default function QuickOrder({ items }: Props) {
  const [list, setList] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [slot, setSlot] = useState("15");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => cart.subscribe(setList), []);

  const groups = items.reduce<Record<string, CafeItem[]>>((acc, it) => {
    (acc[it.category] ??= []).push(it);
    return acc;
  }, {});

  const cafeOnly = list.filter((i) => i.type === "boisson");
  const total = cafeOnly.reduce((s, i) => s + i.price * i.qty, 0);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cafeOnly.length === 0 || submitting) return;
    setSubmitting(true);
    try {
      const minutes = Number(slot);
      const pickupTime = new Date(Date.now() + minutes * 60_000).toISOString();
      const res = await createCafeOrder({
        items: cafeOnly.map((i) => ({ boisson_slug: i.id, qty: i.qty })),
        first_name: name,
        pickup_time: pickupTime,
        payment: { method: "onsite" },
      });
      // Clear cafe items only
      cafeOnly.forEach((i) => cart.remove(i.id, i.type));
      toast.success("Commande prise.", `On vous attend dans ${minutes} min.`);
      const tk = (res as any).token || (res as any).public_token || "";
      window.location.assign(`/cafe/confirmation?order=${encodeURIComponent(res.id)}&token=${encodeURIComponent(tk)}`);
    } catch (err) {
      const ee = await apiError(err);
      toast.error("Commande impossible", ee.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8">
      <div className="space-y-10">
        {Object.entries(groups).map(([cat, arr]) => (
          <div key={cat}>
            <h2 className="font-smallcap tracking-windier text-xs uppercase text-cocoa-400 border-b border-line pb-2">
              {labels[cat] ?? cat}
            </h2>
            <ul className="mt-4 divide-y divide-line/60">
              {arr.map((it) => (
                <li key={it.slug}>
                  <button
                    onClick={() =>
                      cart.add({ id: it.slug, type: "boisson", title: it.name, price: it.price })
                    }
                    className="group w-full flex items-center gap-4 py-3 text-left hover:bg-cream-100/40 px-3 -mx-3 rounded-lg transition"
                  >
                    <Coffee size={18} className="text-cocoa-400 shrink-0" strokeWidth={1.4} />
                    <div className="flex-1 min-w-0">
                      <p className="font-display italic text-base text-cocoa-600 group-hover:text-terracotta-400">
                        {it.name}
                      </p>
                      <p className="text-xs text-cocoa-400 truncate">{it.ingredients.join(", ")}</p>
                    </div>
                    <span className="price-tab text-sm">{formatPrice(it.price)}</span>
                    <span className="ml-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-cream-100 text-terracotta-400 group-hover:bg-terracotta-400 group-hover:text-cream-50 transition">
                      <Plus size={14} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start bg-cream-50 border border-line rounded-2xl p-6">
        <p className="eyebrow">Votre panier</p>
        <h3 className="font-display italic text-2xl text-cocoa-600 mt-1">Click & collect</h3>

        {cafeOnly.length === 0 ? (
          <p className="text-sm text-cocoa-400 mt-6 italic">Aucun article. Cliquez sur la carte à gauche.</p>
        ) : (
          <ul className="mt-5 space-y-3">
            {cafeOnly.map((i) => (
              <li key={`${i.type}-${i.id}`} className="flex items-center gap-3 text-sm">
                <div className="flex-1 min-w-0">
                  <p className="font-body text-cocoa-700 truncate">{i.title}</p>
                  <p className="price-tab text-xs">{formatPrice(i.price)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => cart.updateQty(i.id, i.type, i.qty - 1)} aria-label="Moins" className="p-1 rounded-full border border-line hover:border-terracotta-400">
                    <Minus size={12} />
                  </button>
                  <span className="w-6 text-center font-sans text-sm">{i.qty}</span>
                  <button onClick={() => cart.updateQty(i.id, i.type, i.qty + 1)} aria-label="Plus" className="p-1 rounded-full border border-line hover:border-terracotta-400">
                    <Plus size={12} />
                  </button>
                </div>
                <button onClick={() => cart.remove(i.id, i.type)} aria-label="Retirer" className="p-1 text-cocoa-400 hover:text-terracotta-400">
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 pt-5 border-t border-line flex items-center justify-between">
          <span className="eyebrow">Total</span>
          <span className="price-tab text-xl">{formatPrice(total)}</span>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
            Votre prénom
            <input
              type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Élise"
              className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400" />
          </label>
          <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
            Récupération
            <select value={slot} onChange={(e) => setSlot(e.target.value)}
              className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400">
              <option value="15">Dans 15 min</option>
              <option value="30">Dans 30 min</option>
              <option value="45">Dans 45 min</option>
              <option value="60">Dans 1h</option>
            </select>
          </label>
          <button type="submit" disabled={cafeOnly.length === 0 || submitting}
            className="btn-terracotta w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
            {submitting ? <><Loader2 size={14} className="animate-spin" /> Envoi</> : `Récupérer dans ${slot} min`}
          </button>
        </form>
      </aside>
    </div>
  );
}
