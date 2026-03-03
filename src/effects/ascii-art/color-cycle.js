import { BaseEffect } from '../base-effect.js';

/**
 * Color Cycle effect - HSL color rotation per character
 * Creates rainbow wave effects across ASCII art
 *
 * Performance strategy: build the span DOM exactly once, giving each span a
 * static per-character hue offset stored as a CSS custom property.  Every
 * subsequent frame we only update a single CSS variable on the container
 * (--ascii-hue-base) — the browser's CSS engine resolves all character
 * colors natively with zero JS DOM churn or GC pressure.
 */
export class ColorCycleEffect extends BaseEffect {
  #speed = 0.001;
  #spread = 10;
  #saturation = 70;
  #lightness = 50;

  // Track the last text we built spans for, so we rebuild only when content changes
  #lastBuiltText = null;
  #lastBuiltHTML = null;

  constructor(config = {}) {
    super(config);
    this.#speed = config.speed || 0.001;
    this.#spread = config.spread || 10;
    this.#saturation = config.saturation || 70;
    this.#lightness = config.lightness || 50;
  }

  render(text, elapsed, context = {}) {
    const time = elapsed * this.#speed;
    const element = context.element;

    // --- Build span structure once (or when text changes) ---
    if (text !== this.#lastBuiltText) {
      this.#lastBuiltText = text;
      const lines = text.split('\n');
      const sat = this.#saturation;
      const light = this.#lightness;
      const spread = this.#spread;
      let charIndex = 0;

      // Each span carries a static --ch-offset so we never need to rebuild the DOM.
      // The actual displayed hue is: calc(var(--ascii-hue-base, 0) + offset)
      const colored = lines.map((line) => {
        return line.split('').map((char) => {
          if (char === ' ') return char;
          const offset = charIndex * spread;
          charIndex++;
          return `<span style="color:hsl(calc(var(--ascii-hue-base,0) + ${offset}),${sat}%,${light}%)">${char}</span>`;
        }).join('');
      });

      this.#lastBuiltHTML = colored.join('<br>');
    }

    // --- Every frame: update ONE CSS variable — O(1), no DOM surgery ---
    if (element) {
      element.style.setProperty('--ascii-hue-base', (time * 360) % 360);
    }

    return { __html: this.#lastBuiltHTML, __text: text };
  }
}
