import { Router } from 'express';
import { MovieController } from '@/controllers/movie.controller';
import { reviewController } from '../controllers/review.controller';

const router = Router();

//Movie Routes
router.get('/', MovieController.getMovies);
router.get('/:id', MovieController.getMovie);
router.post('/', MovieController.createMovie);
router.put('/:id', MovieController.updateMovie);
router.delete('/:id', MovieController.deleteMovie);
router.post('/:movieId/reviews', reviewController.create);
router.get('/:movieId/reviews', reviewController.getByMovieId);

export default router;
