import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/transition/PageTransition";
import { Arrow } from "@/components/ui/Arrow";
import { services } from "@/lib/content";

/** Sumário da página: âncoras para cada serviço. */
export function ServicesTOC() {
  return (
    <nav aria-label="Serviços nesta página" className="mt-20 lg:mt-28">
      <Reveal as="ol" on="mount" delay={1} stagger={0.06} className="grid border-t hairline sm:grid-cols-2 lg:grid-cols-5">
        {services.map((service, i) => (
          <li key={service.slug} className="border-b hairline lg:border-b-0 lg:border-r lg:last:border-r-0">
            <TransitionLink
              href={`#${service.slug}`}
              className="group flex h-full items-baseline justify-between gap-4 py-5 lg:flex-col lg:items-start lg:justify-start lg:gap-8 lg:px-5 lg:py-7 lg:first:pl-0"
            >
              <span className="type-label text-pedra-escuro">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex flex-1 items-baseline justify-between gap-4 lg:w-full">
                <span className="font-serif text-xl leading-tight text-navy-950 transition-transform duration-700 ease-expo group-hover:translate-x-1 group-hover:italic">
                  {service.name}
                </span>
                <Arrow className="rotate-90 text-navy-950 opacity-40 transition-opacity group-hover:opacity-100" />
              </span>
            </TransitionLink>
          </li>
        ))}
      </Reveal>
    </nav>
  );
}
