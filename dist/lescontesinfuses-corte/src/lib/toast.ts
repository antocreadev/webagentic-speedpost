// Toast pub/sub micro-store, framework-free.
export type ToastTone = "success" | "error" | "info" | "loading";
export interface ToastInput {
  id?: string;
  tone?: ToastTone;
  title: string;
  description?: string;
  duration?: number; // ms, 0 = persistent
}
export interface Toast extends Required<Omit<ToastInput, "description" | "duration">> {
  description?: string;
  duration: number;
  createdAt: number;
}

type Listener = (toasts: Toast[]) => void;

const listeners = new Set<Listener>();
let toasts: Toast[] = [];

function emit() {
  for (const l of listeners) l(toasts);
}

export function subscribe(l: Listener) {
  listeners.add(l);
  l(toasts);
  return () => listeners.delete(l);
}

export function pushToast(input: ToastInput): string {
  const id = input.id ?? `t_${Math.random().toString(36).slice(2, 9)}`;
  const t: Toast = {
    id,
    tone: input.tone ?? "info",
    title: input.title,
    description: input.description,
    duration: input.duration ?? 4200,
    createdAt: Date.now(),
  };
  toasts = [...toasts, t];
  emit();
  if (t.duration > 0) {
    setTimeout(() => dismissToast(id), t.duration);
  }
  return id;
}

export function dismissToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

// Sugar helpers
export const toast = {
  success: (title: string, description?: string) => pushToast({ tone: "success", title, description }),
  error: (title: string, description?: string) => pushToast({ tone: "error", title, description }),
  info: (title: string, description?: string) => pushToast({ tone: "info", title, description }),
  loading: (title: string, description?: string) => pushToast({ tone: "loading", title, description, duration: 0 }),
  dismiss: dismissToast,
};

// Expose globally so non-React (Astro) code can dispatch.
if (typeof window !== "undefined") {
  // @ts-expect-error global mount
  window.__lciToast = toast;
}
