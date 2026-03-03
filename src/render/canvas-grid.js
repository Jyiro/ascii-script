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
  // Cached array form of charset — avoids Array.from() on every cell every frame
  #charsetArray = [];
  #cellWidth = 10;
  #cellHeight = 16;
  #grid = [];
  #generator = null;
  // Cached CSS color — getComputedStyle is expensive; only update on change
  #cachedFillStyle = null;
  // Background fill color for opaque canvas context (no alpha blending)
  #bgFillStyle = '#000000';
  // Counter for lazy style re-check (every ~60 frames)
  #styleCheckCounter = 0;
  // Pre-computed pixel positions to avoid multiplication per-cell per-frame
  #cellXPositions = [];
  #cellYPositions = [];

  constructor(id, element, config = {}) {
    super(id, element);

    this.#cols = config.cols || 80;
    this.#rows = config.rows || 40;
    this.#charset = config.charset || ' .:-=+*#%@';
    this.#charsetArray = Array.from(this.#charset);
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
    // { alpha: false } skips per-pixel alpha compositing — big win for opaque grids
    this.#ctx = this.#canvas.getContext('2d', { alpha: false });

    this.#canvas.width = this.#cols * this.#cellWidth;
    this.#canvas.height = this.#rows * this.#cellHeight;
    this.#canvas.style.width = '100%';
    this.#canvas.style.height = '100%';
    // Promote canvas to its own GPU compositor layer
    this.#canvas.style.willChange = 'transform';

    this.#ctx.font = `${this.#cellHeight}px monospace`;
    this.#ctx.textBaseline = 'top';

    this.element.innerHTML = '';
    this.element.appendChild(this.#canvas);

    // Initialize grid
    this.#grid = Array(this.#rows).fill(null).map(() =>
      Array(this.#cols).fill(0)
    );

    // Pre-compute pixel positions — avoids N multiplications per frame
    for (let x = 0; x < this.#cols; x++) {
      this.#cellXPositions[x] = x * this.#cellWidth;
    }
    for (let y = 0; y < this.#rows; y++) {
      this.#cellYPositions[y] = y * this.#cellHeight;
    }

    // Cache initial fill style
    this.#cachedFillStyle = getComputedStyle(this.element).color || '#ffffff';
    this.#ctx.fillStyle = this.#cachedFillStyle;
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
    // Use pre-cached array — no allocation per call
    const index = Math.floor(clampedValue * (this.#charsetArray.length - 1));
    return this.#charsetArray[index] || ' ';
  }

  /**
   * Render grid
   * @param {number} time - Current time
   * @param {number} delta - Delta time
   */
  render(time, delta) {
    // Skip rendering when tab/page is not visible — no need to burn GPU cycles
    if (document.hidden) return;

    // Only call getComputedStyle when the color might have changed (rare)
    // We detect changes lazily: re-check every ~60 frames via a simple counter
    this.#styleCheckCounter++;
    if (this.#styleCheckCounter >= 60) {
      this.#styleCheckCounter = 0;
      const newStyle = getComputedStyle(this.element).color;
      if (newStyle !== this.#cachedFillStyle) {
        this.#cachedFillStyle = newStyle;
        this.#ctx.fillStyle = newStyle;
      }
    }

    const w = this.#canvas.width;
    const h = this.#canvas.height;

    // With alpha:false context, fill background color instead of clearRect
    // This avoids the compositor needing to blend with whatever is behind
    this.#ctx.fillStyle = this.#bgFillStyle || '#000000';
    this.#ctx.fillRect(0, 0, w, h);
    this.#ctx.fillStyle = this.#cachedFillStyle;

    const xPos = this.#cellXPositions;
    const yPos = this.#cellYPositions;
    const rows = this.#rows;
    const cols = this.#cols;

    // Generate and render grid using pre-computed positions
    for (let y = 0; y < rows; y++) {
      const py = yPos[y];
      for (let x = 0; x < cols; x++) {
        const value = this.#generator(x, y, time);
        const char = this.#valueToChar(value);
        this.#ctx.fillText(char, xPos[x], py);
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
   * Set charset — also refreshes the cached array
   * @param {string} chars - Character set
   */
  setCharset(chars) {
    this.#charset = chars;
    this.#charsetArray = Array.from(chars);
    return this;
  }

  /**
   * Set background fill color for the opaque canvas context
   * Defaults to black (#000000). Set to match your page background.
   * @param {string} color - CSS color string
   */
  setBackground(color) {
    this.#bgFillStyle = color;
    return this;
  }
}
