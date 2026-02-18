import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Engine } from '../../../src/core/engine.js';

describe('Engine', () => {
  let engine;

  beforeEach(() => {
    engine = new Engine();
  });

  afterEach(() => {
    engine.stop();
  });

  it('should create engine instance', () => {
    expect(engine).toBeDefined();
    expect(engine.isRunning).toBe(false);
  });

  it('should start and stop rendering loop', () => {
    engine.start();
    expect(engine.isRunning).toBe(true);

    engine.stop();
    expect(engine.isRunning).toBe(false);
  });

  it('should register and unregister instances', () => {
    const instance = {
      active: true,
      update: () => {}
    };

    engine.register('test-1', instance);
    expect(engine.instanceCount).toBe(1);

    engine.unregister('test-1');
    expect(engine.instanceCount).toBe(0);
  });

  it('should update active instances', () => {
    return new Promise((resolve) => {
      const instance = {
        active: true,
        update: (time, delta) => {
          expect(time).toBeGreaterThan(0);
          expect(delta).toBeGreaterThanOrEqual(0);
          engine.stop();
          resolve();
        }
      };

      engine.register('test-1', instance);
      engine.start();
    });
  });

  it('should not update inactive instances', () => {
    return new Promise((resolve) => {
      let updateCalled = false;
      const instance = {
        active: false,
        update: () => {
          updateCalled = true;
        }
      };

      engine.register('test-1', instance);
      engine.start();

      setTimeout(() => {
        engine.stop();
        expect(updateCalled).toBe(false);
        resolve();
      }, 50);
    });
  });
});
