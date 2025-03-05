import { inject, injectable } from "inversify";
import { CreateTransactionDto } from "../../dtos/transaction/create-transaction.dto";
import { TransactionRepositoryImpl } from "../../repositories/impl/transaction.repository";
import Transaction from "../../model/transaction";
import { Repository } from "../../repositories/entity.repository";
import { AccountServiceImpl } from "./account.service.impl";
import { AccountService } from "../account.service";
import { DataNotFoundError } from "../../errors/data-not-found.error";
import { TransactionService } from "../transaction.service";
import { UserDto } from "../../dtos/user/user.dto";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import { InsufficientBalanceError } from "../../errors/insufficient-balance.error";
import { Transactional } from "../../decorators/transactional.decorator";
import { Knex } from "knex";
import { ConversionServiceImpl } from "./conversion.service.impl";
import { ConversionService } from "../conversion.service";

// The transaction fee to transfer to an account that does not belong to the current user
const TRANSACTION_FEE = 0.01;

@injectable()
export class TransactionServiceImpl implements TransactionService {
  constructor(
    @inject(TransactionRepositoryImpl) public readonly transactionRepository: Repository<string, CreateTransactionDto, Transaction, Knex.Transaction>,
    @inject(AccountServiceImpl) public readonly accountService: AccountService,
    @inject(ConversionServiceImpl) public readonly conversionService: ConversionService,
  ) {}

  @Transactional()
  async validateAndCreate(userDto: UserDto, newTransaction: CreateTransactionDto, transaction?: Knex.Transaction): Promise<Transaction> {
    const sourceAccount = await this.accountService.getAccountById(newTransaction.sourceAccountId, transaction);
    if (!sourceAccount) {
      throw new DataNotFoundError("Source account not found");
    }
    if (sourceAccount.userId !== userDto.id) {
      throw new UnauthorizedError("Invalid user");
    }
    const destinationAccount = await this.accountService.getAccountById(newTransaction.destinationAccountId, transaction);
    if (!destinationAccount) {
      throw new DataNotFoundError("Destination account not found");
    }
    if (sourceAccount.balance < newTransaction.amount) {
      throw new InsufficientBalanceError("Source account does not have sufficient balance for this transaction");
    }
    const conversionRate = await this.conversionService.getConversionRate(sourceAccount.currency, [destinationAccount.currency]);
    let newSourceAccountBalance = sourceAccount.balance - newTransaction.amount;
    if (sourceAccount.userId !== destinationAccount.userId) {
      newSourceAccountBalance -= TRANSACTION_FEE * newTransaction.amount;
    }
    const newDestinationAccountBalance = destinationAccount.balance + newTransaction.amount * conversionRate.conversionRates[destinationAccount.currency];
    await this.accountService.updateAccountBalance(newTransaction.sourceAccountId, newSourceAccountBalance, transaction);
    await this.accountService.updateAccountBalance(newTransaction.destinationAccountId, newDestinationAccountBalance, transaction);
    return await this.create(newTransaction, transaction);
  }

  async create(newTransaction: CreateTransactionDto, transaction?: Knex.Transaction): Promise<Transaction> {
    return await this.transactionRepository.insert(newTransaction, transaction);
  }
}
