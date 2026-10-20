// Catalogue filters: need, guests and budget, kept in the URL so the home finder and shared links land filtered.
import { gsap, reducedMotion } from "./motion";

const form = document.querySelector<HTMLFormElement>("[data-catalog-form]");
const items = [...document.querySelectorAll<HTMLElement>("[data-catalog-item]")];
const count = document.querySelector<HTMLElement>("[data-catalog-count]");
const empty = document.querySelector<HTMLElement>("[data-catalog-empty]");

const GUESTS: Record<string, [number, number]> = { s: [0, 100], m: [100, 300], l: [300, 500], xl: [500, 5000] };
const BUDGET: Record<string, number> = { b1: 10_000_000, b2: 50_000_000, b3: 100_000_000 };

if (form) {
  const params = new URLSearchParams(location.search);
  const need = params.get("kebutuhan") ?? "";
  const radio = form.querySelector<HTMLInputElement>(`input[name="kebutuhan"][value="${CSS.escape(need)}"]`);
  if (radio) radio.checked = true;
  for (const key of ["tamu", "budget"]) {
    const sel = form.querySelector<HTMLSelectElement>(`select[name="${key}"]`);
    const v = params.get(key);
    if (sel && v && [...sel.options].some((o) => o.value === v)) sel.value = v;
  }

  const apply = (animate: boolean) => {
    const data = new FormData(form);
    const n = String(data.get("kebutuhan") ?? "");
    const g = GUESTS[String(data.get("tamu") ?? "")];
    const b = BUDGET[String(data.get("budget") ?? "")];
    let shown = 0;
    const appearing: HTMLElement[] = [];
    for (const li of items) {
      const card = li.querySelector<HTMLElement>("[data-pcard]")!;
      const min = Number(card.dataset.min);
      const max = Number(card.dataset.max);
      const price = Number(card.dataset.price);
      const ok =
        (!n || card.dataset.need === n) &&
        (!g || (max >= g[0] && min <= g[1])) &&
        (!b || price <= b);
      if (ok && li.hidden) appearing.push(li);
      li.hidden = !ok;
      if (ok) shown++;
    }
    if (count) count.textContent = shown ? `${shown} paket` : "Tidak ada paket";
    if (empty) empty.hidden = shown > 0;
    if (animate && !reducedMotion() && appearing.length) {
      gsap.fromTo(appearing, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.06, clearProps: "all" });
    }
    const q = new URLSearchParams();
    for (const [k, v] of data) if (v) q.set(k, String(v));
    history.replaceState(null, "", q.size ? `?${q}` : location.pathname);
  };

  form.addEventListener("change", () => apply(true));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    apply(true);
  });
  document.querySelector("[data-catalog-reset]")?.addEventListener("click", () => {
    form.reset();
    apply(true);
    form.querySelector<HTMLInputElement>('input[name="kebutuhan"]')?.focus();
  });
  apply(false);
}
