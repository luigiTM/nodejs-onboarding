import { Container } from "inversify";
import { App } from "./api/app";

(async () => {
  try {
    const app = new App(new Container({ autoBindInjectable: true }));
    app.start();
  } catch (err) {
    console.log(`App did not start, error: ${err}`);
  }
})();
