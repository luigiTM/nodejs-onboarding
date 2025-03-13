import { z } from "zod";

export interface TransactionFilteringDto {
  dateFrom?: string;
  dateTo?: string;
  accountId?: string;
}

export const TransactionFilteringDtoSchema: z.ZodType<TransactionFilteringDto> = z.object({
  dateFrom: z.string().datetime({ precision: 3 }).optional(),
  dateTo: z.string().datetime({ precision: 3 }).optional(),
  accountId: z.string().uuid().optional(),
});
