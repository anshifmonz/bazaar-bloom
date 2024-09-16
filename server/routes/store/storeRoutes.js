import e from 'express';

import adminCheck from '../../middleware/adminCheckMiddleware.js';
import { isAuthenticated } from '../../middleware/authCheckMiddleware.js';

// product
import showProduct from '../../controller/store/product/showProductController.js';
import addProduct from '../../controller/store/product/addProductController.js';
import updateProduct from '../../controller/store/product/updateProductController.js';
import delProduct from '../../controller/store/product/delProductController.js';

// cart
import showCart from '../../controller/store/cart/showCartController.js';
import addCartItem from '../../controller/store/cart/addCartItemController.js';
import updateCartQuantity from '../../controller/store/cart/updateCartQuantityController.js';
import delCartProduct from '../../controller/store/cart/delCartProductController.js';

// favorite
import showFavorite from '../../controller/store/favorites/showFavoriteController.js';
import addFavProductController from '../../controller/store/favorites/addFavProduct.js';
import rmFavProductController from '../../controller/store/favorites/rmFavProduct.js';

// order
import orderProduct from '../../controller/store/order/orderProductController.js';
import orderCart from '../../controller/store/order/orderCartController.js';
import orderCancel from '../../controller/store/order/orderCancelController.js';
import showOrders from '../../controller/store/order/showOrdersController.js';
import showAOrderDetails from '../../controller/store/order/showAOrderDetailController.js';

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
router.get('/favorite', isAuthenticated, showFavorite);
router.post('/favorite', isAuthenticated, addFavProductController);
router.delete('/favorite', isAuthenticated, rmFavProductController);

// order
router.get('/orders/', isAuthenticated, showOrders);
router.get('/orders/:orderId', isAuthenticated, showAOrderDetails);
router.post('/order/product', isAuthenticated, orderProduct);
router.post('/order/cart', isAuthenticated, orderCart);
router.post('/order/cancel', isAuthenticated, orderCancel);

export default router;
