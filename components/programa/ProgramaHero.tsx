import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { Credentials } from "@/components/ui/Credentials";
import { PillLink } from "@/components/ui/PillLink";
import { programa } from "@/lib/content";
import { image } from "@/lib/media";
import { doctor, whatsappLink, whatsappMessages } from "@/lib/site";

export function ProgramaHero() {
  return (
    <section data-tone="cacau" className="relative isolate overflow-hidden bg-cacau text-creme">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_30%_0%,#6a4222_0%,transparent_65%)]"
      />
      <div className="shell flex min-h-[100svh] flex-col pb-10 pt-[104px] lg:pt-[120px]">

        <div className="grid-12 flex-1 items-center gap-y-12 py-12 lg:py-10">
          <RevealText
            as="h1"
            on="mount"
            delay={0.15}
            className="col-span-12 font-serif text-[clamp(3.6rem,1.6rem+8vw,10rem)] font-medium leading-[0.9] tracking-[-0.015em] lg:col-span-7"
          >
            {programa.hook.before}
            <br />
            <em className="text-[1.22em] tracking-[-0.035em]">{programa.hook.accent}</em>
            <br />
            {programa.hook.after}
          </RevealText>

          <div className="col-span-12 sm:col-span-9 lg:col-span-5 lg:col-start-8">
            <RevealImage
              image={image("programaHero")}
              on="mount"
              delay={0.05}
              priority
              parallax={8}
              sizes="(min-width: 1024px) 40vw, 90vw"
              objectPosition="60% 40%"
              className="aspect-[638/542] w-full"
            />
          </div>
        </div>

        <Reveal
          on="mount"
          delay={1}
          className="flex flex-col gap-8 border-t border-creme/15 pt-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <p className="type-label text-creme/80">{programa.hookNote}</p>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <p className="type-small text-creme/70">
              {doctor.name}
              <br />
              <span className="type-label !tracking-[0.18em]"><Credentials /></span>
            </p>
            <PillLink href={whatsappLink(whatsappMessages.programa)} tone="creme" solid>
              Agendar consulta
            </PillLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
