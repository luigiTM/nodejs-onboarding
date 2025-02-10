import express from "express";
import env from "../config";
import cors from "cors";
import morgan from "morgan";
import { globalErrorHandler } from "../middlewares/global-error-handler.middleware";

export class App {
  private app = express();

  constructor() {
    this.setMiddlewares();
    this.setRoutes();
    this.setErrorHandlers();
  }

  private setMiddlewares() {
    // Middlewares are defined here
    // Logs the requests
    this.app.use(morgan("dev"));

    // Allows the server to receive json
    this.app.use(express.json());

    // Allows the use of queries on the URL
    this.app.use(express.urlencoded({ extended: true }));

    // Enables CORS
    this.app.use(cors());
  }

  private setRoutes() {
    // Routes are defined here
    // Health check that returns the API version
    this.app.get("/healthcheck", (_request, response) => {
      response.send(`API version ${env.API_VERSION}`);
      return;
    });

    // This should be the last route so that the endpoints that have not been implemented yet match this condition.
    // We use all here to match all the HTTP verbs
    this.app.all("*", (_request, response) => {
      response.status(404).send("Oops! Page Not Found");
      return;
    });
  }

  private setErrorHandlers() {
    this.app.use(globalErrorHandler.handleError);
  }

  public start() {
    this.app.listen(env.PORT, () => {
      console.log(`Starting ${env.NODE_ENV} server on port ${env.PORT}`);
    });
  }
}
