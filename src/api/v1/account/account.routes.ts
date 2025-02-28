import { inject, injectable } from "inversify";
import { BaseRoutes } from "../base.routes";
import { AccountController } from "./account.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

@injectable()
export class AccountRoutes extends BaseRoutes<AccountController> {
  constructor(
    @inject(AuthMiddleware) public readonly authMiddleware: AuthMiddleware,
    @inject(AccountController) public readonly accountController: AccountController,
  ) {
    super(accountController);
    this.setRoutes();
  }

  protected setRoutes(): void {
    this.router.use(this.authMiddleware.protect.bind(this.authMiddleware));
    this.router.get("", this.accountController.getAccounts.bind(this.accountController));
  }
}
