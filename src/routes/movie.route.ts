import { Router } from 'express';
import { getStatsByMovie, getTopRatedMovies} from "../controllers/stats.controller";

const router = Router();

router.get("/:id/stats", getStatsByMovie);
router.get("/top-rated", getTopRatedMovies);