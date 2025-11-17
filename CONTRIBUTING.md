# Contributing Guidelines

## 🌿 Branch Strategy

### Branch Naming Convention
```
feature/task-name
bugfix/issue-description
hotfix/critical-issue
```

Examples:
- `feature/movie-crud`
- `feature/search-filter`
- `bugfix/rating-calculation`

### Workflow

1. **Main branch qorunur** - Birbaşa commit edilə bilməz
2. **Feature branch yaradın**:
   ```bash
   git checkout -b feature/your-task-name
   ```

3. **Kodunuzu yazın və commit edin**:
   ```bash
   git add .
   git commit -m "feat: add movie CRUD operations"
   ```

4. **Push edin**:
   ```bash
   git push origin feature/your-task-name
   ```

5. **Pull Request açın** GitHub-da

## 📝 Commit Message Format

Conventional Commits formatından istifadə edin:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:
- `feat`: Yeni feature
- `fix`: Bug fix
- `docs`: Documentation dəyişiklikləri
- `style`: Code formatı (məna dəyişmir)
- `refactor`: Code refactoring
- `test`: Test əlavə etmə
- `chore`: Build və ya auxiliary tool dəyişiklikləri

### Examples:
```
feat(movies): add movie CRUD endpoints
fix(reviews): correct rating calculation
docs(readme): update installation steps
refactor(storage): improve error handling
test(movies): add unit tests for movie service
```

## 🔍 Code Review Process

### Pull Request yaradarkən:

1. **Təsviri doldurun**:
   - Nə etdiniz?
   - Hansı task-ı tamamladınız?
   - Test olundu mu?

2. **Checklist**:
   - [ ] Kod çalışır
   - [ ] Validation əlavə edilib
   - [ ] Error handling düzgündür
   - [ ] Postman ilə test edilib
   - [ ] TypeScript error yoxdur
   - [ ] ESLint warning yoxdur

3. **Reviewer təyin edin**

### Code Review Criteria:

✅ **Approve üçün**:
- Kod çalışır və test olunub
- Clean və oxunaqlıdır
- Best practices-ə uyğundur
- Documentation var (comments)

❌ **Request Changes üçün**:
- Syntax error var
- Validation yoxdur
- Error handling düzgün deyil
- Code standards-a uyğun deyil

## 💻 Code Standards

### TypeScript

```typescript
// ✅ GOOD
interface Movie {
  id: string;
  title: string;
}

const getMovie = async (id: string): Promise<Movie> => {
  // implementation
};

// ❌ BAD
const getMovie = async (id: any) => {
  // no return type
};
```

### Error Handling

```typescript
// ✅ GOOD
if (!movie) {
  throw new NotFoundError('Movie');
}

// ❌ BAD
if (!movie) {
  return null; // Don't return null
}
```

### Async/Await

```typescript
// ✅ GOOD
export const getMovies = asyncHandler(async (req, res) => {
  const movies = await movieService.getAll();
  sendSuccess(res, movies);
});

// ❌ BAD - Don't use .then().catch()
export const getMovies = (req, res) => {
  movieService.getAll()
    .then(movies => res.json(movies))
    .catch(err => res.status(500).json(err));
};
```

## 🧪 Testing

Postman ilə test etmədən PR açmayın!

### Test Checklist:
- [ ] Happy path (normal scenario)
- [ ] Validation errors (yanlış data)
- [ ] Not found scenarios
- [ ] Edge cases

### Postman Example:

```json
// POST /api/v1/movies
{
  "title": "Inception",
  "year": 2010,
  "director": "Christopher Nolan",
  "genres": ["Action", "Sci-Fi"],
  "duration": 148
}
```

## 📁 File Organization

### Yeni route əlavə edərkən:

```
src/
├── routes/
│   └── movie.routes.ts       # Route definitions
├── controllers/
│   └── movie.controller.ts   # Request handlers
└── services/
    └── movie.service.ts      # Business logic
```

### Import order:

```typescript
// 1. External imports
import express from 'express';
import { z } from 'zod';

// 2. Internal imports - types
import { Movie } from '../types';

// 3. Internal imports - utilities
import { storage } from '../utils/storage';
import { asyncHandler } from '../middleware/errorHandler';

// 4. Internal imports - local
import { movieService } from '../services/movie.service';
```

## 🚨 Common Mistakes

### ❌ Avoid:

1. **any type istifadə etmək**
   ```typescript
   // BAD
   const movie: any = {...};
   ```

2. **console.log buraxmaq**
   ```typescript
   // BAD
   console.log('Debug:', data); // Use logger instead
   ```

3. **Error-ları swallow etmək**
   ```typescript
   // BAD
   try {
     await doSomething();
   } catch (err) {
     // Silent fail - never do this!
   }
   ```

4. **Hard-coded values**
   ```typescript
   // BAD
   const limit = 10; // Use env variable or constant
   ```

## ✅ Best Practices

1. **Use TypeScript types**
2. **Use logger, not console.log**
3. **Always validate input**
4. **Use async/await**
5. **Write meaningful variable names**
6. **Add comments for complex logic**
7. **Handle errors properly**
8. **Use constants for magic numbers**

## 🎯 Pull Request Template

```markdown
## Task
Closes #[task-number]

## Description
[What did you implement?]

## Changes
- Added movie CRUD endpoints
- Added validation schemas
- Added error handling

## Testing
- [x] Tested with Postman
- [x] All endpoints working
- [x] Error cases handled

## Screenshots/Examples
[Optional: Add API response examples]
```

## 🆘 Need Help?

1. Check existing code examples
2. Read TASKS.md
3. Ask team members

Happy coding! 🚀
