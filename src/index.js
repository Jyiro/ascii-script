/**
 * ASCII-SCRIPT - Micro-library for ASCII rendering and animation
 * Main API entry point
 */

import { Engine } from './core/engine.js';
import { Registry } from './core/registry.js';
import { TextBlock } from './render/text-block.js';
import { CanvasGrid } from './render/canvas-grid.js';
import { presets } from './presets.js';

/**
 * Main AsciiFX class
 */
class AsciiFX {
  #engine = null;
  #registry = null;
  #autoStart = true;

  constructor(config = {}) {
    this.#engine = new Engine();
    this.#registry = new Registry();
    this.#autoStart = config.autoStart !== false;

    if (this.#autoStart) {
      this.#engine.start();
    }
  }

  /**
   * Create ASCII art text block
   * @param {string|HTMLElement} selector - Element or selector
   * @param {Object} config - Configuration
   * @returns {TextBlockAPI} Text block API
   */
  createArt(selector, config = {}) {
    const element = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector;

    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    const id = this.#registry.createId('text');
    const block = new TextBlock(id, element, config);

    this.#registry.add(id, block);
    this.#engine.register(id, block);

    return new TextBlockAPI(block, this);
  }

  /**
   * Create text block (alias for createArt)
   */
  createText(selector, config = {}) {
    return this.createArt(selector, config);
  }

  /**
   * Create procedural canvas background
   * @param {string|HTMLElement} selector - Element or selector
   * @param {Object} config - Configuration
   * @returns {CanvasGridAPI} Canvas grid API
   */
  createBackground(selector, config = {}) {
    const element = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector;

    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    const id = this.#registry.createId('grid');
    const grid = new CanvasGrid(id, element, config);

    this.#registry.add(id, grid);
    this.#engine.register(id, grid);

    return new CanvasGridAPI(grid, this);
  }

  /**
   * Start engine
   */
  start() {
    this.#engine.start();
    return this;
  }

  /**
   * Stop engine
   */
  stop() {
    this.#engine.stop();
    return this;
  }

  /**
   * Get instance by ID
   */
  getInstance(id) {
    return this.#registry.get(id);
  }

  /**
   * Destroy instance
   */
  destroy(id) {
    this.#engine.unregister(id);
    this.#registry.remove(id);
    return this;
  }

  /**
   * Get presets
   */
  get presets() {
    return presets;
  }
}

/**
 * TextBlock API wrapper
 */
class TextBlockAPI {
  #block;
  #asciiFX;

  constructor(block, asciiFX) {
    this.#block = block;
    this.#asciiFX = asciiFX;
  }

  /**
   * Apply effect
   * @param {Object} effect - Effect instance
   * @param {Object} options - Options
   * @param {boolean} options.replace - Replace existing effects (default: true)
   */
  async useEffect(effect, options) {
    await this.#block.useEffect(effect, options);
    return this;
  }

  /**
   * Apply preset
   */
  async preset(name, config = {}) {
    const presetFn = presets[name];
    if (!presetFn) {
      throw new Error(`Preset not found: ${name}`);
    }

    const effects = await presetFn(config);
    // First effect replaces, rest append
    for (let i = 0; i < effects.length; i++) {
      await this.#block.useEffect(effects[i], { replace: i === 0 });
    }

    return this;
  }

  /**
   * Fluent API for effects
   */
  async wave(config) {
    const { WaveEffect } = await import('./effects/ascii-art/wave.js');
    return this.useEffect(new WaveEffect(config), { replace: false });
  }

  async colorCycle(config) {
    const { ColorCycleEffect } = await import('./effects/ascii-art/color-cycle.js');
    return this.useEffect(new ColorCycleEffect(config), { replace: false });
  }

  async colorGradient(config) {
    const { ColorGradientEffect } = await import('./effects/ascii-art/color-gradient.js');
    return this.useEffect(new ColorGradientEffect(config), { replace: false });
  }

  async pulse(config) {
    const { PulseEffect } = await import('./effects/ascii-art/pulse.js');
    return this.useEffect(new PulseEffect(config), { replace: false });
  }

  async perspective(config) {
    const { PerspectiveEffect } = await import('./effects/ascii-art/perspective.js');
    return this.useEffect(new PerspectiveEffect(config), { replace: false });
  }

  async scramble(config) {
    const { ScrambleEffect } = await import('./effects/text/scramble.js');
    return this.useEffect(new ScrambleEffect(config), { replace: false });
  }

  async reveal(config) {
    const { RevealEffect } = await import('./effects/text/reveal.js');
    return this.useEffect(new RevealEffect(config), { replace: false });
  }

  async glitch(config) {
    const { GlitchEffect } = await import('./effects/text/glitch.js');
    return this.useEffect(new GlitchEffect(config), { replace: false });
  }

  async typewriter(config) {
    const { TypewriterEffect } = await import('./effects/text/typewriter.js');
    return this.useEffect(new TypewriterEffect(config), { replace: false });
  }

  async matrix(config) {
    const { MatrixRainEffect } = await import('./effects/text/matrix-rain.js');
    return this.useEffect(new MatrixRainEffect(config), { replace: false });
  }

  /**
   * Clear all effects
   */
  clearEffects() {
    this.#block.clearEffects();
    return this;
  }

  /**
   * Reset to original state
   */
  reset() {
    this.#block.reset();
    return this;
  }

  /**
   * Control methods
   */
  play() {
    this.#block.play();
    return this;
  }

  pause() {
    this.#block.pause();
    return this;
  }

  stop() {
    this.#block.stop();
    return this;
  }

  destroy() {
    this.#block.stop();
    this.#asciiFX.destroy(this.#block.id);
    return this;
  }

  /**
   * Event handlers
   */
  on(event, callback) {
    this.#block.on(event, callback);
    return this;
  }

  /**
   * Get instance
   */
  get instance() {
    return this.#block;
  }

  /**
   * Get instance ID
   */
  get id() {
    return this.#block.id;
  }
}

/**
 * CanvasGrid API wrapper
 */
class CanvasGridAPI {
  #grid;
  #asciiFX;

  constructor(grid, asciiFX) {
    this.#grid = grid;
    this.#asciiFX = asciiFX;
  }

  setGenerator(fn) {
    this.#grid.setGenerator(fn);
    return this;
  }

  setCharset(chars) {
    this.#grid.setCharset(chars);
    return this;
  }

  play() {
    this.#grid.play();
    return this;
  }

  pause() {
    this.#grid.pause();
    return this;
  }

  stop() {
    this.#grid.stop();
    return this;
  }

  destroy() {
    this.#grid.stop();
    this.#asciiFX.destroy(this.#grid.id);
    return this;
  }

  on(event, callback) {
    this.#grid.on(event, callback);
    return this;
  }

  get instance() {
    return this.#grid;
  }

  get id() {
    return this.#grid.id;
  }
}

// Export factory function
export function create(config) {
  return new AsciiFX(config);
}

// Export class for advanced usage
export { AsciiFX };

// Default export
export default { create, AsciiFX };
