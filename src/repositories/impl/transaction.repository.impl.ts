import { inject, injectable } from "inversify";
import { CreateTransactionDto } from "../../dtos/transaction/create-transaction.dto";
import { Knex } from "knex";
import { DatabaseConnector } from "../../db/database.connector";
import { KnexConnector } from "../../db/knex/knex.connector";
import Transaction from "../../model/transaction";
import { TransactionRepository } from "../transaction.repository";
import { PaginationDto } from "../../dtos/common/pagination.dto";
import { OrderingDto } from "../../dtos/common/ordering.dto";
import { TransactionFilteringDto } from "../../dtos/transaction/transaction-filtering.dto";
import { OrderByDirection } from "objection";

@injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
  constructor(@inject(KnexConnector) public readonly knexConnector: DatabaseConnector<Knex>) {
    Transaction.knex(knexConnector.getConnector());
  }

  async getById(entityId: string, dbTransaction?: Knex.Transaction): Promise<Transaction | undefined> {
    const queryBuilder = dbTransaction ? Transaction.query(dbTransaction) : Transaction.query();
    return await queryBuilder.findById(entityId);
  }

  async insert(newTransaction: CreateTransactionDto, dbTransaction?: Knex.Transaction): Promise<Transaction> {
    const queryBuilder = dbTransaction ? Transaction.query(dbTransaction) : Transaction.query();
    return await queryBuilder.insert(newTransaction).withGraphFetched("destinationAccount").withGraphFetched("sourceAccount");
  }

  async getTransactionsByUser(userId: string, pagination: PaginationDto, ordering: OrderingDto[], filtering: TransactionFilteringDto, dbTransaction?: Knex.Transaction): Promise<Transaction[]> {
    const queryBuilder = dbTransaction ? Transaction.query(dbTransaction) : Transaction.query();
    queryBuilder.joinRelated("[sourceAccount, destinationAccount]").where((builder) => {
      builder.where("sourceAccount.user_id", userId).orWhere("destinationAccount.user_id", userId);
    });
    if (filtering.accountId) {
      queryBuilder.andWhere("sourceAccount.id", filtering.accountId).orWhere("destinationAccount.id", filtering.accountId);
    }
    if (filtering.dateFrom) {
      queryBuilder.andWhere("createdAt", ">", filtering.dateFrom);
    }
    if (filtering.dateTo) {
      queryBuilder.andWhere("createdAt", "<", filtering.dateTo);
    }
    queryBuilder
      .offset(pagination.page * pagination.size)
      .orderBy(
        ordering.map(({ sortBy, sortOrder }) => ({
          column: sortBy,
          order: sortOrder as OrderByDirection,
        })),
      )
      .limit(pagination.size)
      .withGraphFetched("sourceAccount")
      .withGraphFetched("destinationAccount");
    return await queryBuilder;
  }
}
