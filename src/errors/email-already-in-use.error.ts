export class EmailAlreadyInUseError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, EmailAlreadyInUseError.prototype);
    this.name = "EmailAlreadyInUseError";
  }
}
