import express from "express";
import env from "../config";
import cors from "cors";
import morgan from "morgan";
import { userRouter } from "./v1/user/user.routes";
import { Model } from "objection";
import knex_connector from "../db/knex.connector";

export class App {
  private app = express();

  constructor() {
    this.setRoutes();
    Model.knex(knex_connector);
  }

  private setRoutes() {
    // Logs the requests
    this.app.use(morgan("dev"));

    // Allows the server to receive json
    this.app.use(express.json());

    // Allows the use of queries on the URL
    this.app.use(express.urlencoded({ extended: true }));

    // Enables CORS
    this.app.use(cors());

    // Routes are defined here
    // Health check that returns the API version
    this.app.get("/healthcheck", (_, response, __) => {
      response.send(`API version ${env.API_VERSION}`);
      return;
    });
    // User routes
    this.app.use("/user", userRouter.getRouter());
    // This should be the last route so that the endpoints that have not been implemented yet match this condition.
    // We use all here to match all the HTTP verbs
    this.app.all("*", (_, response, __) => {
      response.status(404).send("Oops! Page Not Found");
      return;
    });
  }

  public start() {
    this.app.listen(env.PORT, () => {
      console.log(`Starting ${env.NODE_ENV} server on port ${env.PORT}`);
    });
  }
}
