import knex, { Knex } from "knex";
import { DatabaseConnector } from "../database.connector";
import config from "./knexfile";
import { injectable } from "inversify";

@injectable()
export class KnexConnector implements DatabaseConnector<Knex> {
  connector: Knex;

  constructor() {
    this.connector = knex(config);
  }

  getConnector(): Knex {
    return this.connector;
  }
}
