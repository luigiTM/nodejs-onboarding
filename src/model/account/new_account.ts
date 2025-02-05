import { Model, ModelObject } from "objection";
import { Tables } from "../../enums/tables";

export default class NewAccount extends Model {
  static tableName = Tables.account;
  user_id!: string;
  currency_id!: number;
  balance!: number;
}

export type NewAccountShape = ModelObject<NewAccount>;
