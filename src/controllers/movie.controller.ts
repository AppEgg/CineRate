import { movieService } from '@/services/movie.service';
import { asyncHandler } from '@/middleware/errorHandler';
import { sendCreated, sendSuccess } from '@/middleware/responseHandler';

//GET /api/v1/movies
const getMovies = asyncHandler(async (req, res) => {
  const movies = await movieService.getAll();
  sendSuccess(res, movies);
});

//GET /api/v1/movies/:id
const getMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await movieService.getById(id);
  sendSuccess(res, movie);
});

//POST /api/v1/movies
const createMovie = asyncHandler(async (req, res) => {
  const movie = await movieService.create(req.body);
  sendCreated(res, movie);
});

//PUT /api/v1/movies/:id
const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await movieService.update(id, req.body);
  sendSuccess(res, movie);
});

//DELETE /api/v1/movies/:id
const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await movieService.remove(id);
  sendSuccess(res, movie, 'Movie deleted successfully');
});
export const MovieController = {
  getMovie,
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
// watchlist controller has been moved to its own module: src/controllers/watchlist.controller.ts
