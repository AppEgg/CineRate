import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';
import { ErrorMonitoring } from '@/utils/ErrorMonitoring';



/**
 * Async handler wrapper to catch errors in async route handlers
 * Usage: router.get('/path', asyncHandler(async (req, res) => { ... }))
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {

    const correlationId = req.id as string || 'unknown'

   if (err instanceof AppError) {
    err.setCorrelationId(correlationId);
  }

   ErrorMonitoring.trackError({
    correlationId,
    error: err,
    url: req.url,
    method: req.method,
    statusCode: err instanceof AppError ? err.statusCode : 500,
    userId: req.userId,
    query: req.query,
    params: req.params,
    body: req.body
  });

  // Log error
  logger.error({
    correlationId,
    error: err.message,
    stack : err.stack,
    url: req.url,
    method: req.method,
    userId : req.userId,
    timeStamp : new Date().toISOString()
  });

  // Handle known application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.toProblemDetails(req.url),
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    success: false,
    error: {
      type: '/errors/internal',
      title: 'Internal Server Error',
      status: 500,
      detail: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message,
      instance: req.url,
      correlationId
    },
  });
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  const error = new AppError(`Route ${req.method} ${req.url} not found`, 404, '/errors/not-found');
  next(error);
};
