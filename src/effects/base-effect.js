/**
 * Base effect class
 */
export class BaseEffect {
  #config = {};
  #duration = 1000;
  #startTime = 0;

  constructor(config = {}) {
    this.#config = config;
    this.#duration = config.duration || 1000;
  }

  /**
   * Render effect (override in subclasses)
   * @param {string} text - Input text
   * @param {number} elapsed - Time elapsed since start
   * @param {Object} context - Additional context
   * @returns {string} Processed text
   */
  render(text, elapsed, context = {}) {
    throw new Error('render() must be implemented');
  }

  /**
   * Get progress (0-1)
   */
  getProgress(elapsed) {
    return Math.min(elapsed / this.#duration, 1);
  }

  get duration() { return this.#duration; }
  get config() { return this.#config; }
}
