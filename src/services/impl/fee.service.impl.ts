import { inject, injectable } from "inversify";
import { FeeService } from "../fee.service";
import { AccountServiceImpl } from "./account.service.impl";
import { AccountService } from "../account.service";
import { Knex } from "knex";
import env from "../../config";
import { UserServiceImpl } from "./user.service.impl";
import { UserService } from "../user.service";
import { DataNotFoundError } from "../../errors/data-not-found.error";

const FEE_PERCENTAGE = env.TRANSACTION_FEE_PERCENTAGE;

@injectable()
export class FeeServiceImpl implements FeeService {
  constructor(
    @inject(AccountServiceImpl) public readonly accountService: AccountService,
    @inject(UserServiceImpl) public readonly userService: UserService,
  ) {}

  calculateFee(amountTransferred: number): number {
    return amountTransferred * FEE_PERCENTAGE;
  }

  async sendFeeToAccount(feeValue: number, currency: string, transaction?: Knex.Transaction): Promise<void> {
    const feesUserAccount = env.FEES_ACCOUNT_EMAIL;
    const user = await this.userService.getUserByEmail(feesUserAccount);
    if (!user) {
      throw new DataNotFoundError("Fees user not found");
    }
    const accounts = await this.accountService.getAccounts(user.id);
    const currencyAccount = accounts.find((account) => account.currency === currency);
    if (!currencyAccount) {
      throw new DataNotFoundError("Fees account not found");
    }
    this.accountService.updateAccountBalance(currencyAccount.id, currencyAccount.balance + feeValue, transaction);
  }
}
