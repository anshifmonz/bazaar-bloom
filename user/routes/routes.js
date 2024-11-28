import e from "express";

import registerUser from '../controller/registerController.js';
import logInUser from '../controller/logInController.js';
import logOutUser from '../controller/logOutController.js';

import updateProfileController from "../controller/updateProfileController.js";

import saveCardController from "../controller/saveCardController.js";
import getCardController from "../controller/getCardController.js";
import deleteCardController from "../controller/deleteCardController.js";

import emailValidator from '../middleware/emailValidator.js';
import { isAuthenticated, isNotAuthenticated } from '../middleware/authCheckMiddleware.js';

const router = e.Router();

router.post('/signUp', emailValidator, isNotAuthenticated, registerUser);
router.post('/logIn', emailValidator, isNotAuthenticated, logInUser);
router.post('/logOut', isAuthenticated, logOutUser);

router.post('/update-profile', isAuthenticated, updateProfileController);

router.post('/save-card', isAuthenticated, saveCardController);
router.post('/get-card', isAuthenticated, getCardController);
router.post('/delete-card', isAuthenticated, deleteCardController);

router.get('/validate-session', (req, res) => {  
  if (req.isAuthenticated()) return res.json({ isAuthenticated: true, user: req.user });
  res.json({ isAuthenticated: false });
});

router.all('*', (req, res) => res.status(404).send('Invalid path'))

export default router;
