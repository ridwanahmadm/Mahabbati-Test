// Persimpangan hero: the side you lean toward widens and opens in full colour from the cursor.
import { gsap, reducedMotion, finePointer } from "./motion";

const stage = document.querySelector<HTMLElement>("[data-cross]");
const wide = window.matchMedia("(min-width: 901px)");

if (stage && finePointer() && !reducedMotion()) {
  const split = { v: 50 };
  const setSplit = (to: number) =>
    gsap.to(split, {
      v: to,
      duration: 0.9,
      ease: "expo.out",
      overwrite: true,
      onUpdate: () => stage.style.setProperty("--split", `${split.v}%`),
    });

  stage.querySelectorAll<HTMLElement>("[data-side]").forEach((side) => {
    const color = side.querySelector<HTMLElement>(".cross__img--color");
    if (!color) return;
    const lens = { r: 0, x: 0, y: 0 };
    const paint = () => {
      color.style.setProperty("--r", `${lens.r}px`);
      color.style.setProperty("--cx", `${lens.x}px`);
      color.style.setProperty("--cy", `${lens.y}px`);
    };
    const local = (e: PointerEvent) => {
      const box = color.getBoundingClientRect();
      return { x: e.clientX - box.left, y: e.clientY - box.top, max: Math.hypot(box.width, box.height) };
    };
    const open = (x: number, y: number, max: number) => {
      lens.x = x;
      lens.y = y;
      gsap.to(lens, { r: max, duration: 1.2, ease: "power3.out", overwrite: "auto", onUpdate: paint });
    };
    const close = () => gsap.to(lens, { r: 0, duration: 0.55, ease: "power2.inOut", overwrite: "auto", onUpdate: paint });

    side.addEventListener("pointerenter", (e) => {
      if (!wide.matches) return;
      setSplit(side.dataset.side === "left" ? 58 : 42);
      const p = local(e);
      open(p.x, p.y, p.max);
    });
    side.addEventListener("pointermove", (e) => {
      if (!wide.matches) return;
      const p = local(e);
      gsap.to(lens, { x: p.x, y: p.y, duration: 0.6, ease: "power3.out", onUpdate: paint });
    });
    side.addEventListener("pointerleave", () => {
      if (!wide.matches) return;
      setSplit(50);
      close();
    });
    // Keyboard parity: focusing a side's link leans the page toward it too.
    side.addEventListener("focusin", () => {
      if (!wide.matches) return;
      setSplit(side.dataset.side === "left" ? 58 : 42);
      const box = color.getBoundingClientRect();
      open(box.width / 2, box.height * 0.7, Math.hypot(box.width, box.height));
    });
    side.addEventListener("focusout", () => {
      if (!wide.matches) return;
      setSplit(50);
      close();
    });
  });
}
