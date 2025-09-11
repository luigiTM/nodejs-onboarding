export interface Service<T, K, Q> {
  create(entity: T, dbTransaction?: Q): Promise<K>;
}
