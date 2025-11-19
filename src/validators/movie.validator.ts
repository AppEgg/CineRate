import { number, z } from 'zod'

export const creatBookShema = z.object({
    id: z.string().min(1, "ID is required"),
    title: z.string().min(1, "Title is required"),
    description: z.string(),
    year: z.number().min(1950).max(new Date().getFullYear()),
    director: z.string(),
    genres: z.array(z.string()).min(1, "At least one genre is required"),
    duration: z.number().min(1, "Duration must be at least 1 minute"),
    posterUrl: z.string().url().optional(),
    trailerUrl: z.string().url(),
    cast: z.array(z.string().min(1,"At least one cast member is required")),
    createdAt: z.string(),
    updatedAt: z.string()
})