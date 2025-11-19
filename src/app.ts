import express, { Application } from 'express';
import path from 'path';
import { errorHandler, notFoundHandler , asyncHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { logger } from './utils/logger';
import { RateLimitError, ForbiddenError, ServiceUnavailableError } from './utils/errors';
import { correlationMiddleware } from './middleware/correlationId';


/**
 * Create and configure Express application
 */
export const createApp = (): Application => {
  const app = express();

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files from public directory
  app.use(express.static(path.join(__dirname, '../public')));

   app.use(correlationMiddleware);

  // Request logging
  app.use(requestLogger);

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // API routes will be added here by students
  // Example: app.use('/api/v1/movies', movieRoutes);

    app.get('/test/rate-limit', asyncHandler(async (_req, _res) => {
    throw new RateLimitError();
  }));

  app.get('/test/forbidden', asyncHandler(async (_req, _res) => {
    throw new ForbiddenError();
  }));

  app.get('/test/service-down', asyncHandler(async (_req, _res) => {
    throw new ServiceUnavailableError();
  }));

  app.get('/test/unknown-error', asyncHandler(async (_req, _res) => {
    throw new Error('Unexpected server error!');
  }));

  // 404 handler - must be after all routes
  app.use(notFoundHandler);

  // Global error handler - must be last
  app.use(errorHandler);

  return app;
};
