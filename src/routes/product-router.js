import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from '../controllers/product-controller.js';

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', updateProduct);

export default router;
