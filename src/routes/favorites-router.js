import { Router } from 'express';
const router = Router();

import { getFavorites, deleteFavorite, addFavoriteProduct } from '../controllers/favorites-controller.js';

router.get('/', getFavorites);
router.post('/', addFavoriteProduct);
router.delete('/:productId', deleteFavorite);

export default router;
