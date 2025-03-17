export class InvalidUserError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidUserError.prototype);
    this.name = "InvalidUserError";
  }
}
