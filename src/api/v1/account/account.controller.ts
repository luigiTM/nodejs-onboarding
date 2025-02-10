import { AccountService } from "../../../services/account.service";
import { accountServiceImpl } from "../../../services/impl/account.service.impl";
import { safeExecute } from "../../../util/utils";

export class AccountController {
  private service: AccountService;

  constructor() {
    this.service = accountServiceImpl;
  }
  getAccounts = safeExecute(async (request: Request, response: Response) => {});
}

export const accountController = new AccountController();
