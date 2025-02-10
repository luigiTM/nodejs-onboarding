import { authServiceImpl } from "../../api/auth/auth.service.impl";
import { AuthService } from "../../api/auth/auth.service";
import { userRepositoryImpl } from "../../repositories/impl/user.repository.impl";
import { Service } from "../entity.service";
import { CreateUserDto } from "../../dtos/user/create-user.dto";
import { CreateAccountDto } from "../../dtos/account/create-account.dto";
import Account from "../../model/account";
import { Currencies } from "../../enums/currencies";
import { accountServiceImpl } from "./account.service.impl";
import { UserLoginDto } from "../../dtos/user/user-login.dto";
import { UserRepository } from "../../repositories/user.respository";
import { toDto, UserDto } from "../../dtos/user/user.dto";
import { UserService } from "../user.service";
import { UserOrPasswordError } from "../../errors/user-or-password.error";

export class UserServiceImpl implements UserService {
  private authService: AuthService;
  private accountService: Service<CreateAccountDto, Account>;
  private userRepository: UserRepository;

  constructor() {
    this.authService = authServiceImpl;
    this.userRepository = userRepositoryImpl;
    this.accountService = accountServiceImpl;
  }

  public async create(newUser: CreateUserDto): Promise<UserDto> {
    newUser.password = await this.authService.hashPassword(newUser.password);
    const createdUser = await this.userRepository.insert(newUser);
    // Create the accounts associated with the user
    [Currencies.UYU, Currencies.USD, Currencies.EUR].forEach((currency_id) => {
      this.accountService.create({
        user_id: createdUser.id,
        currency_id,
        balance: 5000,
      });
    });
    return toDto(createdUser);
  }

  async login(userLogin: UserLoginDto): Promise<string> {
    const user = await this.userRepository.findByEmail(userLogin.email);
    if (!user) {
      throw new UserOrPasswordError();
    }
    const isValidPassword = await this.authService.comparePassword(userLogin.password, user.password);
    if (!isValidPassword) {
      throw new UserOrPasswordError();
    }
    return await this.authService.createToken(user);
  }
}

export const userServiceImpl = new UserServiceImpl();
