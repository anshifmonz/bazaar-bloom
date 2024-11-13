import express from "express";

import isAuthenticated from '../middleware/authCheckMiddleware.js';

import showCart from '../controller/showCartController.js';
import addCartItem from '../controller/addCartItemController.js';
import updateCartQuantity from '../controller/updateCartQuantityController.js';
import delCartProduct from '../controller/delCartProductController.js';
import createCartController from "../controller/createCartController.js";

const router = express.Router();

router.get('/', isAuthenticated, showCart);
router.post('/', isAuthenticated, addCartItem);
router.put('/', isAuthenticated, updateCartQuantity);
router.delete('/', isAuthenticated, delCartProduct);

router.post('/create-cart', createCartController);

export default router;