import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { TransitionLink } from "@/components/transition/PageTransition";
import { Arrow } from "@/components/ui/Arrow";
import { PillLink } from "@/components/ui/PillLink";
import { services } from "@/lib/content";

/**
 * Índice editorial em vez de grade de cards: os nomes dos serviços são o
 * elemento visual. No hover, o nome ganha itálico e desliza — a lista
 * responde ao olhar sem precisar de ícones.
 */
export function ServicesIndex() {
  return (
    <section id="servicos" data-tone="light" className="scroll-mt-24 bg-papel py-28 lg:py-40">
      <div className="shell grid-12 gap-y-16">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-36">
            <p className="type-label text-pedra-escuro">Serviços</p>
            <RevealText className="mt-6 type-h2 text-navy-950">
              Cinco frentes, <em>um só</em> cuidado.
            </RevealText>
            <Reveal>
              <p className="mt-6 max-w-sm type-body text-pedra-escuro">
                Cada tratamento parte de uma avaliação e se integra ao plano de cuidado de cada paciente.
              </p>
              <PillLink href="/servicos" className="mt-10">
                Ver todos os serviços
              </PillLink>
            </Reveal>
          </div>
        </div>

        <Reveal as="ol" stagger={0.08} y={32} className="col-span-12 border-t hairline lg:col-span-7 lg:col-start-6">
          {services.map((service, i) => (
            <li key={service.slug} className="border-b hairline">
              <TransitionLink
                href={`/servicos#${service.slug}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-8 sm:grid-cols-[4rem_1fr_auto] lg:py-10"
              >
                <span className="type-label text-pedra-escuro">{String(i + 1).padStart(2, "0")}</span>
                <span className="block">
                  <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <span className="font-serif text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-[1.05] tracking-[-0.015em] text-navy-950 transition-transform duration-700 ease-expo group-hover:translate-x-3 group-hover:italic">
                      {service.name}
                    </span>
                    <span className="type-label text-pedra-escuro">{service.detail}</span>
                  </span>
                  <span className="mt-3 block max-w-md type-small text-pedra-escuro transition-transform duration-700 ease-expo group-hover:translate-x-3">
                    {service.summary}
                  </span>
                </span>
                <Arrow className="self-center text-navy-950 opacity-40 transition-[transform,opacity] duration-700 ease-expo group-hover:translate-x-1 group-hover:opacity-100" />
              </TransitionLink>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
