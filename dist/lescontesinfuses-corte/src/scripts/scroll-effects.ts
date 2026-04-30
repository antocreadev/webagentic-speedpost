// Extended scroll-triggered effects: parallax, stagger, scene-pin, magnet, etc.
// Imported after reveals.ts. Re-runs on Astro page-load (View Transitions friendly).

const REDUCED = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Parallax (lerp) ----------
function initParallax() {
  if (REDUCED()) return;
  const els = Array.from(
    document.querySelectorAll<HTMLElement>("[data-parallax]:not([data-parallax-bound])")
  );
  if (!els.length) return;
  const items = els.map((el) => {
    el.setAttribute("data-parallax-bound", "1");
    const intensity = parseFloat(el.dataset.parallax || "0.3");
    return { el, intensity, current: 0, target: 0 };
  });

  const onScroll = () => {
    const vh = window.innerHeight;
    items.forEach((it) => {
      const rect = it.el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const progress = (center - vh / 2) / vh; // -1 to 1 typical
      it.target = -progress * 100 * it.intensity;
    });
  };

  let raf = 0;
  const tick = () => {
    items.forEach((it) => {
      it.current += (it.target - it.current) * 0.1;
      it.el.style.transform = `translate3d(0, ${it.current.toFixed(2)}px, 0)`;
    });
    raf = requestAnimationFrame(tick);
  };
  onScroll();
  tick();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}

// ---------- Stagger reveal of children ----------
function initStagger() {
  const els = Array.from(
    document.querySelectorAll<HTMLElement>("[data-stagger]:not([data-stagger-bound])")
  );
  if (!els.length) return;
  const reduced = REDUCED();
  els.forEach((parent) => {
    parent.setAttribute("data-stagger-bound", "1");
    const step = parseInt(parent.dataset.stagger || "80", 10);
    const children = Array.from(parent.children) as HTMLElement[];
    children.forEach((c, i) => {
      if (!c.hasAttribute("data-reveal")) c.setAttribute("data-reveal", "");
      c.style.transitionDelay = `${i * step}ms`;
    });
    if (reduced) {
      children.forEach((c) => c.classList.add("is-revealed"));
      return;
    }
    if (!("IntersectionObserver" in window)) {
      children.forEach((c) => c.classList.add("is-revealed"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((c) => c.classList.add("is-revealed"));
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    io.observe(parent);
  });
}

// ---------- Reveal direction overrides ----------
function initRevealDirections() {
  const els = document.querySelectorAll<HTMLElement>("[data-fade-direction]");
  els.forEach((el) => {
    const dir = el.dataset.fadeDirection;
    el.classList.add(`reveal-${dir}`);
  });
}

// ---------- Reveal-once / re-play on re-entry ----------
function initRevealReplay() {
  if (REDUCED()) return;
  if (!("IntersectionObserver" in window)) return;
  const els = Array.from(
    document.querySelectorAll<HTMLElement>(
      "[data-reveal][data-reveal-once='false']:not([data-reveal-replay-bound])"
    )
  );
  els.forEach((el) => {
    el.setAttribute("data-reveal-replay-bound", "1");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) el.classList.add("is-revealed");
          else el.classList.remove("is-revealed");
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    io.observe(el);
  });
}

// ---------- Scene pin ----------
function initScenePin() {
  if (REDUCED()) return;
  const els = Array.from(
    document.querySelectorAll<HTMLElement>("[data-scene-pin]:not([data-scene-pin-bound])")
  );
  els.forEach((el) => {
    el.setAttribute("data-scene-pin-bound", "1");
    const pinHeight = parseInt(el.dataset.scenePin || "600", 10);
    // Wrap with placeholder if not already
    let wrapper = el.parentElement as HTMLElement;
    if (!wrapper || !wrapper.hasAttribute("data-scene-pin-wrapper")) {
      wrapper = document.createElement("div");
      wrapper.setAttribute("data-scene-pin-wrapper", "1");
      wrapper.style.position = "relative";
      el.parentNode?.insertBefore(wrapper, el);
      wrapper.appendChild(el);
    }
    wrapper.style.height = `${pinHeight + el.offsetHeight}px`;
    el.style.position = "sticky";
    el.style.top = "10vh";
  });
}

// ---------- Stick until ----------
function initStickUntil() {
  if (REDUCED()) return;
  const els = document.querySelectorAll<HTMLElement>(
    "[data-stick-until='true']:not([data-stick-bound])"
  );
  els.forEach((el) => {
    el.setAttribute("data-stick-bound", "1");
    el.style.position = "sticky";
    el.style.top = "10vh";
  });
}

// ---------- Magnet ----------
function initMagnet() {
  if (REDUCED()) return;
  const els = Array.from(
    document.querySelectorAll<HTMLElement>("[data-magnet]:not([data-magnet-bound])")
  );
  els.forEach((el) => {
    el.setAttribute("data-magnet-bound", "1");
    const intensity = parseFloat(el.dataset.magnet || "0.2");
    el.style.transition = "transform .25s cubic-bezier(.2,.7,.2,1)";
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
  });
}

// ---------- Page-curl on external link click ----------
function initPageCurl() {
  if (REDUCED()) return;
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest("a") as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute("href") || "";
    const isExternal = link.target === "_blank" || /^https?:\/\//i.test(href);
    if (!isExternal) return;
    const card = link.closest("article, .lci-card, [data-card]") as HTMLElement | null;
    const fx = card || link;
    fx.style.transition = "transform .2s cubic-bezier(.2,.7,.2,1)";
    fx.style.transform = "perspective(900px) rotateY(-2deg) skewX(1deg)";
    setTimeout(() => {
      fx.style.transform = "";
    }, 220);
  });
}

// ---------- Quote zoom (homepage citation) ----------
function initQuoteZoom() {
  if (REDUCED()) return;
  const el = document.querySelector<HTMLElement>("[data-quote-zoom]");
  if (!el) return;
  const onScroll = () => {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.max(0, Math.min(1, 1 - (rect.top + rect.height / 2) / (vh + rect.height)));
    const scale = 0.95 + progress * 0.1; // 0.95 -> 1.05
    el.style.transform = `scale(${scale.toFixed(3)})`;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ---------- Bookmark chapter (sets data-chapter on body) ----------
function initBookmarkChapter() {
  if (!("IntersectionObserver" in window)) return;
  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
  if (!sections.length) {
    document.body.removeAttribute("data-current-chapter");
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const ch = (entry.target as HTMLElement).dataset.chapter || "";
          document.body.setAttribute("data-current-chapter", ch);
          window.dispatchEvent(new CustomEvent("lci:chapter", { detail: { chapter: ch } }));
        }
      });
    },
    { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => io.observe(s));
}

function init() {
  initRevealDirections();
  initParallax();
  initStagger();
  initRevealReplay();
  initScenePin();
  initStickUntil();
  initMagnet();
  initPageCurl();
  initQuoteZoom();
  initBookmarkChapter();
}

document.addEventListener("astro:page-load", init);
if (document.readyState !== "loading") init();
else document.addEventListener("DOMContentLoaded", init);
