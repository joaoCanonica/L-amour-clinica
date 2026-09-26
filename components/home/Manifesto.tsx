import { Reveal } from "@/components/motion/Reveal";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { site } from "@/lib/site";

export function Manifesto() {
  return (
    <section data-tone="light" className="bg-linho py-32 lg:py-52">
      <div className="shell grid-12 gap-y-10">
        <p className="col-span-12 type-label text-pedra-escuro lg:col-span-2 lg:pt-4">A clínica</p>
        <ScrubWords className="col-span-12 type-h2 text-navy-950 lg:col-span-9 lg:!text-[clamp(2.5rem,1rem+3.4vw,4.25rem)]">
          Cada pele, cada corpo e cada rotina pedem um olhar próprio. Na L&apos;Amour, o cuidado começa por
          uma avaliação individual — e só depois se transforma em protocolo.
        </ScrubWords>
        <Reveal className="col-span-12 flex items-center gap-5 lg:col-span-6 lg:col-start-3 lg:mt-8">
          <span aria-hidden className="h-px w-14 bg-navy-950/40" />
          <p className="type-lead italic text-navy-800">{site.taglines.secondary}</p>
        </Reveal>
      </div>
    </section>
  );
}
