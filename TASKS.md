# CineRate - Student Tasks

Bu sənəddə hər tələbə üçün ayrı-ayrı task-lar və onların təfsilatı verilmişdir.

**Cəmi 17 Task** - Hər tələbə bir və ya iki task götürə bilər.

## 📝 Task Workflow

1. **Task seçin** - Aşağıdakı siyahıdan özünüzə task seçin
2. **Branch yaradın** - `git checkout -b feature/task-name`
3. **Kod yazın** - Task-ı tamamlayın
4. **Test edin** - Postman və ya curl ilə test edin
5. **Pull Request** - PR yaradın və code review üçün göndərin

---

## 🎬 Backend Tasks

### Task 1: Movie CRUD Operations
**Branch**: `feature/movie-crud`  
**Çətinlik**: ⭐⭐ Orta

**Məqsəd**: Film əlavə etmək, yeniləmək, silmək və oxumaq üçün API endpoints yazmaq.

**Ediləcəklər**:
- `src/routes/movie.routes.ts` - Route definition
- `src/controllers/movie.controller.ts` - Request handlers
- `src/services/movie.service.ts` - Business logic

**Endpoints**:
```
POST   /api/v1/movies          - Yeni film əlavə et
GET    /api/v1/movies          - Bütün filmləri gətir
GET    /api/v1/movies/:id      - Bir filmin detallı məlumatı
PUT    /api/v1/movies/:id      - Filmi yenilə
DELETE /api/v1/movies/:id      - Filmi sil
```

**Validation**:
- Title: required, min 1 char
- Year: required, 1900-2100
- Director: required
- Genres: array, min 1 item
- Duration: positive number

