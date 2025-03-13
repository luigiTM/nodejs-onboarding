import { z } from "zod";

export interface OrderingDto {
  sortBy: string;
  sortOrder: string;
}

const SortOrderSchema = z.enum(["ASC", "DESC", "asc", "desc"]);

export const OrderingDtoSchema: z.ZodType<OrderingDto> = z.object({
  sortBy: z.string(),
  sortOrder: SortOrderSchema,
});
