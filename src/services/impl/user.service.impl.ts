import { AuthService } from "../../api/auth/auth.service";
import { UserRepositoryImpl } from "../../repositories/impl/user.repository.impl";
import { CreateUserDto } from "../../dtos/user/create-user.dto";
import { Currencies } from "../../enums/currencies";
import { UserLoginDto } from "../../dtos/user/user-login.dto";
import { toDto, UserDto } from "../../dtos/user/user.dto";
import { UserService } from "../user.service";
import { UserOrPasswordError } from "../../errors/user-or-password.error";
import { UniqueViolationError } from "objection";
import { EmailAlreadyInUseError } from "../../errors/email-already-in-use.error";
import { inject, injectable } from "inversify";
import { AuthServiceImpl } from "../../api/auth/auth.service.impl";
import { UserRepository } from "../../repositories/user.respository";
import { AccountServiceImpl } from "./account.service.impl";
import { AccountService } from "../account.service";

@injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @inject(AuthServiceImpl) public readonly authService: AuthService,
    @inject(UserRepositoryImpl) public readonly userRepository: UserRepository,
    @inject(AccountServiceImpl) public readonly accountService: AccountService,
  ) {}

  public async create(newUser: CreateUserDto): Promise<UserDto> {
    try {
      newUser.password = await this.authService.hashPassword(newUser.password);
      const createdUser = await this.userRepository.insert(newUser);
      // Create the accounts associated with the user
      [Currencies.UYU, Currencies.USD, Currencies.EUR].forEach((currencyId) => {
        this.accountService.create({
          userId: createdUser.id,
          currencyId,
          balance: 5000,
        });
      });
      return toDto(createdUser);
    } catch (error) {
      if (error instanceof UniqueViolationError) {
        error.columns.forEach((column) => {
          if (column == "email") {
            throw new EmailAlreadyInUseError("There provided email is already in use");
          }
        });
      }
      throw error;
    }
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
