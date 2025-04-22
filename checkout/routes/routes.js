import express from "express";
import cartCheckoutController from "../controller/cartCheckoutController.js";
import showCartCheckoutController from "../controller/showCartCheckoutController.js";

const router = express.Router();

router.post('/', cartCheckoutController)
router.post('/', showCartCheckoutController)

router.get('/health', (_req, res) => res.status(200).send('OK'));
router.all('*', (_req, res) => res.status(404).send('Invalid path'));

export default router;
