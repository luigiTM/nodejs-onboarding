export interface FeeService {
  calculateFee(amountTransferred: number): number;
  sendFeeToAccount(feeValue: number, currency: string): Promise<void>;
}
