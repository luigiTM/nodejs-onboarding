import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("user").insert([
    {
      id: "902870e1-8295-41f6-b459-02cd7a4218e7",
      first_name: "Account",
      last_name: "Fees",
      email: "account@fees.com",
      // Hashed password "password1" using a cost factor of 12
      password: "$2a$12$SIB24sEgDKcCdf0lQpM/f.g7dGoLfMN.uk5MbcJ0giPObVOYKRj1S",
    },
  ]);
}
