/**
 * Core rendering engine for ASCII-SCRIPT
 * Manages requestAnimationFrame loop and instance updates
 */
export class Engine {
  #instances = new Map();
  #running = false;
  #rafId = null;
  #lastTime = 0;

  /**
   * Register an instance to be updated each frame
   * @param {string} id - Unique instance identifier
   * @param {Object} instance - Instance with update() method
   */
  register(id, instance) {
    this.#instances.set(id, instance);
  }

  /**
   * Unregister an instance
   * @param {string} id - Instance identifier
   */
  unregister(id) {
    this.#instances.delete(id);
  }

  /**
   * Start the rendering loop
   */
  start() {
    if (this.#running) return;
    this.#running = true;
    this.#lastTime = performance.now();
    this.#loop();
  }

  /**
   * Stop the rendering loop
   */
  stop() {
    this.#running = false;
    if (this.#rafId) {
      cancelAnimationFrame(this.#rafId);
      this.#rafId = null;
    }
  }

  /**
   * Main render loop
   * @private
   */
  #loop = () => {
    if (!this.#running) return;

    const time = performance.now();
    const delta = time - this.#lastTime;
    this.#lastTime = time;

    // Update all instances
    for (const instance of this.#instances.values()) {
      if (instance.active) {
        instance.update(time, delta);
      }
    }

    this.#rafId = requestAnimationFrame(this.#loop);
  };

  /**
   * Get instance count
   */
  get instanceCount() {
    return this.#instances.size;
  }

  /**
   * Check if engine is running
   */
  get isRunning() {
    return this.#running;
  }
}
