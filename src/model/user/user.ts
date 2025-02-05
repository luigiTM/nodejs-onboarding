import { Model } from "objection";
import { Tables } from "../../enums/tables";

export default class User extends Model {
  static tableName = Tables.user;
  id!: string;
  name!: string;
}
