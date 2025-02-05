import type { Knex } from "knex";
import { Tables } from "../../enums/tables";

export async function up(knex: Knex) {
  return knex.schema.createTable(Tables.transaction, (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid()).index();
    table.uuid("source_account").references("id").inTable("account").index();
    table
      .uuid("destination_account")
      .references("id")
      .inTable("account")
      .index();
    table.specificType("amount", "money").notNullable();
    table.string("description", 150);
    table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(Tables.transaction);
}
