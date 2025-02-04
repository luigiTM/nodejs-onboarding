import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("currency").insert([
    {
      id: 1,
      acronym: "UYU",
    },
    {
      id: 2,
      acronym: "USD",
    },
    {
      id: 3,
      acronym: "EUR",
    },
  ]);
}
