
//rate -limit with rate-limiter-flexible and ioredis rate-limiter-flexible // docker-compose.yml

import { Request, Response, NextFunction } from "express";
import Redis from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";

const redisClient = new Redis();

redisClient.on("connect", () => console.log("Redis connected successfully."));
redisClient.on("error", (err) => console.error("Redis error:", err));

const LIMITS = {
  global: { points: 3, duration: 15 * 60 }, 
  post: { points: 5, duration: 15 * 60 },   
  search: { points: 7, duration: 15 * 60 }, 
};

type LimitType = keyof typeof LIMITS;

export const rateLimiterMiddleware = (
  customPoints?: number,
  customDuration?: number
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let limitType: LimitType = "global";

    if (req.method === "POST") {
      limitType = "post";
    }

    if (req.path.includes("search")) {
      limitType = "search";
    }

    const limitConfig = LIMITS[limitType];

    const points = customPoints ?? limitConfig.points;
    const duration = customDuration ?? limitConfig.duration;

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      points,
      duration,
      blockDuration: 0, 
    });

    try {
      const key =
        req.ip ??
        req.headers["x-forwarded-for"]?.toString() ??
        "unknown-ip";

      const rlRes = await limiter.consume(key);

      res.set("X-RateLimit-Limit", String(points));
      res.set("X-RateLimit-Remaining", String(rlRes.remainingPoints));
      res.set(
        "X-RateLimit-Reset",
        String(
          Math.ceil(
            Date.now() / 1000 + (rlRes.msBeforeNext ?? 0) / 1000
          )
        )
      );

      next();
    } catch (rejRes: any) {
      const retrySeconds = Math.ceil((rejRes.msBeforeNext ?? 0) / 1000);

      res.set("Retry-After", String(retrySeconds));

      return res.status(429).json({
        success: false,
        error: {
          type: "/errors/rate-limit",
          title: "Too Many Requests",
          status: 429,
          detail: `Rate limit exceeded. Try again in ${retrySeconds} seconds.`,
        },
      });
    }
  };
};





//with express rate limit

type RateLimitConfig = {
    windowMs: number; // limit time
    max: number;  //request limiti   
};

const rateStore: Record<string, Record<string, { count: number; resetTime: number }>> = {};

const rateLimitError = (res: Response, resetTime: number) => {
    return res.status(429).json({
        success: false,
        error: {
            type: "/errors/rate-limit",
            title: "Too Many Requests",
            status: 429,
            detail: "Rate limit exceeded. Try again in 15 minutes.",
            resetAt: resetTime // limitin sıfırlanma vaxtı
        }
    });
};

export const rateLimiter = (config: RateLimitConfig, routeKey: string) => {
    //routekey endpoint üçün mes: /search, /login
    return (req: Request, res: Response, next: NextFunction) => {
        const ipRaw = req.ip || req.headers["x-forwarded-for"] || "unknown";// IP-i alir
        const ip = Array.isArray(ipRaw) ? ipRaw[0] : ipRaw;

        if (!rateStore[ip]) {
            rateStore[ip] = {};
        }

        if (!rateStore[ip][routeKey]) {
            rateStore[ip][routeKey] = {
                count: 0,//reuqest sayi
                resetTime: Date.now() + config.windowMs,//sıfırlanma vaxti
            };
        }

        const entry = rateStore[ip][routeKey];

        if (Date.now() > entry.resetTime) {//blok vaxti keçibsə request sayini sıfırlanir
            entry.count = 0;
            entry.resetTime = Date.now() + config.windowMs;
        }

        entry.count++;

        res.setHeader("X-RateLimit-Limit", config.max);
        res.setHeader("X-RateLimit-Remaining", Math.max(config.max - entry.count, 0));
        res.setHeader("X-RateLimit-Reset", entry.resetTime);

        if (entry.count > config.max) { //limitden coxdursa error 
            return rateLimitError(res, entry.resetTime);
        }

        next();
    };
};
