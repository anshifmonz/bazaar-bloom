import e from "express";

import registerUser from '../controller/registerController.js';
import logInUser from '../controller/logInController.js';
import logOutUser from '../controller/logOutController.js';

import { isAuthenticated, isNotAuthenticated } from '../middleware/authCheckMiddleware.js';
import adminCheckMiddleware from "../middleware/adminCheckMiddleware.js";
import emailValidator from '../middleware/emailValidator.js';

const router = e.Router();

router.post('/signUp', emailValidator, isNotAuthenticated, registerUser);
router.post('/logIn', emailValidator, isNotAuthenticated, logInUser);
router.post('/logOut', isAuthenticated, logOutUser);

router.get('/isAdmin', isAuthenticated, adminCheckMiddleware, (req, res) => res.status(200).send('ok'));
router.get('/checkAuth', isAuthenticated, (req, res) => res.status(200).send('ok'));
router.get('/userId', isAuthenticated, (req, res) => res.status(200).json({ id: req.user.id }))

router.all('*', (req, res) => res.status(404).send('Invalid path'))

export default router;
