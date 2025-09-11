import { Knex } from "knex";
import { Currencies } from "../../enums/currencies";

export async function seed(knex: Knex) {
  await knex("currency").insert([
    {
      id: Currencies.BRL,
      acronym: "BRL",
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
