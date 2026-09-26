import { DrawLine } from "@/components/motion/DrawLine";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { clube } from "@/lib/content";

/** As quatro etapas como uma linha do tempo que se desenha da esquerda para a direita. */
export function ClubeSteps() {
  return (
    <section data-tone="light" className="bg-linho py-28 lg:py-44">
      <div className="shell">
        <RevealText className="max-w-[18ch] type-h1 text-navy-950">
          Como funciona, <em>passo a passo.</em>
        </RevealText>

        <div className="relative mt-20 lg:mt-28">
          <DrawLine axis="x" className="hidden h-px w-full bg-navy-950/25 lg:block" />
          <Reveal as="ol" stagger={0.12} className="grid gap-y-2 lg:grid-cols-4 lg:gap-x-10">
            {clube.steps.map((step, i) => (
              <li key={step.title} className="relative border-t border-navy-950/10 pt-8 lg:border-t-0 lg:pt-10">
                <span aria-hidden className="absolute -top-[3.5px] left-0 hidden size-[7px] rounded-full bg-navy-950 lg:block" />
                <span className="block font-serif text-[clamp(3.5rem,2.4rem+3vw,5.5rem)] italic leading-none text-navy-800">
                  {step.emphasis ?? String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-6 block font-serif text-[clamp(1.6rem,1.35rem+0.8vw,2.1rem)] font-medium leading-tight text-navy-950">
                  {step.emphasis ? step.title.slice(step.emphasis.length).trim() : step.title}
                </span>
                <span className="mt-3 block max-w-xs pb-8 type-small text-pedra-escuro">{step.note}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
