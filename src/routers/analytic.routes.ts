import { activeUsers, averageRate, getPopularGenres, monthlyTrends, mostReviewed, totalMovies, totalReviews, totalUsers } from "../reports/analytics";
import { Router } from "express";

const route = Router()

route.get('/overview', (req, res, next) => {
    const totalMoviesLength = totalMovies()
    const totalReviewLength = totalReviews()
    const totalUserLength = totalUsers()
    const activeReviewers = activeUsers()
    res.status(200).json({
        totalMovies: totalMoviesLength,
        totalReviews: totalReviewLength,
        totalUsers: totalUserLength,
        activeUsers: activeReviewers,
        lastUpdated: new Date().toISOString()
    })
})

route.get('/movies/popular', (req, res, next) => {
    const lastMoviesList = monthlyTrends()
    const popGenres = getPopularGenres()
    res.status(200).json({
        lastMovies: lastMoviesList,
        popularGenres: popGenres,
        lastUpdated: new Date().toISOString()
    })
})

route.get('/reviews/recent', (req, res, next) => {
    const mostRevMovies = mostReviewed()
    const averageRateTable = averageRate()
    res.status(200).json({
        mostReviewedMovies: mostRevMovies,
        ratingTable: averageRateTable,
        lastUpdated: new Date().toISOString()
    })
})

export default route;