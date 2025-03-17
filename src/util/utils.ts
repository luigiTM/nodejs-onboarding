import { NextFunction, Request, Response } from "express";
import { InvalidFormatError } from "../errors/invalid-format.error";

export const safeExecute = <T>(execute: (request: Request, response: Response, next: NextFunction) => T | Promise<T>) => {
  return (request: Request, response: Response, next: NextFunction): void => {
    Promise.resolve(execute(request, response, next)).catch(next);
  };
};

export const removeKeys = (obj: Record<string, number>, keys: string[]) => Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));

export const formatStartOfDay = (dateString: string) => {
  const [year, month, day] = getSlices(dateString);
  return `${year}-${month}-${day}T00:00:00.000Z`;
};

export const formatEndOfDay = (dateString: string) => {
  const [year, month, day] = getSlices(dateString);
  return `${year}-${month}-${day}T23:59:59.000Z`;
};

const getSlices = (dateString: string) => {
  if (!/^\d{8}$/.test(dateString)) {
    throw new InvalidFormatError("Invalid date format. Use YYYYMMDD.");
  }
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  return [year, month, day];
};
