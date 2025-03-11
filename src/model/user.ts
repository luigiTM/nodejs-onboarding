import { Model } from "objection";
import { Tables } from "../db/enums/tables";
import Account from "./account";

export default class User extends Model {
  static tableName = Tables.user;
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;

  static jsonSchema = {
    type: "object",
    required: ["firstName", "lastName", "email", "password"],
    properties: {
      firstName: { type: "string", minLength: 1, maxLength: 50 },
      lastName: { type: "string", minLength: 1, maxLength: 50 },
      name: { type: "string", minLength: 7, maxLength: 50 },
      password: { type: "string" },
    },
  };

  static relationMappings = () => ({
    accounts: {
      relation: Model.HasManyRelation,
      modelClass: Account,
      join: {
        from: "user.id",
        to: "account.user_id",
      },
    },
  });
}
