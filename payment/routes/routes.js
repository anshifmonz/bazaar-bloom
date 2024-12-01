import express from "express";
import paymentInitiateController from "../controller/paymentInitiateController.js";

const router = express.Router();

router.post('/initiate-payment', paymentInitiateController)

export default router;
