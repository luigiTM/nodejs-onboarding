import Transaction from "../../model/transaction";

export interface TransactionDto {
  id: string;
  sourceAccount: string;
  destinationAccount: string;
  amount: number;
  description?: string;
  createdAt: Date;
}

export const toDto = (transaction: Transaction): TransactionDto => {
  return {
    id: transaction.id,
    sourceAccount: transaction.sourceAccount.id,
    destinationAccount: transaction.destinationAccount.id,
    amount: transaction.amount,
    description: transaction.description,
    createdAt: transaction.createdAt,
  };
};
