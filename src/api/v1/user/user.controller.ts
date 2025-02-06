import { NextFunction, Request, Response } from "express";
import { userServiceImpl } from "../../../services/impl/user.service.impl";
import { UserDto } from "../../../dtos/user/user.dto";
import { UserService } from "../../../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = userServiceImpl;
  }

  async createUser(request: Request, response: Response, next: NextFunction) {
    try {
      let createdUser = await this.userService.create(request.body);
      const { password, ...userDto }: UserDto & { password: string } =
        createdUser;
      response.send(userDto);
    } catch (error) {
      next(error);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    this.userService.login(request.body);
  }
}

export const userController = new UserController();
