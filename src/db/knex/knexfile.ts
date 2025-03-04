import { Knex } from "knex";
import env from "../../config";
import { knexSnakeCaseMappers } from "objection";
import pg from "pg";

const config: Knex.Config = {
  client: "pg",
  connection: {
    host: `${env.DATABASE_URL}`,
    port: env.DATABASE_PORT,
    user: `${env.DATABASE_USER}`,
    password: `${env.DATABASE_PASSWORD}`,
    database: `${env.DATABASE}`,
  },
  migrations: {
    directory: "./../migrations",
  },
  seeds: {
    directory: "./../seeds",
  },
  ...knexSnakeCaseMappers(),
};

pg.types.setTypeParser(pg.types.builtins.MONEY, (value: string) => {
  return parseFloat(value.replace("$", "").replace(",", ""));
});

export default config;
