export class ValidationError extends Error {
  fields: string[];
  constructor(message: string, fields: string[]) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
    this.name = "ValidationError";
    this.fields = fields;
  }
}
