<<<<<<< HEAD
import { Router } from "express";
import { listMovies } from "../controllers/movie.controller";

const router = Router();

router.get("/movies", listMovies);

export default router;
=======
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
>>>>>>> 1bd836fff904e4fa581d859e88990ac5ca76a042
