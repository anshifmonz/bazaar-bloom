import express from "express";
import checkoutController from "../controller/checkout/checkoutController.js";

const router = express.Router();

router.post('/', checkoutController)

export default router;
