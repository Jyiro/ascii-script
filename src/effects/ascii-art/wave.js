import { BaseEffect } from '../base-effect.js';
import { easing } from '../../core/timing.js';

/**
 * Wave effect - Sine wave displacement per line
 * Creates a horizontal wave motion across ASCII art
 */
export class WaveEffect extends BaseEffect {
  #amplitude = 2;
  #frequency = 0.5;
  #speed = 0.001;
  #easingFn = easing.linear;

  constructor(config = {}) {
    super(config);
    this.#amplitude = config.amplitude || 2;
    this.#frequency = config.frequency || 0.5;
    this.#speed = config.speed || 0.001;
    this.#easingFn = easing[config.easing] || easing.linear;
  }

  render(text, elapsed, context = {}) {
    const lines = text.split('\n');
    const time = elapsed * this.#speed;

    const waved = lines.map((line, i) => {
      const offset = Math.sin(i * this.#frequency + time) * this.#amplitude;
      const spaces = ' '.repeat(Math.max(0, Math.round(offset)));
      return spaces + line;
    });

    return waved.join('\n');
  }
}
