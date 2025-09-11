export class CurrencyConversionError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CurrencyConversionError.prototype);
    this.name = "CurrencyConversionError";
  }
}
