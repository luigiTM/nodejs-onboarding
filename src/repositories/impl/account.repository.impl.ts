import knex_connector from "../../db/knex.connector";
import NewAccount from "../../model/account/new_account";
import { AccountRepository } from "../account.repository";

export class AccountRepositoryImpl implements AccountRepository {
  constructor() {
    NewAccount.knex(knex_connector);
  }

  public createAccount(user_id: string, currencies: number[]) {
    currencies.forEach(async (currency) => {
      await NewAccount.query().insert({
        user_id,
        currency_id: currency,
        balance: 0,
      });
    });
  }
}

export const accountRepositoryImpl = new AccountRepositoryImpl();
