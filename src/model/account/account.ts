import { Model } from "objection";
import { Tables } from "../../enums/tables";
import User from "../user/user";
import Currency from "../currency";

export default class Account extends Model {
  static tableName = Tables.account;
  id!: string;
  user!: User;
  currency!: Currency;
  balance!: number;
}
