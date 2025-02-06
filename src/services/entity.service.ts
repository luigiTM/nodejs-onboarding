import { Model } from "objection";

export interface Service<T, K extends Model> {
  create(entity: T): Promise<K>;
}
