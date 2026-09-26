"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";

type ScrubWordsProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Opacidade das palavras ainda não "lidas". */
  dim?: number;
};

/**
 * As palavras ganham tinta no ritmo do scroll: o texto é lido à medida que
 * a página avança, em vez de aparecer de uma vez.
 */
export function ScrubWords({ as: Tag = "p", children, className, dim = 0.16 }: ScrubWordsProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const split = SplitText.create(el, {
        type: "words",
        autoSplit: true,
        onSplit(self) {
          return gsap.fromTo(
            self.words,
            { opacity: dim },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: 0.6 },
            },
          );
        },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
