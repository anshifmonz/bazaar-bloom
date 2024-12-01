import express from "express";
import cartCheckoutController from "../controller/cartCheckoutController.js";
import showCartCheckoutController from "../controller/showCartCheckoutController.js";

const router = express.Router();

router.post('/', cartCheckoutController)
router.post('/', showCartCheckoutController)

export default router;
