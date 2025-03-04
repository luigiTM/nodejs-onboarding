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

  getById(entityId: string): Promise<Transaction | undefined> {
    throw new Error("Method not implemented.");
  }

  async insert(newTransaction: CreateTransactionDto, transaction?: Knex.Transaction): Promise<Transaction> {
    if (transaction) {
      return await Transaction.query(transaction).insert(newTransaction);
    }
    return await Transaction.query().insert(newTransaction);
  }
}
