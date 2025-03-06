import { injectable } from "inversify";
import { ConversionService } from "../conversion.service";
import { ConversionRatesDto } from "../../dtos/conversion/conversion-rates.dto";
import env from "../../config";
import { CurrencyConversionError } from "../../errors/currency-conversion.error";
import { SimpleCache } from "../../util/cache/simple.cache";
import { Cache } from "../../util/cache/cache";

interface ConversionResponse {
  data: { [currencyName: string]: number };
}

const FREE_CURRENCY_API_URL = "https://api.freecurrencyapi.com/v1/";

@injectable()
export class ConversionServiceImpl implements ConversionService {
  private cache: Cache<ConversionRatesDto>;

  constructor() {
    this.cache = new SimpleCache<ConversionRatesDto>();
  }

  async getConversionRate(baseCurrency: string, toCurrencies: string[]): Promise<ConversionRatesDto> {
    const cachedConversionRates = this.cache.getValue(baseCurrency);
    const notCached = toCurrencies.filter((currency) => !cachedConversionRates?.conversionRates[currency]);
    if (notCached.length > 0) {
      const parameters = `&currencies=${notCached}&base_currency=${baseCurrency}`;
      const fetchUrl = `${FREE_CURRENCY_API_URL}latest?${parameters}`;
      const response = await fetch(fetchUrl, { headers: { apiKey: env.FREE_CURRENCY_API_KEY } });
      if (!response.ok) {
        const responseData = await response.json();
        throw new CurrencyConversionError(`Unable to get conversion rate: ${responseData.message}`);
      }
      const responseData = (await response.json()) as ConversionResponse;
      const cachedConversionRates = this.cache.getValue(baseCurrency);
      if (cachedConversionRates) {
        notCached.forEach((currency) => (cachedConversionRates.conversionRates[currency] = responseData.data[currency]));
      } else {
        this.cache.setValue(baseCurrency, { baseCurrency: baseCurrency, conversionRates: responseData.data });
      }
    }
    const conversionRates = this.cache.getValue(baseCurrency);
    if (!conversionRates) {
      throw new CurrencyConversionError(`Unable to get conversion rate`);
    }
    const conversionRatesDto = {
      baseCurrency: baseCurrency,
      conversionRates: conversionRates.conversionRates,
    };
    return conversionRatesDto;
  }
}
