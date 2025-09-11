import { Cache } from "./cache";
export class SimpleCache<T> implements Cache<T> {
  private map: Map<string, T>;

  constructor() {
    this.map = new Map<string, T>();
  }

  setValue(name: string, value: T): T {
    this.map.set(name, value);
    return value;
  }

  haveValue(key: string): boolean {
    return this.map.has(key);
  }

  getValue(name: string): T | undefined {
    return this.map.get(name);
  }
}
