import { Canais } from "@/components/contato/Canais";
import { MapaClinica } from "@/components/contato/MapaClinica";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contato e agendamento",
  description: `Agende pelo WhatsApp ${site.phones.whatsapp.display} ou telefone ${site.phones.landline.display}. ${site.address.street}, ${site.address.district}, ${site.address.city}/${site.address.state}. Atendimento somente com agendamento prévio.`,
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <section data-tone="light" className="bg-linho">
      <div className="shell pb-28 pt-[92px] lg:pb-40 lg:pt-[116px]">
        <Reveal
          on="mount"
          delay={0.2}
          className="flex items-center justify-between gap-6 border-b hairline pb-4 type-label text-pedra-escuro"
        >
          <span>Contato e agendamento</span>
          <span className="hidden sm:inline">Lages — SC</span>
        </Reveal>

        <RevealText as="h1" on="mount" delay={0.15} className="mt-14 max-w-[17ch] type-display text-navy-950 lg:mt-20">
          Atendimento somente com <em>agendamento prévio.</em>
        </RevealText>

        <div className="mt-20 grid-12 gap-y-16 lg:mt-28">
          <div className="col-span-12 lg:col-span-5">
            <Canais />
          </div>
          <Reveal on="mount" delay={0.6} className="col-span-12 lg:col-span-6 lg:col-start-7">
            <MapaClinica className="h-full" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
