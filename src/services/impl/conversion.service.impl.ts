import { injectable } from "inversify";
import { ConversionService } from "../conversion.service";
import { ConversionRateDto } from "../../dtos/conversion/conversion-rate.dto";
import env from "../../config";
import { CurrencyConversionError } from "../../errors/currency-conversion.error";

interface ConversionResponse {
  data: { [currencyName: string]: number };
}

const FREE_CURRENCY_API_URL = "https://api.freecurrencyapi.com/v1/";

@injectable()
export class ConversionServiceImpl implements ConversionService {
  async getConversionRate(baseCurrency: string, toCurrencies: string[]): Promise<ConversionRateDto> {
    const parameters = `&currencies=${toCurrencies}&base_currency=${baseCurrency}`;
    const fetchUrl = `${FREE_CURRENCY_API_URL}latest?${parameters}`;
    const response = await fetch(fetchUrl, { headers: { apiKey: env.FREE_CURRENCY_API_KEY } });
    if (!response.ok) {
      const responseData = await response.json();
      throw new CurrencyConversionError(`Unable to get conversion rate: ${responseData.message}`);
    }
    const responseData = (await response.json()) as ConversionResponse;
    return {
      baseCurrency: baseCurrency,
      conversionRates: responseData.data,
    };
  }
}
