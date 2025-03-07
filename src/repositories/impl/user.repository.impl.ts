import { inject, injectable } from "inversify";
import User from "../../model/user";
import { UserRepository } from "../user.respository";
import { Knex } from "knex";
import { DatabaseConnector } from "../../db/database.connector";
import { KnexConnector } from "../../db/knex/knex.connector";

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@inject(KnexConnector) public readonly knexConnector: DatabaseConnector<Knex>) {
    User.knex(knexConnector.getConnector());
  }

  async insert(user: User): Promise<User> {
    return await User.query().insert(user);
  }

  async findByEmail(user_email: string): Promise<User | undefined> {
    return await User.query().findOne({ email: user_email });
  }
}
