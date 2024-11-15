import express from "express";

import isAuthenticated from '../middleware/authCheckMiddleware.js';

import orderProduct from '../controller/orderProductController.js';
import orderCart from '../controller/orderCartController.js';
import orderCancel from '../controller/orderCancelController.js';
import showOrders from '../controller/showOrdersController.js';
import showAOrderDetails from '../controller/showAOrderDetailController.js';

import getOrderItemDetails from "../controller/external/getOrderItemDetailController.js";

const router = express.Router();

router.get('/', isAuthenticated, showOrders);
router.get('/:orderId', isAuthenticated, showAOrderDetails);
router.post('/product', isAuthenticated, orderProduct);
router.post('/cart', isAuthenticated, orderCart);
router.post('/cancel', isAuthenticated, orderCancel);

router.post('/order-item', getOrderItemDetails);

export default router;
