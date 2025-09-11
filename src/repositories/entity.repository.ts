export interface Repository<U, T, K, Q> {
  insert(entity: T, dbTransaction?: Q): Promise<K>;
  getById(entityId: U, dbTransaction?: Q): Promise<K | undefined>;
}
