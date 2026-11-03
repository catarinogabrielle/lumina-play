/**
 * ==============================================================================
 * LUMINA PLAY - AUDIO ENGINE (SFX WEB AUDIO API)
 * ==============================================================================
 * Sintetizador procedural de efeitos sonoros gamer de alta fidelidade
 * sem dependência de arquivos de áudio externos.
 * ==============================================================================
 */

const LuminaAudio = (function () {
  let audioCtx = null;
  let sfxEnabled = true;

  // Restaurar preferência do usuário salva no navegador
  try {
    const saved = localStorage.getItem('lumina_sfx_enabled');
    if (saved !== null) {
      sfxEnabled = saved === 'true';
    }
  } catch (e) {
    // Modo privado/restrito
  }

  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function play(kind) {
    if (!sfxEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      switch (kind) {
        case 'hover':
          // Blip sutil ao passar o cursor sobre cards/botões
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(700, now + 0.05);
          gain.gain.setValueAtTime(0.025, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
          break;

        case 'click':
        case 'select':
          // Clique tátil e futurista
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.exponentialRampToValueAtTime(960, now + 0.09);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
          osc.start(now);
          osc.stop(now + 0.09);
          break;

        case 'modalOpen':
          // Sweep cinematográfico ao abrir modal
          osc.type = 'sine';
          osc.frequency.setValueAtTime(260, now);
          osc.frequency.exponentialRampToValueAtTime(620, now + 0.22);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
          osc.start(now);
          osc.stop(now + 0.22);
          break;

        case 'modalClose':
          // Fechamento suave
          osc.type = 'sine';
          osc.frequency.setValueAtTime(540, now);
          osc.frequency.exponentialRampToValueAtTime(220, now + 0.15);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          osc.start(now);
          osc.stop(now + 0.15);
          break;

        case 'favorite':
          // Brilho cintilante ao favoritar jogo
          osc.type = 'sine';
          osc.frequency.setValueAtTime(659.25, now); // E5
          osc.frequency.setValueAtTime(987.77, now + 0.08); // B5
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
          break;

        case 'launch':
          // Fanfarra triunfal rápida ao clicar em "Jogar Agora"
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.setValueAtTime(554.37, now + 0.07);
          osc.frequency.setValueAtTime(659.25, now + 0.14);
          osc.frequency.setValueAtTime(880, now + 0.21);
          gain.gain.setValueAtTime(0.07, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.35);
          break;
      }
    } catch (e) {
      // Ignora restrições silenciosamente
    }
  }

  function toggle() {
    sfxEnabled = !sfxEnabled;
    try {
      localStorage.setItem('lumina_sfx_enabled', sfxEnabled);
    } catch (e) {}
    if (sfxEnabled) play('click');
    return sfxEnabled;
  }

  function isEnabled() {
    return sfxEnabled;
  }

  return {
    play,
    toggle,
    isEnabled
  };
})();
