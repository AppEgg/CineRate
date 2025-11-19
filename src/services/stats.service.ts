import { Review } from "@/types";
import { AppError } from "@/utils/errors";

export async function getStatsByMovie(id: string){
    const reviews: Review[] = [];
    const movieReviews = reviews.filter( r => r.movieId == id)

    if (movieReviews.length === 0 ) throw new AppError('No reviews found for this movie');

    const avgRating = movieReviews.reduce( (sum, r) => sum + r.rating, 0) / movieReviews.length;

    const ratingDistribution : Record<number, number> = {};
    for ( let i=1; i <=10; i++ ) ratingDistribution[i] = 0;  
    
    movieReviews.forEach( r => {
        ratingDistribution[r.rating] = (ratingDistribution[r.rating] ?? 0)
    })
    
    return {
        id,
        averageRating: Number(avgRating.toFixed(2)),
        totalReviews: movieReviews.length,
        ratingDistribution
    };

};
export async function getTopRatedMovies(){
    
};
export async function getOverview (){   
};