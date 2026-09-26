import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { TransitionLink } from "@/components/transition/PageTransition";
import { Arrow } from "@/components/ui/Arrow";
import { Credentials } from "@/components/ui/Credentials";
import { quotes } from "@/lib/content";
import { image } from "@/lib/media";
import { doctor, founder } from "@/lib/site";

/**
 * Quem está por trás do cuidado: a fundadora e a Dra. Letícia, lado a lado.
 * TODO(conteudo): acrescentar os demais profissionais (nome, função,
 * registro no conselho e foto) quando o cliente enviar.
 */
export function Pessoas() {
  return (
    <section data-tone="light" className="bg-papel py-28 lg:py-44">
      <div className="shell grid-12 gap-y-24">
        <article className="col-span-12 lg:col-span-5">
          <RevealImage
            image={image("fundadoraRetrato")}
            sizes="(min-width: 1024px) 38vw, 100vw"
            objectPosition="50% 30%"
            className="aspect-[560/458] w-full"
          />
          <Reveal className="mt-8">
            {/* TODO(conteudo): nome da fundadora (e profissão + registro no conselho, se anunciados). */}
            {founder.name ? <p className="text-[0.875rem] font-medium text-pedra-escuro">{founder.role}</p> : null}
            <h2 className={`${founder.name ? "mt-3" : ""} type-h2 text-navy-950`}>{founder.name ?? founder.role}</h2>
            <blockquote className="mt-6 max-w-md type-lead italic text-navy-950/85">“{quotes.fundadoraSozinha}”</blockquote>
          </Reveal>
        </article>

        <article className="col-span-12 lg:col-span-5 lg:col-start-8 lg:mt-40">
          <RevealImage
            image={image("programaPilares")}
            sizes="(min-width: 1024px) 38vw, 100vw"
            objectPosition="50% 20%"
            className="aspect-[628/556] w-full"
          />
          <Reveal className="mt-8">
            <p className="text-[0.875rem] font-medium text-pedra-escuro">{doctor.role}</p>
            <h2 className="mt-3 type-h2 text-navy-950">{doctor.name}</h2>
            <p className="mt-2 type-small text-pedra-escuro">
              <Credentials />
              {/* TODO(compliance): RQE, se houver (lib/site.ts). */}
            </p>
            <p className="mt-6 max-w-md type-lead italic text-navy-950/85">{doctor.tagline}</p>
            <TransitionLink href="/programa-emagrecimento" className="group mt-8 inline-flex items-center gap-4 text-[0.875rem] font-medium text-navy-950">
              <span className="link-quiet">Programa de Emagrecimento</span>
              <Arrow className="transition-transform duration-500 ease-expo group-hover:translate-x-1" />
            </TransitionLink>
          </Reveal>
        </article>
      </div>
    </section>
  );
}
