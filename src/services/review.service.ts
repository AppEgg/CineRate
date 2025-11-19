import { Review } from '../types';
import { storage } from '../utils/storage';
import { NotFoundError, BadRequestError, ValidationError } from '../utils/errors';
import { generateId, getCurrentTimestamp } from '../utils/helpers';

export class ReviewService {
  async createReview(
    reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpfulCount'>
  ): Promise<Review> {
    const movieExists = await this.movieExists(reviewData.movieId);
    if (!movieExists) {
      throw new NotFoundError('Movie');
    }

    const userExists = await this.userExists(reviewData.userId);
    if (!userExists) {
      throw new NotFoundError('User');
    }
    
    if (typeof reviewData.rating !== 'number' || reviewData.rating < 1 || reviewData.rating > 10) {
      throw new ValidationError({
        rating: ['Rating must be a number between 1 and 10'],
      });
    }

    if (!reviewData.title || typeof reviewData.title !== 'string' || reviewData.title.trim().length < 3) {
      throw new ValidationError({
        title: ['Title is required and must be at least 3 characters'],
      });
    }

    if (!reviewData.content || typeof reviewData.content !== 'string' || reviewData.content.trim().length < 10) {
      throw new ValidationError({
        content: ['Content is required and must be at least 10 characters'],
      });
    }

    const now = getCurrentTimestamp();
    const newReview: Review = {
      id: generateId(),
      movieId: reviewData.movieId,
      userId: reviewData.userId,
      rating: reviewData.rating,
      title: reviewData.title.trim(),
      content: reviewData.content.trim(),
      helpfulCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    await storage.reviews.create(newReview);
    return newReview;
  }

  async getReviewsByMovieId(movieId: string): Promise<Review[]> {
    const movieExists = await this.movieExists(movieId);
    if (!movieExists) {
      throw new NotFoundError('Movie');
    }

    const reviews = (await storage.reviews.findMany((review) => (review as Review).movieId === movieId)) as Review[];
    return reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getReviewById(reviewId: string): Promise<Review> {
    const review = (await storage.reviews.findById(reviewId)) as Review | undefined;

    if (!review) {
      throw new NotFoundError('Review');
    }

    return review;
  }

  async updateReview(
    reviewId: string,
    updates: Partial<Pick<Review, 'rating' | 'title' | 'content'>>
  ): Promise<Review> {
    const existingReview = (await storage.reviews.findById(reviewId)) as Review | undefined;
    if (!existingReview) {
      throw new NotFoundError('Review');
    }

    const validationErrors: Record<string, string[]> = {};

    if (updates.rating !== undefined) {
      if (typeof updates.rating !== 'number' || updates.rating < 1 || updates.rating > 10) {
        validationErrors.rating = ['Rating must be a number between 1 and 10'];
      }
    }

    if (updates.title !== undefined) {
      if (!updates.title || typeof updates.title !== 'string' || updates.title.trim().length < 3) {
        validationErrors.title = ['Title must be at least 3 characters'];
      }
    }

    if (updates.content !== undefined) {
      if (!updates.content || typeof updates.content !== 'string' || updates.content.trim().length < 10) {
        validationErrors.content = ['Content must be at least 10 characters'];
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      throw new ValidationError(validationErrors);
    }

    const updateData: Partial<Review> = {
      ...updates,
      updatedAt: getCurrentTimestamp(),
    };

    if (updates.title) {
      updateData.title = updates.title.trim();
    }

    if (updates.content) {
      updateData.content = updates.content.trim();
    }

    const updatedReview = (await storage.reviews.update(reviewId, updateData)) as Review | null;

    if (!updatedReview) {
      throw new NotFoundError('Review');
    }

    return updatedReview;
  }

  async deleteReview(reviewId: string): Promise<boolean> {
    const review = (await storage.reviews.findById(reviewId)) as Review | undefined;
    if (!review) {
      throw new NotFoundError('Review');
    }

    const deleted = await storage.reviews.delete(reviewId);
    return deleted;
  }

  async movieExists(movieId: string): Promise<boolean> {
    const movie = await storage.movies.findById(movieId);
    return movie !== undefined;
  }

  async userExists(userId: string): Promise<boolean> {
    const user = await storage.users.findById(userId);
    return user !== undefined;
  }
}

export const reviewService = new ReviewService();

