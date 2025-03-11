import { z } from "zod";

export interface PaginationDto {
  page: number;
  size: number;
}

export const paginationDtoSchema = z.object({
  page: z.number(),
  size: z.number(),
});
