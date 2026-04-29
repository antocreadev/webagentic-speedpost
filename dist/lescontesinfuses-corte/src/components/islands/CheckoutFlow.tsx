import React, { useEffect, useState } from "react";
import { Check, ChevronDown, MapPin, Truck, Store, CreditCard, Lock } from "lucide-react";
import { cart, type CartItem } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

type Step = 1 | 2 | 3 | 4;

const SHIP = {
  relay: { id: "relay", label: "Mondial Relay", price: 4.9, eta: "3 à 5 jours ouvrés", desc: "Retrait en point relais. Plus de 20 000 commerces partenaires en France." },
  home: { id: "home", label: "Domicile", price: 7.9, eta: "2 à 4 jours ouvrés", desc: "Livraison Colissimo suivi, remise à votre adresse." },
  pickup: { id: "pickup", label: "Click & Collect", price: 0, eta: "Sous 24h, place Paoli", desc: "On vous prépare le paquet et vous prévient par mail. Gratuit." },
} as const;

type ShipKey = keyof typeof SHIP;

export default function CheckoutFlow() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState<Step>(1);
  const [done, setDone] = useState<Record<Step, boolean>>({ 1: false, 2: false, 3: false, 4: false });
  const [ship, setShip] = useState<ShipKey>("relay");
  const [pay, setPay] = useState<"cb" | "paypal">("cb");
  const [cgv, setCgv] = useState(false);

  useEffect(() => cart.subscribe(setItems), []);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = SHIP[ship].price;
  const total = subtotal + shipping;

  const goNext = (n: Step) => { setDone(d => ({ ...d, [step]: true })); setStep(n); };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-display italic text-3xl text-cocoa-600">Votre panier est vide</p>
        <p className="text-cocoa-400 mt-3">Impossible de passer commande sans articles.</p>
        <a href="/livres" className="btn-terracotta mt-6 inline-flex">Découvrir le catalogue</a>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
      <div className="space-y-4">
        <Accordion n={1} title="Coordonnées" current={step} done={done[1]} onOpen={() => setStep(1)}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Prénom" defaultValue="Marie" />
            <Field label="Nom" defaultValue="Andreani" />
            <Field label="Email" type="email" defaultValue="marie.andreani@example.fr" full />
            <Field label="Téléphone" type="tel" defaultValue="06 12 34 56 78" />
            <Field label="Adresse" defaultValue="14 rue de la Citadelle" full />
            <Field label="Code postal" defaultValue="20250" />
            <Field label="Ville" defaultValue="Corte" />
          </div>
          <div className="mt-5 flex items-center gap-2">
            <input id="newsletter-opt" type="checkbox" className="accent-terracotta-400" defaultChecked />
            <label htmlFor="newsletter-opt" className="text-xs text-cocoa-400">Recevoir la lettre mensuelle de la maison.</label>
          </div>
          <button onClick={() => goNext(2)} className="btn-terracotta mt-6">Continuer vers la livraison</button>
        </Accordion>

        <Accordion n={2} title="Livraison" current={step} done={done[2]} onOpen={() => setStep(2)}>
          <div className="grid md:grid-cols-3 gap-3">
            {(Object.keys(SHIP) as ShipKey[]).map((k) => {
              const s = SHIP[k];
              const Icon = k === "relay" ? MapPin : k === "home" ? Truck : Store;
              const active = ship === k;
              return (
                <button
                  key={k}
                  onClick={() => setShip(k)}
                  className={`text-left p-4 rounded-xl border transition-all ${active ? "border-terracotta-400 bg-terracotta-50/40 shadow-book" : "border-line bg-cream-50 hover:border-cocoa-200"}`}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={22} strokeWidth={1.5} className={active ? "text-terracotta-400" : "text-cocoa-400"} />
                    <span className="price-tab text-sm">{s.price === 0 ? "Gratuit" : formatPrice(s.price)}</span>
                  </div>
                  <p className="font-display italic text-lg text-cocoa-700 mt-3">{s.label}</p>
                  <p className="text-[11px] text-cocoa-400 mt-1">{s.eta}</p>
                  <p className="text-xs text-cocoa-700/80 mt-2 leading-snug">{s.desc}</p>
                </button>
              );
            })}
          </div>
          {ship === "relay" && (
            <div className="mt-5 p-4 rounded-lg bg-cream-100/70 border border-line">
              <p className="eyebrow">Point relais sélectionné</p>
              <p className="font-display italic text-lg text-cocoa-700 mt-1">Tabac de la Restonica</p>
              <p className="text-xs text-cocoa-400">8 cours Paoli, 20250 Corte. Lundi à samedi, 7h, 19h30.</p>
              <button className="mt-3 text-xs underline text-terracotta-400">Choisir un autre relais</button>
            </div>
          )}
          <button onClick={() => goNext(3)} className="btn-terracotta mt-6">Continuer vers le paiement</button>
        </Accordion>

        <Accordion n={3} title="Paiement" current={step} done={done[3]} onOpen={() => setStep(3)}>
          <div className="flex gap-2 mb-5">
            <button onClick={() => setPay("cb")} className={`flex-1 px-4 py-3 rounded-lg border text-sm flex items-center justify-center gap-2 transition ${pay === "cb" ? "border-terracotta-400 bg-terracotta-50/40" : "border-line"}`}>
              <CreditCard size={16} /> Carte bancaire
            </button>
            <button onClick={() => setPay("paypal")} className={`flex-1 px-4 py-3 rounded-lg border text-sm flex items-center justify-center gap-2 transition ${pay === "paypal" ? "border-terracotta-400 bg-terracotta-50/40" : "border-line"}`}>
              <span className="font-bold italic">PayPal</span>
            </button>
          </div>
          {pay === "cb" ? (
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Numéro de carte" defaultValue="4242 4242 4242 4242" full />
              <Field label="Expiration" defaultValue="12/28" />
              <Field label="Cryptogramme" defaultValue="123" />
              <Field label="Nom sur la carte" defaultValue="Marie Andreani" full />
            </div>
          ) : (
            <div className="p-6 rounded-lg bg-cream-100/60 border border-line text-center">
              <p className="text-sm text-cocoa-700">Vous serez redirigé vers PayPal pour finaliser le paiement en toute sécurité.</p>
            </div>
          )}
          <p className="mt-4 text-xs text-cocoa-400 flex items-center gap-1.5"><Lock size={12} /> Paiement sécurisé, données chiffrées TLS.</p>
          <button onClick={() => goNext(4)} className="btn-terracotta mt-6">Vérifier la commande</button>
        </Accordion>

        <Accordion n={4} title="Confirmation" current={step} done={done[4]} onOpen={() => setStep(4)}>
          <ul className="divide-y divide-line">
            {items.map(it => (
              <li key={`${it.type}-${it.id}`} className="py-3 flex justify-between gap-3 text-sm">
                <span className="text-cocoa-700">{it.title} <span className="text-cocoa-400">×{it.qty}</span></span>
                <span className="price-tab">{formatPrice(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-start gap-2">
            <input id="cgv" type="checkbox" checked={cgv} onChange={e => setCgv(e.target.checked)} className="mt-1 accent-terracotta-400" />
            <label htmlFor="cgv" className="text-xs text-cocoa-700">J'ai lu et j'accepte les <a href="/cgv" className="underline text-terracotta-400">conditions générales de vente</a> et la <a href="/rgpd" className="underline text-terracotta-400">politique de confidentialité</a>.</label>
          </div>
          <a
            href={cgv ? "/checkout/confirmation" : "#"}
            onClick={(e) => { if (!cgv) e.preventDefault(); }}
            className={`btn-terracotta mt-6 ${!cgv ? "opacity-50 pointer-events-none" : ""}`}
          >
            Régler {formatPrice(total)}
          </a>
        </Accordion>
      </div>

      <aside className="bg-cream-100/60 border border-line rounded-2xl p-6 lg:sticky lg:top-28">
        <p className="eyebrow">Votre commande</p>
        <h2 className="font-display italic text-2xl text-cocoa-700 mt-1 mb-5">Récapitulatif</h2>
        <ul className="space-y-2 text-sm font-sans">
          {items.map(it => (
            <li key={`${it.type}-${it.id}`} className="flex justify-between gap-2">
              <span className="text-cocoa-700 truncate">{it.title} <span className="text-cocoa-400">×{it.qty}</span></span>
              <span className="tabular-nums text-cocoa-700">{formatPrice(it.price * it.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-5 pt-5 border-t border-line space-y-2 text-sm font-sans">
          <div className="flex justify-between"><dt className="text-cocoa-400">Sous-total</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-cocoa-400">{SHIP[ship].label}</dt><dd className="tabular-nums">{shipping === 0 ? "Gratuit" : formatPrice(shipping)}</dd></div>
        </dl>
        <div className="mt-5 pt-5 border-t border-line flex justify-between items-baseline">
          <span className="font-smallcap tracking-widest uppercase text-sm">Total</span>
          <span className="font-display italic text-3xl text-terracotta-400 tabular-nums">{formatPrice(total)}</span>
        </div>
        <p className="text-[11px] text-cocoa-400 mt-4 leading-relaxed">TVA 5,5% sur les livres incluse. Paiement immédiat, expédition sous 48h ouvrés.</p>
      </aside>
    </div>
  );
}

function Accordion({ n, title, current, done, onOpen, children }: { n: Step; title: string; current: Step; done: boolean; onOpen: () => void; children: React.ReactNode }) {
  const open = current === n;
  return (
    <section className={`bg-cream-50 border rounded-2xl transition-all ${open ? "border-cocoa-200 shadow-book" : "border-line"}`}>
      <button onClick={onOpen} className="w-full flex items-center gap-4 px-5 sm:px-6 py-5 text-left">
        <span className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm tabular-nums ${done ? "bg-sage-400 border-sage-400 text-cream-50" : open ? "bg-terracotta-400 border-terracotta-400 text-cream-50" : "border-line text-cocoa-400"}`}>
          {done ? <Check size={14} /> : n}
        </span>
        <span className="flex-1">
          <span className="block font-smallcap tracking-widest uppercase text-[10px] text-cocoa-400">Étape {n} sur 4</span>
          <span className="block font-display italic text-xl text-cocoa-700">{title}</span>
        </span>
        <ChevronDown size={18} className={`text-cocoa-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 sm:px-6 pb-6 border-t border-line/60 pt-5">{children}</div>}
    </section>
  );
}

function Field({ label, type = "text", defaultValue = "", full = false }: { label: string; type?: string; defaultValue?: string; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-[11px] font-smallcap tracking-widest uppercase text-cocoa-400">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-1 w-full bg-paper border border-line rounded-md px-3 py-2.5 text-sm font-sans text-cocoa-700 focus:outline-none focus:border-terracotta-400 transition-colors"
      />
    </label>
  );
}
