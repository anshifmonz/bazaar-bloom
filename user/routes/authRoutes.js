import e from "express";

import registerUser from '../controller/auth/registerController.js';
import logInUser from '../controller/auth/logInController.js';
import logOutUser from '../controller/auth/logOutController.js';

import emailValidator from '../middleware/emailValidator.js';
import { isAuthenticated, isNotAuthenticated } from '../middleware/authCheckMiddleware.js';

const router = e.Router();

router.post('/signUp', emailValidator, isNotAuthenticated, registerUser);
router.post('/logIn', emailValidator, isNotAuthenticated, logInUser);
router.post('/logOut', isAuthenticated, logOutUser);

router.get('/validate-session', (req, res) => {  
  if (req.isAuthenticated()) return res.json({ isAuthenticated: true, user: req.user });
  res.json({ isAuthenticated: false });
});

router.all('*', (req, res) => res.status(404).send('Invalid path'))

export default router;
