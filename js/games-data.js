/**
 * ==============================================================================
 * LUMINA PLAY - BANCO DE DADOS DE GAMES, JOGOS EDUCACIONAIS & APLICAÇÕES
 * ==============================================================================
 * Para adicionar um novo jogo ou aplicação ao seu portal, basta adicionar um novo
 * objeto no array CATALOGO_JOGOS_E_APPS abaixo.
 *
 * Campos suportados:
 * - id: Identificador único em minúsculas (sem espaços)
 * - titulo: Nome principal do jogo ou aplicação
 * - subtitulo: Slogan ou gênero explicativo
 * - categoria: 'jogos' | 'educacional' | 'aplicativos' | 'utilitarios'
 * - urlDestino: Link de acesso direto para o usuário jogar/abrir
 * - imagemCapa: Caminho relativo ou URL da capa (formato 16:9 recomendado)
 * - videoHoverUrl: (Opcional) Link de vídeo .mp4/.webm para rodar no hover
 * - temaAnimacao: 'davi' | 'exodo' | 'puzzle' | 'leitura' | 'devocional' | 'navio' | 'arca'
 * - avaliacao: Nota de 1.0 a 5.0
 * - avaliacoesCount: Quantidade de avaliações (ex: '2.4k')
 * - faixaEtaria: 'Livre' | '+10' | '+12'
 * - plataformas: Array de plataformas compatíveis (ex: ['Web', 'Android', 'PC'])
 * - botaoTexto: Texto de ação (ex: 'Jogar Agora', 'Abrir App')
 * - destaqueCarrossel: true para aparecer no carrossel de topo
 * - badgeEspecial: 'Destaque da Semana' | 'Novo' | 'Mais Jogado' | 'Atualizado'
 * - temaDestaque: Texto indicando o tema, universo ou especialidade do projeto
 * - recursos: Lista de diferenciais do jogo/app
 * - descricao: Resumo curto exibido no card
 * - descricaoLonga: Sinopse completa exibida no modal
 * - tags: Lista de palavras-chave para busca
 * ==============================================================================
 */

