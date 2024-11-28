import express from "express";
import checkoutController from "../controller/checkoutController.js";
import showCartCheckoutController from "../controller/showCartCheckoutController.js";

const router = express.Router();

router.post('/', checkoutController)
router.post('/', showCartCheckoutController)

export default router;
