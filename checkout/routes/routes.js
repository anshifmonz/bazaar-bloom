import express from "express";
import checkoutController from "../controller/checkoutController.js";

const router = express.Router();

router.post('/', checkoutController)

export default router;
