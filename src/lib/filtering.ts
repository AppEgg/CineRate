import { Movie, MovieFilterOptions } from '@/types';

export function applyFilter(data: Movie[], query: MovieFilterOptions) {
  // movies?genre=Action&year=2010&minRating=7
  let result = data;

  if (query.genres && query.genres.length > 0) {
    result = result.filter((movie) =>
      movie.genres.some((g) =>
        query.genres?.map((gs) => gs.toLowerCase()).includes(g.toLowerCase())
      )
    );
  }

  if (typeof query.year === 'string') {
    const year = Number(query.year);
    if (!isNaN(year)) {
      result = result.filter((movie) => movie.year === year);
    }
  }

  if (typeof query.director === 'string') {
    const directors = query.director.toLowerCase();
    result = result.filter((movie) => movie.director.toLowerCase().includes(directors));
  }

  if (query.minRating !== 0) {
    const minRating = Number(query.minRating);
    if (!isNaN(minRating)) {
      result = result.filter((movie) => movie.rating >= minRating);
    }
  }

  if (query.maxRating !== 0) {
    const maxRating = Number(query.maxRating);
    if (!isNaN(maxRating)) {
      result = result.filter((movie) => movie.rating <= maxRating);
    }
  }
  return result
}

