import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { TransitionLink } from "@/components/transition/PageTransition";
import { PillLink } from "@/components/ui/PillLink";
import { image } from "@/lib/media";
import { site, whatsappLink, whatsappMessages } from "@/lib/site";

export function HomeHero() {
  return (
    <section data-tone="light" className="relative bg-linho">
      <div className="shell flex min-h-[100svh] flex-col pb-10 pt-[92px] lg:pb-12 lg:pt-[116px]">
        <Reveal
          on="mount"
          delay={0.2}
          className="flex items-center justify-between gap-6 border-b hairline pb-4 type-label text-pedra-escuro"
        >
          <span>Lages — Santa Catarina</span>
          <span className="hidden md:inline">{site.descriptor}</span>
          <span className="hidden sm:inline">Somente com agendamento</span>
        </Reveal>

        <div className="relative flex flex-1 flex-col lg:mt-12">
          <RevealText
            as="h1"
            on="mount"
            delay={0.15}
            className="relative z-10 mt-10 type-display text-navy-950 lg:mt-[2vh]"
          >
            Beleza
            <br />
            atemporal.
            <br />
            Cuidado <em>singular.</em>
          </RevealText>

          <RevealImage
            image={image("heroRetrato")}
            on="mount"
            delay={0.05}
            priority
            parallax={10}
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 70vw, 100vw"
            objectPosition="50% 30%"
            className="mt-10 aspect-[558/862] w-full max-w-[520px] self-end sm:w-[70%] lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:h-full lg:w-auto lg:max-w-none"
          />

          <Reveal
            on="mount"
            delay={0.9}
            className="relative z-10 mt-12 max-w-[26rem] lg:mt-auto lg:pt-10"
          >
            <p className="type-body text-pedra-escuro">
              Estética avançada facial e corporal, ozonioterapia, harmonização orofacial, massoterapia e
              podologia — com protocolos construídos a partir de uma avaliação individual.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <PillLink href={whatsappLink(whatsappMessages.default)} solid>
                Agendar avaliação
              </PillLink>
              <TransitionLink
                href="#servicos"
                className="type-label underline decoration-navy-950/25 underline-offset-[6px] transition-colors hover:decoration-navy-950"
              >
                Conhecer os serviços
              </TransitionLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
