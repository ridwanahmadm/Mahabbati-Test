// Lens: a brand-tinted photo opens in full colour in a circle that follows the cursor.
// Same behaviour as the Persimpangan hero (cross.ts), for a single picture.
import { gsap, reducedMotion, finePointer } from "./motion";

if (finePointer() && !reducedMotion()) {
  document.querySelectorAll<HTMLElement>("[data-lens]").forEach((el) => {
    const color = el.querySelector<HTMLElement>(".lens__color");
    if (!color) return;
    el.classList.add("is-live");
    const s = { r: 0, x: 0, y: 0 };
    // Optional resting spotlight, e.g. data-lens-rest="52,40,30" = x%, y%, radius as % of the diagonal.
    const rest = el.dataset.lensRest?.split(",").map(Number);
    const toRest = (duration: number, delay = 0) => {
      if (!rest) return gsap.to(s, { r: 0, duration, ease: "power2.inOut", overwrite: "auto", onUpdate: paint });
      const b = el.getBoundingClientRect();
      return gsap.to(s, {
        x: (b.width * rest[0]) / 100,
        y: (b.height * rest[1]) / 100,
        r: (Math.hypot(b.width, b.height) * rest[2]) / 100,
        duration,
        delay,
        ease: "power3.out",
        overwrite: "auto",
        onUpdate: paint,
      });
    };
    const paint = () => {
      color.style.setProperty("--r", `${s.r}px`);
      color.style.setProperty("--cx", `${s.x}px`);
      color.style.setProperty("--cy", `${s.y}px`);
    };
    const local = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      return { x: e.clientX - b.left, y: e.clientY - b.top };
    };
    el.addEventListener("pointerenter", (e) => {
      Object.assign(s, local(e));
      const b = el.getBoundingClientRect();
      gsap.to(s, { r: Math.hypot(b.width, b.height) * 0.38, duration: 1, ease: "power3.out", overwrite: "auto", onUpdate: paint });
    });
    el.addEventListener("pointermove", (e) => {
      const p = local(e);
      gsap.to(s, { x: p.x, y: p.y, duration: 0.55, ease: "power3.out", onUpdate: paint });
    });
    el.addEventListener("pointerleave", () => toRest(0.8));
    if (rest) {
      const b = el.getBoundingClientRect();
      s.x = (b.width * rest[0]) / 100;
      s.y = (b.height * rest[1]) / 100;
      paint();
      toRest(1.4, 0.9);
    }
    // A click or a long hover opens the whole picture.
    el.addEventListener("click", () => {
      const b = el.getBoundingClientRect();
      gsap.to(s, { r: Math.hypot(b.width, b.height), duration: 0.9, ease: "power3.out", onUpdate: paint });
    });
  });
}
