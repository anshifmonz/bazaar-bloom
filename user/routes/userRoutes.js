import e from "express";

import updateProfileController from "../controller/user/updateProfileController.js";
import { isAuthenticated } from '../middleware/authCheckMiddleware.js';

const router = e.Router();

router.post('/update-profile', isAuthenticated, updateProfileController);

router.all('*', (req, res) => res.status(404).send('Invalid path'))

export default router;
