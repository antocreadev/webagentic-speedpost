import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AdminGuard({ children }: { children: any }) {
  const [authed, setAuthed] = useState<"checking" | "yes" | "no">("checking");

  useEffect(() => {
    api
      .me()
      .then((r) => {
        if (r.user && r.user.role === "admin") setAuthed("yes");
        else {
          setAuthed("no");
          window.location.href = "/admin/login";
        }
      })
      .catch(() => {
        setAuthed("no");
        window.location.href = "/admin/login";
      });
  }, []);

  if (authed === "checking") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="cursive text-3xl text-accent animate-pulse">Jennyland</div>
      </div>
    );
  }
  if (authed === "no") return null;
  return children;
}
