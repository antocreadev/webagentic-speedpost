import React, { useState } from "react";
import { Check, Send, Loader2 } from "lucide-react";
import { toast } from "@/lib/toast";
import { submitContact, apiError } from "@/lib/api";

export default function ContactForm() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (done) {
    return (
      <div className="bg-sage-200/40 border border-sage-400 rounded-2xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-400 text-cream-50 mb-4">
          <Check size={22} />
        </div>
        <p className="font-display italic text-2xl text-cocoa-600">Bien reçu, merci.</p>
        <p className="mt-2 text-sm text-cocoa-700">
          Nous vous répondons sous 24h ouvrées, depuis Corte.
        </p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: fd.get("phone") ? String(fd.get("phone")) : undefined,
      subject: String(fd.get("subject") ?? "Question générale"),
      message: String(fd.get("message") ?? ""),
      consent_privacy: true,
    };
    setLoading(true);
    try {
      await submitContact(body);
      toast.success("Message envoyé.", "Nous revenons vers vous sous 24h.");
      setDone(true);
    } catch (err) {
      const e = await apiError(err);
      toast.error("Envoi impossible", e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
          Nom
          <input name="name" required type="text"
            className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400" />
        </label>
        <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
          Email
          <input name="email" required type="email"
            className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400" />
        </label>
      </div>
      <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
        Téléphone (facultatif)
        <input name="phone" type="tel"
          className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400" />
      </label>
      <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
        Sujet
        <select name="subject"
          className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400">
          <option>Question générale</option>
          <option>Commande de livre</option>
          <option>Événement privé</option>
          <option>Autre</option>
        </select>
      </label>
      <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
        Message
        <textarea name="message" required rows={5}
          className="mt-1 w-full px-4 py-3 rounded-2xl border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400 resize-y" />
      </label>
      <label className="flex items-start gap-2 text-xs text-cocoa-400 font-sans">
        <input type="checkbox" required className="mt-0.5 accent-terracotta-400" />
        <span>
          J'accepte que ces données servent à me répondre. Pas de transmission à des tiers (RGPD).
        </span>
      </label>
      <button type="submit" disabled={loading} className="btn-terracotta w-full justify-center disabled:opacity-60">
        {loading ? <><Loader2 size={14} className="animate-spin" /> Envoi en cours</> : <><Send size={14} /> Envoyer</>}
      </button>
    </form>
  );
}
