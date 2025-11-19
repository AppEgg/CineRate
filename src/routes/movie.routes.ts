import express from "express";
import { watchlistController } from "../controllers/movie.controller"; 
const router = express.Router();

router.post("/users/:userId/watchlist", watchlistController.add);
router.get("/users/:userId/watchlist", watchlistController.get);
router.delete("/users/:userId/watchlist/:movieId", watchlistController.remove);

export default router;
