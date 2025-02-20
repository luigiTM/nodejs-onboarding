import { Request, Response } from "express";
import { UserService } from "../../../services/user.service";
import { createUserDtoSchema } from "../../../dtos/user/create-user.dto";
import { userLoginSchema } from "../../../dtos/user/user-login.dto";
import { safeExecute } from "../../../util/utils";
import { inject, injectable } from "inversify";
import { UserServiceImpl } from "../../../services/impl/user.service.impl";

@injectable()
export class UserController {
  constructor(@inject(UserServiceImpl) public readonly userService: UserService) {}

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
}
