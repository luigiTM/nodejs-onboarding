import { Model } from "objection";
import { Tables } from "../db/enums/tables";
import User from "./user";
import Currency from "./currency";

export default class Account extends Model {
  static tableName = Tables.account;
  id!: string;
  user!: User;
  currency!: Currency;
  balance!: number;

  static relationMappings = () => ({
    user: {
      relation: Model.HasOneRelation,
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
  });
}
