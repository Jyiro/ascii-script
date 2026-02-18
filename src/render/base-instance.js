/**
 * Base class for all renderable instances
 */
export class BaseInstance {
  #id;
  #element;
  #active = false;
  #effects = [];
  #startTime = null;
  #callbacks = {};

  constructor(id, element) {
    this.#id = id;
    this.#element = element;
  }

  /**
   * Update instance each frame
   * @param {number} time - Current time
   * @param {number} delta - Time since last frame
   */
  update(time, delta) {
    if (!this.#active) return;
    if (!this.#startTime) this.#startTime = time;

    this.render(time, delta);
  }

  /**
   * Render method (override in subclasses)
   * @param {number} time - Current time
   * @param {number} delta - Time since last frame
   */
  render(time, delta) {
    throw new Error('render() must be implemented');
  }

  /**
   * Play/start instance
   */
  play() {
    this.#active = true;
    this.#startTime = null;
    this.#trigger('start');
  }

  /**
   * Pause instance
   */
  pause() {
    this.#active = false;
    this.#trigger('pause');
  }

  /**
   * Stop and reset instance
   */
  stop() {
    this.#active = false;
    this.#startTime = null;
    this.#trigger('stop');
  }

  /**
   * Add event callback
   * @param {string} event - Event name (start, pause, stop, complete, update)
   * @param {Function} callback - Callback function
   */
  on(event, callback) {
    if (!this.#callbacks[event]) {
      this.#callbacks[event] = [];
    }
    this.#callbacks[event].push(callback);
    return this;
  }

  /**
   * Trigger event callbacks
   * @private
   */
  #trigger(event, data) {
    const callbacks = this.#callbacks[event] || [];
    callbacks.forEach(cb => cb(data));
  }

  // Getters
  get id() { return this.#id; }
  get element() { return this.#element; }
  get active() { return this.#active; }
  get startTime() { return this.#startTime; }
  get effects() { return this.#effects; }
}
