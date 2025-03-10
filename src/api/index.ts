import { Router } from "express";
import { container } from "../util/container";
import { UserRoutes } from "./v1/user/user.routes";
import { AccountRoutes } from "./v1/account/account.routes";
import { TransactionRoutes } from "./v1/transaction/transaction.routes";
import { ExchangeRoutes } from "./v1/exchange/exchange.routes";

const router = Router();

router.use("/user", container.get(UserRoutes).getRouter());
router.use("/account", container.get(AccountRoutes).getRouter());
router.use("/transaction", container.get(TransactionRoutes).getRouter());
router.use("/exchange", container.get(ExchangeRoutes).getRouter());

export default router;
