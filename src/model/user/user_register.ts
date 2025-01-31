import { Model } from "objection";
import { Tables } from "../../db/tables";

export default class UserRegister extends Model {
  static tableName = Tables.user;
  name!: string;
  password!: string;
  static jsonSchema = {
    type: "object",
    required: ["name", "password"],
    properties: {
      name: { type: "string" },
      password: { type: "string" },
    },
  };
}
