import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "redis";

import redisConfig from "@config/redis";
import { AppError } from "@errors/AppError";

const redisClient = redis.createClient({
  host: redisConfig.host,
  port: Number(redisConfig.port),
  password: undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "ratelimiter",
  points: 5,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError("Too many requests", 429);
  }
}
