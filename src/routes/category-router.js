import { Router } from 'express';
const router = Router();

import { getCategory, getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/category-controller.js';

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
