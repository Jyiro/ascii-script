import { BaseEffect } from '../base-effect.js';

/**
 * Perlin-like noise effect for procedural backgrounds
 */
export class NoiseEffect extends BaseEffect {
  #scale = 0.1;
  #octaves = 3;
  #persistence = 0.5;

  // Frame-level cache for #smoothNoise — many cells share the same integer
  // neighbor coordinates (especially at low scale values), so this avoids
  // recomputing up to 9 #noise() calls for each duplicate (x,y,seed) triple.
  // We invalidate the cache when `time` changes (i.e. on every new frame).
  #smoothCache = new Map();
  #smoothCacheSeed = null;

  constructor(config = {}) {
    super(config);
    this.#scale = config.scale || 0.1;
    this.#octaves = config.octaves || 3;
    this.#persistence = config.persistence || 0.5;
  }

  /**
   * Simple noise function (pseudo-Perlin)
   */
  #noise(x, y, seed = 0) {
    const n = x + y * 57 + seed;
    const noise = (n << 13) ^ n;
    return 1.0 - ((noise * (noise * noise * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0;
  }

  /**
   * Smooth noise with interpolation
   */
  #smoothNoise(x, y, seed) {
    // Cache key: integer coordinates + seed
    // Seed changes per frame — clear stale cache entries
    if (seed !== this.#smoothCacheSeed) {
      this.#smoothCache.clear();
      this.#smoothCacheSeed = seed;
    }

    // Fast integer key: combine x, y with a bitwise-friendly packing.
    // x and y are small integers (bounded by cols/rows * octave frequency).
    const key = `${x},${y}`;
    const cached = this.#smoothCache.get(key);
    if (cached !== undefined) return cached;

    const corners = (
      this.#noise(x - 1, y - 1, seed) + 
      this.#noise(x + 1, y - 1, seed) + 
      this.#noise(x - 1, y + 1, seed) + 
      this.#noise(x + 1, y + 1, seed)
    ) / 16;
    
    const sides = (
      this.#noise(x - 1, y, seed) + 
      this.#noise(x + 1, y, seed) + 
      this.#noise(x, y - 1, seed) + 
      this.#noise(x, y + 1, seed)
    ) / 8;
    
    const center = this.#noise(x, y, seed) / 4;
    
    const result = corners + sides + center;
    this.#smoothCache.set(key, result);
    return result;
  }

  /**
   * Interpolated noise
   */
  #interpolatedNoise(x, y, seed) {
    const intX = Math.floor(x);
    const fracX = x - intX;
    const intY = Math.floor(y);
    const fracY = y - intY;

    const v1 = this.#smoothNoise(intX, intY, seed);
    const v2 = this.#smoothNoise(intX + 1, intY, seed);
    const v3 = this.#smoothNoise(intX, intY + 1, seed);
    const v4 = this.#smoothNoise(intX + 1, intY + 1, seed);

    const i1 = this.#interpolate(v1, v2, fracX);
    const i2 = this.#interpolate(v3, v4, fracX);

    return this.#interpolate(i1, i2, fracY);
  }

  #interpolate(a, b, x) {
    // Cubic Hermite smoothstep: f(x) = x²(3 − 2x)
    // Produces the same smooth S-curve as cosine interpolation
    // but uses only multiplications — no Math.cos, no Math.PI.
    const f = x * x * (3 - 2 * x);
    return a + (b - a) * f;
  }

  /**
   * Generate noise value (0-1) for coordinates
   */
  generate(x, y, time = 0) {
    let total = 0;
    let frequency = this.#scale;
    let amplitude = 1;
    let maxValue = 0;

    for (let i = 0; i < this.#octaves; i++) {
      total += this.#interpolatedNoise(
        x * frequency,
        y * frequency,
        time * 0.001
      ) * amplitude;

      maxValue += amplitude;
      amplitude *= this.#persistence;
      frequency *= 2;
    }

    return (total / maxValue + 1) / 2; // Normalize to 0-1
  }
}
