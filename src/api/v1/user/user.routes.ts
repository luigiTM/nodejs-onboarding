import { UserController } from "./user.controller";
import { BaseRoutes } from "../base.routes";
import { inject, injectable } from "inversify";

@injectable()
export class UserRoutes extends BaseRoutes<UserController> {
  constructor(@inject(UserController) public readonly userController: UserController) {
    super(userController);
    this.setRoutes();
  }

  protected setRoutes(): void {
    this.router.post("/signin", this.controller.createUser.bind(this.controller));
    this.router.post("/login", this.controller.login.bind(this.controller));
  }
}
