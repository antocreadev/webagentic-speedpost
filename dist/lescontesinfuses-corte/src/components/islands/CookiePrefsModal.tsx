import React, { useState } from "react";
import { X, Check } from "lucide-react";

export default function CookiePrefsModal() {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <button type="button" onClick={() => { setOpen(true); setSaved(false); }} className="btn-terracotta">
        Gérer mes préférences
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-cocoa-800/55 backdrop-blur-sm">
          <div className="bg-cream-50 border border-line rounded-2xl max-w-md w-full p-8 relative shadow-page">
            <button type="button" aria-label="Fermer" onClick={() => setOpen(false)} className="absolute top-4 right-4 p-1 text-cocoa-400 hover:text-cocoa-700">
              <X size={18} />
            </button>
            <p className="eyebrow">Cookies</p>
            <h3 className="font-display italic text-2xl text-cocoa-700 mt-1">Vos préférences</h3>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-4 p-4 rounded-lg bg-cream-100/60 border border-line">
                <div className="shrink-0 mt-0.5 w-11 h-6 rounded-full bg-cocoa-400/40 p-0.5">
                  <span className="block w-5 h-5 rounded-full bg-cream-50 translate-x-5 shadow"></span>
                </div>
                <div className="flex-1">
                  <p className="font-display italic text-lg text-cocoa-700">Cookies essentiels</p>
                  <p className="text-xs text-cocoa-400 mt-1">Session, panier, mémorisation des choix de consentement. Indispensables au fonctionnement, non désactivables.</p>
                </div>
              </li>

              <li className="flex items-start gap-4 p-4 rounded-lg bg-cream-50 border border-line">
                <button
                  type="button"
                  role="switch"
                  aria-checked={analytics}
                  onClick={() => setAnalytics(v => !v)}
                  className={`shrink-0 mt-0.5 w-11 h-6 rounded-full p-0.5 transition-colors ${analytics ? "bg-terracotta-400" : "bg-cream-200"}`}
                >
                  <span className={`block w-5 h-5 rounded-full bg-cream-50 shadow transition-transform ${analytics ? "translate-x-5" : ""}`}></span>
                </button>
                <div className="flex-1">
                  <p className="font-display italic text-lg text-cocoa-700">Cookies analytiques</p>
                  <p className="text-xs text-cocoa-400 mt-1">Plausible auto-hébergé : audience anonymisée (sans IP, sans fingerprint). Nous aide à comprendre les pages les plus lues.</p>
                </div>
              </li>
            </ul>

            <p className="text-xs text-cocoa-400 mt-5">Aucun cookie marketing tiers (Facebook Pixel, Google Ads, etc.) n'est déposé sur ce site.</p>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setOpen(false)} className="btn-ghost">Annuler</button>
              <button
                type="button"
                onClick={() => { console.log("cookie prefs", { analytics }); setSaved(true); setTimeout(() => setOpen(false), 900); }}
                className="btn-terracotta"
              >
                {saved ? <><Check size={14} /> Enregistré</> : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
