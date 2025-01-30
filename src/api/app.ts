import express from "express";
import env from "../config";
import cors from "cors";

export class App {
  private app = express();

  constructor() {
    this.setRoutes();
  }

  private setRoutes() {
    this.app.use(cors());
    // Health check that returns the API version
    this.app.get("/healthcheck", (_, response, __) => {
      response.send(`API version ${env.API_VERSION}`);
    });
    // This should be the last route so that the endpoints that have not been implemented yet match this condition.
    this.app.get("*", (_, response, __) => {
      response.status(404).send("Oops! Page Not Found");
    });
  }

  public start() {
    this.app.listen(env.PORT, () => {
      console.log(`Starting ${env.NODE_ENV} server on port ${env.PORT}`);
    });
  }
}
