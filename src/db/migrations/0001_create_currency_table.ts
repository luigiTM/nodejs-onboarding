import type { Knex } from "knex";
import { Tables } from "../enums/tables";

export async function up(knex: Knex) {
  return knex.schema.createTable(Tables.currency, (table) => {
    table.increments("id").primary().index();
    table.text("acronym").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(Tables.currency);
}
