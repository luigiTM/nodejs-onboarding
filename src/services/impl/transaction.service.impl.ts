import { inject, injectable } from "inversify";
import { CreateTransactionDto } from "../../dtos/transaction/create-transaction.dto";
import { Service } from "../entity.service";
import { TransactionRepositoryImpl } from "../../repositories/impl/transaction.repository";
import Transaction from "../../model/transaction";
import { Repository } from "../../repositories/entity.repository";

@injectable()
export class TransactionServiceImpl implements Service<CreateTransactionDto, Transaction> {
  constructor(@inject(TransactionRepositoryImpl) public readonly transactionRepository: Repository<CreateTransactionDto, Transaction>) {}

  async create(newTransaction: CreateTransactionDto): Promise<Transaction> {
    return await this.transactionRepository.insert(newTransaction);
  }
}
