import { Request, Response } from "express";
import { userServiceImpl } from "../../../services/impl/user.service.impl";
import { UserService } from "../../../services/user.service";
import { ValidationError } from "objection";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = userServiceImpl;
  }

  public async createUser(request: Request, response: Response) {
    try {
      let newUser = await this.userService.createUser(request.body);
      response.send(newUser);
    } catch (error) {
      if (error instanceof ValidationError) {
        response.status(422).send(error.data);
      } else {
        console.log(error);
        response.status(500).send({ message: "Something went wrong" });
      }
    }
  }
}

export const userController = new UserController();
