import e from 'express';

import adminCheck from '../../middleware/adminCheckMiddleware.js';

import showProduct from '../../controller/store/product/showProductController.js';
import addProduct from '../../controller/store/product/addProductController.js';
import updateProduct from '../../controller/store/product/updateProductController.js';
import delProduct from '../../controller/store/product/delProductController.js';

import showCart from '../../controller/store/cart/showCartController.js';
import addCartItem from '../../controller/store/cart/addCartItemController.js';
import updateCartQuantity from '../../controller/store/cart/updateCartQuantityController.js';
import delCartProduct from '../../controller/store/cart/delCartProductController.js';

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
router.post('/cart', isAuthenticated, addCartItem);
router.put('/cart', isAuthenticated, updateCartQuantity);
router.delete('/cart', isAuthenticated, delCartProduct);

// favorite
router.get('/favourite', isAuthenticated, showFavorite);

export default router;
