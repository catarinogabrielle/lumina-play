/**
 * ==============================================================================
 * LUMINA PLAY - CANVAS 60FPS GRAPHICS ENGINE
 * ==============================================================================
 * Renderizador de efeitos visuais procedurais, ambientação celestial
 * e simulação de vídeo gameplay em tempo real para cards e trailers.
 * ==============================================================================
 */

const LuminaCanvas = (function () {
  let heroAnimId = null;

  /**
   * Partículas Celestiais no Banner do Hero Spotlight
   */
  function initHeroParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width || 900;
      canvas.height = rect.height || 480;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 0.7 - 0.2,
      r: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.7 + 0.3
    }));

    if (heroAnimId) cancelAnimationFrame(heroAnimId);

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      heroAnimId = requestAnimationFrame(loop);
    }

    loop();
  }

  /**
   * Renderizador de Gameplay Preview Dinâmico em tempo real para cada Card
   */
  function startCardPreview(canvas, item) {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 380;
    canvas.height = rect.height || 214;

    let t = 0;
    let animId = null;

    function render() {
      t += 0.04;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Fundo temático com degradê escurecido cinematográfico
      const grad = ctx.createLinearGradient(0, 0, w, h);
      if (item.temaAnimacao === 'davi') {
        grad.addColorStop(0, 'rgba(15, 23, 42, 0.75)');
        grad.addColorStop(1, 'rgba(30, 58, 138, 0.82)');
      } else if (item.temaAnimacao === 'exodo') {
        grad.addColorStop(0, 'rgba(8, 47, 73, 0.82)');
        grad.addColorStop(1, 'rgba(124, 45, 18, 0.75)');
      } else if (item.temaAnimacao === 'puzzle') {
        grad.addColorStop(0, 'rgba(46, 16, 101, 0.8)');
        grad.addColorStop(1, 'rgba(13, 148, 136, 0.75)');
      } else if (item.temaAnimacao === 'leitura') {
        grad.addColorStop(0, 'rgba(6, 78, 59, 0.8)');
        grad.addColorStop(1, 'rgba(15, 23, 42, 0.85)');
      } else {
        grad.addColorStop(0, 'rgba(120, 53, 15, 0.7)');
        grad.addColorStop(1, 'rgba(15, 23, 42, 0.85)');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Elementos de HUD & gameplay de acordo com o jogo
      ctx.save();
      if (item.temaAnimacao === 'davi') {
        // Alvo e trajetória da funda
        const cx = w * 0.5 + Math.cos(t * 1.5) * 35;
        const cy = h * 0.48 + Math.sin(t * 1.5) * 18;

        ctx.strokeStyle = 'rgba(251, 191, 36, 0.9)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 26 + Math.sin(t * 3) * 4, 0, Math.PI * 2);
        ctx.stroke();

        // Linhas de mira cruzada
        ctx.beginPath();
        ctx.moveTo(cx - 36, cy); ctx.lineTo(cx + 36, cy);
        ctx.moveTo(cx, cy - 36); ctx.lineTo(cx, cy + 36);
        ctx.stroke();

        // Pedras brilhantes girando
        for (let i = 0; i < 5; i++) {
          const ang = t * 3.4 + (i * Math.PI * 2) / 5;
          const px = cx + Math.cos(ang) * 36;
          const py = cy + Math.sin(ang) * 18;
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (item.temaAnimacao === 'exodo') {
        // Ondas laterais do Mar Vermelho
        for (let x = 0; x < w; x += 12) {
          const wave1 = h * 0.62 + Math.sin(x * 0.04 + t * 2.5) * 14;
          ctx.fillStyle = 'rgba(0, 242, 254, 0.6)';
          ctx.fillRect(x, wave1, 6, 4);
        }
        // Coluna de fogo central
        for (let i = 0; i < 14; i++) {
          const fx = w * 0.5 + Math.sin(t * 2 + i) * 20;
          const fy = h * 0.78 - ((t * 45 + i * 16) % (h * 0.65));
          ctx.fillStyle = 'rgba(251, 146, 60, 0.85)';
          ctx.beginPath();
          ctx.arc(fx, fy, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (item.temaAnimacao === 'puzzle') {
        // Geometria sagrada & pergaminhos de Salomão
        ctx.translate(w * 0.5, h * 0.48);
        ctx.rotate(t * 0.5);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
        ctx.lineWidth = 2;
        ctx.strokeRect(-32, -32, 64, 64);
        ctx.rotate(Math.PI / 4);
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.85)';
        ctx.strokeRect(-32, -32, 64, 64);
      } else {
        // Partículas místicas de leitura & meditação
        for (let i = 0; i < 16; i++) {
          const px = (i * 45 + t * 30) % w;
          const py = h * 0.3 + Math.sin(t + i) * 30;
          ctx.fillStyle = 'rgba(52, 211, 153, 0.8)';
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.55)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 20; x < w - 20; x += 10) {
          const y = h * 0.54 + Math.sin(x * 0.03 + t * 2) * 16;
          if (x === 20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // Linha de progresso da simulação de vídeo no rodapé do card
      const progress = (t * 22) % w;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(0, h - 3, w, 3);
      ctx.fillStyle = '#00f2fe';
      ctx.fillRect(0, h - 3, progress, 3);

      animId = requestAnimationFrame(render);
    }

    render();

    return {
      stop: () => {
        if (animId) cancelAnimationFrame(animId);
      }
    };
  }

  /**
   * Renderizador Cinematográfico do Modal de Trailer
   */
  function startModalTrailer(canvas, item) {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 450;
    let t = 0;
    let animId = null;

    function loop() {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Raios de luz dinâmicos sobrepostos à capa
      for (let i = 0; i < 28; i++) {
        const x = (i * 60 + t * 50) % canvas.width;
        const y = canvas.height * 0.5 + Math.sin(t * 1.4 + i) * 120;
        ctx.fillStyle = i % 2 === 0 ? 'rgba(0, 242, 254, 0.65)' : 'rgba(251, 191, 36, 0.65)';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(loop);
    }

    loop();

    return {
      stop: () => {
        if (animId) cancelAnimationFrame(animId);
      }
    };
  }

  return {
    initHeroParticles,
    startCardPreview,
    startModalTrailer
  };
})();
