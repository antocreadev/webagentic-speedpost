import React, { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { registerEvent, getEventSeats, apiError } from "@/lib/api";
import { toast } from "@/lib/toast";

interface Props {
  slug?: string;
  eventTitle: string;
  remaining: number;
}

export default function EventRegistration({ slug, eventTitle, remaining }: Props) {
  const [done, setDone] = useState<null | { name: string; seats: number }>(null);
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const seatsCount = Number(fd.get("seats") ?? seats);
    const consent_marketing = fd.get("marketing") === "on";

    setLoading(true);
    try {
      if (slug) {
        try {
          const s = await getEventSeats(slug);
          if ((s.available ?? remaining) < seatsCount) {
            toast.error("Plus assez de places", `Plus que ${s.available ?? remaining} places disponibles.`);
            setLoading(false);
            return;
          }
        } catch { /* fallback to client remaining */ }
      }
      if (slug) {
        await registerEvent(slug, {
          name, email, phone, seats: seatsCount,
          payment: { method: "free" },
          consent_terms: true,
          consent_marketing,
        });
      }
      toast.success("Inscription confirmée.", `Un email part vers ${email}.`);
      setDone({ name, seats: seatsCount });
    } catch (err) {
      const ee = await apiError(err);
      toast.error("Inscription impossible", ee.message);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="bg-sage-200/40 border border-sage-400 rounded-2xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-400 text-cream-50 mb-4">
          <Check size={22} />
        </div>
        <p className="font-display italic text-2xl text-cocoa-600">C'est noté, {done.name}.</p>
        <p className="mt-2 text-sm text-cocoa-700">
          {done.seats} place{done.seats > 1 ? "s" : ""} pour {eventTitle}. Un courriel de confirmation arrive.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-cream-50 border border-line rounded-2xl p-6 md:p-8 space-y-4" id="registration">
      <p className="eyebrow">Réservation</p>
      <h3 className="font-display italic text-2xl text-cocoa-600">Inscrivez-vous</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
          Nom et prénom
          <input name="name" required type="text"
            className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400" />
        </label>
        <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
          Email
          <input name="email" required type="email"
            className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400" />
        </label>
        <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
          Téléphone
          <input name="phone" type="tel"
            className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400" />
        </label>
        <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
          Nombre de places
          <input name="seats" type="number" min={1} max={Math.max(1, remaining)} value={seats}
            onChange={(e) => setSeats(+e.target.value)}
            className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400" />
        </label>
      </div>

      <label className="flex items-start gap-2 text-xs text-cocoa-400 font-sans">
        <input type="checkbox" required className="mt-0.5 accent-terracotta-400" />
        <span>J'accepte que mes données soient utilisées pour confirmer ma réservation. (RGPD)</span>
      </label>
      <label className="flex items-start gap-2 text-xs text-cocoa-400 font-sans">
        <input name="marketing" type="checkbox" className="mt-0.5 accent-terracotta-400" />
        <span>Je souhaite recevoir la lettre mensuelle (facultatif).</span>
      </label>

      <button type="submit" disabled={loading} className="btn-terracotta w-full justify-center disabled:opacity-60">
        {loading ? <><Loader2 size={14} className="animate-spin" /> Réservation</> : "Réserver ma place"}
      </button>
    </form>
  );
}
