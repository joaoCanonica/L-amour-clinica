import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { sobre } from "@/lib/content";

/** Abertura só com tipografia: o título e três frases curtas. */
export function SobreHero() {
  return (
    <section data-tone="light" className="bg-linho">
      <div className="shell grid-12 gap-y-16 pb-28 pt-[140px] lg:pb-44 lg:pt-[200px]">
        <RevealText as="h1" on="mount" delay={0.15} className="col-span-12 max-w-[12ch] type-display text-navy-950 lg:col-span-7">
          Cuidado que começa <em>por uma conversa.</em>
        </RevealText>
        <div className="col-span-12 flex flex-col gap-10 lg:col-span-4 lg:col-start-9 lg:justify-end">
          {sobre.story.map((line, i) => (
            <Reveal key={i} on="mount" delay={0.6 + i * 0.12} y={24}>
              <p className="type-lead text-navy-950">{line}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
