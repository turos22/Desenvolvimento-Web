// ARRAY CENTRAL DE VAGAS
let vagas = JSON.parse(localStorage.getItem("vagas")) || [
  {
    id: 1,
    titulo: "Desenvolvedor Front-end",
    empresa: "Empresa XYZ",
    empresaId: 1,

    endereco: {
      rua: "",
      numero: "",
      bairro: "",
      cep: "",
      cidade: "",
      estado: ""
    },

    modalidade: "home",
    contrato: "clt",
    deficiencia: "fisica auditiva",

    salario_minimo: 4000,
    salario_maximo: 5500,

    descricao: "Desenvolvimento de interfaces web responsivas e acessíveis utilizando React e TypeScript.",

    escolaridade: "graduacao",

    beneficios: "Vale refeição, Plano de saúde, Horário flexível",

    requisitos: "Experiência com React, TypeScript e consumo de APIs REST.",

    requisitos_opcionais: "Conhecimento em Next.js e testes automatizados.",

    responsabilidades: "Desenvolver interfaces responsivas, corrigir bugs e participar das reuniões do time.",

    data: "2026-03-10",
    status: "ativa"
  },

  {
    id: 2,
    titulo: "Analista de Dados",
    empresa: "Empresa ABC",
    empresaId: 2,

    endereco: {
      rua: "Avenida Paulista",
      numero: "1578",
      bairro: "Bela Vista",
      cep: "01310-200",
      cidade: "São Paulo",
      estado: "SP"
    },

    modalidade: "hibrido",
    contrato: "pj",
    deficiencia: "auditiva",

    salario_minimo: 5500,
    salario_maximo: 7500,

    descricao: "Análise e interpretação de dados utilizando Python e ferramentas de BI.",

    escolaridade: "graduacao",

    beneficios: "Auxílio home office, Plano odontológico, Bônus anual",

    requisitos: "Conhecimento em Python, SQL e Power BI.",

    requisitos_opcionais: "Experiência com Machine Learning.",

    responsabilidades: "Criar dashboards, analisar indicadores e gerar relatórios estratégicos.",

    data: "2025-12-27",
    status: "ativa"
  },

  {
    id: 3,
    titulo: "Analista de Suporte Técnico",
    empresa: "Empresa Tech",
    empresaId: 3,

    endereco: {
      rua: "Rua da Assembleia",
      numero: "100",
      bairro: "Centro",
      cep: "20011-000",
      cidade: "Rio de Janeiro",
      estado: "RJ"
    },

    modalidade: "presencial",
    contrato: "estagio",
    deficiencia: "visual",

    salario_minimo: 1500,
    salario_maximo: 2500,

    descricao: "Responsável por fornecer suporte técnico de primeiro e segundo nível aos usuários internos.",

    escolaridade: "medio",

    beneficios: "Vale transporte, Seguro de vida",

    requisitos: "Conhecimento básico em manutenção de computadores e redes.",

    requisitos_opcionais: "Conhecimento em Linux.",

    responsabilidades: "Atender chamados, configurar equipamentos e auxiliar usuários.",

    data: "2026-02-05",
    status: "pausada"
  },

  {
    id: 4,
    titulo: "Engenheiro de Software",
    empresa: "InovaTech",
    empresaId: 4,

    endereco: {
      rua: "Rua Conceição",
      numero: "233",
      bairro: "Centro",
      cep: "13010-050",
      cidade: "Campinas",
      estado: "SP"
    },

    modalidade: "hibrido",
    contrato: "clt",
    deficiencia: "todas",

    salario_minimo: 8000,
    salario_maximo: 11000,

    descricao: "Desenvolvimento de sistemas escaláveis utilizando Java e arquitetura de microsserviços.",

    escolaridade: "pos",

    beneficios: "Plano de saúde premium, PLR, Gympass",

    requisitos: "Experiência com Java, Spring Boot e microsserviços.",

    requisitos_opcionais: "Experiência com Kubernetes.",

    responsabilidades: "Projetar soluções escaláveis e liderar decisões técnicas.",

    data: "2026-03-28",
    status: "ativa"
  },

  {
    id: 5,
    titulo: "UX/UI Designer",
    empresa: "Creative Labs",
    empresaId: 5,

    endereco: {
      rua: "",
      numero: "",
      bairro: "",
      cep: "",
      cidade: "",
      estado: ""
    },

    modalidade: "home",
    contrato: "pj",
    deficiencia: "fisica",

    salario_minimo: 4000,
    salario_maximo: 6000,

    descricao: "Criação de interfaces e experiências digitais focadas no usuário.",

    escolaridade: "graduacao",

    beneficios: "Horário flexível, Trabalho remoto",

    requisitos: "Conhecimento em Figma e UX Research.",

    requisitos_opcionais: "Experiência com Design System.",

    responsabilidades: "Criar protótipos, fluxos de navegação e layouts acessíveis.",

    data: "2026-01-15",
    status: "ativa"
  },

  {
    id: 6,
    titulo: "Administrador de Redes",
    empresa: "NetSolutions",
    empresaId: 6,

    endereco: {
      rua: "Avenida Afonso Pena",
      numero: "4000",
      bairro: "Funcionários",
      cep: "30130-009",
      cidade: "Belo Horizonte",
      estado: "MG"
    },

    modalidade: "presencial",
    contrato: "clt",
    deficiencia: "auditiva visual",

    salario_minimo: 5000,
    salario_maximo: 7000,

    descricao: "Gerenciamento de redes corporativas, servidores e segurança da informação.",

    escolaridade: "graduacao",

    beneficios: "Vale alimentação, Plano de saúde",

    requisitos: "Conhecimento em redes, firewalls e servidores Windows/Linux.",

    requisitos_opcionais: "Certificação CCNA.",

    responsabilidades: "Monitorar infraestrutura e garantir disponibilidade da rede.",

    data: "2026-02-20",
    status: "pausada"
  },

  {
    id: 7,
    titulo: "Desenvolvedor Back-end",
    empresa: "CodeBase",
    empresaId: 7,

    endereco: {
      rua: "",
      numero: "",
      bairro: "",
      cep: "",
      cidade: "",
      estado: ""
    },

    modalidade: "home",
    contrato: "pj",
    deficiencia: "intelectual",

    salario_minimo: 6000,
    salario_maximo: 9000,

    descricao: "Desenvolvimento de APIs RESTful utilizando Node.js e bancos de dados SQL/NoSQL.",

    escolaridade: "graduacao",

    beneficios: "Auxílio home office, Bônus semestral",

    requisitos: "Experiência com Node.js, Express e bancos SQL.",

    requisitos_opcionais: "Conhecimento em Docker.",

    responsabilidades: "Desenvolver APIs e integrar sistemas.",

    data: "2026-03-05",
    status: "ativa"
  },

  {
    id: 8,
    titulo: "QA Tester",
    empresa: "QualitySoft",
    empresaId: 8,

    endereco: {
      rua: "Avenida Ipiranga",
      numero: "6681",
      bairro: "Partenon",
      cep: "90619-900",
      cidade: "Porto Alegre",
      estado: "RS"
    },

    modalidade: "hibrido",
    contrato: "clt",
    deficiencia: "fisica",

    salario_minimo: 3000,
    salario_maximo: 4500,

    descricao: "Execução de testes manuais e automatizados para garantir a qualidade do software.",

    escolaridade: "graduacao",

    beneficios: "Plano de saúde, Vale refeição",

    requisitos: "Conhecimento em testes manuais e automação.",

    requisitos_opcionais: "Experiência com Cypress.",

    responsabilidades: "Executar testes e registrar falhas.",

    data: "2026-02-10",
    status: "ativa"
  },

  {
    id: 9,
    titulo: "Cientista de Dados",
    empresa: "DataMind",
    empresaId: 9,

    endereco: {
      rua: "",
      numero: "",
      bairro: "",
      cep: "",
      cidade: "",
      estado: ""
    },

    modalidade: "home",
    contrato: "pj",
    deficiencia: "todas",

    salario_minimo: 9000,
    salario_maximo: 13000,

    descricao: "Construção de modelos preditivos e análise avançada de dados.",

    escolaridade: "pos",

    beneficios: "Participação nos lucros, Trabalho remoto",

    requisitos: "Conhecimento avançado em Python e Machine Learning.",

    requisitos_opcionais: "Experiência com IA generativa.",

    responsabilidades: "Criar modelos preditivos e pipelines de dados.",

    data: "2026-03-30",
    status: "ativa"
  },

  {
    id: 10,
    titulo: "Estagiário em TI",
    empresa: "StartTech",
    empresaId: 1,

    endereco: {
      rua: "Rua Barão do Rio Branco",
      numero: "550",
      bairro: "Centro",
      cep: "19010-000",
      cidade: "Presidente Prudente",
      estado: "SP"
    },

    modalidade: "presencial",
    contrato: "estagio",
    deficiencia: "visual auditiva",

    salario_minimo: 1200,
    salario_maximo: 1800,

    descricao: "Apoio em atividades de suporte técnico e desenvolvimento interno.",

    escolaridade: "medio",

    beneficios: "Vale transporte, Seguro de vida",

    requisitos: "Conhecimento básico em informática.",

    requisitos_opcionais: "Conhecimento em HTML e CSS.",

    responsabilidades: "Auxiliar no suporte técnico e manutenção de sistemas.",

    data: "2026-03-18",
    status: "pausada"
  }
];