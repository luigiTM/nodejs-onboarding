import { Request, Response } from "express";
import { UserService } from "../../../services/user.service";
import { createUserDtoSchema } from "../../../dtos/user/create-user.dto";
import { userLoginSchema } from "../../../dtos/user/user-login.dto";
import { safeExecute } from "../../../util/utils";
import { inject, injectable } from "inversify";
import { UserServiceImpl } from "../../../services/impl/user.service.impl";
import { userDtoSchema } from "../../../dtos/user/user.dto";
import { AccountServiceImpl } from "../../../services/impl/account.service.impl";
import { AccountService } from "../../../services/account.service";
import { InvalidUserError } from "../../../errors/invalid-user.error";

@injectable()
export class UserController {
  constructor(
    @inject(UserServiceImpl) public readonly userService: UserService,
    @inject(AccountServiceImpl) public readonly accountService: AccountService,
  ) {}

  createUser = safeExecute(async (request: Request, response: Response) => {
    const userToCreate = request.body;
    createUserDtoSchema.parse(userToCreate);
    const userCreated = await this.userService.create(userToCreate);
    response.send(userCreated);
  });

  login = safeExecute(async (request: Request, response: Response) => {
    const userLogin = request.body;
    userLoginSchema.parse(userLogin);
    const token = await this.userService.login(userLogin);
    response.cookie("authcookie", token, { maxAge: 3600000, httpOnly: true });
    response.send({ token: token });
  });

  getAccounts = safeExecute(async (request: Request, response: Response) => {
    const userDto = request.userDto;
    const validUserDto = userDtoSchema.parse(userDto);
    const userId = request.params.userId;
    if (validUserDto.id !== userId) {
      throw new InvalidUserError("The provided used Id does not match the logged user Id");
    }
    const userAccounts = await this.accountService.getAccounts(validUserDto.id);
    response.send({ accounts: userAccounts });
  });
}
