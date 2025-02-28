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

@injectable()
export class TransactionServiceImpl implements TransactionService {
  constructor(
    @inject(TransactionRepositoryImpl) public readonly transactionRepository: Repository<string, CreateTransactionDto, Transaction>,
    @inject(AccountServiceImpl) public readonly accountService: AccountService,
  ) {}

  async validateNewTransaction(userDto: UserDto, newTransaction: CreateTransactionDto): Promise<void> {
    const sourceAccount = await this.accountService.getAccountById(newTransaction.sourceAccountId);
    if (!sourceAccount) {
      throw new DataNotFoundError("Source account not found");
    }
    if (sourceAccount.userId !== userDto.id) {
      throw new UnauthorizedError("Invalid user");
    }
    const destinationAccount = await this.accountService.getAccountById(newTransaction.destinationAccountId);
    if (!destinationAccount) {
      throw new DataNotFoundError("Destination account not found");
    }
    if (sourceAccount.balance < newTransaction.amount) {
      throw new InsufficientBalanceError("Source account does not have sufficient balance for this transaction");
    }
  }

  async create(newTransaction: CreateTransactionDto): Promise<Transaction> {
    this.accountService.updateAccountBalance(newTransaction.sourceAccountId, newTransaction.amount);
    this.accountService.updateAccountBalance(newTransaction.destinationAccountId, newTransaction.convertedAmount ? newTransaction.convertedAmount : newTransaction.amount);
    return await this.transactionRepository.insert(newTransaction);
  }
}
