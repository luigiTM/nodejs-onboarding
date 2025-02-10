import { Knex } from "knex";

export async function seed(knex: Knex) {
  // First, delete all records in the database
  await knex("transaction").del();
  await knex("account").del();
  await knex("currency").del();
  await knex("user").del();
}
