import express from "express";

import adminCheck from '../../middleware/adminCheckMiddleware.js';
import { isAuthenticated } from '../../middleware/authCheckMiddleware.js';

import showProduct from '../../controller/store/product/showProductController.js';
import addProduct from '../../controller/store/product/addProductController.js';
import updateProduct from '../../controller/store/product/updateProductController.js';
import delProduct from '../../controller/store/product/delProductController.js';

const router = express.Router();

router.get('/', showProduct);
router.post('/', isAuthenticated, adminCheck, addProduct);
router.put('/', isAuthenticated, adminCheck, updateProduct);
router.delete('/', isAuthenticated, adminCheck, delProduct);

export default router;
