import knex from "knex";
import config from "./knex/knexfile";

const knexConnector = knex(config);

export default knexConnector;
