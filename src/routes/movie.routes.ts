import {Router} from 'express'
import { MovieController, watchlistController } from '@/controllers/movie.controller'

const router = Router()

//Movie Routes
router.get('/',MovieController.getMovies)
router.get('/:id',MovieController.getMovie)
router.post('/',MovieController.createMovie)
router.put('/:id',MovieController.updateMovie)
router.delete('/:id',MovieController.deleteMovie)

router.post("/users/:userId/watchlist", watchlistController.add);
router.get("/users/:userId/watchlist", watchlistController.get);
router.delete("/users/:userId/watchlist/:movieId", watchlistController.remove);

export default router;
