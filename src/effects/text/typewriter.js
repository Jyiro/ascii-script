import { BaseEffect } from '../base-effect.js';
import { easing } from '../../core/timing.js';

/**
 * Typewriter effect - Terminal-style typing animation
 */
export class TypewriterEffect extends BaseEffect {
  #speed = 50; // ms per character
  #cursor = '|';
  #showCursor = true;
  #blinkSpeed = 500;

  constructor(config = {}) {
    super(config);
    this.#speed = config.speed || 50;
    this.#cursor = config.cursor || '|';
    this.#showCursor = config.showCursor !== false;
    this.#blinkSpeed = config.blinkSpeed || 500;
  }

  render(text, elapsed, context = {}) {
    const charCount = Math.floor(elapsed / this.#speed);
    const revealed = text.slice(0, Math.min(charCount, text.length));
    
    // Add blinking cursor
    if (this.#showCursor && charCount < text.length) {
      const blink = Math.floor(elapsed / this.#blinkSpeed) % 2 === 0;
      return revealed + (blink ? this.#cursor : '');
    }

    return revealed;
  }
}
