import { CreateAccountDto } from "../../dtos/account/create-account.dto";
import Account from "../../model/account";
import { Repository } from "../../repositories/entity.repository";
import { accountRepositoryImpl } from "../../repositories/impl/account.repository.impl";
import { Service } from "../entity.service";

export class AccountServiceImpl implements Service<CreateAccountDto, Account> {
  private accountRepository: Repository<CreateAccountDto, Account>;

  constructor() {
    this.accountRepository = accountRepositoryImpl;
  }

  async create(newAccount: CreateAccountDto): Promise<Account> {
    return await this.accountRepository.insert(newAccount);
  }
}

export const accountServiceImpl = new AccountServiceImpl();
