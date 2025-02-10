import { Model, snakeCaseMappers } from "objection";
import { Tables } from "../enums/tables";

export default class User extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }
  static tableName = Tables.user;
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  static jsonSchema = {
    type: "object",
    required: ["name", "password"],
    properties: {
      name: { type: "string", minLength: 1, maxLength: 50 },
      password: { type: "string" },
    },
  };
}
