import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { programa } from "@/lib/content";
import { image } from "@/lib/media";
import { PilaresList } from "./PilaresList";

export function Pilares() {
  return (
    <section id="pilares" data-tone="prog" className="bg-bege-prog text-cacau">
      <div className="shell pt-28 lg:pt-44">
        <div className="grid-12 items-end gap-y-12">
          <div className="col-span-12 sm:col-span-8 lg:col-span-5">
            <RevealImage
              image={image("programaPilares")}
              sizes="(min-width: 1024px) 38vw, 70vw"
              objectPosition="50% 20%"
              className="aspect-[628/556] w-full"
            />
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="type-label text-terracota">Pilares do protocolo</p>
            <RevealText className="mt-8 font-serif text-[clamp(2.75rem,1.4rem+4.2vw,5.5rem)] leading-[0.94] tracking-[-0.02em]">
              Pilares do
              <br />
              <em className="text-[1.15em]">protocolo</em>
              <br />
              de emagrecimento.
            </RevealText>
            <Reveal>
              <p className="mt-10 max-w-md type-body text-terracota">
                Treze frentes de cuidado, aplicadas conforme a avaliação médica de cada paciente.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 lg:mt-8">
          <PilaresList pilares={programa.pilares} />
        </div>

        <div className="grid-12 border-t border-cacau/15 py-12 lg:py-16">
          <p className="col-span-12 type-small text-terracota lg:col-span-6 lg:col-start-7">{programa.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
