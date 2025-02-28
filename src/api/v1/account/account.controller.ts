import { inject, injectable } from "inversify";
import { userDtoSchema } from "../../../dtos/user/user.dto";
import { safeExecute } from "../../../util/utils";
import { Request, Response } from "express";
import { AccountServiceImpl } from "../../../services/impl/account.service.impl";
import { AccountService } from "../../../services/account.service";

@injectable()
export class AccountController {
  constructor(@inject(AccountServiceImpl) public readonly service: AccountService) {}

  getAccounts = safeExecute(async (request: Request, response: Response) => {
    const userDto = request.userDto;
    const validUserDto = userDtoSchema.parse(userDto);
    const userAccounts = await this.service.getAccounts(validUserDto.id);
    response.send({ accounts: userAccounts });
  });
}
