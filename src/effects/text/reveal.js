import { BaseEffect } from '../base-effect.js';
import { easing } from '../../core/timing.js';

/**
 * Reveal effect - Sequential character unveiling
 */
export class RevealEffect extends BaseEffect {
  #placeholder = '█';
  #easingFn = easing.easeOutCubic;

  constructor(config = {}) {
    super(config);
    this.#placeholder = config.placeholder || '█';
    this.#easingFn = easing[config.easing] || easing.easeOutCubic;
  }

  render(text, elapsed, context = {}) {
    const progress = this.#easingFn(this.getProgress(elapsed));
    const chars = text.split('');
    const revealCount = Math.floor(chars.length * progress);

    return chars.map((char, i) => {
      if (i < revealCount) return char;
      if (char === ' ' || char === '\n') return char;
      return this.#placeholder;
    }).join('');
  }
}
