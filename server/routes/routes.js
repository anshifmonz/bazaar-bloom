import express from 'express';

import checkoutRouter from './checkoutRoutes.js';

const router = express.Router();

router.use('/checkout', checkoutRouter);

export default router;
