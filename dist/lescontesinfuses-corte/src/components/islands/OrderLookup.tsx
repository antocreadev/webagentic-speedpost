import React, { useState } from "react";
import { Loader2, Mail, KeyRound, Check } from "lucide-react";
import { lookupOrder, verifyLookupOtp, apiError } from "@/lib/api";
import { toast } from "@/lib/toast";
import { formatPrice } from "@/lib/format";

type Step = "contact" | "otp" | "list";

const LOOKUP_TOKEN_KEY = "lci_lookup_token";

export default function OrderLookup() {
  const [step, setStep] = useState<Step>("contact");
  const [contact, setContact] = useState("");
  const [otpId, setOtpId] = useState("");
  const [code, setCode] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function requestCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await lookupOrder(contact.trim());
      setOtpId(res.otp_id);
      setStep("otp");
      toast.success("Code envoyé.", "Vérifiez votre email ou vos SMS.");
    } catch (err) {
      const ee = await apiError(err);
      toast.error("Recherche impossible", ee.message);
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res: any = await verifyLookupOtp(otpId, code.trim());
      if (res.jwt_short && typeof window !== "undefined") {
        sessionStorage.setItem(LOOKUP_TOKEN_KEY, res.jwt_short);
        try { sessionStorage.setItem(`${LOOKUP_TOKEN_KEY}_exp`, String(Date.now() + 15 * 60_000)); } catch { /* ignore */ }
      }
      setOrders(res.orders ?? []);
      setStep("list");
    } catch (err) {
      const ee = await apiError(err);
      toast.error("Code invalide", ee.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {step === "contact" && (
        <form onSubmit={requestCode} className="bg-cream-50 border border-line rounded-2xl p-7 md:p-8 space-y-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-terracotta-50 text-terracotta-400">
            <Mail size={20} />
          </div>
          <div>
            <p className="eyebrow">Étape 1 sur 3</p>
            <h2 className="font-display italic text-2xl text-cocoa-700 mt-1">Vos coordonnées</h2>
            <p className="text-sm text-cocoa-400 mt-1">Email ou téléphone utilisé lors de la commande.</p>
          </div>
          <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
            Email ou téléphone
            <input
              type="text" required value={contact} onChange={(e) => setContact(e.target.value)}
              placeholder="vous@exemple.fr ou 06..."
              className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400"
            />
          </label>
          <button type="submit" disabled={loading || !contact.trim()} className="btn-terracotta w-full justify-center disabled:opacity-60">
            {loading ? <><Loader2 size={14} className="animate-spin" /> Envoi du code</> : "Recevoir un code"}
          </button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={verifyCode} className="bg-cream-50 border border-line rounded-2xl p-7 md:p-8 space-y-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-terracotta-50 text-terracotta-400">
            <KeyRound size={20} />
          </div>
          <div>
            <p className="eyebrow">Étape 2 sur 3</p>
            <h2 className="font-display italic text-2xl text-cocoa-700 mt-1">Code à 6 chiffres</h2>
            <p className="text-sm text-cocoa-400 mt-1">Saisissez le code reçu ({contact}).</p>
          </div>
          <input
            type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required
            value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="123456"
            className="w-full text-center px-4 py-3 rounded-full border border-line bg-paper font-display italic text-3xl tracking-[0.4em] text-cocoa-700 focus:outline-none focus:border-terracotta-400"
          />
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep("contact")} className="btn-ghost flex-1 justify-center">Retour</button>
            <button type="submit" disabled={loading || code.length < 4} className="btn-terracotta flex-1 justify-center disabled:opacity-60">
              {loading ? <><Loader2 size={14} className="animate-spin" /> Vérification</> : "Vérifier"}
            </button>
          </div>
        </form>
      )}

      {step === "list" && (
        <div className="bg-cream-50 border border-line rounded-2xl p-7 md:p-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-200/60 text-sage-600 mb-4">
            <Check size={20} />
          </div>
          <p className="eyebrow">Étape 3 sur 3</p>
          <h2 className="font-display italic text-2xl text-cocoa-700 mt-1">Vos commandes</h2>
          {orders.length === 0 ? (
            <p className="text-sm text-cocoa-400 mt-4">Aucune commande trouvée pour ce contact.</p>
          ) : (
            <ul className="mt-5 divide-y divide-line">
              {orders.map((o: any) => {
                const tk = o.public_token || o.token || "";
                return (
                  <li key={o.id} className="py-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-display italic text-lg text-cocoa-700">Commande {o.id}</p>
                      <p className="text-xs text-cocoa-400">
                        {o.created_at ? new Date(o.created_at).toLocaleDateString("fr-FR") : ""}
                        {o.status ? ` · ${o.status}` : ""}
                      </p>
                    </div>
                    <span className="price-tab">{formatPrice((o.total_cents ?? 0) / 100)}</span>
                    <a href={`/suivi/${o.id}?token=${encodeURIComponent(tk)}`} className="btn-ghost text-xs">Suivre</a>
                  </li>
                );
              })}
            </ul>
          )}
          <button type="button" onClick={() => { setStep("contact"); setCode(""); setContact(""); setOrders([]); }}
            className="mt-6 text-xs text-cocoa-400 hover:text-terracotta-400 underline">
            Rechercher un autre contact
          </button>
        </div>
      )}
    </div>
  );
}
