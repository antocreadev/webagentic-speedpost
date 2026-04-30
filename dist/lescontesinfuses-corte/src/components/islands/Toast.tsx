import { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, Info, Loader2, X } from "lucide-react";
import { subscribe, dismissToast, type Toast as ToastT } from "@/lib/toast";

const tones: Record<ToastT["tone"], { icon: React.ElementType; ring: string; bar: string }> = {
  success: { icon: CheckCircle2, ring: "border-sage-400/60", bar: "bg-sage-400" },
  error: { icon: AlertTriangle, ring: "border-terracotta-400/70", bar: "bg-terracotta-400" },
  info: { icon: Info, ring: "border-cocoa-200/70", bar: "bg-cocoa-300" },
  loading: { icon: Loader2, ring: "border-plum-400/50", bar: "bg-plum-400" },
};

export default function ToastHost() {
  const [items, setItems] = useState<ToastT[]>([]);
  useEffect(() => subscribe(setItems), []);

  return (
    <div
      role="region"
      aria-label="Notifications"
      className="pointer-events-none fixed bottom-5 right-5 z-[80] flex w-full max-w-sm flex-col-reverse gap-2"
    >
      {items.map((t) => {
        const cfg = tones[t.tone];
        const Icon = cfg.icon;
        return (
          <div
            key={t.id}
            className={`pointer-events-auto relative overflow-hidden rounded-xl border ${cfg.ring} bg-cream-50/95 backdrop-blur shadow-[0_18px_40px_-20px_rgba(74,45,31,0.35)]`}
            style={{ animation: "lci-toast-in .25s cubic-bezier(.2,.7,.2,1) both" }}
          >
            <div className={`absolute left-0 top-0 h-full w-[3px] ${cfg.bar}`} />
            <div className="flex items-start gap-3 px-4 py-3 pr-9">
              <Icon
                size={18}
                strokeWidth={1.6}
                className={`mt-0.5 shrink-0 ${t.tone === "loading" ? "animate-spin text-plum-400" : t.tone === "success" ? "text-sage-600" : t.tone === "error" ? "text-terracotta-600" : "text-cocoa-400"}`}
              />
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm font-medium text-cocoa-700">{t.title}</p>
                {t.description && (
                  <p className="mt-0.5 font-sans text-xs leading-snug text-cocoa-400">{t.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(t.id)}
                aria-label="Fermer"
                className="absolute right-2 top-2 rounded p-1 text-cocoa-400 hover:bg-cream-100 hover:text-cocoa-700"
              >
                <X size={14} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        );
      })}
      <style>{`
        @keyframes lci-toast-in {
          from { opacity: 0; transform: translateY(14px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
