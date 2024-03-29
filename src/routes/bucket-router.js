import { Router } from 'express';
const router = Router();

import { getBucket, updateBucket, deleteProductFromBucket, deleteBucket } from '../controllers/bucket-controller.js';

router.get('/', getBucket);
router.post('/', updateBucket);
router.delete('/:productId', deleteProductFromBucket);
router.delete('/', deleteBucket);

export default router;
