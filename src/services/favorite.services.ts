import { storage } from "../utils/storage"; 
import { generateId, getCurrentTimestamp } from "../utils/helpers";
import { User, Movie, FavoriteItem } from "../types";

export const favoriteService = {
  add: async (userId: string, movieId: string) => {
    const users = await storage.users.read() as User[];
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error("User not found");

    const movies = await storage.movies.read() as Movie[];
    const movie = movies.find(m => m.id === movieId);
    if (!movie) throw new Error("Movie not found");

    const favorites = await storage.favorites.read() as FavoriteItem[];
    if (favorites.some(f => f.userId === userId && f.movieId === movieId))
      throw new Error("Movie already in favorites");

    const newItem: FavoriteItem = {
      id: generateId(),
      userId,
      movieId,
      addedAt: getCurrentTimestamp()
    };

    favorites.push(newItem);
    await storage.favorites.write(favorites);
    return newItem;
  },

  get: async (userId: string) => {
    const users = await storage.users.read() as User[];
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error("User not found");

    const favorites = await storage.favorites.read() as FavoriteItem[];
    const movies = await storage.movies.read() as Movie[];

    return favorites
      .filter(f => f.userId === userId)
      .map(f => movies.find(m => m.id === f.movieId))
      .filter(Boolean) as Movie[];
  },

  remove: async (userId: string, movieId: string) => {
    const favorites = await storage.favorites.read() as FavoriteItem[];
    const newList = favorites.filter(f => !(f.userId === userId && f.movieId === movieId));

    if (newList.length === favorites.length) throw new Error("Movie not in favorites");

    await storage.favorites.write(newList);
    return { message: "Removed" };
  }
};
