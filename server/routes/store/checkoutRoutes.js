import express from "express";
import checkoutController from "../../controller/store/checkout/checkoutController.js";

const router = express.Router();

router.post('/', checkoutController)

export default router;
