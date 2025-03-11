import { CreateTransactionDto } from "../dtos/transaction/create-transaction.dto";
import { Repository } from "./entity.repository";
import { Knex } from "knex";
import { PaginationDto } from "../dtos/common/pagination.dto";
import Transaction from "../model/transaction";

export interface TransactionRepository extends Repository<string, CreateTransactionDto, Transaction, Knex.Transaction> {
  getTransactionsByUser(userId: string, pagination: PaginationDto, dbTransaction?: Knex.Transaction): Promise<Transaction[]>;
}
