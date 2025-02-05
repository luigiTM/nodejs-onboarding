import NewUser, { NewUserShape } from "../model/user/new_user";

export interface UserRepository {
  insertUser(user: NewUserShape): Promise<NewUser>;
}
