import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { type CartItem, clearCart, readCart, subtotalCents } from "@/lib/cart";
import { formatEur, isValidEmail } from "@/lib/format";

declare global {
  interface Window {
    paypal?: any;
  }
}

type Step = "form" | "review" | "paying" | "done" | "error";

export default function Checkout({ paypalClientId }: { paypalClientId: string }) {
  const [step, setStep] = useState<Step>("form");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    postal: "",
    city: "",
    country: "France",
    method: "tracked" as "standard" | "tracked",
    notes: "",
  });
  const [reference, setReference] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setCart(readCart());
    const sync = () => setCart(readCart());
    window.addEventListener("cart:changed", sync);
    return () => window.removeEventListener("cart:changed", sync);
  }, []);

  const subtotal = useMemo(() => subtotalCents(cart), [cart]);
  const freeThreshold = 10000;
  const standardCents = 800;
  const trackedCents = 1200;
  const shipping = subtotal >= freeThreshold ? 0 : form.method === "tracked" ? trackedCents : standardCents;
  const total = subtotal + shipping;

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function validateForm(): string | null {
    if (!form.first_name.trim()) return "Le prénom est requis.";
    if (!form.last_name.trim()) return "Le nom est requis.";
    if (!isValidEmail(form.email)) return "L'email n'est pas valide.";
    if (!form.address.trim()) return "L'adresse est requise.";
    if (!form.postal.trim()) return "Le code postal est requis.";
    if (!form.city.trim()) return "La ville est requise.";
    if (cart.length === 0) return "Votre panier est vide.";
    return null;
  }

  async function submitOrder() {
    const err = validateForm();
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg(null);
    setStep("paying");
    try {
      const res = await api.createOrder({
        customer: {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone || undefined,
        },
        shipping: {
          address: form.address,
          postal: form.postal,
          city: form.city,
          country: form.country,
          method: form.method,
        },
        notes: form.notes || undefined,
        items: cart.map((c) => {
          if (c.kind === "product") {
            return {
              kind: "product",
              ref_id: c.ref_id,
              ref_slug: c.ref_slug,
              name: c.name,
              description: c.description,
              qty: c.qty,
              unit_price_cents: c.unit_price_cents,
            };
          }
          if (c.kind === "custom_bouquet") {
            return {
              kind: "custom_bouquet",
              name: c.name,
              description: c.description,
              qty: c.qty,
              unit_price_cents: c.unit_price_cents,
              custom_payload: c.custom_payload,
            };
          }
          return {
            kind: "unit_item",
            ref_id: c.ref_id,
            ref_slug: c.ref_slug,
            name: c.name,
            qty: c.qty,
            unit_price_cents: c.unit_price_cents,
          };
        }),
      });
      setReference(res.reference);
      setStep("review");
    } catch (e: any) {
      setErrorMsg(e?.message || "Une erreur est survenue.");
      setStep("form");
    }
  }

  // Mount PayPal Buttons when reference is set
  useEffect(() => {
    if (step !== "review" || !reference) return;
    if (!window.paypal) return;
    const container = document.getElementById("paypal-button-container");
    if (!container) return;
    container.innerHTML = "";
    window.paypal
      .Buttons({
        style: { layout: "vertical", color: "gold", shape: "pill", label: "paypal", height: 48 },
        createOrder: async () => {
          const r = await api.paypalCreate({
            reference,
            return_url: `${window.location.origin}/confirmation/${reference}`,
            cancel_url: `${window.location.origin}/panier`,
          });
          return r.paypal_order_id;
        },
        onApprove: async (data: any) => {
          try {
            const r = await api.paypalCapture({ paypal_order_id: data.orderID });
            if (r.status === "paid") {
              clearCart();
              window.location.href = `/confirmation/${reference}`;
            } else {
              setErrorMsg(`Paiement non confirmé (statut: ${r.paypal_status}). Contactez Jenny.`);
              setStep("error");
            }
          } catch (e: any) {
            setErrorMsg(e?.message || "Erreur lors de la capture du paiement.");
            setStep("error");
          }
        },
        onError: (err: any) => {
          setErrorMsg(typeof err === "string" ? err : err?.message || "Erreur PayPal.");
          setStep("error");
        },
        onCancel: () => {
          setErrorMsg("Paiement annulé. Vous pouvez réessayer.");
          setStep("review");
        },
      })
      .render("#paypal-button-container");
  }, [step, reference]);

  if (cart.length === 0 && step === "form") {
    return (
      <div className="rounded-3xl border border-line bg-white/60 px-8 py-16 text-center">
        <p className="cursive text-3xl text-ink-2">Votre panier est vide.</p>
        <a href="/boutique" className="btn-primary mt-6">Voir la boutique</a>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7 space-y-6">
        {step === "form" && (
          <>
            <fieldset className="rounded-3xl border border-line bg-white/60 p-6 space-y-4">
              <legend className="font-display text-2xl text-ink px-2">Vos coordonnées</legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="field-label">Prénom *</label>
                  <input className="field-input" value={form.first_name} onChange={(e) => update("first_name", e.target.value)} />
                </div>
                <div>
                  <label className="field-label">Nom *</label>
                  <input className="field-input" value={form.last_name} onChange={(e) => update("last_name", e.target.value)} />
                </div>
              </div>
              <div>
                <label className="field-label">Email *</label>
                <input type="email" className="field-input" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              <div>
                <label className="field-label">Téléphone (optionnel)</label>
                <input type="tel" className="field-input" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              </div>
            </fieldset>

            <fieldset className="rounded-3xl border border-line bg-white/60 p-6 space-y-4">
              <legend className="font-display text-2xl text-ink px-2">Adresse de livraison</legend>
              <div>
                <label className="field-label">Adresse *</label>
                <input className="field-input" value={form.address} onChange={(e) => update("address", e.target.value)} />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="field-label">Code postal *</label>
                  <input className="field-input" value={form.postal} onChange={(e) => update("postal", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className="field-label">Ville *</label>
                  <input className="field-input" value={form.city} onChange={(e) => update("city", e.target.value)} />
                </div>
              </div>
              <div>
                <label className="field-label">Pays</label>
                <select className="field-input" value={form.country} onChange={(e) => update("country", e.target.value)}>
                  <option>France</option>
                  <option>Belgique</option>
                  <option>Suisse</option>
                  <option>Luxembourg</option>
                </select>
              </div>
              <div>
                <label className="field-label">Mode de livraison</label>
                <div className="grid sm:grid-cols-2 gap-3 mt-1">
                  {[
                    { v: "standard", label: "Mondial Relay", price: standardCents, days: "3-5j" },
                    { v: "tracked", label: "Colissimo Suivi", price: trackedCents, days: "2-3j" },
                  ].map((m) => (
                    <label
                      key={m.v}
                      className={`cursor-pointer rounded-2xl border ${form.method === m.v ? "border-accent bg-accent/10" : "border-line bg-white"} p-4 flex items-start gap-3 transition-all`}
                    >
                      <input
                        type="radio"
                        name="method"
                        checked={form.method === m.v}
                        onChange={() => update("method", m.v as "standard" | "tracked")}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-ink">{m.label}</div>
                        <div className="text-xs text-ink-2 mt-0.5">{m.days}</div>
                      </div>
                      <div className="text-sm font-medium text-ink">{subtotal >= freeThreshold ? "Offerte" : formatEur(m.price)}</div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="field-label">Note pour Jenny (optionnel)</label>
                <textarea
                  className="field-input min-h-[80px]"
                  rows={3}
                  placeholder="Une dédicace, une date à respecter, un détail à préciser…"
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </div>
            </fieldset>

            {errorMsg && (
              <div className="rounded-2xl border border-rose-300 bg-rose-50 px-5 py-3 text-sm text-rose-900">
                {errorMsg}
              </div>
            )}

            <button onClick={submitOrder} className="btn-primary w-full">
              Continuer vers le paiement
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </>
        )}

        {(step === "review" || step === "paying") && (
          <fieldset className="rounded-3xl border border-line bg-white/60 p-6">
            <legend className="font-display text-2xl text-ink px-2">Paiement sécurisé</legend>
            <p className="text-sm text-ink-2 mb-6">
              Référence commande <strong className="text-ink font-mono">{reference}</strong>.
              Choisissez votre moyen de paiement ci-dessous.
            </p>
            <div id="paypal-button-container" className="min-h-[100px]" />
            {step === "paying" && (
              <p className="text-sm text-ink-2 mt-4 text-center">Préparation du paiement…</p>
            )}
            <p className="text-xs text-ink-2 mt-6 text-center leading-relaxed">
              PayPal accepte les cartes Visa, Mastercard, American Express et le compte PayPal.<br/>
              Vous serez redirigée vers la page de confirmation après le paiement.
            </p>
            <button
              onClick={() => {
                setStep("form");
                setReference(null);
              }}
              className="btn-ghost w-full mt-4 text-xs"
            >
              ← Modifier mes coordonnées
            </button>
          </fieldset>
        )}

        {step === "error" && (
          <div className="rounded-3xl border border-rose-300 bg-rose-50 p-6">
            <h3 className="font-display text-2xl text-rose-900">Une erreur est survenue</h3>
            <p className="text-sm text-rose-900 mt-2">{errorMsg}</p>
            <button onClick={() => setStep("review")} className="btn-secondary mt-4">Réessayer</button>
          </div>
        )}
      </div>

      <aside className="lg:col-span-5">
        <div className="rounded-3xl border border-line bg-white/60 p-6 lg:sticky lg:top-24">
          <h3 className="font-display text-2xl text-ink mb-4">Récapitulatif</h3>
          <ul className="space-y-3 mb-6 max-h-72 overflow-y-auto">
            {cart.map((item, i) => (
              <li key={i} className="flex gap-3">
                <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-surface flex items-center justify-center">
                  {item.kind === "product" && item.image_url ? (
                    <img src={item.image_url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="cursive text-2xl text-accent">J</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-ink truncate">{item.name}</div>
                  <div className="text-xs text-ink-2">×{item.qty}</div>
                </div>
                <div className="text-sm font-medium text-ink whitespace-nowrap">{formatEur(item.unit_price_cents * item.qty)}</div>
              </li>
            ))}
          </ul>
          <dl className="border-t border-line pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-ink-2">Sous-total</dt><dd>{formatEur(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-2">Livraison</dt><dd>{shipping === 0 ? "Offerte" : formatEur(shipping)}</dd></div>
            <div className="flex justify-between border-t border-line pt-3"><dt className="font-medium text-ink">Total</dt><dd className="font-display text-2xl text-ink">{formatEur(total)}</dd></div>
          </dl>
        </div>
      </aside>
    </div>
  );
}
