import { MediaFrame } from "@/components/media/MediaFrame";
import { DrawLine } from "@/components/motion/DrawLine";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { PillLink } from "@/components/ui/PillLink";
import type { Service } from "@/lib/content";
import { image } from "@/lib/media";
import { whatsappLink } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Um serviço = um capítulo. Nome em escala de manchete, fio que se desenha
 * ao entrar, mídia de proporção fixa e o agendamento já com o nome do
 * serviço na mensagem. Os blocos alternam o lado da mídia para dar ritmo.
 */
export function ServiceBlock({ service, index, total }: { service: Service; index: number; total: number }) {
  const flipped = index % 2 === 1;
  const message = `Olá! Gostaria de agendar uma avaliação de ${service.bookingName} na L'Amour.`;

  return (
    <section
      id={service.slug}
      data-tone="light"
      aria-labelledby={`${service.slug}-titulo`}
      className={`${flipped ? "bg-papel" : "bg-linho"} py-24 lg:py-36`}
    >
      <div className="shell">
        <div className="relative">
          <DrawLine axis="x" className="h-px w-full bg-navy-950/20" />
          <div className="flex items-center justify-between gap-6 pt-5 type-label text-pedra-escuro">
            <span>
              {pad(index + 1)} / {pad(total)}
            </span>
            <span>{service.detail}</span>
          </div>
        </div>

        <RevealText
          as="h2"
          id={`${service.slug}-titulo`}
          className={`mt-12 font-serif text-[clamp(2.75rem,1.2rem+6.2vw,7.5rem)] leading-[0.92] tracking-[-0.025em] text-navy-950 lg:mt-16 ${
            flipped ? "lg:text-right" : ""
          }`}
        >
          {service.name}
        </RevealText>

        <div className="mt-14 grid-12 gap-y-12 lg:mt-20">
          <MediaFrame
            image={service.image ? image(service.image) : undefined}
            initial={service.initial}
            aspect="4 / 5"
            sizes="(min-width: 1024px) 36vw, (min-width: 640px) 60vw, 100vw"
            objectPosition="50% 30%"
            className={`col-span-12 sm:col-span-8 lg:col-span-5 ${
              flipped ? "sm:col-start-5 lg:col-start-8 lg:row-start-1" : ""
            }`}
          />

          <div
            className={`col-span-12 flex flex-col lg:col-span-5 lg:row-start-1 lg:pt-4 ${
              flipped ? "lg:col-start-1" : "lg:col-start-8"
            }`}
          >
            <Reveal>
              <p className="type-lead text-navy-950">{service.intro}</p>
            </Reveal>

            <Reveal as="ol" stagger={0.08} className="mt-12 border-t hairline">
              {service.points.map((point, i) => (
                <li key={point} className="flex items-baseline gap-5 border-b hairline py-4">
                  <span className="w-6 shrink-0 font-serif text-lg italic text-pedra">{pad(i + 1)}</span>
                  <span className="type-body text-navy-950/85">{point}</span>
                </li>
              ))}
            </Reveal>

            <Reveal className="mt-12 lg:mt-auto lg:pt-12">
              <PillLink href={whatsappLink(message)} solid ariaLabel={`Agendar ${service.name} pelo WhatsApp`}>
                Agendar {service.ctaName}
              </PillLink>
              <p className="mt-4 type-small text-pedra-escuro">
                Pelo WhatsApp, com o serviço já indicado na mensagem.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
