"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type ContextShiftProps = {
  children: ReactNode;
  /** Classe de cor de fundo do painel que se expande (ex.: "bg-cacau"). */
  panelClassName: string;
  className?: string;
  tone: "light" | "dark" | "cacau" | "prog" | "creme";
  id?: string;
};

/**
 * Mudança de contexto: o painel de fundo começa recuado, como uma janela, e
 * se abre até ocupar a tela enquanto a seção chega — sinaliza que se está
 * entrando em outro "lugar" (ex.: a sub-marca do Programa).
 */
export function ContextShift({ children, panelClassName, className = "", tone, id }: ContextShiftProps) {
  const ref = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!panel.current || !ref.current || prefersReducedMotion()) return;
      gsap.fromTo(
        panel.current,
        { clipPath: "inset(7% 6% 0% 6%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top 15%", scrub: 0.5 },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id={id} data-tone={tone} className={`relative isolate ${className}`}>
      <div ref={panel} aria-hidden className={`absolute inset-0 -z-10 ${panelClassName}`} />
      {children}
    </section>
  );
}
