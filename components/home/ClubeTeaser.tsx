import { VideoFeature } from "@/components/media/VideoFeature";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { PillLink } from "@/components/ui/PillLink";
import { video } from "@/lib/media";

export function ClubeTeaser() {
  return (
    <section data-tone="dark" className="bg-navy-950 py-28 text-linho lg:py-44">
      <div className="shell grid-12 items-center gap-y-16">
        <div className="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-1">
          <Reveal y={48}>
            <VideoFeature
              sources={[video("fundadora")]}
              cta="Como funciona"
              label="Vídeo: a fundadora da L'Amour explica como funciona o Clube L'Amour"
            />
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <p className="text-[0.875rem] font-medium text-nevoa">Clube L&apos;Amour</p>
          <RevealText className="mt-6 type-h1">
            A pele não responde a procedimentos isolados. <em>Responde à constância.</em>
          </RevealText>
          <Reveal>
            <p className="mt-10 max-w-lg type-body text-nevoa">
              No Clube, a sua avaliação vira um protocolo para o ano inteiro: agenda organizada, acompanhamento do
              início ao fim e 25% de desconto sobre o valor total, pago em mensalidades.
            </p>
          </Reveal>
          <Reveal className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
            <PillLink href="/clube-lamour" tone="linho">
              Conhecer o Clube
            </PillLink>
            <p className="flex items-baseline gap-3">
              <span className="font-serif text-5xl italic">25%</span>
              <span className="type-small text-nevoa">de desconto no total</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
