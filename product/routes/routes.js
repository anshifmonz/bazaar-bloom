import express from "express";

import adminCheck from '../middleware/adminCheckMiddleware.js';
import isAuthenticated from '../middleware/authCheckMiddleware.js';

import showProduct from '../controller/showProductController.js';
import addProduct from '../controller/addProductController.js';
import updateProduct from '../controller/updateProductController.js';
import delProduct from '../controller/delProductController.js';

import getCartProductController from "../controller/external/getCartProductController.js";
import productExistCheckController from "../controller/external/productExistCheckController.js";
import getFavProductController from "../controller/external/getFavProductController.js";
import getOrderProductController from "../controller/external/getOrderProductController.js";
import updateProductStockController from "../controller/external/updateProductStockController.js";

const router = express.Router();

router.get('/', showProduct);
router.post('/', isAuthenticated, adminCheck, addProduct);
router.put('/', isAuthenticated, adminCheck, updateProduct);
router.delete('/', isAuthenticated, adminCheck, delProduct);

router.post('/cart-products/', getCartProductController);
router.get('/product-exist-check/:productId',productExistCheckController);
router.get('/favorite-product/:productId', getFavProductController);
router.get('/order-product/:productId', getOrderProductController);
router.post('/update-stock/', updateProductStockController);

router.get('/health', (_req, res) => res.status(200).send('OK'));
router.all('*', (_req, res) => res.status(404).send('Invalid path'));

export default router;
