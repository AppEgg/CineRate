import { Router } from 'express';
import { userController } from '@/controllers/user.controller';
import { watchlistController } from '@/controllers/watchlist.controller';
import { favoriteController } from '../controllers/favorite.controller';

const router = Router();

// User routes
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.post('/:userId/watchlist', watchlistController.add);
router.get('/:userId/watchlist', watchlistController.get);
router.delete('/:userId/watchlist/:movieId', watchlistController.remove);

router.post('/:userId/favorites', favoriteController.add);
router.get('/:userId/favorites', favoriteController.get);
router.delete('/:userId/favorites/:movieId', favoriteController.remove);

export default router;
