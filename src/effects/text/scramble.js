import { BaseEffect } from '../base-effect.js';
import { easing } from '../../core/timing.js';

/**
 * Scramble effect - Random character replacement with progressive reveal
 */
export class ScrambleEffect extends BaseEffect {
  #charset = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
  #revealMode = 'progressive'; // 'progressive' | 'random'
  #easingFn = easing.easeOutQuad;

  constructor(config = {}) {
    super(config);
    this.#charset = config.charset || this.#charset;
    this.#revealMode = config.revealMode || 'progressive';
    this.#easingFn = easing[config.easing] || easing.easeOutQuad;
  }

  render(text, elapsed, context = {}) {
    const progress = this.#easingFn(this.getProgress(elapsed));
    const chars = text.split('');

    if (this.#revealMode === 'progressive') {
      return this.#renderProgressive(chars, progress);
    } else {
      return this.#renderRandom(chars, progress);
    }
  }

  #renderProgressive(chars, progress) {
    const revealCount = Math.floor(chars.length * progress);
    
    return chars.map((char, i) => {
      if (i < revealCount) return char; // Revealed
      if (char === ' ' || char === '\n') return char; // Preserve whitespace
      return this.#randomChar();
    }).join('');
  }

  #renderRandom(chars, progress) {
    return chars.map(char => {
      if (char === ' ' || char === '\n') return char;
      if (Math.random() < progress) return char; // Revealed
      return this.#randomChar();
    }).join('');
  }

  #randomChar() {
    return this.#charset[Math.floor(Math.random() * this.#charset.length)];
  }
}
