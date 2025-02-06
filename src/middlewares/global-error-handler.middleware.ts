import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorHandler } from "./error-handler";
import { ValidationError } from "../errors/validation.error";
import { EmailAlreadyInUseError } from "../errors/email-already-in-use.error";

export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}

  public handleError = (error: Error, _: Request, response: Response) => {
    let status: number = StatusCodes.INTERNAL_SERVER_ERROR;
    let messages: string[] = [];
    if (error instanceof ValidationError) {
      status = StatusCodes.UNPROCESSABLE_ENTITY;
      messages = error.fields;
    } else if (error instanceof EmailAlreadyInUseError) {
      status = StatusCodes.CONFLICT;
      messages.push(error.message);
    } else {
      console.log(error);
      messages.push("Something went wrong");
    }
    response.status(status).send({ messages: messages });
  };
}

export const globalErrorHandler = new GlobalErrorHandler();
