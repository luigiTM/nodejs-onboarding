import { Request, Response } from "express";
import { UserService, userService } from "../../../services/v1/user.services";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = userService;
  }

  public async createUser(request: Request, response: Response) {
    const result = await userService.createUser(request.body);
    response.send("Ok");
  }
}

export const userController = new UserController();
