import express from "express";

import adminCheck from '../middleware/adminCheckMiddleware.js';
import isAuthenticated from '../middleware/authCheckMiddleware.js';

import showProduct from '../controller/showProductController.js';
import addProduct from '../controller/addProductController.js';
import updateProduct from '../controller/updateProductController.js';
import delProduct from '../controller/delProductController.js';

import getCartProductController from "../controller/external/getCartProductController.js";
import productExistCheckController from "../controller/external/productExistCheckController.js";

const router = express.Router();

router.get('/', showProduct);
router.post('/', isAuthenticated, adminCheck, addProduct);
router.put('/', isAuthenticated, adminCheck, updateProduct);
router.delete('/', isAuthenticated, adminCheck, delProduct);

router.get('/cart-product/:productId', getCartProductController);
router.get('/product-exist-check/:productId',productExistCheckController);

export default router;
