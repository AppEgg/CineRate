import { Request, Response, NextFunction} from "express";
import * as ratingsStore from "../services/stats.service"

export async function getStatsByMovie(req: Request, res: Response ,next: NextFunction){
    try{
        const stats = await ratingsStore.getStatsByMovie(req.params.id)
        // return res.success(stats)
    } 
    catch(err) {
        next(err);
    }
}

export  async function getTopRatedMovies(req: Request, res: Response, next: NextFunction){
    try {
        const limit = Number(req.query.limit) || 10;
        // const result = await ratingsStore.getTopRatedMovies(limit);
        // return res.success(result)
    }
    catch(err) {
        next(err);
    }
}

export async function getOverview(req: Request, res: Response, next: NextFunction){
    try{
        const overview = await ratingsStore.getOverview();
        // return res.success(overview)
    }
    catch(err){
        next(err);
    }
}
