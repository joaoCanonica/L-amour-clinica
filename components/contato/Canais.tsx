import { Reveal } from "@/components/motion/Reveal";
import { PillLink } from "@/components/ui/PillLink";
import { site, whatsappLink, whatsappMessages } from "@/lib/site";

const rowLink =
  "font-serif text-[clamp(1.6rem,1.3rem+1.1vw,2.35rem)] leading-tight text-navy-950 underline decoration-navy-950/15 underline-offset-[8px] transition-colors hover:decoration-navy-950";

export function Canais() {
  return (
    <Reveal as="dl" stagger={0.08} className="border-t hairline">
      <div className="border-b hairline py-8">
        <dt className="type-label text-pedra-escuro">WhatsApp — agendamento</dt>
        <dd className="mt-4">
          <a href={whatsappLink(whatsappMessages.default)} target="_blank" rel="noopener noreferrer" className={rowLink}>
            {site.phones.whatsapp.display}
          </a>
          <div className="mt-6">
            <PillLink href={whatsappLink(whatsappMessages.default)} solid>
              Agendar pelo WhatsApp
            </PillLink>
          </div>
        </dd>
      </div>
      <div className="border-b hairline py-8">
        <dt className="type-label text-pedra-escuro">Telefone</dt>
        <dd className="mt-4">
          <a href={`tel:+${site.phones.landline.e164}`} className={rowLink}>
            {site.phones.landline.display}
          </a>
        </dd>
      </div>
      <div className="border-b hairline py-8">
        <dt className="type-label text-pedra-escuro">Endereço</dt>
        <dd className="mt-4">
          <address className="font-serif text-[clamp(1.35rem,1.2rem+0.6vw,1.75rem)] not-italic leading-snug text-navy-950">
            {site.address.street}
            <br />
            {site.address.district}, {site.address.city} – {site.address.state}
            <br />
            {site.address.postalCode}
          </address>
          <a
            href={site.address.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block type-label underline decoration-navy-950/25 underline-offset-[6px] hover:decoration-navy-950"
          >
            Como chegar
          </a>
        </dd>
      </div>
      <div className="border-b hairline py-8">
        <dt className="type-label text-pedra-escuro">Horários</dt>
        <dd className="mt-4 type-body text-navy-950">
          {site.hours ?? "Dias e horários confirmados no agendamento."}
        </dd>
      </div>
    </Reveal>
  );
}
