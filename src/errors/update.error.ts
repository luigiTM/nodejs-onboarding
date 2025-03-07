export class UpdateError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UpdateError.prototype);
    this.name = "UpdateError";
  }
}
