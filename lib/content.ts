// Conteúdo editorial. A copy técnica do Programa de Emagrecimento e do
// Clube L'Amour é a fornecida pela clínica — não reescrever, só diagramar.

export const services = [
  {
    slug: "estetica",
    name: "Estética avançada",
    detail: "Facial e corporal",
    summary: "Protocolos para pele e contorno corporal, definidos a partir de uma avaliação individual.",
  },
  {
    slug: "ozonioterapia",
    name: "Ozonioterapia",
    detail: "Terapia complementar",
    summary: "Aplicações de ozônio integradas ao plano de cuidado, quando indicadas.",
  },
  {
    slug: "harmonizacao-orofacial",
    name: "Harmonização Orofacial",
    detail: "HOF",
    // TODO(compliance): informar nome e CRO do(a) profissional responsável pela
    // HOF — exigido pelo CFO em toda divulgação do procedimento.
    summary: "Planejamento facial orientado por proporção e naturalidade.",
  },
  {
    slug: "massoterapia",
    name: "Massoterapia",
    detail: "Inclusive pós-cirúrgica",
    summary: "Massoterapia terapêutica e acompanhamento no pós-operatório.",
  },
  {
    slug: "podologia",
    name: "Podologia",
    detail: "Tratamento integral",
    summary: "Cuidado completo com a saúde dos pés, do diagnóstico ao tratamento.",
  },
] as const;

export const clube = {
  headline: "Um plano pensado para a sua pele, não uma lista de procedimentos.",
  body:
    "No Clube L'amour, tudo começa com uma avaliação completa para entender sua pele, sua rotina e o que você deseja alcançar. A partir disso, é montado um protocolo personalizado para acompanhar você ao longo do ano.",
  steps: [
    { title: "Avaliação completa", note: "Sua pele, sua rotina e o que você deseja alcançar." },
    { title: "Protocolo anual", note: "Personalizado, para acompanhar você ao longo do ano." },
    { title: "25% de desconto", note: "No valor total do protocolo." },
    { title: "Acompanhamento contínuo", note: "Ao longo de todo o ano." },
  ],
} as const;

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
