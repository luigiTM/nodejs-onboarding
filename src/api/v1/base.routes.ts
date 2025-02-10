import { Router } from "express";

export abstract class BaseRoutes<T> {
  protected controller: T;
  protected router: Router;

  constructor(controller: T) {
    this.controller = controller;
    this.router = Router();
    this.setRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }

  protected abstract setRoutes(): void;
}
