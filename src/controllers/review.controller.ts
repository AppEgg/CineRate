import { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { sendSuccess, sendCreated, sendNoContent } from '../middleware/responseHandler';
import { asyncHandler } from '../middleware/errorHandler';

export class ReviewController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const { userId, rating, title, content } = req.body;

    const review = await reviewService.createReview({
      movieId,
      userId,
      rating,
      title,
      content,
    });

    sendCreated(res, review, 'Review created successfully');
  });

  getByMovieId = asyncHandler(async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const reviews = await reviewService.getReviewsByMovieId(movieId);
    sendSuccess(res, reviews);
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const review = await reviewService.getReviewById(id);
    sendSuccess(res, review);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rating, title, content } = req.body;

    const review = await reviewService.updateReview(id, {
      rating,
      title,
      content,
    });

    sendSuccess(res, review, 'Review updated successfully');
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await reviewService.deleteReview(id);
    sendNoContent(res);
  });
}

export const reviewController = new ReviewController();
