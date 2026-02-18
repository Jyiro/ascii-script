/**
 * Instance registry for managing multiple ASCII instances
 */
export class Registry {
  #instances = new Map();
  #nextId = 1;

  /**
   * Create a new instance ID
   * @param {string} prefix - Instance prefix (e.g., 'text', 'grid')
   * @returns {string} Unique instance ID
   */
  createId(prefix = 'instance') {
    return `${prefix}-${this.#nextId++}`;
  }

  /**
   * Add instance to registry
   * @param {string} id - Instance ID
   * @param {Object} instance - Instance object
   */
  add(id, instance) {
    this.#instances.set(id, instance);
  }

  /**
   * Get instance by ID
   * @param {string} id - Instance ID
   * @returns {Object|undefined} Instance or undefined
   */
  get(id) {
    return this.#instances.get(id);
  }

  /**
   * Remove instance from registry
   * @param {string} id - Instance ID
   * @returns {boolean} True if removed
   */
  remove(id) {
    return this.#instances.delete(id);
  }

  /**
   * Get all instances
   * @returns {Map} All instances
   */
  getAll() {
    return new Map(this.#instances);
  }

  /**
   * Clear all instances
   */
  clear() {
    this.#instances.clear();
  }

  /**
   * Get instance count
   */
  get size() {
    return this.#instances.size;
  }
}
