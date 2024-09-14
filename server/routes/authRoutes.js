import e from "express";

import registerUser from "../controller/registerController.js";
import logInUser from "../controller/logInController.js";
import logOutUser from "../controller/logOutController.js";
import { isAuthenticated, isNotAuthenticated } from "../middleware/authCheckMiddleware.js";
import emailValidator from "../middleware/emailValidator.js";

const router = e.Router();

router.post('/signUp', emailValidator, isNotAuthenticated, registerUser);
router.post('/logIn', emailValidator, isNotAuthenticated, logInUser);
router.post('/logOut', isAuthenticated, logOutUser);

export default router;
