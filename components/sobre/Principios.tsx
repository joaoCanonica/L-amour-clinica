import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { sobre } from "@/lib/content";

export function Principios() {
  return (
    <section data-tone="light" className="bg-papel py-28 lg:py-40">
      <div className="shell grid-12 gap-y-14">
        <div className="col-span-12 lg:col-span-4">
          <p className="type-label text-pedra-escuro">Como trabalhamos</p>
          <RevealText className="mt-6 type-h2 text-navy-950">
            Beleza atemporal. <em>Cuidado singular.</em>
          </RevealText>
        </div>
        <Reveal as="ol" stagger={0.1} className="col-span-12 border-t hairline lg:col-span-7 lg:col-start-6">
          {sobre.principles.map((p, i) => (
            <li key={p.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b hairline py-8 sm:grid-cols-[5rem_1fr] lg:py-10">
              <span className="font-serif text-3xl italic text-navy-800/70">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block font-serif text-[clamp(1.6rem,1.3rem+1.1vw,2.4rem)] leading-tight text-navy-950">
                  {p.title}
                </span>
                <span className="mt-3 block max-w-md type-body text-pedra-escuro">{p.note}</span>
              </span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
