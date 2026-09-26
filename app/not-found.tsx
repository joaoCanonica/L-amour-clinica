import { LogoIcon } from "@/components/brand/Logo";
import { PillLink } from "@/components/ui/PillLink";
import { whatsappLink, whatsappMessages } from "@/lib/site";

export default function NotFound() {
  return (
    <section data-tone="light" className="bg-linho">
      <div className="shell flex min-h-[100svh] flex-col justify-center pb-20 pt-40">
        <LogoIcon className="h-12 w-auto text-navy-800" />
        <p className="mt-12 type-label text-pedra-escuro">Página em preparação</p>
        <h1 className="mt-6 max-w-[14ch] type-h1 text-navy-950">
          Esta página ainda está <em>sendo cuidada.</em>
        </h1>
        <p className="mt-8 max-w-md type-body text-pedra-escuro">
          Enquanto isso, você pode voltar ao início ou falar diretamente com a clínica pelo WhatsApp.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <PillLink href="/" solid>
            Voltar ao início
          </PillLink>
          <PillLink href={whatsappLink(whatsappMessages.default)}>Falar no WhatsApp</PillLink>
        </div>
      </div>
    </section>
  );
}
