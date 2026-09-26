import { Credentials } from "@/components/ui/Credentials";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { programa } from "@/lib/content";
import { doctor } from "@/lib/site";

export function DoencaCronica() {
  const { doenca } = programa;
  return (
    <section data-tone="cacau" className="bg-cacau py-32 text-creme lg:py-48">
      <div className="shell grid-12 gap-y-14">
        <p className="col-span-12 type-label text-ouro">Doença crônica</p>
        <ScrubWords
          as="h2"
          dim={0.2}
          className="col-span-12 font-serif text-[clamp(2.5rem,1.2rem+5vw,6rem)] italic leading-[0.98] tracking-[-0.025em] lg:col-span-11"
        >
          {doenca.statement}
        </ScrubWords>

        <Reveal className="col-span-12 lg:col-span-6 lg:col-start-6">
          <p className="type-lead text-creme/85">{doenca.body}</p>
        </Reveal>

        <div className="col-span-12 mt-10 grid-12 gap-y-8 border-t border-creme/15 pt-12 lg:mt-20">
          <Reveal className="col-span-12 lg:col-span-4">
            <p className="type-h3">{doenca.goalA}</p>
          </Reveal>
          <Reveal delay={0.15} className="col-span-12 lg:col-span-7 lg:col-start-6">
            <p className="font-serif text-[clamp(1.75rem,1.2rem+2vw,3rem)] italic leading-[1.12] text-ouro">
              {doenca.goalB}
            </p>
            <p className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-serif text-lg italic">— {doctor.name}</span>
              <span className="type-label text-creme/70"><Credentials /></span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
