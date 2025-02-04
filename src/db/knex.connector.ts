import knex from "knex";
import config from "./knex/knexfile";

const knex_connector = knex(config);

export default knex_connector;
