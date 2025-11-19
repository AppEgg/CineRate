// src/utils/jsonStorage.ts
import fs from "fs";
import path from "path";

const moviesPath = path.join(__dirname, "../../data/movies.json");

// JSON fayldan oxu
export const readMovies = () => {
  const data = fs.readFileSync(moviesPath, "utf-8");
  return JSON.parse(data);
};

// JSON fayla yaz
export const writeMovies = (movies: any[]) => {
  fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2));
};
