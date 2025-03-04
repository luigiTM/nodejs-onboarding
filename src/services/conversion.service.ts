export interface ConversionService {
  getConversionRate(originCurrencyId: number, destinationCurrencyId: number): number;
}
