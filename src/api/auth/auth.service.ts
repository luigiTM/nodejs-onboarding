import { JwtPayload } from "jsonwebtoken";
import User from "../../model/user";

export interface AuthService {
  hashPassword(plainPassword: string): Promise<string>;
  comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
  createToken(user: User): Promise<string>;
  verify(token: string): Promise<string | JwtPayload>;
}
