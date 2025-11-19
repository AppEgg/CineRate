import express, { Application } from 'express';
import path from 'path';
import { errorHandler, notFoundHandler, asyncHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { RateLimitError, ForbiddenError, ServiceUnavailableError } from './utils/errors';
import { correlationMiddleware } from './middleware/correlationId';

import { durationMiddleware } from './middleware/durationMiddleware';

// Routers
import movieRoutes from '@/routes/movie.routes';
import reviewRoutes from '@/routes/review.routes';
import userRoutes from '@/routes/user.routes';
import analyticRoute from '@/routes/analytic.routes';

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
  app.use(durationMiddleware);
  app.use(requestLogger);

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // -----------------------------
  // API Routes
  // -----------------------------
  const BasePath = '/api/v1';
  app.use(`${BasePath}/movies`, movieRoutes); // Movie routes
  app.use(`${BasePath}/reviews`, reviewRoutes); // Review routes
  app.use(`${BasePath}/users`, userRoutes); // Favorites routes
  //* Analytics & Reports
  app.use(`${BasePath}/analytics`, analyticRoute);

  app.get(
    '/test/rate-limit',
    asyncHandler(async (_req, _res) => {
      throw new RateLimitError();
    })
  );

  app.get(
    '/test/forbidden',
    asyncHandler(async (_req, _res) => {
      throw new ForbiddenError();
    })
  );

  app.get(
    '/test/service-down',
    asyncHandler(async (_req, _res) => {
      throw new ServiceUnavailableError();
    })
  );

  app.get(
    '/test/unknown-error',
    asyncHandler(async (_req, _res) => {
      throw new Error('Unexpected server error!');
    })
  );

  // 404 handler - must be after all routes
  app.use(notFoundHandler);

  // Global error handler - must be last
  app.use(errorHandler);

  return app;
};
