import { Router } from 'express';
const router = Router();

import {
    getBucket,
    addProductToBucket,
    updateProductInBucket,
    deleteProductFromBucket,
} from '../controllers/bucket-controller.js';

router.get('/', getBucket);
router.post('/', addProductToBucket);
router.patch('/:productId', updateProductInBucket);
router.delete('/:productId', deleteProductFromBucket);

export default router;
