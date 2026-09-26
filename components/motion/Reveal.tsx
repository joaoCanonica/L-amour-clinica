"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { whenPageReady } from "@/lib/page-ready";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Anima os filhos diretos em sequência em vez do bloco inteiro. */
  stagger?: number;
  on?: "mount" | "scroll";
  start?: string;
};

/** Fade + leve subida para blocos de apoio (parágrafos, listas, CTAs). */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  y = 24,
  stagger,
  on = "scroll",
  start = "top 90%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      el.dataset.revealed = "";
      if (prefersReducedMotion()) return;
      const targets = stagger ? Array.from(el.children) : el;
      const tween = gsap.from(targets, {
        autoAlpha: 0,
        paused: on === "mount",
        y,
        duration: 1.1,
        delay,
        stagger: stagger ?? 0,
        ease: "expo.out",
        scrollTrigger: on === "scroll" ? { trigger: el, start, once: true } : undefined,
      });
      if (on === "mount") return whenPageReady(() => tween.restart(true));
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} data-reveal="">
      {children}
    </Tag>
  );
}
