// Reveal-on-scroll observer + sticky header polish + book detail parallax.
// Re-runs on every Astro page-load (View Transitions friendly).

function initReveals() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)");
  if (reduced) {
    els.forEach((el) => el.classList.add("is-revealed"));
    return;
  }
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-revealed"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
  );
  els.forEach((el) => io.observe(el));
}

function initStickyHeader() {
  const header = document.getElementById("lci-header");
  if (!header) return;
  const onScroll = () => {
    const y = window.scrollY;
    const blur = Math.min(8, y / 8);
    const opacity = Math.min(0.92, 0.4 + y / 200);
    if (y > 8) {
      header.style.backdropFilter = `blur(${blur}px)`;
      (header.style as any).webkitBackdropFilter = `blur(${blur}px)`;
      header.style.background = `rgba(251, 246, 233, ${opacity})`;
      header.classList.add("shadow-sm", "border-b", "border-line");
    } else {
      header.style.backdropFilter = "blur(0)";
      (header.style as any).webkitBackdropFilter = "blur(0)";
      header.style.background = "transparent";
      header.classList.remove("shadow-sm", "border-b", "border-line");
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  // store cleanup ref
  (window as any).__lciHeaderScroll = onScroll;
}

function initBookParallax() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;
  const target = document.querySelector<HTMLElement>("[data-book-cover-parallax]");
  if (!target) return;
  const onScroll = () => {
    const rect = target.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.max(-1, Math.min(1, (vh / 2 - rect.top) / vh));
    target.style.transform = `translate3d(0, ${(-progress * 30).toFixed(1)}px, 0) rotateY(-12deg)`;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

let installed = false;
function installGlobalScrollHandlers() {
  if (installed) return;
  installed = true;
  initStickyHeader();
}

function init() {
  installGlobalScrollHandlers();
  initReveals();
  initBookParallax();
}

document.addEventListener("astro:page-load", init);
if (document.readyState !== "loading") init();
else document.addEventListener("DOMContentLoaded", init);
