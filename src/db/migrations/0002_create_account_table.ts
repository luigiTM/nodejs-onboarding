import type { Knex } from "knex";
import { Tables } from "../enums/tables";

export async function up(knex: Knex) {
  return knex.schema.createTable(Tables.account, (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid()).index();
    table.uuid("user_id").references("id").inTable("user").index();
    table.integer("currency_id").references("id").inTable("currency");
    table.specificType("balance", "money").defaultTo(0);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(Tables.account);
}
