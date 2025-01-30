import type { Knex } from "knex";
import { Tables } from "../tables";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(Tables.currency, (table) => {
      table.increments("id").primary().index();
      table.text("acronym").notNullable();
    })
    .then(() => {
      return knex(Tables.currency).insert([
        { acronym: "UYU" },
        { acronym: "USD" },
        { acronym: "EUR" },
      ]);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(Tables.currency);
}
