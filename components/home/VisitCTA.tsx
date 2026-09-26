import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { PillLink } from "@/components/ui/PillLink";
import { image } from "@/lib/media";
import { site, whatsappLink, whatsappMessages } from "@/lib/site";

export function VisitCTA() {
  return (
    <section data-tone="light" className="relative isolate overflow-hidden bg-linho">
      <RevealImage
        image={image("heroBlur")}
        sizes="100vw"
        parallax={14}
        from="top"
        objectPosition="50% 20%"
        className="!absolute inset-0 -z-10"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linho/30" />

      <div className="shell flex min-h-[90svh] flex-col justify-center py-28">
        <RevealText className="max-w-[14ch] type-display text-navy-950">
          Sua avaliação começa <em>com uma conversa.</em>
        </RevealText>
        <Reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <PillLink href={whatsappLink(whatsappMessages.default)} solid>
            Agendar pelo WhatsApp
          </PillLink>
          <p className="type-small text-navy-950/80">
            {site.address.street} · {site.address.district}, {site.address.city}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
