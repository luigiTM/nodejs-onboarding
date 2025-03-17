export class UserOrPasswordError extends Error {
  constructor() {
    super("User or password is invalid");
    Object.setPrototypeOf(this, UserOrPasswordError.prototype);
    this.name = "UserOrPasswordError";
  }
}
