import { Model } from "objection";
import { Tables } from "../db/tables";
import User from "./user";
import Currency from "./currency";

export default class Account extends Model {
  static tableName = Tables.account;
  id!: string;
  user_id!: User;
  currency_id!: Currency;
  balance!: number;
}
