import express from "express";

import showFavorite from '../controller/showFavoriteController.js';
import addFavProductController from '../controller/addFavProduct.js';
import rmFavProductController from '../controller/rmFavProduct.js';

const router = express.Router();

router.get('/', showFavorite);
router.post('/', addFavProductController);
router.delete('/', rmFavProductController);

export default router;
