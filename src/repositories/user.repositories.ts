import UserRegister from "../model/user/user_register";

export class UserRepository {
  constructor() {}

  public async insertUser(user: UserRegister) {
    await UserRegister.query().insert(user);
    return;
  }
}

export const userRepository = new UserRepository();
