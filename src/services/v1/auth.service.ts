import bcrypt from "bcrypt";

export class AuthService {
  constructor() {}
  public hashPassword(plainPassword: string) {
    return bcrypt.hash(plainPassword, 12);
  }
}

export const authService = new AuthService();
