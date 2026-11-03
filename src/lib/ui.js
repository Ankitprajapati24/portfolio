let lenis = null;

export function registerLenis(instance) {
  lenis = instance;
}

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -84, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function openEchoChat() {
  window.dispatchEvent(new CustomEvent("echo:open"));
}
