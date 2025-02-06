import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UserLoginDto } from "../dtos/user/user-login.dto";
import User from "../model/user";
import { Service } from "./entity.service";

export interface UserService extends Service<CreateUserDto, User> {
  login(userLogin: UserLoginDto): string;
}
