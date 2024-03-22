import { Router } from 'express';
const router = Router();

import { getBucket, addProductToBucket, deleteProductFromBucket } from '../controllers/bucket-controller.js';

router.get('/', getBucket);
router.post('/', addProductToBucket);
router.delete('/:productId', deleteProductFromBucket);

export default router;
