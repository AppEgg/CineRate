import { Movie } from '@/types';
import { BadRequestError, ConflictError, NotFoundError } from '@/utils/errors';
import { generateId, getCurrentTimestamp } from '@/utils/helpers';
import { storage } from '@/utils/storage';

// Get all movies
const getAll = async (): Promise<Movie[]> => {
  const movies = (await storage.movies.read()) as Movie[];
  return movies.map((m: Movie) => ({
    id: m.id,
    title: m.title || 'Unknown Title',
    description: m.description || 'No description available',
    year: m.year || new Date().getFullYear(),
    director: m.director || 'Unknown Director',
    genres: m.genres || [],
    duration: m.duration || 0,
    posterUrl: m.posterUrl || '',
    trailerUrl: m.trailerUrl || '',
    cast: m.cast || [],
    createdAt: m.createdAt || getCurrentTimestamp(),
    updatedAt: m.updatedAt || getCurrentTimestamp(),
  }));
};

//Get movie by ID
const getById =async(id:string):Promise<Movie>=>{
  const movie = await storage.movies.findById(id) as Movie
  if(!movie) throw new NotFoundError('Movie')
  return movie
}

//Create new movie
const create = async (data: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie> => {
  if (!data.title || !data.year) throw new BadRequestError('Title and year are required');

  const movies = await getAll();
  const exists = movies.find((m) => m.title === data.title);
  if (exists) throw new ConflictError('Movie already exists');

  const now = getCurrentTimestamp();
  const movie: Movie = {
    id: generateId(),
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  await storage.movies.create(movie);
  return movie;
};

//Update movie
type MovieUpdate = Partial<Omit<Movie, 'id' | 'createdAt'>>; 

const update = async (
  id: string,
  updates: MovieUpdate
): Promise<Movie> => {
  const movie = await getById(id);
  if (!movie) throw new NotFoundError('Movie');

  const updatedMovie: Movie = {
    ...movie,
    ...updates,
    updatedAt: getCurrentTimestamp(),
  };
  await storage.movies.update(id, updatedMovie);
  return updatedMovie;
};

//Delete movie
const remove= async(id:string): Promise<void>=>{
  const movie = await getById(id)
  if (!movie) throw new NotFoundError('Movie');
  await storage.movies.delete(id);
}


export const movieService = {
  getAll,
  getById,
  create,
  update,
  remove
};
