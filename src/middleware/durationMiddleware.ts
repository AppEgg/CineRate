import { Request, Response, NextFunction } from "express";

export const durationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    (req as any).duration = Date.now() - start;
  });

  next();
};
