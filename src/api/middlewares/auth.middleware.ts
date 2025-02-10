import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import { AuthService } from "../auth/auth.service";
import { authServiceImpl } from "../auth/auth.service.impl";

export class AuthMiddleware {
  private authService: AuthService;
  constructor() {
    this.authService = authServiceImpl;
  }

  async protect(request: Request, _response: Response, next: NextFunction) {
    const cookies = request.cookies;
    let token: string = "";
    if (cookies) {
      token = cookies["authcookie"];
    } else {
      const requestHeaders = request.headers;
      if (!requestHeaders) {
        throw new UnauthorizedError("Token not found");
      }
      const bearer = requestHeaders.authorization;
      if (!bearer) {
        throw new UnauthorizedError("Token not found");
      }
      [, token] = bearer.split(" ");
    }
    if (!token) {
      throw new UnauthorizedError("Token not found");
    }
    try {
      const result: string | JwtPayload = await this.authService.verify(token);
      if (typeof result !== "string") {
        const { id, firstName, lastName, email } = result;
        request.token = token;
        request.userDto = { id, firstName, lastName, email };
        next();
      } else {
        next(result);
      }
    } catch (error) {
      next(error);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
