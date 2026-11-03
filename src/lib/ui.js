let lenis = null;

export function registerLenis(instance) {
  lenis = instance;
}

/** Freeze page scrolling (e.g. while a popup is open). */
export function lockScroll() {
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  document.documentElement.style.overflow = "";
  lenis?.start();
}

/** Smooth-scroll to an absolute page position. Resolves when the scroll ends. */
export function scrollToY(y, duration = 1.3) {
  return new Promise((resolve) => {
    const fallback = setTimeout(resolve, duration * 1000 + 400);
    const done = () => { clearTimeout(fallback); resolve(); };
    if (lenis) lenis.scrollTo(y, { duration, onComplete: done });
    else { window.scrollTo({ top: y, behavior: "smooth" }); }
  });
}

/** Page position of a section's top edge. */
export function sectionTop(id) {
  const el = document.getElementById(id);
  if (!el) return null;
  return el.getBoundingClientRect().top + window.scrollY;
}

export async function scrollToSection(id, duration) {
  const top = sectionTop(id);
  if (top === null) return;
  await scrollToY(Math.max(0, top), duration);
  // Content above may have resized while scrolling; correct once if so.
  const now = sectionTop(id);
  if (now !== null && Math.abs(now - window.scrollY) > 40) await scrollToY(Math.max(0, now), 0.5);
}
