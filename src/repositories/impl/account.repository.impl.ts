import { inject, injectable } from "inversify";
import { CreateAccountDto } from "../../dtos/account/create-account.dto";
import Account from "../../model/account";
import { AccountRepository } from "../account.repository";
import { KnexConnector } from "../../db/knex/knex.connector";
import { DatabaseConnector } from "../../db/database.connector";
import { Knex } from "knex";

@injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(@inject(KnexConnector) public readonly knexConnector: DatabaseConnector<Knex>) {
    Account.knex(knexConnector.getConnector());
  }

  async insert(newAccount: CreateAccountDto): Promise<Account> {
    return await Account.query().insert(newAccount).withGraphJoined("[user, currency]");
  }

  async getAccountsByUser(userId: string): Promise<Account[]> {
    return await Account.query().where("user_id", userId).withGraphJoined("[user, currency]");
  }

  async getById(entityId: string): Promise<Account | undefined> {
    return await Account.query().findById(entityId).withGraphJoined("[user, currency]");
  }

  async updateAccountBalance(accountId: string, newBalance: number, dbTransaction?: Knex.Transaction): Promise<number> {
    if (dbTransaction) {
      return await Account.query(dbTransaction).update({ balance: newBalance }).where("id", accountId);
    }
    return await Account.query().update({ balance: newBalance }).where("id", accountId);
  }
}
