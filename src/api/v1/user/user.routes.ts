import { UserController } from "./user.controller";
import { BaseRoutes } from "../base.routes";
import { inject, injectable } from "inversify";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

@injectable()
export class UserRoutes extends BaseRoutes<UserController> {
  constructor(
    @inject(UserController) public readonly userController: UserController,
    @inject(AuthMiddleware) public readonly authMiddleware: AuthMiddleware,
  ) {
    super(userController);
    this.setRoutes();
  }

  protected setRoutes(): void {
    this.router.post("/signup", this.controller.createUser.bind(this.controller));
    this.router.post("/login", this.controller.login.bind(this.controller));
    this.router.use(this.authMiddleware.protect.bind(this.authMiddleware));
    this.router.get("/:userId/accounts", this.controller.getAccounts.bind(this.controller));
  }
}
