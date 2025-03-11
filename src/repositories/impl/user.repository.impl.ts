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

  async getById(entityId: string, dbTransaction?: Knex.Transaction): Promise<User | undefined> {
    const queryBuilder = dbTransaction ? User.query(dbTransaction) : User.query();
    return await queryBuilder.findById(entityId);
  }

  async insert(user: CreateUserDto, dbTransaction?: Knex.Transaction): Promise<User> {
    const queryBuilder = dbTransaction ? User.query(dbTransaction) : User.query();
    return await queryBuilder.insert(user);
  }

  async findByEmail(user_email: string, dbTransaction?: Knex.Transaction): Promise<User | undefined> {
    const queryBuilder = dbTransaction ? User.query(dbTransaction) : User.query();
    return await queryBuilder.findOne({ email: user_email });
  }
}
