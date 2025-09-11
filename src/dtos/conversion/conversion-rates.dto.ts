export interface ConversionRatesDto {
  baseCurrency: string;
  conversionRates: { [currencyName: string]: number };
}
