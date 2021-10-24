import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { pagination } from "typeorm-pagination";

import { AppError } from "@shared/errors/AppError";

import routes from "./routes";

export const app = express();

app.use(express.json());
app.use(pagination);
app.use(routes);

app.use(
  /* eslint-disable-next-line */
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    if (error.message === "Validation failed") {
      return response.status(400).json({
        message: error.message,
        status: "error",
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error - ${error.message}`,
    });
  }
);
