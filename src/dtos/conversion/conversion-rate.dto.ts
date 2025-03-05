export interface ConversionRateDto {
  baseCurrency: string;
  conversionRates: { [currencyName: string]: number };
}
