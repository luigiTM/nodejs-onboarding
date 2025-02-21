import { NextFunction, Request, Response } from "express";

export const safeExecute = <T>(execute: (request: Request, response: Response, next: NextFunction) => T | Promise<T>) => {
  return (request: Request, response: Response, next: NextFunction): void => {
    Promise.resolve(execute(request, response, next)).catch(next);
  };
};
