import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import UsersController from "../controllers/UsersController";

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
);

export default usersRoutes;
