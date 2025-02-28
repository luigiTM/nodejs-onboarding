import { inject, injectable } from "inversify";
import { CreateTransactionDto } from "../../dtos/transaction/create-transaction.dto";
import { Repository } from "../entity.repository";
import { Knex } from "knex";
import { DatabaseConnector } from "../../db/database.connector";
import { KnexConnector } from "../../db/knex/knex.connector";
import Transaction from "../../model/transaction";

@injectable()
export class TransactionRepositoryImpl implements Repository<string, CreateTransactionDto, Transaction> {
  constructor(@inject(KnexConnector) public readonly knexConnector: DatabaseConnector<Knex>) {
    Transaction.knex(knexConnector.getConnector());
  }

  async insert(newTransaction: CreateTransactionDto): Promise<Transaction> {
    return await Transaction.query().insert(newTransaction);
  }

  getById(entityId: string): Promise<Transaction | undefined> {
    throw new Error("Method not implemented.");
  }
}
