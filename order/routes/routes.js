import express from "express";

import orderProduct from '../controller/orderProductController.js';
import orderCart from '../controller/orderCartController.js';
import orderCancel from '../controller/orderCancelController.js';
import showOrders from '../controller/showOrdersController.js';
import showAOrderDetails from '../controller/showAOrderDetailController.js';

const router = express.Router();

router.get('/', showOrders);
router.get('/:orderId', showAOrderDetails);
router.post('/product', orderProduct);
router.post('/cart', orderCart);
router.post('/cancel', orderCancel);

export default router;
