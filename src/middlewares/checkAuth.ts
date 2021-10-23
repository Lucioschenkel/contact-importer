import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import jwt from "@config/jwt";
import { AppError } from "@shared/errors/AppError";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function checkAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError("Authorization header missing");
  }

  const [, token] = authorization.split(" ");

  if (!token) {
    throw new AppError("Token missing");
  }

  try {
    const decoded = verify(token, jwt.secret);
    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub as string,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT Token");
  }
}
