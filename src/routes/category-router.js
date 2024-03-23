import { Router } from 'express';
const router = Router();

import { isAdmin } from '../middlewars/admin-middleware.js';

import {
    getCategory,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/category-controller.js';

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', isAdmin, createCategory);
router.put('/:id', isAdmin, updateCategory);
router.delete('/:id', isAdmin, deleteCategory);

export default router;
