import { BaseEffect } from '../base-effect.js';

/**
 * Particles effect - ASCII character particles
 * Renders to canvas for better performance
 */
export class ParticlesEffect extends BaseEffect {
  #count = 50;
  #charset = '·•*+';
  #speed = 1;
  #particles = [];
  #canvas = null;
  #ctx = null;
  #initialized = false;

  constructor(config = {}) {
    super(config);
    this.#count = config.count || 50;
    this.#charset = config.charset || this.#charset;
    this.#speed = config.speed || 1;
  }

  render(text, elapsed, context = {}) {
    const element = context.element;
    if (!element) return text;

    if (!this.#initialized) {
      this.#setup(element);
      this.#initialized = true;
    }

    this.#update(elapsed);
    this.#draw();

    return text;
  }

  #setup(element) {
    this.#canvas = document.createElement('canvas');
    this.#ctx = this.#canvas.getContext('2d');

    const rect = element.getBoundingClientRect();
    this.#canvas.width = rect.width;
    this.#canvas.height = rect.height;
    this.#canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;

    element.style.position = 'relative';
    element.appendChild(this.#canvas);

    // Initialize particles
    for (let i = 0; i < this.#count; i++) {
      this.#particles.push(this.#createParticle());
    }
  }

  #createParticle() {
    return {
      x: Math.random() * this.#canvas.width,
      y: Math.random() * this.#canvas.height,
      vx: (Math.random() - 0.5) * this.#speed,
      vy: (Math.random() - 0.5) * this.#speed,
      char: this.#charset[Math.floor(Math.random() * this.#charset.length)],
      opacity: 0.3 + Math.random() * 0.7
    };
  }

  #update(elapsed) {
    this.#particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = this.#canvas.width;
      if (p.x > this.#canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.#canvas.height;
      if (p.y > this.#canvas.height) p.y = 0;
    });
  }

  #draw() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.font = '16px monospace';

    this.#particles.forEach(p => {
      this.#ctx.globalAlpha = p.opacity;
      this.#ctx.fillText(p.char, p.x, p.y);
    });

    this.#ctx.globalAlpha = 1;
  }
}
