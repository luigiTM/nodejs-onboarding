import { z } from "zod";

export interface UserLoginDto {
  email: string;
  password: string;
}

export const userLoginSchema: z.ZodType<UserLoginDto> = z.object({
  email: z.string(),
  password: z.string(),
});
