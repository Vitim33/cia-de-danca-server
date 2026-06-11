module.exports = {
  championships: [
    {
      id: "main",
      title: "Campeonato Nacional de Danca",
      year: "2026",
      status: "Em andamento",
      currentRound: "Quartas de Final",
      administratorName: "Carlos Almeida",
      administratorEmail: "admin@dancechamp.com",
      evaluatorEmails: ["juliana.avaliador@email.com"],
      participantEmails: ["beatriz.dance@email.com"],
    },
  ],
  performance: {
    groupName: "Cia. Dance Power",
    style: "Hip Hop",
    category: "Adulto",
    remainingTime: "04:35",
  },
  groups: [
    {
      name: "Cia. Dance Power",
      score: 0,
      category: "Adulto",
      avatarColor: 0xFFE0A929,
      participantEmails: ["beatriz.dance@email.com"],
    },
    {
      name: "Movimento Urbano",
      score: 0,
      category: "Adulto",
      avatarColor: 0xFFB5BDC8,
      participantEmails: ["beatriz.dance@email.com"],
    },
    { name: "Soul Dance", score: 0, category: "Junior", avatarColor: 0xFFC97931 },
    { name: "New Wave Crew", score: 0, category: "Adulto", avatarColor: 0xFF7B8CFF },
    { name: "Step by Step", score: 0, category: "Infantil", avatarColor: 0xFFDD6ACB },
    { name: "Impacto Dance", score: 0, category: "Junior", avatarColor: 0xFF68D2B7 },
    { name: "Fusion Crew", score: 0, category: "Adulto", avatarColor: 0xFFFF8764 },
    { name: "Pure Motion", score: 0, category: "Infantil", avatarColor: 0xFFA88BFF },
  ],
  profiles: [
    {
      name: "Usuario",
      email: "usuario@email.com",
      role: "user",
      photoColor: 0xFFE6C1AF,
      stats: [
        { label: "Competicoes", value: "0" },
        { label: "Inscricoes", value: "0" },
        { label: "Perfil", value: "Ativo" },
      ],
    },
    {
      name: "Juliana Souza",
      email: "juliana.avaliador@email.com",
      role: "evaluator",
      photoColor: 0xFFE6C1AF,
      stats: [
        { label: "Competicoes", value: "12" },
        { label: "Avaliacoes", value: "248" },
        { label: "Media Geral", value: "9.2" },
      ],
    },
    {
      name: "Carlos Almeida",
      email: "admin@dancechamp.com",
      role: "admin",
      photoColor: 0xFFE0A929,
      stats: [
        { label: "Competicoes", value: "18" },
        { label: "Usuarios", value: "256" },
        { label: "Relatorios", value: "32" },
      ],
    },
    {
      name: "Beatriz Lima",
      email: "beatriz.dance@email.com",
      role: "professional",
      photoColor: 0xFF5D8DFF,
      stats: [
        { label: "Competicoes", value: "15" },
        { label: "Apresentacoes", value: "34" },
        { label: "Media Geral", value: "8.7" },
      ],
    },
  ],
};
