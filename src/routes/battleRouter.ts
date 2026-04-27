import { battle } from "#controllers";
import { authenticate, validateBody } from "#middlewares";
import { Router } from "express";

const battleRouter = Router();

battleRouter.post("/", authenticate, validateBody(), battle);

export default battleRouter;
