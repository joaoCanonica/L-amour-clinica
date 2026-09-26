import { VideoFeature } from "@/components/media/VideoFeature";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { DrawLine } from "@/components/motion/DrawLine";
import { PillLink } from "@/components/ui/PillLink";
import { clube } from "@/lib/content";
import { video } from "@/lib/media";
import { whatsappLink, whatsappMessages } from "@/lib/site";

export function ClubeTeaser() {
  return (
    <section data-tone="dark" className="bg-navy-950 py-28 text-linho lg:py-44">
      <div className="shell grid-12 gap-y-16">
        <div className="order-2 col-span-12 sm:col-span-8 sm:col-start-3 lg:order-1 lg:col-span-4 lg:col-start-1">
          <Reveal y={48} className="lg:sticky lg:top-28">
            <VideoFeature
              sources={[video("fundadora")]}
              cta="Como funciona"
              label="Vídeo: a fundadora da L'Amour explica como funciona o Clube L'Amour"
            />
          </Reveal>
        </div>

        <div className="order-1 col-span-12 lg:order-2 lg:col-span-7 lg:col-start-6">
          <p className="type-label text-nevoa">Clube L&apos;Amour — Assinatura anual</p>
          <RevealText className="mt-8 type-h1">
            Um plano pensado para a sua pele, <em>não uma lista de procedimentos.</em>
          </RevealText>
          <Reveal>
            <p className="mt-10 max-w-xl type-body text-nevoa">{clube.body}</p>
          </Reveal>

          <div className="relative mt-16 pl-8 sm:pl-12">
            <DrawLine className="absolute left-0 top-2 bottom-2 w-px bg-linho/30" />
            <Reveal as="ol" stagger={0.12}>
              {clube.steps.map((step, i) => (
                <li key={step.title} className="relative grid grid-cols-[3rem_1fr] items-baseline gap-4 py-6 sm:grid-cols-[4rem_1fr]">
                  <span aria-hidden className="absolute -left-8 top-[2.3rem] size-[7px] -translate-x-[3px] rounded-full bg-linho sm:-left-12" />
                  <span className="font-serif text-2xl italic text-nevoa">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-serif text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-tight">
                      {step.emphasis ? (
                        <>
                          <em className="text-[1.35em] leading-none">{step.emphasis}</em>
                          {step.title.slice(step.emphasis.length)}
                        </>
                      ) : (
                        step.title
                      )}
                    </span>
                    <span className="mt-1.5 block type-small text-nevoa">{step.note}</span>
                  </span>
                </li>
              ))}
            </Reveal>
          </div>

          <Reveal className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5">
            <PillLink href="/clube-lamour" tone="linho">
              Conhecer o Clube
            </PillLink>
            <a
              href={whatsappLink(whatsappMessages.clube)}
              target="_blank"
              rel="noopener noreferrer"
              className="type-label underline decoration-linho/30 underline-offset-[6px] transition-colors hover:decoration-linho"
            >
              Tirar dúvidas no WhatsApp
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
