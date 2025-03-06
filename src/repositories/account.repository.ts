import { CreateAccountDto } from "../dtos/account/create-account.dto";
import Account from "../model/account";
import { Repository } from "./entity.repository";

export interface AccountRepository extends Repository<CreateAccountDto, Account> {
  getAccountsByUser(userId: string): Promise<Account[]>;
}
