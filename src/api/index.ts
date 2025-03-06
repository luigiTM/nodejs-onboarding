import { Router } from "express";
import { container } from "../util/container";
import { UserRoutes } from "./v1/user/user.routes";
import { AccountRoutes } from "./v1/account/account.routes";

const router = Router();

router.use("/user", container.get(UserRoutes).getRouter());
router.use("/account", container.get(AccountRoutes).getRouter());

export default router;
