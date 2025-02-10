import { UserController, userController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { BaseRoutes } from "../base.routes";

class UserRoutes extends BaseRoutes<UserController> {
  constructor() {
    super(userController);
  }

  protected setRoutes() {
    this.router.post("/signin", (request, response, next) => {
      this.controller.createUser(request, response, next);
    });
    this.router.post("/login", (request, response, next) => {
      this.controller.login(request, response, next);
    });
    this.router.use((request, response, next) => {
      authMiddleware.protect(request, response, next);
    });
  }
}

export const userRouter = new UserRoutes();
