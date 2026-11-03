/**
 * ==============================================================================
 * LUMINA PLAY - BANCO DE DADOS DE JOGOS & APLICATIVOS
 * ==============================================================================
 * Para adicionar um novo jogo ou app ao seu portal, basta adicionar um novo
 * objeto no array CATALOGO_JOGOS_E_APPS abaixo.
 *
 * Campos suportados:
 * - id: Identificador único em minúsculas (sem espaços)
 * - titulo: Nome principal do jogo ou app
 * - subtitulo: Slogan ou gênero explicativo
 * - categoria: 'biblico' | 'educacional' | 'leitura' | 'devocional'
 * - urlDestino: Link de acesso direto para o usuário jogar/abrir
 * - imagemCapa: Caminho relativo ou URL da capa (formato 16:9 recomendado)
 * - videoHoverUrl: (Opcional) Link de vídeo .mp4/.webm para rodar no hover
 * - temaAnimacao: 'davi' | 'exodo' | 'puzzle' | 'leitura' | 'devocional' | 'navio' | 'arca'
 * - avaliacao: Nota de 1.0 a 5.0
 * - avaliacoesCount: Quantidade de avaliações (ex: '2.4k')
 * - faixaEtaria: 'Livre' | '+10' | '+12'
 * - plataformas: Array de plataformas compatíveis (ex: ['Web', 'Android', 'PC'])
 * - botaoTexto: Texto de ação (ex: 'Jogar Agora', 'Iniciar App')
 * - destaqueCarrossel: true para aparecer no carrossel de topo
 * - badgeEspecial: 'Destaque da Semana' | 'Novo' | 'Mais Jogado' | 'Atualizado'
 * - referenciaBiblica: Texto com livro e capítulo correspondente
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
    subtitulo: 'Ação & Aventura Bíblica em 3D',
    categoria: 'biblico',
    urlDestino: 'https://www.bible.com/pt/bible/129/1SA.17.NVI',
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
    referenciaBiblica: '1 Samuel 17:1-58',
    recursos: [
      'Batalha tática e mira de precisão com a funda de pastor',
      'Cenários históricos do Vale de Elá recriados em 3D',
      'Desafios de coragem, fé e versículos memoráveis',
      'Trilha sonora épica orquestrada e efeitos imersivos'
    ],
    descricao: 'Viva a jornada épica do jovem pastor de Belém até o confronto histórico contra o gigante Golias. Desafios de fé, precisão com a funda radiante e fases bíblicas fieis às Escrituras.',
    descricaoLonga: 'Embarque em uma jornada cinematográfica pelas colinas da Judeia. Em "Crônicas de Davi: Vale de Elá", os jogadores assumem o papel de Davi enfrentando leões, ursos e a intimidação do exército filisteu, culminando no combate lendário contra Golias munido apenas de sua fé em Deus e de cinco pedras lisas do ribeiro.',
    tags: ['Aventura 3D', 'Antigo Testamento', 'Heróis da Fé', 'Action RPG', 'Davi e Golias']
  },
  {
    id: 'exodo-travessia',
    titulo: 'Êxodo: A Travessia do Mar',
    subtitulo: 'Estratégia & Jornada Histórica',
    categoria: 'biblico',
    urlDestino: 'https://www.bible.com/pt/bible/129/EXO.14.NVI',
    imagemCapa: 'assets/images/exodo-travessia.jpg',
    videoHoverUrl: '',
    temaAnimacao: 'exodo',
    avaliacao: '4.9',
    avaliacoesCount: '1.9k',
    faixaEtaria: 'Livre',
    plataformas: ['Web', 'Android', 'iOS', 'PC'],
    botaoTexto: 'Liderar o Povo',
    destaqueCarrossel: true,
    badgeEspecial: 'Mais Jogado',
    referenciaBiblica: 'Êxodo 14:1-31',
    recursos: [
      'Simulação de travessia com mar dividindo em tempo real',
      'Gerenciamento de provisões, ânimo do povo e liderança',
      'Coluna de fogo e nuvem que guiavam Israel',
      'Modo Campanha Histórica com notas arqueológicas'
    ],
    descricao: 'Guie o povo de Israel através do deserto sob a coluna de fogo e atravesse o Mar Vermelho em uma experiência cinematográfica repleta de decisões estratégicas e fé.',
    descricaoLonga: 'Sinta o peso e a glória da maior marcha de libertação da história humana. Como líder auxiliando Moisés, você deve manter o povo unido perante o exército egípcio até o momento milagroso em que as águas do Mar Vermelho se abrem em muralhas líquidas para a passagem a pé enxuto.',
    tags: ['Estratégia', 'Moisés', 'História Bíblica', 'Campanha', 'Milagres']
  },
  {
    id: 'templo-dos-enigmas',
    titulo: 'Sanctum Logos: Templo da Sabedoria',
    subtitulo: 'Jogo Educacional de Lógica & Parábolas',
    categoria: 'educacional',
    urlDestino: 'https://www.bible.com/pt/bible/129/PRO.1.NVI',
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
    referenciaBiblica: 'Provérbios 1-4 & Parábolas dos Evangelhos',
    recursos: [
      'Mais de 80 quebra-cabeças geométricos e desafios de lógica',
      'Coleção de pergaminhos antigos com ensinamentos de Salomão',
      'Ambiente sonoro sereno propício para foco e aprendizado',
      'Adequado para todas as idades, reforçando raciocínio e sabedoria'
    ],
    descricao: 'Desvende pergaminhos dourados, constelações geométricas e desafios de raciocínio lógico inspirados nos Provérbios de Salomão e nas Parábolas de Jesus.',
    descricaoLonga: 'Sanctum Logos une o melhor dos jogos de raciocínio espacial e lógica verbal aos grandes princípios de integridade, sabedoria e justiça encontrados no livro de Provérbios. Cada câmara resolvida revela um ensinamento prático para o dia a dia.',
    tags: ['Educacional', 'Quebra-Cabeça', 'Lógica & Memória', 'Salomão', 'Provérbios']
  },
  {
    id: 'codex-jerusalem-360',
    titulo: 'Codex Bíblico Holográfico 365',
    subtitulo: 'Aplicação Interativa para Leitura Bíblica',
    categoria: 'leitura',
    urlDestino: 'https://www.bible.com/pt/reading-plans',
    imagemCapa: 'assets/images/codex-jerusalem-360.jpg',
    videoHoverUrl: '',
    temaAnimacao: 'leitura',
    avaliacao: '5.0',
    avaliacoesCount: '3.1k',
    faixaEtaria: 'Livre',
    plataformas: ['Web', 'Android', 'iOS', 'PWA'],
    botaoTexto: 'Abrir App de Leitura',
    destaqueCarrossel: true,
    badgeEspecial: 'Top Avaliado',
    referenciaBiblica: 'Bíblia Sagrada Completa',
    recursos: [
      'Linha do tempo interativa conectando Gênesis a Apocalipse',
      'Mapas 3D das cidades bíblicas na época de Cristo',
      'Sistema de ofensiva diária (streaks) e conquistas de leitura',
      'Dicionário original grego e hebraico com pronúncia'
    ],
    descricao: 'Transforme sua leitura bíblica diária com mapas cronológicos interativos, reconstrução visual de Jerusalém, planos de leitura gamificados e acompanhamento de metas.',
    descricaoLonga: 'O Codex 365 é muito mais do que um leitor digital: é um hub imersivo de estudo e leitura diária. Com visual holográfico e arquitetura moderna, o app permite visualizar conexões entre profecias do Antigo Testamento e seu cumprimento nos Evangelhos com um único toque.',
    tags: ['Plano de Leitura', 'Mapas 3D', 'Estudo Bíblico', 'Ofensiva Diária', 'Gamificação']
  },
  {
    id: 'jardim-das-oliveiras-devocional',
    titulo: 'Monte das Oliveiras: Devocional Diário',
    subtitulo: 'Aplicativo de Meditação, Leitura & Oração',
    categoria: 'devocional',
    urlDestino: 'https://www.bible.com/pt/verse-of-the-day',
    imagemCapa: 'assets/images/jardim-das-oliveiras-devocional.jpg',
    videoHoverUrl: '',
    temaAnimacao: 'devocional',
    avaliacao: '4.9',
    avaliacoesCount: '2.8k',
    faixaEtaria: 'Livre',
    plataformas: ['Web', 'Android', 'iOS'],
    botaoTexto: 'Acessar Devocional',
    destaqueCarrossel: true,
    badgeEspecial: 'Paz & Oração',
    referenciaBiblica: 'Salmos & Filipenses 4:6-7',
    recursos: [
      'Reflexões em áudio ao nascer e ao pôr do sol',
      'Diário de oração protegido com acompanhamento de respostas',
      'Sons ambientes da natureza: brisa, harpa e oliveiras',
      'Versículo do dia temático para momentos de ansiedade e esperança'
    ],
    descricao: 'Comece o dia em paz com reflexões bíblicas guiadas ao nascer do sol, trilha instrumental relaxante, diário de oração interativo e versículos temáticos.',
    descricaoLonga: 'Projetado para ser um santuário de serenidade no meio da correria diária, o aplicativo Monte das Oliveiras oferece meditações bíblicas curtas e profundas, ajudando a cultivar uma vida de oração constante e intimidade com Deus.',
    tags: ['Devocional', 'Oração', 'Áudio Meditação', 'Paz & Reflexão', 'Salmos']
  },
  {
    id: 'rotas-de-paulo-odisseia',
    titulo: 'Odisseia no Mediterrâneo: Viagens de Paulo',
    subtitulo: 'Jogo Educacional de Geografia & Missões',
    categoria: 'educacional',
    urlDestino: 'https://www.bible.com/pt/bible/129/ACT.13.NVI',
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
    referenciaBiblica: 'Atos dos Apóstolos 13-28',
    recursos: [
      'Navegação realista em mapa marítimo do Império Romano',
      'Desafios de tempestades, naufrágios em Malta e pregações',
      'Curiosidades históricas sobre as cartas aos Gálatas, Efésios e Coríntios',
      'Modo Quiz Missionário com pontuação global'
    ],
    descricao: 'Assuma o leme nas viagens missionárias do Apóstolo Paulo pelo Mar Mediterrâneo. Explore cidades históricas como Antioquia, Éfeso, Corinto e Roma enquanto aprende Atos dos Apóstolos.',
    descricaoLonga: 'Reviva as três grandes viagens missionárias do apóstolo Paulo e sua derradeira jornada rumo a Roma. Enfrente tormentas no Mar Egeu, responda a debates no Areópago de Atenas e compreenda a expansão da mensagem do Evangelho no primeiro século.',
    tags: ['Geografia Bíblica', 'Atos dos Apóstolos', 'Exploração', 'Educacional', 'Paulo']
  }
];

/**
 * ==============================================================================
 * DESAFIO BÍBLICO DIÁRIO (GAMIFICAÇÃO & OFENSIVA DE FÉ)
 * ==============================================================================
 * Perguntas dinâmicas que alternam diariamente para engajar os jogadores.
 * ==============================================================================
 */
