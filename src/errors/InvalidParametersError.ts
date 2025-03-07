export class InvalidParametersError extends Error {
  private invalidParameters: string[];
  constructor(message: string, invalidParameters: string[]) {
    super(message);
    this.invalidParameters = invalidParameters;
    Object.setPrototypeOf(this, InvalidParametersError.prototype);
    this.name = "CurrencyConversionError";
  }

  getInvalidParameters(): string[] {
    return this.invalidParameters;
  }
}
