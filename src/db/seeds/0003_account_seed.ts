import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("account").insert([
    {
      id: "fdf63ff3-3846-431c-aecd-029d6436f86c",
      user_id: "902870e1-8295-41f6-b459-02cd7a4218e7",
      currency_id: "1",
      balance: 0,
    },
    {
      id: "c08ae861-a77b-4758-b255-bb0e34fabecb",
      user_id: "902870e1-8295-41f6-b459-02cd7a4218e7",
      currency_id: "2",
      balance: 0,
    },
    {
      id: "ea14087b-45f6-4291-8351-34318bc80959",
      user_id: "902870e1-8295-41f6-b459-02cd7a4218e7",
      currency_id: "3",
      balance: 0,
    },
  ]);
}
