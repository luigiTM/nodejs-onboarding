export interface Service<T, K, Q> {
  create(entity: T, transaction?: Q): Promise<K>;
}
