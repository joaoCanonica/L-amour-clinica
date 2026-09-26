import { VideoFeature } from "@/components/media/VideoFeature";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { quotes } from "@/lib/content";
import { video } from "@/lib/media";

// TODO(compliance): confirmar que há termo de autorização de uso de imagem e
// depoimento assinado pela paciente antes de publicar.
export function Depoimento() {
  return (
    <section data-tone="light" className="bg-areia py-28 lg:py-44">
      <div className="shell grid-12 items-center gap-y-14">
        <div className="col-span-12 lg:col-span-7">
          <RevealText as="blockquote" className="type-h2 text-navy-950">
            “{quotes.pacienteNetflix}”
          </RevealText>
          <Reveal>
            <p className="mt-8 type-small text-navy-950/70">Paciente do Clube L&apos;Amour</p>
          </Reveal>
        </div>

        <div className="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-9">
          <Reveal y={48}>
            <VideoFeature
              sources={[video("depoimento1"), video("depoimento2")]}
              cta="Assistir depoimento"
              chapters={["Parte 1", "Parte 2"]}
              label="Depoimento em vídeo de paciente do Clube L'Amour, em duas partes"
            />
            <p className="mt-4 type-small text-navy-950/70">
              Experiência individual. Resultados variam de pessoa para pessoa.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
