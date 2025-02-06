import { NextFunction, Request, Response } from "express";
import { userServiceImpl } from "../../../services/impl/user.service.impl";
import { UserService } from "../../../services/user.service";
import { createUserDtoSchema } from "../../../dtos/user/create-user.dto";
import { ZodError } from "zod";
import { ValidationError } from "../../../errors/validation.error";
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
    try {
      const userLogin = request.body;
      userLoginSchema.parse(userLogin);
      const token = await this.userService.login(userLogin);
      response.send({ token: token });
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

  private createValidationErrorMessage(zodError: ZodError): string[] {
    const response_messages: string[] = [];
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
