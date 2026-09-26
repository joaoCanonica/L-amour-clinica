import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { TransitionLink } from "@/components/transition/PageTransition";
import { Arrow } from "@/components/ui/Arrow";

const paths = [
  {
    href: "/clube-lamour",
    label: "Clube L'Amour",
    title: "Um protocolo para o ano inteiro",
    note: "Avaliação completa, acompanhamento contínuo e 25% de desconto no valor total.",
  },
  {
    href: "/programa-emagrecimento",
    label: "Programa de Emagrecimento",
    title: "Nem toda obesidade é alimentação",
    note: "Protocolo médico individualizado com a Dra. Letícia Piccinin.",
  },
];

export function ServicesNext() {
  return (
    <section data-tone="dark" className="bg-navy-950 py-28 text-linho lg:py-40">
      <div className="shell">
                <RevealText className="max-w-[18ch] type-h1">
          Quando o cuidado pede <em>um plano mais longo.</em>
        </RevealText>
        <Reveal as="ul" stagger={0.1} className="mt-16 grid border-t border-linho/15 lg:mt-24 lg:grid-cols-2">
          {paths.map((p) => (
            <li key={p.href} className="border-b border-linho/15 lg:border-b-0 lg:odd:border-r lg:odd:pr-10 lg:even:pl-10">
              <TransitionLink href={p.href} className="group block py-10">
                <span className="text-[0.875rem] font-medium text-nevoa">{p.label}</span>
                <span className="mt-5 flex items-baseline justify-between gap-6">
                  <span className="font-serif text-[clamp(2rem,1.5rem+1.8vw,3.1rem)] font-medium leading-[1.05] transition-transform duration-700 ease-expo group-hover:translate-x-2 group-hover:italic">
                    {p.title}
                  </span>
                  <Arrow className="shrink-0 transition-transform duration-700 ease-expo group-hover:translate-x-1" />
                </span>
                <span className="mt-4 block max-w-md type-small text-nevoa">{p.note}</span>
              </TransitionLink>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
