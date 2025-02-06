import { CreateDto } from "../create.dto";
import { z } from "zod";

export interface CreateUserDto extends CreateDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const createUserDtoSchema: z.ZodType<CreateUserDto> = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string(),
});
