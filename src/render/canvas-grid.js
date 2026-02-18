import { BaseInstance } from './base-instance.js';

/**
 * Canvas-based procedural ASCII background grid
 */
export class CanvasGrid extends BaseInstance {
  #canvas = null;
  #ctx = null;
  #cols = 80;
  #rows = 40;
  #charset = ' .:-=+*#%@';
  #cellWidth = 10;
  #cellHeight = 16;
  #grid = [];
  #generator = null;

  constructor(id, element, config = {}) {
    super(id, element);

    this.#cols = config.cols || 80;
    this.#rows = config.rows || 40;
    this.#charset = config.charset || ' .:-=+*#%@';
    this.#cellWidth = config.cellWidth || 10;
    this.#cellHeight = config.cellHeight || 16;
    this.#generator = config.generator || this.#defaultGenerator;

    this.#setup();
  }

  /**
   * Setup canvas
   * @private
   */
  #setup() {
    this.#canvas = document.createElement('canvas');
    this.#ctx = this.#canvas.getContext('2d');

    this.#canvas.width = this.#cols * this.#cellWidth;
    this.#canvas.height = this.#rows * this.#cellHeight;
    this.#canvas.style.width = '100%';
    this.#canvas.style.height = '100%';

    this.#ctx.font = `${this.#cellHeight}px monospace`;
    this.#ctx.textBaseline = 'top';

    this.element.innerHTML = '';
    this.element.appendChild(this.#canvas);

    // Initialize grid
    this.#grid = Array(this.#rows).fill(null).map(() => 
      Array(this.#cols).fill(0)
    );
  }

  /**
   * Default noise generator
   * @private
   */
  #defaultGenerator = (x, y, time) => {
    const noise = Math.sin(x * 0.1 + time * 0.001) * 
                  Math.cos(y * 0.1 + time * 0.001);
    return (noise + 1) / 2; // Normalize to 0-1
  };

  /**
   * Map value to character
   * @private
   */
  #valueToChar(value) {
    // Clamp value to 0-1 range
    const clampedValue = Math.max(0, Math.min(1, value));
    
    // Convert string to array to handle Unicode properly
    const chars = Array.from(this.#charset);
    const index = Math.floor(clampedValue * (chars.length - 1));
    
    return chars[index] || ' ';
  }

  /**
   * Render grid
   * @param {number} time - Current time
   * @param {number} delta - Delta time
   */
  render(time, delta) {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.fillStyle = getComputedStyle(this.element).color || '#000';

    // Generate and render grid
    for (let y = 0; y < this.#rows; y++) {
      for (let x = 0; x < this.#cols; x++) {
        const value = this.#generator(x, y, time);
        const char = this.#valueToChar(value);
        
        this.#ctx.fillText(
          char,
          x * this.#cellWidth,
          y * this.#cellHeight
        );
      }
    }
  }

  /**
   * Set custom generator function
   * @param {Function} fn - Generator function (x, y, time) => 0-1
   */
  setGenerator(fn) {
    this.#generator = fn;
    return this;
  }

  /**
   * Set charset
   * @param {string} chars - Character set
   */
  setCharset(chars) {
    this.#charset = chars;
    return this;
  }
}
