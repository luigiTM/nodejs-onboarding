import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { formatEndOfDay, formatStartOfDay, safeExecute } from "../../../util/utils";
import { TransactionServiceImpl } from "../../../services/impl/transaction.service.impl";
import { createTransactionDtoSchema } from "../../../dtos/transaction/create-transaction.dto";
import { TransactionService } from "../../../services/transaction.service";
import { userDtoSchema } from "../../../dtos/user/user.dto";
import { paginationDtoSchema } from "../../../dtos/common/pagination.dto";
import { OrderingDto, OrderingDtoSchema } from "../../../dtos/common/ordering.dto";
import { TransactionFilteringDtoSchema } from "../../../dtos/transaction/transaction-filtering.dto";

@injectable()
export class TransactionController {
  constructor(@inject(TransactionServiceImpl) public readonly service: TransactionService) {}

  createTransaction = safeExecute(async (request: Request, response: Response) => {
    const newTransaction = createTransactionDtoSchema.parse(request.body);
    const userDto = userDtoSchema.parse(request.userDto);
    const transactionCreated = await this.service.validateAndCreate(userDto, newTransaction);
    response.json(transactionCreated);
  });

  getTransaction = safeExecute(async (request: Request, response: Response) => {
    const loggedUser = userDtoSchema.parse(request.userDto);
    const transactionFiltering = TransactionFilteringDtoSchema.parse({
      dateFrom: request.query.dateFrom ? formatStartOfDay(String(request.query.dateFrom)) : undefined,
      dateTo: request.query.dateTo ? formatEndOfDay(String(request.query.dateTo)) : undefined,
      accountId: request.query.accountId,
    });
    const ordering: OrderingDto[] = [];
    const sortByParameters = request.query.sortBy?.toString().split(",");
    const sortOrderParameters = request.query.sortOrder?.toString().split(",") || [];
    if (sortByParameters) {
      sortByParameters.forEach((item, index) => {
        ordering.push(
          OrderingDtoSchema.parse({
            sortBy: item.trim(),
            sortOrder: (sortOrderParameters[index] || "asc").trim(),
          }),
        );
      });
    } else {
      ordering.push({ sortBy: "created_at", sortOrder: "asc" });
    }
    const pagination = paginationDtoSchema.parse({
      page: Number(request.query.page) || 0,
      size: Number(request.query.size) || 10,
    });
    const transactions = await this.service.getTransactionsByUser(loggedUser.id, pagination, ordering, transactionFiltering);
    response.json(transactions);
  });
}
