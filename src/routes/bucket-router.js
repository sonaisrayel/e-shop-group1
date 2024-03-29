import { Router } from 'express';
const router = Router();

import { getBucket, updateBucket, deleteProductFromBucket } from '../controllers/bucket-controller.js';

router.get('/', getBucket);
router.post('/', updateBucket);
router.delete('/:productId', deleteProductFromBucket);

export default router;
