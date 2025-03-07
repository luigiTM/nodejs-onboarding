import { Knex } from "knex";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UserLoginDto } from "../dtos/user/user-login.dto";
import { UserDto } from "../dtos/user/user.dto";
import { Service } from "./entity.service";

export interface UserService extends Service<CreateUserDto, UserDto, Knex.Transaction> {
  login(userLogin: UserLoginDto, dbTransaction?: Knex.Transaction): Promise<string>;
  getUserByEmail(userEmail: string, dbTransaction?: Knex.Transaction): Promise<UserDto | undefined>;
}
