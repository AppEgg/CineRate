import { Router } from 'express';
import { reviewController } from '../controllers/review.controller';

const router = Router();

/**
 * Review Routes
 */
router.post('/movies/:movieId/reviews', reviewController.create);
router.get('/movies/:movieId/reviews', reviewController.getByMovieId);
router.get('/reviews/:id', reviewController.getById);
router.put('/reviews/:id', reviewController.update);
router.delete('/reviews/:id', reviewController.delete);

export default router;

