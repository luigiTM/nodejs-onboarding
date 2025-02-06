import knex_connector from "../../db/knex.connector";
import User from "../../model/user";
import { UserRepository } from "../user.respository";

export class UserRepositoryImpl implements UserRepository {
  constructor() {
    User.knex(knex_connector);
  }

  async insert(user: User): Promise<User> {
    return await User.query().insert(user);
  }

  async findByEmail(user_email: string): Promise<User | undefined> {
    return await User.query().findOne({ email: user_email });
  }
}

export const userRepositoryImpl = new UserRepositoryImpl();
