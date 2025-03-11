import { CreateTransactionDto } from "../dtos/transaction/create-transaction.dto";
import { Service } from "./entity.service";
import { UserDto } from "../dtos/user/user.dto";
import Transaction from "../model/transaction";
import { Knex } from "knex";
import { PaginationDto } from "../dtos/common/pagination.dto";
import { TransactionDto } from "../dtos/transaction/transaction.dto";

export interface TransactionService extends Service<string, CreateTransactionDto, Transaction, Knex.Transaction> {
  validateAndCreate(userDto: UserDto, newTransaction: CreateTransactionDto, dbTransaction?: Knex.Transaction): Promise<TransactionDto>;
  getTransactionsByUser(userId: string, pagination: PaginationDto): Promise<TransactionDto[]>;
}
