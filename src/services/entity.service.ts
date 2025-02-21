export interface Service<T, K> {
  create(entity: T): Promise<K>;
}
