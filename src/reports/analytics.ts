import type { Movie, Review, User, Universal } from '../types'
import { storage } from '../utils/storage'

// Bos data-lar
let movies: Movie[];
let reviews: Review[];
let users: User[]

// Butun data-lar cagrilib menimsedilir
(async function getData() {
    movies = await storage.movies.read()
    reviews = await storage.reviews.read()
    users = await storage.users.read()
})();

// Total Movies Length
export function totalMovies(): number {
    return movies.length
}

// Total Reviews length
export function totalReviews(): number {
    return reviews.length
}

// Total Users length
export function totalUsers(): number {
    return users.length
}

// The most Reviewer Users
export function activeUsers() {
    const record: Record<string, number> = {}
    reviews.forEach(r => {
        if (!record[r.userId]) record[r.userId] = 1
        else record[r.userId]++
    })
    const recordArr = Object.entries(record);
    const activeUsers = recordArr
        .filter(([, count]) => count > 1)
        .map(([userId, count]) => ({ userId, count }));
    return activeUsers
}

// The last added movies (You can choose any number of days - default:30)
export function monthlyTrends(day: number = 30): Movie[] {
    const now = new Date();
    let lastMovies: Movie[] = []
    movies.forEach(m => {
        const created = new Date(m.createdAt)
        const time = now.getTime() - created.getTime();
        const dayDiff = time / (1000 * 60 * 60 * 24)
        if (day >= dayDiff) lastMovies.push(m)
    })
    return lastMovies;
}

// The most reviewed movies
export function mostReviewed() {
    const record: Record<string, number> = {}
    reviews.forEach(r => {
        if (!record[r.movieId]) record[r.movieId] = 1
        else record[r.movieId]++
    })
    const recordArr = Object.entries(record)
    const mostRevMov = recordArr
        .filter(([, count]) => count > 1)
        .map(([movieId, count]) => ({ movieId, count }))
    const mostReviewedMovies: Universal[] = []
    mostRevMov.forEach(r => {
        const movie = movies.find(m => m.id === r.movieId)
        if (movie) {
            mostReviewedMovies.push({
                id: r.movieId,
                title: movie?.title,
                count: r.count
            })
        }
    })
    return mostReviewedMovies
}

// Get reviewed movies from Movies data to use it in functions
export function getReviewedMovies() {
    const revMovie: Movie[] = []
    reviews.forEach(r => {
        const movie = movies.find(m => m.id === r.movieId)
        if (movie) {
            revMovie.push(movie)
        }
    })
    return revMovie
}

// The most popular genres
export function getPopularGenres() {
    const revMovie = getReviewedMovies()
    const genresCount: Record<string, number> = {}
    revMovie.forEach(m => {
        m.genres.forEach(g => {
            if (!genresCount[g]) genresCount[g] = 1
            else genresCount[g]++
        })
    })
    const popGen = Object.entries(genresCount)
    const popGenres = popGen.filter(([, count]) => count > 3).map(([genre, count]) => ({ genre, count }))
    return popGenres
}

// The average rating of the most popular genres
export function averageRate() {
    const rateTable: Record<string, { rate: number, count: number }> = {}
    reviews.forEach(rev => {
        const movie = movies.find(m => m.id === rev.movieId)
        movie?.genres.forEach(g => {
            if (!rateTable[g]) {
                rateTable[g] = { rate: rev.rating, count: 1 }
            }
            else {
                rateTable[g].rate += rev.rating
                rateTable[g].count++
            }
        })
    })
    const aveRateTable = Object.entries(rateTable)
    const averageRateTable = aveRateTable.map(([genre, { rate, count }]) => ({
        genre,
        averageRating: (rate / count).toFixed(1)
    }))
    return averageRateTable
}

