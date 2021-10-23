import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";

import { AuthController } from "../controllers/AuthController";

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authController.create
);

export default authRoutes;
