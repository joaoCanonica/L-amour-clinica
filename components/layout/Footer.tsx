import { LogoIcon, LogoWordmark } from "@/components/brand/Logo";
import { TransitionLink } from "@/components/transition/PageTransition";
import { Credentials } from "@/components/ui/Credentials";
import { PillLink } from "@/components/ui/PillLink";
import { doctor, nav, site, whatsappLink, whatsappMessages } from "@/lib/site";

export function Footer() {
  return (
    <footer id="site-footer" data-tone="dark" className="relative overflow-hidden bg-navy-950 text-linho">
      <div className="shell pt-24 lg:pt-36">
        <div className="grid-12 gap-y-16">
          <div className="col-span-12 lg:col-span-6">
            <LogoIcon className="mb-10 h-12 w-auto text-linho/90" />
            <p className="type-h2 max-w-[14ch]">
              Cuidado pensado <em>para você.</em>
            </p>
            <div className="mt-10">
              <PillLink href={whatsappLink(whatsappMessages.default)} tone="linho">
                Agendar pelo WhatsApp
              </PillLink>
            </div>
          </div>

          <div className="col-span-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-span-6 lg:pt-3">
            <div>
              <h2 className="type-label mb-5 text-nevoa">Endereço</h2>
              <address className="type-small not-italic">
                {site.address.street}
                <br />
                {site.address.district}, {site.address.city} – {site.address.state}
                <br />
                {site.address.postalCode}
              </address>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="type-small mt-3 inline-block underline decoration-linho/30 underline-offset-4 transition-colors hover:decoration-linho"
              >
                Ver no mapa
              </a>
            </div>

            <div>
              <h2 className="type-label mb-5 text-nevoa">Contato</h2>
              <ul className="type-small space-y-1.5">
                <li>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                    WhatsApp <span className="whitespace-nowrap">{site.phones.whatsapp.display}</span>
                  </a>
                </li>
                <li>
                  <a href={`tel:+${site.phones.landline.e164}`} className="hover:underline underline-offset-4">
                    Telefone <span className="whitespace-nowrap">{site.phones.landline.display}</span>
                  </a>
                </li>
              </ul>
              <h2 className="type-label mb-3 mt-8 text-nevoa">Atendimento</h2>
              <p className="type-small">{site.schedulingNote}.</p>
            </div>

            <nav aria-label="Rodapé" className="col-span-2 sm:col-span-1">
              <h2 className="type-label mb-5 text-nevoa">Navegação</h2>
              <ul className="type-small space-y-1.5">
                {[{ href: "/", label: "Início" }, ...nav].map((item) => (
                  <li key={item.href}>
                    <TransitionLink href={item.href} className="hover:underline underline-offset-4">
                      {item.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t hairline pt-6 type-small text-nevoa lg:mt-28 lg:flex-row lg:items-center lg:justify-between">
          {/* TODO(compliance): o CFM (Res. 2.336/2023) exige a identificação do
              responsável técnico médico (nome, CRM e RQE, se houver) em peças
              publicitárias da clínica. Confirmar quem é o RT e ajustar esta linha. */}
          <p>
            Programa de Emagrecimento conduzido pela {doctor.name} — <Credentials />
          </p>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>

      {/* Assinatura em escala de parede, cortada pela borda inferior */}
      <div aria-hidden className="shell mt-14 translate-y-[18%] lg:mt-20">
        <LogoWordmark className="w-full text-linho" />
      </div>
    </footer>
  );
}
