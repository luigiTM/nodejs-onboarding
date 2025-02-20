import { NextFunction, Request, Response } from "express";
import { userServiceImpl } from "../../../services/impl/user.service.impl";
import { Service } from "../../../services/entity.service";
import {
  CreateUserDto,
  createUserDtoSchema,
} from "../../../dtos/user/create-user.dto";
import { UserDto } from "../../../dtos/user/user.dto";

export class UserController {
  private userService: Service<CreateUserDto, UserDto>;

  constructor() {
    this.userService = userServiceImpl;
  }

  public async createUser(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const userToCreate = request.body;
      createUserDtoSchema.parse(userToCreate);
      let createdUser = await this.userService.create(userToCreate);
      response.send(createdUser);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
