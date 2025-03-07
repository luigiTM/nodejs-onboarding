import { Knex } from "knex";

export interface FeeService {
  calculateFee(amountTransferred: number): number;
  sendFeeToAccount(feeValue: number, currency: string, dbTransaction?: Knex.Transaction): Promise<void>;
}
