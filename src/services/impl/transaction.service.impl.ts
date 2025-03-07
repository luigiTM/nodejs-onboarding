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
import { FeeServiceImpl } from "./fee.service.impl";
import { FeeService } from "../fee.service";

@injectable()
export class TransactionServiceImpl implements TransactionService {
  constructor(
    @inject(TransactionRepositoryImpl) public readonly transactionRepository: Repository<string, CreateTransactionDto, Transaction, Knex.Transaction>,
    @inject(AccountServiceImpl) public readonly accountService: AccountService,
    @inject(ConversionServiceImpl) public readonly conversionService: ConversionService,
    @inject(FeeServiceImpl) public readonly feeService: FeeService,
  ) {}

  @Transactional()
  async validateAndCreate(userDto: UserDto, newTransaction: CreateTransactionDto, dbTransaction?: Knex.Transaction): Promise<Transaction> {
    const sourceAccount = await this.accountService.getById(newTransaction.sourceAccountId, dbTransaction);
    if (!sourceAccount) {
      throw new DataNotFoundError("Source account not found");
    }
    if (sourceAccount.userId !== userDto.id) {
      throw new UnauthorizedError("Invalid user");
    }
    const destinationAccount = await this.accountService.getById(newTransaction.destinationAccountId, dbTransaction);
    if (!destinationAccount) {
      throw new DataNotFoundError("Destination account not found");
    }
    if (sourceAccount.balance < newTransaction.amount) {
      throw new InsufficientBalanceError("Source account does not have sufficient balance for this transaction");
    }
    const conversionRate = await this.conversionService.getConversionRate(sourceAccount.currency, [destinationAccount.currency]);
    let newSourceAccountBalance = sourceAccount.balance - newTransaction.amount;
    if (sourceAccount.userId !== destinationAccount.userId) {
      const transactionFee = this.feeService.calculateFee(newTransaction.amount);
      newSourceAccountBalance -= transactionFee;
      this.feeService.sendFeeToAccount(transactionFee, sourceAccount.currency, dbTransaction);
    }
    const newDestinationAccountBalance = destinationAccount.balance + newTransaction.amount * conversionRate.conversionRates[destinationAccount.currency];
    await this.accountService.updateAccountBalance(newTransaction.sourceAccountId, newSourceAccountBalance, dbTransaction);
    await this.accountService.updateAccountBalance(newTransaction.destinationAccountId, newDestinationAccountBalance, dbTransaction);
    return await this.create(newTransaction, dbTransaction);
  }

  async create(newTransaction: CreateTransactionDto, dbTransaction?: Knex.Transaction): Promise<Transaction> {
    return await this.transactionRepository.insert(newTransaction, dbTransaction);
  }

  getById(entityId: string, dbTransaction?: Knex.Transaction): Promise<Transaction | undefined> {
    throw new Error("Method not implemented.");
  }
}
