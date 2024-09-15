import e from 'express';

import adminCheck from '../../middleware/adminCheckMiddleware.js';

import showProduct from '../../controller/store/product/showProductController.js';
import addProduct from '../../controller/store/product/addProductController.js';
import updateProduct from '../../controller/store/product/updateProductController.js';
import delProduct from '../../controller/store/product/delProductController.js';

import showCart from '../../controller/store/cart/showCartController.js';

import showFavorite from '../../controller/store/showFavoriteController.js';
import { isAuthenticated } from '../../middleware/authCheckMiddleware.js';

const router = e.Router();

// product
router.get('/product', showProduct);
router.post('/product', isAuthenticated, adminCheck, addProduct);
router.put('/product', isAuthenticated, adminCheck, updateProduct);
router.delete('/product', isAuthenticated, adminCheck, delProduct);

// cart
router.get('/cart', isAuthenticated, showCart);

// favorite
router.get('/favourite', isAuthenticated, showFavorite);

export default router;
