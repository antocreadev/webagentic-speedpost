import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, Info, Loader2, X } from "lucide-react";
import { subscribe, dismissToast, type Toast as ToastT } from "@/lib/toast";

const MAX = 4;

const tones: Record<ToastT["tone"], { Icon: React.ElementType; ring: string; bar: string; iconColor: string }> = {
  success: { Icon: CheckCircle2, ring: "border-terracotta-400/40", bar: "bg-terracotta-400", iconColor: "text-terracotta-600" },
  error: { Icon: AlertCircle, ring: "border-cocoa-700/40", bar: "bg-cocoa-700", iconColor: "text-cocoa-700" },
  info: { Icon: Info, ring: "border-sage-400/50", bar: "bg-sage-400", iconColor: "text-sage-600" },
  loading: { Icon: Loader2, ring: "border-cocoa-200/70", bar: "bg-cocoa-200", iconColor: "text-cocoa-400" },
};

export default function ToastContainer() {
  const [items, setItems] = useState<ToastT[]>([]);
  useEffect(() => subscribe(setItems), []);

  const visible = items.slice(-MAX);

  return (
    <div
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex flex-col items-center gap-2 px-4"
    >
      {visible.map((t) => {
        const cfg = tones[t.tone];
        const Icon = cfg.Icon;
        return (
          <div
            key={t.id}
            className={`lci-toast pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-xl border ${cfg.ring} bg-cream-50/95 backdrop-blur shadow-[0_18px_40px_-20px_rgba(74,45,31,0.4)]`}
          >
            <div className={`absolute left-0 top-0 h-full w-[3px] ${cfg.bar}`} />
            <div className="flex items-start gap-3 px-4 py-3 pr-9">
              <Icon
                size={18}
                strokeWidth={1.6}
                className={`mt-0.5 shrink-0 ${cfg.iconColor} ${t.tone === "loading" ? "animate-spin" : ""}`}
              />
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm font-medium text-cocoa-700 leading-snug">{t.title}</p>
                {t.description && (
                  <p className="mt-0.5 font-sans text-xs leading-snug text-cocoa-400">{t.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(t.id)}
                aria-label="Fermer la notification"
                className="absolute right-2 top-2 rounded p-1 text-cocoa-300 hover:bg-cream-100 hover:text-cocoa-700 transition-colors"
              >
                <X size={14} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        );
      })}
      <style>{`
        .lci-toast {
          animation: lci-toast-slide-up 250ms cubic-bezier(.2,.7,.2,1) both;
        }
        @keyframes lci-toast-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lci-toast { animation: none; }
        }
      `}</style>
    </div>
  );
}
