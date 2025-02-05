import { Model } from "objection";
import { Tables } from "../enums/tables";
import Account from "./account/account";

export default class Transaction extends Model {
  static tableName = Tables.transaction;
  id!: string;
  source_account!: Account;
  destination_account!: Account;
  amount!: number;
  description?: string;
  created_at!: Date;
}
