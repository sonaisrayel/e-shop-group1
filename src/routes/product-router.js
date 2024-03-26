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

router.get('/', getProducts);
router.get('/:id', getProduct);

router.use(isAuthorized);

router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', updateProduct);

export default router;
