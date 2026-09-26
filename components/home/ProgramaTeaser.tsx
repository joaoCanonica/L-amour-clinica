import { VideoFeature } from "@/components/media/VideoFeature";
import { ContextShift } from "@/components/motion/ContextShift";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { Credentials } from "@/components/ui/Credentials";
import { PillLink } from "@/components/ui/PillLink";
import { programa, quotes } from "@/lib/content";
import { video } from "@/lib/media";
import { doctor } from "@/lib/site";

export function ProgramaTeaser() {
  return (
    <ContextShift tone="cacau" panelClassName="bg-cacau" className="bg-linho text-creme">
      <div className="shell grid-12 items-center gap-y-16 py-28 lg:py-44">
        <div className="col-span-12 lg:col-span-7">
          <p className="text-[0.875rem] font-medium text-ouro">Programa de Emagrecimento</p>
          <RevealText className="mt-6 font-serif text-[clamp(3.2rem,1.6rem+6vw,7.25rem)] font-medium leading-[0.94] tracking-[-0.015em]">
            {programa.hook.before}
            <br />
            <em className="text-[1.12em]">{programa.hook.accent}</em>
            <br />
            {programa.hook.after}
          </RevealText>

          <Reveal className="mt-12 max-w-lg">
            <blockquote className="type-lead italic text-creme/90">“{quotes.draProtocolo}”</blockquote>
            <p className="mt-4 type-small text-creme/70">
              {doctor.name} · <Credentials />
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <PillLink href="/programa-emagrecimento" tone="creme">
              Conhecer o programa
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
          </Reveal>
        </div>
      </div>
    </ContextShift>
  );
}
