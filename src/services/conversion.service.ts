import { ConversionRateDto } from "../dtos/conversion/conversion-rate.dto";

export interface ConversionService {
  getConversionRate(baseCurrency: string, toCurrencies: [string]): Promise<ConversionRateDto>;
}
