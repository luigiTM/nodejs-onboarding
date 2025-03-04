import { Knex } from "knex";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import User from "../model/user";
import { Repository } from "./entity.repository";

export interface UserRepository extends Repository<string, CreateUserDto, User, Knex.Transaction> {
  findByEmail(email: string, transaction?: Knex.Transaction): Promise<User | undefined>;
}
