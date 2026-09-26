import { GrupoForm } from "@/components/clube/GrupoForm";
import { RevealText } from "@/components/motion/RevealText";

export function ClubeGrupo() {
  return (
    <section id="grupo" data-tone="light" className="scroll-mt-10 bg-linho py-28 lg:py-40">
      <div className="shell grid-12 gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <RevealText className="type-h2 text-navy-950">
            Grupo do Clube <em>no WhatsApp.</em>
          </RevealText>
          <p className="mt-8 max-w-md type-body text-pedra-escuro">
            Para manter o grupo seguro, o convite só é liberado depois de um cadastro rápido — e cada entrada é
            confirmada pela equipe da clínica.
          </p>
          <ul className="mt-8 space-y-2 type-small text-pedra-escuro">
            <li>— Seus dados ficam guardados com segurança e nunca são vendidos ou usados para publicidade.</li>
            <li>— Nada de dados de saúde: só nome, WhatsApp e cidade.</li>
            <li>— Você pode pedir a exclusão quando quiser.</li>
          </ul>
        </div>
        <div className="relative col-span-12 lg:col-span-6 lg:col-start-7">
          <GrupoForm />
        </div>
      </div>
    </section>
  );
}
