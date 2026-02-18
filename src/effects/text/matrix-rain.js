import { BaseEffect } from '../base-effect.js';

/**
 * Matrix Rain effect - Falling characters like The Matrix
 */
export class MatrixRainEffect extends BaseEffect {
  #charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
  #speed = 0.05;
  #density = 0.05;
  #columns = [];
  #initialized = false;

  constructor(config = {}) {
    super(config);
    this.#charset = config.charset || this.#charset;
    this.#speed = config.speed || 0.05;
    this.#density = config.density || 0.05;
  }

  render(text, elapsed, context = {}) {
    const lines = text.split('\n');
    
    if (!this.#initialized) {
      this.#initColumns(lines[0]?.length || 0);
      this.#initialized = true;
    }

    const result = lines.map((line, lineIndex) => {
      return line.split('').map((char, colIndex) => {
        const column = this.#columns[colIndex];
        if (!column) return char;

        // Update column position
        column.y += this.#speed;
        if (column.y > lines.length) {
          column.y = -Math.random() * 10;
        }

        // Render falling char
        if (Math.abs(lineIndex - column.y) < 1) {
          return this.#randomChar();
        }
        
        // Trail effect
        if (lineIndex > column.y && lineIndex < column.y + 5) {
          return Math.random() < 0.3 ? this.#randomChar() : char;
        }

        return char;
      }).join('');
    });

    return result.join('\n');
  }

  #initColumns(width) {
    this.#columns = Array(width).fill(null).map(() => ({
      y: -Math.random() * 20,
      speed: 0.5 + Math.random() * 0.5
    }));
  }

  #randomChar() {
    return this.#charset[Math.floor(Math.random() * this.#charset.length)];
  }
}
