import { Model } from "objection";

export default class User extends Model {
  id!: string;
  name!: string;
  password!: string;
  static tableName = "user";
}
