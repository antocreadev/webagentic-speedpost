import React, { useState } from "react";
import { Check } from "lucide-react";

interface Props {
  eventTitle: string;
  remaining: number;
}

export default function EventRegistration({ eventTitle, remaining }: Props) {
  const [done, setDone] = useState(false);
  const [seats, setSeats] = useState(1);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log("Inscription événement", eventTitle, Object.fromEntries(data.entries()));
    setDone(true);
  };

  if (done) {
    return (
      <div className="bg-sage-200/40 border border-sage-400 rounded-2xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-400 text-cream-50 mb-4">
          <Check size={22} />
        </div>
        <p className="font-display italic text-2xl text-cocoa-600">
          C'est noté, on vous attend.
        </p>
        <p className="mt-2 text-sm text-cocoa-700">
          Un courriel de confirmation arrive dans votre boîte. À très vite à Corte.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="bg-cream-50 border border-line rounded-2xl p-6 md:p-8 space-y-4"
    >
      <p className="eyebrow">Réservation</p>
      <h3 className="font-display italic text-2xl text-cocoa-600">Inscrivez-vous</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
          Nom et prénom
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
        <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
          Téléphone
          <input
            name="phone"
            type="tel"
            className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400"
          />
        </label>
        <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
          Nombre de places
          <input
            name="seats"
            type="number"
            min={1}
            max={Math.max(1, remaining)}
            value={seats}
            onChange={(e) => setSeats(+e.target.value)}
            className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400"
          />
        </label>
      </div>

      <label className="flex items-start gap-2 text-xs text-cocoa-400 font-sans">
        <input type="checkbox" required className="mt-0.5 accent-terracotta-400" />
        <span>
          J'accepte que mes données soient utilisées pour confirmer ma réservation. (RGPD)
        </span>
      </label>

      <button type="submit" className="btn-terracotta w-full justify-center">
        Réserver ma place
      </button>
    </form>
  );
}
