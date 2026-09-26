import { LogoIcon } from "@/components/brand/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { PillLink } from "@/components/ui/PillLink";
import { quotes } from "@/lib/content";
import { founderLabel, site, whatsappLink, whatsappMessages } from "@/lib/site";

export function ClubeCTA() {
  return (
    <section data-tone="dark" className="bg-navy-800 text-linho">
      <div className="shell flex min-h-[80svh] flex-col items-start justify-center py-28">
        <LogoIcon className="h-11 w-auto text-linho/80" />
        <RevealText className="mt-12 max-w-[14ch] type-display">
          Tudo começa pela <em>avaliação.</em>
        </RevealText>
        <Reveal className="mt-10 max-w-lg">
          <p className="type-lead italic text-linho/85">“{quotes.fundadoraSozinha}”</p>
          <p className="mt-3 type-small text-linho/65">{founderLabel()}</p>
        </Reveal>
        <Reveal className="mt-12 flex w-full flex-col gap-6 border-t border-linho/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-small text-linho/70">{site.schedulingNote}.</p>
          <PillLink href={whatsappLink(whatsappMessages.clube)} tone="linho" solid>
            Agendar avaliação
          </PillLink>
        </Reveal>
      </div>
    </section>
  );
}
