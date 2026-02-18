import { BaseEffect } from '../base-effect.js';
import { easing } from '../../core/timing.js';

/**
 * Wave effect - Sine wave displacement per line
 * Creates a horizontal wave motion across ASCII art
 * Uses character-based displacement to preserve ASCII art integrity
 */
export class WaveEffect extends BaseEffect {
  #amplitude = 3;
  #frequency = 0.8;
  #speed = 0.002;
  #easingFn = easing.linear;

  constructor(config = {}) {
    super(config);
    this.#amplitude = config.amplitude || 3;
    this.#frequency = config.frequency || 0.8;
    this.#speed = config.speed || 0.002;
    this.#easingFn = easing[config.easing] || easing.linear;
  }

  render(text, elapsed, context = {}) {
    const lines = text.split('\n');
    const time = elapsed * this.#speed;

    // Use character-based displacement to preserve ASCII art grid
    const waved = lines.map((line, i) => {
      const offset = Math.sin(i * this.#frequency + time) * this.#amplitude;
      const charOffset = Math.round(offset);
      
      if (charOffset > 0) {
        // Shift right
        return ' '.repeat(charOffset) + line;
      } else if (charOffset < 0) {
        // Shift left by trimming spaces or adding negative margin
        const absOffset = Math.abs(charOffset);
        // Try to trim leading spaces first
        const trimmed = line.replace(/^ {1,}/, (spaces) => {
          const trimAmount = Math.min(spaces.length, absOffset);
          return spaces.slice(trimAmount);
        });
        return trimmed;
      }
      
      return line;
    });

    return waved.join('\n');
  }
}

