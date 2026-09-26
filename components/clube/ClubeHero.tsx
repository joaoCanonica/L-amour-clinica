import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { TransitionLink } from "@/components/transition/PageTransition";
import { PillLink } from "@/components/ui/PillLink";
import { clube } from "@/lib/content";
import { whatsappLink, whatsappMessages } from "@/lib/site";

export function ClubeHero() {
  return (
    <section data-tone="light" className="bg-linho">
      <div className="shell flex min-h-[92svh] flex-col justify-end pb-16 pt-[120px] lg:pb-20">
        <p className="text-[0.875rem] font-medium text-pedra-escuro">Clube L&apos;Amour · assinatura anual</p>
        <RevealText
          as="h1"
          on="mount"
          delay={0.15}
          className="mt-8 max-w-[16ch] font-serif text-[clamp(3rem,1.4rem+6vw,7.75rem)] font-medium leading-[0.96] tracking-[-0.015em] text-navy-950"
        >
          Um plano pensado para a sua pele, <em>não uma lista de procedimentos.</em>
        </RevealText>
        <Reveal on="mount" delay={0.8} className="mt-14 grid-12 items-end gap-y-10 lg:mt-20">
          <p className="col-span-12 max-w-md type-body text-pedra-escuro lg:col-span-5">{clube.body}</p>
          <div className="col-span-12 flex flex-wrap items-center gap-x-8 gap-y-5 lg:col-span-6 lg:col-start-7 lg:justify-end">
            <TransitionLink href="#grupo" className="text-[0.875rem] font-medium text-navy-950 link-quiet">
              Entrar no grupo do Clube
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
