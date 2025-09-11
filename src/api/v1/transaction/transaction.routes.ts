import { inject, injectable } from "inversify";
import { BaseRoutes } from "../base.routes";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { TransactionController } from "./transaction.controller";

@injectable()
export class TransactionRoutes extends BaseRoutes<TransactionController> {
  constructor(
    @inject(AuthMiddleware) public readonly authMiddleware: AuthMiddleware,
    @inject(TransactionController) public readonly transactionController: TransactionController,
  ) {
    super(transactionController);
    this.setRoutes();
  }

  protected setRoutes(): void {
    this.router.use(this.authMiddleware.protect.bind(this.authMiddleware));
    this.router.post("/", this.controller.createTransaction.bind(this.controller));
  }
}
