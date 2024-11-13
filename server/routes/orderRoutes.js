import express from "express";

import { isAuthenticated } from "../middleware/authCheckMiddleware.js";

import orderProduct from '../controller/order/orderProductController.js';
import orderCart from '../controller/order/orderCartController.js';
import orderCancel from '../controller/order/orderCancelController.js';
import showOrders from '../controller/order/showOrdersController.js';
import showAOrderDetails from '../controller/order/showAOrderDetailController.js';

const router = express.Router();

router.get('/', isAuthenticated, showOrders);
router.get('/:orderId', isAuthenticated, showAOrderDetails);
router.post('/product', isAuthenticated, orderProduct);
router.post('/cart', isAuthenticated, orderCart);
router.post('/cancel', isAuthenticated, orderCancel);

export default router;
