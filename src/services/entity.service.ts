export interface Service<U, T, K, Q> {
  create(entity: T, dbTransaction?: Q): Promise<K>;
  getById(entityId: U, dbTransaction?: Q): Promise<K | undefined>;
}
