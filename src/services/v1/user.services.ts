import { ValidationError } from "objection";
import UserRegister from "../../model/user/user_register";
import {
  userRepository,
  UserRepository,
} from "../../repositories/user.repositories";
import { authService, AuthService } from "./auth.service";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = userRepository;
  }

  public async createUser(user: UserRegister) {
    try {
      user.password = await authService.hashPassword(user.password);
      await userRepository.insertUser(user);
      return;
      // Create accounts
    } catch (error) {
      if (error instanceof ValidationError) {
      } else {
      }
    }
  }
}

export const userService = new UserService();
