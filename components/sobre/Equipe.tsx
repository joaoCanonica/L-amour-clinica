import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { TransitionLink } from "@/components/transition/PageTransition";
import { Arrow } from "@/components/ui/Arrow";
import { image } from "@/lib/media";
import { doctor } from "@/lib/site";

// TODO(conteudo): adicionar os demais profissionais (nome, função, registro
// profissional — CRM/CRO/CREFITO etc. — e foto) quando o cliente enviar.
export function Equipe() {
  return (
    <section data-tone="light" className="bg-linho py-28 lg:py-44">
      <div className="shell">
        <p className="type-label text-pedra-escuro">Equipe</p>
        <div className="mt-12 grid-12 items-end gap-y-12">
          <div className="col-span-12 sm:col-span-7 lg:col-span-5">
            <RevealImage
              image={image("programaPilares")}
              sizes="(min-width: 1024px) 36vw, (min-width: 640px) 55vw, 100vw"
              objectPosition="50% 25%"
              className="aspect-[4/5] w-full"
            />
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="type-label text-pedra-escuro">Médica · Programa de Emagrecimento</p>
            <RevealText className="mt-6 font-serif text-[clamp(2.75rem,1.4rem+4.6vw,5.75rem)] italic leading-[0.95] tracking-[-0.02em] text-navy-950">
              {doctor.name}
            </RevealText>
            <Reveal as="ul" stagger={0.08} className="mt-10 border-t hairline">
              {doctor.registrations.map((reg) => (
                <li key={reg} className="border-b hairline py-4 type-label text-navy-950">
                  {reg}
                </li>
              ))}
              {/* TODO(compliance): RQE da Dra. Letícia — exibir assim que confirmado (lib/site.ts). */}
              {doctor.rqe ? <li className="border-b hairline py-4 type-label text-navy-950">{doctor.rqe}</li> : null}
            </Reveal>
            <Reveal>
              <TransitionLink
                href="/programa-emagrecimento"
                className="group mt-10 inline-flex items-center gap-4 type-label text-navy-950"
              >
                <span className="underline decoration-navy-950/25 underline-offset-[6px] transition-colors group-hover:decoration-navy-950">
                  Conhecer o Programa de Emagrecimento
                </span>
                <Arrow className="transition-transform duration-500 ease-expo group-hover:translate-x-1" />
              </TransitionLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
