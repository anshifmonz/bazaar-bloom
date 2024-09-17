import express from 'express';

import productRouter from './productRoutes.js';
import cartRouter from './cartRoutes.js';
import orderRouter from './orderRoutes.js';
import favRouter from './favRoutes.js';
import checkoutRouter from './checkoutRoutes.js';

const router = express.Router();

router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/favorite', favRouter);
router.use('/orders', orderRouter);
router.use('/checkout', checkoutRouter);

export default router;
