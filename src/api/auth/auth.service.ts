export interface AuthService {
  hashPassword(plainPassword: string): Promise<string>;
}
