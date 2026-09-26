import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";

type PageHeaderProps = {
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** Abertura das páginas internas: título editorial e uma introdução curta. */
export function PageHeader({ title, intro, children, className = "" }: PageHeaderProps) {
  return (
    <section data-tone="light" className={`bg-linho ${className}`}>
      <div className="shell pb-20 pt-[140px] lg:pb-28 lg:pt-[200px]">
        <RevealText as="h1" on="mount" delay={0.15} className="max-w-[14ch] type-display text-navy-950">
          {title}
        </RevealText>
        {intro ? (
          <Reveal on="mount" delay={0.8} className="mt-10 max-w-xl lg:ml-[41.66%] lg:mt-14">
            <div className="type-lead text-navy-950/80">{intro}</div>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}
