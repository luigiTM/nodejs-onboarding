import { Request, Response, NextFunction } from "express";

export interface ErrorHandler {
  handleError(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
  ): void;
}
