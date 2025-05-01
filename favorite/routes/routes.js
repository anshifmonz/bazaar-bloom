import express from "express";

import showFavorite from '../controller/showFavoriteController.js';
import addFavProductController from '../controller/addFavProduct.js';
import rmFavProductController from '../controller/rmFavProduct.js';

import isAuthenticated from '../middleware/authCheckMiddleware.js';

const router = express.Router();

router.get('/', isAuthenticated, showFavorite);
router.post('/', isAuthenticated, addFavProductController);
router.delete('/', isAuthenticated, rmFavProductController);

router.get('/health', (_req, res) => res.status(200).send('OK'));
router.all('*', (_req, res) => res.status(404).send('Invalid path'));

export default router;
