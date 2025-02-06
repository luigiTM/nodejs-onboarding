import { z } from "zod";

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const createUserDtoSchema: z.ZodType<CreateUserDto> = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
});
