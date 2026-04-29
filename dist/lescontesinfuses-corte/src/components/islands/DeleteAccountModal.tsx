import React, { useState } from "react";
import { AlertCircle, X } from "lucide-react";

export default function DeleteAccountModal() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-terracotta-400 text-terracotta-600 hover:bg-terracotta-400 hover:text-cream-50 transition-colors text-sm font-sans"
      >
        Supprimer mon compte
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-cocoa-800/55 backdrop-blur-sm">
          <div className="bg-cream-50 border border-line rounded-2xl max-w-md w-full p-8 relative shadow-page">
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1 text-cocoa-400 hover:text-cocoa-700"
            >
              <X size={18} />
            </button>
            {done ? (
              <div className="text-center py-6">
                <p className="font-display italic text-2xl text-cocoa-600">Demande enregistrée.</p>
                <p className="text-sm text-cocoa-700 mt-2">
                  Votre compte sera effacé sous 30 jours, conformément à l'article 17 du RGPD. Un email de confirmation vient de partir.
                </p>
              </div>
            ) : (
              <>
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-terracotta-50 text-terracotta-600 mb-4">
                  <AlertCircle size={22} />
                </div>
                <h3 className="font-display italic text-2xl text-cocoa-700">Suppression définitive</h3>
                <p className="text-sm text-cocoa-700 mt-3 leading-relaxed">
                  Vous perdrez l'historique de vos commandes, vos préférences et vos inscriptions aux événements à venir. Cette action est irréversible.
                </p>
                <label className="block mt-5 text-xs uppercase tracking-widest text-cocoa-400 font-sans">
                  Tapez SUPPRIMER pour confirmer
                </label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="mt-2 w-full px-3 py-2 bg-cream-100 border border-line rounded-md text-sm font-sans focus:outline-none focus:border-terracotta-400"
                  autoFocus
                />
                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setOpen(false)} className="btn-ghost">
                    Annuler
                  </button>
                  <button
                    type="button"
                    disabled={text !== "SUPPRIMER"}
                    onClick={() => setDone(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-terracotta-600 text-cream-50 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cocoa-700 transition-colors text-xs uppercase tracking-widest font-smallcap"
                  >
                    Confirmer la suppression
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
