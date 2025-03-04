import { Knex } from "knex";
import { CreateAccountDto } from "../dtos/account/create-account.dto";
import Account from "../model/account";
import { Repository } from "./entity.repository";

export interface AccountRepository extends Repository<string, CreateAccountDto, Account, Knex.Transaction> {
  getAccountsByUser(userId: string, transaction?: Knex.Transaction): Promise<Account[]>;
  updateAccountBalance(accountId: string, newBalance: number, transaction?: Knex.Transaction): Promise<number>;
}
