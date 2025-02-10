import { BaseRoutes } from "../base.routes";
import { accountController, AccountController } from "./account.controller";

class AccountRoutes extends BaseRoutes<AccountController> {
  constructor() {
    super(accountController);
  }
  protected setRoutes(): void {
    this.router.get("/account", (request, response, next) => {
      this.controller.getAccounts(request, response, next);
    });
  }
}

export const accountRoutes = new AccountRoutes();
