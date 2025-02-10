import { CreateAccountDto } from "../../dtos/account/create-account.dto";
import { UserDto } from "../../dtos/user/user.dto";
import Account from "../../model/account";
import { Repository } from "../../repositories/entity.repository";
import { accountRepositoryImpl } from "../../repositories/impl/account.repository.impl";
import { AccountService } from "../account.service";

export class AccountServiceImpl implements AccountService {
  private accountRepository: Repository<CreateAccountDto, Account>;

  constructor() {
    this.accountRepository = accountRepositoryImpl;
  }

  async create(newAccount: CreateAccountDto): Promise<Account> {
    return await this.accountRepository.insert(newAccount);
  }

  getAccounts(user: UserDto): Account[] {
    throw new Error("Method not implemented.");
  }
}

export const accountServiceImpl = new AccountServiceImpl();
