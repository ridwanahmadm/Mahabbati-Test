// Anti-ghosting simulation: send a request, move time forward, watch the quota come back on day 7.
import { gsap, reducedMotion } from "./motion";

const root = document.querySelector<HTMLElement>("[data-ghost]");

if (root) {
  const $ = <T extends Element>(sel: string) => root.querySelector<T>(sel)!;
  const quotaEl = $<HTMLElement>("[data-quota]");
  const req = $<HTMLElement>("[data-req]");
  const status = $<HTMLElement>("[data-status]");
  const range = $<HTMLInputElement>("[data-range]");
  const dayOut = $<HTMLOutputElement>("[data-day]");
  const days = [...root.querySelectorAll<HTMLLIElement>("[data-days] li")];
  const send = $<HTMLButtonElement>("[data-send]");
  const play = $<HTMLButtonElement>("[data-play]");
  const reset = $<HTMLButtonElement>("[data-reset]");
  const coin = $<SVGElement>("[data-coin]");
  const live = $<HTMLElement>("[data-live]");
  const still = reducedMotion();

  const START = 10;
  let quota = START;
  let refunded = false;
  let timer: number | undefined;

  const showQuota = (to: number) => {
    if (still) {
      quotaEl.textContent = String(to);
      return;
    }
    const n = { v: Number(quotaEl.textContent) };
    gsap.to(n, {
      v: to,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => (quotaEl.textContent = String(Math.round(n.v))),
    });
  };
  const announce = (msg: string) => {
    live.textContent = "";
    requestAnimationFrame(() => (live.textContent = msg));
  };

  const setDay = (d: number) => {
    range.value = String(d);
    dayOut.textContent = `Hari ke-${d}`;
    range.setAttribute("aria-valuetext", `Hari ke-${d}`);
    days.forEach((li, i) => li.classList.toggle("is-past", i < d));

    if (d >= 7 && !refunded) {
      refunded = true;
      stop();
      req.dataset.state = "cancelled";
      status.textContent = "Tidak dibalas 7 hari. Pengajuan batal otomatis, kuota dikembalikan.";
      range.disabled = true;
      play.disabled = true;
      reset.hidden = false;
      flyCoin();
      quota += 1;
      showQuota(quota);
      announce(`Hari ke-7: pengajuan batal otomatis. Kuota dikembalikan, sisa ${quota}.`);
    } else if (d > 0 && !refunded) {
      status.textContent = `Menunggu respons, belum dibalas ${d} hari.`;
    } else if (!refunded) {
      status.textContent = "Menunggu respons.";
    }
  };

  const flyCoin = () => {
    if (still) return;
    const from = req.getBoundingClientRect();
    const to = quotaEl.getBoundingClientRect();
    const box = coin.getBoundingClientRect();
    const dx = from.left + from.width - 60 - box.left;
    const dy = from.top + from.height / 2 - box.top;
    gsap.fromTo(
      coin,
      { x: dx, y: dy, opacity: 0, scale: 0.6 },
      {
        keyframes: [
          { opacity: 1, scale: 1.1, duration: 0.25, ease: "power2.out" },
          { x: to.left - box.left - 8, y: to.top - box.top - 4, duration: 0.7, ease: "power3.inOut" },
          { opacity: 0, scale: 0.4, duration: 0.25, ease: "power2.in" },
        ],
      },
    );
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = undefined;
    play.querySelector("span.label")?.remove();
  };

  send.addEventListener("click", () => {
    if (quota <= 0) return;
    quota -= 1;
    showQuota(quota);
    req.dataset.state = "waiting";
    send.disabled = true;
    range.disabled = false;
    play.disabled = false;
    setDay(0);
    announce(`Pengajuan terkirim. Sisa kuota ${quota}. Geser waktu untuk melihat hari berikutnya.`);
    range.focus();
  });

  range.addEventListener("input", () => setDay(Number(range.value)));

  play.addEventListener("click", () => {
    if (timer) return;
    let d = Number(range.value);
    timer = window.setInterval(() => {
      d += 1;
      setDay(Math.min(d, 7));
      if (d >= 7) stop();
    }, still ? 80 : 420);
  });

  reset.addEventListener("click", () => {
    stop();
    quota = START;
    refunded = false;
    quotaEl.textContent = String(START);
    req.dataset.state = "idle";
    status.textContent = "Belum diajukan";
    send.disabled = false;
    range.disabled = true;
    play.disabled = true;
    reset.hidden = true;
    setDay(0);
    status.textContent = "Belum diajukan";
    announce("Simulasi diulang.");
    send.focus();
  });
}
