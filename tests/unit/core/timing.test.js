import { describe, it, expect } from 'vitest';
import { getProgress, easing, FrameLimiter } from '../../../src/core/timing.js';

describe('Timing', () => {
  describe('getProgress', () => {
    it('should calculate progress correctly', () => {
      expect(getProgress(0, 0, 1000)).toBe(0);
      expect(getProgress(0, 500, 1000)).toBe(0.5);
      expect(getProgress(0, 1000, 1000)).toBe(1);
      expect(getProgress(0, 1500, 1000)).toBe(1); // Clamped
    });

    it('should handle zero duration', () => {
      expect(getProgress(0, 100, 0)).toBe(1);
    });
  });

  describe('easing', () => {
    it('should have linear easing', () => {
      expect(easing.linear(0.5)).toBe(0.5);
    });

    it('should have quad easing', () => {
      expect(easing.easeInQuad(0.5)).toBe(0.25);
      expect(easing.easeOutQuad(0.5)).toBe(0.75);
    });

    it('should return values between 0 and 1', () => {
      const funcs = Object.values(easing);
      funcs.forEach(fn => {
        expect(fn(0)).toBeGreaterThanOrEqual(0);
        expect(fn(0)).toBeLessThanOrEqual(1);
        expect(fn(1)).toBeGreaterThanOrEqual(0);
        expect(fn(1)).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('FrameLimiter', () => {
    it('should create with default 60fps', () => {
      const limiter = new FrameLimiter();
      expect(limiter).toBeDefined();
    });

    it('should limit frame rate', () => {
      const limiter = new FrameLimiter(60);
      const frameInterval = 1000 / 60;

      // First call initializes lastFrameTime
      expect(limiter.shouldRender(0)).toBe(true);
      // Second call too soon - should reject
      expect(limiter.shouldRender(10)).toBe(false);
      // Third call after interval - should accept
      expect(limiter.shouldRender(frameInterval + 10)).toBe(true);
    });

    it('should update target fps', () => {
      const limiter = new FrameLimiter(60);
      limiter.setFps(30);
      
      const frameInterval = 1000 / 30;
      limiter.shouldRender(0); // Initialize
      expect(limiter.shouldRender(frameInterval + 1)).toBe(true);
    });
  });
});
