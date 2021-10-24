import { Router } from "express";

import checkAuth from "@middlewares/checkAuth";

import { ImportsController } from "../controllers/ImportsController";

const importsRoutes = Router();

const importsController = new ImportsController();

importsRoutes.get("/", checkAuth, importsController.index);

export default importsRoutes;
