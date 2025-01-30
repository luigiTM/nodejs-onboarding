import { Model } from "objection";
import { Tables } from "../db/tables";

export default class User extends Model {
  static tableName = Tables.user;
  id!: string;
  name!: string;
}
