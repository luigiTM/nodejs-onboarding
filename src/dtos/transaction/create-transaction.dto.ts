import { z } from "zod";

export interface CreateTransactionDto {
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
  description: string;
}

export const createTransactionDtoSchema: z.ZodType<CreateTransactionDto> = z.object({
  sourceAccountId: z.string().uuid(),
  destinationAccountId: z.string().uuid(),
  amount: z.number().positive().min(1),
  description: z.string(),
});
