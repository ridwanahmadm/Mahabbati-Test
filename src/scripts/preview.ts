// Index with preview: the hovered package row shows its photograph, which follows the cursor.
import { gsap, finePointer, reducedMotion } from "./motion";

const list = document.querySelector<HTMLElement>("[data-preview-list]");
const preview = document.querySelector<HTMLElement>("[data-preview]");

if (list && preview && finePointer() && !reducedMotion()) {
  const imgs = [...preview.querySelectorAll<HTMLImageElement>("img")];
  imgs.forEach((img) => (img.loading = "eager"));
  const xTo = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3" });
  const yTo = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3" });
  const rTo = gsap.quickTo(preview, "rotation", { duration: 0.8, ease: "power3" });
  let lastX = 0;

  list.querySelectorAll<HTMLElement>("[data-preview-index]").forEach((row) => {
    const i = Number(row.dataset.previewIndex);
    row.addEventListener("pointerenter", (e) => {
      gsap.set(preview, { x: e.clientX + 32, y: e.clientY - 180 });
      imgs.forEach((img, k) => img.classList.toggle("is-active", k === i));
      preview.classList.add("is-on");
    });
  });
  list.addEventListener("pointermove", (e) => {
    // Keep the picture beside the cursor, flipping sides near the right edge so it never covers the price.
    const side = e.clientX > window.innerWidth * 0.62 ? -332 : 32;
    xTo(e.clientX + side);
    yTo(e.clientY - 180);
    rTo(Math.max(-6, Math.min(6, (e.clientX - lastX) * 0.4)));
    lastX = e.clientX;
  });
  list.addEventListener("pointerleave", () => preview.classList.remove("is-on"));
}
