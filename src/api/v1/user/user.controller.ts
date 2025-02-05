import { NextFunction, Request, Response } from "express";
import { userServiceImpl } from "../../../services/impl/user.service.impl";
import { Service } from "../../../services/entity.service";
import User from "../../../model/user";
import { CreateUserDto } from "../../../dtos/user/create-user.dto";
import { UserDto } from "../../../dtos/user/user.dto";

export class UserController {
  private userService: Service<CreateUserDto, User>;

  constructor() {
    this.userService = userServiceImpl;
  }

  public async createUser(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      let createdUser = await this.userService.create(request.body);
      const { password, ...userDto }: UserDto & { password: string } =
        createdUser;
      response.send(userDto);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
