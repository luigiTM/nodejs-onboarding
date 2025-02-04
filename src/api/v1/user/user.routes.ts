import express from "express";
import { UserController, userController } from "./user.controller";

class UserRoutes {
  private userController: UserController;
  private userRouter: express.Router;

  constructor() {
    this.userController = userController;
    this.userRouter = express.Router();
    this.setRoutes();
  }

  /**
   * Router Getter
   * Call from main app.ts using
   * `this.app.use('/users', userRouter.getRouter());`
   * @returns {express.Router} router
   */
  public getRouter(): express.Router {
    return this.userRouter;
  }

  /**
   * Router Setter
   * Routes GET, POST, etc..
   * Example:
   * this.userRouter.get('/:id', this.userController.getUserById);
   */
  private setRoutes() {
    this.userRouter.post("/signin", this.userController.createUser);
  }
}

export const userRouter = new UserRoutes();
