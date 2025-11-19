import { movieService } from '@/services/movie.service';
import { asyncHandler } from '@/middleware/errorHandler';
import { sendCreated, sendSuccess } from '@/middleware/responseHandler';


//GET /api/v1/movies
const getMovies = asyncHandler(async (req, res) => {
  const movies = await movieService.getAll();
  return sendSuccess(res, movies);
});

//GET /api/v1/movies/:id
const getMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await movieService.getById(id);
  return sendSuccess(res, movie);
});

//POST /api/v1/movies
const createMovie = asyncHandler(async (req, res) => {
  const movie = await movieService.create(req.body);
  return sendCreated(res, movie);
});

//PUT /api/v1/movies/:id
const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await movieService.update(id, req.body);
  return sendSuccess(res, movie);
});

//DELETE /api/v1/movies/:id
const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await movieService.remove(id);
  return sendSuccess(res, movie, 'Movie deleted successfully');
});
export const MovieController = {
  getMovie,
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
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
