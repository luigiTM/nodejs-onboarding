import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import { inject, injectable } from "inversify";
import { AuthService } from "../auth/auth.service";
import { AuthServiceImpl } from "../auth/auth.service.impl";

@injectable()
export class AuthMiddleware {
  constructor(@inject(AuthServiceImpl) public readonly authService: AuthService) {}

  async protect(request: Request, _response: Response, next: NextFunction) {
    const cookies = request.cookies;
    let token: string = "";
    if (cookies) {
      token = cookies["authcookie"];
    } else {
      const requestHeaders = request.headers;
      if (!requestHeaders) {
        next(new UnauthorizedError("Token not found"));
        return;
      }
      const bearer = requestHeaders.authorization;
      if (!bearer) {
        next(new UnauthorizedError("Token not found"));
        return;
      }
      [, token] = bearer.split(" ");
    }
    if (!token) {
      next(new UnauthorizedError("Token not found"));
      return;
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
