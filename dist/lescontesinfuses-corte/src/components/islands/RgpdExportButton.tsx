import React, { useState } from "react";
import { Loader2, Download } from "lucide-react";
import { requestRgpdExport, apiError } from "@/lib/api";
import { authStore } from "@/lib/auth";
import { toast } from "@/lib/toast";

export default function RgpdExportButton() {
  const [loading, setLoading] = useState(false);

  async function onClick() {
    const user = authStore.getUser();
    const email = user?.email || prompt("Email du compte ?") || "";
    if (!email) return;
    setLoading(true);
    try {
      await requestRgpdExport(email);
      toast.success("Demande enregistrée.", "Un email contenant le lien d'export va vous être envoyé.");
    } catch (err) {
      const ee = await apiError(err);
      toast.error("Demande impossible", ee.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button" onClick={onClick} disabled={loading} className="btn-terracotta mt-5 disabled:opacity-60">
      {loading ? <><Loader2 size={14} className="animate-spin" /> Envoi</> : <><Download size={14} /> Télécharger mes données (ZIP)</>}
    </button>
  );
}
