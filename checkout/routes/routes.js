import express from "express";
import cartCheckoutController from "../controller/cartCheckoutController.js";
import showCartCheckoutController from "../controller/showCartCheckoutController.js";
import isAuthenticated from '../middleware/authCheckMiddleware.js'

const router = express.Router();

router.post('/', isAuthenticated, cartCheckoutController)
router.post('/', isAuthenticated, showCartCheckoutController)

router.get('/health', (_req, res) => res.status(200).send('OK'));
router.all('*', (_req, res) => res.status(404).send('Invalid path'));

export default router;
