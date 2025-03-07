import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorHandler } from "./error-handler";
import { ZodError } from "zod";
import { EmailAlreadyInUseError } from "../../../errors/email-already-in-use.error";
import { UnauthorizedError } from "../../../errors/unauthorized.error";
import { UserOrPasswordError } from "../../../errors/user-or-password.error";

export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}

  public handleError = (error: Error, _request: Request, response: Response, next: NextFunction) => {
    let status: number = StatusCodes.INTERNAL_SERVER_ERROR;
    let messages: string[] = [];
    if (error instanceof ZodError) {
      status = StatusCodes.UNPROCESSABLE_ENTITY;
      messages = this.createValidationErrorMessage(error);
    } else if (error instanceof EmailAlreadyInUseError) {
      status = StatusCodes.CONFLICT;
      messages.push(error.message);
    } else if (error instanceof UserOrPasswordError) {
      status = StatusCodes.UNAUTHORIZED;
      messages.push(error.message);
    } else if (error instanceof UnauthorizedError) {
      status = StatusCodes.UNAUTHORIZED;
      messages.push(error.message);
    } else {
      console.log(error);
      messages.push("Something went wrong");
    }
    response.status(status).send({ messages: messages });
    next();
  };

  private createValidationErrorMessage(zodError: ZodError): string[] {
    const response_messages: string[] = [];
    zodError.issues.forEach((issue) => {
      if (issue.message == "Required") {
        response_messages.push(`Field ${issue.path} is required`);
      } else if (issue.message.includes("Expected")) {
        response_messages.push(`Field ${issue.path} ${issue.message.toLowerCase()}`);
      }
    });
    return response_messages;
  }
}

export const globalErrorHandler = new GlobalErrorHandler();
