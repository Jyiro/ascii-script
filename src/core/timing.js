/**
 * Timing utilities for frame control and easing
 */

/**
 * Calculate progress between 0 and 1
 * @param {number} startTime - Animation start time
 * @param {number} currentTime - Current time
 * @param {number} duration - Animation duration in ms
 * @returns {number} Progress (0-1, clamped)
 */
export function getProgress(startTime, currentTime, duration) {
  if (duration === 0) return 1;
  const elapsed = currentTime - startTime;
  return Math.min(Math.max(elapsed / duration, 0), 1);
}

/**
 * Easing functions
 */
export const easing = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => (--t) * t * t + 1,
  easeInOutCubic: (t) => 
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
};

/**
 * Frame rate limiter
 */
export class FrameLimiter {
  #targetFps = 60;
  #frameInterval = 1000 / 60;
  #lastFrameTime = null;

  constructor(fps = 60) {
    this.#targetFps = fps;
    this.#frameInterval = 1000 / fps;
  }

  /**
   * Check if frame should be rendered
   * @param {number} currentTime - Current time
   * @returns {boolean} True if frame should render
   */
  shouldRender(currentTime) {
    // Initialize on first call
    if (this.#lastFrameTime === null) {
      this.#lastFrameTime = currentTime;
      return true;
    }
    
    if (currentTime - this.#lastFrameTime >= this.#frameInterval) {
      this.#lastFrameTime = currentTime;
      return true;
    }
    return false;
  }

  /**
   * Set target FPS
   * @param {number} fps - Target frames per second
   */
  setFps(fps) {
    this.#targetFps = fps;
    this.#frameInterval = 1000 / fps;
  }
}
