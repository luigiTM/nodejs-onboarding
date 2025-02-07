import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorHandler } from "./error-handler";
import { ValidationError } from "../errors/validation.error";
import { EmailAlreadyInUseError } from "../errors/email-already-in-use.error";
import { UserOrPasswordError } from "../errors/user-or-password.error";

export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}

  public handleError = (
    error: Error,
    _request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    let status: number = StatusCodes.INTERNAL_SERVER_ERROR;
    let messages: string[] = [];
    if (error instanceof ValidationError) {
      status = StatusCodes.UNPROCESSABLE_ENTITY;
      messages = error.fields;
    } else if (error instanceof EmailAlreadyInUseError) {
      status = StatusCodes.CONFLICT;
      messages.push(error.message);
    } else if (error instanceof UserOrPasswordError) {
      status = StatusCodes.UNAUTHORIZED;
      messages.push(error.message);
    } else {
      console.log(error);
      messages.push("Something went wrong");
    }
    response.status(status).send({ messages: messages });
    next();
  };
}

export const globalErrorHandler = new GlobalErrorHandler();
