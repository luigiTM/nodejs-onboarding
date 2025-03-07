import { inject, injectable } from "inversify";
import User from "../../model/user";
import { UserRepository } from "../user.respository";
import { Knex } from "knex";
import { DatabaseConnector } from "../../db/database.connector";
import { KnexConnector } from "../../db/knex/knex.connector";
import { CreateUserDto } from "../../dtos/user/create-user.dto";

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@inject(KnexConnector) public readonly knexConnector: DatabaseConnector<Knex>) {
    User.knex(knexConnector.getConnector());
  }

  async getById(entityId: string): Promise<User | undefined> {
    return await User.query().findById(entityId);
  }

  async insert(user: CreateUserDto): Promise<User> {
    return await User.query().insert(user);
  }

  async findByEmail(user_email: string): Promise<User | undefined> {
    return await User.query().findOne({ email: user_email });
  }
}
