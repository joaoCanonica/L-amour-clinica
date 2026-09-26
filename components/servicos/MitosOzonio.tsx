import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { mitosOzonio } from "@/lib/content";
import { image } from "@/lib/media";
import { founderLabel } from "@/lib/site";

/** "Três mitos sobre o ozônio retal" — mito riscado, resposta ao lado. */
export function MitosOzonio() {
  return (
    <div className="mt-24 border-t border-navy-950/10 pt-16 lg:mt-32 lg:pt-24">
      <div className="grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <h3 className="type-h2 text-navy-950">
            Três mitos sobre o <em>ozônio retal.</em>
          </h3>
          <Reveal className="mt-10 hidden lg:block">
            <RevealImage
              image={image("fundadoraRetrato")}
              sizes="(min-width: 1024px) 30vw, 0px"
              objectPosition="50% 30%"
              className="aspect-[560/458] w-full"
            />
            <blockquote className="mt-6 type-lead italic text-navy-950/85">“{mitosOzonio.quote}”</blockquote>
            <p className="mt-3 type-small text-pedra-escuro">{founderLabel()}</p>
          </Reveal>
        </div>

        <Reveal as="dl" stagger={0.1} className="col-span-12 lg:col-span-7 lg:col-start-6">
          {mitosOzonio.items.map((item) => (
            <div key={item.myth} className="border-b border-navy-950/10 py-8 first:pt-0 lg:py-10">
              <dt className="font-serif text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)] font-medium leading-tight text-navy-950/45 line-through decoration-1">
                “{item.myth}”
              </dt>
              <dd className="mt-4 max-w-xl type-body text-navy-950/85">{item.answer}</dd>
            </div>
          ))}
        </Reveal>

        <Reveal className="col-span-12 lg:hidden">
          <blockquote className="type-lead italic text-navy-950/85">“{mitosOzonio.quote}”</blockquote>
          <p className="mt-3 type-small text-pedra-escuro">{founderLabel()}</p>
        </Reveal>
      </div>
    </div>
  );
}
