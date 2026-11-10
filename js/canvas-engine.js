/**
 * ==============================================================================
 * LUMINA PLAY - CANVAS AMBIENT GRAPHICS ENGINE
 * ==============================================================================
 * Renderizador de partículas de ambientação no Hero Spotlight e fallback leve
 * caso algum item futuro não possua vídeo MP4 configurado.
 * ==============================================================================
 */

const LuminaCanvas = (function () {
  let heroAnimId = null;

  /**
   * Partículas Luminosas no Banner do Hero Spotlight
   */
  function initHeroParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let mouseX = -9999;
    let mouseY = -9999;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width || 900;
      canvas.height = rect.height || 480;
    }
    resize();
    window.addEventListener('resize', resize);

    const parentStage = canvas.parentElement;
    if (parentStage) {
      parentStage.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      });
      parentStage.addEventListener('mouseleave', () => {
        mouseX = -9999;
        mouseY = -9999;
      });
    }

    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -Math.random() * 0.6 - 0.15,
      r: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.65 + 0.25
    }));

    if (heroAnimId) cancelAnimationFrame(heroAnimId);

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        if (mouseX > 0 && mouseY > 0) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160 && dist > 10) {
            p.x += (dx / dist) * 0.5;
            p.y += (dy / dist) * 0.5;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      heroAnimId = requestAnimationFrame(loop);
    }

    loop();
  }

  function startCardPreview() {
    return null;
  }

  function startModalTrailer() {
    return null;
  }

  return {
    initHeroParticles,
    startCardPreview,
    startModalTrailer
  };
})();
