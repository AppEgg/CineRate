import {Router} from 'express'
import { MovieController } from '@/controllers/movie.controller'

const router = Router()

//Movie Routes
router.get('/',MovieController.getMovies)
router.get('/:id',MovieController.getMovie)
router.post('/',MovieController.createMovie)
router.put('/:id',MovieController.updateMovie)
router.delete('/:id',MovieController.deleteMovie)


export default router