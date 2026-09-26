import { Reveal } from "@/components/motion/Reveal";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { quotes } from "@/lib/content";
import { founderLabel } from "@/lib/site";

export function Manifesto() {
  return (
    <section data-tone="light" className="bg-linho py-32 lg:py-56">
      <div className="shell">
        <ScrubWords className="max-w-[22ch] type-h1 text-navy-950 lg:ml-[16.66%]">
          Antes de qualquer procedimento, uma conversa: sua pele de perto, sua rotina, o que você já fez e o que
          quer alcançar.
        </ScrubWords>
        <Reveal className="mt-14 flex items-baseline gap-5 lg:ml-[16.66%] lg:mt-20">
          <span aria-hidden className="h-px w-12 shrink-0 translate-y-[-0.35em] bg-navy-950/40" />
          <p className="type-lead italic text-navy-800">
            “{quotes.fundadoraConversa}”
            <span className="mt-2 block font-sans text-[0.8125rem] not-italic text-pedra-escuro">{founderLabel()}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
