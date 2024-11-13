import express from 'express';

import orderRouter from './orderRoutes.js';
import favRouter from './favRoutes.js';
import checkoutRouter from './checkoutRoutes.js';

const router = express.Router();

router.use('/favorite', favRouter);
router.use('/orders', orderRouter);
router.use('/checkout', checkoutRouter);

export default router;
