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

// This needs to be done because float point numbers returns as string from the database, this line ensures we receive a number
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value: string) => {
  return parseFloat(value);
});

export default config;
