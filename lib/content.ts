// Conteúdo editorial. A copy técnica do Programa de Emagrecimento e do
// Clube L'Amour é a fornecida pela clínica — não reescrever, só diagramar.

export type Service = {
  slug: string;
  name: string;
  /** Nome usado na mensagem do WhatsApp. */
  bookingName: string;
  /** Nome curto para o botão de agendamento. */
  ctaName: string;
  detail: string;
  summary: string;
  intro: string;
  points: string[];
  /** Letra do placeholder tipográfico enquanto não há foto do procedimento. */
  initial: string;
  image?: "heroRetrato";
};

// Textos de interface (intro/points) são provisórios e descritivos, sem
// promessa de resultado — validar com a clínica antes de publicar.
export const services: Service[] = [
  {
    slug: "estetica",
    ctaName: "estética",
    name: "Estética avançada",
    bookingName: "estética avançada (facial e corporal)",
    detail: "Facial e corporal",
    summary: "Protocolos para pele e contorno corporal, definidos a partir de uma avaliação individual.",
    intro:
      "Tratamentos faciais e corporais planejados a partir de uma avaliação da pele, do corpo e da rotina de cada paciente. É a avaliação que define quais procedimentos fazem sentido — e em que momento.",
    points: [
      "Avaliação individual da pele e do contorno corporal",
      "Protocolo definido em conjunto, etapa por etapa",
      "Reavaliação ao longo do tratamento",
    ],
    initial: "E",
    image: "heroRetrato",
  },
  {
    slug: "ozonioterapia",
    ctaName: "ozonioterapia",
    name: "Ozonioterapia",
    bookingName: "ozonioterapia",
    detail: "Terapia complementar",
    summary: "Aplicações de ozônio integradas ao plano de cuidado, quando indicadas.",
    // TODO(compliance): confirmar o(a) profissional habilitado(a) e quais
    // indicações podem ser anunciadas (Lei 14.648/2023 e normas do conselho).
    intro:
      "O ozônio medicinal é utilizado como terapia complementar, integrada ao plano de cuidado. A indicação, a técnica de aplicação e a frequência das sessões são definidas em avaliação.",
    points: [
      "Indicação definida em avaliação",
      "Aplicação integrada a outros tratamentos, quando indicada",
      "Acompanhamento da resposta a cada sessão",
    ],
    initial: "O",
  },
  {
    slug: "harmonizacao-orofacial",
    ctaName: "HOF",
    name: "Harmonização Orofacial",
    bookingName: "harmonização orofacial",
    detail: "HOF",
    // TODO(compliance): informar nome e CRO do(a) profissional responsável pela
    // HOF — exigido pelo CFO em toda divulgação do procedimento.
    summary: "Planejamento facial orientado por proporção e naturalidade.",
    intro:
      "Harmonização orofacial com planejamento: proporção, equilíbrio e naturalidade vêm antes de qualquer procedimento. Cada indicação parte da análise do rosto como um todo.",
    points: [
      "Análise facial completa",
      "Planejamento dos procedimentos e da sequência",
      "Retornos de acompanhamento",
    ],
    initial: "H",
  },
  {
    slug: "massoterapia",
    ctaName: "massoterapia",
    name: "Massoterapia",
    bookingName: "massoterapia",
    detail: "Inclusive pós-cirúrgica",
    summary: "Massoterapia terapêutica e acompanhamento no pós-operatório.",
    intro:
      "Massoterapia terapêutica e acompanhamento pós-cirúrgico. No pós-operatório, as sessões acompanham cada fase da recuperação e seguem a orientação da equipe cirúrgica.",
    points: [
      "Massoterapia terapêutica",
      "Protocolos para o pós-operatório",
      "Sessões ajustadas a cada fase da recuperação",
    ],
    initial: "M",
  },
  {
    slug: "podologia",
    ctaName: "podologia",
    name: "Podologia",
    bookingName: "podologia",
    detail: "Tratamento integral",
    summary: "Cuidado completo com a saúde dos pés, do diagnóstico ao tratamento.",
    intro:
      "Podologia com tratamento integral: avaliação, cuidado e acompanhamento da saúde dos pés, do primeiro atendimento à manutenção.",
    points: [
      "Avaliação podológica",
      "Tratamento conforme a necessidade de cada caso",
      "Acompanhamento e manutenção",
    ],
    initial: "P",
  },
];

export const clube = {
  headline: "Um plano pensado para a sua pele, não uma lista de procedimentos.",
  body:
    "No Clube L'amour, tudo começa com uma avaliação completa para entender sua pele, sua rotina e o que você deseja alcançar. A partir disso, é montado um protocolo personalizado para acompanhar você ao longo do ano.",
  steps: [
    { title: "Avaliação completa", note: "Sua pele, sua rotina e o que você deseja alcançar." },
    { title: "Protocolo personalizado de 1 ano", note: "Montado a partir da avaliação, para acompanhar você ao longo do ano." },
    { title: "Acompanhamento contínuo", note: "Do início ao fim do protocolo." },
    { title: "25% de desconto", note: "No valor total do protocolo.", emphasis: "25%" },
  ] as { title: string; note: string; emphasis?: string }[],
} as const;

