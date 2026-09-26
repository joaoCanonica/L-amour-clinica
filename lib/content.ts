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

// Textos descritivos, sem promessa de resultado. A linguagem vem do que a
// própria clínica diz nos vídeos (avaliação, protocolo, constância).
export const services: Service[] = [
  {
    slug: "estetica",
    ctaName: "estética",
    name: "Estética avançada",
    bookingName: "estética avançada (facial e corporal)",
    detail: "Facial e corporal",
    summary: "Protocolos para pele e contorno corporal, definidos a partir de uma avaliação individual.",
    intro: "Protocolos faciais e corporais pensados para a sua pele — não uma lista de procedimentos. Limpeza, estímulo de colágeno, hidratação profunda e o que mais a sua pele pedir, definidos na avaliação e organizados no ritmo certo.",
    points: ["Avaliação da pele de perto, da rotina e do que você quer alcançar", "Protocolo com os procedimentos que fazem sentido para o seu caso", "Acompanhamento e ajustes ao longo do tratamento"],
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
    intro: "Terapia complementar reconhecida no Brasil pela Lei nº 14.648/2023. Na L'Amour, as aplicações — inclusive por via retal — são feitas por profissional habilitado, em ambiente reservado e sempre a partir de uma avaliação.",
    points: ["Indicação e objetivos definidos em avaliação", "Aplicação com conforto e privacidade", "Integração com os demais tratamentos, quando indicada"],
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
    intro: "Harmonização orofacial com planejamento: proporção, equilíbrio e naturalidade vêm antes de qualquer procedimento. Cada indicação parte da análise do rosto como um todo.",
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
    intro: "Massoterapia terapêutica e cuidado no pós-operatório, com sessões que acompanham cada fase da recuperação e seguem a orientação da sua equipe cirúrgica.",
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
    intro: "Podologia com tratamento integral: avaliação, cuidado e acompanhamento da saúde dos pés — do primeiro atendimento à manutenção.",
    points: [
      "Avaliação podológica",
      "Tratamento conforme a necessidade de cada caso",
      "Acompanhamento e manutenção",
    ],
    initial: "P",
  },
];

// Falas reais, transcritas das legendas dos vídeos da clínica.
export const quotes = {
  fundadoraConversa: "É essa conversa que define tudo.",
  fundadoraConstancia:
    "A pele não responde a procedimentos isolados. Responde à constância, à repetição no ritmo certo.",
  fundadoraAvulsa: "Os mesmos cuidados que você faria de forma avulsa, pagando um quarto a menos.",
  fundadoraSozinha: "E você não caminha sozinha: durante o ano, eu acompanho a sua evolução.",
  pacienteNetflix: "Eu fiz as contas com o que eu gasto com a minha pele e resolvi assinar o Clube L'Amour. Assinar mesmo, tipo Netflix.",
  pacienteCorreria:
    "Todo ano eu já fazia limpeza de pele, microagulhamento e hidratação — só que sempre na correria, marcando em cima de algum evento, pagando o valor cheio.",
  pacienteProtocolo: "Em vez de empurrar procedimento, um protocolo que faz sentido para mim a longo prazo.",
  draProtocolo: "Aqui, o protocolo vem depois da avaliação. Nunca antes.",
  draEsforco: "Se você já começou mil dietas e sempre volta a engordar, o seu problema não é falta de esforço.",
};

// Ozônio retal — adaptado do post da clínica "3 mitos sobre o ozônio retal".
// A lista de benefícios do post ("elimina toxinas", "equilíbrio hormonal"…)
// NÃO foi publicada: são alegações terapêuticas sem respaldo que a
// publicidade em saúde não permite. TODO(compliance): validar este texto.
export const mitosOzonio = {
  quote: "É hora de dissipar os mistérios em torno do ozônio retal. Esqueça os estigmas e deixe o preconceito para trás.",
  items: [
    {
      myth: "Não serve para nada.",
      answer:
        "O ozônio é reconhecido no Brasil como tratamento complementar (Lei nº 14.648/2023). Por via retal, é usado com objetivos definidos em avaliação, de acordo com cada caso — sempre integrado ao plano de cuidado.",
    },
    {
      myth: "É desconfortável e constrangedor.",
      answer:
        "A aplicação é feita por profissional, em ambiente reservado, mantendo o conforto e a privacidade do paciente do início ao fim.",
    },
    {
      myth: "É perigoso e arriscado.",
      answer:
        "Realizada por profissional qualificado, com equipamento regularizado e indicação definida em avaliação, a aplicação segue protocolos de segurança.",
    },
  ],
};

export const clube = {
  headline: "Um plano pensado para a sua pele, não uma lista de procedimentos.",
  body:
    "No Clube L'Amour, tudo começa com uma avaliação completa para entender sua pele, sua rotina e o que você deseja alcançar. A partir disso, é montado um protocolo personalizado para acompanhar você ao longo do ano.",
  // Etapas na ordem em que a fundadora explica o Clube (vídeo).
  steps: [
    {
      title: "Avaliação",
      note: "Você vem até a clínica: a pele é vista de perto e a conversa passa pela sua rotina, pelo que você já fez e pelo que quer alcançar.",
    },
    {
      title: "Protocolo do ano",
      note: "Os procedimentos que fazem sentido para o seu caso — limpeza, estímulo de colágeno, hidratação profunda — organizados ao longo de doze meses.",
    },
    {
      title: "25% de desconto",
      note: "Com o protocolo fechado, entra um desconto de 25% sobre o valor total. Só depois o valor vira mensalidade, em formato de assinatura.",
      emphasis: "25%",
    },
    {
      title: "Acompanhamento",
      note: "Consulta marcada, lembrete na data certa e um protocolo que se ajusta se a sua pele pedir — do início ao fim.",
    },
  ] as { title: string; note: string; emphasis?: string }[],
};

// Sobre — escrito a partir do que a própria clínica diz nos vídeos (avaliação
// antes do protocolo, constância, acompanhamento) e dos fatos confirmados.
// TODO(conteudo): acrescentar a história real (ano de fundação, trajetória)
// quando o cliente enviar.
export const sobre = {
  story: [
    "Na L'Amour, a pele não é tratada com procedimentos isolados. É acompanhada com constância, no ritmo certo.",
    "Tudo começa na avaliação: a pele vista de perto, a rotina, o que já foi feito e o que se quer alcançar. É essa conversa que define o protocolo.",
    "No Centro de Lages, a clínica reúne estética avançada, ozonioterapia, harmonização orofacial, massoterapia e podologia — sempre com hora marcada.",
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
