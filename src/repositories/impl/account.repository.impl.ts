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

  async insert(newAccount: CreateAccountDto, dbTransaction?: Knex.Transaction): Promise<Account> {
    const queryBuilder = dbTransaction ? Account.query(dbTransaction) : Account.query();
    return await queryBuilder.insert(newAccount).withGraphJoined("[user, currency]");
  }

  async getAccountsByUser(userId: string, dbTransaction?: Knex.Transaction): Promise<Account[]> {
    const queryBuilder = dbTransaction ? Account.query(dbTransaction) : Account.query();
    return await queryBuilder.where("user_id", userId).withGraphJoined("[user, currency]");
  }

  async getById(entityId: string, dbTransaction?: Knex.Transaction): Promise<Account | undefined> {
    const queryBuilder = dbTransaction ? Account.query(dbTransaction) : Account.query();
    return await queryBuilder.findById(entityId).withGraphJoined("[user, currency]");
  }

  async updateAccountBalance(accountId: string, newBalance: number, dbTransaction?: Knex.Transaction): Promise<number> {
    const queryBuilder = dbTransaction ? Account.query(dbTransaction) : Account.query();
    return await queryBuilder.update({ balance: newBalance }).where("id", accountId);
  }
}
