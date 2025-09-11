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
import { Knex } from "knex";

@injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @inject(AuthServiceImpl) public readonly authService: AuthService,
    @inject(UserRepositoryImpl) public readonly repository: UserRepository,
    @inject(AccountServiceImpl) public readonly accountService: AccountService,
  ) {}

  public async create(newUser: CreateUserDto): Promise<UserDto> {
    try {
      newUser.password = await this.authService.hashPassword(newUser.password);
      const createdUser = await this.repository.insert(newUser);
      // Create the accounts associated with the user
      const promises = [Currencies.BRL, Currencies.USD, Currencies.EUR].map(async (currencyId) => {
        await this.accountService.create({
          userId: createdUser.id,
          currencyId,
          balance: 5000,
        });
      });
      await Promise.all(promises);
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
    const user = await this.repository.findByEmail(userLogin.email);
    if (!user) {
      throw new UserOrPasswordError();
    }
    const isValidPassword = await this.authService.comparePassword(userLogin.password, user.password);
    if (!isValidPassword) {
      throw new UserOrPasswordError();
    }
    return await this.authService.createToken(user);
  }

  async getUserByEmail(userEmail: string, dbTransaction?: Knex.Transaction): Promise<UserDto | undefined> {
    const user = await this.repository.findByEmail(userEmail, dbTransaction);
    if (user) {
      return toDto(user);
    }
    return undefined;
  }
}
