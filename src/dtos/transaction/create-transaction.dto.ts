import { z } from "zod";

export interface CreateTransactionDto {
  sourceAccount: string;
  destinationAccount: string;
  amount: number;
  description: string;
}

export const createTransactionDtoSchema: z.ZodType<CreateTransactionDto> = z.object({
  sourceAccount: z.string().uuid(),
  destinationAccount: z.string().uuid(),
  amount: z.number().positive().min(1),
  description: z.string(),
});
