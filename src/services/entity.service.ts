import { CreateDto } from "../dtos/create.dto";

export interface Service<T extends CreateDto, K> {
  create(entity: T): Promise<K>;
}
