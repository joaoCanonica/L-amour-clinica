import { IntroSplash } from "@/components/intro/IntroSplash";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { PillLink } from "@/components/ui/PillLink";
import { image } from "@/lib/media";
import { site, whatsappLink, whatsappMessages } from "@/lib/site";

/**
 * Hero da Home: o retrato no eixo central e a assinatura da marca dividida
 * em torno dele — "Beleza atemporal." entra pela esquerda e cruza a foto;
 * "Cuidado singular." fecha à direita. Quando a entrada termina, a cortina
 * sobe e o retrato assenta no enquadramento.
 */
export function HomeHero() {
  return (
    <>
      <IntroSplash />
      <section data-tone="light" className="relative overflow-hidden bg-linho">
        <h1 className="sr-only">
          {site.name} — {site.taglines.primary}
        </h1>
        <div className="shell">
          <div className="relative flex min-h-[100svh] flex-col pb-10 pt-[104px] lg:block lg:h-[100svh] lg:min-h-[700px] lg:py-0">
            <RevealText
              as="p"
              on="mount"
              delay={0.2}
              decorative
              className="relative z-10 type-display text-navy-950 lg:absolute lg:left-0 lg:top-[21%]"
            >
              Beleza
              <br />
              atemporal.
            </RevealText>

            <RevealImage
              image={image("heroRetrato")}
              on="mount"
              priority
              parallax={6}
              sizes="(min-width: 1024px) 34vw, 72vw"
              objectPosition="50% 30%"
              className="mx-auto my-8 aspect-[558/862] w-[70%] max-w-[400px] lg:absolute lg:bottom-0 lg:left-1/2 lg:my-0 lg:h-[80svh] lg:max-h-[860px] lg:w-auto lg:max-w-none lg:-translate-x-1/2"
            />

            <RevealText
              as="p"
              on="mount"
              delay={0.35}
              decorative
              className="relative z-10 self-end text-right type-display text-navy-950 lg:absolute lg:bottom-[11%] lg:right-0"
            >
              Cuidado
              <br />
              <em>singular.</em>
            </RevealText>

            <Reveal
              on="mount"
              delay={0.9}
              className="relative z-10 mt-12 flex flex-col gap-6 lg:absolute lg:bottom-[11%] lg:left-0 lg:mt-0 lg:max-w-[17rem]"
            >
              <p className="type-small text-pedra-escuro">
                Clínica de estética e ozonioterapia no Centro de Lages. Atendimento somente com hora marcada.
              </p>
              <div>
                <PillLink href={whatsappLink(whatsappMessages.default)} solid>
                  Agendar avaliação
                </PillLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
