export interface Repository<T, K> {
  insert(entity: T): Promise<K>;
}
