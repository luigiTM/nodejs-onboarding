import { inject, injectable } from "inversify";
import { AccountServiceImpl } from "../../../services/impl/account.service.impl";
import { AccountService } from "../../../services/account.service";

@injectable()
export class AccountController {
  constructor(@inject(AccountServiceImpl) public readonly service: AccountService) {}
}
