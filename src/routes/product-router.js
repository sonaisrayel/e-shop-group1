import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from '../controllers/product-controller.js';
import { isAuthorized } from '../middlewars/auth-middleware.js';

const router = Router();

router.post('/', isAuthorized, createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.delete('/:id', isAuthorized, deleteProduct);
router.patch('/:id', isAuthorized, updateProduct);

export default router;
