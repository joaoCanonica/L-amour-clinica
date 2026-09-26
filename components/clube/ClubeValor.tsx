import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { quotes } from "@/lib/content";
import { founderLabel } from "@/lib/site";

export function ClubeValor() {
  return (
    <section data-tone="light" className="bg-papel py-28 lg:py-40">
      <div className="shell grid-12 items-end gap-y-10">
        <p aria-hidden className="col-span-12 font-serif text-[clamp(8rem,4rem+18vw,22rem)] italic leading-[0.8] tracking-[-0.03em] text-navy-800 lg:col-span-6">
          25%
        </p>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <RevealText className="type-h2 text-navy-950">“{quotes.fundadoraAvulsa}”</RevealText>
          <Reveal>
            <p className="mt-6 type-small text-pedra-escuro">{founderLabel()}</p>
            <p className="mt-10 max-w-sm type-small text-pedra-escuro">
              25% de desconto sobre o valor total do protocolo anual, aplicado antes da divisão em mensalidades.
              Condições apresentadas na avaliação.
              {/* TODO(conteudo): confirmar regras do Clube (fidelidade, forma de pagamento, cancelamento). */}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
