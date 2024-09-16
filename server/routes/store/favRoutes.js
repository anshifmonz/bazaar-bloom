import express from "express";

import { isAuthenticated } from '../../middleware/authCheckMiddleware.js';
import showFavorite from '../../controller/store/favorites/showFavoriteController.js';
import addFavProductController from '../../controller/store/favorites/addFavProduct.js';
import rmFavProductController from '../../controller/store/favorites/rmFavProduct.js';

const router = express.Router();

router.get('/', isAuthenticated, showFavorite);
router.post('/', isAuthenticated, addFavProductController);
router.delete('/', isAuthenticated, rmFavProductController);

export default router;
