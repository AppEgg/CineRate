import express, { Application } from 'express';
import path from 'path';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import movieRoutes from '@routes/movie.routes'
import { logger } from './utils/logger';
import { durationMiddleware } from './middleware/durationMiddleware';

// Routers
import movieRoutes from './routes/movie.routes';
import favoriteRoutes from './routes/favorite.routes';

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

  // API routes will be added here by students
  app.use('/movies', movieRoutes);
  // -----------------------------
  // API Routes
  // -----------------------------
  app.use('/api/v1', movieRoutes);    // Movie routes
  app.use('/api/v1', favoriteRoutes);         // Favorites routes

  // 404 handler - must be after all routes
  app.use(notFoundHandler);

  // Global error handler - must be last
  app.use(errorHandler);

  return app;
};
