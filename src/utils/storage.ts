import fs from 'fs/promises';
import path from 'path';

/**
 * JSON Storage Utility
 * Handles reading and writing JSON files for data persistence
 */
export class JsonStorage<T extends { id: string }> {
  private filePath: string;

  constructor(filename: string) {
    const dataDir = process.env.DATA_DIR || './data';
    this.filePath = path.join(process.cwd(), dataDir, filename);
  }

  /**
   * Read all data from JSON file
   */
  async read(): Promise<T[]> {
    try {
      await this.ensureFileExists();
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as T[];
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON in file: ${this.filePath}`);
      }
      throw error;
    }
  }

  /**
   * Write data to JSON file
   */
  async write(data: T[]): Promise<void> {
    try {
      await this.ensureDirectoryExists();
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(this.filePath, jsonData, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to write to file: ${this.filePath}`);
    }
  }

  /**
   * Find item by ID
   */
  async findById(id: string): Promise<T | undefined> {
    const data = await this.read();
    return data.find((item) => item.id === id);
  }

  /**
   * Find items by condition
   */
  async findMany(predicate: (item: T) => boolean): Promise<T[]> {
    const data = await this.read();
    return data.filter(predicate);
  }

  /**
   * Add new item
   */
  async create(item: T): Promise<T> {
    const data = await this.read();
    data.push(item);
    await this.write(data);
    return item;
  }

  /**
   * Update existing item
   */
  async update(id: string, updates: Partial<T>): Promise<T | null> {
    const data = await this.read();
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    data[index] = { ...data[index], ...updates };
    await this.write(data);
    return data[index];
  }

  /**
   * Delete item by ID
   */
  async delete(id: string): Promise<boolean> {
    const data = await this.read();
    const filteredData = data.filter((item) => item.id !== id);

    if (filteredData.length === data.length) {
      return false; // Item not found
    }

    await this.write(filteredData);
    return true;
  }

  /**
   * Clear all data
   */
  async clear(): Promise<void> {
    await this.write([]);
  }

  /**
   * Get count of items
   */
  async count(): Promise<number> {
    const data = await this.read();
    return data.length;
  }

  /**
   * Check if file exists, create if not
   */
  private async ensureFileExists(): Promise<void> {
    try {
      await fs.access(this.filePath);
    } catch {
      await this.ensureDirectoryExists();
      await fs.writeFile(this.filePath, '[]', 'utf-8');
    }
  }

  /**
   * Ensure data directory exists
   */
  private async ensureDirectoryExists(): Promise<void> {
    const dir = path.dirname(this.filePath);
    await fs.mkdir(dir, { recursive: true });
  }
}

/**
 * Storage factory - creates storage instances for different entities
 */
export const storage = {
  movies: new JsonStorage('movies.json'),
  reviews: new JsonStorage('reviews.json'),
  users: new JsonStorage('users.json'),
  watchlist: new JsonStorage('watchlist.json'),
  favorites: new JsonStorage('favorites.json'),
};
