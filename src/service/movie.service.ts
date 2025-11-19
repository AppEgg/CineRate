import { readMovies } from "../utils/jsonStorage";

interface QueryParams {
  search?: string;
  genre?: string;
  year?: number;
  director?: string;
  sort?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export const getMovies = (query: QueryParams) => {
  let movies = readMovies();

  // 1️ Filter
  if (query.search) {
    const searchLower = query.search.toLowerCase();
    movies = movies.filter(
      (m: any) =>
        m.title.toLowerCase().includes(searchLower) ||
        (m.description && m.description.toLowerCase().includes(searchLower))
    );
  }

  if (query.genre) {
    const genres = query.genre.split(",");
    movies = movies.filter((m: any) =>
      genres.some((g) => m.genres.includes(g))
    );
  }

  if (query.year) {
    movies = movies.filter((m: any) => m.year === Number(query.year));
  }
if (query.director) {
  const directorLower = query.director.toLowerCase(); // artıq string kimi qəbul edilir

  movies = movies.filter((m: any) =>
    m.director.toLowerCase().includes(directorLower)
  );
}

  // 2️ Sort
  if (query.sort) {
    const order = query.sortOrder === "desc" ? -1 : 1;
    movies.sort((a: any, b: any) =>
      a[query.sort!] > b[query.sort!] ? 1 * order : -1 * order
    );
  }

  // 3️ Pagination
  const page = query.page ? Number(query.page) : 1;
  const limit = query.limit ? Number(query.limit) : 10;
  const total = movies.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = movies.slice(start, end);

  return {
    page,
    limit,
    total,
    totalPages,
    data,
  };
};
