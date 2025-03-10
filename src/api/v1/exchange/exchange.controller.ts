import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ConversionServiceImpl } from "../../../services/impl/conversion.service.impl";
import { ConversionService } from "../../../services/conversion.service";
import { safeExecute } from "../../../util/utils";
import { conversionRequestDtoSchema } from "../../../dtos/conversion/conversion-request.dto";

@injectable()
export class ExchangeController {
  constructor(@inject(ConversionServiceImpl) public readonly service: ConversionService) {}

  getExchange = safeExecute(async (request: Request, response: Response) => {
    const queryParams = request.query;
    const conversionRequest = {
      base: queryParams.base,
      to: queryParams.to?.toString().split(","),
    };
    const result = conversionRequestDtoSchema.parse(conversionRequest);
    const exchanges = await this.service.getConversionRate(result.base, result.to);
    response.json(exchanges);
  });
}
