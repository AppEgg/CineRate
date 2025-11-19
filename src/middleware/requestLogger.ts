import pinoHttp from 'pino-http';
import { logger } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { maskSensitive } from '@/utils/mask';

/**
 * HTTP request logger middleware using pino-http
 */
export const requestLogger = pinoHttp({
  logger,
  genReqId: (req: Request) => {
    // Generate or use existing request ID for correlation
    return req.headers['x-request-id']?.toString() || uuidv4();
  },
  customLogLevel: (_req, res, err) => {

    const duration = (_req as any).duration;

    if (duration && Number(duration) > 1000) {
      return "warn";
    }

    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  customSuccessMessage: (req, res) => {
    const duration = (req as any).duration;
    return `${req.method} ${req.url} ${res.statusCode} - ${duration}`;
  },
  customErrorMessage: (req, res, err) => {
    const duration = (req as any).duration;
    return `${req.method} ${req.url} ${res.statusCode} - ${err.message} - ${duration}`;
  },
  serializers: {
    req: (req:Request) => {
      const base: Record<string, any> = {
        method: req.method,
        url: req.url,
        query: req.query,
        params: req.params,
      };

      if (process.env.NODE_ENV === "development") {
        base.body = maskSensitive(req.body);
      }

      return base;
    },

    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});
