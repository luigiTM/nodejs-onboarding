import { authServiceImpl } from "./auth.service.impl";
import { AuthService } from "../auth.service";
import { userRepositoryImpl } from "../../repositories/impl/user.repository.impl";
import { Service } from "../entity.service";
import User from "../../model/user";
import {
  CreateUserDto,
  createUserDtoSchema,
} from "../../dtos/user/create-user.dto";
import { CreateAccountDto } from "../../dtos/account/create-account.dto";
import Account from "../../model/account";
import { Currencies } from "../../enums/currencies";
import { accountServiceImpl } from "./account.service.impl";
import { UserService } from "../user.service";
import { UserLoginDto, userLoginSchema } from "../../dtos/user/user-login.dto";
import { UserRepository } from "../../repositories/user.respository";

export class UserServiceImpl implements UserService {
  private authService: AuthService;
  private accountService: Service<CreateAccountDto, Account>;
  private userRepository: UserRepository;

  constructor() {
    this.authService = authServiceImpl;
    this.userRepository = userRepositoryImpl;
    this.accountService = accountServiceImpl;
  }

  async create(newUser: CreateUserDto): Promise<User> {
    createUserDtoSchema.parse(newUser);
    newUser.password = await this.authService.hashPassword(newUser.password);
    let createdUser = await this.userRepository.insert(newUser);
    // Create the accounts associated with the user
    [Currencies.UYU, Currencies.USD, Currencies.EUR].forEach((currency_id) => {
      this.accountService.create({
        user_id: createdUser.id,
        currency_id,
        balance: 5000,
      });
    });
    return createdUser;
  }

  login(userLogin: UserLoginDto): string {
    userLoginSchema.parse(userLogin);
    const user = this.userRepository.findByEmail(userLogin.email);
  }
}

export const userServiceImpl = new UserServiceImpl();
