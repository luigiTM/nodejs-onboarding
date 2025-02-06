import { NextFunction, Request, Response } from "express";
import { userServiceImpl } from "../../../services/impl/user.service.impl";
import { UserService } from "../../../services/user.service";
import { createUserDtoSchema } from "../../../dtos/user/create-user.dto";
import { ZodError } from "zod";
import { ValidationError } from "../../../errors/validation.error";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = userServiceImpl;
  }

  async createUser(request: Request, response: Response, next: NextFunction) {
    try {
      const userToCreate = request.body;
      createUserDtoSchema.parse(userToCreate);
      let createdUser = await this.userService.create(userToCreate);
      response.send(createdUser);
    } catch (error) {
      if (error instanceof ZodError) {
        next(
          new ValidationError(
            "Validation failed",
            this.createValidationErrorMessage(error),
          ),
        );
      }
      next(error);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    this.userService.login(request.body);
  }

  private createValidationErrorMessage(zodError: ZodError): string[] {
    let response_messages: string[] = [];
    zodError.issues.forEach((issue) => {
      if (issue.message == "Required") {
        response_messages.push(`Field ${issue.path} is required`);
      } else if (issue.message.includes("Expected")) {
        response_messages.push(
          `Field ${issue.path} ${issue.message.toLowerCase()}`,
        );
      }
    });
    return response_messages;
  }
}

export const userController = new UserController();
