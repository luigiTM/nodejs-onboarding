import { CreateUserDto } from "../dtos/user/create-user.dto";
import User from "../model/user";
import { Repository } from "./entity.repository";

export interface UserRepository extends Repository<CreateUserDto, User> {
  findByEmail(email: string): Promise<User | undefined>;
}
