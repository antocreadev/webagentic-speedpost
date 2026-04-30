import React, { useState } from "react";
import { Mail, CreditCard, Check } from "lucide-react";

const AMOUNTS = [20, 30, 50, 75, 100];

export default function GiftCardPreview() {
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("Que ces pages t'enveloppent comme une couverture chaude.");
  const [delivery, setDelivery] = useState<"email" | "papier">("email");
  const [done, setDone] = useState(false);

  const finalAmount = custom ? Number(custom) || amount : amount;

  if (done) {
    return (
      <div className="bg-sage-200/40 border border-sage-400 rounded-2xl p-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage-400 text-cream-50 mb-4">
          <Check size={26} />
        </div>
        <p className="font-display italic text-3xl text-cocoa-600">Carte cadeau préparée.</p>
        <p className="mt-3 text-cocoa-700">
          Un récapitulatif a été envoyé à votre adresse. Paiement sécurisé à l'étape suivante.
        </p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
      {/* FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("GiftCard", { finalAmount, to, from, message, delivery });
          setDone(true);
        }}
        className="space-y-7"
      >
        <div>
          <label className="eyebrow block mb-3">Montant</label>
          <div className="flex flex-wrap gap-2">
            {AMOUNTS.map((a) => (
              <button
                type="button"
                key={a}
                onClick={() => { setAmount(a); setCustom(""); }}
                className={`px-5 py-3 rounded-full border font-display text-xl transition ${amount === a && !custom ? "bg-cocoa-600 text-cream-50 border-cocoa-600" : "border-line text-cocoa-600 hover:border-terracotta-400"}`}
              >
                {a} €
              </button>
            ))}
            <input
              type="number"
              min="10"
              max="500"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="autre"
              className="w-28 px-4 py-3 rounded-full border border-line bg-cream-50 font-display text-xl text-cocoa-600 focus:outline-none focus:border-terracotta-400"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="eyebrow block mb-2">Pour</label>
            <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Lucia" className="w-full px-4 py-3 bg-cream-50 border border-line rounded-lg font-body text-cocoa-700" />
          </div>
          <div>
            <label className="eyebrow block mb-2">De</label>
            <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Anto" className="w-full px-4 py-3 bg-cream-50 border border-line rounded-lg font-body text-cocoa-700" />
          </div>
        </div>

        <div>
          <label className="eyebrow block mb-2">Dédicace</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            maxLength={160}
            className="w-full px-4 py-3 bg-cream-50 border border-line rounded-lg font-body italic text-cocoa-700 resize-none"
          />
          <p className="text-right text-xs font-sans text-cocoa-400 mt-1">{message.length}/160</p>
        </div>

        <div>
          <label className="eyebrow block mb-3">Livraison</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDelivery("email")}
              className={`flex items-center gap-3 px-5 py-4 rounded-xl border transition ${delivery === "email" ? "bg-cocoa-600 text-cream-50 border-cocoa-600" : "border-line text-cocoa-600 hover:border-terracotta-400"}`}
            >
              <Mail size={18} /> <span className="font-smallcap text-xs tracking-widest uppercase">Email</span>
            </button>
            <button
              type="button"
              onClick={() => setDelivery("papier")}
              className={`flex items-center gap-3 px-5 py-4 rounded-xl border transition ${delivery === "papier" ? "bg-cocoa-600 text-cream-50 border-cocoa-600" : "border-line text-cocoa-600 hover:border-terracotta-400"}`}
            >
              <CreditCard size={18} /> <span className="font-smallcap text-xs tracking-widest uppercase">Papier</span>
            </button>
          </div>
        </div>

        <button type="submit" className="btn-terracotta w-full justify-center">
          Offrir {finalAmount} €
        </button>
      </form>

      {/* PREVIEW CARD */}
      <div className="lg:sticky lg:top-32">
        <div className="relative rounded-2xl overflow-hidden shadow-page">
          <svg viewBox="0 0 400 250" className="w-full h-auto block bg-gradient-to-br from-cream-100 via-cream-50 to-terracotta-50">
            <defs>
              <linearGradient id="gc-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F7EFD8" />
                <stop offset="100%" stopColor="#E2B594" />
              </linearGradient>
            </defs>
            <rect width="400" height="250" fill="url(#gc-bg)" />
            {/* Lace frame */}
            <rect x="14" y="14" width="372" height="222" fill="none" stroke="#7C4F31" strokeWidth="1" />
            <rect x="20" y="20" width="360" height="210" fill="none" stroke="#C77A4F" strokeWidth="0.5" strokeDasharray="2 4" />
            {/* Medallion */}
            <circle cx="200" cy="60" r="22" fill="none" stroke="#7C4F31" strokeWidth="0.8" />
            <circle cx="200" cy="60" r="16" fill="none" stroke="#C77A4F" strokeWidth="0.6" strokeDasharray="1 2" />
            <text x="200" y="55" textAnchor="middle" fontFamily="Cormorant SC" fontSize="6" letterSpacing="1.5" fill="#4A2D1F">LES CONTES</text>
            <text x="200" y="65" textAnchor="middle" fontFamily="Cormorant SC" fontSize="6" letterSpacing="1.5" fill="#4A2D1F">INFUSÉS</text>
            <text x="200" y="105" textAnchor="middle" fontFamily="Cormorant Garamond" fontStyle="italic" fontSize="40" fill="#4A2D1F">{finalAmount} €</text>
            <text x="200" y="135" textAnchor="middle" fontFamily="Cormorant SC" fontSize="9" letterSpacing="3" fill="#7C4F31">CARTE CADEAU</text>
            <line x1="80" y1="155" x2="320" y2="155" stroke="#D9C8A8" />
            <text x="200" y="178" textAnchor="middle" fontFamily="Pinyon Script" fontSize="14" fill="#C77A4F">{to ? `Pour ${to}` : "Pour..."}</text>
            <foreignObject x="40" y="185" width="320" height="40">
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontFamily: "Lora, serif", fontStyle: "italic", fontSize: 9, color: "#4A2D1F", textAlign: "center", lineHeight: 1.4 }}>
                {message}
              </div>
            </foreignObject>
            <text x="200" y="225" textAnchor="middle" fontFamily="Cormorant Garamond" fontStyle="italic" fontSize="10" fill="#7C4F31">{from ? `de ${from}` : "de..."}</text>
          </svg>
        </div>
        <p className="text-center mt-4 text-xs font-sans text-cocoa-400 italic">
          Aperçu en temps réel. Le visuel imprimé peut varier de quelques nuances.
        </p>
      </div>
    </div>
  );
}
