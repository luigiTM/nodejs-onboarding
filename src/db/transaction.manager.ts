import { inject } from "inversify";
import { Knex } from "knex";
import { KnexConnector } from "./knex/knex.connector";
import { DatabaseConnector } from "./database.connector";

export class TransactionManager {
  private transaction: Knex.Transaction | null = null;

  constructor(@inject(KnexConnector) public readonly knexConnector: DatabaseConnector<Knex>) {}

  async run<T>(callback: (trx: Knex.Transaction) => Promise<T>): Promise<T> {
    return await this.knexConnector.getConnector().transaction(async (trx) => {
      this.transaction = trx;
      try {
        const result = await callback(trx);
        await trx.commit();
        return result;
      } catch (error) {
        await trx.rollback();
        throw error;
      } finally {
        this.transaction = null;
      }
    });
  }

  getTransaction(): Knex.Transaction | null {
    return this.transaction;
  }
}
