import { Knex } from "knex";
import { AccountDto } from "../dtos/account/account.dto";
import { CreateAccountDto } from "../dtos/account/create-account.dto";
import { Service } from "./entity.service";

export interface AccountService extends Service<string, CreateAccountDto, AccountDto, Knex.Transaction> {
  getAccounts(userId: string, dbTransaction?: Knex.Transaction): Promise<AccountDto[]>;
  updateAccountBalance(accountId: string, newBalance: number, dbTransaction?: Knex.Transaction): Promise<void>;
}
