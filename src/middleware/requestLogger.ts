import pinoHttp from 'pino-http';
import { logger } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

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
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} ${res.statusCode}`;
  },
  customErrorMessage: (req, res, err) => {
    return `${req.method} ${req.url} ${res.statusCode} - ${err.message}`;
  },
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      query: req.query,
      params: req.params,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});
