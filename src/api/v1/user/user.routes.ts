import { Router } from "express";
import { UserController, userController } from "./user.controller";

class UserRoutes {
  private userController: UserController;
  private userRouter: Router;

  constructor() {
    this.userController = userController;
    this.userRouter = Router();
    this.setRoutes();
  }

  /**
   * Router Getter
   * Call from main app.ts using
   * `this.app.use('/users', userRouter.getRouter());`
   * @returns {Router} router
   */
  public getRouter(): Router {
    return this.userRouter;
  }

  /**
   * Router Setter
   * Routes GET, POST, etc..
   * Example:
   * this.userRouter.get('/:id', this.userController.getUserById);
   */
  private setRoutes() {
    this.userRouter.post("/signup", (request, response, next) => {
      this.userController.createUser(request, response, next);
    });
  }
}

export const userRouter = new UserRoutes();
