import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { sobre } from "@/lib/content";
import { image } from "@/lib/media";

/**
 * Abertura + história em tom editorial: frases curtas, uma por bloco, em
 * serifa grande — funciona com uma única foto.
 */
export function SobreHero() {
  return (
    <section data-tone="light" className="bg-linho">
      <div className="shell pb-28 pt-[92px] lg:pb-44 lg:pt-[116px]">
        <Reveal
          on="mount"
          delay={0.2}
          className="flex items-center justify-between gap-6 border-b hairline pb-4 type-label text-pedra-escuro"
        >
          <span>Sobre a L&apos;Amour</span>
          <span className="hidden sm:inline">Lages — Santa Catarina</span>
        </Reveal>

        <RevealText as="h1" on="mount" delay={0.15} className="mt-14 max-w-[13ch] type-display text-navy-950 lg:mt-20">
          Cuidado que começa <em>por ouvir.</em>
        </RevealText>

        <div className="mt-20 grid-12 gap-y-16 lg:mt-28">
          <div className="col-span-12 sm:col-span-8 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <RevealImage
                image={image("heroRetrato")}
                on="mount"
                delay={0.4}
                sizes="(min-width: 1024px) 36vw, (min-width: 640px) 60vw, 100vw"
                objectPosition="50% 35%"
                className="aspect-[4/5] w-full"
              />
              {/* TODO: substituir/complementar por fotos da clínica e da equipe quando chegarem. */}
            </div>
          </div>

          <div className="col-span-12 flex flex-col gap-16 lg:col-span-6 lg:col-start-7 lg:gap-24 lg:pt-24">
            {sobre.story.map((line, i) => (
              <Reveal key={i} y={40}>
                <span className="type-label text-pedra-escuro">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-5 font-serif text-[clamp(1.75rem,1.2rem+1.9vw,2.9rem)] leading-[1.14] tracking-[-0.01em] text-navy-950">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
