import bcrypt from "bcrypt";
import { AuthService } from "../auth.service";
import User from "../../model/user";
import env from "../../config";
import jwt from "jsonwebtoken";

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
}

export const authServiceImpl = new AuthServiceImpl();
