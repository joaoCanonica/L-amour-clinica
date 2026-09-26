import type { ReactNode } from "react";
import { PrivacyPreferencesButton } from "@/components/consent/ConsentBanner";
import { pageMetadata } from "@/lib/seo";
import { legal, site, whatsappLink } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Política de privacidade",
  description: `Como a ${site.shortName} trata dados pessoais no site: o que é coletado, para quê, por quanto tempo e como exercer seus direitos (LGPD).`,
  path: "/privacidade",
});

const updated = new Date(`${legal.policyVersion}T12:00:00`).toLocaleDateString("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-navy-950/10 py-10">
      <h2 className="type-h3 text-navy-950">{title}</h2>
      <div className="mt-5 space-y-4 type-body text-navy-950/85 [&_li]:pl-5 [&_li]:-indent-5 [&_strong]:font-medium [&_strong]:text-navy-950">
        {children}
      </div>
    </section>
  );
}

// TODO(compliance): revisar com o jurídico da clínica. Preencher CNPJ e e-mail
// do encarregado em lib/site.ts (legal) e confirmar o prazo de guarda.
export default function PrivacidadePage() {
  return (
    <div data-tone="light" className="bg-linho">
      <div className="shell pb-28 pt-[140px] lg:pb-40 lg:pt-[200px]">
        <h1 className="max-w-[12ch] type-display text-navy-950">Política de privacidade</h1>
        <p className="mt-8 type-small text-pedra-escuro">Atualizada em {updated}.</p>

        <div className="mt-16 max-w-2xl lg:ml-[33.33%]">
          <p className="type-lead text-navy-950">
            Este site coleta o mínimo possível. Não usamos cookies de publicidade, de métricas ou de rastreamento, e
            nunca pedimos dados de saúde por aqui.
          </p>

          <div className="mt-14">
            <Section title="Quem é responsável pelos dados">
              <p>
                <strong>{legal.controller}</strong>
                {legal.cnpj ? `, CNPJ ${legal.cnpj}` : ""}, {site.address.street}, {site.address.district},{" "}
                {site.address.city} – {site.address.state}, {site.address.postalCode}.
              </p>
            </Section>

            <Section title="Quais dados coletamos">
              <p>
                <strong>Cadastro para o grupo do Clube.</strong> Nome, número de WhatsApp e cidade, a data e a hora em
                que você concordou com esta política e a versão dela. Também guardamos um código gerado a partir do
                endereço IP (hash irreversível), usado só para limitar envios em excesso — o IP em si não é guardado.
              </p>
              <p>
                <strong>Armazenamento no seu navegador.</strong> Guardamos no seu próprio aparelho apenas a sua escolha
                sobre o mapa e se a introdução do site já foi exibida nesta visita. Esses dados não são enviados para
                nós.
              </p>
              <p>
                <strong>Mapa do Google.</strong> Na página de contato, o mapa só é carregado se você permitir. A partir
                daí, o Google pode coletar dados de navegação conforme a política de privacidade do próprio Google.
              </p>
              <p>
                <strong>WhatsApp.</strong> Os botões de agendamento abrem uma conversa no WhatsApp. O que for trocado
                nessa conversa segue também a política do WhatsApp e é usado pela clínica apenas para atendimento e
                agendamento.
              </p>
              <p>
                <strong>Registros técnicos.</strong> O provedor de hospedagem mantém registros de acesso (como data,
                hora e endereço IP) por motivos de segurança.
              </p>
            </Section>

            <Section title="Para que usamos e com qual base legal">
              <ul className="space-y-2">
                <li>— Liberar o seu acesso ao grupo do Clube: consentimento (LGPD, art. 7º, I).</li>
                <li>
                  — Responder e agendar pelo WhatsApp: procedimentos preliminares a pedido do titular (art. 7º, V).
                </li>
                <li>— Segurança do site e prevenção de abusos: legítimo interesse (art. 7º, IX).</li>
              </ul>
              <p>Não vendemos dados e não os usamos para publicidade.</p>
            </Section>

            <Section title="Com quem os dados são compartilhados">
              <p>
                Apenas com os fornecedores que operam o site em nosso nome: a Vercel (hospedagem) e a Supabase (banco
                de dados onde ficam os cadastros do grupo, com servidores nos Estados Unidos). Esses serviços seguem
                obrigações contratuais de proteção de dados.
              </p>
            </Section>

            <Section title="Por quanto tempo guardamos">
              <p>
                Os dados do cadastro do grupo são excluídos automaticamente 12 meses após o cadastro — ou antes, se
                você pedir.
              </p>
            </Section>

            <Section title="Seus direitos">
              <p>
                Pela LGPD (art. 18), você pode pedir a qualquer momento: confirmação de que tratamos seus dados, acesso,
                correção, anonimização ou exclusão, portabilidade, informação sobre com quem compartilhamos e a revogação
                do consentimento. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
              </p>
              <p>
                Para exercer esses direitos, fale com a clínica pelo{" "}
                <a href={whatsappLink("Olá! Gostaria de fazer uma solicitação sobre meus dados pessoais.")} target="_blank" rel="noopener noreferrer" className="link-quiet">
                  WhatsApp {site.phones.whatsapp.display}
                </a>
                {legal.privacyEmail ? (
                  <>
                    {" "}
                    ou pelo e-mail{" "}
                    <a href={`mailto:${legal.privacyEmail}`} className="link-quiet">
                      {legal.privacyEmail}
                    </a>
                  </>
                ) : null}
                .
              </p>
            </Section>

            <Section title="Cookies e conteúdo de terceiros">
              <p>
                O site não grava cookies próprios. O único conteúdo de terceiros que pode gravar cookies é o mapa do
                Google, e ele só é carregado com a sua permissão. Você pode mudar essa escolha quando quiser:
              </p>
              <PrivacyPreferencesButton className="inline-flex h-11 items-center rounded-full border border-navy-950/30 px-5 text-[0.875rem] font-medium text-navy-950 transition-colors hover:border-navy-950 hover:bg-navy-950 hover:text-linho" />
            </Section>

            <Section title="Alterações">
              <p>
                Se esta política mudar, a data acima é atualizada e, quando a mudança afetar as suas escolhas, pedimos
                a sua confirmação de novo.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
