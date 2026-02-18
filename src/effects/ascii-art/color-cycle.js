import { BaseEffect } from '../base-effect.js';

/**
 * Color Cycle effect - HSL color rotation per character
 * Creates rainbow wave effects across ASCII art
 */
export class ColorCycleEffect extends BaseEffect {
  #speed = 0.001;
  #spread = 10;
  #saturation = 70;
  #lightness = 50;

  constructor(config = {}) {
    super(config);
    this.#speed = config.speed || 0.001;
    this.#spread = config.spread || 10;
    this.#saturation = config.saturation || 70;
    this.#lightness = config.lightness || 50;
  }

  render(text, elapsed, context = {}) {
    // Wrap each character in span with color
    const lines = text.split('\n');
    let charIndex = 0;
    const time = elapsed * this.#speed;

    const colored = lines.map((line, lineIndex) => {
      return line.split('').map((char, colIndex) => {
        if (char === ' ') return char;
        
        const hue = (time + (charIndex * this.#spread)) % 360;
        charIndex++;
        
        return `<span style="color: hsl(${hue}, ${this.#saturation}%, ${this.#lightness}%)">${char}</span>`;
      }).join('');
    });

    // Return HTML with special marker
    const html = colored.join('<br>');
    return { __html: html, __text: text };
  }
}
