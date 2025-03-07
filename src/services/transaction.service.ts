import { CreateTransactionDto } from "../dtos/transaction/create-transaction.dto";
import { Service } from "./entity.service";
import { UserDto } from "../dtos/user/user.dto";
import Transaction from "../model/transaction";
import { Knex } from "knex";

export interface TransactionService extends Service<CreateTransactionDto, Transaction, Knex.Transaction> {
  validateAndCreate(userDto: UserDto, newTransaction: CreateTransactionDto, dbTransaction?: Knex.Transaction): Promise<Transaction>;
}
