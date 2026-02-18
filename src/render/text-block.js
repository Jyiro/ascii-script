import { BaseInstance } from './base-instance.js';

/**
 * Text block renderer for ASCII art and text
 * Automatically detects multi-line content and applies proper formatting
 */
export class TextBlock extends BaseInstance {
  #originalText = '';
  #currentText = '';
  #effectChain = [];
  #renderMode = 'auto'; // 'auto', 'dom', 'canvas'
  #threshold = 100; // Line threshold for canvas rendering
  #canvas = null;
  #ctx = null;

  constructor(id, element, config = {}) {
    super(id, element);
    
    this.#originalText = element.textContent || '';
    this.#renderMode = config.renderMode || 'auto';
    this.#threshold = config.threshold || 100;

    this.#setup();
  }

  /**
   * Setup element and detect rendering mode
   * @private
   */
  #setup() {
    const lineCount = this.#originalText.split('\n').length;
    const hasMultiline = this.#originalText.includes('\n');

    // Auto-detect ASCII art
    if (hasMultiline) {
      this.element.style.whiteSpace = 'pre';
      this.element.style.fontFamily = 'monospace';
    }

    // Determine render mode
    if (this.#renderMode === 'auto') {
      this.#renderMode = (lineCount > this.#threshold) ? 'canvas' : 'dom';
    }

    // Setup canvas if needed
    if (this.#renderMode === 'canvas') {
      this.#setupCanvas(lineCount);
    }
  }

  /**
   * Setup canvas for large ASCII art
   * @private
   */
  #setupCanvas(lineCount) {
    this.#canvas = document.createElement('canvas');
    this.#ctx = this.#canvas.getContext('2d');
    
    // Calculate dimensions
    const fontSize = 16; // Default monospace size
    const lineHeight = fontSize * 1.2;
    const maxLineLength = Math.max(
      ...this.#originalText.split('\n').map(l => l.length)
    );

    this.#canvas.width = maxLineLength * (fontSize * 0.6);
    this.#canvas.height = lineCount * lineHeight;
    this.#canvas.style.fontFamily = 'monospace';
    
    this.#ctx.font = `${fontSize}px monospace`;
    this.#ctx.fillStyle = getComputedStyle(this.element).color || '#000';

    this.element.innerHTML = '';
    this.element.appendChild(this.#canvas);
  }

  /**
   * Use an effect
   * @param {Function} effect - Effect function or dynamic import
   * @param {Object} options - Options
   * @param {boolean} options.replace - Replace existing effects (default: true)
   */
  async useEffect(effect, options = {}) {
    const { replace = true } = options;
    
    // Support dynamic imports
    if (typeof effect === 'function' && effect.constructor.name === 'AsyncFunction') {
      effect = await effect();
    }
    
    // Replace mode clears previous effects
    if (replace) {
      this.clearEffects();
    }
    
    this.#effectChain.push(effect);
    return this;
  }

  /**
   * Clear all effects
   */
  clearEffects() {
    // Destroy effects that have cleanup methods
    for (const effect of this.#effectChain) {
      if (typeof effect.destroy === 'function') {
        effect.destroy();
      }
    }
    
    this.#effectChain = [];
    // Reset element to original state
    if (this.element) {
      this.element.style.transform = '';
      this.element.innerHTML = '';
      this.element.textContent = this.#originalText;
    }
    return this;
  }

  /**
   * Reset to original state
   */
  reset() {
    this.stop();
    this.clearEffects();
    return this;
  }

  /**
   * Render text with effects
   * @param {number} time - Current time
   * @param {number} delta - Delta time
   */
  render(time, delta) {
    let text = this.#originalText;
    let hasHTML = false;

    // Apply effect chain
    for (const effect of this.#effectChain) {
      if (typeof effect.render === 'function') {
        const result = effect.render(text, time - this.startTime, {
          originalText: this.#originalText,
          element: this.element
        });
        
        // Handle HTML effects
        if (result && typeof result === 'object' && result.__html) {
          text = result.__text || text;
          this.element.innerHTML = result.__html;
          hasHTML = true;
        } else {
          text = result;
        }
      }
    }

    this.#currentText = text;
    
    // Only update DOM if no HTML effect was applied
    if (!hasHTML) {
      this.#updateDOM();
    }
  }

  /**
   * Update DOM or canvas
   * @private
   */
  #updateDOM() {
    if (this.#renderMode === 'canvas') {
      this.#renderCanvas();
    } else {
      this.element.textContent = this.#currentText;
    }
  }

  /**
   * Render to canvas
   * @private
   */
  #renderCanvas() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    
    const lines = this.#currentText.split('\n');
    const fontSize = 16;
    const lineHeight = fontSize * 1.2;

    lines.forEach((line, i) => {
      this.#ctx.fillText(line, 0, (i + 1) * lineHeight);
    });
  }

  /**
   * Get current text
   */
  get text() {
    return this.#currentText;
  }

  /**
   * Set new text
   */
  set text(value) {
    this.#originalText = value;
    this.#currentText = value;
    this.#updateDOM();
  }
}
