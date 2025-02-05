import { Request, Response } from "express";
import { userServiceImpl } from "../../../services/impl/user.service.impl";
import { Service } from "../../../services/entity.service";
import User from "../../../model/user";
import { CreateUserDto } from "../../../dtos/user/create-user.dto";
import { UserDto } from "../../../dtos/user/user.dto";
import { ZodError } from "zod";

export class UserController {
  private userService: Service<CreateUserDto, User>;

  constructor() {
    this.userService = userServiceImpl;
  }

  public async createUser(request: Request, response: Response) {
    try {
      let createdUser = await this.userService.create(request.body);
      const { password, ...userDto }: UserDto & { password: string } =
        createdUser;
      response.send(userDto);
    } catch (error) {
      if (error instanceof ZodError) {
        const response_messages = this.createErrorMessage(error);
        response.status(422).send({ messages: response_messages });
      } else {
        console.log(error);
        response.status(500).send({ message: "Something went wrong" });
      }
    }
  }

  private createErrorMessage(zodError: ZodError): string[] {
    let response_messages: string[] = [];
    zodError.issues.forEach((issue) => {
      if (issue.message == "Required") {
        response_messages.push(`Field ${issue.path} is required`);
      }
    });
    return response_messages;
  }
}

export const userController = new UserController();
