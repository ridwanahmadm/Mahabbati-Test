// "Benang": one line, drawn by the scroll, runs through the six stages and ends by writing the m♡ mark.
// The path is rebuilt from the real node positions, so it follows the layout at every width.
import { ScrollTrigger, reducedMotion } from "./motion";

const body = document.querySelector<HTMLElement>("[data-journey-body]");

if (body) {
  const svg = body.querySelector<SVGSVGElement>("[data-thread]")!;
  const base = svg.querySelector<SVGPathElement>(".journey__path--base")!;
  const ink = svg.querySelector<SVGPathElement>(".journey__path--ink")!;
  const nib = svg.querySelector<SVGCircleElement>(".journey__nib")!;
  const rows = [...body.querySelectorAll<HTMLElement>("[data-stage]")];
  const nodes = rows.map((r) => r.querySelector<HTMLElement>("[data-node]")!);
  const mark = body.querySelector<HTMLElement>("[data-mark]")!;
  const still = reducedMotion();

  let samples: { l: number; y: number }[] = [];
  let total = 0;
  let nodeY: number[] = [];
  let endY = 0;

  const centre = (el: Element, b: DOMRect) => {
    const r = el.getBoundingClientRect();
    return { x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2 };
  };

  const build = () => {
    const b = body.getBoundingClientRect();
    if (!b.width) return;
    svg.setAttribute("viewBox", `0 0 ${b.width} ${b.height}`);

    const pts = nodes.map((n) => centre(n, b));
    const m = mark.getBoundingClientRect();
    // The handwritten m starts at its lower left; the thread hands over to the mark there.
    const end = { x: m.left - b.left + m.width * 0.03, y: m.top - b.top + m.height * 0.82 };
    const gaps = rows.map((row, i) => {
      const r = row.getBoundingClientRect();
      const next = rows[i + 1]?.getBoundingClientRect().top ?? m.top - 40;
      return (r.bottom + next) / 2 - b.top;
    });

    const R = Math.min(70, Math.max(30, b.width * 0.05));
    let d = `M ${pts[0].x} ${Math.max(0, pts[0].y - 160)} L ${pts[0].x} ${pts[0].y}`;
    const targets = [...pts.slice(1), end];
    pts.forEach((p, i) => {
      const t = targets[i];
      const g = gaps[i];
      // straight down the gutter, one S-swoop in the gap between rows, then down to the next node
      d += ` L ${p.x} ${g - R} C ${p.x} ${g + R}, ${t.x} ${g - R}, ${t.x} ${g + R} L ${t.x} ${t.y}`;
    });

    base.setAttribute("d", d);
    ink.setAttribute("d", d);
    total = ink.getTotalLength();
    ink.style.strokeDasharray = `${total} ${total}`;
    samples = [];
    for (let l = 0; l <= total; l += 4) samples.push({ l, y: ink.getPointAtLength(l).y });
    nodeY = pts.map((p) => p.y);
    endY = end.y;
    update();
  };

  const lengthAt = (y: number) => {
    let lo = 0;
    let hi = samples.length - 1;
    if (!samples.length || y <= samples[0].y) return 0;
    if (y >= samples[hi].y) return total;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (samples[mid].y < y) lo = mid + 1;
      else hi = mid;
    }
    return samples[lo].l;
  };

  const update = () => {
    if (!total) return;
    const line = still ? Infinity : window.innerHeight * 0.62 - body.getBoundingClientRect().top;
    const len = still ? total : lengthAt(line);
    ink.style.strokeDashoffset = `${total - len}`;

    const tipVisible = len > 0 && len < total;
    nib.style.opacity = tipVisible ? "1" : "0";
    if (tipVisible) {
      const p = ink.getPointAtLength(len);
      nib.setAttribute("cx", String(p.x));
      nib.setAttribute("cy", String(p.y));
    }
    nodes.forEach((n, i) => n.classList.toggle("is-on", line >= nodeY[i] - 8));

    const wipe = still ? 1 : Math.min(1, Math.max(0, (line - endY + 30) / 260));
    mark.style.setProperty("--wipe", `${wipe * 115}%`);
  };

  if (!still) mark.style.setProperty("--wipe", "0%");
  build();
  ScrollTrigger.create({ trigger: body, start: "top bottom", end: "bottom top", onUpdate: update, onRefresh: build });
  new ResizeObserver(() => build()).observe(body);
  document.fonts?.ready.then(build);
}
