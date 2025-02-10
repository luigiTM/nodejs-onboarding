import { Request, Response } from "express";
import { userServiceImpl } from "../../../services/impl/user.service.impl";
import { UserService } from "../../../services/user.service";
import { createUserDtoSchema } from "../../../dtos/user/create-user.dto";
import { userLoginSchema } from "../../../dtos/user/user-login.dto";
import { safeExecute } from "../../../util/utils";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = userServiceImpl;
  }

  createUser = safeExecute(async (request: Request, response: Response) => {
    const userToCreate = request.body;
    createUserDtoSchema.parse(userToCreate);
    const createdUser = await this.userService.create(userToCreate);
    response.send(createdUser);
  });

  login = safeExecute(async (request: Request, response: Response) => {
    const userLogin = request.body;
    userLoginSchema.parse(userLogin);
    const token = await this.userService.login(userLogin);
    response.cookie("authcookie", token, { maxAge: 3600000, httpOnly: true });
    response.send({ token: token });
  });
}

export const userController = new UserController();
