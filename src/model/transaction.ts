import { Model, snakeCaseMappers } from "objection";
import { Tables } from "../db/enums/tables";
import Account from "./account";

export default class Transaction extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }
  static tableName = Tables.transaction;
  id!: string;
  sourceAccount!: Account;
  destinationAccount!: Account;
  amount!: number;
  description?: string;
  createdAt!: Date;

  // static jsonSchema = {
  //   type: "object",
  //   required: ["sourceAccount", "destinationAccount", "amount"],
  //   properties: {
  //     sourceAccount: { type: "string" },
  //     destinationAccount: { type: "string" },
  //     amount: { type: "number" },
  //   },
  // };

  static relationMappings = () => ({
    sourceAccount: {
      relation: Model.HasOneRelation,
      modelClass: Account,
      join: {
        from: "transaction.source_account",
        to: "account.id",
      },
      destinationAccount: {
        relation: Model.HasOneRelation,
        modelClass: Account,
        join: {
          from: "transaction.destination_account",
          to: "account.id",
        },
      },
    },
  });
}
