import React, { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { forgotPassword, apiError } from "@/lib/api";
import { toast } from "@/lib/toast";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email.trim());
      setDone(true);
      toast.success("Email envoyé.", "Vérifiez votre boîte aux lettres.");
    } catch (err) {
      const ee = await apiError(err);
      toast.error("Demande impossible", ee.message);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-200/60 text-sage-600 mb-3">
          <Check size={20} />
        </div>
        <p className="font-display italic text-2xl text-cocoa-700">Email envoyé.</p>
        <p className="text-sm text-cocoa-400 mt-2">Si l'adresse correspond à un compte, vous recevrez un lien sous quelques minutes.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
        Email du compte
        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email"
          className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400" />
      </label>
      <button type="submit" disabled={loading} className="btn-terracotta w-full justify-center disabled:opacity-60">
        {loading ? <><Loader2 size={14} className="animate-spin" /> Envoi</> : "Recevoir un lien"}
      </button>
    </form>
  );
}
