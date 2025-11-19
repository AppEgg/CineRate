### 1. functions
### 2. routers
### 3. app.ts-de cagirmaq ekrana json kimi cixarmaq

### Endpoints
    GET /api/v1/analytics/overview
    GET /api/v1/analytics/movies/popular
    GET /api/v1/analytics/reviews/recent
    GET /api/v1/analytics/trends

**Metrics**:
    + Total movies, reviews, users
    + Most reviewed movies
    + Most active users (ən çox review yazanlar)
    + Genre popularity
    + Monthly trends (hər ay neçə film əlavə olunub)
    + Average rating by genre

# storage-de bele function-lar var, length ve find ucun yariya biler
- async count(): Promise<number> {
-     const data = await this.read();
-     return data.length;
- }

- async findMany(predicate: (item: T) => boolean): Promise<T[]> {
-     const data = await this.read();
-     return data.filter(predicate);
- }

- export const getMovies = asyncHandler(async (req, res) => {
-     const movies = await movieService.getAll();
-     sendSuccess(res, movies);
- });

# Bunu da nezere almaq lazimdi
    src/
    ├── routes/
    │   └── movie.routes.ts       # Route definitions
    ├── controllers/
    │   └── movie.controller.ts   # Request handlers
    └── services/
        └── movie.service.ts      # Business logic

**Add comments for complex logic**
