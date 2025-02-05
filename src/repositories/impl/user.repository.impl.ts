import knex_connector from "../../db/knex.connector";
import { CreateUserDto } from "../../dtos/user/create-user.dto";
import User from "../../model/user";
import { Repository } from "../entity.repository";

export class UserRepositoryImpl implements Repository<CreateUserDto, User> {
  constructor() {
    User.knex(knex_connector);
  }

  public async insert(user: User): Promise<User> {
    return await User.query().insert(user);
  }
}

export const userRepositoryImpl = new UserRepositoryImpl();
