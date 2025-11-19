import { Router } from "express";
import { favoriteController } from "../controllers/favorite.controller"; 

const router = Router();

router.post("/users/:userId/favorites", favoriteController.add);

router.get("/users/:userId/favorites", favoriteController.get);

router.delete("/users/:userId/favorites/:movieId", favoriteController.remove);

export default router;
