import { z } from 'zod'

export const reviewSchema = z.object({
    id: z.string().min(1, "ID is required"),
    movieId: z.string().min(1, "Movie ID is required"),
    userId: z.string().min(1, "User ID is required"),
    rating: z.string().min(1, "Rating must be at least 1").max(10, "Rating cannot exceed 10"),
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Review content is required"),
    helpfulCount: z.number()
})