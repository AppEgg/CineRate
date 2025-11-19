import { Request, Response } from "express";
import { watchlistService } from "../services/movie.services";

export const watchlistController = {
  add: async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { movieId } = req.body;

    try {
      const result = await watchlistService.add(userId, movieId);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  get: async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const movies = await watchlistService.get(userId);
      res.json(movies);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  remove: async (req: Request, res: Response) => {
    const { userId, movieId } = req.params;

    try {
      const result = await watchlistService.remove(userId, movieId);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
};
