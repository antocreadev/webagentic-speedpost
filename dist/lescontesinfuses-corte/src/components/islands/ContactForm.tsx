import React, { useState } from "react";
import { Check, Send } from "lucide-react";
import { toast } from "@/lib/toast";

export default function ContactForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="bg-sage-200/40 border border-sage-400 rounded-2xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-400 text-cream-50 mb-4">
          <Check size={22} />
        </div>
        <p className="font-display italic text-2xl text-cocoa-600">Bien reçu, merci.</p>
        <p className="mt-2 text-sm text-cocoa-700">
          Nous vous répondons sous 48h ouvrées, depuis Corte.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget).entries());
        console.log("Contact", data);
        setDone(true);
        toast.success("Message envoyé. Nous revenons vers vous sous 24h.");
      }}
      className="space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
          Nom
          <input
            name="name"
            required
            type="text"
            className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400"
          />
        </label>
        <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
          Email
          <input
            name="email"
            required
            type="email"
            className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400"
          />
        </label>
      </div>
      <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
        Sujet
        <select
          name="subject"
          className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400"
        >
          <option>Question générale</option>
          <option>Commande de livre</option>
          <option>Événement privé</option>
          <option>Autre</option>
        </select>
      </label>
      <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
        Message
        <textarea
          name="message"
          required
          rows={5}
          className="mt-1 w-full px-4 py-3 rounded-2xl border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400 resize-y"
        />
      </label>
      <label className="flex items-start gap-2 text-xs text-cocoa-400 font-sans">
        <input type="checkbox" required className="mt-0.5 accent-terracotta-400" />
        <span>
          J'accepte que ces données servent à me répondre. Pas de transmission à des tiers (RGPD).
        </span>
      </label>
      <button type="submit" className="btn-terracotta w-full justify-center">
        <Send size={14} /> Envoyer
      </button>
    </form>
  );
}
