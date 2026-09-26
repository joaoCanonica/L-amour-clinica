"use client";

import { useEffect, useRef } from "react";
import { ICON_PARTS, ICON_VIEWBOX, LogoWordmark, POTRACE_TRANSFORM } from "@/components/brand/Logo";
import { useLenis } from "@/components/motion/SmoothScroll";
import { gsap, useGSAP } from "@/lib/gsap";
import { INTRO_STORAGE_KEY } from "@/lib/intro";
import { setTransitioning } from "@/lib/page-ready";

// Ponto de onde cada pétala "abre" (coordenadas do viewBox do símbolo).
const PETAL_ORIGINS = ["652 712", "684 716", "712 752"];

/**
 * Entrada da Home: as molduras do símbolo se encontram, as hastes crescem,
 * as três pétalas abrem a partir do ponto em que se tocam e o nome aparece.
 * Depois a cortina sobe e o hero é revelado por baixo dela.
 */
export function IntroSplash() {
  const root = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useGSAP(
    () => {
      const html = document.documentElement;
      const w = window as Window & { __lamourIntro?: boolean };
      const el = root.current;
      if (!el || !html.classList.contains("intro-play") || w.__lamourIntro) return;

      w.__lamourIntro = true;
      setTransitioning(true);
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
      } catch {}

      const q = gsap.utils.selector(el);
      const [frameR, frameL, stemTop, p1, p2, p3, stemBottom] = q("[data-part]");

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          html.classList.remove("intro-play");
          lenisRef.current?.start();
        },
      });
      timeline.current = tl;

      tl.set(el, { autoAlpha: 1 })
        .from(frameL, { x: -26, y: 26, opacity: 0, duration: 1.3 }, 0.1)
        .from(frameR, { x: 26, y: -26, opacity: 0, duration: 1.3 }, 0.1)
        .from(stemTop, { scaleY: 0, svgOrigin: "640 343", duration: 0.9 }, 0.45)
        .from(stemBottom, { scaleY: 0, svgOrigin: "875 875", duration: 0.9 }, 0.45)
        .from(p1, { scale: 0, rotation: -28, svgOrigin: PETAL_ORIGINS[0], duration: 1.25 }, 0.6)
        .from(p2, { scale: 0, rotation: -12, svgOrigin: PETAL_ORIGINS[1], duration: 1.25 }, 0.72)
        .from(p3, { scale: 0, rotation: 18, svgOrigin: PETAL_ORIGINS[2], duration: 1.25 }, 0.84)
        .fromTo(q("[data-word]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut" }, 1.25)
        .from(q("[data-skip]"), { opacity: 0, duration: 0.6 }, 0.6)
        .addLabel("exit", 2.75)
        .call(() => setTransitioning(false), undefined, "exit")
        .to(q("[data-mark]"), { y: -40, opacity: 0, duration: 0.7, ease: "expo.in" }, "exit")
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, "exit+=0.25");

      return () => {
        tl.kill();
      };
    },
    { scope: root },
  );

  function skip() {
    const tl = timeline.current;
    if (!tl) return;
    const exit = tl.labels.exit;
    if (tl.time() < exit) tl.seek(exit);
  }

  return (
    <div
      ref={root}
      className="intro-splash fixed inset-0 z-[120] items-center justify-center bg-navy-950 text-linho"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      role="presentation"
    >
      <div data-mark className="flex flex-col items-center">
        <svg
          viewBox={ICON_VIEWBOX}
          fill="currentColor"
          aria-hidden
          className="h-[min(26vh,200px)] w-auto overflow-visible"
          style={{ aspectRatio: "598 / 565" }}
        >
          {ICON_PARTS.map((d, i) => (
            <g key={i} data-part="">
              <path transform={POTRACE_TRANSFORM} d={d} />
            </g>
          ))}
        </svg>
        <div data-word className="mt-10">
          <LogoWordmark className="h-[15px] w-auto sm:h-[18px]" />
        </div>
      </div>
      <button
        type="button"
        data-skip
        onClick={skip}
        className="absolute bottom-7 right-6 text-[0.8125rem] font-medium text-linho/70 underline decoration-linho/30 underline-offset-[6px] transition-colors hover:text-linho sm:bottom-9 sm:right-10"
      >
        Pular introdução
      </button>
    </div>
  );
}
