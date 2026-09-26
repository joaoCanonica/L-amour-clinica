import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { LogoIcon } from "@/components/brand/Logo";
import { PillLink } from "@/components/ui/PillLink";
import { site, whatsappLink, whatsappMessages } from "@/lib/site";

export function ClubeCTA() {
  return (
    <section data-tone="dark" className="bg-navy-800 text-linho">
      <div className="shell flex min-h-[80svh] flex-col items-start justify-center py-28">
        <LogoIcon className="h-11 w-auto text-linho/80" />
        <RevealText className="mt-12 max-w-[14ch] type-display">
          Tudo começa pela <em>avaliação.</em>
        </RevealText>
        <Reveal className="mt-12 flex w-full flex-col gap-8 border-t border-linho/20 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-md type-small text-linho/75">
            {site.schedulingNote}. As condições do Clube são apresentadas na avaliação.
            {/* TODO(conteudo): confirmar regras do Clube (fidelidade, forma de pagamento, o que entra no protocolo) para detalhar aqui. */}
          </p>
          <PillLink href={whatsappLink(whatsappMessages.clube)} tone="linho" solid>
            Agendar avaliação
          </PillLink>
        </Reveal>
      </div>
    </section>
  );
}
