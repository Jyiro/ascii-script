import { describe, it, expect, beforeEach } from 'vitest';
import { Registry } from '../../../src/core/registry.js';

describe('Registry', () => {
  let registry;

  beforeEach(() => {
    registry = new Registry();
  });

  it('should create registry instance', () => {
    expect(registry).toBeDefined();
    expect(registry.size).toBe(0);
  });

  it('should create unique IDs', () => {
    const id1 = registry.createId('text');
    const id2 = registry.createId('text');
    expect(id1).not.toBe(id2);
    expect(id1).toMatch(/^text-\d+$/);
  });

  it('should add and get instances', () => {
    const instance = { name: 'test' };
    const id = 'test-1';

    registry.add(id, instance);
    expect(registry.get(id)).toBe(instance);
    expect(registry.size).toBe(1);
  });

  it('should remove instances', () => {
    const instance = { name: 'test' };
    const id = 'test-1';

    registry.add(id, instance);
    expect(registry.remove(id)).toBe(true);
    expect(registry.get(id)).toBeUndefined();
    expect(registry.size).toBe(0);
  });

  it('should clear all instances', () => {
    registry.add('test-1', { name: 'test1' });
    registry.add('test-2', { name: 'test2' });
    expect(registry.size).toBe(2);

    registry.clear();
    expect(registry.size).toBe(0);
  });

  it('should get all instances', () => {
    registry.add('test-1', { name: 'test1' });
    registry.add('test-2', { name: 'test2' });

    const all = registry.getAll();
    expect(all.size).toBe(2);
    expect(all.get('test-1').name).toBe('test1');
  });
});
