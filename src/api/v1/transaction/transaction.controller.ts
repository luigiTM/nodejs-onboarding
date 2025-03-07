import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { safeExecute } from "../../../util/utils";
import { TransactionServiceImpl } from "../../../services/impl/transaction.service.impl";
import { createTransactionDtoSchema } from "../../../dtos/transaction/create-transaction.dto";
import { TransactionService } from "../../../services/transaction.service";
import { userDtoSchema } from "../../../dtos/user/user.dto";

@injectable()
export class TransactionController {
  constructor(@inject(TransactionServiceImpl) public readonly service: TransactionService) {}

  createTransaction = safeExecute(async (request: Request, response: Response) => {
    const newTransaction = createTransactionDtoSchema.parse(request.body);
    const userDto = userDtoSchema.parse(request.userDto);
    const transactionCreated = await this.service.validateAndCreate(userDto, newTransaction);
    response.json(transactionCreated);
  });
}
