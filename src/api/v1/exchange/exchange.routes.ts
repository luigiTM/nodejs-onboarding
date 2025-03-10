import { inject, injectable } from "inversify";
import { BaseRoutes } from "../base.routes";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { ExchangeController } from "./exchange.controller";

@injectable()
export class ExchangeRoutes extends BaseRoutes<ExchangeController> {
  constructor(
    @inject(AuthMiddleware) public readonly authMiddleware: AuthMiddleware,
    @inject(ExchangeController) public readonly exchangeController: ExchangeController,
  ) {
    super(exchangeController);
    this.setRoutes();
  }

  protected setRoutes(): void {
    this.router.use(this.authMiddleware.protect.bind(this.authMiddleware));
    this.router.get("", this.controller.getExchange.bind(this.controller));
  }
}
