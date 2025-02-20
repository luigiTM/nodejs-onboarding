import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { safeExecute } from "../../../util/utils";
import { Service } from "../../../services/entity.service";
import { TransactionServiceImpl } from "../../../services/impl/transaction.service.impl";
import { CreateTransactionDto, createTransactionDtoSchema } from "../../../dtos/transaction/create-transaction.dto";
import Transaction from "../../../model/transaction";

@injectable()
export class TransactionController {
  constructor(@inject(TransactionServiceImpl) public readonly service: Service<CreateTransactionDto, Transaction>) {}

  createTransaction = safeExecute(async (request: Request, response: Response) => {
    const newTransaction = request.body;
    createTransactionDtoSchema.parse(newTransaction);
    const transactionCreated = this.service.create(newTransaction);
    response.send(transactionCreated);
  });
}
