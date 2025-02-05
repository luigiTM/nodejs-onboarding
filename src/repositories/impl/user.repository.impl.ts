import knex_connector from "../../db/knex.connector";
import NewUser from "../../model/user/new_user";
import { UserRepository } from "../user.repository";

export class UserRepositoryImpl implements UserRepository {
  constructor() {
    NewUser.knex(knex_connector);
  }

  public async insertUser(user: NewUser): Promise<NewUser> {
    return await NewUser.query().insert(user);
  }
}

export const userRepositoryImpl = new UserRepositoryImpl();
