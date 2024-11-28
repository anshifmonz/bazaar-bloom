import e from "express";

import saveCardController from "../controller/card/saveCardController.js";
import getCardController from "../controller/card/getCardController.js";
import deleteCardController from "../controller/card/deleteCardController.js";

import externalGetCardController from "../controller/card/externalGetCardController.js";

import { isAuthenticated } from '../middleware/authCheckMiddleware.js';

const router = e.Router();

router.post('/save-card', isAuthenticated, saveCardController);
router.post('/get-card', isAuthenticated, getCardController);
router.post('/delete-card', isAuthenticated, deleteCardController);

router.get('/get-card', externalGetCardController);

router.all('*', (req, res) => res.status(404).send('Invalid path'))

export default router;
