import knexConnector from "../../db/knex.connector";
import { CreateAccountDto } from "../../dtos/account/create-account.dto";
import Account from "../../model/account";
import { Repository } from "../entity.repository";

export class AccountRepositoryImpl
  implements Repository<CreateAccountDto, Account>
{
  constructor() {
    Account.knex(knexConnector);
  }

  public async insert(newAccount: CreateAccountDto): Promise<Account> {
    return await Account.query().insert(newAccount);
  }
}

export const accountRepositoryImpl = new AccountRepositoryImpl();
