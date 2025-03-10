import { NextFunction, Request, Response } from "express";

export const safeExecute = <T>(execute: (request: Request, response: Response, next: NextFunction) => T | Promise<T>) => {
  return (request: Request, response: Response, next: NextFunction): void => {
    Promise.resolve(execute(request, response, next)).catch(next);
  };
};

export const removeKeys = (obj: Record<string, number>, keys: string[]) => Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));
