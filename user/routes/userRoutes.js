import e from "express";

import updateProfileController from "../controller/user/updateProfileController.js";
import updateAddressController from "../controller/user/updateAddressController.js";
import externalAddAddressController from "../controller/user/externalAddAddressController.js";
import addAddressController from "../controller/user/addAddressController.js";
import deleteAddressController from "../controller/user/deleteAddressController.js";

import { isAuthenticated } from '../middleware/authCheckMiddleware.js';

const router = e.Router();

router.post('/update-profile', isAuthenticated, updateProfileController);
router.post('/update-address', isAuthenticated, updateAddressController);
router.post('/add-address', isAuthenticated, addAddressController);
router.post('/delete-address', isAuthenticated, deleteAddressController);

router.post('/external-add-address', externalAddAddressController);

router.all('*', (req, res) => res.status(404).send('Invalid path'))

export default router;
