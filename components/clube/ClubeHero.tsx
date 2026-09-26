import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { TransitionLink } from "@/components/transition/PageTransition";
import { PillLink } from "@/components/ui/PillLink";
import { clube } from "@/lib/content";
import { whatsappLink, whatsappMessages } from "@/lib/site";

export function ClubeHero() {
  return (
    <section data-tone="light" className="bg-linho">
      <div className="shell flex min-h-[92svh] flex-col pb-14 pt-[92px] lg:pt-[116px]">
        <Reveal
          on="mount"
          delay={0.2}
          className="flex items-center justify-between gap-6 border-b hairline pb-4 type-label text-pedra-escuro"
        >
          <span>Clube L&apos;Amour</span>
          <span className="hidden sm:inline">Assinatura anual</span>
        </Reveal>

        <RevealText
          as="h1"
          on="mount"
          delay={0.15}
          className="mt-14 max-w-[17ch] font-serif text-[clamp(2.75rem,1.2rem+5.6vw,7.25rem)] leading-[0.95] tracking-[-0.022em] text-navy-950 lg:mt-auto"
        >
          Um plano pensado para a sua pele, <em>não uma lista de procedimentos.</em>
        </RevealText>

        <Reveal
          on="mount"
          delay={0.9}
          className="mt-14 grid-12 items-end gap-y-10 border-t hairline pt-8 lg:mt-20"
        >
          <p className="col-span-12 type-body text-pedra-escuro lg:col-span-5">{clube.body}</p>
          <div className="col-span-12 flex flex-wrap items-center gap-x-8 gap-y-5 lg:col-span-6 lg:col-start-7 lg:justify-end">
            <TransitionLink
              href="#video"
              className="type-label underline decoration-navy-950/25 underline-offset-[6px] transition-colors hover:decoration-navy-950"
            >
              Assistir como funciona
            </TransitionLink>
            <PillLink href={whatsappLink(whatsappMessages.clube)} solid>
              Agendar avaliação
            </PillLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
