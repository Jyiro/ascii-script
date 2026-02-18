/**
 * Preset effect combinations
 * Lazy-loaded for optimal bundle size
 */

/**
 * Hologram preset - Glitch + Pulse
 */
export async function hologram(config = {}) {
  const { GlitchEffect } = await import('./effects/text/glitch.js');
  const { PulseEffect } = await import('./effects/ascii-art/pulse.js');

  return [
    new GlitchEffect({
      intensity: config.glitchIntensity || 0.08,
      ...config.glitch
    }),
    new PulseEffect({
      minScale: 0.98,
      maxScale: 1.02,
      speed: 0.003,
      ...config.pulse
    })
  ];
}

/**
 * Matrix preset - Matrix Rain + Scanlines
 */
export async function matrix(config = {}) {
  const { MatrixRainEffect } = await import('./effects/text/matrix-rain.js');
  const { ScanlinesEffect } = await import('./effects/procedural/scanlines.js');

  return [
    new MatrixRainEffect({
      speed: 0.1,
      density: 0.05,
      ...config.matrix
    }),
    new ScanlinesEffect({
      opacity: 0.15,
      ...config.scanlines
    })
  ];
}

/**
 * Decrypt preset - Scramble then Reveal
 */
export async function decrypt(config = {}) {
  const { ScrambleEffect } = await import('./effects/text/scramble.js');
  const { RevealEffect } = await import('./effects/text/reveal.js');

  const duration = config.duration || 2000;
  const scrambleDuration = duration * 0.4;
  const revealDuration = duration * 0.6;

  return [
    new ScrambleEffect({
      duration: scrambleDuration,
      revealMode: 'progressive',
      ...config.scramble
    }),
    new RevealEffect({
      duration: revealDuration,
      ...config.reveal
    })
  ];
}

/**
 * Rainbow preset - Wave + Color Cycle
 */
export async function rainbow(config = {}) {
  const { WaveEffect } = await import('./effects/ascii-art/wave.js');
  const { ColorCycleEffect } = await import('./effects/ascii-art/color-cycle.js');

  return [
    new WaveEffect({
      amplitude: 3,
      frequency: 0.3,
      speed: 0.002,
      ...config.wave
    }),
    new ColorCycleEffect({
      speed: 0.002,
      spread: 5,
      saturation: 80,
      lightness: 60,
      ...config.color
    })
  ];
}

/**
 * Terminal preset - Typewriter + Scanlines
 */
export async function terminal(config = {}) {
  const { TypewriterEffect } = await import('./effects/text/typewriter.js');
  const { ScanlinesEffect } = await import('./effects/procedural/scanlines.js');

  return [
    new TypewriterEffect({
      speed: 50,
      showCursor: true,
      ...config.typewriter
    }),
    new ScanlinesEffect({
      opacity: 0.1,
      lineHeight: 2,
      ...config.scanlines
    })
  ];
}

// Export all presets
export const presets = {
  hologram,
  matrix,
  decrypt,
  rainbow,
  terminal
};
