import { BaseEffect } from '../base-effect.js';

/**
 * Glitch effect - Character corruption and position offset
 * Creates digital glitch/distortion effect
 */
export class GlitchEffect extends BaseEffect {
  #intensity = 0.1;
  #speed = 0.05;
  #offsetRange = 5;
  #corruptChars = '▓▒░█▀▄';

  constructor(config = {}) {
    super(config);
    this.#intensity = config.intensity || 0.1;
    this.#speed = config.speed || 0.05;
    this.#offsetRange = config.offsetRange || 5;
    this.#corruptChars = config.corruptChars || this.#corruptChars;
  }

  render(text, elapsed, context = {}) {
    const element = context.element;
    const lines = text.split('\n');
    
    const glitched = lines.map((line, i) => {
      // Random line offset
      if (Math.random() < this.#intensity) {
        const offset = Math.floor(Math.random() * this.#offsetRange * 2) - this.#offsetRange;
        const spaces = ' '.repeat(Math.max(0, offset));
        line = spaces + line;
      }

      // Character corruption
      return line.split('').map(char => {
        if (char === ' ' || char === '\n') return char;
        if (Math.random() < this.#intensity) {
          return this.#corruptChars[Math.floor(Math.random() * this.#corruptChars.length)];
        }
        return char;
      }).join('');
    });

    // Apply CSS transform glitch
    if (element && Math.random() < this.#intensity * 0.5) {
      const offsetX = (Math.random() - 0.5) * 4;
      const offsetY = (Math.random() - 0.5) * 4;
      element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    } else if (element) {
      element.style.transform = 'none';
    }

    return glitched.join('\n');
  }
}
