import { Model } from "objection";
import { CreateDto } from "../dtos/create.dto";

export interface Service<T extends CreateDto, K extends Model> {
  create(entity: T): Promise<K>;
}
