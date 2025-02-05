import NewUser, { NewUserShape } from "../model/user/new_user";

export interface UserService {
  createUser(user: NewUserShape): Promise<NewUser>;
}
