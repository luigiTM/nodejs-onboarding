import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UserLoginDto } from "../dtos/user/user-login.dto";
import { UserDto } from "../dtos/user/user.dto";
import { Service } from "./entity.service";

export interface UserService extends Service<CreateUserDto, UserDto> {
  login(userLogin: UserLoginDto): string;
}
