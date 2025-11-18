import { Request, Response } from "express";
import { getMovies } from "../service/movie.service";

export const listMovies = (req: Request, res: Response) => {
  const result = getMovies(req.query);
  res.json({
    success: true,
    ...result,
  });
};
