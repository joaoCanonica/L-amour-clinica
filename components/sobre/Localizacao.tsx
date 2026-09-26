import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { PillLink } from "@/components/ui/PillLink";
import { site } from "@/lib/site";

export function Localizacao() {
  return (
    <section data-tone="dark" className="bg-navy-950 py-28 text-linho lg:py-44">
      <div className="shell grid-12 items-end gap-y-14">
        <div className="col-span-12 lg:col-span-8">
          <p className="type-label text-nevoa">Onde estamos</p>
          <RevealText className="mt-8 type-h1">
            Centro de Lages, <em>Santa Catarina.</em>
          </RevealText>
        </div>
        <Reveal className="col-span-12 lg:col-span-4 lg:col-start-9">
          <address className="type-lead not-italic">
            {site.address.street}
            <br />
            {site.address.district} — {site.address.city}, {site.address.state}
            <br />
            {site.address.postalCode}
          </address>
          <p className="mt-6 type-small text-nevoa">{site.schedulingNote}.</p>
          <div className="mt-10">
            <PillLink href="/contato" tone="linho">
              Contato e agendamento
            </PillLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
