export class DataNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DataNotFoundError.prototype);
    this.name = "DataNotFoundError";
  }
}
