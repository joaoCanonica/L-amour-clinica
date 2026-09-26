import { VideoFeature } from "@/components/media/VideoFeature";
import { ContextShift } from "@/components/motion/ContextShift";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { Credentials } from "@/components/ui/Credentials";
import { PillLink } from "@/components/ui/PillLink";
import { programa } from "@/lib/content";
import { video } from "@/lib/media";
import { doctor } from "@/lib/site";

export function ProgramaTeaser() {
  return (
    <ContextShift tone="cacau" panelClassName="bg-cacau" className="bg-linho text-creme">
      <div className="shell grid-12 gap-y-16 py-28 lg:py-44">
        <div className="col-span-12 flex flex-col lg:col-span-6">
          <p className="type-label text-ouro">Programa de Emagrecimento</p>
          <RevealText className="mt-8 font-serif text-[clamp(3rem,1.6rem+5.4vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
            {programa.hook.before}
            <br />
            <em className="text-[1.18em]">{programa.hook.accent}</em>
            <br />
            {programa.hook.after}
          </RevealText>

          <Reveal className="mt-10 max-w-lg">
            <p className="type-lead text-creme/85">
              Nosso peso é influenciado pela atividade metabólica, a forma como o organismo utiliza,
              armazena e gasta energia.
            </p>
          </Reveal>

          <Reveal className="mt-14 flex flex-wrap items-end gap-x-12 gap-y-10 lg:mt-auto lg:pt-16">
            <div className="flex items-end gap-4">
              <span className="type-numeral text-ouro">13</span>
              <span className="type-label pb-2 leading-relaxed text-creme/80">
                pilares
                <br />
                no protocolo
              </span>
            </div>
            <PillLink href="/programa-emagrecimento" tone="creme">
              Conhecer o protocolo
            </PillLink>
          </Reveal>
        </div>

        <div className="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-9">
          <Reveal y={48}>
            <VideoFeature
              sources={[video("hookPrograma")]}
              surface="bg-terracota"
              label="Vídeo: Dra. Letícia Piccinin fala sobre o protocolo de emagrecimento"
            />
            <div className="mt-5 flex flex-col gap-1 border-t border-creme/20 pt-4">
              <p className="font-serif text-lg italic">{doctor.name}</p>
              <p className="type-label text-creme/70"><Credentials /></p>
            </div>
          </Reveal>
        </div>
      </div>
    </ContextShift>
  );
}
