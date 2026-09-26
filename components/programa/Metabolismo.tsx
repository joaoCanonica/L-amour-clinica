import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { programa } from "@/lib/content";

export function Metabolismo() {
  return (
    <section data-tone="creme" className="bg-creme py-28 text-cacau lg:py-44">
      <div className="shell grid-12 gap-y-14">
        <p className="col-span-12 type-label text-terracota">Atividade metabólica</p>

        <div className="col-span-12 lg:col-span-6">
          <RevealText className="font-serif text-[clamp(2.25rem,1.3rem+3.6vw,4.5rem)] italic leading-[1.02] tracking-[-0.02em] lg:sticky lg:top-32">
            Duas pessoas com alimentação semelhante podem apresentar respostas completamente diferentes.
          </RevealText>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="type-lead">{programa.metabolismo}</p>
          </Reveal>

          <div className="mt-16">
            <p className="type-label text-terracota">Fatores envolvidos</p>
            <Reveal as="ol" stagger={0.06} className="mt-6 border-t border-cacau/20">
              {programa.fatores.map((fator, i) => (
                <li
                  key={fator}
                  className="flex items-baseline justify-between gap-6 border-b border-cacau/20 py-4"
                >
                  <span className="font-serif text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)]">{fator}</span>
                  <span className="font-serif text-lg italic text-terracota">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
