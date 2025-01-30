import type { Knex } from "knex";
import { Tables } from "../tables";

export async function up(knex: Knex) {
  return knex.schema.createTable(Tables.user, (table) => {
    table.uuid("id").primary().index();
    table.string("name", 50).notNullable();
    table.string("password").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(Tables.user);
}
