import { battle } from "#controllers";
import { authenticate, validateBody } from "#middlewares";
import { battleSchema } from "#schemas";
import { Router } from "express";

const battleRouter = Router();

battleRouter.post("/", authenticate, validateBody(battleSchema), battle);

export default battleRouter;
