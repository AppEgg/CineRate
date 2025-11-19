import {Request , Response , NextFunction} from 'express'
import { randomUUID } from 'crypto'

export const correlationMiddleware = (
    req: Request ,
    res: Response ,
    next : NextFunction
) =>
{
  const correlationId = req.headers['x-request-id']?.toString() || randomUUID()

  req.id = correlationId

  // burda response header -de elave etmeliyikki client terefde gore bilsin

  res.setHeader('X-Correlation-Id' , correlationId)

  next()
}