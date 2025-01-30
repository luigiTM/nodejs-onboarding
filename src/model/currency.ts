import { Model } from "objection";
import { Tables } from "../db/tables";

export default class Currency extends Model {
  static tableName = Tables.currency;
  id!: string;
  acronym!: string;
}
