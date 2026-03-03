import { BaseEffect } from '../base-effect.js';

/**
 * Matrix Rain effect - Falling characters like The Matrix
 */
export class MatrixRainEffect extends BaseEffect {
  #charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
  // Pre-cached array and length — avoids string indexing and .length lookup per call
  #charsetArray = [];
  #charsetLen = 0;
  #speed = 0.05;
  #density = 0.05;
  #columns = [];
  #initialized = false;

  constructor(config = {}) {
    super(config);
    this.#charset = config.charset || this.#charset;
    this.#charsetArray = this.#charset.split('');
    this.#charsetLen = this.#charsetArray.length;
    this.#speed = config.speed || 0.05;
    this.#density = config.density || 0.05;
  }

  render(text, elapsed, context = {}) {
    const lines = text.split('\n');
    
    if (!this.#initialized) {
      this.#initColumns(lines[0]?.length || 0);
      this.#initialized = true;
    }

    const cols = this.#columns;
    const numLines = lines.length;
    const speed = this.#speed;

    // --- Step 1: advance each column exactly ONCE per frame ---
    for (let c = 0; c < cols.length; c++) {
      const col = cols[c];
      if (!col) continue;
      col.y += speed;
      if (col.y > numLines) {
        col.y = -Math.random() * 10;
      }
    }

    // --- Step 2: render characters using the updated positions ---
    const result = lines.map((line, lineIndex) => {
      return line.split('').map((char, colIndex) => {
        const column = cols[colIndex];
        if (!column) return char;

        // Render falling char head
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
    return this.#charsetArray[Math.floor(Math.random() * this.#charsetLen)];
  }
}
