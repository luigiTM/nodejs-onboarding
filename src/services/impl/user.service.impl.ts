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
import { UserLoginDto, userLoginSchema } from "../../dtos/user/user-login.dto";
import { UserRepository } from "../../repositories/user.respository";
import { UserDto } from "../../dtos/user/user.dto";
import { UniqueViolationError } from "objection";
import { EmailAlreadyInUseError } from "../../errors/email-already-in-use.error";
import { UserService } from "../user.service";

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
    try {
      newUser.password = await this.authService.hashPassword(newUser.password);
      let createdUser = await this.userRepository.insert(newUser);
      // Create the accounts associated with the user
      [Currencies.UYU, Currencies.USD, Currencies.EUR].forEach(
        (currency_id) => {
          this.accountService.create({
            user_id: createdUser.id,
            currency_id,
            balance: 5000,
          });
        },
      );
      const { password, ...userDto }: UserDto & { password: string } =
        createdUser;
      return userDto;
    } catch (error) {
      if (error instanceof UniqueViolationError) {
        error.columns.forEach((column) => {
          if (column == "email") {
            throw new EmailAlreadyInUseError(
              "There provided email is already in use",
            );
          }
        });
      }
      throw error;
    }
  }

  login(userLogin: UserLoginDto): string {
    userLoginSchema.parse(userLogin);
    const user = this.userRepository.findByEmail(userLogin.email);
  }
}

export const userServiceImpl = new UserServiceImpl();
