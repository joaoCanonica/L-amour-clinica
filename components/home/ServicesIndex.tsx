import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { TransitionLink } from "@/components/transition/PageTransition";
import { Arrow } from "@/components/ui/Arrow";
import { services } from "@/lib/content";

/** Os tratamentos como um índice tipográfico: nome, uma linha, seta. */
export function ServicesIndex() {
  return (
    <section id="servicos" data-tone="light" className="bg-papel py-28 lg:py-44">
      <div className="shell grid-12 gap-y-14">
        <div className="col-span-12 lg:col-span-4">
          <RevealText className="type-h2 text-navy-950 lg:sticky lg:top-24">
            Tratamentos
          </RevealText>
        </div>

        <Reveal as="ul" stagger={0.07} y={28} className="col-span-12 lg:col-span-8">
          {services.map((service) => (
            <li key={service.slug} className="border-b border-navy-950/10 first:border-t">
              <TransitionLink
                href={`/servicos#${service.slug}`}
                className="group flex items-center justify-between gap-6 py-7 lg:py-9"
              >
                <span>
                  <span className="block font-serif text-[clamp(2rem,1.4rem+2.2vw,3.4rem)] font-medium leading-[1.02] text-navy-950 transition-transform duration-700 ease-expo group-hover:translate-x-2 group-hover:italic">
                    {service.name}
                  </span>
                  <span className="mt-2 block max-w-md type-small text-pedra-escuro">{service.summary}</span>
                </span>
                <Arrow className="shrink-0 text-navy-950 opacity-30 transition-[transform,opacity] duration-700 ease-expo group-hover:translate-x-1 group-hover:opacity-100" />
              </TransitionLink>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
