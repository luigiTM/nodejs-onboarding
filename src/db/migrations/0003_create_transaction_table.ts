import type { Knex } from "knex";
import { Tables } from "../tables";

export async function up(knex: Knex) {
  return knex.schema.createTable(Tables.transaction, (table) => {
    table.uuid("id").primary().index();
    table.uuid("source_account").references("id").inTable("account");
    table.integer("destination_account").references("id").inTable("account");
    table.specificType("amount", "money").notNullable().checkPositive();
    table.text("description").checkLength("<", 150);
    table.dateTime("created_at").notNullable().defaultTo(new Date());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(Tables.transaction);
}
