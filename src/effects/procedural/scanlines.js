import { BaseEffect } from '../base-effect.js';

/**
 * Scanlines effect - CRT monitor scanlines
 */
export class ScanlinesEffect extends BaseEffect {
  #lineHeight = 2;
  #opacity = 0.1;
  #speed = 0.5;
  #color = 'rgba(0, 0, 0, 0.3)';

  constructor(config = {}) {
    super(config);
    this.#lineHeight = config.lineHeight || 2;
    this.#opacity = config.opacity || 0.1;
    this.#speed = config.speed || 0.5;
    this.#color = config.color || this.#color;
  }

  render(text, elapsed, context = {}) {
    const element = context.element;
    if (!element) return text;

    // Create scanlines overlay
    if (!element.querySelector('.ascii-scanlines')) {
      const overlay = document.createElement('div');
      overlay.className = 'ascii-scanlines';
      overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: repeating-linear-gradient(
          0deg,
          ${this.#color} 0px,
          transparent ${this.#lineHeight}px
        );
        opacity: ${this.#opacity};
        animation: scanlines ${this.#speed}s linear infinite;
      `;

      // Inject animation
      if (!document.getElementById('scanlines-animation')) {
        const style = document.createElement('style');
        style.id = 'scanlines-animation';
        style.textContent = `
          @keyframes scanlines {
            0% { transform: translateY(0); }
            100% { transform: translateY(${this.#lineHeight}px); }
          }
        `;
        document.head.appendChild(style);
      }

      element.style.position = 'relative';
      element.appendChild(overlay);
    }

    return text;
  }
}
