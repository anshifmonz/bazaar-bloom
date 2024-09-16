import express from "express";

import { isAuthenticated } from '../../middleware/authCheckMiddleware.js';
import showCart from '../../controller/store/cart/showCartController.js';
import addCartItem from '../../controller/store/cart/addCartItemController.js';
import updateCartQuantity from '../../controller/store/cart/updateCartQuantityController.js';
import delCartProduct from '../../controller/store/cart/delCartProductController.js';

const router = express.Router();

router.get('/', isAuthenticated, showCart);
router.post('/', isAuthenticated, addCartItem);
router.put('/', isAuthenticated, updateCartQuantity);
router.delete('/', isAuthenticated, delCartProduct);

export default router;
