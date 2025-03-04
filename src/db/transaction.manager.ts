import { Knex } from "knex";
import { KnexConnector } from "./knex/knex.connector";
import { container } from "../util/container";

export class TransactionManager {
  static async run<T>(callback: (trx: Knex.Transaction) => Promise<T>): Promise<T> {
    const transaction = await container.get(KnexConnector).getConnector().transaction();
    console.log("Starting transaction");
    try {
      const result = await callback(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  }
}
