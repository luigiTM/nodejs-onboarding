import User from "../../model/user";

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const toDto = (user: User): UserDto => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};
