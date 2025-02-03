import { Knex } from "knex";
import env from "../../config";

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
};

export default config;
