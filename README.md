# LUMINA PLAY — Vitrine Gamer & Storefront Hub

> **Portal oficial de Jogos Bíblicos, Educacionais, Leitura Bíblica & Aplicativos Devocionais.**

---

## 📁 Estrutura de Arquivos Modular

```
c:\projetos\Lumina Play\
├── home.html               # Página inicial modular (HTML semântico e limpo)
├── index.html              # Ponto de entrada padrão para servidores web / GitHub Pages / Vercel
├── css/
│   └── styles.css          # Design system, glassmorphism, temas, animações gamer
├── js/
│   ├── games-data.js       # Banco de dados dos jogos e apps com metadados ricos
│   ├── audio-engine.js     # Sintetizador procedural de efeitos sonoros gamer (Web Audio API)
│   ├── canvas-engine.js    # Motor gráfico 60 FPS (partículas de fundo e preview animado)
│   └── app.js              # Controlador principal da aplicação e interatividade
└── assets/
    ├── icons/
    │   └── logo.svg        # Logotipo vetorial moderno em SVG
    └── images/             # Imagens de capa de alta resolução (desacopladas do código)
        ├── cronicas-de-davi.jpg
        ├── exodo-travessia.jpg
        ├── templo-dos-enigmas.jpg
        ├── codex-jerusalem-360.jpg
        ├── jardim-das-oliveiras-devocional.jpg
        └── rotas-de-paulo-odisseia.jpg
```

---

## 🚀 Principais Recursos & Tendências de Mercado Implementadas

1. **Separação Completa & Otimização de Performance**:
   - O arquivo original único de **8.2 MB** com Base64 foi reduzido para arquivos modulares leves.
   - O `home.html` agora tem apenas ~36 KB, carregando instantaneamente.
   - As imagens foram salvas em `assets/images/`, permitindo cache de navegador e carregamento sob demanda (`loading="lazy"`).

2. **Hero Spotlight Carousel (Padrão Epic Games / PS Store)**:
   - Destaque principal com banner dinâmico, partículas celestiais em tempo real, nota, classificação indicativa e lista lateral de miniaturas sincronizada.
   - Barra de contagem de tempo para auto-play (pausa automaticamente com o mouse sobre o slide).

3. **Live Hover Preview (Simulação de Vídeo 60 FPS)**:
   - Ao passar o mouse sobre qualquer jogo, a capa faz crossfade suave para um vídeo `.mp4` ou para uma **animação procedural em Canvas a 60 FPS** com tema exclusivo de cada jogo (mira de Davi, Mar Vermelho, geometria de Salomão, etc.).

4. **Sistema de Favoritos com Persistência Local**:
   - Os usuários podem clicar no coração para favoritar qualquer jogo.
   - O filtro "Favoritos" no menu permite ver apenas os itens salvos (armazenados em `localStorage`).

5. **Ficha Técnica & Trailer Modal**:
   - Modal cinematográfico com sinopse estendida, recursos do jogo, plataformas compatíveis (Web, Android, iOS, PC), referências bíblicas e botão de compartilhamento rápido com cópia de link e toast.

6. **Gerador Visual de Novos Jogos ("Novo Jogo")**:
   - Botão no menu superior que abre um gerador onde você preenche o título, link e capa, visualiza o card em tempo real e copia o código JSON pronto para colar em `js/games-data.js`.

7. **Efeitos Sonoros Procedurais (Web Audio API)**:
   - Efeitos de hover, clique, abrir modal, favoritar e play com sintetizador Web Audio nativo e botão de mute com persistência.

---

## 🛠️ Como Adicionar um Novo Jogo ou App

Abra o arquivo [js/games-data.js](file:///c:/projetos/Lumina%20Play/js/games-data.js) e adicione um novo bloco no array `CATALOGO_JOGOS_E_APPS`:

```javascript
{
  id: 'meu-jogo-biblico',
  titulo: 'Nome do Seu Jogo',
  subtitulo: 'Aventura Bíblica em 3D',
  categoria: 'biblico', // 'biblico' | 'educacional' | 'leitura' | 'devocional'
  urlDestino: 'https://link-do-seu-jogo.com',
  imagemCapa: 'assets/images/sua-capa.jpg',
  videoHoverUrl: '', // Opcional: link para vídeo .mp4
  temaAnimacao: 'davi', // 'davi' | 'exodo' | 'puzzle' | 'leitura' | 'devocional'
  avaliacao: '5.0',
  avaliacoesCount: '1.2k',
  faixaEtaria: 'Livre',
  plataformas: ['Web', 'Android', 'PC'],
  botaoTexto: 'Jogar Agora',
  destaqueCarrossel: true,
  badgeEspecial: 'Novo',
  referenciaBiblica: 'Gênesis 1',
  recursos: ['Gráficos imersivos', 'Modo offline', 'Livre para a família'],
  descricao: 'Descrição curta para o card...',
  descricaoLonga: 'Sinopse detalhada para o modal de detalhes...',
  tags: ['Aventura', 'Quiz', 'História']
}
```

---

## 🌐 Como Executar Localmente

Basta abrir o arquivo [home.html](file:///c:/projetos/Lumina%20Play/home.html) ou [index.html](file:///c:/projetos/Lumina%20Play/index.html) diretamente no seu navegador, ou rodar com um servidor local:

```powershell
# Usando npx serve
npx serve .

# Ou usando Python
python -m http.server 3000
```
