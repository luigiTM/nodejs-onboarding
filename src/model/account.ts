import { Model } from "objection";
import { Tables } from "../db/enums/tables";
import User from "./user";
import Currency from "./currency";
import Transaction from "./transaction";

export default class Account extends Model {
  static tableName = Tables.account;
  id!: string;
  user!: User;
  currency!: Currency;
  balance!: number;

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "account.user_id",
        to: "user.id",
      },
    },
    currency: {
      relation: Model.HasOneRelation,
      modelClass: Currency,
      join: {
        from: "account.currency_id",
        to: "currency.id",
      },
    },
    transactionsSent: {
      relation: Model.HasManyRelation,
      modelClass: Transaction,
      join: {
        from: "account.id",
        to: "transaction.source_account_id",
      },
    },
    transactionsReceived: {
      relation: Model.HasManyRelation,
      modelClass: Transaction,
      join: {
        from: "account.id",
        to: "transaction.destination_account_id",
      },
    },
  });
}
