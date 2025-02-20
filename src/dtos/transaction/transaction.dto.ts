export interface TransactionDto {
  id: string;
  sourceAccount: string;
  destinationAccount: string;
  amount: number;
  description: string;
  createdAt: Date;
}
