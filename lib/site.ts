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
  },
  phones: {
    whatsapp: { display: "(49) 99959-7822", e164: "5549999597822" },
    landline: { display: "(49) 3021-3611", e164: "554930213611" },
  },
  schedulingNote: "Atendimento somente com agendamento prévio",
} as const;

export const doctor = {
  name: "Dra. Letícia Piccinin",
  registrations: ["CRM-SC 29.786", "CRM-SP 288.104", "CRM-PR 65.462"],
  // TODO(compliance): confirmar se a Dra. Letícia possui RQE. Se houver,
  // incluir aqui (ex.: "RQE 00.000") — o CFM exige RQE ao anunciar
  // especialidade. Sem RQE, não usar termos como "especialista" no site.
  rqe: null as string | null,
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
  clube: "Olá! Gostaria de saber mais sobre o Clube L'Amour.",
} as const;

export const nav = [
  { href: "/servicos", label: "Serviços" },
  { href: "/programa-emagrecimento", label: "Programa de Emagrecimento" },
  { href: "/clube-lamour", label: "Clube L'Amour" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
] as const;
