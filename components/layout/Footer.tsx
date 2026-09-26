import { LogoIcon, LogoWordmark } from "@/components/brand/Logo";
import { PrivacyPreferencesButton } from "@/components/consent/ConsentBanner";
import { TransitionLink } from "@/components/transition/PageTransition";
import { PillLink } from "@/components/ui/PillLink";
import { nav, site, whatsappLink, whatsappMessages } from "@/lib/site";

export function Footer() {
  return (
    <footer id="site-footer" data-tone="dark" className="relative overflow-hidden bg-navy-950 text-linho">
      <div className="shell pt-24 lg:pt-32">
        <div className="grid-12 gap-y-16">
          <div className="col-span-12 lg:col-span-5">
            <LogoIcon className="mb-10 h-12 w-auto text-linho/90" />
            <p className="max-w-[12ch] type-h2">
              Cuidado pensado <em>para você.</em>
            </p>
            <div className="mt-10">
              <PillLink href={whatsappLink(whatsappMessages.default)} tone="linho">
                Agendar pelo WhatsApp
              </PillLink>
            </div>
          </div>

          <div className="col-span-12 grid grid-cols-2 gap-x-8 gap-y-12 type-small sm:grid-cols-3 lg:col-span-6 lg:col-start-7 lg:pt-3">
            <div>
              <h2 className="mb-4 text-[0.8125rem] font-medium text-nevoa">Endereço</h2>
              <address className="not-italic">
                {site.address.street}
                <br />
                {site.address.district}, {site.address.city} – {site.address.state}
                <br />
                {site.address.postalCode}
              </address>
              <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block link-quiet">
                Ver no mapa
              </a>
            </div>

            <div>
              <h2 className="mb-4 text-[0.8125rem] font-medium text-nevoa">Contato</h2>
              <ul className="space-y-1.5">
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
              <p className="mt-6 text-nevoa">{site.schedulingNote}.</p>
            </div>

            <nav aria-label="Rodapé" className="col-span-2 sm:col-span-1">
              <h2 className="mb-4 text-[0.8125rem] font-medium text-nevoa">Navegação</h2>
              <ul className="space-y-1.5">
                {nav.map((item) => (
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

        <div className="mt-20 flex flex-col gap-4 border-t border-linho/15 pt-6 type-small text-nevoa lg:mt-28 lg:flex-row lg:items-center lg:justify-between">
          {/* TODO(compliance): o CFM (Res. 2.336/2023) exige a identificação do
              responsável técnico médico (nome, CRM e RQE, se houver) em peças
              publicitárias da clínica. Confirmar quem é o RT e incluir aqui. */}
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <TransitionLink href="/privacidade" className="hover:text-linho">
              Política de privacidade
            </TransitionLink>
            <PrivacyPreferencesButton className="text-left hover:text-linho" />
          </div>
        </div>
      </div>

      <div aria-hidden className="shell mt-14 translate-y-[18%] lg:mt-20">
        <LogoWordmark className="w-full text-linho" />
      </div>
    </footer>
  );
}
