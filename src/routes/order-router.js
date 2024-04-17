import { Router } from 'express';
const router = Router();

import { createOrder, getOrders, updateOrder } from '../controllers/order-controller.js';

router.post('/', createOrder);
router.get('/:buyerId', getOrders);
router.patch('/', updateOrder);
export default router;
