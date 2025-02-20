import { inject, injectable } from "inversify";
import { userDtoSchema } from "../../../dtos/user/user.dto";
import { UnauthorizedError } from "../../../errors/unauthorized.error";
import { safeExecute } from "../../../util/utils";
import { Request, Response } from "express";
import { AccountServiceImpl } from "../../../services/impl/account.service.impl";
import { AccountService } from "../../../services/account.service";

@injectable()
export class AccountController {
  constructor(@inject(AccountServiceImpl) public readonly service: AccountService) {}
  getAccounts = safeExecute(async (request: Request, response: Response) => {
    const userDto = request.userDto;
    if (!userDto) {
      throw new UnauthorizedError("User not logged in");
    }
    userDtoSchema.parse(userDto);
    const userId = request.params.userId;
    if (userDto.id !== userId) {
      throw new UnauthorizedError("User not logged in");
    }
    const userAccounts = await this.service.getAccounts(userId);
    response.send({ accounts: userAccounts });
  });
}