const CATALOGO_JOGOS_E_APPS = [
  {
    id: 'cronicas-de-davi',
    titulo: 'Crônicas de Davi: Vale de Elá',
    subtitulo: 'Ação & Aventura em 3D',
    categoria: 'jogos',
    urlDestino: '#catalogoCompleto',
    imagemCapa: 'assets/images/cronicas-de-davi.jpg',
    videoHoverUrl: '', // Deixe vazio para usar a simulação visual 60fps nativa
    temaAnimacao: 'davi',
    avaliacao: '4.9',
    avaliacoesCount: '2.4k',
    faixaEtaria: 'Livre',
    plataformas: ['Web', 'Android', 'PC'],
    botaoTexto: 'Jogar Agora',
    destaqueCarrossel: true,
    badgeEspecial: 'Destaque da Semana',
    temaDestaque: 'Ação & Aventura 3D • Vale de Elá',
    recursos: [
      'Batalha tática e mira de precisão com a funda de pastor',
      'Cenários históricos do Vale de Elá recriados em 3D',
      'Desafios de coragem, reflexos rápidos e progressão de fases',
      'Trilha sonora épica orquestrada e efeitos imersivos'
    ],
    descricao: 'Viva a jornada épica do jovem pastor de Belém até o confronto histórico contra o gigante Golias. Desafios de estratégia, precisão com a funda radiante e fases cheias de ação.',
    descricaoLonga: 'Embarque em uma jornada cinematográfica pelas colinas da Judeia. Em "Crônicas de Davi: Vale de Elá", os jogadores assumem o papel de Davi enfrentando leões, ursos e a intimidação do exército filisteu, culminando no combate lendário contra Golias munido de coragem e cinco pedras lisas do ribeiro.',
    tags: ['Aventura 3D', 'Ação', 'Heróis', 'Action RPG', 'Davi e Golias']
  },
  {
    id: 'exodo-travessia',
    titulo: 'Êxodo: A Travessia do Mar',
    subtitulo: 'Estratégia & Jornada Histórica',
    categoria: 'jogos',
    urlDestino: '#catalogoCompleto',
    imagemCapa: 'assets/images/exodo-travessia.jpg',
    videoHoverUrl: '',
    temaAnimacao: 'exodo',
    avaliacao: '4.9',
    avaliacoesCount: '1.9k',
    faixaEtaria: 'Livre',
    plataformas: ['Web', 'Android', 'iOS', 'PC'],
    botaoTexto: 'Jogar Agora',
    destaqueCarrossel: true,
    badgeEspecial: 'Mais Jogado',
    temaDestaque: 'Estratégia em Tempo Real • Travessia',
    recursos: [
      'Simulação de travessia com mar dividindo em tempo real',
      'Gerenciamento de provisões, ânimo do grupo e liderança',
      'Coluna de fogo e nuvem iluminando o caminho noturno',
      'Modo Campanha Histórica com notas arqueológicas'
    ],
    descricao: 'Guie a caravana através do deserto sob a coluna de fogo e atravesse o Mar Vermelho em uma experiência cinematográfica repleta de decisões estratégicas.',
    descricaoLonga: 'Sinta o peso e a emoção de uma grande marcha histórica de libertação. Como estrategista e líder, você deve manter o grupo unido no deserto até o momento decisivo em que as águas do Mar Vermelho se abrem em muralhas líquidas.',
    tags: ['Estratégia', 'Jornada Histórica', 'Simulação', 'Campanha', 'Aventura']
  },
  {
    id: 'templo-dos-enigmas',
    titulo: 'Sanctum Logos: Templo da Sabedoria',
    subtitulo: 'Jogo Educacional de Lógica & Enigmas',
    categoria: 'educacional',
    urlDestino: '#catalogoCompleto',
    imagemCapa: 'assets/images/templo-dos-enigmas.jpg',
    videoHoverUrl: '',
    temaAnimacao: 'puzzle',
    avaliacao: '4.8',
    avaliacoesCount: '1.5k',
    faixaEtaria: 'Livre',
    plataformas: ['Web', 'Android', 'iOS', 'PC'],
    botaoTexto: 'Iniciar Desafio',
    destaqueCarrossel: true,
    badgeEspecial: 'Educacional',
    temaDestaque: 'Raciocínio Lógico, Matemática & Enigmas',
    recursos: [
      'Mais de 80 quebra-cabeças geométricos e desafios de lógica',
      'Coleção de pergaminhos antigos com provérbios de sabedoria',
      'Ambiente sonoro sereno propício para foco e aprendizado',
      'Adequado para todas as idades, estimulando raciocínio e memória'
    ],
    descricao: 'Desvende pergaminhos dourados, constelações geométricas e desafios de raciocínio lógico projetados para exercitar a mente e a resolução de problemas.',
    descricaoLonga: 'Sanctum Logos une o melhor dos jogos educacionais de raciocínio espacial, matemática recreativa e lógica verbal. Cada câmara resolvida desbloqueia novos mecanismos interativos e desafios cognitivos progressivos.',
    tags: ['Educacional', 'Quebra-Cabeça', 'Lógica & Memória', 'Sabedoria', 'Enigmas']
  },
  {
    id: 'codex-jerusalem-360',
    titulo: 'Codex Atlas Holográfico 365',
    subtitulo: 'Aplicação Interativa de Mapas 3D & Estudo',
    categoria: 'aplicativos',
    urlDestino: '#catalogoCompleto',
    imagemCapa: 'assets/images/codex-jerusalem-360.jpg',
    videoHoverUrl: '',
    temaAnimacao: 'leitura',
    avaliacao: '5.0',
    avaliacoesCount: '3.1k',
    faixaEtaria: 'Livre',
    plataformas: ['Web', 'Android', 'iOS', 'PWA'],
    botaoTexto: 'Abrir Aplicação',
    destaqueCarrossel: true,
    badgeEspecial: 'Top Avaliado',
    temaDestaque: 'Atlas Interativo 3D & Cronologia',
    recursos: [
      'Linha do tempo interativa conectando grandes eras históricas',
      'Mapas 3D de cidades antigas reconstruídas em alta definição',
      'Sistema de ofensiva diária (streaks) e conquistas de estudo',
      'Glossário de termos históricos e idiomas clássicos com pronúncia'
    ],
    descricao: 'Transforme seus estudos e leituras diárias com mapas cronológicos interativos, reconstrução visual em 3D, planos gamificados e acompanhamento de metas.',
    descricaoLonga: 'O Codex 365 é uma aplicação web interativa de estudo, leitura e exploração histórica. Com visual holográfico e arquitetura moderna, o app permite visualizar conexões cronológicas, rotas geográficas e mapas tridimensionais com um único toque.',
    tags: ['Aplicativo', 'Mapas 3D', 'Estudo Interativo', 'Ofensiva Diária', 'Gamificação']
  },
  {
    id: 'jardim-das-oliveiras-devocional',
    titulo: 'Monte das Oliveiras: Foco & Meditação',
    subtitulo: 'Aplicativo de Bem-Estar, Áudio Ambiente & Diário',
    categoria: 'utilitarios',
    urlDestino: '#catalogoCompleto',
    imagemCapa: 'assets/images/jardim-das-oliveiras-devocional.jpg',
    videoHoverUrl: '',
    temaAnimacao: 'devocional',
    avaliacao: '4.9',
    avaliacoesCount: '2.8k',
    faixaEtaria: 'Livre',
    plataformas: ['Web', 'Android', 'iOS'],
    botaoTexto: 'Abrir Aplicativo',
    destaqueCarrossel: true,
    badgeEspecial: 'Foco & Calma',
    temaDestaque: 'Produtividade, Áudio Ambiente & Reflexão',
    recursos: [
      'Sessões guiadas em áudio ao nascer e ao pôr do sol',
      'Diário pessoal de metas, gratidão e anotações rápidas',
      'Sons ambientes da natureza: brisa, harpa acústica e oliveiras',
      'Modo foco (Pomodoro suave) para estudo e leitura tranquila'
    ],
    descricao: 'Comece o dia com foco e serenidade através de trilhas instrumentais relaxantes, sons da natureza, diário interativo e reflexões diárias.',
    descricaoLonga: 'Projetado para ser um espaço digital de serenidade e concentração no meio da correria diária, o aplicativo Monte das Oliveiras combina paisagens sonoras relaxantes com ferramentas práticas de organização mental e reflexão.',
    tags: ['Web App', 'Produtividade', 'Áudio Ambiente', 'Foco & Calma', 'Diário']
  },
  {
    id: 'rotas-de-paulo-odisseia',
    titulo: 'Odisseia no Mediterrâneo: Rotas Antigas',
    subtitulo: 'Jogo Educacional de Geografia & Navegação',
    categoria: 'educacional',
    urlDestino: '#catalogoCompleto',
    imagemCapa: 'assets/images/rotas-de-paulo-odisseia.jpg',
    videoHoverUrl: '',
    temaAnimacao: 'navio',
    avaliacao: '4.8',
    avaliacoesCount: '1.2k',
    faixaEtaria: 'Livre',
    plataformas: ['Web', 'PC', 'Android'],
    botaoTexto: 'Navegar Agora',
    destaqueCarrossel: false,
    badgeEspecial: 'Atualizado',
    temaDestaque: 'Geografia Histórica & Navegação Marítima',
    recursos: [
      'Navegação realista em mapa marítimo do Mar Mediterrâneo',
      'Desafios de tempestades, ventos marítimos e escalas em Malta',
      'Curiosidades históricas e culturais sobre cidades como Atenas, Éfeso e Roma',
      'Modo Quiz Geográfico com pontuação global'
    ],
    descricao: 'Assuma o leme em grandes expedições pelo Mar Mediterrâneo. Explore cidades históricas como Antioquia, Éfeso, Corinto e Roma enquanto aprende geografia e história.',
    descricaoLonga: 'Reviva grandes viagens marítimas pelo Mediterrâneo rumo a Roma. Enfrente tormentas no Mar Egeu, gerencie sua embarcação e explore a geografia e a história das principais metrópoles da Antiguidade.',
    tags: ['Geografia', 'História', 'Exploração', 'Educacional', 'Navegação']
  }
];

