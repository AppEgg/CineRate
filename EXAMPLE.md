# Example: Movie Routes Implementation Guide

Bu nümunə göstərir ki, necə route, controller və service yazmaq lazımdır.

## 📁 File Structure

```
src/
├── routes/
│   └── movie.routes.ts
├── controllers/
│   └── movie.controller.ts
└── services/
    └── movie.service.ts
```

## 1️⃣ Service Layer (Business Logic)

**File**: `src/services/movie.service.ts`

```typescript
import { Movie } from '../types';
import { storage } from '../utils/storage';
import { generateId, getCurrentTimestamp } from '../utils/helpers';
import { NotFoundError, ConflictError } from '../utils/errors';

/**
 * Movie Service - Business logic for movies
 */
export class MovieService {
  /**
   * Get all movies
   */
  async getAll(): Promise<Movie[]> {
    return await storage.movies.read();
  }

  /**
   * Get movie by ID
   */
  async getById(id: string): Promise<Movie> {
    const movie = await storage.movies.findById(id);
    
    if (!movie) {
      throw new NotFoundError('Movie');
    }
    
    return movie;
  }

  /**
   * Create new movie
   */
  async create(data: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie> {
    // Check if movie with same title and year exists
    const existing = await storage.movies.findMany(
      (m) => m.title.toLowerCase() === data.title.toLowerCase() && m.year === data.year
    );
    
    if (existing.length > 0) {
      throw new ConflictError('Movie with same title and year already exists');
    }

    const movie: Movie = {
      id: generateId(),
      ...data,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
    };

    await storage.movies.create(movie);
    return movie;
  }

  /**
   * Update movie
   */
  async update(id: string, data: Partial<Movie>): Promise<Movie> {
    const existing = await this.getById(id);

    const updated = await storage.movies.update(id, {
      ...data,
      updatedAt: getCurrentTimestamp(),
    });

    if (!updated) {
      throw new NotFoundError('Movie');
    }

    return updated;
  }

  /**
   * Delete movie
   */
  async delete(id: string): Promise<void> {
    const deleted = await storage.movies.delete(id);
    
    if (!deleted) {
      throw new NotFoundError('Movie');
    }
  }
}

export const movieService = new MovieService();
```

## 2️⃣ Controller Layer (Request Handlers)

**File**: `src/controllers/movie.controller.ts`

```typescript
import { Request, Response } from 'express';
import { movieService } from '../services/movie.service';
import { sendSuccess, sendCreated, sendNoContent } from '../middleware/responseHandler';
import { asyncHandler } from '../middleware/errorHandler';

/**
 * Movie Controller - Handle HTTP requests
 */
export class MovieController {
  /**
   * GET /api/v1/movies
   */
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const movies = await movieService.getAll();
    sendSuccess(res, movies);
  });

  /**
   * GET /api/v1/movies/:id
   */
  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const movie = await movieService.getById(id);
    sendSuccess(res, movie);
  });

  /**
   * POST /api/v1/movies
   */
  create = asyncHandler(async (req: Request, res: Response) => {
    const movie = await movieService.create(req.body);
    sendCreated(res, movie, 'Movie created successfully');
  });

  /**
   * PUT /api/v1/movies/:id
   */
  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const movie = await movieService.update(id, req.body);
    sendSuccess(res, movie, 'Movie updated successfully');
  });

  /**
   * DELETE /api/v1/movies/:id
   */
  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await movieService.delete(id);
    sendNoContent(res);
  });
}

export const movieController = new MovieController();
```

## 3️⃣ Route Layer (Routing)

**File**: `src/routes/movie.routes.ts`

```typescript
import { Router } from 'express';
import { movieController } from '../controllers/movie.controller';

const router = Router();

/**
 * Movie Routes
 */
router.get('/', movieController.getAll);
router.get('/:id', movieController.getById);
router.post('/', movieController.create);
router.put('/:id', movieController.update);
router.delete('/:id', movieController.delete);

export default router;
```

## 4️⃣ Register Routes in App

**File**: `src/app.ts` (add this)

```typescript
import movieRoutes from './routes/movie.routes';

// ... existing code ...

// API routes
app.use('/api/v1/movies', movieRoutes);

// ... rest of the code ...
```

## 🧪 Test with Postman

### 1. Create Movie
```
POST http://localhost:3000/api/v1/movies
Content-Type: application/json

{
  "title": "Inception",
  "description": "A thief who steals corporate secrets...",
  "year": 2010,
  "director": "Christopher Nolan",
  "genres": ["Action", "Sci-Fi", "Thriller"],
  "duration": 148,
  "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
}
```

**Expected Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "title": "Inception",
    "year": 2010,
    ...
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Movie created successfully"
}
```

### 2. Get All Movies
```
GET http://localhost:3000/api/v1/movies
```

### 3. Get Movie by ID
```
GET http://localhost:3000/api/v1/movies/uuid-here
```

### 4. Update Movie
```
PUT http://localhost:3000/api/v1/movies/uuid-here
Content-Type: application/json

{
  "description": "Updated description"
}
```

### 5. Delete Movie
```
DELETE http://localhost:3000/api/v1/movies/uuid-here
```

**Expected Response (204)**: No content

## ⚠️ Error Handling Examples

### Not Found (404)
```
GET http://localhost:3000/api/v1/movies/invalid-id
```

Response:
```json
{
  "success": false,
  "error": {
    "type": "/errors/not-found",
    "title": "NotFoundError",
    "status": 404,
    "detail": "Movie not found",
    "instance": "/api/v1/movies/invalid-id"
  }
}
```

### Conflict (409)
```
POST http://localhost:3000/api/v1/movies
// Same title and year as existing movie
```

Response:
```json
{
  "success": false,
  "error": {
    "type": "/errors/conflict",
    "title": "ConflictError",
    "status": 409,
    "detail": "Movie with same title and year already exists"
  }
}
```

## 📝 Key Points

1. **Service layer** - Business logic və data operations
2. **Controller layer** - HTTP request/response handling
3. **Route layer** - URL mapping
4. **asyncHandler** - Async error-ları avtomatik catch edir
5. **Response helpers** - Consistent response format
6. **Custom errors** - Problem+JSON format

Bu pattern-i izləyərək digər feature-ları implement edin! 🚀
