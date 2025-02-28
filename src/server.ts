import { App } from "./api/app";

(async () => {
  try {
    const app = new App();
    app.start();
  } catch (err) {
    console.log(`App did not start, error: ${err}`);
  }
})();
