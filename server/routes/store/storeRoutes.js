import e from 'express';

import showCart from '../../controller/store/showCartController.js';
import showProduct from '../../controller/store/showProductController.js';
import showFavorite from '../../controller/store/showFavoriteController.js';

const router = e.Router();

router.get('/store/cart', showCart);
router.get('/store/product', showProduct);
router.get('/store/favourite', showFavorite);

export default router;
