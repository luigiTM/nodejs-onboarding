import { AccountDto } from "../dtos/account/account.dto";
import { CreateAccountDto } from "../dtos/account/create-account.dto";
import { Service } from "./entity.service";

export interface AccountService extends Service<CreateAccountDto, AccountDto> {
  getAccounts(userId: string): Promise<AccountDto[]>;
  getAccountById(accountId: string): Promise<AccountDto | undefined>;
  updateAccountBalance(accountId: string, newBalance: number): void;
}
