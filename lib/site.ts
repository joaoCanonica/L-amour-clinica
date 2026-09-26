export const site = {
  name: "L'Amour Clínica de Estética e Ozonioterapia",
  shortName: "L'Amour",
  descriptor: "Clínica de Estética e Ozonioterapia",
  taglines: {
    primary: "Beleza atemporal. Cuidado singular.",
    secondary: "Cuidado pensado para você.",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lamourclinica.com.br",
  address: {
    street: "R. Prof. Teobaldo Delwing, 359",
    district: "Centro",
    city: "Lages",
    state: "SC",
    postalCode: "88502-040",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=R.+Prof.+Teobaldo+Delwing,+359,+Centro,+Lages+-+SC,+88502-040",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=R.+Prof.+Teobaldo+Delwing,+359,+Centro,+Lages+-+SC,+88502-040",
    embedUrl:
      "https://maps.google.com/maps?q=R.+Prof.+Teobaldo+Delwing,+359,+Centro,+Lages+-+SC,+88502-040&z=16&hl=pt-BR&output=embed",
  },
  phones: {
    whatsapp: { display: "(49) 99959-7822", e164: "5549999597822" },
    landline: { display: "(49) 3021-3611", e164: "554930213611" },
  },
  schedulingNote: "Atendimento somente com agendamento prévio",
  // TODO(conteudo): horários de atendimento não informados — incluir quando o cliente enviar.
  hours: null as string | null,
} as const;

export const doctor = {
  name: "Dra. Letícia Piccinin",
  role: "Médica, palestrante e professora",
  tagline: "Do emagrecimento à escultura corporal: uma transformação completa.",
  // Registros informados pela clínica em 26/09/2026 (SC e SP). O CRM-PR
  // 65.462, citado no briefing inicial, foi retirado — confirmar se segue ativo.
  registrations: ["CRM-SC 29.786", "CRM-SP 288.104"],
  // TODO(compliance): confirmar se a Dra. Letícia possui RQE. Se houver,
  // incluir aqui (ex.: "RQE 00.000") — o CFM exige RQE ao anunciar
  // especialidade. Sem RQE, não usar termos como "especialista" no site.
  rqe: null as string | null,
};

// Fundadora da clínica. As legendas dos vídeos dizem "Roseni"; o briefing
// cita "Roseli" e "Rosane". TODO(conteudo): confirmar o nome (e a profissão +
// registro no conselho, ex.: COREN, se for anunciada) antes de preencher.
export const founder = {
  name: null as string | null,
  role: "Fundadora da L'Amour",
};

export const founderLabel = () => founder.name ?? founder.role;

// Controladora dos dados pessoais (LGPD). TODO(compliance): preencher razão
// social e CNPJ, e o contato do encarregado (e-mail) antes de publicar.
export const legal = {
  controller: "L'Amour Clínica de Estética e Ozonioterapia",
  cnpj: null as string | null,
  privacyEmail: null as string | null,
  policyVersion: "2026-09-26",
};

export function doctorCredentials(separator = " · ") {
  return [...doctor.registrations, ...(doctor.rqe ? [doctor.rqe] : [])].join(separator);
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.phones.whatsapp.e164}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const whatsappMessages = {
  default: "Olá! Gostaria de agendar uma avaliação na L'Amour.",
  programa:
    "Olá! Gostaria de agendar uma consulta com a Dra. Letícia sobre o Programa de Emagrecimento.",
  clube: "Olá! Quero agendar minha avaliação para o Clube L'Amour.",
  ozonio: "Olá! Gostaria de agendar uma avaliação de ozonioterapia na L'Amour.",
} as const;

export const nav = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/programa-emagrecimento", label: "Programa de Emagrecimento" },
  { href: "/clube-lamour", label: "Clube L'Amour" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
] as const;

export const legalNav = [{ href: "/privacidade", label: "Política de privacidade" }] as const;
