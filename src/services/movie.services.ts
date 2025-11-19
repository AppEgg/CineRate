import { storage } from "../utils/storage"; 
import { generateId, getCurrentTimestamp } from "../utils/helpers";
import { User, Movie, WatchlistItem } from "../types";

export const watchlistService = {
  add: async (userId: string, movieId: string) => {
    const users = (await storage.users.read()) as User[];
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error("User not found");

    const movies = (await storage.movies.read()) as Movie[];
    const movie = movies.find(m => m.id === movieId);
    if (!movie) throw new Error("Movie not found");

    const watchlist = (await storage.watchlist.read()) as WatchlistItem[];

    const exists = watchlist.some(w => w.userId === userId && w.movieId === movieId);
    if (exists) throw new Error("Movie already exists in watchlist");

    const newItem: WatchlistItem = {
      id: generateId(),
      userId,
      movieId,
      addedAt: getCurrentTimestamp()
    };

    watchlist.push(newItem);
    await storage.watchlist.write(watchlist);

    return newItem;
  },

  get: async (userId: string) => {
    const users = (await storage.users.read()) as User[];
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error("User not found");

    const watchlist = (await storage.watchlist.read()) as WatchlistItem[];
    const movies = (await storage.movies.read()) as Movie[];

    const fullMovies: Movie[] = [];

    for (const item of watchlist) {
      if (item.userId === userId) {
        const movie = movies.find(m => m.id === item.movieId);
        if (movie) fullMovies.push(movie);
      }
    }

    return fullMovies;
  },

  remove: async (userId: string, movieId: string) => {
    const watchlist = (await storage.watchlist.read()) as WatchlistItem[];
    const newList: WatchlistItem[] = [];
    let found = false;

    for (const item of watchlist) {
      if (item.userId === userId && item.movieId === movieId) {
        found = true; 
      } else {
        newList.push(item); 
      }
    }

    if (!found) throw new Error("Movie not in watchlist");

    await storage.watchlist.write(newList);

    return { message: "Removed" };
  }
};


