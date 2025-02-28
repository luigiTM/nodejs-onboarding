import { inject, injectable } from "inversify";
import { AccountDto, toDto } from "../../dtos/account/account.dto";
import { CreateAccountDto } from "../../dtos/account/create-account.dto";
import { AccountRepository } from "../../repositories/account.repository";
import { AccountRepositoryImpl } from "../../repositories/impl/account.repository.impl";
import { AccountService } from "../account.service";
import { UpdateError } from "../../errors/update.error";

@injectable()
export class AccountServiceImpl implements AccountService {
  constructor(@inject(AccountRepositoryImpl) public readonly repository: AccountRepository) {}

  async create(newAccount: CreateAccountDto): Promise<AccountDto> {
    const result = await this.repository.insert(newAccount);
    return toDto(result);
  }

  async getAccounts(userId: string): Promise<AccountDto[]> {
    const accounts = await this.repository.getAccountsByUser(userId);
    return accounts.map((account) => toDto(account));
  }

  async getAccountById(accountId: string): Promise<AccountDto | undefined> {
    const account = await this.repository.getById(accountId);
    if (account) {
      return toDto(account);
    }
    return undefined;
  }

  async updateAccountBalance(accountId: string, newBalance: number): Promise<void> {
    const affectedRows = await this.repository.updateAccountBalance(accountId, newBalance);
    if (affectedRows === 0 || affectedRows > 1) {
      throw new UpdateError(`Invalid number for updated rows: ${affectedRows}`);
    }
  }
}
