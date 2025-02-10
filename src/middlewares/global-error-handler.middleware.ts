import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorHandler } from "./error-handler";
import { EmailAlreadyInUseError } from "../errors/email-already-in-use.error";
import { ZodError } from "zod";

export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}

  public handleError = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    let status: number = StatusCodes.INTERNAL_SERVER_ERROR;
    let messages: string[] = [];
    if (error instanceof ZodError) {
      status = StatusCodes.UNPROCESSABLE_ENTITY;
      messages = this.createValidationErrorMessage(error);
    } else if (error instanceof EmailAlreadyInUseError) {
      status = StatusCodes.CONFLICT;
      messages.push(error.message);
    } else {
      console.log(error);
      messages.push("Something went wrong");
    }
    response.status(status).send({ messages: messages });
  };

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

export const globalErrorHandler = new GlobalErrorHandler();
