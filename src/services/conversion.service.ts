import { ConversionRatesDto } from "../dtos/conversion/conversion-rates.dto";

export interface ConversionService {
  getConversionRate(baseCurrency: string, toCurrencies: [string]): Promise<ConversionRatesDto>;
}
