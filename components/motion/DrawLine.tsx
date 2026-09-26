"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/** Fio que se desenha no ritmo do scroll — marca a progressão de uma sequência. */
export function DrawLine({
  className = "",
  axis = "y",
}: {
  className?: string;
  axis?: "x" | "y";
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { [axis === "y" ? "scaleY" : "scaleX"]: 0 },
        {
          [axis === "y" ? "scaleY" : "scaleX"]: 1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 60%", scrub: 0.6 },
        },
      );
    },
    { scope: ref },
  );

  return <span ref={ref} aria-hidden className={`block ${axis === "y" ? "origin-top" : "origin-left"} ${className}`} />;
}
