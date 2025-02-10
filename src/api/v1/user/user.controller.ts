import { NextFunction, Request, Response } from "express";
import { userServiceImpl } from "../../../services/impl/user.service.impl";
import { UserService } from "../../../services/user.service";
import { createUserDtoSchema } from "../../../dtos/user/create-user.dto";
import { userLoginSchema } from "../../../dtos/user/user-login.dto";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = userServiceImpl;
  }

  async createUser(request: Request, response: Response, next: NextFunction) {
    try {
      const userToCreate = request.body;
      createUserDtoSchema.parse(userToCreate);
      const createdUser = await this.userService.create(userToCreate);
      response.send(createdUser);
    } catch (error) {
      next(error);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const userLogin = request.body;
      userLoginSchema.parse(userLogin);
      const token = await this.userService.login(userLogin);
      response.cookie("authcookie", token, { maxAge: 3600000, httpOnly: true });
      response.send({ token: token });
    } catch (error) {
      next(error);
    }
  }

  getAccounts(request: Request, response: Response, next: NextFunction) {}
}

export const userController = new UserController();
