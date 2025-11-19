import { storage } from '@/utils/storage';
import { generateId, getCurrentTimestamp } from '@/utils/helpers';
import { WatchlistItem } from '@/types';

class WatchlistService {
  async add(userId: string, movieId: string) {
    const item: WatchlistItem = {
      id: generateId(),
      userId,
      movieId,
      addedAt: getCurrentTimestamp(),
    };

    await storage.watchlist.create(item as any);
    return item;
  }

  async get(userId: string) {
    const items = await storage.watchlist.findMany((w: any) => w.userId === userId);
    return items;
  }

  async remove(userId: string, movieId: string) {
    const items = await storage.watchlist.read();
    const toRemove = items.find((i: any) => i.userId === userId && i.movieId === movieId);
    if (!toRemove) return { removed: false };
    const ok = await storage.watchlist.delete(toRemove.id);
    return { removed: ok };
  }
}

export const watchlistService = new WatchlistService();
