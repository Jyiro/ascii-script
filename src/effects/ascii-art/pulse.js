import { BaseEffect } from '../base-effect.js';
import { easing } from '../../core/timing.js';

/**
 * Pulse effect - Breathing scale animation
 * Uses CSS transforms for GPU acceleration
 */
export class PulseEffect extends BaseEffect {
  #minScale = 0.95;
  #maxScale = 1.05;
  #speed = 0.002;
  #easingFn = easing.easeInOutQuad;

  constructor(config = {}) {
    super(config);
    this.#minScale = config.minScale || 0.95;
    this.#maxScale = config.maxScale || 1.05;
    this.#speed = config.speed || 0.002;
    this.#easingFn = easing[config.easing] || easing.easeInOutQuad;
  }

  render(text, elapsed, context = {}) {
    const element = context.element;
    if (!element) return text;

    const time = elapsed * this.#speed;
    const pulse = (Math.sin(time) + 1) / 2; // 0-1
    const scale = this.#minScale + (this.#maxScale - this.#minScale) * pulse;

    element.style.transform = `scale(${scale})`;
    element.style.transformOrigin = 'center';

    return text;
  }
}
