import express, { Application } from 'express';
import path from 'path';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { logger } from './utils/logger';
import { rateLimiter } from './middleware/rateLimiter';

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

  // Request logging
  app.use(requestLogger);

  // Rate limiting middleware examples with Redis
  // app.get('/test-rate-limit', rateLimiterMiddleware(2, 60), (req, res) => {
  //   res.json({ message: 'This is a rate-limited endpoint.' });
  // });
  const windowMs = 15 * 60 * 1000;

  app.use(
    rateLimiter({ windowMs, max: 7 }, "global")
  );

  app.get(
    "/search",
    rateLimiter({ windowMs, max: 10 }, "search"),
    (req, res) => {
      res.json({ message: "Search OK" });
    });

  app.post("/login", rateLimiter({ windowMs, max: 2 }, "login"), (req, res) => {
    res.json({ message: "POST OK" });
  });

  // Health check endpoint
  app.get('/health',
    (_req, res) => {
      res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    });

  // API routes will be added here by students
  // Example: app.use('/api/v1/movies', movieRoutes);

  // 404 handler - must be after all routes
  app.use(notFoundHandler);

  // Global error handler - must be last
  app.use(errorHandler);

  return app;
};