**Nümunə Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Inception",
    "year": 2010,
    ...
  }
}
```

---

### Task 2: Review System
**Branch**: `feature/review-system`  
**Çətinlik**: ⭐⭐ Orta

**Məqsəd**: Filmlər üçün rəy yazmaq, oxumaq, yeniləmək və silmək.

**Ediləcəklər**:
- `src/routes/review.routes.ts`
- `src/controllers/review.controller.ts`
- `src/services/review.service.ts`

**Endpoints**:
```
POST   /api/v1/movies/:movieId/reviews     - Rəy əlavə et
GET    /api/v1/movies/:movieId/reviews     - Filmin rəylərini gətir
GET    /api/v1/reviews/:id                 - Bir rəyi gətir
PUT    /api/v1/reviews/:id                 - Rəyi yenilə
DELETE /api/v1/reviews/:id                 - Rəyi sil
```

**Validation**:
- Rating: 1-10 arası
- Title: required, min 3 char
- Content: required, min 10 char
- MovieId və UserId mövcud olmalı

---

### Task 3: Watchlist & Favorites
**Branch**: `feature/watchlist`  
**Çətinlik**: ⭐⭐ Orta

**Məqsəd**: İstifadəçilərin baxmaq istədikləri filmləri yadda saxlamaq.

**Endpoints**:
```
POST   /api/v1/users/:userId/watchlist     - Watchlist-ə əlavə et
GET    /api/v1/users/:userId/watchlist     - İstifadəçinin watchlist-i
DELETE /api/v1/users/:userId/watchlist/:movieId  - Watchlist-dən sil
```

**Funksionallıq**:
- Eyni filmi 2 dəfə əlavə etməməli (duplicate check)
- Film mövcud olmalı
- İstifadəçi mövcud olmalı

---

### Task 4: Search & Filter Engine
**Branch**: `feature/search-filter`  
**Çətinlik**: ⭐⭐⭐ Çətin

**Məqsəd**: Filmlər üzrə güclü axtarış və filter sistemi.

**Endpoints**:
```
GET /api/v1/movies/search?q=inception
GET /api/v1/movies?genre=Action&year=2010&minRating=7
```

**Filter parametrləri**:
- `q` - Title və description-da axtarış
- `genre` - Janra görə filter (multiple: `genre=Action,Drama`)
- `year` - İlə görə
- `director` - Rejissora görə
- `minRating` - Minimum rating
- `maxRating` - Maximum rating
- `cast` - Aktyor adı ilə

**Challenge**: Case-insensitive search, partial match

---

### Task 5: Sorting & Pagination
**Branch**: `feature/sorting-pagination`  
**Çətinlik**: ⭐⭐⭐ Çətin

**Məqsəd**: Bütün list endpoint-lərə sorting və pagination əlavə etmək.

**Query parametrləri**:
```
GET /api/v1/movies?page=2&limit=10&sortBy=rating&sortOrder=desc
```

**Parametrlər**:
- `page` - Səhifə nömrəsi (default: 1)
- `limit` - Səhifə başına nəticə (default: 10, max: 100)
- `sortBy` - title, year, rating, createdAt
- `sortOrder` - asc, desc (default: asc)

**Response formatı**:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

---

### Task 6: Rating Calculation & Statistics
**Branch**: `feature/rating-stats`  
**Çətinlik**: ⭐⭐⭐ Çətin

**Məqsəd**: Film reytinqlərini hesablamaq və statistika təqdim etmək.

**Endpoints**:
```
GET /api/v1/movies/:id/stats
GET /api/v1/movies/top-rated?limit=10
GET /api/v1/stats/overview
```

**Hesablamalar**:
- Average rating (bütün review-lardan)
- Total reviews count
- Rating distribution (1-10 arası neçə nəfər hansı qiyməti verib)
- Trending score (son 7 gündə əlavə edilmiş review-lar)

**Stats endpoint response**:
```json
{
  "movieId": "uuid",
  "averageRating": 8.5,
  "totalReviews": 234,
  "ratingDistribution": {
    "10": 45,
    "9": 78,
    ...
  }
}
```

---

### Task 7: Recommendation Engine
**Branch**: `feature/recommendations`  
**Çətinlik**: ⭐⭐⭐⭐ Çox Çətin

**Məqsəd**: İstifadəçilərə film tövsiyə etmək (sadə algorithm).

**Endpoints**:
```
GET /api/v1/users/:userId/recommendations?limit=5
GET /api/v1/movies/:id/similar?limit=5
```

**Algorithm (sadə versiya)**:
1. İstifadəçinin watchlist-indəki filmlərin janrlarına bax
2. Eyni janrda olan yüksək reytinqli filmləri tap
3. İstifadəçinin artıq watchlist-ində olmayan filmləri göstər
4. Rating-ə görə sort et

**Similar movies algorithm**:
- Eyni janrlar
- Eyni rejissor
- Eyni il ətrafında (±3 il)

---

### Task 8: Validation Layer (Zod)
**Branch**: `feature/validation`  
**Çətinlik**: ⭐⭐⭐ Çətin

**Məqsəd**: Bütün endpoints üçün Zod validation schema-ları yazmaq.

**Ediləcəklər**:
- `src/validators/movie.validator.ts`
- `src/validators/review.validator.ts`
- `src/validators/common.validator.ts`
- `src/middleware/validate.ts` - Validation middleware

**Schemas**:
```typescript
// Example
const createMovieSchema = z.object({
  title: z.string().min(1).max(200),
  year: z.number().int().min(1900).max(2100),
  director: z.string().min(1),
  genres: z.array(z.string()).min(1),
  duration: z.number().positive(),
  // ...
});
```

**Validation middleware istifadəsi**:
```typescript
router.post('/movies', validate(createMovieSchema), movieController.create);
```

**Error response**:
```json
{
  "success": false,
  "error": {
    "type": "/errors/validation",
    "title": "Validation Error",
    "status": 422,
    "errors": {
      "title": ["Title is required"],
      "year": ["Year must be between 1900 and 2100"]
    }
  }
}
```

---

### Task 9: Enhanced Error Handling
**Branch**: `feature/error-handling`  
**Çətinlik**: ⭐⭐ Orta

**Məqsəd**: Daha detallı error response-lar və error logging.

**Ediləcəklər**:
- Custom error class-ları genişləndirmək
- Error correlation ID-lər
- Structured error logging
- Error monitoring helpers

**Yeni error types**:
- `RateLimitError` - Too many requests
- `ForbiddenError` - Access denied
- `ServiceUnavailableError` - Service down

**Error logging formatı**:
```typescript
logger.error({
  correlationId: req.id,
  error: err.message,
  stack: err.stack,
  url: req.url,
  method: req.method,
  userId: req.userId,
});
```

---

### Task 10: Advanced Request Logging
**Branch**: `feature/logging`  
**Çətinlik**: ⭐⭐ Orta

**Məqsəd**: Request/Response logging-i təkmilləşdirmək.

**Ediləcəklər**:
- Request duration tracking
- Slow request detection (>1000ms warning)
- Sensitive data masking (email, password)
- Request body logging (development only)

**Log output nümunəsi**:
```
INFO: GET /api/v1/movies 200 - 45ms
WARN: GET /api/v1/movies/search 200 - 1234ms (slow)
ERROR: POST /api/v1/movies 400 - Validation failed
```

---

### Task 11: Rate Limiting Middleware
**Branch**: `feature/rate-limiting`  
**Çətinlik**: ⭐⭐⭐ Çətin

**Məqsəd**: API abuse-dən qorunmaq üçün rate limiting.

**Ediləcəklər**:
- `src/middleware/rateLimiter.ts`
- In-memory rate limit counter
- Configurable limits

**Limits**:
- Global: 100 requests per 15 minutes per IP
- POST endpoints: 20 requests per 15 minutes
- Search endpoint: 50 requests per 15 minutes

**Response headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

**429 Error response**:
```json
{
  "success": false,
  "error": {
    "type": "/errors/rate-limit",
    "title": "Too Many Requests",
    "status": 429,
    "detail": "Rate limit exceeded. Try again in 15 minutes."
  }
}
```

---

### Task 12: Data Export & Import
**Branch**: `feature/data-export`  
**Çətinlik**: ⭐⭐ Orta

**Məqsəd**: Data-nı export və import etmək.

**Endpoints**:
```
GET  /api/v1/export/movies?format=json
GET  /api/v1/export/movies?format=csv
POST /api/v1/import/movies
```

**Export formats**:
- JSON: Full movie data
- CSV: Tabular format

**Import**:
- Bulk movie import from JSON array
- Validation hər film üçün
- Error reporting (hansı filmlər import olunmadı)

---

### Task 13: Analytics & Reports
**Branch**: `feature/analytics`  
**Çətinlik**: ⭐⭐⭐ Çətin

**Məqsəd**: Platform statistikası və hesabatlar.

**Endpoints**:
```
GET /api/v1/analytics/overview
GET /api/v1/analytics/movies/popular
GET /api/v1/analytics/reviews/recent
GET /api/v1/analytics/trends
```

**Metrics**:
- Total movies, reviews, users
- Most reviewed movies
- Most active users (ən çox review yazanlar)
- Genre popularity
- Monthly trends (hər ay neçə film əlavə olunub)
- Average rating by genre

---

## 🎨 Frontend Tasks

### Task 14: Movie Listing & Details Pages
**Branch**: `feature/frontend-movies`  
**Çətinlik**: ⭐⭐⭐ Çətin

**Məqsəd**: Film siyahısı və detallar səhifəsi HTML/CSS/JS ilə.

**Səhifələr**:
- `public/index.html` - Movie list page
- `public/movie-details.html` - Single movie page
- `public/css/styles.css`
- `public/js/movies.js`

**Features**:
- Responsive design
- Movie cards with poster
- Click to see details
- Rating display (stars ⭐)
- Genre badges

---

### Task 15: Search, Filter & Review UI
**Branch**: `feature/frontend-search`  
**Çətinlik**: ⭐⭐⭐ Çətin

**Məqsəd**: Axtarış, filter və review yazma UI.

**Features**:
- Search bar (real-time search)
- Filter by genre (checkboxes)
- Filter by year (range slider)
- Sort dropdown
- Review form (rating stars, text)
- Review list display

---

### Task 16: Dashboard & Watchlist UI
**Branch**: `feature/frontend-dashboard`  
**Çətinlik**: ⭐⭐⭐ Çətin

**Məqsəd**: İstifadəçi dashboard və watchlist səhifəsi.

**Features**:
- User statistics (total reviews, watchlist count)
- Watchlist display
- Add/remove from watchlist buttons
- Top rated movies widget
- Charts (Chart.js): Ratings distribution

---

### Task 17: API Documentation
**Branch**: `feature/documentation`  
**Çətinlik**: ⭐⭐ Orta

**Məqsəd**: API sənədləşdirmə.

**Ediləcəklər**:
- `docs/API.md` - Full API documentation
- Postman collection export
- Example requests/responses
- Error codes documentation

---

## 🎯 Task Seçim Strategiyası

**Başlangic səviyyə**: Task 1, 2, 3, 9, 10, 12  
**Orta səviyyə**: Task 4, 5, 6, 8, 11, 14, 15, 17  
**Advanced**: Task 7, 13, 16  

## ⚠️ Qeydlər

- Hər task üçün minimum 1 gün lazımdır
- Code review məcburidir
- Test etmədən PR açmayın
- Clean code və comments yazın
- Deadlines-a riayət edin

## 🤝 Kömək

Problem olarsa:
1. README.md-yə bax
2. Kod nümunələrinə bax (base code)
3. Komanda üzvlərindən soruş
4. Mellimden soruş

Uğurlar! 🚀
