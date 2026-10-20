import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const mq = (q: string) => window.matchMedia(q);
export const reducedMotion = () => mq("(prefers-reduced-motion: reduce)").matches;
export const finePointer = () => mq("(hover: hover) and (pointer: fine)").matches;

let lenis: Lenis | null = null;

/** Light smoothing for mouse/trackpad only; off for touch and reduced motion. */
export function initSmoothScroll() {
  if (lenis || reducedMotion() || !finePointer()) return null;
  lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, anchors: { offset: -88 } });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export const getLenis = () => lenis;
export { gsap, ScrollTrigger };