// Sobre — construído só com fatos confirmados (serviços, endereço, avaliação
// antes do protocolo, atendimento com hora marcada).
// TODO(conteudo): substituir/complementar com a história real da clínica
// (ano de fundação, fundadora, trajetória) quando o cliente enviar.
export const sobre = {
  story: [
    "No Centro de Lages, a L'Amour reúne estética avançada, ozonioterapia, harmonização orofacial, massoterapia e podologia em um só endereço.",
    "Aqui, nenhum protocolo começa antes da avaliação. É ela que define o que fazer, em que ordem e com que frequência.",
    "Por isso o atendimento é sempre com hora marcada: o tempo de cada consulta é reservado para uma pessoa só.",
  ],
  principles: [
    { title: "Avaliação antes do protocolo", note: "Cada plano de cuidado parte de uma conversa e de uma avaliação individual." },
    { title: "Tempo reservado", note: "Atendimento somente com agendamento prévio." },
    { title: "Acompanhamento contínuo", note: "O cuidado segue depois da primeira sessão, com reavaliações ao longo do caminho." },
  ],
};

export const programa = {
  hook: { before: "Nem toda", accent: "obesidade", after: "é alimentação." },
  hookNote: "Saber disso muda o jogo nesta luta.",
  metabolismo:
    "Nosso peso é influenciado pela atividade metabólica, a forma como o organismo utiliza, armazena e gasta energia. Isso envolve fatores como taxa metabólica basal, quantidade de massa muscular, termogênese, atividade mitocondrial, regulação hormonal, sono e adaptação metabólica. Durante o emagrecimento, inclusive, o organismo pode reduzir o gasto energético e aumentar os sinais de fome, tornando a manutenção da perda de peso mais desafiadora. Por isso, duas pessoas com alimentação semelhante podem apresentar respostas completamente diferentes.",
  fatores: [
    "Taxa metabólica basal",
    "Quantidade de massa muscular",
    "Termogênese",
    "Atividade mitocondrial",
    "Regulação hormonal",
    "Sono",
    "Adaptação metabólica",
  ],
  doenca: {
    statement: "Obesidade é uma doença crônica, complexa e multifatorial.",
    body:
      "O tratamento precisa olhar além das calorias e entender o metabolismo, a composição corporal, o comportamento alimentar e a saúde metabólica de cada paciente.",
    goalA: "O objetivo não é simplesmente perder peso.",
    goalB:
      "É construir um metabolismo e uma composição corporal mais favoráveis à saúde e à manutenção dos resultados.",
  },
  pilares: [
    {
      text: "Consulta médica detalhada e individualizada, com avaliação das doenças associadas",
      detail: "(Resistência à Insulina, SOP, Hipotireoidismo, Obesidade, Diabetes, entre outras).",
    },
    { text: "Avaliação dos hábitos alimentares, estilo de vida e rotina." },
    { text: "Avaliação da prática de atividade física." },
    { text: "Bioimpedância para análise da composição corporal." },
    {
      text: "Investigação de deficiências vitamínicas e minerais e correção com medicamentos injetáveis ou não.",
    },
    { text: "Prescrição de um plano alimentar individualizado." },
    { text: "Estratégia para preservação e ganho de massa muscular." },
    { text: "Prescrição de suplementação quando indicada." },
    { text: "Uso de medicamentos para emagrecimento quando houver indicação médica." },
    {
      text: "Uso de medicamentos e terapias injetáveis para potencializar os resultados, aumentando metabolismo e atividade mitocondrial, queima de gordura, quando indicados.",
    },
    {
      // TODO(compliance): validar a expressão "derreter as gorduras" com a
      // clínica/jurídico — pode ser lida como promessa de resultado (CFM).
      // Mantida literal até confirmação.
      text: "Uso da medicina estética com esvaziadores de gordura para derreter as gorduras corporais e esculpir o corpo, potencializando o emagrecimento.",
    },
    { text: "Estratégias para controle da fome, saciedade e compulsão alimentar." },
    { text: "Tratamento da fadiga e melhora da disposição quando necessário." },
  ] as { text: string; detail?: string }[],
  closing: {
    label: "Resumindo",
    headline: ["Entender o motivo", "é o primeiro passo."],
    sub: "O segundo é ter um protocolo de emagrecimento feito para você.",
  },
  disclaimer:
    "O tratamento é individualizado e depende de avaliação médica. Medicamentos, terapias injetáveis e suplementação são prescritos somente quando indicados. Resultados variam de pessoa para pessoa.",
};
