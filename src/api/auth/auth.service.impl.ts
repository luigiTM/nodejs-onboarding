import bcrypt from "bcrypt";
<<<<<<< HEAD
import { AuthService } from "./auth.service";
import User from "../../model/user";
import env from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";
=======
import User from "../../model/user";
import env from "../../config";
import jwt from "jsonwebtoken";
import { AuthService } from "./auth.service";
>>>>>>> 3ae383bae9eeab4d1d28f16b4028ea3011b76179

export class AuthServiceImpl implements AuthService {
  constructor() {}

  async hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, 12);
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async createToken(user: User): Promise<string> {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      env.JWT_SECRET,
    );
  }

  async verify(token: string): Promise<string | JwtPayload> {
    return jwt.verify(token, env.JWT_SECRET);
  }
}

export const authServiceImpl = new AuthServiceImpl();
