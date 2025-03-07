export interface Cache<T> {
  setValue(key: string, value: T): void;
  getValue(key: string): T | undefined;
  haveValue(key: string): boolean;
}