/**
 * ==============================================================================
 * DESAFIO GAMER DIÁRIO (GAMIFICAÇÃO & OFENSIVA DIÁRIA)
 * ==============================================================================
 * Perguntas dinâmicas de lógica, história, cultura gamer e conhecimentos gerais.
 * ==============================================================================
 */
const DESAFIOS_DIARIOS = [
  {
    id: 1,
    pergunta: 'Em "Crônicas de Davi: Vale de Elá", quantas pedras lisas do ribeiro são coletadas antes do confronto contra Golias?',
    opcoes: ['3 pedras', '5 pedras', '7 pedras', '12 pedras'],
    correta: 1, // '5 pedras'
    referencia: 'Cultura & História',
    explicacao: 'Foram escolhidas cinco pedras lisas do ribeiro e guardadas no alforje de pastor.'
  },
  {
    id: 2,
    pergunta: 'Em qual mar se passam as rotas de navegação de Antioquia, Éfeso, Creta, Malta e Roma na Antiguidade?',
    opcoes: ['Mar Vermelho', 'Mar Mediterrâneo', 'Mar Cáspio', 'Mar do Norte'],
    correta: 1, // 'Mar Mediterrâneo'
    referencia: 'Geografia & Navegação',
    explicacao: 'O Mar Mediterrâneo conectava os principais portos da Ásia Menor, Grécia, ilhas de Creta e Malta até a península Itálica.'
  },
  {
    id: 3,
    pergunta: 'Na lógica computacional e nos jogos digitais a 60 FPS, quantos milissegundos aproximadamente dura cada quadro (frame)?',
    opcoes: ['16,6 ms', '33,3 ms', '60,0 ms', '100,0 ms'],
    correta: 0, // '16,6 ms'
    referencia: 'Tecnologia & Games',
    explicacao: 'Dividindo 1000 milissegundos (1 segundo) por 60 quadros, cada frame é renderizado em cerca de 16,67 ms.'
  },
  {
    id: 4,
    pergunta: 'Se uma sequência lógica nos pergaminhos de "Sanctum Logos" segue os números 2, 6, 12, 20, 30... qual é o próximo número?',
    opcoes: ['36', '40', '42', '48'],
    correta: 2, // '42'
    referencia: 'Raciocínio Lógico',
    explicacao: 'As diferenças entre os termos aumentam em números pares (+4, +6, +8, +10, +12). Portanto: 30 + 12 = 42.'
  },
  {
    id: 5,
    pergunta: 'Qual recurso tecnológico permite instalar uma aplicação web moderna diretamente na tela inicial do celular ou PC?',
    opcoes: ['PWA (Progressive Web App)', 'BIOS', 'Bluetooth Mesh', 'VRAM'],
    correta: 0, // 'PWA (Progressive Web App)'
    referencia: 'Aplicações Web',
    explicacao: 'Progressive Web Apps (PWA) usam Web App Manifest e Service Workers para funcionar como aplicativos instaláveis.'
  }
];

/**
 * Utilitário de Metadados de Categoria
 */
function getCategoryMeta(cat) {
  const meta = {
    jogos: {
      label: 'Game & Aventura',
      badgeClass: 'badge-jogos',
      icon: 'Swords',
      color: '#38bdf8'
    },
    educacional: {
      label: 'Jogo Educacional',
      badgeClass: 'badge-educacional',
      icon: 'Puzzle',
      color: '#c084fc'
    },
    aplicativos: {
      label: 'Aplicativo Interativo',
      badgeClass: 'badge-aplicativos',
      icon: 'Layers',
      color: '#34d399'
    },
    utilitarios: {
      label: 'Web App & Utilitário',
      badgeClass: 'badge-utilitarios',
      icon: 'Sparkles',
      color: '#fbbf24'
    }
  };
  return meta[cat] || meta.jogos;
}
