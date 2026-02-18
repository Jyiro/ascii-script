import { BaseEffect } from '../base-effect.js';

/**
 * Perspective effect - 3D CSS transform illusion
 * Creates depth effect for ASCII art
 */
export class PerspectiveEffect extends BaseEffect {
  #rotateX = 0;
  #rotateY = 0;
  #rotateZ = 0;
  #perspective = 1000;
  #speed = 0.001;

  constructor(config = {}) {
    super(config);
    this.#rotateX = config.rotateX || 0;
    this.#rotateY = config.rotateY || 0;
    this.#rotateZ = config.rotateZ || 0;
    this.#perspective = config.perspective || 1000;
    this.#speed = config.speed || 0.001;
  }

  render(text, elapsed, context = {}) {
    const element = context.element;
    if (!element) return text;

    const time = elapsed * this.#speed;
    const rx = this.#rotateX * Math.sin(time);
    const ry = this.#rotateY * Math.cos(time);
    const rz = this.#rotateZ * Math.sin(time * 0.5);

    element.style.perspective = `${this.#perspective}px`;
    element.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
    element.style.transformStyle = 'preserve-3d';

    return text;
  }
}
