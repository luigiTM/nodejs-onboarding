import { Knex } from "knex";
import { Currencies } from "../../enums/currencies";

export async function seed(knex: Knex) {
  await knex("currency").insert([
    {
      id: Currencies.UYU,
      acronym: "UYU",
    },
    {
      id: Currencies.USD,
      acronym: "USD",
    },
    {
      id: Currencies.EUR,
      acronym: "EUR",
    },
  ]);
}
