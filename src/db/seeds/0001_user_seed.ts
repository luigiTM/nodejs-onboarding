import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("user").insert([
    {
      id: "902870e1-8295-41f6-b459-02cd7a4218e7",
      name: "user 1",
      // Hashed password "password1" using a cost factor of 12
      password: "$2a$12$SIB24sEgDKcCdf0lQpM/f.g7dGoLfMN.uk5MbcJ0giPObVOYKRj1S",
    },
    {
      id: "ea14087b-45f6-4291-8351-34318bc80959",
      name: "user 2",
      // Hashed password "password2" using a cost factor of 12
      password: "$2a$12$i4rdJWQLnuZtzoCiQ19jueosS1nEFfnoXEVsFQiBkbqOfIoTJnpAy",
    },
  ]);
}
