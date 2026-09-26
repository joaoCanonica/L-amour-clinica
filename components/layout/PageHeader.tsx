import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";

type PageHeaderProps = {
  /** Rótulos da linha de topo (esquerda, direita). */
  meta: [string, string?];
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** Abertura padrão das páginas internas: linha de metadados, título editorial e introdução. */
export function PageHeader({ meta, title, intro, children, className = "" }: PageHeaderProps) {
  return (
    <section data-tone="light" className={`bg-linho ${className}`}>
      <div className="shell pb-20 pt-[92px] lg:pb-28 lg:pt-[116px]">
        <Reveal
          on="mount"
          delay={0.2}
          className="flex items-center justify-between gap-6 border-b hairline pb-4 type-label text-pedra-escuro"
        >
          <span>{meta[0]}</span>
          {meta[1] ? <span className="hidden sm:inline">{meta[1]}</span> : null}
        </Reveal>
        <RevealText as="h1" on="mount" delay={0.15} className="mt-14 max-w-[15ch] type-display text-navy-950 lg:mt-20">
          {title}
        </RevealText>
        {intro ? (
          <Reveal on="mount" delay={0.8} className="mt-10 max-w-xl lg:ml-[33%] lg:mt-14">
            <div className="type-lead text-navy-950/80">{intro}</div>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}
