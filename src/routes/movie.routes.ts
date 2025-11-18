import { Router } from "express";
import { listMovies } from "../controllers/movie.controller";

const router = Router();

router.get("/movies", listMovies);

export default router;
