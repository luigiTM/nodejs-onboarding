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
import { InvalidParametersError } from "../../../errors/InvalidParametersError";
import { DataNotFoundError } from "../../../errors/data-not-found.error";
import { z } from "zod";

@injectable()
export class UserController {
  constructor(
    @inject(UserServiceImpl) public readonly service: UserService,
    @inject(AccountServiceImpl) public readonly accountService: AccountService,
  ) {}

  createUser = safeExecute(async (request: Request, response: Response) => {
    const userToCreate = request.body;
    createUserDtoSchema.parse(userToCreate);
    const userCreated = await this.service.create(userToCreate);
    response.send(userCreated);
  });

  login = safeExecute(async (request: Request, response: Response) => {
    const userLogin = request.body;
    userLoginSchema.parse(userLogin);
    const token = await this.service.login(userLogin);
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

  getUserById = safeExecute(async (request: Request, response: Response) => {
    const userId = request.params.userId;
    const result = z.string().uuid().safeParse(userId);
    if (!result.success) {
      throw new InvalidParametersError("Invalid parameter", ["User id not provided or invalid"]);
    }
    const user = await this.service.getById(userId);
    if (!user) {
      throw new DataNotFoundError("User not found");
    }
    response.json(user);
  });
}
