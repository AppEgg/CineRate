# CineRate - Movie Rating & Review Platform API

A RESTful API for a movie rating and review platform built with TypeScript, Express.js, and JSON file storage.

## 🎯 Project Overview

This is a collaborative student project where each team member implements specific features. The application allows users to browse movies, write reviews, manage watchlists, and get personalized recommendations.

## 🏗️ Architecture

```
src/
├── app.ts                  # Express app configuration
├── server.ts              # Server entry point
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions (storage, logger, errors, helpers)
├── middleware/            # Express middleware
├── routes/                # API route handlers (TO BE IMPLEMENTED)
├── controllers/           # Route controllers (TO BE IMPLEMENTED)
└── services/              # Business logic (TO BE IMPLEMENTED)

data/                      # JSON file storage
├── movies.json
├── reviews.json
├── users.json
└── watchlist.json
```

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Run the development server:
```bash
npm run dev
```

The server will start at `http://localhost:3000`

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## 🚀 Getting Started

The base structure is already set up with:
- ✅ Express server configuration
- ✅ TypeScript setup with path aliases
- ✅ Error handling system (Problem+JSON format)
- ✅ Request logging with Pino
- ✅ JSON file storage utilities
- ✅ Type definitions for all entities
- ✅ Middleware helpers

## 📋 Student Tasks

Each student will work on a separate feature branch. See `TASKS.md` for detailed task descriptions.

### Quick Task Overview:

1. **Movie CRUD** - Create, read, update, delete movies
2. **Review System** - Add, edit, delete reviews
3. **Watchlist** - Personal movie watchlist management
4. **Search Engine** - Advanced search functionality
5. **Sorting & Pagination** - Data sorting and pagination
6. **Rating System** - Calculate and display ratings
7. **Recommendations** - Movie recommendation algorithm
8. **Validation** - Zod schema validation
9. **Error Handling** - Enhanced error responses
10. **Logging** - Advanced request logging
11. **Rate Limiting** - API rate limiting
12. **Data Export** - Export data to CSV/JSON
13. **Analytics** - Statistics and reports
14. **Testing** - Unit and integration tests
15. **Frontend - Movies** - Movie listing and details pages
16. **Frontend - Search** - Search and filter UI
17. **Frontend - Dashboard** - User dashboard
18. **Documentation** - API documentation

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Framework**: Express.js
- **Validation**: Zod
- **Logging**: Pino
- **Storage**: JSON files
- **Code Quality**: ESLint + Prettier

## 📚 Key Concepts Used

- RESTful API design
- Problem+JSON error format (RFC 7807)
- Async/await error handling
- Request correlation IDs
- TypeScript strict mode
- Clean architecture patterns

## 🤝 Collaboration Workflow

1. Pick a task from `TASKS.md`
2. Create a feature branch: `git checkout -b feature/task-name`
3. Implement your feature following the guidelines
4. Test your implementation
5. Create a pull request
6. Code review and merge

## 📖 API Documentation

Base URL: `http://localhost:3000/api/v1`

### Health Check
```
GET /health
```

More endpoints will be added as features are implemented.

## 🎓 Learning Objectives

- Building production-ready REST APIs
- TypeScript in Node.js applications
- Error handling and validation
- Logging and monitoring
- Code organization and architecture
- Team collaboration with Git
- API design best practices

## 📝 License

MIT
