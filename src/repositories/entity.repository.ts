export interface Repository<U, T, K, Q> {
  insert(entity: T, transaction?: Q): Promise<K>;
  getById(entityId: U, transaction?: Q): Promise<K | undefined>;
}
