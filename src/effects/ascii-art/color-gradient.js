import { BaseEffect } from '../base-effect.js';

/**
 * Color Gradient effect - Creates gradient based on a base color
 * Generates color variations of a single hue
 */
export class ColorGradientEffect extends BaseEffect {
  #baseColor = '#00aaff'; // Azure blue
  #variations = 5;
  #speed = 0.001;
  #mode = 'lightness'; // 'lightness', 'saturation', 'both'

  constructor(config = {}) {
    super(config);
    this.#baseColor = config.baseColor || '#00aaff';
    this.#variations = config.variations || 5;
    this.#speed = config.speed || 0.001;
    this.#mode = config.mode || 'lightness';
  }

  /**
   * Convert hex to HSL
   */
  #hexToHSL(hex) {
    // Remove #
    hex = hex.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  /**
   * Generate color variation
   */
  #getVariation(baseHSL, index, total, time) {
    const { h, s, l } = baseHSL;
    const progress = (index / total) + time;
    
    // Detect if color is grayscale (no saturation)
    const isGrayscale = s < 5;
    
    let newH = h;
    let newS = s;
    let newL = l;
    
    switch (this.#mode) {
      case 'lightness':
        // Vary lightness from dark to light
        newL = 20 + (progress % 1) * 60;
        break;
      
      case 'saturation':
        // If grayscale, cycle through hues instead of using red
        if (isGrayscale) {
          newH = (progress % 1) * 360;
          newS = 30 + (progress % 1) * 70;
        } else {
          // Vary saturation
          newS = 30 + (progress % 1) * 70;
        }
        break;
      
      case 'both':
        // If grayscale, cycle through hues
        if (isGrayscale) {
          newH = (progress % 1) * 360;
          newL = 30 + (Math.sin(progress * Math.PI * 2) * 0.5 + 0.5) * 50;
          newS = 40 + (Math.cos(progress * Math.PI * 2) * 0.5 + 0.5) * 60;
        } else {
          // Vary both
          newL = 30 + (Math.sin(progress * Math.PI * 2) * 0.5 + 0.5) * 50;
          newS = 40 + (Math.cos(progress * Math.PI * 2) * 0.5 + 0.5) * 60;
        }
        break;
      
      case 'hue-shift':
        // Shift hue slightly
        newH = (h + (progress % 1) * 60 - 30 + 360) % 360;
        break;
    }
    
    return `hsl(${newH}, ${newS}%, ${newL}%)`;
  }

  render(text, elapsed, context = {}) {
    const lines = text.split('\n');
    const baseHSL = this.#hexToHSL(this.#baseColor);
    const time = elapsed * this.#speed;
    
    let charIndex = 0;
    const totalChars = text.replace(/\s/g, '').length;
    
    const colored = lines.map((line) => {
      return line.split('').map((char) => {
        if (char === ' ' || char === '\n') return char;
        
        const color = this.#getVariation(baseHSL, charIndex, totalChars, time);
        charIndex++;
        
        return `<span style="color: ${color}">${char}</span>`;
      }).join('');
    });
    
    const html = colored.join('<br>');
    return { __html: html, __text: text };
  }
}
