import { CreateTransactionDto } from "../dtos/transaction/create-transaction.dto";
import { Service } from "./entity.service";
import { UserDto } from "../dtos/user/user.dto";
import Transaction from "../model/transaction";

export interface TransactionService extends Service<CreateTransactionDto, Transaction> {
  validateNewTransaction(userDto: UserDto, newTransaction: CreateTransactionDto): Promise<void>;
}
