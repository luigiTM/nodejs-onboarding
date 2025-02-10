import { CreateAccountDto } from "../dtos/account/create-account.dto";
import { UserDto } from "../dtos/user/user.dto";
import Account from "../model/account";
import { Service } from "./entity.service";

export interface AccountService extends Service<CreateAccountDto, Account> {
  getAccounts(user: UserDto): Account[];
}
