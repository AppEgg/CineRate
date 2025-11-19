import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodType<any>, target: "body" | "query" | "params" = "body") => {
    return (req: Request, res: Response, next: NextFunction) => {
        const parsed = schema.parse(req as any)[target];
        req[target] = parsed
        return next()
    }
}