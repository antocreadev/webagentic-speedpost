import { Loader2 } from "lucide-react";
import { authStore } from "@/lib/auth";
import { apiError } from "@/lib/api";
import { toast } from "@/lib/toast";

export function Loader({ label = "Chargement..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-12 text-cocoa-400 text-sm">
      <Loader2 className="animate-spin" size={16} />
      <span>{label}</span>
    </div>
  );
}

export function Empty({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-cream-100/40 px-6 py-10 text-center">
      <p className="font-display italic text-xl text-cocoa-700">{title}</p>
      {hint && <p className="mt-1 text-sm text-cocoa-400">{hint}</p>}
    </div>
  );
}

export async function handleApi<T>(p: Promise<T>, errTitle = "Erreur"): Promise<T | null> {
  try {
    return await p;
  } catch (err) {
    const e = await apiError(err);
    if (e.status === 401) {
      authStore.clearSession();
      window.location.replace("/admin/login");
      return null;
    }
    toast.error(errTitle, e.message);
    return null;
  }
}

export function formatPrice(cents?: number) {
  const n = (cents ?? 0) / 100;
  return n.toFixed(2).replace(".", ",") + " €";
}

export function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export function statusTone(s?: string): "success" | "warning" | "info" | "neutral" | "danger" {
  const v = (s || "").toLowerCase();
  if (v.includes("annul") || v.includes("cancel")) return "danger";
  if (v.includes("livr") || v.includes("delivered") || v.includes("paid") || v.includes("paye")) return "success";
  if (v.includes("expedi") || v.includes("shipped")) return "info";
  if (v.includes("prepar")) return "neutral";
  return "warning";
}

export function asArray<T>(r: any): T[] {
  if (Array.isArray(r)) return r as T[];
  if (r && Array.isArray(r.items)) return r.items as T[];
  return [];
}
