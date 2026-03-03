/**
 * Core rendering engine for ASCII-SCRIPT
 * Manages requestAnimationFrame loop and instance updates
 */
export class Engine {
  #instances = new Map();
  #running = false;
  #rafId = null;
  #lastTime = 0;
  // Track whether the engine was running before a visibility-change pause
  // so we can correctly resume (or not) when the page becomes visible again.
  #pausedByVisibility = false;

  constructor() {
    // Pause the RAF loop while the browser tab is hidden — no point burning
    // GPU / CPU on animations the user cannot see.
    document.addEventListener('visibilitychange', this.#onVisibilityChange);
  }

  #onVisibilityChange = () => {
    if (document.hidden) {
      if (this.#running) {
        this.#pausedByVisibility = true;
        this.#running = false;
        if (this.#rafId) {
          cancelAnimationFrame(this.#rafId);
          this.#rafId = null;
        }
      }
    } else {
      if (this.#pausedByVisibility) {
        this.#pausedByVisibility = false;
        this.#running = true;
        this.#lastTime = performance.now();
        this.#loop();
      }
    }
  };

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
    this.#pausedByVisibility = false;
    if (this.#rafId) {
      cancelAnimationFrame(this.#rafId);
      this.#rafId = null;
    }
  }

  /**
   * Destroy engine and remove event listeners
   */
  destroy() {
    this.stop();
    document.removeEventListener('visibilitychange', this.#onVisibilityChange);
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
