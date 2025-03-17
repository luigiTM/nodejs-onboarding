export class InvalidFormatError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidFormatError.prototype);
    this.name = "InvalidFormatError";
  }
}
