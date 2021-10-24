import { Router } from "express";

import checkAuth from "@middlewares/checkAuth";

import { FailuresController } from "../controllers/FailuresController";

const failuresRoutes = Router();

const failuresController = new FailuresController();

failuresRoutes.get("/", checkAuth, failuresController.index);

export default failuresRoutes;