const DESAFIOS_DIARIOS = [
  {
    id: 1,
    pergunta: 'Quantas pedras lisas Davi escolheu no ribeiro antes de enfrentar Golias?',
    opcoes: ['3 pedras', '5 pedras', '7 pedras', '12 pedras'],
    correta: 1, // '5 pedras'
    referencia: '1 Samuel 17:40',
    explicacao: 'Davi escolheu cinco pedras lisas do ribeiro e as colocou no alforje de pastor.'
  },
  {
    id: 2,
    pergunta: 'Qual sinal guiou o povo de Israel pelo deserto durante a noite no livro de Êxodo?',
    opcoes: ['Uma estrela cadente', 'Uma coluna de fogo', 'Um arco-íris brilhante', 'Uma nuvem dourada'],
    correta: 1, // 'Uma coluna de fogo'
    referencia: 'Êxodo 13:21-22',
    explicacao: 'De dia o Senhor ia adiante numa coluna de nuvem e de noite numa coluna de fogo.'
  },
  {
    id: 3,
    pergunta: 'Segundo Provérbios, qual é o princípio da sabedoria?',
    opcoes: ['O estudo da filosofia', 'O temor do Senhor', 'A leitura de muitos livros', 'A riqueza material'],
    correta: 1, // 'O temor do Senhor'
    referencia: 'Provérbios 9:10',
    explicacao: 'O temor do Senhor é o princípio da sabedoria, e o conhecimento do Santo é entendimento.'
  },
  {
    id: 4,
    pergunta: 'Em qual ilha o Apóstolo Paulo sofreu um naufrágio durante sua viagem a Roma?',
    opcoes: ['Chipre', 'Creta', 'Malta', 'Patmos'],
    correta: 2, // 'Malta'
    referencia: 'Atos 28:1',
    explicacao: 'Depois de salvos, descobriram que a ilha se chamava Malta, onde foram acolhidos com bondade.'
  },
  {
    id: 5,
    pergunta: 'Em qual monte Jesus costumava orar e passou seus momentos antes da crucificação?',
    opcoes: ['Monte Sinai', 'Monte das Oliveiras', 'Monte Carmelo', 'Monte Tabor'],
    correta: 1, // 'Monte das Oliveiras'
    referencia: 'Lucas 22:39',
    explicacao: 'Como de costume, Jesus foi para o monte das Oliveiras, e os seus discípulos o seguiram.'
  }
];

/**
 * Utilitário de Metadados de Categoria
 */
function getCategoryMeta(cat) {
  const meta = {
    biblico: {
      label: 'Jogo Bíblico',
      badgeClass: 'badge-biblico',
      icon: 'Swords',
      color: '#38bdf8'
    },
    educacional: {
      label: 'Jogo Educacional',
      badgeClass: 'badge-educacional',
      icon: 'Puzzle',
      color: '#c084fc'
    },
    leitura: {
      label: 'App de Leitura Bíblica',
      badgeClass: 'badge-leitura',
      icon: 'BookOpen',
      color: '#34d399'
    },
    devocional: {
      label: 'App Devocional',
      badgeClass: 'badge-devocional',
      icon: 'Sparkles',
      color: '#fbbf24'
    }
  };
  return meta[cat] || meta.biblico;
}
