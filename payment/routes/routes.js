import express from "express";
import paymentInitiateController from "../controller/paymentInitiateController.js";

const router = express.Router();

router.post('/initiate-payment', paymentInitiateController)

router.get('/health', (_req, res) => res.status(200).send('OK'));
router.all('*', (_req, res) => res.status(404).send('Invalid path'));

export default router;
