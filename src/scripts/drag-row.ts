// Horizontal rows: native scroll + snap, drag with a mouse, and buttons as the single-pointer path (WCAG 2.5.7).
document.querySelectorAll<HTMLElement>("[data-row]").forEach((row) => {
  const scope = row.closest("section") ?? document;
  const prev = scope.querySelector<HTMLButtonElement>("[data-row-prev]");
  const next = scope.querySelector<HTMLButtonElement>("[data-row-next]");
  const card = () => (row.querySelector("li")?.getBoundingClientRect().width ?? 280) + 32;

  const sync = () => {
    const max = row.scrollWidth - row.clientWidth - 2;
    if (prev) prev.disabled = row.scrollLeft <= 2;
    if (next) next.disabled = row.scrollLeft >= max;
  };
  const smooth = () => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");
  prev?.addEventListener("click", () => row.scrollBy({ left: -card(), behavior: smooth() }));
  next?.addEventListener("click", () => row.scrollBy({ left: card(), behavior: smooth() }));
  row.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  sync();

  row.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") row.scrollBy({ left: card(), behavior: smooth() });
    if (e.key === "ArrowLeft") row.scrollBy({ left: -card(), behavior: smooth() });
  });

  // Mouse drag (touch already scrolls natively).
  let startX = 0;
  let startLeft = 0;
  let moved = false;
  row.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    startX = e.clientX;
    startLeft = row.scrollLeft;
    moved = false;
    row.setPointerCapture(e.pointerId);
    row.classList.add("is-dragging");
  });
  row.addEventListener("pointermove", (e) => {
    if (!row.classList.contains("is-dragging")) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 6) moved = true;
    row.scrollLeft = startLeft - dx;
  });
  const end = (e: PointerEvent) => {
    if (!row.classList.contains("is-dragging")) return;
    row.classList.remove("is-dragging");
    row.releasePointerCapture(e.pointerId);
  };
  row.addEventListener("pointerup", end);
  row.addEventListener("pointercancel", end);
  row.addEventListener("click", (e) => moved && e.preventDefault(), true);
});
