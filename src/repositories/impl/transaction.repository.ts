import { inject, injectable } from "inversify";
import { CreateTransactionDto } from "../../dtos/transaction/create-transaction.dto";
import { Knex } from "knex";
import { DatabaseConnector } from "../../db/database.connector";
import { KnexConnector } from "../../db/knex/knex.connector";
import Transaction from "../../model/transaction";
import { TransactionRepository } from "../transaction.repository";
import { PaginationDto } from "../../dtos/common/pagination.dto";

@injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
  constructor(@inject(KnexConnector) public readonly knexConnector: DatabaseConnector<Knex>) {
    Transaction.knex(knexConnector.getConnector());
  }

  async getById(entityId: string, dbTransaction?: Knex.Transaction): Promise<Transaction | undefined> {
    const queryBuilder = dbTransaction ? Transaction.query(dbTransaction) : Transaction.query();
    return await queryBuilder.findById(entityId);
  }

  async insert(newTransaction: CreateTransactionDto, dbTransaction?: Knex.Transaction): Promise<Transaction> {
    const queryBuilder = dbTransaction ? Transaction.query(dbTransaction) : Transaction.query();
    return await queryBuilder.insert(newTransaction);
  }

  async getTransactionsByUser(userId: string, pagination: PaginationDto, dbTransaction?: Knex.Transaction): Promise<Transaction[]> {
    const queryBuilder = dbTransaction ? Transaction.query(dbTransaction) : Transaction.query();
    return await queryBuilder
      .joinRelated("[sourceAccount, destinationAccount]")
      .where("sourceAccount.user_id", userId)
      .orWhere("destinationAccount.user_id", userId)
      .offset(pagination.page * pagination.size)
      .limit(pagination.size)
      .withGraphFetched("sourceAccount")
      .withGraphFetched("destinationAccount");
  }
}
