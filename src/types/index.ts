/**
 * Base Movie interface
 */
export interface Movie {
  id: string;
  title: string;
  description: string;
  year: number;
  director: string;
  genres: string[];
  duration: number; // in minutes
  posterUrl?: string;
  trailerUrl?: string;
  cast: string[];
  createdAt: string;
  updatedAt: string;
  rating: number;
}

/**
 * Review interface
 */
export interface Review {
  id: string;
  movieId: string;
  userId: string;
  rating: number; // 1-10
  title: string;
  content: string;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * User interface (simplified - no authentication yet)
 */
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

/**
 * Watchlist item
 */
export interface WatchlistItem {
  id: string;
  userId: string;
  movieId: string;
  addedAt: string;
}

/**
 * Movie statistics
 */
export interface MovieStats {
  movieId: string;
  averageRating: number;
  totalReviews: number;
  totalWatchlisted: number;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Filter and sort options for movies
 */
export interface MovieFilterOptions {
  q?:string;
  genres?: string[];
  year?: number;
  minRating?: number;
  maxRating?: number;
  director?: string;
}

export interface MovieSortOptions {
  sortBy?: 'title' | 'year' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
