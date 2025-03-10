import { z } from "zod";

export interface ConversionRequestDto {
  base: string;
  to: string[];
}

export const conversionRequestDtoSchema: z.ZodType<ConversionRequestDto> = z.object({
  base: z.string(),
  to: z.array(z.string()),
});
