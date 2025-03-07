import { inject, injectable } from "inversify";
import { CreateTransactionDto } from "../../dtos/transaction/create-transaction.dto";
import { Repository } from "../entity.repository";
import { Knex } from "knex";
import { DatabaseConnector } from "../../db/database.connector";
import { KnexConnector } from "../../db/knex/knex.connector";
import Transaction from "../../model/transaction";

@injectable()
export class TransactionRepositoryImpl implements Repository<string, CreateTransactionDto, Transaction, Knex.Transaction> {
  constructor(@inject(KnexConnector) public readonly knexConnector: DatabaseConnector<Knex>) {
    Transaction.knex(knexConnector.getConnector());
  }

  async getById(entityId: string): Promise<Transaction | undefined> {
    return await Transaction.query().findById(entityId);
  }

  async insert(newTransaction: CreateTransactionDto, dbTransaction?: Knex.Transaction): Promise<Transaction> {
    if (dbTransaction) {
      return await Transaction.query(dbTransaction).insert(newTransaction);
    }
    return await Transaction.query().insert(newTransaction);
  }
}
