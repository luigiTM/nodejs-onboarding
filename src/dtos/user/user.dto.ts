import { z } from "zod";
import User from "../../model/user";

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const userDtoSchema: z.ZodType<UserDto> = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
});

export const toDto = (user: User): UserDto => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};
