import NewUser, { NewUserShape } from "../../model/user/new_user";
import { UserRepository } from "../../repositories/user.repository";
import { authServiceImpl } from "./auth.service.impl";
import { AccountRepository } from "../../repositories/account.repository";
import { Currencies } from "../../enums/currencies";
import { UserService } from "../user.service";
import { AuthService } from "../auth.service";
import { userRepositoryImpl } from "../../repositories/impl/user.repository.impl";
import { accountRepositoryImpl } from "../../repositories/impl/account.repository.impl";

export class UserServiceImpl implements UserService {
  private authService: AuthService;
  private userRepository: UserRepository;
  private accountRepository: AccountRepository;

  constructor() {
    this.authService = authServiceImpl;
    this.userRepository = userRepositoryImpl;
    this.accountRepository = accountRepositoryImpl;
  }

  public async createUser(user: NewUserShape): Promise<NewUser> {
    user.password = await this.authService.hashPassword(user.password);
    let newUser = await this.userRepository.insertUser(user);
    if (newUser.id) {
      this.accountRepository.createAccount(newUser.id, [
        Currencies.UYU,
        Currencies.USD,
        Currencies.EUR,
      ]);
    }
    return newUser;
  }
}

export const userServiceImpl = new UserServiceImpl();
