import { AccountDto } from "../dtos/account/account.dto";
import { CreateAccountDto } from "../dtos/account/create-account.dto";
import { UserDto } from "../dtos/user/user.dto";
import { Service } from "./entity.service";

export interface AccountService extends Service<CreateAccountDto, AccountDto> {
  getAccounts(user: UserDto): Promise<AccountDto[]>;
}
