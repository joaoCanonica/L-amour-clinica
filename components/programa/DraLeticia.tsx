import { VideoFeature } from "@/components/media/VideoFeature";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { PillLink } from "@/components/ui/PillLink";
import { image, video } from "@/lib/media";
import { doctor, whatsappLink, whatsappMessages } from "@/lib/site";

export function DraLeticia() {
  return (
    <section data-tone="creme" className="bg-creme py-28 text-cacau lg:py-44">
      <div className="shell grid-12 gap-y-16">
        <div className="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-1">
          <Reveal y={48}>
            <VideoFeature
              sources={[video("hookPrograma")]}
              surface="bg-terracota"
              label="Vídeo: Dra. Letícia Piccinin fala sobre o protocolo de emagrecimento"
            />
          </Reveal>
        </div>

        <div className="col-span-12 flex flex-col lg:col-span-7 lg:col-start-6">
          <p className="type-label text-terracota">Quem conduz o protocolo</p>
          <RevealText className="mt-8 font-serif text-[clamp(2.75rem,1.4rem+5vw,6rem)] italic leading-[0.95] tracking-[-0.02em]">
            {doctor.name}
          </RevealText>

          <Reveal as="ul" stagger={0.08} className="mt-10 grid border-t border-cacau/20 sm:grid-cols-3">
            {doctor.registrations.map((reg) => (
              <li key={reg} className="border-b border-cacau/20 py-4 type-label sm:border-b-0 sm:py-5">
                {reg}
              </li>
            ))}
            {/* TODO(compliance): exibir o RQE aqui assim que confirmado (ver lib/site.ts). */}
            {doctor.rqe ? <li className="py-4 type-label sm:py-5">{doctor.rqe}</li> : null}
          </Reveal>

          <Reveal>
            <p className="mt-10 max-w-lg type-lead">
              O protocolo começa por uma consulta médica detalhada e individualizada — e cada etapa seguinte
              é definida a partir dela.
            </p>
          </Reveal>

          <RevealImage
            image={image("draLeticia")}
            sizes="(min-width: 1024px) 34vw, 90vw"
            objectPosition="50% 30%"
            from="left"
            className="mt-14 aspect-[638/418] w-full sm:w-4/5 lg:w-3/4"
          />
          <Reveal className="mt-10">
            <PillLink href={whatsappLink(whatsappMessages.programa)} tone="cacau">
              Agendar consulta
            </PillLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
