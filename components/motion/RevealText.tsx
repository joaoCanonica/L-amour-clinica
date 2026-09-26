"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";
import { whenPageReady } from "@/lib/page-ready";

type RevealTextProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** "mount": revela ao carregar (hero). "scroll": revela ao entrar na viewport. */
  on?: "mount" | "scroll";
  delay?: number;
  stagger?: number;
  id?: string;
};

/**
 * Revela títulos linha a linha por trás de uma máscara — a hierarquia do texto
 * aparece na ordem de leitura. As linhas são recalculadas em resize e após o
 * carregamento das fontes (autoSplit).
 */
export function RevealText({
  as: Tag = "h2",
  children,
  className,
  on = "scroll",
  delay = 0,
  stagger = 0.09,
  id,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        el.dataset.revealed = "";
        return;
      }

      let cancelReady = () => {};
      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          el.dataset.revealed = "";
          // Retornar a animação permite ao SplitText sincronizar o progresso
          // quando as linhas são recalculadas (resize / fontes).
          const tween = gsap.from(self.lines, {
            yPercent: 115,
            paused: on === "mount",
            duration: 1.35,
            stagger,
            delay,
            ease: "expo.out",
            scrollTrigger:
              on === "scroll" ? { trigger: el, start: "top 88%", once: true } : undefined,
          });
          if (on === "mount") {
            cancelReady();
            cancelReady = whenPageReady(() => tween.restart(true));
          }
          return tween;
        },
      });

      return () => {
        cancelReady();
        split.revert();
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} data-reveal="" id={id}>
      {children}
    </Tag>
  );
}
