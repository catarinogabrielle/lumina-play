/**
 * ==============================================================================
 * LUMINA PLAY - MAIN APPLICATION CONTROLLER
 * ==============================================================================
 * Gerenciamento de estado, Hero Carousel, Catálogo Dinâmico, Favoritos,
 * Visualização em Grid/Lista, Desafio Bíblico Diário, Avaliação por Estrelas,
 * Modais interativos, PWA e Notificações Toast.
 * ==============================================================================
 */

(function () {
  'use strict';

  // --- 1. ESTADO DA APLICAÇÃO ---
  let selectedCategory = 'all';
  let selectedPlatform = 'all';
  let activeTag = null;
  let searchFilter = '';
  let sortMode = 'destaque';
  let currentViewMode = 'grid'; // 'grid' | 'list'

  // Favoritos persistidos no localStorage
  let userFavorites = new Set();
  try {
    const savedFavs = localStorage.getItem('lumina_favorites');
    if (savedFavs) {
      userFavorites = new Set(JSON.parse(savedFavs));
    }
  } catch (e) {
    userFavorites = new Set();
  }

  // Avaliações de usuários no localStorage
  let userRatings = {};
  try {
    userRatings = JSON.parse(localStorage.getItem('lumina_user_ratings') || '{}');
  } catch (e) {
    userRatings = {};
  }

  function saveFavorites() {
    try {
      localStorage.setItem('lumina_favorites', JSON.stringify(Array.from(userFavorites)));
    } catch (e) {}
  }

  function toggleFavorite(id) {
    const isFav = userFavorites.has(id);
    if (isFav) {
      userFavorites.delete(id);
      showToast('Removido dos seus Favoritos', 'HeartOff');
    } else {
      userFavorites.add(id);
      LuminaAudio.play('favorite');
      showToast('Adicionado aos seus Favoritos!', 'Heart');
    }
    saveFavorites();
    updateFavoriteCounters();
    renderCatalogGrid();
    updateModalFavoriteState(id);
  }

  function updateFavoriteCounters() {
    const badge = document.getElementById('countFavorites');
    if (badge) {
      badge.textContent = userFavorites.size;
    }
    const headerBadge = document.getElementById('headerCountFavorites');
    if (headerBadge) {
      headerBadge.textContent = userFavorites.size;
    }
    const mobileBadge = document.getElementById('mobileCountFavorites');
    if (mobileBadge) {
      mobileBadge.textContent = userFavorites.size;
    }
  }

  // --- 2. SISTEMA DE TOAST NOTIFICATIONS ---
  let toastTimer = null;
  function showToast(message, iconName = 'CheckCircle2') {
    const toast = document.getElementById('toastNotification');
    const msgEl = document.getElementById('toastMessage');
    const iconEl = document.getElementById('toastIcon');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    if (iconEl && window.lucide) {
      iconEl.setAttribute('data-lucide', iconName);
      lucide.createIcons();
    }

    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- 3. HERO SPOTLIGHT CAROUSEL ---
  const heroSlides = CATALOGO_JOGOS_E_APPS.filter(item => item.destaqueCarrossel);
  let currentHeroIdx = 0;
  let heroProgress = 0;
  let heroPaused = false;
  let heroIntervalId = null;

  function renderHeroThumbnails() {
    const container = document.getElementById('heroThumbsList');
    if (!container) return;

    container.innerHTML = heroSlides.map((item, idx) => {
      const isActive = idx === currentHeroIdx;
      const catMeta = getCategoryMeta(item.categoria);
      return `
        <button
          type="button"
          data-hero-idx="${idx}"
          class="hero-thumb-btn flex items-center gap-3 p-2.5 rounded-2xl border text-left transition-all shrink-0 w-64 lg:w-full ${
            isActive
              ? 'is-active border-cyan-400'
              : 'bg-slate-900/65 hover:bg-slate-900 border-white/10 opacity-75 hover:opacity-100'
          }"
        >
          <img
            src="${item.imagemCapa}"
            alt="${item.titulo}"
            class="w-16 h-12 sm:w-20 sm:h-14 rounded-xl object-cover shrink-0 border border-white/10"
          />
          <div class="min-w-0 flex-1">
            <div class="text-[10px] font-gamer uppercase tracking-wider ${isActive ? 'text-cyan-300' : 'text-slate-400'}">
              ${catMeta.label}
            </div>
            <div class="font-gamer text-xs sm:text-sm font-bold text-white truncate">
              ${item.titulo}
            </div>
            <div class="text-[11px] text-slate-400 truncate">
              ${item.subtitulo}
            </div>
          </div>
        </button>
      `;
    }).join('');

    container.querySelectorAll('.hero-thumb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        LuminaAudio.play('select');
        const idx = parseInt(btn.getAttribute('data-hero-idx'), 10);
        setHeroSlide(idx);
      });
    });
  }

  function setHeroSlide(idx) {
    if (heroSlides.length === 0) return;
    currentHeroIdx = (idx + heroSlides.length) % heroSlides.length;
    heroProgress = 0;
    const item = heroSlides[currentHeroIdx];
    const catMeta = getCategoryMeta(item.categoria);

    const imgEl = document.getElementById('heroBannerImg');
    if (imgEl) {
      imgEl.style.opacity = '0.35';
      setTimeout(() => {
        imgEl.src = item.imagemCapa;
        imgEl.alt = item.titulo;
        imgEl.style.opacity = '1';
      }, 120);
    }

    const catPill = document.getElementById('heroCategoryPill');
    if (catPill) {
      catPill.textContent = catMeta.label;
      catPill.className = `px-3 py-1 rounded-full text-xs font-gamer uppercase tracking-wider backdrop-blur-md ${catMeta.badgeClass}`;
    }

    const specialBadge = document.getElementById('heroSpecialBadge');
    if (specialBadge) {
      specialBadge.textContent = item.badgeEspecial || 'Destaque Especial';
    }

    const ratingEl = document.getElementById('heroRating');
    if (ratingEl) ratingEl.textContent = `★ ${item.avaliacao} (${item.avaliacoesCount || '2k'} avaliações)`;

    const ageEl = document.getElementById('heroAge');
    if (ageEl) ageEl.textContent = `Classificação: ${item.faixaEtaria || 'Livre'}`;

    const titleEl = document.getElementById('heroTitle');
    if (titleEl) titleEl.textContent = item.titulo;

    const descEl = document.getElementById('heroDescription');
    if (descEl) descEl.textContent = item.descricao;

    const launchLink = document.getElementById('heroLaunchLink');
    if (launchLink) {
      launchLink.href = item.urlDestino;
      launchLink.onclick = () => LuminaAudio.play('launch');
    }

    const launchBtnText = document.getElementById('heroLaunchBtnText');
    if (launchBtnText) launchBtnText.textContent = item.botaoTexto || 'Jogar Agora';

    const tagsContainer = document.getElementById('heroTags');
    if (tagsContainer) {
      tagsContainer.innerHTML = (item.tags || []).map(tag => `
        <button
          type="button"
          data-filter-tag="${tag}"
          class="hero-tag-pill px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs text-slate-300 backdrop-blur-sm transition"
        >
          #${tag}
        </button>
      `).join('');

      tagsContainer.querySelectorAll('.hero-tag-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          LuminaAudio.play('select');
          applyTagFilter(btn.getAttribute('data-filter-tag'));
        });
      });
    }

    const trailerBtn = document.getElementById('btnHeroTrailer');
    if (trailerBtn) {
      trailerBtn.onclick = () => {
        LuminaAudio.play('modalOpen');
        openGameModal(item.id);
      };
    }

    renderHeroThumbnails();
    if (window.lucide) lucide.createIcons();
  }

  function startHeroAutoCycle() {
    if (heroIntervalId) clearInterval(heroIntervalId);
    const timerBar = document.getElementById('heroTimerBar');
    heroIntervalId = setInterval(() => {
      if (heroPaused) return;
      heroProgress += 1.4;
      if (timerBar) timerBar.style.width = `${Math.min(100, heroProgress)}%`;
      if (heroProgress >= 100) {
        setHeroSlide(currentHeroIdx + 1);
      }
    }, 85);
  }

  // --- 4. RENDERIZAÇÃO DOS CARDS DE JOGOS & HOVER PREVIEW ---
  const activeCardPreviews = new WeakMap();

  function startCardHoverPreview(cardEl, item) {
    cardEl.classList.add('is-playing-preview');
    LuminaAudio.play('hover');

    const videoEl = cardEl.querySelector('video.card-hover-video');
    if (videoEl && item.videoHoverUrl && item.videoHoverUrl.trim() !== '') {
      videoEl.classList.remove('hidden');
      videoEl.currentTime = 0;
      videoEl.play().catch(() => {});
      return;
    }

    const canvas = cardEl.querySelector('canvas.card-preview-canvas');
    if (!canvas) return;

    const previewController = LuminaCanvas.startCardPreview(canvas, item);
    if (previewController) {
      activeCardPreviews.set(cardEl, previewController);
    }
  }

  function stopCardHoverPreview(cardEl) {
    cardEl.classList.remove('is-playing-preview');
    const videoEl = cardEl.querySelector('video.card-hover-video');
    if (videoEl) {
      videoEl.pause();
    }
    const previewController = activeCardPreviews.get(cardEl);
    if (previewController) {
      previewController.stop();
      activeCardPreviews.delete(cardEl);
    }
  }

  // Card no Modo Grid (Padrão com Vídeo Preview)
  function createGameCardHtml(item, isCarousel = false) {
    const catMeta = getCategoryMeta(item.categoria);
    const isFav = userFavorites.has(item.id);
    const widthClass = isCarousel ? 'w-[270px] sm:w-[340px] shrink-0' : 'w-full';

    return `
      <article
        data-card-id="${item.id}"
        class="store-card rounded-3xl overflow-hidden flex flex-col justify-between ${widthClass} group"
      >
        <div>
          <!-- Media Stage: Imagem de Capa + Camada de Hover Video/Canvas -->
          <div class="media-stage aspect-video bg-slate-950 relative">
            <img
              src="${item.imagemCapa}"
              alt="${item.titulo}"
              loading="lazy"
              class="cover-image w-full h-full object-cover"
            />

            <!-- Camada de Vídeo / Preview Interativo ao passar o mouse -->
            <div class="hover-video-layer absolute inset-0 bg-slate-950/60 flex flex-col justify-between p-3">
              <video
                class="card-hover-video absolute inset-0 w-full h-full object-cover ${item.videoHoverUrl ? '' : 'hidden'}"
                src="${item.videoHoverUrl || ''}"
                muted
                loop
                playsinline
              ></video>
              <canvas class="card-preview-canvas absolute inset-0 w-full h-full ${item.videoHoverUrl ? 'hidden' : ''}"></canvas>

              <!-- Top Live HUD -->
              <div class="relative z-10 flex items-center justify-between">
                <span class="px-2.5 py-1 rounded-lg bg-rose-600/90 text-white text-[10px] font-gamer uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <span class="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  PREVIEW AO VIVO
                </span>
                <span class="px-2 py-0.5 rounded bg-slate-950/80 text-cyan-300 text-[10px] font-mono border border-cyan-400/30">
                  60 FPS
                </span>
              </div>

              <!-- Quick Play Overlay Button -->
              <div class="relative z-10 flex items-center justify-center">
                <a
                  href="${item.urlDestino}"
                  target="_blank"
                  rel="noopener noreferrer"
                  onclick="LuminaAudio.play('launch')"
                  class="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-gamer font-extrabold text-xs uppercase tracking-wider shadow-xl flex items-center gap-1.5 transform scale-95 group-hover:scale-100 transition"
                >
                  <i data-lucide="Play" class="w-3.5 h-3.5 fill-slate-950"></i>
                  <span>${item.botaoTexto || 'Abrir Agora'}</span>
                </a>
              </div>

              <!-- Bottom Preview Info -->
              <div class="relative z-10 text-[11px] text-slate-200 font-medium flex items-center justify-between">
                <span>Clique para jogar</span>
                <span class="text-amber-300 font-bold">★ ${item.avaliacao}</span>
              </div>
            </div>

            <!-- Categoria estática visível antes do hover -->
            <div class="absolute top-3 left-3 z-10 pointer-events-none group-hover:opacity-0 transition">
              <span class="px-2.5 py-1 rounded-full text-[10px] font-gamer uppercase backdrop-blur-md ${catMeta.badgeClass}">
                ${catMeta.label}
              </span>
            </div>

            <!-- Botão de Favoritar (Coração) no canto superior direito -->
            <button
              type="button"
              data-fav-id="${item.id}"
              class="btn-favorite absolute top-3 right-3 z-20 p-2 rounded-xl bg-slate-950/75 hover:bg-slate-900 border border-white/15 backdrop-blur-md text-slate-300 transition ${isFav ? 'is-favorited' : ''}"
              title="${isFav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}"
            >
              <i data-lucide="Heart" class="w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}"></i>
            </button>
          </div>

          <!-- Informações do Jogo -->
          <div class="p-5 space-y-2.5">
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span class="truncate font-medium text-cyan-300">${item.subtitulo}</span>
              <span class="text-amber-400 font-bold shrink-0">★ ${item.avaliacao}</span>
            </div>

            <h3 class="font-gamer text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition leading-snug">
              <a href="${item.urlDestino}" target="_blank" rel="noopener noreferrer" onclick="LuminaAudio.play('launch')" class="hover:underline">
                ${item.titulo}
              </a>
            </h3>

            <p class="text-xs text-slate-300 leading-relaxed line-clamp-2">
              ${item.descricao}
            </p>

            <div class="flex flex-wrap gap-1.5 pt-1">
              ${(item.tags || []).slice(0, 3).map(tag => `
                <button
                  type="button"
                  data-filter-tag="${tag}"
                  class="card-tag-pill px-2 py-0.5 rounded-md bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-400 hover:text-cyan-300 transition"
                >
                  #${tag}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Rodapé do Card com Ações -->
        <div class="px-5 pb-5 pt-2 flex items-center gap-2">
          <a
            href="${item.urlDestino}"
            target="_blank"
            rel="noopener noreferrer"
            onclick="LuminaAudio.play('launch')"
            class="flex-1 btn-launch py-2.5 px-4 rounded-xl font-gamer font-bold text-xs text-white uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>${item.botaoTexto || 'Acessar Agora'}</span>
            <i data-lucide="ExternalLink" class="w-3.5 h-3.5"></i>
          </a>

          <button
            type="button"
            data-open-details="${item.id}"
            class="btn-open-details p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700/80 transition"
            title="Ver Detalhes, Trailer e Ficha Técnica"
          >
            <i data-lucide="Maximize2" class="w-4 h-4"></i>
          </button>
        </div>
      </article>
    `;
  }

  // Card no Modo Lista (Estilo Tabela Steam / Epic Games)
  function createGameListRowHtml(item) {
    const catMeta = getCategoryMeta(item.categoria);
    const isFav = userFavorites.has(item.id);

    return `
      <article
        data-card-id="${item.id}"
        class="store-card-list rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
      >
        <div class="flex items-center gap-3.5 min-w-0">
          <div class="w-24 h-16 sm:w-28 sm:h-18 rounded-xl overflow-hidden bg-slate-950 shrink-0 relative border border-white/10">
            <img src="${item.imagemCapa}" alt="${item.titulo}" class="w-full h-full object-cover group-hover:scale-105 transition" />
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2 py-0.5 rounded text-[10px] font-gamer uppercase ${catMeta.badgeClass}">
                ${catMeta.label}
              </span>
              <span class="text-amber-400 font-bold text-xs">★ ${item.avaliacao}</span>
              <span class="text-[10px] text-slate-500 hidden md:inline">• ${item.referenciaBiblica || ''}</span>
            </div>
            <h3 class="font-gamer text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition truncate">
              ${item.titulo}
            </h3>
            <p class="text-xs text-slate-400 truncate max-w-md">${item.subtitulo}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            data-fav-id="${item.id}"
            class="btn-favorite p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white transition ${isFav ? 'is-favorited' : ''}"
            title="${isFav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}"
          >
            <i data-lucide="Heart" class="w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}"></i>
          </button>

          <button
            type="button"
            data-open-details="${item.id}"
            class="btn-open-details p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700/80 transition"
            title="Ver Detalhes"
          >
            <i data-lucide="Maximize2" class="w-4 h-4"></i>
          </button>

          <a
            href="${item.urlDestino}"
            target="_blank"
            rel="noopener noreferrer"
            onclick="LuminaAudio.play('launch')"
            class="btn-launch px-4 py-2.5 rounded-xl font-gamer font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5"
          >
            <i data-lucide="Play" class="w-3.5 h-3.5 fill-white"></i>
            <span>${item.botaoTexto || 'Jogar'}</span>
          </a>
        </div>
      </article>
    `;
  }

  function wireCardInteractions(containerEl) {
    if (!containerEl) return;

    // Hover Video Preview (apenas para modo grid)
    if (currentViewMode === 'grid') {
      containerEl.querySelectorAll('article[data-card-id]').forEach(cardEl => {
        const id = cardEl.getAttribute('data-card-id');
        const item = CATALOGO_JOGOS_E_APPS.find(x => x.id === id);
        if (!item) return;

        cardEl.addEventListener('mouseenter', () => startCardHoverPreview(cardEl, item));
        cardEl.addEventListener('mouseleave', () => stopCardHoverPreview(cardEl));
      });
    }

    // Detalhes & Trailer Modal
    containerEl.querySelectorAll('.btn-open-details').forEach(btn => {
      btn.addEventListener('click', () => {
        LuminaAudio.play('modalOpen');
        const id = btn.getAttribute('data-open-details');
        openGameModal(id);
      });
    });

    // Toque ou clique no palco de mídia abre detalhes (otimizado para mobile)
    containerEl.querySelectorAll('article[data-card-id]').forEach(cardEl => {
      const id = cardEl.getAttribute('data-card-id');
      const mediaStage = cardEl.querySelector('.media-stage');
      if (mediaStage) {
        mediaStage.addEventListener('click', (e) => {
          if (e.target.closest('.btn-favorite') || e.target.closest('a')) return;
          LuminaAudio.play('modalOpen');
          openGameModal(id);
        });
      }
    });

    // Botão de Favoritar
    containerEl.querySelectorAll('.btn-favorite').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = btn.getAttribute('data-fav-id');
        toggleFavorite(id);
      });
    });

    // Tag pills
    containerEl.querySelectorAll('.card-tag-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        LuminaAudio.play('select');
        applyTagFilter(btn.getAttribute('data-filter-tag'));
      });
    });
  }

  // --- 5. RENDERIZAÇÃO DO CARROSSEL HORIZONTAL E CATÁLOGO PRINCIPAL ---
  function renderFeaturedCarousel() {
    const track = document.getElementById('featuredCarouselTrack');
    if (!track) return;
    track.innerHTML = CATALOGO_JOGOS_E_APPS.map(item => createGameCardHtml(item, true)).join('');
    wireCardInteractions(track);
    if (window.lucide) lucide.createIcons();
  }

  function renderCatalogGrid() {
    const grid = document.getElementById('catalogGrid');
    const empty = document.getElementById('emptyCatalogState');
    if (!grid) return;

    const countAllEl = document.getElementById('countAll');
    if (countAllEl) countAllEl.textContent = CATALOGO_JOGOS_E_APPS.length;

    let list = CATALOGO_JOGOS_E_APPS.filter(item => {
      // Filtro de Favoritos
      if (selectedCategory === 'favoritos') {
        if (!userFavorites.has(item.id)) return false;
      } else if (selectedCategory !== 'all' && item.categoria !== selectedCategory) {
        return false;
      }

      // Filtro por Plataforma
      if (selectedPlatform !== 'all') {
        const platforms = item.plataformas || [];
        if (!platforms.some(p => p.toLowerCase().includes(selectedPlatform.toLowerCase()))) {
          return false;
        }
      }

      // Filtro por Tag ativa
      if (activeTag && !(item.tags || []).includes(activeTag)) {
        return false;
      }

      // Busca por texto
      if (searchFilter.trim() !== '') {
        const q = searchFilter.toLowerCase();
        const inTitle = item.titulo.toLowerCase().includes(q);
        const inSub = item.subtitulo.toLowerCase().includes(q);
        const inDesc = item.descricao.toLowerCase().includes(q);
        const inRef = (item.referenciaBiblica || '').toLowerCase().includes(q);
        const inTags = (item.tags || []).some(t => t.toLowerCase().includes(q));
        return inTitle || inSub || inDesc || inRef || inTags;
      }
      return true;
    });

    // Ordenação
    if (sortMode === 'avaliacao') {
      list.sort((a, b) => parseFloat(b.avaliacao) - parseFloat(a.avaliacao));
    } else if (sortMode === 'az') {
      list.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (sortMode === 'recentes') {
      list.reverse();
    }

    if (list.length === 0) {
      grid.innerHTML = '';
      if (empty) empty.classList.remove('hidden');
      return;
    }

    if (empty) empty.classList.add('hidden');

    // Alternar classes do container de acordo com o modo de visualização
    if (currentViewMode === 'list') {
      grid.className = 'space-y-3';
      grid.innerHTML = list.map(item => createGameListRowHtml(item)).join('');
    } else {
      grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      grid.innerHTML = list.map(item => createGameCardHtml(item, false)).join('');
    }

    wireCardInteractions(grid);
    if (window.lucide) lucide.createIcons();
  }

  function applyTagFilter(tagName) {
    activeTag = tagName;
    searchFilter = '';
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) searchInput.value = '';

    const activeTagBanner = document.getElementById('activeTagBanner');
    const activeTagName = document.getElementById('activeTagName');
    if (activeTagBanner && activeTagName) {
      activeTagName.textContent = `#${tagName}`;
      activeTagBanner.classList.remove('hidden');
    }

    renderCatalogGrid();
    document.getElementById('catalogoCompleto').scrollIntoView({ behavior: 'smooth' });
  }

  function clearTagFilter() {
    activeTag = null;
    const activeTagBanner = document.getElementById('activeTagBanner');
    if (activeTagBanner) activeTagBanner.classList.add('hidden');
    renderCatalogGrid();
  }

  // --- 6. MODAL EXPANDIDO DE DETALHES & TRAILER DO JOGO ---
  let modalTrailerController = null;
  let currentOpenGameId = null;

  function openGameModal(gameId) {
    const item = CATALOGO_JOGOS_E_APPS.find(x => x.id === gameId);
    if (!item) return;

    currentOpenGameId = gameId;
    const modal = document.getElementById('previewModal');
    const catMeta = getCategoryMeta(item.categoria);

    // Reset do Player In-Portal
    const iframeEl = document.getElementById('modalGameIframe');
    const btnTogglePlayer = document.getElementById('btnToggleInPortalPlayer');
    if (iframeEl) {
      iframeEl.classList.add('hidden');
      iframeEl.src = 'about:blank';
    }
    if (btnTogglePlayer) {
      btnTogglePlayer.innerHTML = `
        <i data-lucide="Maximize" class="w-4 h-4 text-cyan-400"></i>
        <span>Jogar no Portal</span>
      `;
    }

    // Atualizar textos e dados
    const catBadge = document.getElementById('modalCategoryBadge');
    if (catBadge) {
      catBadge.textContent = catMeta.label;
      catBadge.className = `inline-block px-3 py-1 rounded-full text-xs font-gamer uppercase ${catMeta.badgeClass}`;
    }

    const titleEl = document.getElementById('modalTitle');
    if (titleEl) titleEl.textContent = item.titulo;

    const subEl = document.getElementById('modalSubtitle');
    if (subEl) subEl.textContent = item.subtitulo;

    const ratingEl = document.getElementById('modalRating');
    if (ratingEl) ratingEl.textContent = `★ ${item.avaliacao} (${item.avaliacoesCount || '2k'} avaliações)`;

    const refEl = document.getElementById('modalRefBiblica');
    if (refEl) {
      refEl.textContent = item.referenciaBiblica || 'Inspirado nas Escrituras';
    }

    const descEl = document.getElementById('modalDescription');
    if (descEl) descEl.textContent = item.descricaoLonga || item.descricao;

    const launchBtn = document.getElementById('modalLaunchBtn');
    if (launchBtn) {
      launchBtn.href = item.urlDestino;
      launchBtn.onclick = () => LuminaAudio.play('launch');
    }

    // Plataformas
    const platformsContainer = document.getElementById('modalPlatforms');
    if (platformsContainer) {
      platformsContainer.innerHTML = (item.plataformas || ['Web', 'Android']).map(p => `
        <span class="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
          <i data-lucide="Monitor" class="w-3.5 h-3.5 text-cyan-400"></i>
          <span>${p}</span>
        </span>
      `).join('');
    }

    // Recursos / Diferenciais
    const featuresContainer = document.getElementById('modalFeatures');
    if (featuresContainer) {
      const features = item.recursos || [
        'Narrativa bíblica fiel aos manuscritos',
        'Experiência acessível e gratuita para toda a família',
        'Compatível com computadores, celulares e tablets'
      ];
      featuresContainer.innerHTML = features.map(f => `
        <li class="flex items-start gap-2.5 text-xs text-slate-300">
          <i data-lucide="CheckCircle2" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
          <span>${f}</span>
        </li>
      `).join('');
    }

    // Tags
    const tagsContainer = document.getElementById('modalTagsList');
    if (tagsContainer) {
      tagsContainer.innerHTML = (item.tags || []).map(tag => `
        <span class="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs text-cyan-300">
          #${tag}
        </span>
      `).join('');
    }

    // Renderizar Avaliação Interativa por Estrelas
    renderModalStarRating(gameId);

    // Estado do botão de favoritar no modal
    updateModalFavoriteState(gameId);

    // Mídia: Vídeo real ou Canvas Shader 60fps
    const videoEl = document.getElementById('modalVideoPlayer');
    const canvasEl = document.getElementById('modalTrailerCanvas');
    const coverFallback = document.getElementById('modalCoverFallback');

    if (coverFallback) coverFallback.src = item.imagemCapa;

    if (item.videoHoverUrl && item.videoHoverUrl.trim() !== '') {
      if (canvasEl) canvasEl.classList.add('hidden');
      if (videoEl) {
        videoEl.classList.remove('hidden');
        videoEl.src = item.videoHoverUrl;
        videoEl.play().catch(() => {});
      }
    } else {
      if (videoEl) videoEl.classList.add('hidden');
      if (canvasEl) {
        canvasEl.classList.remove('hidden');
        modalTrailerController = LuminaCanvas.startModalTrailer(canvasEl, item);
      }
    }

    modal.classList.add('is-open');
    if (window.lucide) lucide.createIcons();
  }

  function renderModalStarRating(gameId) {
    const container = document.getElementById('modalStarRatingContainer');
    if (!container) return;
    const currentRating = userRatings[gameId] || 0;

    container.innerHTML = [1, 2, 3, 4, 5].map(star => `
      <button
        type="button"
        data-star-val="${star}"
        class="star-rating-btn text-lg sm:text-xl font-bold ${star <= currentRating ? 'active' : ''}"
        title="Avaliar com ${star} estrela(s)"
      >
        ★
      </button>
    `).join('');

    container.querySelectorAll('.star-rating-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const star = parseInt(btn.getAttribute('data-star-val'), 10);
        userRatings[gameId] = star;
        try {
          localStorage.setItem('lumina_user_ratings', JSON.stringify(userRatings));
        } catch (e) {}
        LuminaAudio.play('favorite');
        renderModalStarRating(gameId);
        showToast(`Você avaliou este jogo com ${star} estrela(s)!`, 'Star');
      });
    });
  }

  function toggleInPortalPlayer() {
    if (!currentOpenGameId) return;
    const item = CATALOGO_JOGOS_E_APPS.find(x => x.id === currentOpenGameId);
    if (!item) return;

    const videoEl = document.getElementById('modalVideoPlayer');
    const canvasEl = document.getElementById('modalTrailerCanvas');
    const iframeEl = document.getElementById('modalGameIframe');
    const btnToggle = document.getElementById('btnToggleInPortalPlayer');

    if (iframeEl && iframeEl.classList.contains('hidden')) {
      if (videoEl) { videoEl.pause(); videoEl.classList.add('hidden'); }
      if (canvasEl) canvasEl.classList.add('hidden');
      iframeEl.src = item.urlDestino;
      iframeEl.classList.remove('hidden');
      if (btnToggle) {
        btnToggle.innerHTML = `
          <i data-lucide="Film" class="w-4 h-4 text-cyan-400"></i>
          <span>Ver Trailer</span>
        `;
      }
      LuminaAudio.play('launch');
    } else if (iframeEl) {
      iframeEl.classList.add('hidden');
      iframeEl.src = 'about:blank';
      if (btnToggle) {
        btnToggle.innerHTML = `
          <i data-lucide="Maximize" class="w-4 h-4 text-cyan-400"></i>
          <span>Jogar no Portal</span>
        `;
      }
      if (item.videoHoverUrl && item.videoHoverUrl.trim() !== '') {
        if (videoEl) { videoEl.classList.remove('hidden'); videoEl.play().catch(() => {}); }
      } else {
        if (canvasEl) canvasEl.classList.remove('hidden');
      }
      LuminaAudio.play('click');
    }
    if (window.lucide) lucide.createIcons();
  }

  function updateModalFavoriteState(gameId) {
    const modalFavBtn = document.getElementById('modalFavToggleBtn');
    if (!modalFavBtn) return;
    const isFav = userFavorites.has(gameId);
    modalFavBtn.innerHTML = `
      <i data-lucide="Heart" class="w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}"></i>
      <span>${isFav ? 'Favoritado' : 'Favoritar'}</span>
    `;
    modalFavBtn.className = isFav
      ? 'px-4 py-3 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 font-medium text-xs sm:text-sm flex items-center gap-2 transition'
      : 'px-4 py-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-slate-300 font-medium text-xs sm:text-sm flex items-center gap-2 transition';
    if (window.lucide) lucide.createIcons();
  }

  function closeGameModal() {
    const modal = document.getElementById('previewModal');
    if (!modal) return;
    LuminaAudio.play('modalClose');
    modal.classList.remove('is-open');

    const videoEl = document.getElementById('modalVideoPlayer');
    if (videoEl) videoEl.pause();

    const iframeEl = document.getElementById('modalGameIframe');
    if (iframeEl) {
      iframeEl.classList.add('hidden');
      iframeEl.src = 'about:blank';
    }

    if (modalTrailerController) {
      modalTrailerController.stop();
      modalTrailerController = null;
    }
  }

  // --- 7. DESAFIO BÍBLICO DIÁRIO & OFENSIVA DE FÉ (GAMIFICAÇÃO) ---
  function initDailyChallenge() {
    if (typeof DESAFIOS_DIARIOS === 'undefined' || DESAFIOS_DIARIOS.length === 0) return;

    // Seleciona a pergunta de acordo com o dia do ano
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const challenge = DESAFIOS_DIARIOS[dayOfYear % DESAFIOS_DIARIOS.length];

    const questionEl = document.getElementById('challengeQuestion');
    const optionsContainer = document.getElementById('challengeOptions');
    const refEl = document.getElementById('challengeRef');
    const feedbackEl = document.getElementById('challengeFeedback');
    const streakEl = document.getElementById('streakCount');

    let streak = parseInt(localStorage.getItem('lumina_streak_count') || '0', 10);
    const lastAnsweredDate = localStorage.getItem('lumina_streak_date');
    const todayStr = today.toDateString();

    if (streakEl) streakEl.textContent = streak;
    if (questionEl) questionEl.textContent = challenge.pergunta;
    if (refEl) refEl.textContent = challenge.referencia;

    const alreadyAnswered = localStorage.getItem('lumina_answered_' + todayStr);

    if (optionsContainer) {
      optionsContainer.innerHTML = challenge.opcoes.map((opt, idx) => `
        <button
          type="button"
          data-opt-idx="${idx}"
          class="challenge-opt-btn p-3 rounded-xl text-left text-xs sm:text-sm font-medium text-slate-200 flex items-center justify-between gap-2"
          ${alreadyAnswered ? 'disabled' : ''}
        >
          <span>${opt}</span>
          <span class="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-400 font-mono">
            ${String.fromCharCode(65 + idx)}
          </span>
        </button>
      `).join('');

      if (alreadyAnswered && feedbackEl) {
        feedbackEl.innerHTML = `<span class="text-emerald-400 font-bold">✓ Desafio de hoje concluído!</span> ${challenge.explicacao}`;
        feedbackEl.classList.remove('hidden');
      }

      optionsContainer.querySelectorAll('.challenge-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-opt-idx'), 10);
          const isCorrect = idx === challenge.correta;

          optionsContainer.querySelectorAll('.challenge-opt-btn').forEach((b, bIdx) => {
            b.disabled = true;
            if (bIdx === challenge.correta) {
              b.classList.add('is-correct');
            } else if (bIdx === idx && !isCorrect) {
              b.classList.add('is-wrong');
            }
          });

          if (isCorrect) {
            LuminaAudio.play('favorite');
            if (lastAnsweredDate !== todayStr) {
              streak += 1;
              localStorage.setItem('lumina_streak_count', streak);
              localStorage.setItem('lumina_streak_date', todayStr);
              if (streakEl) streakEl.textContent = streak;
            }
            showToast('Resposta Correta! Ofensiva de Fé +1!', 'Sparkles');
          } else {
            LuminaAudio.play('click');
            showToast('Não foi dessa vez. Continue estudando a Palavra!', 'BookOpen');
          }

          localStorage.setItem('lumina_answered_' + todayStr, 'true');

          if (feedbackEl) {
            feedbackEl.innerHTML = isCorrect
              ? `<span class="text-emerald-400 font-bold">Parabéns, resposta correta!</span> ${challenge.explicacao}`
              : `<span class="text-rose-400 font-bold">Incorreto.</span> A resposta certa era "${challenge.opcoes[challenge.correta]}". ${challenge.explicacao}`;
            feedbackEl.classList.remove('hidden');
          }
        });
      });
    }
  }

  // --- 8. MODAL DE ADICIONAR JOGO & GERADOR DE CÓDIGO ---
  function openAddGameModal() {
    LuminaAudio.play('modalOpen');
    const modal = document.getElementById('addGameModal');
    if (modal) modal.classList.add('is-open');
    updateLivePreviewFromForm();
  }

  function closeAddGameModal() {
    LuminaAudio.play('modalClose');
    const modal = document.getElementById('addGameModal');
    if (modal) modal.classList.remove('is-open');
  }

  function updateLivePreviewFromForm() {
    const title = document.getElementById('formTitle')?.value || 'Meu Novo Jogo Bíblico';
    const sub = document.getElementById('formSub')?.value || 'Ação & Aventura 3D';
    const cat = document.getElementById('formCategory')?.value || 'biblico';
    const link = document.getElementById('formLink')?.value || 'https://...';
    const cover = document.getElementById('formCover')?.value || 'assets/images/cronicas-de-davi.jpg';
    const desc = document.getElementById('formDesc')?.value || 'Descrição envolvente para os usuários do portal...';
    const tags = (document.getElementById('formTags')?.value || 'Bíblia, Aventura').split(',').map(s => s.trim());

    // Atualiza preview no card modelo
    const prevTitle = document.getElementById('prevCardTitle');
    if (prevTitle) prevTitle.textContent = title;
    const prevSub = document.getElementById('prevCardSub');
    if (prevSub) prevSub.textContent = sub;
    const prevDesc = document.getElementById('prevCardDesc');
    if (prevDesc) prevDesc.textContent = desc;
    const prevImg = document.getElementById('prevCardImg');
    if (prevImg) prevImg.src = cover;

    // Gera o código JSON pronto para copiar
    const generatedJson = {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      titulo: title,
      subtitulo: sub,
      categoria: cat,
      urlDestino: link,
      imagemCapa: cover,
      videoHoverUrl: '',
      temaAnimacao: cat === 'educacional' ? 'puzzle' : cat === 'leitura' ? 'leitura' : 'davi',
      avaliacao: '5.0',
      avaliacoesCount: '1',
      faixaEtaria: 'Livre',
      plataformas: ['Web', 'Android'],
      botaoTexto: 'Jogar Agora',
      destaqueCarrossel: false,
      badgeEspecial: 'Novo',
      referenciaBiblica: 'Escrituras Sagradas',
      recursos: ['Experiência bíblica interativa'],
      descricao: desc,
      descricaoLonga: desc,
      tags: tags
    };

    const codeOutput = document.getElementById('generatedCodeSnippet');
    if (codeOutput) {
      codeOutput.textContent = JSON.stringify(generatedJson, null, 2);
    }
  }

  // --- 9. COMPARTILHAR JOGO ---
  async function shareCurrentGame() {
    if (!currentOpenGameId) return;
    const item = CATALOGO_JOGOS_E_APPS.find(x => x.id === currentOpenGameId);
    if (!item) return;

    const shareData = {
      title: `${item.titulo} - Lumina Play`,
      text: `${item.titulo}: ${item.descricao}`,
      url: item.urlDestino
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast('Compartilhado com sucesso!', 'Share2');
      } catch (e) {}
    } else {
      try {
        await navigator.clipboard.writeText(`${item.titulo} - ${item.urlDestino}`);
        showToast('Link copiado para a área de transferência!', 'Copy');
      } catch (e) {
        showToast('Não foi possível copiar o link', 'AlertCircle');
      }
    }
  }

  // --- 10. SUPORTE A PWA (INSTALAÇÃO) ---
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('btnPwaInstall');
    if (installBtn) installBtn.classList.remove('hidden');
  });

  // --- 11. BINDING DE TODOS OS EVENTOS DE INTERFACE ---
  function bindGlobalEvents() {
    // Hero Controls
    document.getElementById('btnHeroPrev')?.addEventListener('click', () => {
      LuminaAudio.play('select');
      setHeroSlide(currentHeroIdx - 1);
    });
    document.getElementById('btnHeroNext')?.addEventListener('click', () => {
      LuminaAudio.play('select');
      setHeroSlide(currentHeroIdx + 1);
    });

    const heroStage = document.getElementById('heroMainStage');
    if (heroStage) {
      heroStage.addEventListener('mouseenter', () => { heroPaused = true; });
      heroStage.addEventListener('mouseleave', () => { heroPaused = false; });
    }

    // Horizontal Carousel Buttons
    const carouselTrack = document.getElementById('featuredCarouselTrack');
    document.getElementById('btnCarouselLeft')?.addEventListener('click', () => {
      LuminaAudio.play('select');
      carouselTrack?.scrollBy({ left: -360, behavior: 'smooth' });
    });
    document.getElementById('btnCarouselRight')?.addEventListener('click', () => {
      LuminaAudio.play('select');
      carouselTrack?.scrollBy({ left: 360, behavior: 'smooth' });
    });

    // Category Filter Selection
    function selectCategory(cat) {
      selectedCategory = cat;
      document.querySelectorAll('.cat-pill').forEach(btn => {
        const isMatch = btn.getAttribute('data-cat') === cat;
        btn.className = isMatch
          ? 'cat-pill px-4 py-2 rounded-xl text-xs font-gamer uppercase tracking-wider bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 whitespace-nowrap transition'
          : 'cat-pill px-4 py-2 rounded-xl text-xs font-gamer uppercase tracking-wider bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800 whitespace-nowrap transition';
      });

      document.querySelectorAll('.nav-cat-btn').forEach(btn => {
        const isMatch = btn.getAttribute('data-nav-cat') === cat;
        btn.className = isMatch
          ? 'nav-cat-btn px-3.5 py-1.5 rounded-xl text-xs font-gamer uppercase tracking-wider bg-cyan-500 text-slate-950 font-bold transition'
          : 'nav-cat-btn px-3.5 py-1.5 rounded-xl text-xs font-gamer uppercase tracking-wider text-slate-300 hover:text-white transition';
      });

      renderCatalogGrid();
    }

    document.getElementById('catalogCategoryBar')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-pill');
      if (!btn) return;
      LuminaAudio.play('select');
      selectCategory(btn.getAttribute('data-cat'));
    });

    document.querySelectorAll('.nav-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        LuminaAudio.play('select');
        selectCategory(btn.getAttribute('data-nav-cat'));
        document.getElementById('catalogoCompleto')?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Filtros de Plataforma
    document.querySelectorAll('.platform-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        LuminaAudio.play('select');
        selectedPlatform = btn.getAttribute('data-platform');
        document.querySelectorAll('.platform-filter-btn').forEach(b => {
          const isMatch = b.getAttribute('data-platform') === selectedPlatform;
          b.className = isMatch
            ? 'platform-filter-btn px-3 py-1 rounded-lg text-xs font-gamer uppercase bg-indigo-500 text-white font-bold transition'
            : 'platform-filter-btn px-3 py-1 rounded-lg text-xs font-gamer uppercase bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition';
        });
        renderCatalogGrid();
      });
    });

    // Alternador de Visualização (Grid vs Lista)
    document.getElementById('btnViewGrid')?.addEventListener('click', () => {
      LuminaAudio.play('click');
      currentViewMode = 'grid';
      document.getElementById('btnViewGrid').className = 'p-2 rounded-xl bg-cyan-500 text-slate-950 transition';
      document.getElementById('btnViewList').className = 'p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition';
      renderCatalogGrid();
    });

    document.getElementById('btnViewList')?.addEventListener('click', () => {
      LuminaAudio.play('click');
      currentViewMode = 'list';
      document.getElementById('btnViewList').className = 'p-2 rounded-xl bg-cyan-500 text-slate-950 transition';
      document.getElementById('btnViewGrid').className = 'p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition';
      renderCatalogGrid();
    });

    // Tag Banner Clear
    document.getElementById('btnClearActiveTag')?.addEventListener('click', () => {
      LuminaAudio.play('select');
      clearTagFilter();
    });

    // Search Inputs (Desktop & Mobile)
    const globalSearchInput = document.getElementById('globalSearchInput');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    const mobileSearchBar = document.getElementById('mobileSearchBar');
    const btnToggleMobileSearch = document.getElementById('btnToggleMobileSearch');

    btnToggleMobileSearch?.addEventListener('click', () => {
      LuminaAudio.play('click');
      const isOpen = mobileSearchBar?.classList.toggle('is-open');
      if (isOpen) {
        setTimeout(() => mobileSearchInput?.focus(), 100);
      }
    });

    globalSearchInput?.addEventListener('input', (e) => {
      searchFilter = e.target.value;
      if (mobileSearchInput) mobileSearchInput.value = searchFilter;
      renderCatalogGrid();
    });

    mobileSearchInput?.addEventListener('input', (e) => {
      searchFilter = e.target.value;
      if (globalSearchInput) globalSearchInput.value = searchFilter;
      renderCatalogGrid();
    });

    document.getElementById('btnClearSearch')?.addEventListener('click', () => {
      searchFilter = '';
      if (globalSearchInput) globalSearchInput.value = '';
      if (mobileSearchInput) mobileSearchInput.value = '';
      selectCategory('all');
    });

    // Sort Select
    document.getElementById('catalogSortSelect')?.addEventListener('change', (e) => {
      sortMode = e.target.value;
      renderCatalogGrid();
    });

    // Audio SFX Toggle
    document.getElementById('btnSoundToggle')?.addEventListener('click', () => {
      const active = LuminaAudio.toggle();
      const statusText = document.getElementById('soundStatusText');
      const soundIcon = document.getElementById('soundIcon');
      if (statusText) statusText.textContent = active ? 'SFX ON' : 'SFX OFF';
      if (soundIcon) soundIcon.setAttribute('data-lucide', active ? 'Volume2' : 'VolumeX');
      if (window.lucide) lucide.createIcons();
      showToast(active ? 'Sons da interface ativados' : 'Sons da interface desativados', active ? 'Volume2' : 'VolumeX');
    });

    // Modal Close Buttons
    document.getElementById('btnClosePreviewModal')?.addEventListener('click', closeGameModal);
    document.getElementById('previewModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'previewModal') closeGameModal();
    });

    // Modal Favorite Toggle
    document.getElementById('modalFavToggleBtn')?.addEventListener('click', () => {
      if (currentOpenGameId) toggleFavorite(currentOpenGameId);
    });

    // Modal Share Button
    document.getElementById('modalShareBtn')?.addEventListener('click', shareCurrentGame);

    // Modal In-Portal Player Toggle
    document.getElementById('btnToggleInPortalPlayer')?.addEventListener('click', toggleInPortalPlayer);

    // Add Game & Code Guide Modal
    document.getElementById('btnOpenAddGame')?.addEventListener('click', openAddGameModal);
    document.getElementById('btnCloseAddGameModal')?.addEventListener('click', closeAddGameModal);
    document.getElementById('addGameModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'addGameModal') closeAddGameModal();
    });

    // Add Game Form inputs live listener
    ['formTitle', 'formSub', 'formCategory', 'formLink', 'formCover', 'formDesc', 'formTags'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', updateLivePreviewFromForm);
    });

    document.getElementById('btnCopyGeneratedCode')?.addEventListener('click', async () => {
      const code = document.getElementById('generatedCodeSnippet')?.textContent;
      if (!code) return;
      try {
        await navigator.clipboard.writeText(code);
        LuminaAudio.play('click');
        showToast('Código copiado! Cole no seu games-data.js', 'CheckCheck');
      } catch (e) {
        showToast('Não foi possível copiar o código', 'AlertCircle');
      }
    });

    // PWA Install Button
    document.getElementById('btnPwaInstall')?.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice && choice.outcome === 'accepted') {
        showToast('Lumina Play instalado como App!', 'Download');
      }
      deferredPrompt = null;
      document.getElementById('btnPwaInstall')?.classList.add('hidden');
    });

    // Mobile Bottom Navigation Links
    document.querySelectorAll('.mobile-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        LuminaAudio.play('click');
        const target = btn.getAttribute('data-mobile-target');
        document.querySelectorAll('.mobile-nav-item').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        if (target === 'inicio') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (target === 'catalogo') {
          document.getElementById('catalogoCompleto')?.scrollIntoView({ behavior: 'smooth' });
        } else if (target === 'favoritos') {
          selectCategory('favoritos');
          document.getElementById('catalogoCompleto')?.scrollIntoView({ behavior: 'smooth' });
        } else if (target === 'desafio') {
          document.getElementById('desafioDiarioSection')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Header Navigation Links
    document.querySelectorAll('.header-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        LuminaAudio.play('select');
        document.querySelectorAll('.header-nav-link').forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
      });
    });

    // Keyboard Shortcuts (Esc to close modals, / to search)
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== document.getElementById('globalSearchInput')) {
        e.preventDefault();
        document.getElementById('globalSearchInput')?.focus();
      }
      if (e.key === 'Escape') {
        closeGameModal();
        closeAddGameModal();
        document.getElementById('globalSearchInput')?.blur();
        mobileSearchBar?.classList.remove('is-open');
        mobileSearchInput?.blur();
      }
    });
  }

  // --- 12. INICIALIZAÇÃO NO CARREGAMENTO DA PÁGINA ---
  window.addEventListener('DOMContentLoaded', () => {
    // Sincronizar estado inicial do som
    const isSfx = LuminaAudio.isEnabled();
    const statusText = document.getElementById('soundStatusText');
    const soundIcon = document.getElementById('soundIcon');
    if (statusText) statusText.textContent = isSfx ? 'SFX ON' : 'SFX OFF';
    if (soundIcon) soundIcon.setAttribute('data-lucide', isSfx ? 'Volume2' : 'VolumeX');

    // Inicializar carrosséis, catálogo e desafio diário
    updateFavoriteCounters();
    setHeroSlide(0);
    startHeroAutoCycle();
    renderFeaturedCarousel();
    renderCatalogGrid();
    initDailyChallenge();

    // Iniciar partículas do Hero
    LuminaCanvas.initHeroParticles('heroAmbientCanvas');

    // Conectar eventos
    bindGlobalEvents();

    // Registrar Service Worker para PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }

    // Renderizar ícones do Lucide
    if (window.lucide) {
      lucide.createIcons();
    }
  });

})();
