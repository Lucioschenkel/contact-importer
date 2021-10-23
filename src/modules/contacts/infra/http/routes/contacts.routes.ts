import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import checkAuth from "@middlewares/checkAuth";

import { ImportContactsController } from "../controllers/ImportContactsController";

const contactsRoutes = Router();

const importContactsController = new ImportContactsController();

const upload = multer(uploadConfig.multer);

contactsRoutes.post(
  "/import",
  checkAuth,
  upload.single("spreadsheet"),
  celebrate({
    [Segments.BODY]: {
      name_column: Joi.string().required(),
      email_column: Joi.string().required(),
      phone_column: Joi.string().required(),
      date_of_birth_column: Joi.string().required(),
      address_column: Joi.string().required(),
      credit_card_column: Joi.string().required(),
    },
  }),
  importContactsController.create
);

export default contactsRoutes;
