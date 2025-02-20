import bcrypt from "bcrypt";
import { AuthService } from "./auth.service";

export class AuthServiceImpl implements AuthService {
  constructor() {}
  public async hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, 12);
  }
}

export const authServiceImpl = new AuthServiceImpl();
