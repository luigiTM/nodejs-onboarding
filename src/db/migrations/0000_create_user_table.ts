import type { Knex } from "knex";
import { Tables } from "../../enums/tables";

export async function up(knex: Knex) {
  return knex.schema.createTable(Tables.user, (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid()).index();
    table.string("first_name", 50).notNullable();
    table.string("last_name", 50).notNullable();
    table.string("email", 50).notNullable().unique();
    table.string("password").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(Tables.user);
}
