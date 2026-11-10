/**
 * ==============================================================================
 * LUMINA PLAY - CATÁLOGO OFICIAL DE GAMES, JOGOS EDUCACIONAIS & APLICAÇÕES
 * ==============================================================================
 * Adicione novos jogos ou aplicações no array CATALOGO_JOGOS_E_APPS abaixo.
 * ==============================================================================
 */

const CATALOGO_JOGOS_E_APPS = [
  {
    id: 'missao-fronteiras',
    titulo: 'Missão Fronteiras: O Chamado',
    subtitulo: 'Base Missionária Ide • Jogo 3D • Aventura • Fé',
    categoria: 'jogos',
    categorias: ['jogos', 'educacional'],
    urlDestino: 'https://missao-fronteiras.vercel.app/',
    imagemCapa: 'promo/missao-fronteiras-arte-16x9.jpg',
    imagemHero: 'promo/missao-fronteiras-arte-limpa-16x9.jpg',
    videoHoverUrl: 'promo/missao-fronteiras-trailer-16x9.mp4',
    avaliacao: '5.0',
    faixaEtaria: 'Livre',
    plataformas: ['Web', 'Android', 'PC'],
    botaoTexto: 'Jogue Grátis',
    destaqueCarrossel: true,
    badgeEspecial: 'Lançamento Oficial',
    temaDestaque: 'Mundo Aberto 3D • Modo Dupla Co-Op • 8 Culturas',
    recursos: [
      'Mundo Aberto 3D interativo com regiões vivas, veículos táticos e exploração',
      'Modo Dupla Co-Op local e online para jogar em equipe no celular ou PC',
      '4 heróis jogáveis (Lucas, Sofia, Davi e Ester) com habilidades especiais',
      'Explore 8 fronteiras do mundo em 3D, derrote as sombras e leve esperança a cada cultura'
    ],
    descricao: 'Escolha seu herói, explore 8 fronteiras do mundo em 3D, derrote as sombras e leve esperança a cada cultura.',
    descricaoLonga: 'Em Missão Fronteiras: O Chamado, você faz parte da Base Missionária Ide em uma aventura de Mundo Aberto 3D. Escolha seu herói, explore 8 fronteiras culturais ao redor do globo, pilote veículos táticos, jogue em Modo Dupla Co-Op no celular ou PC, derrote as sombras e leve esperança a cada cultura.',
    tags: ['Mundo Aberto 3D', 'Modo Dupla Co-Op', 'Celular e PC', '8 Culturas', 'Aventura 3D', 'Educacional']
  }
];

/**
 * Utilitário de Metadados de Categoria
 */
function getCategoryMeta(cat) {
  const meta = {
    jogos: {
      label: 'Jogo 3D • Aventura',
      badgeClass: 'badge-jogos',
      icon: 'Gamepad2',
      color: '#38bdf8'
    },
    educacional: {
      label: 'Jogo Educacional',
      badgeClass: 'badge-educacional',
      icon: 'Puzzle',
      color: '#c084fc'
    },
    aplicativos: {
      label: 'Aplicativo',
      badgeClass: 'badge-aplicativos',
      icon: 'Layers',
      color: '#34d399'
    },
    utilitarios: {
      label: 'Web App',
      badgeClass: 'badge-utilitarios',
      icon: 'Sparkles',
      color: '#fbbf24'
    }
  };
  return meta[cat] || meta.jogos;
}
