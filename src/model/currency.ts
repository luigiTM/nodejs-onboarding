import { Model } from "objection";
import { Tables } from "../db/enums/tables";

export default class Currency extends Model {
  static tableName = Tables.currency;
  id!: number;
  acronym!: string;
}
