import { VideoFeature } from "@/components/media/VideoFeature";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { video } from "@/lib/media";

// TODO(compliance): confirmar que há termo de autorização de uso de imagem e
// depoimento assinado pela paciente antes de publicar.
export function Depoimento() {
  return (
    <section data-tone="light" className="bg-areia py-28 lg:py-44">
      <div className="shell grid-12 items-end gap-y-14">
        <div className="col-span-12 lg:col-span-6">
          <p className="type-label text-navy-950/70">Depoimento</p>
          <RevealText className="mt-8 type-h1 text-navy-950">
            Na voz de quem <em>vive</em> o Clube.
          </RevealText>
          <Reveal>
            <p className="mt-10 max-w-md type-body text-navy-950/75">
              O relato de uma paciente do Clube L&apos;Amour, em duas partes.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-8">
          <Reveal y={48}>
            <VideoFeature
              sources={[video("depoimento1"), video("depoimento2")]}
              cta="Assistir depoimento"
              label="Depoimento em vídeo de paciente do Clube L'Amour, em duas partes"
            />
            <p className="mt-5 type-small text-navy-950/70">
              Experiência individual. Resultados variam de pessoa para pessoa.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
