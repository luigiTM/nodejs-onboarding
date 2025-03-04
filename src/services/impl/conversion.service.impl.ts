import { injectable } from "inversify";
import { ConversionService } from "../conversion.service";

@injectable()
export class ConversionServiceImpl implements ConversionService {
  getConversionRate(originCurrencyId: number, destinationCurrencyId: number): number {
    if (originCurrencyId === destinationCurrencyId) {
      return 1;
    }
    return 1;
  }
}
