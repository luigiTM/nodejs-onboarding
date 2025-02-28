export interface Repository<U, T, K> {
  insert(entity: T): Promise<K>;
  getById(entityId: U): Promise<K | undefined>;
}
