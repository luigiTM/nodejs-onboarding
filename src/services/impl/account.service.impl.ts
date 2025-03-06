import { inject, injectable } from "inversify";
import { AccountDto, toDto } from "../../dtos/account/account.dto";
import { CreateAccountDto } from "../../dtos/account/create-account.dto";
import { AccountRepository } from "../../repositories/account.repository";
import { AccountRepositoryImpl } from "../../repositories/impl/account.repository.impl";
import { AccountService } from "../account.service";

@injectable()
export class AccountServiceImpl implements AccountService {
  constructor(@inject(AccountRepositoryImpl) public readonly accountRepository: AccountRepository) {}

  async create(newAccount: CreateAccountDto): Promise<AccountDto> {
    const result = await this.accountRepository.insert(newAccount);
    return toDto(result);
  }

  async getAccounts(userId: string): Promise<AccountDto[]> {
    const accounts = await this.accountRepository.getAccountsByUser(userId);
    return accounts.map((account) => toDto(account));
  }
}
