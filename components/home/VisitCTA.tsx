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

      <div className="shell flex min-h-[92svh] flex-col justify-center py-28">
        <p className="type-label text-navy-950/80">{site.schedulingNote}</p>
        <RevealText className="mt-8 max-w-[16ch] type-display text-navy-950">
          Sua avaliação começa <em>com uma conversa.</em>
        </RevealText>
        <Reveal className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <PillLink href={whatsappLink(whatsappMessages.default)} solid>
              Agendar pelo WhatsApp
            </PillLink>
            <PillLink href={`tel:+${site.phones.landline.e164}`}>Ligar {site.phones.landline.display}</PillLink>
          </div>
          <address className="type-small not-italic text-navy-950/80 lg:text-right">
            {site.address.street} — {site.address.district}
            <br />
            {site.address.city} – {site.address.state}, {site.address.postalCode}
          </address>
        </Reveal>
      </div>
    </section>
  );
}
